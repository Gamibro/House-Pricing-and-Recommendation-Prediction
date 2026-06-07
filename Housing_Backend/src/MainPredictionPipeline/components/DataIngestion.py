import os
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np

from src.MainPredictionPipeline.execution import CustomException
from src.MainPredictionPipeline.logger import logging

class DataIngestion:
    def __init__(self):
        self.raw_data_path = os.path.join("artifacts", "raw_data.csv")
        self.train_data_path = os.path.join("artifacts", "train.csv")
        self.test_data_path = os.path.join("artifacts", "test.csv")
        

    def initiate_data_ingestion(self):
        logging.info("Entered the data ingestion method or component")
        try:
            # Read the raw data
            df = pd.read_csv(os.path.join("NOTEBOOK", "DATA", "House_Price_Prediction.csv"))
            logging.info('Read the dataset as dataframe')

          
            # Create the artifacts directory if not exists
            os.makedirs(os.path.dirname(self.raw_data_path), exist_ok=True)

            # Save raw data
            df.to_csv(self.raw_data_path, index=False, header=True)
            logging.info(f"Saved raw data to {self.raw_data_path}")

      

            # Split the data
            train_set, test_set = train_test_split(df, test_size=0.2, random_state=42)
            logging.info("Train test split initiated")

            # Save train and test data
            train_set.to_csv(self.train_data_path, index=False, header=True)
            test_set.to_csv(self.test_data_path, index=False, header=True)
            logging.info(f"Saved train data to {self.train_data_path}")
            logging.info(f"Saved test data to {self.test_data_path}")

            logging.info("Ingestion of the data is completed")

            return (
                self.train_data_path,
                self.test_data_path
            )
        except Exception as e:
            raise CustomException(e, sys)