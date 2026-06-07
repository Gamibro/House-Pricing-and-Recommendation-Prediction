import os
from pathlib import Path

def create_structure():
    base_dir = Path.cwd()
    
    # Define the files to create as a simple list (no boilerplate content)
    list_of_files = [
        "NOTEBOOK/Data/scraped_data.csv",
        "NOTEBOOK/indian-house-price-prediction.ipynb",
        "src/MainPredictionPipeline/__init__.py",
        "src/MainPredictionPipeline/execution.py",
        "src/MainPredictionPipeline/logger.py",
        "src/MainPredictionPipeline/components/__init__.py",
        "src/MainPredictionPipeline/components/DataIngestion.py",
        "src/MainPredictionPipeline/components/DataTransformation.py",
        "src/MainPredictionPipeline/components/ModelTraining.py",
        "src/MainPredictionPipeline/components/ModelEvaluation.py",
        "src/MainPredictionPipeline/pipeline/__init__.py",
        "src/MainPredictionPipeline/pipeline/train_pipeline.py",
        "src/MainPredictionPipeline/pipeline/predict_pipeline.py",
        "src/MainPredictionPipeline/utils/__init__.py",
        "src/MainPredictionPipeline/utils/common.py",
        "app.py",
        "requirements.txt",
        "setup.py",
        "template.py"
    ]
    
    # Define standalone directories that might not contain files immediately
    explicit_dirs = [
        "artifacts",
        "logs"
    ]
    
    # 1. Create explicit standalone directories
    for dir_path in explicit_dirs:
        # exist_ok=True automatically passes if the folder already exists
        (base_dir / dir_path).mkdir(parents=True, exist_ok=True)
        
    # 2. Iterate through the file list to create missing directories and empty files
    for filepath in list_of_files:
        full_path = base_dir / filepath
        filedir = full_path.parent
        
        # Create the parent directory if it doesn't exist
        if filedir != base_dir:
            filedir.mkdir(parents=True, exist_ok=True)
            
        # Create the file only if it doesn't exist
        if not full_path.exists():
            with open(full_path, "w") as f:
                pass
                
    print("Folder structure and empty files have been generated.")

if __name__ == "__main__":
    create_structure()