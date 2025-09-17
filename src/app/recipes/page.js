// app/recipes/page.jsx
'use client';

import { useState, useMemo } from 'react';
import { Search, UtensilsCrossed, Filter, Clock, Users, Soup, Wheat, Leaf } from 'lucide-react';
import Image from 'next/image';

// --- DUMMY DATA ---
// In a real app, this would come from an API
const allRecipes = [
  {
    id: 1,
    title: 'Ayurvedic Kitchari - Complete Detox Meal',
    description: 'A nourishing, holistic one-pot dish made with mung daal, basmati rice, vegetables, and warming spices.',
    image: '/images/r1.png', // << REPLACE WITH YOUR IMAGE PATH
    doshas: ['Vata', 'Pitta', 'Kapha'],
    mealType: 'Main Dish',
    dietary: ['Vegetarian', 'Gluten-Free'],
    season: 'Fall',
    cookingTime: 35,
    servings: 2,
    date: '2025-09-17',
  },
  {
    id: 2,
    title: 'Cooling Cucumber & Mint Raita',
    description: 'A refreshing yogurt-based side dish perfect for balancing Pitta dosha during warm weather.',
    image: '/images/r2.png', // << REPLACE WITH YOUR IMAGE PATH
    doshas: ['Pitta'],
    mealType: 'Side Dish',
    dietary: ['Vegetarian', 'Gluten-Free'],
    season: 'Summer',
    cookingTime: 10,
    servings: 4,
    date: '2025-08-10',
  },
  {
    id: 3,
    title: 'Hearty Root Vegetable Stew',
    description: 'A grounding and warming stew to pacify Vata dosha, especially during the cool, dry seasons.',
    image: '/images/r3.png', // << REPLACE WITH YOUR IMAGE PATH
    doshas: ['Vata', 'Kapha'],
    mealType: 'Main Dish',
    dietary: ['Vegetarian'],
    season: 'Winter',
    cookingTime: 50,
    servings: 4,
    date: '2025-01-20',
  },
  {
    id: 4,
    title: 'Light & Detoxifying Mung Soup',
    description: 'A simple, light, and easy-to-digest soup that is excellent for Kapha season (Spring).',
    image: '/images/r4.png', // << REPLACE WITH YOUR IMAGE PATH
    doshas: ['Kapha', 'Pitta'],
    mealType: 'Soup',
    dietary: ['Vegetarian', 'Gluten-Free', 'Gluten-Free'],
    season: 'Spring',
    cookingTime: 40,
    servings: 3,
    date: '2025-04-05',
  },
];

// --- Sub-Components ---

