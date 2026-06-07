# HousePriceRecommendation Project Structure

## Housing_Backend

The `Housing_Backend` folder contains the backend service for model training, prediction, and recommendations.

Key files and folders:
- `app.py`: main Flask application exposing backend APIs.
- `Dockerfile`: builds the Python backend container.
- `requirements.txt`: lists Python dependencies required for the backend.
- `setup.py`: package configuration for installing the backend as a local Python package.
- `Instructions.md`: explains the Docker setup and how to run `docker compose up --build`.
- `template.py`: script intended to generate the backend folder structure and boilerplate files.
- `.gitignore`: ignores generated files, logs, virtual environments, artifacts, and other non-source files.
- `artifacts/`: stores generated data splits, trained objects, and recommendation data.
- `NOTEBOOK/`: contains the original dataset and notebook used for exploration.
- `src/`: backend source code with pipeline, component, and utility modules.

### `src/MainPredictionPipeline`
- `execution.py`: custom exception handling used across the backend.
- `logger.py`: configures logging and log file location.
- `components/`: implementation of ingestion, transformation, training, and evaluation.
- `pipeline/`: orchestration of training and prediction workflows.
- `utils/common.py`: helper functions for saving and loading serialized objects.

## Housing_Backend API endpoints in `app.py`

The Flask app exposes several API routes:

- `GET /api/health`
  - Returns a simple health status.
  - If the prediction pipeline is loaded, it returns `healthy`; otherwise it reports that artifacts are still being prepared.

- `GET /api/filters`
  - Reads the raw dataset from `NOTEBOOK/DATA/House_Price_Prediction.csv`.
  - Returns cleaned lists of available filter values such as cities, property types, furnishings, rent/sale options, bedrooms, bathrooms, floor numbers, and localities grouped by city.
  - This endpoint is used by the frontend to populate dropdowns and filter controls.

- `POST /api/predict`
  - Accepts feature values in JSON format.
  - Converts the request into a feature dataframe.
  - Uses the prediction pipeline to generate a predicted house price.
  - Returns the predicted price in JSON.

- `POST /api/recommend`
  - Accepts the same or similar request payload as `/api/predict`.
  - Uses the recommendation pipeline to find similar housing entries.
  - For each recommended entry, it optionally predicts a price and returns recommendation details in JSON.

- `GET /api/random-recommendations`
  - Returns a random sample of recommended houses.
  - Loads recommendations from `artifacts/recommendation_data.csv` if available, otherwise falls back to the raw notebook dataset.
  - This endpoint is useful for showing example recommended listings without requiring user input.

### Automatic artifact generation

`app.py` checks `artifacts/` for required serialized objects and recommendation data. If any are missing, it automatically runs the training pipeline to generate them.

## Artifacts review

The `artifacts/` folder contains generated CSV and pickle files used by the backend.

CSV files:
- `raw_data.csv`
  - The cleaned raw data ingested from the original dataset.
  - Used as the source for training splits and further processing.
- `train.csv`
  - The training subset produced by data ingestion.
  - Used to fit the model and preprocessors.
- `test.csv`
  - The test subset produced by data ingestion.
  - Used to evaluate model performance.
- `recommendation_data.csv`
  - A saved version of the training or recommendation dataset in plain CSV form.
  - Used by recommendation endpoints and random recommendation generation.

Pickle files:
- `model.pkl`
  - Serialized trained machine learning model.
  - Used by the prediction pipeline to generate price predictions.
- `preprocessor.pkl`
  - Serialized preprocessing pipeline object.
  - Used to transform input features into the format expected by the model.
- `tfidf_vectorizer.pkl`
  - Serialized text vectorizer object.
  - Likely used to convert textual fields into vector form for recommendation or feature similarity.
- `feature_vectors.pkl`
  - Serialized feature vectors.
  - Likely contains precomputed vectors for the recommendation engine to compare similarity between listings.

These artifacts make the backend capable of serving predictions and recommendations without retraining every time.

## Requirements

The backend dependency file `Housing_Backend/requirements.txt` explicitly includes:
- `pandas`
- `scikit-learn==1.3.2`
- `streamlit`
- `flask`
- `flask-cors`
- `matplotlib`
- `seaborn`
- `numpy`
- `ipykernel`
- `feature-engine`
- `xgboost`
- `-e .`

The `-e .` entry installs the local backend package from `setup.py` in editable mode, allowing local imports from the backend source to work correctly.




## Architecture & Directory Structure

### Backend Architecture (`Housing_Backend`)

The backend is a Flask-based REST API that serves predictions and recommendations. Upon startup, `app.py` verifies the existence of required artifacts and automatically triggers the training pipeline if they are missing.

