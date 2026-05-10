from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

# Import logger
from logger import logger

# ==============================
# FASTAPI APP
# ==============================
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

logger.info("Starting Bengaluru House Price Prediction API")

# ==============================
# LOAD MODEL
# ==============================
try:
    model = joblib.load("benguluru_model.pkl")
    print(type(model))

    logger.info("Model loaded successfully")

except Exception as e:

    logger.error(f"Error loading model: {e}")

    model = None

# ==============================
# REQUEST SCHEMA
# ==============================
class HouseData(BaseModel):
    area_type: str
    availability: str
    location: str
    total_sqft: float
    bath: float
    balcony: float
    bhk: int

# ==============================
# HOME ROUTE
# ==============================
@app.get("/")
def home():

    logger.info("Home endpoint accessed")

    return {
        "message": "Bengaluru House Price Prediction API Running"
    }

# ==============================
# PREDICTION ROUTE
# ==============================
@app.post("/predict")
def predict(data: HouseData):

    logger.info(f"Prediction request received: {data}")

    # Check model loaded or not
    if model is None:

        logger.error("Model not loaded")

        raise HTTPException(
            status_code=500,
            detail="Model not loaded properly"
        )

    try:

        # Create dataframe
        input_data = pd.DataFrame({
            "area_type": [data.area_type],
            "availability": [data.availability],
            "location": [data.location],
            "total_sqft": [data.total_sqft],
            "bath": [data.bath],
            "balcony": [data.balcony],
            "bhk": [data.bhk]
        })

        logger.info(f"Input dataframe created:\n{input_data}")

        # Prediction
        prediction = model.predict(input_data)[0]

        logger.info(f"Prediction successful: {prediction}")

        return {
            "predicted_price_lakhs": round(
                float(prediction),
                2
            )
        }

    except Exception as e:

        logger.error(f"Prediction error: {e}")

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )