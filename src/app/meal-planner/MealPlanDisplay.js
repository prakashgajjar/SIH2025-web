'use client';

import { Sparkles, Sunrise, Sun, Moon } from 'lucide-react';

// This component is updated to handle a 'meals' array.
const MealPlanDisplay = ({ result }) => {
    if (!result || !result.mealPlan) {
        return <p>No meal plan data to display.</p>;
    }

    // We can map the array index to the correct meal name and icon
    const mealMeta = [
        { name: 'Breakfast', icon: <Sunrise className="w-6 h-6 text-amber-500" /> },
        { name: 'Lunch', icon: <Sun className="w-6 h-6 text-orange-500" /> },
        { name: 'Dinner', icon: <Moon className="w-6 h-6 text-indigo-500" /> },
    ];

    return (
        <div className="bg-stone-50 p-4 sm:p-6 rounded-lg border animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
                Your Personalized Ayurvedic Meal Plan
            </h2>
            
            <div className="space-y-8">
                {result.mealPlan.map(day => (
                    <div key={day.day} className="bg-white p-6 rounded-lg shadow-md border">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">
                            Day {day.day}
                        </h3>
                        <div className="space-y-6">
                            {/* NEW: We now map over the day.meals array */}
                            {day.meals.map((meal, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-3">
                                        {mealMeta[index]?.icon || <Sparkles className="w-6 h-6" />}
                                        <h4 className="text-xl font-semibold capitalize text-green-700">
                                            {mealMeta[index]?.name || 'Meal'}: {meal.name}
                                        </h4>
                                    </div>
                                    <div className="mt-2 pl-9">
                                        <p className="text-gray-700">{meal.description}</p>
                                        <p className="text-sm text-gray-500 italic mt-2">
                                            <strong className="font-medium text-gray-600">Ayurvedic Insight:</strong> {meal.reasoning}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {result.suggestions && (
                 <div className="mt-8 bg-amber-50 p-6 rounded-lg border-l-4 border-amber-400">
                    <h3 className="text-xl font-bold text-amber-800 flex items-center gap-2 mb-2">
                        <Sparkles size={20}/> General Suggestions
                    </h3>
                    <p className="text-amber-900">{result.suggestions}</p>
                </div>
            )}
        </div>
    );
};


// --- EXAMPLE USAGE ---
// Here is how you would use the component with the new JSON structure.

export default function MealPlanResultsPage() {
    // This is the example JSON data you provided.
    const aiResponseData = {
        "success": true,
        "data": {
            "mealPlan": [
                {
                    "day": 1,
                    "meals": [
                        { "name": "Cooling Coconut Bliss Bowl", "description": "Blend 1 ripe banana with 1 cup fresh spinach...", "reasoning": "This breakfast is designed to pacify Pitta..." },
                        { "name": "Summer Mung & Herb Salad", "description": "Cook 1/2 cup yellow split mung beans (moong dal)...", "reasoning": "Mung beans are highly prized in Ayurveda as tridoshic..." },
                        { "name": "Soothing Zucchini & Dill Soup", "description": "In a pot, gently sauté 1 cup finely chopped zucchini...", "reasoning": "This dinner is specifically designed to be light, cooling, and easy to digest..." }
                    ]
                }
                // ... you could add more day objects here
            ],
            "suggestions": "Focus on staying hydrated with cooling drinks like coconut water or mint tea. Avoid overly spicy or fried foods, especially during the midday heat when Pitta is at its peak. Eating your main meal at lunchtime and having a lighter dinner will greatly improve digestion."
        }
    };

    return (
        <main className="font-sans p-4 md:p-8">
            <MealPlanDisplay result={aiResponseData.data} />
        </main>
    );
}