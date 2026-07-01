import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiGet } from '../api/client';
import RecipeList from '../components/RecipeList';

const HomePage = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await apiGet('/recipes', { limit: 6 });
        setFeaturedRecipes(data);
      } catch (error) {
        console.error('Failed to fetch recipes', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Cook Smarter with
              <span className="block text-cream-100">AI-Powered Recipes</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Generate unique recipes with AI based on your ingredients, or explore a curated collection from our community of passionate chefs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link 
                to="/ai/generate" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-cream-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try AI Chef
              </Link>
              <Link 
                to="/recipes" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200 shadow-lg cursor-pointer"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-gray-50 dark:fill-gray-900"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] transition-shadow">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
              <p className="text-gray-600 dark:text-gray-400">Generate custom recipes based on ingredients you have at home.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] transition-shadow">
              <div className="w-12 h-12 bg-sage-100 dark:bg-sage-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Chef Community</h3>
              <p className="text-gray-600 dark:text-gray-400">Discover recipes shared by passionate chefs from around the world.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] transition-shadow">
              <div className="w-12 h-12 bg-cream-100 dark:bg-cream-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Collection</h3>
              <p className="text-gray-600 dark:text-gray-400">Save and organize your favorite recipes in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Featured Recipes</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Discover what's cooking in our community</p>
            </div>
            <Link 
              to="/recipes" 
              className="inline-flex items-center px-5 py-2.5 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              View All
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
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
          ) : featuredRecipes.length > 0 ? (
            <RecipeList recipes={featuredRecipes} />
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🍽️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No recipes yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Be the first to create a recipe!</p>
              <Link 
                to="/ai/generate" 
                className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
              >
                Create with AI
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to start cooking?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of food enthusiasts who are discovering new recipes every day.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started Free
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
