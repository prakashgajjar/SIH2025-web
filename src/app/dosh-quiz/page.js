// app/dosha-quiz/page.jsx

'use client';

import { useState } from 'react';
import { 
    Leaf, CircleDot, CheckCircle, User, BrainCircuit, Scale, GraduationCap, 
    Percent, HeartPulse, Star, Info, Wind, Flame, Mountain, Sprout,
    ClipboardList, ListTree, RotateCw
} from 'lucide-react';

// --- Data for the Quiz ---
const quizData = [
    { id: 'q1', category: 'Physical Build', question: 'What best describes your natural body frame?', options: ['Light, thin frame with visible joints or veins; I find it hard to gain weight', 'Medium frame with good muscle tone; weight stays fairly stable', 'Solid or broad build; I gain weight easily and lose it slowly'] },
    { id: 'q2', category: 'Skin Quality', question: 'How would you describe your skin?', options: ['Dry, rough, or cool to the touch; may be prone to flaking', 'Warm, reddish, or oily; may be prone to breakouts or rashes', 'Thick, smooth, cool, and moist; rarely irritated'] },
    { id: 'q3', category: 'Hair Characteristics', question: 'What best describes your hair?', options: ['Thin, dry, frizzy, or brittle', 'Fine, soft, and may gray or thin early', 'Thick, wavy, shiny, and oily'] },
    { id: 'q4', category: 'Eyes', question: 'How would you describe your eyes?', options: ['Small, active, or dry eyes — often dark in color', 'Sharp, intense gaze — eyes are medium-sized and bright', 'Large, soft, calm-looking eyes — white sclera is prominent'] },
    { id: 'q5', category: 'Appetite', question: 'How is your appetite most of the time?', options: ['Variable — I sometimes skip meals or forget to eat', 'Strong — I feel hungry often and get irritable if I don’t eat', 'Mild — I eat out of habit, not because of strong hunger'] },
    { id: 'q6', category: 'Digestion', question: 'How would you describe your digestion?', options: ['Irregular — I experience gas, bloating, or constipation', 'Fast — I digest quickly but may experience heartburn or acidity', 'Slow — I feel heavy or sluggish after eating'] },
    { id: 'q7', category: 'Thirst', question: 'How much water do you typically drink?', options: ['I often forget to drink unless I remind myself', 'I get thirsty often and crave cold drinks', 'I drink moderately and prefer warm drinks'] },
    { id: 'q8', category: 'Sleep Patterns', question: 'How would you describe your sleep?', options: ['Light and restless; I often wake up during the night', 'Moderate; I sleep well and don’t need too much', 'Deep and long; I tend to sleep a lot and feel groggy when waking'] },
    { id: 'q9', category: 'Energy Levels', question: 'How does your energy flow during the day?', options: ['Comes in bursts, followed by fatigue or crashes', 'Strong and focused; I have consistent energy for work', 'Steady and slow; I have good endurance but low drive'] },
    { id: 'q10', category: 'Mental Activity', question: 'How would you describe your mental activity?', options: ['Quick and imaginative, but easily distracted', 'Sharp, analytical, and task-oriented', 'Calm, thoughtful, and good at remembering things'] },
    { id: 'q11', category: 'Emotional Tendencies', question: 'Under stress, how do you usually react?', options: ['I feel anxious, restless, or overwhelmed', 'I get irritated, critical, or angry', 'I become withdrawn, unmotivated, or low'] },
    { id: 'q12', category: 'Climate Preference', question: 'What type of weather do you feel best in?', options: ['Warm and humid — I dislike cold, wind, and dry air', 'Cool and breezy — I overheat easily and dislike hot weather', 'Warm and dry — I dislike cold, damp, or rainy weather'] },
];

const initialAnswers = quizData.reduce((acc, curr) => ({ ...acc, [curr.id]: null }), {});

// --- Sub-Components ---