const RecipeCard = ({ recipe }) => (
    <div className="bg-white text-black rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <Image src={recipe.image} alt={recipe.title} width={300} height={300} className="w-full h-40 object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-bold text-green-800 hover:text-green-600 cursor-pointer">{recipe.title}</h3>
            <p className="text-sm text-gray-600 mt-1 mb-3">{recipe.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {recipe.doshas.map(dosha => (
                    <span key={dosha} className={`px-2 py-0.5 text-xs font-semibold rounded-full
                        ${dosha === 'Vata' && 'bg-blue-100 text-blue-800'}
                        ${dosha === 'Pitta' && 'bg-orange-100 text-orange-800'}
                        ${dosha === 'Kapha' && 'bg-green-100 text-green-800'}`}>
                        {dosha}
                    </span>
                ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                <span className="flex items-center gap-1"><Clock size={14} /> {recipe.cookingTime}min</span>
                <span className="flex items-center gap-1"><Users size={14} /> {recipe.servings} Servings</span>
            </div>
        </div>
    </div>
);

const FilterSidebar = ({ filters, setFilters }) => {
    const toggleFilter = (category, value) => {
        setFilters(prev => {
            const newCategoryValues = new Set(prev[category] || []);
            if (newCategoryValues.has(value)) {
                newCategoryValues.delete(value);
            } else {
                newCategoryValues.add(value);
            }
            return { ...prev, [category]: Array.from(newCategoryValues) };
        });
    };

    const FilterButton = ({ category, value }) => (
        <button
            onClick={() => toggleFilter(category, value)}
            className={`px-3 py-1 text-sm rounded-full transition-colors
                ${filters[category]?.includes(value) ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
            {value}
        </button>
    );

    const clearFilters = () => setFilters({});

    return (
        <div className="bg-white text-black p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4"><Filter size={18} /> Filter Recipes</h3>
            {/* ... Filter sections ... */}
            <div className="space-y-4">
                <div><h4 className="font-semibold mb-2">By Dosha</h4><div className="flex flex-wrap gap-2"><FilterButton category="doshas" value="Vata" /><FilterButton category="doshas" value="Pitta" /><FilterButton category="doshas" value="Kapha" /></div></div>
                <div><h4 className="font-semibold mb-2">By Meal Type</h4><div className="flex flex-wrap gap-2"><FilterButton category="mealType" value="Main Dish" /><FilterButton category="mealType" value="Side Dish" /><FilterButton category="mealType" value="Soup" /></div></div>
                <div><h4 className="font-semibold mb-2">Dietary Preferences</h4><div className="flex flex-wrap gap-2"><FilterButton category="dietary" value="Vegetarian" /><FilterButton category="dietary" value="Gluten-Free" /></div></div>
                <div><h4 className="font-semibold mb-2">By Season</h4><div className="flex flex-wrap gap-2"><FilterButton category="season" value="Spring" /><FilterButton category="season" value="Summer" /><FilterButton category="season" value="Fall" /><FilterButton category="season" value="Winter" /></div></div>
            </div>
            <button onClick={clearFilters} className="w-full mt-6 py-2 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-100">
                CLEAR ALL FILTERS
            </button>
        </div>
    );
};

// --- Main Page Component ---
export default function RecipePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('newest');

    const filteredRecipes = useMemo(() => {
        let recipes = [...allRecipes];

        // Apply search
        if (searchTerm) {
            recipes = recipes.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Apply filters
        Object.entries(filters).forEach(([category, values]) => {
            if (values.length > 0) {
                recipes = recipes.filter(r => {
                    if (Array.isArray(r[category])) {
                        return values.some(v => r[category].includes(v));
                    }
                    return values.includes(r[category]);
                });
            }
        });

        // Apply sort
        if (sort === 'newest') recipes.sort((a, b) => new Date(b.date) - new Date(a.date));
        if (sort === 'quick') recipes.sort((a, b) => a.cookingTime - b.cookingTime);
        // Add 'popular' sort logic if needed
        
        return recipes;
    }, [searchTerm, filters, sort]);

    return (
        <main className="bg-slate-50 font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header & Search Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8 text-center">
                    <UtensilsCrossed className="w-10 h-10 text-green-600 mx-auto mb-2" />
                    <h1 className="text-4xl font-bold text-green-800">Ayurvedic Recipes</h1>
                    <p className="text-gray-600 mt-2 mb-6 max-w-2xl mx-auto">Discover authentic, dosha-balancing recipes that nourish your body and soul. Each recipe is carefully crafted to support your unique constitution and promote optimal health.</p>
                    <div className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search recipes, ingredients, or benefits..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-5 pr-12 py-3 rounded-full border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 transition"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-full p-2.5">
                            <Search size={18} />
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-6 text-center">
                        <div className="p-4 bg-gray-50 rounded-lg"><p className="text-2xl font-bold text-green-700">{allRecipes.length}</p><p className="text-sm text-gray-500">Total Recipes</p></div>
                        <div className="p-4 bg-gray-50 rounded-lg"><p className="text-2xl font-bold text-green-700">4</p><p className="text-sm text-gray-500">Categories</p></div>
                        <div className="p-4 bg-gray-50 rounded-lg"><p className="text-2xl font-bold text-green-700">3</p><p className="text-sm text-gray-500">Doshas Covered</p></div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Left Sidebar */}
                    <div className="md:col-span-1">
                        <FilterSidebar filters={filters} setFilters={setFilters} />
                    </div>

                    {/* Right Results Area */}
                    <div className="md:col-span-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">{filteredRecipes.length} Recipes Found</h2>
                            <div className="flex gap-1 p-1 bg-gray-200 rounded-full">
                                <button onClick={() => setSort('newest')} className={`px-4 py-1 text-sm rounded-full ${sort === 'newest' ? 'bg-white shadow' : 'text-gray-600'}`}>Newest</button>
                                <button onClick={() => setSort('popular')} className={`px-4 py-1 text-sm rounded-full ${sort === 'popular' ? 'bg-white shadow' : 'text-gray-600'}`}>Popular</button>
                                <button onClick={() => setSort('quick')} className={`px-4 py-1 text-sm rounded-full ${sort === 'quick' ? 'bg-white shadow' : 'text-gray-600'}`}>Quick</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredRecipes.length > 0 ? (
                                filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
                            ) : (
                                <p className="text-gray-500 lg:col-span-3 text-center py-10">No recipes match your criteria.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}