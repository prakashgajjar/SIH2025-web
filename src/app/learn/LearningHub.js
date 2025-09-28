"use client";

import { BookOpen, Leaf, Heart, Calendar, Flame } from "lucide-react";

const topics = [
  {
    icon: <Leaf className="w-10 h-10 text-green-600" />,
    title: "Ayurveda Basics",
    desc: "Learn about the history, philosophy, and principles of Ayurveda — the science of life.",
  },
  {
    icon: <Heart className="w-10 h-10 text-pink-500" />,
    title: "Dosha Types",
    desc: "Discover your body constitution (Vata, Pitta, Kapha) and how it influences your health.",
  },
  {
    icon: <Calendar className="w-10 h-10 text-teal-500" />,
    title: "Seasonal Guides",
    desc: "Adapt your lifestyle and diet based on Ayurvedic wisdom for each season.",
  },
  {
    icon: <Flame className="w-10 h-10 text-orange-500" />,
    title: "Diet & Nutrition",
    desc: "Explore Ayurvedic food guidelines, balancing meals, and healing recipes.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-indigo-500" />,
    title: "Lifestyle Practices",
    desc: "Daily rituals, meditation, yoga, and mindfulness practices to restore balance.",
  },
];

const LearningHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Ayurveda Learning Hub 🌿
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Dive into Ayurvedic wisdom and discover how to live in harmony with
          nature, balance your body, and nurture your mind.
        </p>

        {/* Topics Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="mb-4">{topic.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600">{topic.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <button className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-500 rounded-xl shadow-lg hover:from-green-700 hover:to-teal-600 transition duration-300">
            Start Your Ayurvedic Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;
