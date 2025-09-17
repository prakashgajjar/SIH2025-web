// app/api/meal-planner/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI client
if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set.");
}
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
console.log(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  try {
    const formData = await req.json();
    const {
      dosha,
      season,
      durationDays,
      preferences = [],
      includeFoods,
      avoidFoods,
    } = formData;

    console.log(formData);

    if (!dosha || !season || !durationDays) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert Ayurvedic nutritionist and chef. Your task is to create a personalized, structured Ayurvedic meal plan.

User Profile:
- Dominant Dosha: ${dosha}
- Current Season: ${season}
- Dietary Preferences: ${preferences.length ? preferences.join(", ") : "None"}
- Foods to Include: ${includeFoods || "None specified"}
- Foods to Avoid: ${avoidFoods || "None specified"}

Meal Plan Requirements:
- Duration: ${durationDays} days
- Each day must have 3 meals: breakfast, lunch, and dinner
- Each meal must include the following keys:
  - "name": a short, descriptive meal name
  - "description": detailed description of how to prepare the meal
  - "reasoning": Ayurvedic explanation for why this meal suits the user

Output Requirements:
- Your response must be a **single valid JSON object** with the following structure:

{
  "mealPlan": [
    {
      "day": 1,
      "meals": [
        {
          "name": "...",
          "description": "...",
          "reasoning": "..."
        },
        {
          "name": "...",
          "description": "...",
          "reasoning": "..."
        },
        {
          "name": "...",
          "description": "...",
          "reasoning": "..."
        }
      ]
    }
  ]
}

- Do not include any text, markdown, or explanations outside of the JSON.
- Ensure the JSON is fully parseable by JavaScript (use double quotes for all strings, no trailing commas).
- Each day should have exactly 3 meals in the order: breakfast, lunch, dinner.
- Make meal names creative but concise.

Provide the JSON only.
`;

    // Call Gemini AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log(text);

    try {
      const mealPlanJson = JSON.parse(text);
      return NextResponse.json({ success: true, data: mealPlanJson });
    } catch (parseError) {
      // Try to extract JSON substring if LLM output contains extra text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const mealPlanJson = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ success: true, data: mealPlanJson });
        } catch (innerError) {
          console.error(
            "Error parsing extracted JSON from Gemini response:",
            jsonMatch[0]
          );
        }
      }
      console.error("Error parsing Gemini response:", text);
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
