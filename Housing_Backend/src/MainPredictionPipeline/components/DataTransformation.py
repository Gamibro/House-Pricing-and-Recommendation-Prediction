import os
import sys
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from feature_engine.encoding import RareLabelEncoder, OrdinalEncoder as FeatureEngineOrdinalEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from feature_engine.imputation import CategoricalImputer

from src.MainPredictionPipeline.execution import CustomException
from src.MainPredictionPipeline.logger import logging
from src.MainPredictionPipeline.utils.common import save_object

class DataTransformation:
    def __init__(self):
        self.preprocessor_obj_file_path = os.path.join("artifacts", "preprocessor.pkl")
        self.recommendation_data_path = os.path.join("artifacts", "recommendation_data.csv")
        self.vectorizer_file_path = os.path.join("artifacts", "tfidf_vectorizer.pkl")
        self.feature_vectors_file_path = os.path.join("artifacts", "feature_vectors.pkl")

    def create_preprocessor(self):
        try:
            # Define categorical and numerical columns
            categorical_columns = ['flrNum', 'locality', 'furnishing', 'propertyType', 'RentOrSale', 'city']
            numerical_columns = ['bedrooms', 'bathrooms', 'totalFlrNum', 'postedOn_DaysAgo']

            # Numerical pipeline: Median impute -> Binary indicator for missing -> MinMax scaler
            numerical_pipeline = Pipeline(
                steps=[
                    ("imputer", SimpleImputer(strategy="median",add_indicator=True)),
                    ("scaler", MinMaxScaler())
                ]
            )

            # Categorical pipeline: 'Missing' impute -> RareLabelEncoder -> OrdinalEncoder
            categorical_pipeline = Pipeline(
                steps=[
                    ("imputer", CategoricalImputer(imputation_method='missing', variables=categorical_columns)),
                    ("rare_label_encoder", RareLabelEncoder(tol=0.01, n_categories=1, variables=categorical_columns)),
                    # ("ordinal_encoder", FeatureEngineOrdinalEncoder(encoding_method='ordered', variables=categorical_columns, unseen='encode')),
                    ("ordinal_encoder", FeatureEngineOrdinalEncoder(encoding_method='ordered', variables=categorical_columns, unseen='encode')),
                    ("scaler", MinMaxScaler())
                ]
            )

            # Combine both pipelines using ColumnTransformer
            preprocessor = ColumnTransformer(
                [
                    ("num_pipeline", numerical_pipeline, numerical_columns),
                    ("cat_pipeline", categorical_pipeline, categorical_columns)
                ]
            )

            return preprocessor

        except Exception as e:
            raise CustomException(e, sys)

    def initiate_data_transformation(self, train_path, test_path):
        try:
            # Read train and test data
            train_df = pd.read_csv(train_path)
            test_df = pd.read_csv(test_path)

            logging.info("Read train and test data completed")

            # Immediately after loading train_df, save it to self.recommendation_data_path.
            # (This must happen before any columns are dropped so we preserve URLs and heavy-null amenity columns).

            logging.info("Loading full raw dataset for the Recommendation Engine")
            
            # Read the full dataset that DataIngestion already saved!
            raw_data_path = os.path.join("artifacts", "raw_data.csv")
            full_catalog_df = pd.read_csv(raw_data_path)

            # Save a copy as recommendation_data.csv so your app.py knows exactly what to load
            full_catalog_df.to_csv(self.recommendation_data_path, index=False)
            logging.info(f"Saved full catalog to {self.recommendation_data_path}")

            # Fill nulls and convert to string for the vectorizer
            rec_df = full_catalog_df.fillna("Missing").astype(str)
           
            # Create a combined_features series by concatenating these exact columns with spaces:
            # propertyType, locality, furnishing, flrNum, totalFlrNum, city, bedrooms, bathrooms, RentOrSale, postedOn_DaysAgo
            combined_features = (
                rec_df['propertyType'] + " " +
                rec_df['locality'] + " " +
                rec_df['furnishing'] + " " +
                rec_df['flrNum'] + " " +
                rec_df['totalFlrNum'] + " " +
                rec_df['city'] + " " +
                rec_df['bedrooms'] + " " +
                rec_df['bathrooms'] + " " +
                rec_df['RentOrSale'] + " " +
                rec_df['postedOn_DaysAgo']
            )

            # Initialize TfidfVectorizer(), fit_transform the combined_features,
            # and save both the vectorizer object and the feature matrix using the custom save_object utility.
            tfidf_vectorizer = TfidfVectorizer()
            feature_vectors = tfidf_vectorizer.fit_transform(combined_features)

            save_object(
                file_path=self.vectorizer_file_path,
                obj=tfidf_vectorizer
            )
            save_object(
                file_path=self.feature_vectors_file_path,
                obj=feature_vectors
            )
            logging.info("TF-IDF vectorizer and feature vectors saved.")

            # Proceed with the existing Price Predictor logic
            # Remove specified columns
            columns_to_remove = ['firstMonthCharges', 'maintenanceCharges', 'securityDeposit', 'sqftPrice', 'Long', 'Lat','postedOn','URLs']
            existing_columns_to_remove = [col for col in columns_to_remove if col in train_df.columns]
            train_df = train_df.drop(columns=existing_columns_to_remove)
            test_df = test_df.drop(columns=existing_columns_to_remove)
            logging.info(f"Removed columns: {existing_columns_to_remove}")

            # Remove columns with more than 10% missing values, except important features
            important_features = ['bedrooms', 'bathrooms', 'flrNum', 'totalFlrNum']
            always_keep = ['locality', 'furnishing']  # Less than 10% missing
            
            missing_percentage = (train_df.isnull().sum() / len(train_df)) * 100
            columns_to_drop = []
            columns_kept_as_important = []
            columns_kept_normal = []
            
            for col in train_df.columns:
                if col == 'exactPrice':  # Don't drop target column
                    continue
                if missing_percentage[col] >= 10:
                    if col in important_features or col in always_keep:
                        columns_kept_as_important.append(col)
                    else:
                        columns_to_drop.append(col)
                else:
                    columns_kept_normal.append(col)

            # Log the detailed breakdown
            logging.info(f"Columns removed (>10% missing): {columns_to_drop}")
            logging.info(f"Columns kept despite >10% missing (Marked as Important/Always Keep): {columns_kept_as_important}")
            logging.info(f"Columns kept normally (<10% missing): {columns_kept_normal}")

            
            train_df = train_df.drop(columns=columns_to_drop)
            test_df = test_df.drop(columns=columns_to_drop)
            logging.info(f"Removed columns with >10% missing values: {columns_to_drop}")


            # Log the final state
            remaining_columns = list(train_df.columns.drop('exactPrice'))
            logging.info(f"Total features remaining for training: {len(remaining_columns)}")

            logging.info(f"Remaining columns: {remaining_columns}")

            # Separate input features and target variable
            target_column_name = "exactPrice"
            input_feature_train_df = train_df.drop(columns=[target_column_name])
            target_feature_train_df = np.log(train_df[target_column_name])

            input_feature_test_df = test_df.drop(columns=[target_column_name])
            target_feature_test_df = np.log(test_df[target_column_name])

            logging.info("Obtaining preprocessing object")
            preprocessing_obj = self.create_preprocessor()

            # Apply the preprocessing to the input features
            input_feature_train_arr = preprocessing_obj.fit_transform(input_feature_train_df, target_feature_train_df)
            input_feature_test_arr = preprocessing_obj.transform(input_feature_test_df)

            # Save the preprocessor object
            save_object(
                file_path=self.preprocessor_obj_file_path,
                obj=preprocessing_obj
            )
            logging.info(f"Saved preprocessing object to {self.preprocessor_obj_file_path}")

            # Combine features and target to create train and test arrays
            train_array = np.c_[input_feature_train_arr, np.array(target_feature_train_df).reshape(-1, 1)]
            test_array = np.c_[input_feature_test_arr, np.array(target_feature_test_df).reshape(-1, 1)]

            logging.info("Data transformation completed")

            return (
                train_array,
                test_array
            )

        except Exception as e:
            raise CustomException(e, sys)
        