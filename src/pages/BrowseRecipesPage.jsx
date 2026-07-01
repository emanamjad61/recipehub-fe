import { useState, useEffect } from 'react';
import { apiGet } from '../api/client';
import RecipeList from '../components/RecipeList';

const BrowseRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    diet: '',
    max_time: ''
  });

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.diet) params.diet = filters.diet;
      if (filters.max_time) params.max_time = filters.max_time;
      
      const data = await apiGet('/recipes', params);
      setRecipes(data);
    } catch (error) {
      console.error('Failed to fetch recipes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Browse Recipes</h1>
          <p className="text-gray-600 dark:text-gray-400">Explore public recipes created by our community chefs</p>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-primary-50 to-cream-50 dark:from-primary-900/20 dark:to-cream-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl p-4 mb-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-xl">👨‍🍳</span>
          </div>
          <p className="text-primary-800 dark:text-primary-200 text-sm">
            <strong>Chef's Collection:</strong> All recipes here are created by verified chefs in our community.
          </p>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
              <div className="relative">
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="search"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 focus:outline-none transition-colors"
                  placeholder="Recipe name..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Diet</label>
              <select
                name="diet"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 focus:outline-none transition-colors"
                value={filters.diet}
                onChange={handleFilterChange}
              >
                <option value="">All Diets</option>
                <option value="vegan">🌱 Vegan</option>
                <option value="vegetarian">🥬 Vegetarian</option>
                <option value="halal">☪️ Halal</option>
                <option value="gluten-free">🌾 Gluten Free</option>
                <option value="keto">🥑 Keto</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Time (min)</label>
              <input
                type="number"
                name="max_time"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors"
                placeholder="e.g. 30"
                value={filters.max_time}
                onChange={handleFilterChange}
              />
            </div>
            
            <button 
              type="submit" 
              className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-gray-500">Loading recipes...</p>
            </div>
          </div>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </div>
    </div>
  );
};

export default BrowseRecipesPage;
