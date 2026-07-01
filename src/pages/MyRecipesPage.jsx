import { useState, useEffect } from 'react';
import { apiGet } from '../api/client';
import RecipeList from '../components/RecipeList';
import { Link } from 'react-router-dom';

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const data = await apiGet('/recipes', { mine: true });
        setRecipes(data);
      } catch (error) {
        console.error('Failed to fetch my recipes', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Recipes</h1>
            <p className="text-gray-600 mt-1">Manage your personal recipe collection</p>
          </div>
          <Link 
            to="/ai/generate" 
            className="inline-flex items-center px-5 py-2.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Generate New
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-gray-500">Loading your recipes...</p>
            </div>
          </div>
        ) : recipes.length > 0 ? (
          <RecipeList recipes={recipes} />
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first recipe manually or let our AI generate one for you!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/create-recipe" 
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Create Manually
              </Link>
              <Link 
                to="/ai/generate" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate with AI
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
