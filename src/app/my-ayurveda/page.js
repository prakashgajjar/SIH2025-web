// app/ayurvedic-diet-guide/page.jsx
'use client';

import { useState } from 'react';
import { BookOpen, Sprout, Wind, Flame, Mountain, Link as LinkIcon, CheckCircle, ChevronDown, Scale, Salad, Coffee } from 'lucide-react';

// --- Data for the page ---
const principlesData = [
    { icon: Sprout, title: 'Eat Seasonally and Locally', description: "Align your diet with nature's rhythms. Eating foods that are in season in your region ensures you get the freshest, most nutrient-dense produce that is appropriate for the climate." },
    { icon: Scale, title: 'Incorporate the Six Tastes (Shad Rasas)', description: "A balanced meal includes all six tastes: Sweet, Sour, Salty, Pungent, Bitter, and Astringent. This ensures nutritional completeness and leads to satisfaction, reducing cravings." },
    { icon: Salad, title: 'Eat Mindfully and with Awareness', description: "Pay full attention to your food. Sit down to eat without distractions like TV or phones. Chew thoroughly and savor each bite to improve digestion and recognize your body's satiety signals." },
    { icon: Coffee, title: 'Kindle Your Digestive Fire (Agni)', description: "Agni is your metabolic fire. Start meals with something pungent (like ginger) to stimulate digestion. Avoid ice-cold drinks, which extinguish agni. Sip warm water throughout the day." },
];

const benefitsData = [
    { title: "Improved Digestion", description: "By focusing on cooked foods, mindful eating, and proper food combining, Ayurveda reduces bloating, gas, and indigestion, strengthening your digestive fire (agni)." },
    { title: "Enhanced Vitality & Energy", description: "A diet tailored to your dosha provides the precise nutrients your body needs, leading to sustained energy levels and reducing sluggishness and fatigue." },
    { title: "Weight Management", description: "Ayurveda promotes eating whole foods and listening to your body's natural hunger cues, which helps in achieving and maintaining a healthy weight without restrictive dieting." },
    { title: "Reduced Inflammation", description: "The emphasis on fresh, anti-inflammatory foods, herbs, and spices can help soothe chronic inflammation, which is a root cause of many diseases." },
    { title: "Mental Clarity & Calm", description: "The gut-brain connection is central to Ayurveda. A balanced diet calms the nervous system, reduces 'brain fog', and promotes a state of mental peace and focus." },
    { title: "Holistic Well-being", description: "Beyond just food, Ayurveda encourages a lifestyle that harmonizes your body, mind, and spirit, leading to a profound sense of overall health and balance." },
];

const foodsByDoshaData = {
    Vata: {
        description: "Vata is balanced by foods that are warm, moist, grounding, and nourishing. Focus on sweet, sour, and salty tastes.",
        favor: ["Cooked root vegetables (sweet potatoes, carrots)", "Ripe fruits (bananas, avocados, peaches)", "Cooked grains (oats, rice)", "Healthy fats (ghee, sesame oil, nuts)", "Warm milk and dairy products", "Warming spices (ginger, cinnamon, cardamom)"],
        limit: ["Raw vegetables and salads", "Dry and crunchy foods (crackers, popcorn)", "Cold or frozen foods", "Under-ripe fruits", "Legumes (in excess, unless well-cooked)", "Caffeinated drinks"]
    },
    Pitta: {
        description: "Pitta is balanced by foods that are cool, refreshing, and substantial. Focus on sweet, bitter, and astringent tastes.",
        favor: ["Sweet, ripe fruits (melons, grapes, cherries)", "Cooling vegetables (cucumber, leafy greens, zucchini)", "Grains (basmati rice, barley, oats)", "Legumes (chickpeas, mung beans)", "Cooling herbs (cilantro, mint, fennel)", "Ghee and coconut oil"],
        limit: ["Spicy and pungent foods (chilies, garlic, raw onion)", "Sour foods (vinegar, aged cheese, citrus in excess)", "Salty foods", "Fried and oily foods", "Red meat", "Alcohol and coffee"]
    },
    Kapha: {
        description: "Kapha is balanced by foods that are light, dry, and warming. Focus on pungent, bitter, and astringent tastes.",
        favor: ["Astringent fruits (apples, berries, pomegranates)", "Bitter and leafy greens (kale, spinach)", "Light grains (millet, buckwheat, barley)", "Legumes (all beans and lentils)", "Warming spices (all spices, especially ginger and black pepper)", "Lean protein"],
        limit: ["Heavy and oily foods", "Sweet and sour fruits (bananas, dates)", "Root vegetables in excess", "Dairy products", "Nuts and seeds in excess", "Excess salt and sugar"]
    }
};

