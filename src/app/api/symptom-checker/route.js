import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is available
if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  try {
    const { symptoms } = await req.json();
    // console.log(symptoms);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // --- Re-engineered AI Prompt ---
    // The prompt now asks the AI to first deduce the imbalance from the symptoms.
    const prompt = `
     You are an expert Ayurvedic practitioner. A user has provided a list of symptoms, but you do not know their base constitution (prakriti).

Symptoms provided: ${symptoms}

Your task is to:
1. Analyze these symptoms to determine the single most likely doshic imbalance (vikriti) at play (e.g., "Aggravated Vata", "Pitta Imbalance", "Excess Kapha").
2. Based on your determination, provide structured guidance to pacify that specific imbalance.
 give
 `;

    // --- Call Gemini AI ---
    const result = await model.generateContent(prompt);
    const response = await result.response;


    return NextResponse.json({ success: true, response });
  } catch (err) {
    console.error("API Error:", err.message);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "An unexpected server error occurred.",
      },
      { status: 500 }
    );
  }
}
