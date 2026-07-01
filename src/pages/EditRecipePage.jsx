import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGet, apiPut } from '../api/client';
import RecipeForm from '../components/RecipeForm';

const EditRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await apiGet(`/recipes/${id}`);
        setRecipe(data);
      } catch (error) {
        alert('Failed to load recipe');
        navigate('/my-recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      await apiPut(`/recipes/${id}`, data);
      navigate(`/recipes/${id}`);
    } catch (error) {
      alert('Failed to update recipe: ' + error.message);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✏️</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Edit Recipe</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Update your recipe details</p>
        </div>
        
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <RecipeForm initialData={recipe} onSubmit={handleSubmit} buttonText="Update Recipe" />
        </div>
      </div>
    </div>
  );
};

export default EditRecipePage;
