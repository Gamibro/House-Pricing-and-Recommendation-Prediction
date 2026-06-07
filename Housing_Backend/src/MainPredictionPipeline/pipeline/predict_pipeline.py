import os
import sys
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from src.MainPredictionPipeline.execution import CustomException
from src.MainPredictionPipeline.logger import logging
from src.MainPredictionPipeline.utils.common import load_object

class PredictPipeline:
    def __init__(self):
        try:
            self.model = load_object(os.path.join("artifacts", "model.pkl"))
            self.preprocessor = load_object(os.path.join("artifacts", "preprocessor.pkl"))
            self.vectorizer = load_object(os.path.join("artifacts", "tfidf_vectorizer.pkl"))
            self.feature_vectors = load_object(os.path.join("artifacts", "feature_vectors.pkl"))
            self.rec_data = pd.read_csv(os.path.join("artifacts", "recommendation_data.csv"))
        except Exception as e:
            raise CustomException(e, sys)

    def predict_price(self, features):
        try:
            logging.info("Starting price prediction")
            data_scaled = self.preprocessor.transform(features)
            log_pred = self.model.predict(data_scaled)
            pred = np.exp(log_pred)
            
            result = float(pred)
                
            logging.info(f"Price prediction completed: {result}")
            return result
        except Exception as e:
            raise CustomException(e, sys)

    def predict(self, features):
        # Backward compatibility method
        return self.predict_price(features)

    def get_recommendations(self, features_df, n=5):
        try:
            logging.info("Starting recommendation retrieval")
            f_str = features_df.fillna("Missing").astype(str).iloc[0]
            
            user_query = (
                f_str['propertyType'] + " " +
                f_str['locality'] + " " +
                f_str['furnishing'] + " " +
                f_str['flrNum'] + " " +
                f_str['totalFlrNum'] + " " +
                f_str['city'] + " " +
                f_str['bedrooms'] + " " +
                f_str['bathrooms'] + " " +
                f_str['RentOrSale'] + " " +
                f_str['postedOn_DaysAgo']
            )
            
            user_vector = self.vectorizer.transform([user_query])
            similarity_scores = cosine_similarity(user_vector, self.feature_vectors).flatten()
            top_n_indices = similarity_scores.argsort()[::-1][:n]
            
            logging.info(f"Recommendations found at indices: {top_n_indices}")
            return self.rec_data.iloc[top_n_indices]
        except Exception as e:
            raise CustomException(e, sys)