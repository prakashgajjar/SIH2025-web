'use client';


import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const MealResultPage = ({result}) => {


  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">No meal analysis available. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-3xl p-10 bg-white rounded-2xl shadow-xl space-y-6">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-teal-700">🍲 Your Ayurvedic Meal Analysis</h2>

        {/* Recommendation */}
        <div className="bg-teal-50 p-5 rounded-xl border border-teal-200">
          <h3 className="font-semibold text-lg text-teal-800">Recommendation</h3>
          <p className="text-gray-700 mt-2 leading-relaxed">{result.recommendation}</p>
        </div>

        {/* Dosha Effect */}
        <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
          <h3 className="font-semibold text-lg text-orange-800">Dosha Effect</h3>
          <p className="text-gray-700 mt-2 leading-relaxed">{result.doshaEffect}</p>
        </div>

        {/* Tips */}
        {result.tips?.length > 0 && (
          <div className="bg-green-50 p-5 rounded-xl border border-green-200">
            <h3 className="font-semibold text-lg text-green-800 mb-3">Tips</h3>
            <ul className="space-y-2">
              {result.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back Button */}
          <Link
            href="/"
            className="inline-block px-6 py-3 text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 transition"
          >
            🔙 Check Another Meal
          </Link>
        
        </div>
      </div>
  );
};

export default MealResultPage;