const booksData = [
    { title: "Ayurveda: The Science of Self-Healing", author: "Dr. Vasant Lad", description: "An excellent introductory text that clearly explains the fundamental principles of Ayurveda, including the doshas, diagnosis, and treatment methods." },
    { title: "Prakriti: Your Ayurvedic Constitution", author: "Dr. Robert Svoboda", description: "A deep dive into the concept of Prakriti (your unique constitution), helping you understand your inherent nature and how to live in alignment with it." },
    { title: "The Ayurvedic Cookbook", author: "Amadea Morningstar & Urmila Desai", description: "A practical guide filled with delicious recipes categorized by dosha and season, making it easy to apply Ayurvedic principles to your daily cooking." },
];

const faqData = [
    { q: "Is the Ayurvedic diet vegetarian?", a: "Not necessarily. While it emphasizes plant-based foods, it is not strictly vegetarian. Meat is used medicinally and its consumption depends on your dosha, digestive strength, and the specific meat. However, many followers find a vegetarian diet aligns well with its principles." },
    { q: "How do I find out my Dosha?", a: "The most accurate way is to consult a certified Ayurvedic practitioner. However, there are many detailed online quizzes that can give you a strong indication of your dominant dosha(s). Your constitution is a unique mix of all three, with one or two being more prominent." },
    { q: "Can I drink coffee on an Ayurvedic diet?", a: "Coffee is considered stimulating and can be aggravating, especially for Vata and Pitta doshas. It's generally recommended to limit or avoid it. If consumed, it should be done in moderation, preferably in the morning. Herbal teas like ginger or tulsi are excellent alternatives." },
];


// --- Sub-Components ---