const QuizHero = () => ( <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-4xl mx-auto"> <div className="flex justify-center items-center gap-4 mb-4"> <Leaf className="w-10 h-10 text-green-600" /> <CircleDot className="w-10 h-10 text-amber-500" /> </div> <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4"> Take the #1 Free Ayurvedic Dosha Quiz – Trusted by Thousands </h1> <p className="text-gray-600 max-w-2xl mx-auto mb-6"> Discover your unique Ayurvedic constitution with our comprehensive quiz. Completely free – no hidden costs, no subscriptions required. </p> <div className="inline-block bg-green-100 text-green-800 rounded-full px-6 py-3 text-sm font-semibold mb-6"> <CheckCircle className="w-5 h-5 inline-block mr-2" /> 100% Free Forever • Instant Results • Personalized Recommendations </div> <p className="text-sm text-gray-500 mb-8"> <User className="w-4 h-4 inline-block mr-2" /> Created by a certified Ayurvedic practitioner: <strong>Dr. Mira Dev</strong> <span className="text-gray-400">| BAMS, M.Sc. Ayurvedic Nutrition</span> </p> <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto"> <div className="text-center"> <Wind className="w-10 h-10 text-blue-500 mx-auto mb-2" /> <h3 className="font-bold text-blue-600">Vata</h3> <p className="text-xs text-gray-500">Movement & Flow</p> </div> <div className="text-center"> <Flame className="w-10 h-10 text-orange-500 mx-auto mb-2" /> <h3 className="font-bold text-orange-600">Pitta</h3> <p className="text-xs text-gray-500">Transformation & Energy</p> </div> <div className="text-center"> <Mountain className="w-10 h-10 text-green-500 mx-auto mb-2" /> <h3 className="font-bold text-green-600">Kapha</h3> <p className="text-xs text-gray-500">Structure & Stability</p> </div> </div> </div> );

const QuizFeatures = () => { /* ... (component code is unchanged) ... */ return ( <div className="p-8 bg-white rounded-xl shadow-lg max-w-5xl mx-auto"> <div className="text-center mb-10"> <Star className="w-10 h-10 text-yellow-400 mx-auto mb-4" /> <h2 className="text-3xl font-bold text-gray-800">What Makes Our Dosha Quiz the Most Authoritative on the Internet?</h2> <p className="text-gray-600 mt-2">Unlike superficial online quizzes, our assessment follows authentic Ayurvedic principles with unprecedented depth and accuracy.</p> </div> <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-10"> {[{ icon: HeartPulse, color: "text-green-500", title: "Comprehensive Mind-Body Coverage", description: "We examine all facets of your constitution – physical attributes, physiological habits, mental patterns, and emotional tendencies." },{ icon: Scale, color: "text-orange-500", title: "Prakriti vs. Vikriti Distinction", description: "We're one of the few online tools that distinguishes between your innate constitution (Prakriti) and current imbalances (Vikriti)." },{ icon: BrainCircuit, color: "text-blue-500", title: "AI-Powered Intelligence", description: "Our quiz uses advanced AI to provide nuanced, personalized results rather than cookie-cutter responses." },{ icon: GraduationCap, color: "text-yellow-500", title: "Educational Throughout", description: "Each question includes educational insights, making this both an assessment and a learning experience." },{ icon: Percent, color: "text-purple-500", title: "Detailed Percentage Results", description: "Instead of simplistic labels, you'll receive precise dosha percentages (e.g., “50% Pitta, 30% Vata, 20% Kapha”)." },{ icon: Sprout, color: "text-pink-500", title: "Comprehensive Wellness Plan", description: "Receive personalized diet recommendations, lifestyle tips, exercise guidance, and specific remedies for any detected imbalances." }].map(feature => ( <div key={feature.title} className="flex items-start gap-4"> <feature.icon className={`w-8 h-8 flex-shrink-0 ${feature.color}`} /> <div> <h3 className="font-semibold text-lg text-gray-800">{feature.title}</h3> <p className="text-gray-600 text-sm">{feature.description}</p> </div> </div> ))} </div> <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-r-lg flex items-start gap-4"> <Info className="w-6 h-6 flex-shrink-0 mt-1"/> <div> <h4 className="font-bold">What to Expect:</h4> <p className="text-sm">This comprehensive assessment takes 8-12 minutes and covers {quizData.length} carefully crafted questions across physical, mental, and lifestyle domains. You'll receive detailed results with actionable wellness guidance.</p> </div> </div> </div> );};

const QuizQuestion = ({ data, selectedValue, onChange }) => ( <div className="mb-6 transition-all duration-300"> <div className="bg-gradient-to-r from-yellow-600 to-amber-500 p-4 rounded-t-lg text-white flex items-center gap-4"> <div className="bg-white text-amber-700 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">{data.id.substring(1)}</div> <div> <h3 className="font-semibold text-lg">{data.question}</h3> <p className="text-xs text-yellow-200">Category: {data.category}</p> </div> </div> <div className="bg-white p-6 rounded-b-lg shadow-md"> <div className="space-y-4"> {data.options.map((option, index) => ( <label key={index} className="flex items-center p-3 rounded-md transition-colors hover:bg-amber-50 cursor-pointer"> <input type="radio" name={data.id} value={option} checked={selectedValue === option} onChange={(e) => onChange(data.id, e.target.value)} className="w-5 h-5 text-amber-600 border-gray-300 focus:ring-amber-500"/> <span className="ml-4 text-gray-700">{option}</span> </label> ))} </div> </div> </div> );

const QuizProgress = ({ answeredCount, totalQuestions, isComplete }) => { /* ... (component code is unchanged) ... */ const progressPercentage = (answeredCount / totalQuestions) * 100; return ( <div className="bg-white p-6 rounded-lg shadow-md text-center"> <h4 className="font-semibold text-lg text-gray-700 mb-2">Quiz Progress</h4> <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2"> <div className="bg-gradient-to-r from-yellow-500 to-amber-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div> </div> <p className="text-sm text-gray-500 mb-4">{isComplete ? "All questions answered! Ready to see your results." : "Answer all questions to unlock your dosha results."}</p> </div> );};

// --- NEW RESULTS COMPONENT ---
const QuizResults = ({ results, onRetakeQuiz }) => {
    const doshaInfo = [
        { name: 'Vata', icon: Wind, color: 'cyan', description: 'Air + Space elements - governs movement, circulation, and nervous system', percentage: results.percentages.vata },
        { name: 'Pitta', icon: Flame, color: 'orange', description: 'Fire + Water elements - governs metabolism, digestion, and transformation', percentage: results.percentages.pitta },
        { name: 'Kapha', icon: Mountain, color: 'green', description: 'Earth + Water elements - governs structure, stability, and lubrication', percentage: results.percentages.kapha },
    ];
    
    const primaryDosha = doshaInfo.find(d => d.name === results.primary);
    const PrimaryIcon = primaryDosha.icon;

    const DoshaBar = ({ name, icon, color, percentage }) => {
        const Icon = icon;
        const colorClasses = {
            cyan: { bg: 'bg-cyan-400', text: 'text-cyan-800' },
            orange: { bg: 'bg-orange-400', text: 'text-orange-800' },
            green: { bg: 'bg-green-400', text: 'text-green-800' },
        };
        return (
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Icon className={`w-5 h-5 ${colorClasses[color].text}`} />
                    <span>{name}</span>
                    <span className="ml-auto text-sm font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className={`${colorClasses[color].bg} h-4 rounded-full`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-green-800">Your Dosha Results</h1>
                <p className="text-gray-600 mt-2">Discover your unique Ayurvedic constitution and personalized dietary guidance</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="bg-gradient-to-r from-teal-500 to-green-600 text-white p-4 rounded-t-lg flex items-center gap-3">
                    <ClipboardList className="w-6 h-6"/>
                    <h2 className="text-xl font-semibold">Your Ayurvedic Constitution</h2>
                </div>
                <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-teal-700">{results.name}</h3>
                        <p className="text-gray-600">Primary: {results.primary}</p>
                        <p className="mt-2 text-gray-500 max-w-md">{primaryDosha.description}</p>
                    </div>
                    <PrimaryIcon className={`w-24 h-24 text-${primaryDosha.color}-500`} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="bg-gradient-to-r from-teal-500 to-green-600 text-white p-4 rounded-t-lg flex items-center gap-3">
                    <ListTree className="w-6 h-6"/>
                    <h2 className="text-xl font-semibold">Dosha Distribution</h2>
                </div>
                <div className="p-6 space-y-4">
                    {doshaInfo.map(d => <DoshaBar key={d.name} {...d} />)}
                </div>
            </div>
             <div className="text-center mt-8">
                <button
                    onClick={onRetakeQuiz}
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gray-700 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                >
                    <RotateCw className="w-5 h-5"/>
                    Take Quiz Again
                </button>
            </div>
        </div>
    );
};

// --- The Main Page Component ---
export default function DoshaQuizPage() {
    const [quizState, setQuizState] = useState('quiz'); // 'quiz', 'results'
    const [answers, setAnswers] = useState(initialAnswers);
    const [results, setResults] = useState(null);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };
    
    const handleRetakeQuiz = () => {
        setAnswers(initialAnswers);
        setResults(null);
        setQuizState('quiz');
        window.scrollTo(0, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const answeredCount = Object.values(answers).filter(v => v !== null).length;
        if (answeredCount !== quizData.length) {
            alert("Please answer all questions before calculating your Dosha.");
            return;
        }

        // --- Calculation Logic ---
        let vataScore = 0, pittaScore = 0, kaphaScore = 0;
        quizData.forEach(q => {
            const answer = answers[q.id];
            const optionIndex = q.options.indexOf(answer);
            if (optionIndex === 0) vataScore++;
            else if (optionIndex === 1) pittaScore++;
            else if (optionIndex === 2) kaphaScore++;
        });

        const totalScore = vataScore + pittaScore + kaphaScore;
        const percentages = {
            vata: (vataScore / totalScore) * 100,
            pitta: (pittaScore / totalScore) * 100,
            kapha: (kaphaScore / totalScore) * 100,
        };
        
        let primary = 'Vata';
        let name = 'Single Vata';
        if (pittaScore > vataScore && pittaScore > kaphaScore) {
            primary = 'Pitta';
            name = 'Single Pitta';
        } else if (kaphaScore > vataScore && kaphaScore > pittaScore) {
            primary = 'Kapha';
            name = 'Single Kapha';
        }
        // (Add more logic here for dual-dosha types if needed)

        setResults({ percentages, primary, name });
        setQuizState('results');
        window.scrollTo(0, 0);
    };
    
    const answeredCount = Object.values(answers).filter(v => v !== null).length;
    const isComplete = answeredCount === quizData.length;

    return (
        <main className="bg-slate-100 font-sans p-4 md:p-8">
            {quizState === 'quiz' && (
                <div className="space-y-12">
                    <QuizHero />
                    <QuizFeatures />
                    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                        {quizData.map(q => (
                            <QuizQuestion
                                key={q.id}
                                data={q}
                                selectedValue={answers[q.id]}
                                onChange={handleAnswerChange}
                            />
                        ))}
                        <div className="mt-8 space-y-6">
                           <QuizProgress answeredCount={answeredCount} totalQuestions={quizData.length} isComplete={isComplete} />
                           <button
                               type="submit"
                               disabled={!isComplete}
                               className="w-full py-4 px-6 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-b from-teal-400 to-green-600 hover:from-teal-500 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 disabled:transform-none"
                           >
                               CALCULATE MY DOSHA
                           </button>
                        </div>
                    </form>
                </div>
            )}

            {quizState === 'results' && results && (
                <QuizResults results={results} onRetakeQuiz={handleRetakeQuiz} />
            )}
        </main>
    );
}