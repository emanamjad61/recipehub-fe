import { useNavigate } from 'react-router-dom';
import { apiPost } from '../api/client';
import RecipeForm from '../components/RecipeForm';

const CreateRecipePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await apiPost('/recipes', data);
      navigate('/my-recipes');
    } catch (error) {
      alert('Failed to create recipe: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Recipe</h1>
          <p className="text-gray-600 mt-2">Share your culinary creation with the world</p>
        </div>
        
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <RecipeForm onSubmit={handleSubmit} buttonText="Create Recipe" />
        </div>
      </div>
    </div>
  );
};

export default CreateRecipePage;
