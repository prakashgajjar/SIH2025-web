// app/seasonal-guide/page.jsx

'use client';
import MealPlannerForm from './MealPlanner';
import MealPlanResultsPage from './MealPlanDisplay';
import { useAppContext } from '@/hoocks/appContext';
import Image from 'next/image';


const seasonalData = [
    {
        season: 'Spring',
        dosha: 'Kapha Season',
        qualities: 'Spring qualities: Cool, damp, heavy → increases Kapha',
        illustration: '/images/a.png', // Replace with your image path
        focus: ['Light, dry, and warming foods', 'Stimulate digestion and metabolism', 'Reduce mucus and sluggishness'],
        favor: ['Leafy greens', 'Bitter vegetables (dandelion, arugula)', 'Spices: ginger, black pepper, turmeric', 'Grains: barley, millet, buckwheat', 'Legumes'],
        reduce: ['Dairy', 'Fried and oily foods', 'Excess sweets', 'Heavy meats'],
        tip: 'Use warming herbs and dry cooking methods (roasting, baking) to reduce Kapha accumulation. Learn the complete spring diet guide with meal plans and detailed food lists →'
    },
    {
        season: 'Summer',
        dosha: 'Pitta Season',
        qualities: 'Summer qualities: Hot, light, intense → increases Pitta',
        illustration: '/images/a.png', // Replace with your image path
        focus: ['Cooling, hydrating, and sweet foods', 'Soothe heat and inflammation', 'Prevent excess acidity'],
        favor: ['Sweet fruits: melon, grapes, pears', 'Cucumbers', 'Leafy greens', 'Coconut water', 'Dairy (in moderation)', 'Cooling spices: coriander, mint, fennel'],
        reduce: ['Spicy foods (chili, garlic, mustard)', 'Oily and fried foods', 'Alcohol', 'Sour and salty flavors'],
        tip: 'Favor raw or lightly cooked meals, and stay well-hydrated. Discover the complete summer cooling diet with detailed meal plans and Pitta-balancing foods →'
    },
    {
        season: 'Fall',
        dosha: 'Vata Season',
        qualities: 'Fall qualities: Dry, rough, cool → increases Vata',
        illustration: '/images/a.png', // Replace with your image path
        focus: ['Warm, moist, and grounding foods', 'Calm nervous system', 'Support regular digestion'],
        favor: ['Root vegetables: sweet potatoes, carrots, beets', 'Stews and soups', 'Healthy oils: ghee, sesame oil', 'Warm grains: oats, rice, quinoa', 'Warming spices: cinnamon, nutmeg, ginger'],
        reduce: ['Raw vegetables', 'Dry, crunchy snacks', 'Cold drinks', 'Beans (unless well-cooked and spiced)'],
        tip: 'Eat at regular times to calm Vata and support stability. Explore the complete fall grounding diet with warming meal plans and Vata-balancing foods →'
    },
    {
        season: 'Winter',
        dosha: '',
        qualities: 'Winter qualities: Cold, heavy, damp → increases both Vata and Kapha',
        illustration: '/images/a.png', // Replace with your image path
        focus: ['Warm, nourishing, and oily foods', 'Build strength and immunity', 'Balance dryness and cold'],
        favor: ['Root vegetables', 'Soups and broths', 'Nuts and seeds', 'Dairy (warm milk with spices)', 'Hearty grains', 'Warming spices'],
        reduce: ['Cold foods', 'Dry, raw meals', 'Iced drinks', 'Excess sugar'],
        tip: 'Hearty, satisfying meals are encouraged in winter — but avoid overeating to prevent Kapha buildup. Discover the complete winter nourishing diet with strengthening meal plans and Vata-Kapha balancing foods →'
    }
];