const FoodsByDosha = () => {
    const [activeDosha, setActiveDosha] = useState('Vata');

    return (
        <div>
            <div className="flex justify-center border-b mb-6">
                {Object.keys(foodsByDoshaData).map(dosha => (
                    <button
                        key={dosha}
                        onClick={() => setActiveDosha(dosha)}
                        className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 -mb-px
                            ${activeDosha === dosha ? 'border-b-2 border-green-700 text-green-800' : 'text-gray-500 hover:text-green-700'}`}
                    >
                        {dosha}
                    </button>
                ))}
            </div>
            <div>
                <p className="text-center text-gray-600 mb-6 italic">{foodsByDoshaData[activeDosha].description}</p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 p-6 rounded-lg">
                        <h4 className="text-xl font-bold text-green-800 mb-3">Foods to Favor</h4>
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                            {foodsByDoshaData[activeDosha].favor.map(food => <li key={food}>{food}</li>)}
                        </ul>
                    </div>
                     <div className="bg-red-50 p-6 rounded-lg">
                        <h4 className="text-xl font-bold text-red-800 mb-3">Foods to Limit or Avoid</h4>
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                            {foodsByDoshaData[activeDosha].limit.map(food => <li key={food}>{food}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = index => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {faqData.map((faq, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                    <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100"
                    >
                        <span>{faq.q}</span>
                        <ChevronDown className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                        <div className="p-4 bg-white text-gray-600">
                            <p>{faq.a}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// --- Main Page Component ---
export default function AyurvedicDietGuidePage() {
    return (
        <main className="bg-stone-50 font-sans text-gray-800 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <section className="text-center py-16">
                    <BookOpen className="w-16 h-16 mx-auto text-green-700 mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">The Ultimate Guide to the Ayurvedic Diet</h1>
                    <p className="text-lg text-gray-600 mt-4">A comprehensive introduction to eating for your unique mind-body type to promote balance, vitality, and holistic health.</p>
                </section>

                {/* What is Ayurveda? */}
                <section className="py-12">
                    <h2 className="text-3xl font-bold text-center mb-6">What is the Ayurvedic Diet?</h2>
                    <p className="text-lg leading-relaxed text-gray-700">The Ayurvedic diet is a holistic system of eating that originated in India thousands of years ago. Its not a one-size-fits-all plan; instead, its a mindful approach to food that is tailored to your unique constitutional type, known as your <span className="font-semibold">dosha</span>. The core idea is that food is medicine, and by eating in harmony with your dosha and the rhythms of nature, you can achieve optimal health, prevent disease, and support a balanced mind and body.</p>
                </section>

                {/* The Three Doshas */}
                <section className="py-12 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold text-center mb-8">The Three Doshas: Vata, Pitta, Kapha</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div><Wind className="w-12 h-12 mx-auto text-blue-500 mb-3"/><h3 className="text-2xl font-semibold">Vata</h3><p className="text-gray-600">Associated with air and ether. Vata types are typically energetic, creative, and light. When imbalanced, they can experience anxiety, dryness, and irregular digestion.</p></div>
                        <div><Flame className="w-12 h-12 mx-auto text-orange-500 mb-3"/><h3 className="text-2xl font-semibold">Pitta</h3><p className="text-gray-600">Associated with fire and water. Pitta types are often intelligent, focused, and intense. Imbalances can manifest as inflammation, irritability, and acidity.</p></div>
                        <div><Mountain className="w-12 h-12 mx-auto text-green-500 mb-3"/><h3 className="text-2xl font-semibold">Kapha</h3><p className="text-gray-600">Associated with earth and water. Kapha types are generally calm, strong, and stable. When imbalanced, they may experience sluggishness, weight gain, and congestion.</p></div>
                    </div>
                </section>

                {/* Core Principles */}
                <section className="py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">Core Principles of Ayurvedic Eating</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {principlesData.map(p => <div key={p.title} className="flex items-start gap-4"><p.icon className="w-10 h-10 text-green-600 flex-shrink-0 mt-1" /><div><h3 className="text-xl font-semibold mb-1">{p.title}</h3><p className="text-gray-600">{p.description}</p></div></div>)}
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">Benefits of an Ayurvedic Diet</h2>
                    <div className="space-y-4">
                        {benefitsData.map(b => <div key={b.title} className="p-4 bg-white rounded-lg shadow flex items-start gap-4"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" /><div><h3 className="font-semibold">{b.title}</h3><p className="text-gray-600 text-sm">{b.description}</p></div></div>)}
                    </div>
                </section>

                {/* Foods by Dosha */}
                <section className="py-12">
                     <h2 className="text-3xl font-bold text-center mb-8">Foods to Eat & Avoid for Your Dosha</h2>
                     <FoodsByDosha />
                </section>

                {/* Book Recommendations */}
                <section className="py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">Recommended Ayurvedic Books</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {booksData.map(book => <div key={book.title} className="bg-white rounded-lg shadow p-6 text-center"><BookOpen className="w-10 h-10 mx-auto text-amber-600 mb-3" /><h3 className="font-semibold text-lg">{book.title}</h3><p className="text-sm text-gray-500 italic mb-2">by {book.author}</p><p className="text-sm text-gray-600">{book.description}</p></div>)}
                    </div>
                </section>

                {/* Further Resources */}
                <section className="py-12 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Further Resources & Links</h2>
                    <ul className="space-y-3 text-center">
                        <li><a href="https://www.banyanbotanicals.com/" target="_blank" rel="noopener noreferrer" className="text-lg text-green-700 hover:underline font-medium flex items-center justify-center gap-2"><LinkIcon size={18}/> Banyan Botanicals - Articles & Recipes</a></li>
                        <li><a href="https://chopra.com/articles/ayurveda" target="_blank" rel="noopener noreferrer" className="text-lg text-green-700 hover:underline font-medium flex items-center justify-center gap-2"><LinkIcon size={18}/> The Chopra Center - Introduction to Ayurveda</a></li>
                        <li><a href="https://www.ayurveda.com/" target="_blank" rel="noopener noreferrer" className="text-lg text-green-700 hover:underline font-medium flex items-center justify-center gap-2"><LinkIcon size={18}/> The Ayurvedic Institute - Resources</a></li>
                    </ul>
                </section>

                {/* FAQ Section */}
                <section className="py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                    <FAQ />
                </section>
            </div>
        </main>
    );
}