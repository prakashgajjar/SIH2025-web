"use client";

import { useState } from "react";
import { Utensils, CalendarDays, Search, Loader2 } from "lucide-react";
import MealResultPage from "./MealResultPage";

const MealForm = () => {
  const [mealDescription, setMealDescription] = useState("");
  const [currentSeason, setCurrentSeason] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mealDescription || !currentSeason) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setResponse(null); // clear previous response

    try {
      const res = await fetch("/api/check-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal: mealDescription, season: currentSeason }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans px-4">
        <div className="w-full max-w-3xl p-12 space-y-10 bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Utensils className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Describe Your Meal
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Meal Description Input */}
            <div>
              <textarea
                id="meal-description"
                rows={6}
                value={mealDescription}
                onChange={(e) => setMealDescription(e.target.value)}
                className="w-full px-5 py-4 text-lg text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                placeholder="Example: yogurt with banana and coffee, or rice with milk and honey..."
              />
              <p className="mt-3 text-sm text-gray-500">
                Be as detailed as possible. Include ingredients, cooking
                methods, and timing if relevant.
              </p>
            </div>

            {/* Current Season Selector */}
            <div>
              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
                <select
                  id="current-season"
                  value={currentSeason}
                  onChange={(e) => setCurrentSeason(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 text-lg appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ${
                    currentSeason ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled>
                    Select your current season...
                  </option>
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="autumn">Autumn</option>
                </select>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Seasonal guidance helps provide more accurate Ayurvedic
                recommendations for your body’s current needs.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-green-600 rounded-lg shadow-lg hover:from-teal-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="w-6 h-6 mr-3" />
                  CHECK MY MEAL
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Show Results */}
      <div>{response && <MealResultPage result={response} />}</div>
    </div>
  );
};

export default MealForm;
