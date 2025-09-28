import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  try {
    const { meal, season } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // ✅ Strict JSON prompt
    const prompt = `
    Analyze the following meal in the context of Ayurveda.

    Meal: ${meal}
    Season: ${season}

    Return ONLY a valid JSON object in this exact format, without extra text, code fences, or explanations:

    {
      "recommendation": "string",
      "doshaEffect": "string",
      "tips": ["string", "string", "string"]
    }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // ✅ Clean any code fences if present
    text = text.replace(/```json|```/g, "").trim();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (e) {
      console.error("JSON parse error:", e, "Raw text:", text);
      jsonResponse = {
        recommendation: text,
        doshaEffect: "Could not parse into JSON.",
        tips: [],
      };
    }

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Something went wrong with Gemini API." }, { status: 500 });
  }
}
