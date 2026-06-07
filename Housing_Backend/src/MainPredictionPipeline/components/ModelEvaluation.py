import os
import sys
import numpy as np
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from src.MainPredictionPipeline.execution import CustomException
from src.MainPredictionPipeline.logger import logging
from src.MainPredictionPipeline.utils.common import load_object


class ModelEvaluation:
    def __init__(self):
        pass

    def initiate_model_evaluation(self, train_array, test_array):
        try:
            logging.info("Model evaluation initiated")
            
            # Split features and target from test_array
            X_test, y_test = test_array[:, :-1], test_array[:, -1]

            # Load the trained model
            model_path = os.path.join("artifacts", "model.pkl")
            model = load_object(model_path)

            # Predict on the test data
            predictions = model.predict(X_test)

            # Calculate metrics
            r2 = r2_score(y_test, predictions)
            mae = mean_absolute_error(y_test, predictions)
            mse = mean_squared_error(y_test, predictions)
            rmse = np.sqrt(mse)

            # Create dictionary of evaluation metrics
            eval_metrics = {
                "r2_score": r2,
                "mae": mae,
                "mse": mse,
                "rmse": rmse
            }

            logging.info(f"Model evaluation metrics: {eval_metrics}")

            return r2, mae

        except Exception as e:
            raise CustomException(e, sys)
        

        