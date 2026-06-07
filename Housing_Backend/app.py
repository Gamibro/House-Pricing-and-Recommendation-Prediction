import os
import sys
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configure Python path to find src
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from src.MainPredictionPipeline.pipeline.train_pipeline import TrainPipeline
from src.MainPredictionPipeline.pipeline.predict_pipeline import PredictPipeline

app = Flask(__name__)
CORS(app)

# Ensure artifacts exist
artifacts_dir = "artifacts"
required_artifacts = ["model.pkl", "preprocessor.pkl", "tfidf_vectorizer.pkl", "feature_vectors.pkl", "recommendation_data.csv"]
missing_artifacts = [art for art in required_artifacts if not os.path.exists(os.path.join(artifacts_dir, art))]

if missing_artifacts:
    print(f"Artifacts missing: {missing_artifacts}. Initiating training pipeline automatically...")
    try:
        trainer = TrainPipeline()
        trainer.run_pipeline()
        print("Training pipeline completed successfully! Artifacts generated.")
    except Exception as e:
        print(f"Error executing training pipeline: {e}")
        sys.stderr.write(f"Error executing training pipeline: {e}\n")

# Load predict pipeline
predict_pipeline = None
try:
    predict_pipeline = PredictPipeline()
    print("Prediction pipeline loaded successfully.")
except Exception as e:
    print(f"Error loading prediction pipeline: {e}. It will load once artifacts are created.")

# Helper to clean lists for dropdowns
def get_clean_unique(series):
    series = series.dropna()
    unique_vals = series.unique()
    clean_vals = []
    for val in unique_vals:
        val_str = str(val).strip()
        # Filter out obvious nulls/placeholders
        if val_str.lower() in ['', 'nan', 'none', 'missing', '9', '9.0', '9.00', 'null']:
            continue
        clean_vals.append(val)
    # Sort numeric values numerically, strings alphabetically
    try:
        return sorted(clean_vals)
    except Exception:
        return sorted(list(set([str(v) for v in clean_vals])))

@app.route("/api/health", methods=["GET"])
def health():
    status = "healthy" if predict_pipeline is not None else "waiting_for_artifacts"
    return jsonify({"status": status})

