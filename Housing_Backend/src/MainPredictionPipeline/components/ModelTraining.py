import os
import sys
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor, VotingRegressor
from sklearn.linear_model import LinearRegression, Ridge
from xgboost import XGBRegressor

from src.MainPredictionPipeline.execution import CustomException
from src.MainPredictionPipeline.logger import logging
from src.MainPredictionPipeline.utils.common import save_object, evaluate_model


class ModelTrainer:
    def __init__(self):
        self.trained_model_file_path = os.path.join("artifacts", "model.pkl")

    def initiate_model_trainer(self, train_array, test_array, train_target=None, test_target=None):
        try:
            logging.info("Split training and test input data")
            # Slice the arrays to separate X (features) and y (target)
            X_train, y_train = train_array[:, :-1], train_array[:, -1]
            X_test, y_test = test_array[:, :-1], test_array[:, -1]

            # Dictionary to store the machine learning algorithms with OPTIMIZED parameters
            model_dict = {
                "GradientBoostingRegressor": GradientBoostingRegressor(
                    n_estimators=500, learning_rate=0.05, max_depth=7, 
                    max_features='sqrt', subsample=1.0, random_state=42
                ),
                "XGBoostRegressor": XGBRegressor(
                    n_estimators=500, learning_rate=0.05, max_depth=5, 
                    colsample_bytree=1.0, subsample=1.0, random_state=42
                ),
                "RandomForestRegressor": RandomForestRegressor(
                    n_estimators=500, min_samples_split=5, min_samples_leaf=4, 
                    max_features=1.0, max_depth=None, random_state=42
                ),
                "LinearRegression": LinearRegression(),
                "Ridge": Ridge(alpha=0.1)
            }

            # VotingRegressor estimator list updated with the top 3 tuned models
            model_dict["VotingRegressor"] = VotingRegressor(
                estimators=[
                    ('gb', model_dict["GradientBoostingRegressor"]),
                    ('rf', model_dict["RandomForestRegressor"]),
                    ('xgb', model_dict["XGBoostRegressor"]) 
                ]
            )

            logging.info("Model training and evaluation initiated")
            model_report = evaluate_model(
                X_train=X_train,
                y_train=y_train,
                X_test=X_test,
                y_test=y_test,
                models=model_dict
            )
            logging.info("Model evaluation completed")

            # Get the best model score and name from the report
            best_model_score = max(model_report.values())
            best_model_name = max(model_report, key=model_report.get)
            best_model = model_dict[best_model_name]

            logging.info(f"Best model found: {best_model_name} with R2 score: {best_model_score}")

            if best_model_score < 0.6:
                raise CustomException("No best model found with R2 score >= 0.6")

            # Save the trained model
            save_object(
                file_path=self.trained_model_file_path,
                obj=best_model
            )
            logging.info(f"Saved model to {self.trained_model_file_path}")

            return best_model

        except Exception as e:
            raise CustomException(e, sys)