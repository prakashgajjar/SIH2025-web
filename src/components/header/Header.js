// components/Header.tsx
"use client";

import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Food Checker", href: "/" },
  { name: "Dosha Quiz", href: "dosh-quiz" },
  { name: "Meal Planner", href: "meal-planner" },
  { name: "Symptom Checker", href: "symptom-checker" },
  { name: "Recipes", href: "recipes" },
  { name: "Learning Hub", href: "learn" },
  { name: "My Ayurveda", href: "my-ayurveda" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-xl font-bold text-gray-800">AyurVeda Life</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <nav className="flex flex-col space-y-4 p-6 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-green-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
