// app/page.tsx
"use client";

import AyurvedicTools from "@/components/home/AyurvedicTools";
import MealForm from "@/components/home/MealForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Flame,
  Wind,
  Droplets,

  BookOpen,
  GraduationCap,

} from "lucide-react";
import Link from "next/link";


// Reusable component for consistent section headings
const SectionHeader = ({ title, subtitle }) => (
    <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900">{title}</h2>
        <p className="text-gray-600 mt-4">{subtitle}</p>
    </div>
);



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfcfb] font-sans">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-20 md:py-28 px-6">
          <div className="max-w-3xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">
                Harmonize Your Diet with Ancient Wisdom
             </h1>
             <p className="text-lg text-gray-600 mt-6 mb-8">
                Discover if your meals align with Ayurvedic principles. Our AI-powered tools provide personalized guidance for your unique mind-body constitution.
             </p>
             <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-lg text-lg font-semibold shadow-lg">
                <Link href="/dosh-quiz">TAKE THE DOSHA QUIZ</Link>
             </Button>
          </div>
        </section>

        {/* Dosha Types Section */}
        <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <SectionHeader 
                    title="Understand Your Constitution" 
                    subtitle="Ayurveda is based on the three fundamental energies, or doshas, that govern our physical and mental characteristics. Discovering your dominant dosha is the first step toward personalized wellness."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-blue-200 bg-blue-50/50 hover:shadow-lg transition-shadow">
                      <CardContent className="text-center p-6"><Wind className="w-10 h-10 mx-auto text-blue-500" /><h3 className="text-xl font-semibold mt-4 text-blue-700">Vata</h3><p className="text-gray-600">Movement & Communication</p><p className="text-sm text-gray-500 italic mt-1">Air + Space Elements</p></CardContent>
                    </Card>
                    <Card className="border-orange-200 bg-orange-50/50 hover:shadow-lg transition-shadow">
                      <CardContent className="text-center p-6"><Flame className="w-10 h-10 mx-auto text-orange-500" /><h3 className="text-xl font-semibold mt-4 text-orange-700">Pitta</h3><p className="text-gray-600">Metabolism & Transformation</p><p className="text-sm text-gray-500 italic mt-1">Fire + Water Elements</p></CardContent>
                    </Card>
                    <Card className="border-green-200 bg-green-50/50 hover:shadow-lg transition-shadow">
                      <CardContent className="text-center p-6"><Droplets className="w-10 h-10 mx-auto text-green-500" /><h3 className="text-xl font-semibold mt-4 text-green-700">Kapha</h3><p className="text-gray-600">Structure & Lubrication</p><p className="text-sm text-gray-500 italic mt-1">Earth + Water Elements</p></CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* How It Works Section (featuring MealForm) */}
        <section className="py-20 bg-[#f3f8f6]">
            <div className="max-w-5xl mx-auto px-6">
                <SectionHeader 
                    title="Check Your Meal's Compatibility in Seconds"
                    subtitle="Our core tool helps you quickly assess if your current meal is beneficial for you. Simply describe your food and select the current season to get instant Ayurvedic feedback."
                />
                {/* MealForm is now framed within a proper section */}
                <MealForm />
            </div>
        </section>

        {/* Explore Tools Section (featuring AyurvedicTools) */}
        <section className="py-20 bg-white">
             <div className="max-w-6xl mx-auto px-6">
                 <SectionHeader
                    title="A Complete Suite of Ayurvedic Tools"
                    subtitle="Go beyond meal checking. Explore our full range of tools designed to guide you on your wellness journey, from identifying your dosha to planning your meals."
                 />
                 <AyurvedicTools />
            </div>
        </section>

        {/* Learn More Section */}
        <section className="py-20 bg-stone-50">
             <div className="max-w-5xl mx-auto px-6">
                <SectionHeader
                    title="Deepen Your Knowledge"
                    subtitle="Wisdom is the foundation of wellness. Explore our in-depth guides to understand the core principles of Ayurveda and how to apply them to your life."
                 />
                <div className="grid md:grid-cols-2 gap-8">
                    <Link href="/seasonal-guide" className="block bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow border">
                        <div className="flex items-center gap-4">
                            <GraduationCap className="w-10 h-10 text-orange-500" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Seasonal Eating Guide</h3>
                                <p className="text-gray-600 text-sm">Learn how to adapt your diet throughout the year to stay in harmony with nature.</p>
                            </div>
                        </div>
                    </Link>
                     <Link href="/ayurvedic-diet-guide" className="block bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow border">
                        <div className="flex items-center gap-4">
                            <BookOpen className="w-10 h-10 text-blue-500" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Ayurvedic Diet Principles</h3>
                                <p className="text-gray-600 text-sm">An in-depth guide to the rules, benefits, and core concepts of eating the Ayurvedic way.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
      </main>

    </div>
  );
}