const SeasonalDietSection = ({ data }) => (
    <section className="py-8">
        <h2 className="text-3xl font-bold text-gray-800">Ayurvedic Diet for {data.season} <span className="text-gray-600 font-medium">({data.dosha})</span></h2>
        <p className="mt-2 text-gray-500">{data.qualities}</p>
        <div className="my-6 bg-white p-6 rounded-lg shadow-sm text-center">
            <Image src={data.illustration} alt={`${data.season} Ayurvedic Foods`} width={300} height={300} className="max-w-md mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-6">
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Focus:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {data.focus.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Favor:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {data.favor.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Reduce:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {data.reduce.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
        </div>
        <div className="mt-8 bg-green-50 border-l-4 border-green-400 text-green-800 p-4 rounded-r-lg">
            <p><strong className="font-semibold">{data.season} tip:</strong> {data.tip}</p>
        </div>
    </section>
);
<div>
    <MealPlannerForm/>
</div>

// --- Main Page Component ---
export default function SeasonalEatingGuidePage() {

const {aiResponseDiet} = useAppContext();
    return (
        <main className="bg-stone-50 font-sans p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* <GuideHero /> */}
              
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Eat Seasonally in Ayurveda?</h2>
                    <p className="text-gray-700 leading-relaxed">According to Ayurveda, the qualities of nature — such as heat, dryness, moisture, and heaviness — fluctuate throughout the year. These qualities influence your internal balance and can either aggravate or soothe your doshas.</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 my-4 pl-4">
                        <li><strong>Kapha</strong> tends to increase in cool, damp spring</li>
                        <li><strong>Pitta</strong> rises during hot, intense summer</li>
                        <li><strong>Vata</strong> is aggravated by the dry, cold qualities of fall and winter</li>
                    </ul>
                     <p className="text-gray-700 font-semibold mb-2">Seasonal eating helps you:</p>
                     <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                        <li>Support agni (digestive fire)</li>
                        <li>Prevent ama (toxins)</li>
                        <li>Balance your doshas</li>
                        <li>Complement your daily Ayurvedic routines for optimal wellness</li>
                     </ul>
                </section>

                {/* Seasonal Diet Sections Rendered from Data */}
                <div className="space-y-16">
                    {seasonalData.map(data => <SeasonalDietSection key={data.season} data={data} />)}
                </div>

                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Signs You May Need to Adjust Your Seasonal Diet</h2>
                    <p className="text-gray-700 mb-4">If your diet isn’t aligned with the current season, you may notice signs of dosha imbalance:</p>
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <h3 className="font-semibold text-lg">Spring (Kapha imbalance):</h3>
                            <ul className="list-disc list-inside pl-4"><li>Congestion</li><li>Sluggishness</li><li>Water retention</li></ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Summer (Pitta imbalance):</h3>
                            <ul className="list-disc list-inside pl-4"><li>Skin irritation or rashes</li><li>Irritability</li><li>Acid reflux</li></ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Fall (Vata imbalance):</h3>
                            <ul className="list-disc list-inside pl-4"><li>Dry skin</li><li>Anxiety</li><li>Constipation</li></ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg">Winter (Vata/Kapha imbalance):</h3>
                            <ul className="list-disc list-inside pl-4"><li>Lethargy</li><li>Stiffness</li><li>Mucus buildup</li></ul>
                        </div>
                    </div>
                </section>

                <MealPlannerForm />
                
        <div>
            {
                aiResponseDiet && <MealPlanResultsPage/>
            }
        </div>
                {/* <div className='mt-10'>
                   { aiResponseDiet && <MealPlanResultsPage aiResponseData={aiResponseDiet}/> }
                </div> */}

                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Final Thoughts</h2>
                    <p className="text-gray-700 leading-relaxed">Seasonal eating is a core Ayurvedic practice for maintaining balance and vitality throughout the year. By aligning your diet with the rhythms of nature — and listening to your bodys signals — you can support digestion, immunity, and overall well-being. Start with simple changes. Notice how your body responds, and adapt your meals to bring more harmony into each season of life.</p>
                </section>
            </div>
        </main>
    );
}