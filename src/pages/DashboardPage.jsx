import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { apiGet } from '../api/client';

const DashboardPage = () => {
  const { user } = useAuth();
  const [recipeCount, setRecipeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const recipes = await apiGet('/recipes', { mine: true });
        setRecipeCount(recipes.length);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ value, label, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{loading ? '-' : value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Here's what's happening with your recipes</p>
          </div>
          <span className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-sm ${
            user?.user_type === 'CHEF' 
              ? 'bg-primary-100 text-primary-700' 
              : 'bg-sage-100 text-sage-700'
          }`}>
            {user?.user_type === 'CHEF' ? '👨‍🍳 Chef Account' : '👤 User Account'}
          </span>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard value={recipeCount} label="My Recipes" icon="📝" color="bg-primary-100" />
          <StatCard value={0} label="Favorites" icon="❤️" color="bg-red-100" />
          {user?.user_type === 'CHEF' && (
            <StatCard value={0} label="Reviews" icon="⭐" color="bg-amber-100" />
          )}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">AI Chef</h3>
                <p className="text-white/80 text-sm mb-4">Generate a unique recipe based on your ingredients.</p>
                <Link 
                  to="/ai/generate" 
                  className="inline-flex items-center px-4 py-2 bg-white text-primary-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Generate with AI
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