@app.route("/api/filters", methods=["GET"])
def get_filters():
    try:
        # Load raw dataset for filters to avoid loading heavy pickle files if not ready
        df = pd.read_csv(os.path.join("NOTEBOOK", "DATA", "House_Price_Prediction.csv"))
        
        cities = get_clean_unique(df['city'])
        property_types = get_clean_unique(df['propertyType'])
        furnishings = get_clean_unique(df['furnishing'])
        rent_sales = get_clean_unique(df['RentOrSale'])
        
        # Bedrooms & bathrooms (numerics)
        bedrooms = [int(x) for x in get_clean_unique(df['bedrooms']) if pd.notnull(x)]
        bathrooms = [int(x) for x in get_clean_unique(df['bathrooms']) if pd.notnull(x)]
        
        # Localities grouped by city for dependent dropdown
        localities_by_city = {}
        for city in cities:
            city_df = df[df['city'] == city]
            localities_by_city[city] = get_clean_unique(city_df['locality'])
            
        # Floor numbers
        flrNum = get_clean_unique(df['flrNum'])
        totalFlrNum = [int(x) for x in get_clean_unique(df['totalFlrNum']) if pd.notnull(x)]

        return jsonify({
            "cities": cities,
            "propertyTypes": property_types,
            "furnishings": furnishings,
            "rentSales": rent_sales,
            "bedrooms": sorted(bedrooms),
            "bathrooms": sorted(bathrooms),
            "flrNum": flrNum,
            "totalFlrNum": sorted(totalFlrNum),
            "localitiesByCity": localities_by_city
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/predict", methods=["POST"])
def predict():
    global predict_pipeline
    if predict_pipeline is None:
        try:
            predict_pipeline = PredictPipeline()
        except Exception as e:
            return jsonify({"error": f"Prediction model is not ready. {str(e)}"}), 503

    try:
        data = request.get_json()
        
        # Prepare feature dataframe
        features_df = pd.DataFrame([{
            'bedrooms': float(data.get('bedrooms', 2)),
            'bathrooms': float(data.get('bathrooms', 2)),
            'totalFlrNum': float(data.get('totalFlrNum', 5)),
            'postedOn_DaysAgo': float(data.get('postedOn_DaysAgo', 1)),
            'flrNum': str(data.get('flrNum', 'Ground')),
            'locality': str(data.get('locality', 'Missing')),
            'furnishing': str(data.get('furnishing', 'Semi-Furnished')),
            'propertyType': str(data.get('propertyType', 'Multistorey Apartment')),
            'RentOrSale': str(data.get('RentOrSale', 'Rent')),
            'city': str(data.get('city', 'Patna'))
        }])

        predicted_price = predict_pipeline.predict_price(features_df)
        return jsonify({"predicted_price": predicted_price})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/recommend", methods=["POST"])
def recommend():
    global predict_pipeline
    if predict_pipeline is None:
        try:
            predict_pipeline = PredictPipeline()
        except Exception as e:
            return jsonify({"error": f"Recommendation model is not ready. {str(e)}"}), 503

    try:
        data = request.get_json()
        
        # Prepare feature dataframe
        features_df = pd.DataFrame([{
            'bedrooms': float(data.get('bedrooms', 2)),
            'bathrooms': float(data.get('bathrooms', 2)),
            'totalFlrNum': float(data.get('totalFlrNum', 5)),
            'postedOn_DaysAgo': float(data.get('postedOn_DaysAgo', 1)),
            'flrNum': str(data.get('flrNum', 'Ground')),
            'locality': str(data.get('locality', 'Missing')),
            'furnishing': str(data.get('furnishing', 'Semi-Furnished')),
            'propertyType': str(data.get('propertyType', 'Multistorey Apartment')),
            'RentOrSale': str(data.get('RentOrSale', 'Rent')),
            'city': str(data.get('city', 'Patna'))
        }])

        # Get recommendations
        recs_df = predict_pipeline.get_recommendations(features_df, n=10)
        
        # Convert to dictionary and predict price for each recommendation
        recs_list = []
        for _, row in recs_df.iterrows():
            house_features = pd.DataFrame([{
                'bedrooms': float(row.get('bedrooms', 2)) if pd.notnull(row.get('bedrooms')) else 2.0,
                'bathrooms': float(row.get('bathrooms', 2)) if pd.notnull(row.get('bathrooms')) else 2.0,
                'totalFlrNum': float(row.get('totalFlrNum', 5)) if pd.notnull(row.get('totalFlrNum')) else 5.0,
                'postedOn_DaysAgo': float(row.get('postedOn_DaysAgo', 1)) if pd.notnull(row.get('postedOn_DaysAgo')) else 1.0,
                'flrNum': str(row.get('flrNum', 'Ground')),
                'locality': str(row.get('locality', 'Missing')),
                'furnishing': str(row.get('furnishing', 'Semi-Furnished')),
                'propertyType': str(row.get('propertyType', 'Multistorey Apartment')),
                'RentOrSale': str(row.get('RentOrSale', 'Rent')),
                'city': str(row.get('city', 'Patna'))
            }])
            
            pred_price = 0.0
            try:
                pred_price = predict_pipeline.predict_price(house_features)
            except Exception as e:
                print(f"Error predicting price for rec: {e}")
                
            house_dict = row.to_dict()
            # Clean up NaNs
            for k, v in house_dict.items():
                if pd.isnull(v):
                    house_dict[k] = None
                    
            house_dict['predicted_price'] = pred_price
            recs_list.append(house_dict)

        return jsonify(recs_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/random-recommendations", methods=["GET"])
def random_recommendations():
    global predict_pipeline
    if predict_pipeline is None:
        try:
            predict_pipeline = PredictPipeline()
        except Exception as e:
            return jsonify({"error": f"Recommendation model is not ready. {str(e)}"}), 503

    try:
        # Load from recommendation_data.csv if available, otherwise raw csv
        try:
            df_source = pd.read_csv(os.path.join("artifacts", "recommendation_data.csv"))
        except Exception:
            df_source = pd.read_csv(os.path.join("NOTEBOOK", "DATA", "House_Price_Prediction.csv"))
            
        random_df = df_source.sample(n=10)
        recs_list = []
        for _, row in random_df.iterrows():
            house_features = pd.DataFrame([{
                'bedrooms': float(row.get('bedrooms', 2)) if pd.notnull(row.get('bedrooms')) else 2.0,
                'bathrooms': float(row.get('bathrooms', 2)) if pd.notnull(row.get('bathrooms')) else 2.0,
                'totalFlrNum': float(row.get('totalFlrNum', 5)) if pd.notnull(row.get('totalFlrNum')) else 5.0,
                'postedOn_DaysAgo': float(row.get('postedOn_DaysAgo', 1)) if pd.notnull(row.get('postedOn_DaysAgo')) else 1.0,
                'flrNum': str(row.get('flrNum', 'Ground')),
                'locality': str(row.get('locality', 'Missing')),
                'furnishing': str(row.get('furnishing', 'Semi-Furnished')),
                'propertyType': str(row.get('propertyType', 'Multistorey Apartment')),
                'RentOrSale': str(row.get('RentOrSale', 'Rent')),
                'city': str(row.get('city', 'Patna'))
            }])
            
            pred_price = 0.0
            try:
                pred_price = predict_pipeline.predict_price(house_features)
            except Exception as e:
                print(f"Error predicting price for random rec: {e}")
                
            house_dict = row.to_dict()
            for k, v in house_dict.items():
                if pd.isnull(v):
                    house_dict[k] = None
                    
            house_dict['predicted_price'] = pred_price
            recs_list.append(house_dict)

        return jsonify(recs_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)