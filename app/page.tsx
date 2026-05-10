"use client";

import { useState } from "react";
import axios from "axios";
import { locationOptions } from "../constants/locationOptions";

export default function Home() {

  const [formData, setFormData] = useState({
    area_type: "",
    availability: "",
    location: "",
    total_sqft: "",
    bath: "",
    balcony: "",
    bhk: ""
  });

  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const areaTypeOptions = [
    "Super built-up Area",
    "Built-up Area",
    "Carpet Area",
    "Plot Area"
  ];

  const availabilityOptions = [
    "Ready",
    "Future"
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const predictPrice = async () => {

    try {

      setLoading(true);
      setError("");
      setPrediction("");

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          ...formData,
          total_sqft: Number(formData.total_sqft),
          bath: Number(formData.bath),
          balcony: Number(formData.balcony),
          bhk: Number(formData.bhk)
        }
      );

      setPrediction(
        response.data.predicted_price_lakhs
      );

    } catch (err: any) {

      setError(
        err?.response?.data?.detail ||
        "Prediction failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <main className="min-h-screen bg-[#0f172a] text-white">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-6">

              <div className="w-2 h-2 bg-green-400 rounded-full"></div>

              <span className="text-sm text-gray-300">
                AI Powered Real Estate Prediction
              </span>

            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">

              Bengaluru
              <span className="block text-blue-400">
                House Price
              </span>
              Prediction

            </h1>

            <p className="text-gray-400 mt-6 text-lg leading-relaxed">

              Predict Bengaluru property prices using a Machine Learning
              regression model trained on real-world housing data.

            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">

              <div>

                <h3 className="text-3xl font-bold">
                  ML
                </h3>

                <p className="text-gray-400 text-sm">
                  Regression Model
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold">
                  FastAPI
                </h3>

                <p className="text-gray-400 text-sm">
                  Backend API
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-bold">
                  Next.js
                </h3>

                <p className="text-gray-400 text-sm">
                  Frontend
                </p>

              </div>

            </div>

          </div>

          {/* FORM CARD */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-semibold mb-6">
              Predict Property Price
            </h2>

            <div className="grid grid-cols-1 gap-5">

              {/* AREA TYPE */}
              <div>

                <label className="block mb-2 text-sm text-gray-300">
                  Area Type
                </label>

                <select
                  name="area_type"
                  value={formData.area_type}
                  onChange={handleChange}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-400 transition-all"
                >
                  <option value="" disabled>
                    Select area type
                  </option>
                  {areaTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <p className="text-xs text-gray-500 mt-2">
                  Choose the property area type.
                </p>

              </div>

              {/* AVAILABILITY */}
              <div>

                <label className="block mb-2 text-sm text-gray-300">
                  Availability
                </label>

                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-400 transition-all"
                >
                  <option value="" disabled>
                    Select availability
                  </option>
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <p className="text-xs text-gray-500 mt-2">
                  Choose whether the property is ready or future availability.
                </p>

              </div>

              {/* LOCATION */}
              <div>

                <label className="block mb-2 text-sm text-gray-300">
                  Location
                </label>

                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-400 transition-all"
                >
                  <option value="" disabled>
                    Select location
                  </option>
                  {locationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <p className="text-xs text-gray-500 mt-2">
                  Choose a popular Bengaluru location.
                </p>

              </div>

              {/* SQFT + BHK */}
              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Total Sqft
                  </label>

                  <input
                    type="number"
                    name="total_sqft"
                    placeholder="1200"
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-400 transition-all"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    Total property area in square feet
                  </p>

                </div>

                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    BHK
                  </label>

                  <input
                    type="number"
                    name="bhk"
                    placeholder="2"
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-400 transition-all"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    Number of bedrooms
                  </p>

                </div>

              </div>

              {/* BATH + BALCONY */}
              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Bathrooms
                  </label>

                  <input
                    type="number"
                    name="bath"
                    placeholder="2"
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-400 transition-all"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    Total bathrooms in property
                  </p>

                </div>

                <div>

                  <label className="block mb-2 text-sm text-gray-300">
                    Balcony
                  </label>

                  <input
                    type="number"
                    name="balcony"
                    placeholder="1"
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-400 transition-all"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    Number of balconies
                  </p>

                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={predictPrice}
                disabled={loading}
                className="mt-4 bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-xl py-4 font-semibold text-lg"
              >
                {
                  loading
                  ? "Predicting..."
                  : "Predict Price"
                }
              </button>

              {/* ERROR */}
              {
                error && (

                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-4">

                    <p className="text-red-300">
                      {error}
                    </p>

                  </div>
                )
              }

              {/* PREDICTION */}
              {
                prediction && (

                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mt-4">

                    <p className="text-gray-300 text-sm">
                      Estimated Property Price
                    </p>

                    <h3 className="text-4xl font-bold mt-2 text-green-400">
                      ₹ {prediction} Lakhs
                    </h3>

                  </div>
                )
              }

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

