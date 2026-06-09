
# 🏡 House Price Recommendation System

A full-stack machine learning application that predicts house prices and recommends similar properties. This project integrates a robust Python/Flask backend for machine learning orchestration with a modern, responsive React frontend.

---

## 🚀 Overview

The system features an automated machine learning pipeline that handles data ingestion, transformation, model training, and evaluation. It exposes a REST API to serve real-time price predictions and property recommendations to a Vite-powered React UI.

**Core Tech Stack:**

* **Frontend:** React, Vite, Tailwind CSS (via `index.css`)
* **Backend:** Flask, Flask-CORS
* **Machine Learning:** Scikit-learn (v1.3.2), XGBoost, Feature-engine, Pandas, NumPy
* **Deployment:** Docker, Docker Compose

---

## 📂 Architecture & Directory Structure

The repository is organized into two main services: the `Housing_Backend` and the `Housing_Frontend`.

```text
📦 Repository Root
├── 📁 Housing_Backend/               # Python/Flask ML REST API
│   ├── .gitignore                    # Git ignore rules
│   ├── app.py                        # Main Flask application & API entry point
│   ├── Dockerfile                    # Backend containerization
│   ├── Instructions.md               # Docker setup and run instructions
│   ├── requirements.txt              # Python dependencies (includes local package flag '-e .')
│   ├── setup.py                      # Local package configuration
│   ├── template.py                   # Boilerplate generation script
│   ├── 📁 artifacts/                 # Generated ML models and data files
│   │   ├── feature_vectors.pkl       # Precomputed TF-IDF vectors
│   │   ├── model.pkl                 # Trained ensemble ML model
│   │   ├── preprocessor.pkl          # Feature preprocessing pipeline
│   │   ├── raw_data.csv              # Cleaned raw dataset
│   │   ├── recommendation_data.csv   # Full property catalog
│   │   ├── test.csv                  # Test split
│   │   ├── tfidf_vectorizer.pkl      # Text vectorizer for recommendations
│   │   └── train.csv                 # Training split
│   ├── 📁 NOTEBOOK/                  # Jupyter notebooks and raw data
│   │   └── 📁 DATA/
│   │       └── House_Price_Prediction.csv
│   └── 📁 src/
│       └── 📁 MainPredictionPipeline/
│           ├── execution.py          # Custom exception handling
│           ├── logger.py             # Centralized logging configuration
│           ├── 📁 components/        # ML pipeline components
│           │   ├── DataIngestion.py
│           │   ├── DataTransformation.py
│           │   ├── ModelEvaluation.py
│           │   └── ModelTraining.py
│           ├── 📁 pipeline/          # Orchestration
│           │   ├── predict_pipeline.py
│           │   └── train_pipeline.py
│           └── 📁 utils/             # Helper functions
│               └── common.py
│
└── 📁 Housing_Frontend/              # React/Vite User Interface
    ├── .gitignore                    # Git ignore rules
    ├── Dockerfile                    # Frontend containerization
    ├── index.html                    # HTML entry point
    ├── package.json                  # Node dependencies and scripts
    ├── vite.config.js                # Vite build configuration
    ├── 📁 dist/                      # Built output directory
    ├── 📁 public/                    # Static assets (favicon, icons)
    └── 📁 src/
        ├── App.css                   # Global styles
        ├── App.jsx                   # Application routing
        ├── index.css                 # Tailwind/Design tokens
        ├── main.jsx                  # React entry point
        ├── 📁 components/            # Reusable UI widgets
        │   ├── Footer.jsx
        │   ├── Header.jsx
        │   ├── HouseCard.jsx
        │   ├── HouseDetailModal.jsx
        │   ├── RecommendationCarousel.jsx
        │   └── SearchBar.jsx
        └── 📁 pages/                 # Route-level views
            ├── HomePage.jsx
            ├── PricePredictionPage.jsx
            └── ResultsPage.jsx

```

---

## ⚙️ Backend Services & Machine Learning

The Flask backend is designed to be self-healing. Upon startup, `app.py` verifies the existence of necessary ML artifacts. If any are missing, it automatically triggers the training pipeline before accepting API requests.

### 🔌 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Returns API status. Reports `healthy` if artifacts are loaded, or a status indicating artifacts are still being prepared. |
| `GET` | `/api/filters` | Reads raw data to return clean, grouped filter values (cities, property types, bedrooms, etc.) to populate frontend UI dropdowns. |
| `POST` | `/api/predict` | Accepts JSON feature values, processes them through the prediction pipeline, and returns the predicted house price. |
| `POST` | `/api/recommend` | Accepts a property payload and returns similar housing entries via the recommendation engine, optionally predicting prices for each. |
| `GET` | `/api/random-recommendations` | Returns a random sample of recommended houses from the artifact catalog to display as examples without requiring user input. |

### 🛠️ ML Artifacts Directory (`Housing_Backend/artifacts/`)

These generated files allow the backend to serve predictions and recommendations instantly without retraining on every boot.

**Data Splits (CSV):**

* `raw_data.csv`: Cleaned dataset ingested from the original source.
* `train.csv` / `test.csv`: Subsets used for fitting and evaluating the models.
* `recommendation_data.csv`: Full property catalog used by the recommendation engine.

**Serialized Objects (Pickle):**

* `model.pkl`: The trained ensemble regression model (e.g., XGBoost).
* `preprocessor.pkl`: The pipeline object used to transform raw input features.
* `tfidf_vectorizer.pkl`: Text vectorizer used to convert textual data for feature similarity.
* `feature_vectors.pkl`: Precomputed TF-IDF vectors for fast recommendation comparisons.

---

## 🎨 Frontend User Interface

The React frontend handles user interactions, data collection, and result visualization across three main routes.

**Key Pages:**

1. **`HomePage.jsx`:** The landing experience, featuring a welcoming interface and immediate access to random recommendations.
2. **`PricePredictionPage.jsx`:** A dedicated form capturing specific home details to fetch a predicted market value.
3. **`ResultsPage.jsx`:** A dynamic grid displaying prediction outputs and visually matched recommendation cards.

**Core Components:**

* **`SearchBar.jsx`:** A comprehensive filter form (8+ fields) that dynamically populates based on backend data.
* **`HouseCard.jsx` & `HouseDetailModal.jsx`:** Components for rendering high-level property summaries and full-screen detailed views.
* **`RecommendationCarousel.jsx`:** A horizontal scrolling view for browsing similar properties effortlessly.

---

## 🐳 Getting Started

Both the frontend and backend are containerized for seamless deployment.

1. Clone the repository.
2. Refer to `Housing_Backend/Instructions.md` for specific environment details.
3. Run the complete stack locally using Docker Compose:

```bash
docker compose up --build

```

## Documentation Link
Refer to the documentation provided in the link below regarding the House Price Prediction System
https://drive.google.com/file/d/1hXBPBCmpSAdBalw78ocRMaXpsUnnvt_S/view?usp=drive_link

---

