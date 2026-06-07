import os
import pickle
import logging
from sklearn.metrics import r2_score, mean_squared_error


def evaluate_model(X_train, y_train, X_test, y_test, models: dict) -> dict:
    """
    Trains and evaluates multiple models, returning a report of R2 scores.

    Args:
        X_train: Training features
        y_train: Training target
        X_test: Test features
        y_test: Test target
        models: Dictionary of model_name -> model_instance

    Returns:
        Dictionary of model_name -> r2_score on test data
    """
    try:
        report = {}
        for model_name, model in models.items():
            model.fit(X_train, y_train)
            y_test_pred = model.predict(X_test)
            test_score = r2_score(y_test, y_test_pred)
            mse = mean_squared_error(y_test, y_test_pred)
            report[model_name] = test_score

            logging.info(f"Model: {model_name} - R2 Score: {test_score}, MSE: {mse}")

        return report

    except Exception as e:
        raise e


def save_object(file_path, obj):
    try:
        dir_path = os.path.dirname(file_path)
        os.makedirs(dir_path, exist_ok=True)

        with open(file_path, "wb") as file_obj:
            pickle.dump(obj, file_obj)

    except Exception as e:
        raise e

def load_object(file_path):
    try:
        with open(file_path, "rb") as file_obj:
            return pickle.load(file_obj)

    except Exception as e:
        raise e