```text
Housing_Backend/
├── app.py                    # Flask API entry point
├── artifacts/                # Generated models and data (pickle/CSV)
│   ├── model.pkl             # Trained ML model
│   ├── preprocessor.pkl      # Feature preprocessing pipeline
│   ├── tfidf_vectorizer.pkl  # Text vectorizer for recommendations
│   ├── feature_vectors.pkl   # Precomputed TF-IDF vectors
│   ├── recommendation_data.csv # Full property catalog
│   ├── raw_data.csv          # Cleaned raw dataset
│   ├── train.csv             # Training split
│   └── test.csv              # Test split
├── NOTEBOOK/                 # Source data and exploration
│   └── DATA/
│       └── House_Price_Prediction.csv
└── src/
    └── MainPredictionPipeline/
        ├── components/       # ML pipeline components
        │   ├── DataIngestion.py      # Loads raw CSV, creates train/test splits
        │   ├── DataTransformation.py # Preprocessing, TF-IDF for recommendations
        │   ├── ModelTraining.py      # Ensemble regression model training
        │   └── ModelEvaluation.py    # R2/MAE evaluation
        ├── pipeline/         # Pipeline orchestration
        │   ├── train_pipeline.py     # Orchestrates training workflow
        │   └── predict_pipeline.py   # Prediction and recommendation serving
        ├── utils/
        │   └── common.py             # Serialization and model evaluation utilities
        ├── logger.py                 # Centralized logging configuration
        └── execution.py              # Custom exception handling

- `app.py` is the entry point for the backend service. It starts a Flask server and exposes REST APIs.
- At startup, it checks whether required artifacts exist in `artifacts/` and triggers the training pipeline automatically if they are missing.
- The backend source is organized into:
  - `src/MainPredictionPipeline/components/`: contains modular components for data ingestion, transformation, model training, and evaluation.
  - `src/MainPredictionPipeline/pipeline/`: contains pipeline orchestration classes that call components in the correct sequence.
  - `src/MainPredictionPipeline/utils/`: contains helper utilities for saving and loading serialized objects.
- Data flow:
  1. `components/DataIngestion.py` reads raw CSV input and writes training/test split CSVs into `artifacts/`.
  2. `components/DataTransformation.py` reads train/test splits, creates preprocessing objects, and saves recommendation data.
  3. `components/ModelTraining.py` trains a model and saves `model.pkl`.
  4. `components/ModelEvaluation.py` evaluates model performance using test data.
  5. `app.py` uses the serialized `preprocessor.pkl` and `model.pkl` to serve predictions and recommendations.

### Frontend architecture


Housing_Frontend/
├── src/
│   ├── main.jsx           # React entry point (mounts App)
│   ├── App.jsx            # Router configuration (3 routes)
│   ├── App.css            # Global styles
│   ├── index.css          # Tailwind/Design tokens
│   ├── pages/             # Route-level components
│   │   ├── HomePage.jsx           # Landing page with search + recommendations
│   │   ├── PricePredictionPage.jsx  # Dedicated price prediction form
│   │   └── ResultsPage.jsx        # Recommendation results grid
│   └── components/        # Reusable UI components
│       ├── Header.jsx              # Navigation/header
│       ├── Footer.jsx              # Footer
│       ├── SearchBar.jsx           # Filter form with 8+ fields
│       ├── HouseCard.jsx           # Property listing card
│       ├── HouseDetailModal.jsx    # Full-screen property details
│       └── RecommendationCarousel.jsx # Horizontal scrolling carousel
├── public/              # Static assets (favicon, icons)
├── dist/                # Built output
└── package.json         # Vite + React + Tailwind dependencies

- The frontend is a Vite-powered React app located under `Housing_Frontend/src/`.
- Core structure:
  - `src/App.jsx`: main application wrapper and route definitions.
  - `src/main.jsx`: front-end entry point that mounts the React app.
  - `src/pages/`: page-level components representing user views.
  - `src/components/`: reusable UI components used across pages.
- User interaction flow:
  1. The user navigates to a page such as `PricePredictionPage` or `ResultsPage`.
  2. `SearchBar` collects input filters and property details.
  3. The frontend sends requests to backend API routes such as `/api/predict`, `/api/recommend`, or `/api/random-recommendations`.
  4. Results are displayed using cards, modals, and carousels.

## Housing_Frontend

The `Housing_Frontend` folder contains the React frontend application powered by Vite.

Key frontend folders and files:
- `.gitignore`: ignores build artifacts, node modules, and editor files.
- `Dockerfile`: builds the frontend container using Node.
- `package.json`: frontend dependencies and scripts.
- `vite.config.js`: Vite configuration for development.
- `index.html`: main HTML entry point.
- `src/`: frontend source code.
- `public/`: static assets served by the frontend.

### Frontend components (`src/components`)
- `Header.jsx`
  - Displays the application header, branding, and likely navigation.
- `Footer.jsx`
  - Displays footer content and site credits.
- `SearchBar.jsx`
  - Provides search and filter controls for users to choose city, property type, bedrooms, bathrooms, and other criteria.
- `HouseCard.jsx`
  - Renders a single house listing card, including details such as price, location, and summary information.
- `HouseDetailModal.jsx`
  - Displays an overlay or modal with expanded details for a selected house listing.
- `RecommendationCarousel.jsx`
  - Shows a carousel or list of recommended houses returned by the backend recommendation API.

### Frontend pages (`src/pages`)
- `HomePage.jsx`
  - The landing page for the frontend application.
  - Likely introduces the app and routes users to prediction and recommendation features.
- `PricePredictionPage.jsx`
  - The page where users enter home details and submit them to the backend `/api/predict` endpoint.
  - Displays the predicted price returned by the backend.
- `ResultsPage.jsx`
  - Displays prediction results and/or recommendation results.
  - Likely shows matched houses and details from the recommendation endpoints.

This `readme.md` describes the backend and frontend folder structure, backend APIs, artifact usage, required dependencies, and the purpose of frontend components and pages.