import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiGet, apiPost, apiDelete } from '../api/client';
import useAuth from '../hooks/useAuth';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await apiGet(`/recipes/${id}`);
        setRecipe(data);
        if (data.user_rating) {
          setRating(data.user_rating);
        }
      } catch (error) {
        setError('Failed to load recipe');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    
    try {
      await apiDelete(`/recipes/${id}`);
      navigate('/my-recipes');
    } catch (error) {
      alert('Failed to delete recipe');
    }
  };

  const handleFavorite = async () => {
    try {
      if (recipe.is_favorite) {
        await apiDelete(`/recipes/${id}/favorite`);
        setRecipe(prev => ({ ...prev, is_favorite: false }));
      } else {
        await apiPost(`/recipes/${id}/favorite`);
        setRecipe(prev => ({ ...prev, is_favorite: true }));
      }
    } catch (error) {
      alert('Failed to update favorite status');
    }
  };

  const handleRate = async (newRating) => {
    try {
      const result = await apiPost(`/recipes/${id}/rate`, { rating: parseInt(newRating) });
      setRating(result.user_rating);
      setRecipe(prev => ({ ...prev, avg_rating: result.avg_rating, user_rating: result.user_rating }));
    } catch (error) {
      alert('Failed to submit rating');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Recipe Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="h-2 bg-gradient-to-r from-primary-400 to-primary-600"></div>
          
          <div className="p-6 sm:p-8">
            {/* Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  By {recipe.author?.name || 'Unknown'}
                </div>
              </div>
              
              {user && (
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={handleFavorite} 
                    className={`inline-flex items-center px-4 py-2 rounded-xl font-medium transition-colors ${
                      recipe.is_favorite 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'border-2 border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'
                    }`}
                  >
                    {recipe.is_favorite ? '❤️ Favorited' : '🤍 Favorite'}
                  </button>
                  
                  {recipe.is_owner && (
                    <>
                      <Link 
                        to={`/recipes/${id}/edit`} 
                        className="inline-flex items-center px-4 py-2 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-primary-500 hover:text-primary-600 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button 
                        onClick={handleDelete} 
                        className="inline-flex items-center px-4 py-2 border-2 border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-50 hover:border-red-300 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
              <span className="inline-flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {recipe.time_minutes} mins
              </span>
              <span className="inline-flex items-center text-sm font-medium text-amber-500">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {recipe.avg_rating ? Number(recipe.avg_rating).toFixed(1) : 'No ratings'}
              </span>
            </div>

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8">{recipe.description}</p>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-2">
                    🥗
                  </span>
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients && recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-sage-100 rounded-lg flex items-center justify-center mr-2">
                    📝
                  </span>
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {recipe.steps && recipe.steps.map((step, i) => (
                    <li key={i} className="flex">
                      <span className="w-6 h-6 bg-sage-500 text-white text-sm font-semibold rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Rating Section */}
            {user && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate this recipe</h3>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleRate(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <svg 
                        className={`w-8 h-8 ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-gray-500">Your rating: {rating}/5</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
