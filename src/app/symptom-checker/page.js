'use client';

import { useState, useEffect } from 'react';
import { Stethoscope, Leaf, Search, X } from 'lucide-react';
import SymptomResult from './SymptomResult';

const commonSymptoms = [
    'Bloating after meals', 'Acid reflux', 'Fatigue in the afternoon', 'Trouble falling asleep',
    'Dry skin', 'Greasy/oily skin', 'Anxiety or restlessness', 'Brain fog', 'Constipation',
    'Loose stools', 'Low energy in the morning', 'Food cravings', 'Irritability', 'Headaches',
];

export default function SymptomCheckerPage() {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [customSymptomText, setCustomSymptomText] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const baseText = "I am experiencing: ";
        setCustomSymptomText(selectedSymptoms.length ? baseText + selectedSymptoms.join(', ') : '');
    }, [selectedSymptoms]);

    const handleSymptomToggle = (symptom) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
    };

    const handleClearAll = () => {
        setSelectedSymptoms([]);
        setResults(null);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResults(null);

        try {
            const res = await fetch('/api/symptom-checker', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms: customSymptomText }),
            });

            if (!res.ok) throw new Error('Failed to fetch recommendations');
            const data = await res.json();
            console.log(data)
            setResults(data);
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const initialSymptomCount = 10;
    const displayedSymptoms = showMore ? commonSymptoms : commonSymptoms.slice(0, initialSymptomCount);

    return (
        <main className="bg-stone-50 min-h-screen font-sans p-4 md:p-8 flex flex-col items-center">
            {/* Top Hero Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8 text-center max-w-4xl w-full">
                <div className="flex justify-center items-center gap-4 mb-4">
                    <Stethoscope className="w-10 h-10 text-orange-500" />
                    <Leaf className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-green-800">
                    Ayurvedic Symptom Checker
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto mt-2 mb-6">
                    Discover natural Ayurvedic guidance for your symptoms. Get personalized dietary and lifestyle recommendations based on ancient wisdom.
                </p>
            </div>

            {/* Symptom Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg max-w-4xl w-full overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-green-600 p-4 text-white flex items-center gap-3">
                    <Search className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">Describe Your Symptom</h2>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="font-semibold text-gray-700">Selected Symptoms:</label>
                        <div className="flex flex-wrap gap-2 mt-2 items-center">
                            {selectedSymptoms.map(symptom => (
                                <span key={symptom} className="bg-amber-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                    {symptom}
                                    <button type="button" onClick={() => handleSymptomToggle(symptom)} className="bg-amber-800 hover:bg-amber-900 rounded-full p-0.5">
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                            {selectedSymptoms.length > 0 && (
                                <button type="button" onClick={handleClearAll} className="px-3 py-1 text-sm border border-red-400 text-red-500 hover:bg-red-50 rounded-full">
                                    CLEAR ALL
                                </button>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="symptom-text" className="font-semibold text-gray-700">Describe Your Symptoms:</label>
                        <textarea
                            id="symptom-text"
                            rows="3"
                            value={customSymptomText}
                            onChange={(e) => setCustomSymptomText(e.target.value)}
                            placeholder="I am experiencing: "
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        ></textarea>
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Select Common Symptoms:</label>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mt-3">
                            {displayedSymptoms.map(symptom => (
                                <button
                                    key={symptom}
                                    type="button"
                                    onClick={() => handleSymptomToggle(symptom)}
                                    className={`w-full p-3 text-sm font-semibold text-center rounded-lg border-2 transition-colors
                                      ${selectedSymptoms.includes(symptom) ? 'bg-amber-700 text-white border-transparent' : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-800'}`}
                                >
                                    {symptom.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        {!showMore && commonSymptoms.length > initialSymptomCount && (
                            <div className="text-center mt-4">
                                <button type="button" onClick={() => setShowMore(true)} className="text-blue-600 font-semibold hover:underline">
                                    SHOW MORE SYMPTOMS
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 py-3 px-6 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 bg-amber-800 hover:bg-amber-900"
                    >
                        {loading ? 'Checking...' : 'GET AYURVEDIC GUIDANCE'}
                    </button>
                </div>
            </form>

            {/* Results Display */}
        {
            results && <SymptomResult result={results}/>
        }
        </main>
    );
}
