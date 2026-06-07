import os
import sys
from src.MainPredictionPipeline.execution import CustomException
from src.MainPredictionPipeline.logger import logging
from src.MainPredictionPipeline.components.DataIngestion import DataIngestion
from src.MainPredictionPipeline.components.DataTransformation import DataTransformation
from src.MainPredictionPipeline.components.ModelTraining import ModelTrainer
from src.MainPredictionPipeline.components.ModelEvaluation import ModelEvaluation

class TrainPipeline:
    def __init__(self):
        pass

    def run_pipeline(self):
        try:
            # Data Ingestion
            logging.info("Starting data ingestion")
            data_ingestion = DataIngestion()
            train_data_path, test_data_path = data_ingestion.initiate_data_ingestion()
            logging.info(f"Train data path: {train_data_path}")
            logging.info(f"Test data path: {test_data_path}")

            # Data Transformation
            logging.info("Starting data transformation")
            data_transformation = DataTransformation()
            train_arr, test_arr = data_transformation.initiate_data_transformation(
                train_data_path, test_data_path
            )
            logging.info("Data transformation completed")

            # Model Training
            logging.info("Starting model training")
            model_trainer = ModelTrainer()
            model = model_trainer.initiate_model_trainer(train_arr, test_arr)
            logging.info("Model training completed")

            # Model Evaluation
            logging.info("Starting model evaluation")
            model_evaluation = ModelEvaluation()
            r2, mae = model_evaluation.initiate_model_evaluation(train_arr, test_arr)
            logging.info(f"Model evaluation completed. R2: {r2}, MAE: {mae}")

        except Exception as e:
            raise CustomException(e, sys)