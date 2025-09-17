// components/AyurvedicTools.jsx
import ToolCard from './ToolCard';
import { User, CalendarDays, Stethoscope, LineChart, Sparkles } from 'lucide-react';

const toolsData = [
  {
    icon: (props) => <User {...props} color="#0891b2" />, // cyan-600
    iconBgColor: 'bg-cyan-100',
    title: 'Dosha Quiz',
    description: 'Discover your unique Ayurvedic constitution through our comprehensive assessment. Get personalized insights into your Pitta, Vata, and Kapha balance.',
    buttonText: 'TAKE QUIZ',
    buttonHref: '/dosh-quiz',
    buttonStyles: 'border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white',
  },
  {
    icon: (props) => <CalendarDays {...props} color="#16a34a" />, // green-600
    iconBgColor: 'bg-green-100',
    title: 'Meal Planner',
    description: 'Generate personalized meal plans based on your dosha, season, and dietary preferences. Get shopping lists and preparation guidance.',
    buttonText: 'PLAN MEALS',
    buttonHref: '/meal-planner',
    buttonStyles: 'border border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
  },
  {
    icon: (props) => <Stethoscope {...props} color="#ea580c" />, // orange-600
    iconBgColor: 'bg-orange-100',
    title: 'Symptom Checker',
    description: 'Analyze health concerns through an Ayurvedic lens. Get insights into potential dosha imbalances and dietary recommendations.',
    buttonText: 'CHECK SYMPTOMS',
    buttonHref: '/symptom-checker',
    buttonStyles: 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md',
  },
  {
    icon: (props) => <LineChart {...props} color="#8b5cf6" />, // violet-500
    iconBgColor: 'bg-violet-100',
    title: 'My Ayurveda',
    description: 'Access your personalized dashboard with AI guidance, dosha insights, and tailored recommendations for your wellness journey.',
    buttonText: 'VIEW DASHBOARD',
    buttonHref: '/dashboard',
    buttonStyles: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
  },
];

const AyurvedicTools = () => {
  return (
    <section className="bg-slate-50 py-20 px-4 font-sans">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore More Ayurvedic Tools</h2>
        <p className="text-gray-600 mb-12">
          Deepen your self-exploration and engagement with personalized Ayurvedic wellness tools
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {toolsData.map((tool) => (
            <ToolCard
              key={tool.title}
              icon={tool.icon}
              iconBgColor={tool.iconBgColor}
              title={tool.title}
              description={tool.description}
              buttonText={tool.buttonText}
              buttonHref={tool.buttonHref}
              buttonStyles={tool.buttonStyles}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Sparkles className="w-4 h-4 text-gray-400" />
          <span>All tools are designed to complement traditional Ayurvedic wisdom with modern convenience</span>
        </div>
      </div>
    </section>
  );
};

export default AyurvedicTools;