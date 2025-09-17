import { BookOpen, Calendar, Droplets, ExternalLink, GraduationCap, HelpCircle, Leaf, Utensils } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#fffaf5] border-t border-gray-200 py-10 px-8 text-sm text-gray-700">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left section */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Leaf className="h-7 w-7 text-green-600" />
              <span className="font-bold text-lg text-brown-800">
                AyurVeda Life
              </span>
            </div>
            <p className="text-gray-600 mb-3">
              Ancient wisdom for modern wellness. Discover your optimal health
              through personalized Ayurvedic nutrition guidance and
              constitutional balance.
            </p>

            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg">
              ABOUT US
            </Button>
          </div>

          {/* Wellness Tools */}
          <div>
            <h4 className="text-orange-700 font-semibold mb-4">
              Wellness Tools
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Utensils className="w-4 h-4" />{" "}
                <a href="#">Food Compatibility Checker</a>
              </li>
              <li className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />{" "}
                <a href="#">Dosha Constitution Quiz</a>
              </li>
              <li className="flex items-center space-x-2">
                <Droplets className="w-4 h-4" />{" "}
                <a href="#">Ayurvedic Symptom Checker</a>
              </li>
              <li className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />{" "}
                <a href="#">Learning Hub</a>
              </li>
            </ul>
          </div>

          {/* Essential Knowledge */}
          <div>
            <h4 className="text-orange-700 font-semibold mb-4">
              Essential Knowledge
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />{" "}
                <a href="#">What is Ayurvedic Eating?</a>
              </li>
              <li className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />{" "}
                <a href="#">Understanding the Three Doshas</a>
              </li>
              <li className="flex items-center space-x-2">
                <Utensils className="w-4 h-4" />{" "}
                <a href="#">Why Food Combining Matters</a>
              </li>
              <li className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />{" "}
                <a href="#">Seasonal Eating Guide</a>
              </li>
              <li className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />{" "}
                <a href="#">Ayurvedic Glossary</a>
              </li>
              <li className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />{" "}
                <a href="#">External Resources</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-500 text-xs">
          <p>
            © 2025 Ayurvedic Eating. All rights reserved. Educational content
            for wellness guidance only.
          </p>
          <p className="mt-2">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>{" "}
            ·
            <a href="#" className="hover:underline ml-2">
              Terms of Service
            </a>
          </p>
          <p className="mt-2">🌿 Crafted with ancient wisdom</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
