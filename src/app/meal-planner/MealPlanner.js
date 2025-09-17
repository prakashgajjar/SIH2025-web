"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Lightbulb,
  UtensilsCrossed,
  Sprout,
  Sun,
  Wind,
  Snowflake,
  CheckSquare,
  Sunrise,
  Moon,
  Sparkles,
} from "lucide-react";
import MealPlanResultsPage from "./MealPlanDisplay";
import MealPlanDisplay from "./MealPlanDisplay";
import { useAppContext } from "@/hoocks/appContext";

const MealPlannerForm = () => {
  const [ aiResponseDiet, setAIResponseDiet ] = useState(null)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    season: "",
    dosha: "",
    duration: "",
    preferences: {
      vegetarian: false,
      dairyFree: false,
      vegan: false,
      nutFree: false,
      glutenFree: false,
    },
    include: "",
    avoid: "",
  });

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [name]: checked },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert preferences object → array of selected keys
    const selectedPreferences = Object.entries(formData.preferences)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    // Fix field names to match backend
    const payload = {
      dosha: formData.dosha,
      season: formData.season,
      durationDays: formData.duration, // renamed
      preferences: selectedPreferences, // object → array
      includeFoods: formData.include, // renamed
      avoidFoods: formData.avoid, // renamed
    };

    console.log("Meal Plan Request:", payload);

    try {
      setLoading(true);

      const res = await axios.post("/api/dietplan", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setAIResponseDiet(res.data);
      console.log("AI Response:", res.data);
    } catch (err) {
      console.error("Error generating meal plan:", err);
      setAIResponseDiet({
        success: false,
        error: "Failed to fetch meal plan.",
      });
    } finally {
      setLoading(false);
    }
  };

  const mealIcons = {
    breakfast: <Sunrise className="w-6 h-6 text-amber-500" />,
    lunch: <Sun className="w-6 h-6 text-orange-500" />,
    dinner: <Moon className="w-6 h-6 text-indigo-500" />,
  };

  return (
    <section className="py-12 bg-white rounded-xl text-black shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Create Your Personalized Seasonal Meal Plan
        </h2>
        <p className="text-gray-600 mt-2">
          Ready to put seasonal eating into practice? Our AI-powered meal
          planner analyzes your dosha, current season, dietary preferences, and
          food inclusions/exclusions against traditional Ayurvedic principles to
          create truly personalized recommendations.
        </p>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-r-lg mb-8">
        <Lightbulb className="inline-block w-5 h-5 mr-2" />
        <strong>Get the most accurate plan:</strong>{" "}
        <Link
          href="/dosha-quiz"
          className="underline font-semibold hover:text-blue-600"
        >
          Take our Dosha Quiz
        </Link>{" "}
        first to discover your unique constitution for personalized
        recommendations.
      </div>
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <UtensilsCrossed className="w-8 h-8 text-green-700" />
          <h3 className="text-2xl font-bold text-green-800">
            AI-Powered Meal Planner
          </h3>
        </div>

        {/* Season + Dosha */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Current Season:
            </h4>
            <div className="space-y-2">
              {[
                {
                  val: "spring",
                  icon: Sprout,
                  label: "Spring (Kapha Season) - Light, detoxifying foods",
                },
                {
                  val: "summer",
                  icon: Sun,
                  label: "Summer (Pitta Season) - Cooling, hydrating foods",
                },
                {
                  val: "fall",
                  icon: Wind,
                  label: "Fall (Vata Season) - Grounding, warming foods",
                },
                {
                  val: "winter",
                  icon: Snowflake,
                  label:
                    "Winter (Vata + Kapha) - Nourishing, strengthening foods",
                },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <label key={s.val} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="season"
                      value={s.val}
                      onChange={handleRadioChange}
                      className="text-green-600 focus:ring-green-500"
                    />{" "}
                    <Icon className="w-5 h-5 text-gray-500" /> {s.label}
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Your Dominant Dosha:
            </h4>
            <div className="space-y-2">
              {[
                {
                  val: "vata",
                  label: "Vata (Air & Space) - Creative, energetic",
                },
                {
                  val: "pitta",
                  label: "Pitta (Fire & Water) - Focused, intense",
                },
                { val: "kapha", label: "Kapha (Earth & Water) - Calm, steady" },
              ].map((d) => (
                <label key={d.val} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="dosha"
                    value={d.val}
                    onChange={handleRadioChange}
                    className="text-green-600 focus:ring-green-500"
                  />{" "}
                  {d.label}
                </label>
              ))}
              <Link
                href="/dosha-quiz"
                className="text-sm text-green-600 hover:underline ml-7"
              >
                Take our Dosha Quiz
              </Link>{" "}
              to discover your constitution
            </div>
          </div>
        </div>

        {/* Duration + Preferences */}
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Plan Duration:
            </label>
            <select
              name="duration"
              onChange={(e) =>
                setFormData((p) => ({ ...p, duration: e.target.value }))
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option>Choose duration</option>
              <option>1 Day</option>
              <option>3 Day</option>
              <option>1 Week</option>
            </select>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">
              Dietary Preferences (Optional):
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { name: "vegetarian", label: "Vegetarian" },
                { name: "vegan", label: "Vegan" },
                { name: "glutenFree", label: "Gluten-Free" },
                { name: "dairyFree", label: "Dairy-Free" },
                { name: "nutFree", label: "Nut-Free" },
              ].map((p) => (
                <label key={p.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={p.name}
                    checked={formData.preferences[p.name]}
                    onChange={handleCheckboxChange}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Include / Avoid */}
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Foods you want to include:
            </label>
            <textarea
              rows="4"
              value={formData.include}
              onChange={(e) =>
                setFormData((p) => ({ ...p, include: e.target.value }))
              }
              placeholder="e.g., quinoa, sweet potatoes, ginger, turmeric, coconut, leafy greens..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              List foods you enjoy or want to incorporate
            </p>
          </div>
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Foods you want to avoid:
            </label>
            <textarea
              rows="4"
              value={formData.avoid}
              onChange={(e) =>
                setFormData((p) => ({ ...p, avoid: e.target.value }))
              }
              placeholder="e.g., spicy foods, tomatoes, citrus, heavy dairy, processed foods..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              List foods that don't agree with you
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-10 py-3 font-bold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-50"
          >
            <CheckSquare className="w-5 h-5" />
            {loading ? "Generating..." : "GENERATE MY PERSONALIZED MEAL PLAN"}
          </button>
        </div>
      </form>
      {/* AI Response */}
      <section className="mt-8"></section>
      {
       aiResponseDiet && <div>
        <MealPlanDisplay result={aiResponseDiet}/>
       </div>
    
      }
    </section>
  );
};

export default MealPlannerForm;
