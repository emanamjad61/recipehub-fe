import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPost } from '../api/client';

const AIGenerateRecipePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [formData, setFormData] = useState({
    ingredients: '',
    diet: '',
    cuisine: '',
    max_time_minutes: 30,
    difficulty: 'Easy',
    servings: 2
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedRecipe(null);

    try {
      // Convert ingredients string to array
      const ingredientsArray = formData.ingredients.split(',').map(i => i.trim()).filter(i => i);
      
      const payload = {
        ...formData,
        ingredients: ingredientsArray,
        max_time_minutes: parseInt(formData.max_time_minutes),
        servings: parseInt(formData.servings)
      };

      const result = await apiPost('/ai/recipes/generate', payload);
      setGeneratedRecipe(result.recipe);
    } catch (error) {
      alert('Failed to generate recipe: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Chef</h1>
          <p className="text-gray-600 mt-2">Generate unique recipes based on your ingredients</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Recipe Parameters
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredients <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="ingredients"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors resize-none"
                  rows="3"
                  placeholder="e.g. chicken, rice, garlic, onions"
                  value={formData.ingredients}
                  onChange={handleChange}
                  required
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Separate ingredients with commas</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Preference
                  </label>
                  <select
                    name="diet"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors bg-white"
                    value={formData.diet}
                    onChange={handleChange}
                  >
                    <option value="">Any</option>
                    <option value="Halal">☪️ Halal</option>
                    <option value="Vegan">🌱 Vegan</option>
                    <option value="Vegetarian">🥬 Vegetarian</option>
                    <option value="Keto">🥑 Keto</option>
                    <option value="Gluten-Free">🌾 Gluten-Free</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Style
                  </label>
                  <select
                    name="cuisine"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors bg-white"
                    value={formData.cuisine}
                    onChange={handleChange}
                  >
                    <option value="">Any</option>
                    <option value="Italian">🇮🇹 Italian</option>
                    <option value="Asian">🥢 Asian</option>
                    <option value="Mexican">🇲🇽 Mexican</option>
                    <option value="Indian">🇮🇳 Indian</option>
                    <option value="Mediterranean">🫒 Mediterranean</option>
                    <option value="American">🇺🇸 American</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Time (min)
                  </label>
                  <input
                    type="number"
                    name="max_time_minutes"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors"
                    value={formData.max_time_minutes}
                    onChange={handleChange}
                    min="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    name="difficulty"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors bg-white"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    <option value="Easy">🟢 Easy</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Hard">🔴 Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servings
                  </label>
                  <input
                    type="number"
                    name="servings"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors"
                    value={formData.servings}
                    onChange={handleChange}
                    min="1"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Consulting AI Chef...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Recipe
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div>
            {loading && (
              <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                  <span className="text-4xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Crafting your recipe...</h3>
                <p className="text-gray-500 text-center">Our AI chef is cooking up something special for you!</p>
              </div>
            )}

            {generatedRecipe && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Success Banner */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
                  <div className="flex items-center space-x-3 text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">Recipe generated and saved!</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{generatedRecipe.title}</h2>
                  <p className="text-gray-600 mb-6">{generatedRecipe.description}</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">🥗</span> Ingredients
                    </h3>
                    <ul className="space-y-2">
                      {generatedRecipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    to={`/recipes/${generatedRecipe.id}`} 
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    View Full Recipe
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
            
            {!loading && !generatedRecipe && (
              <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl opacity-50">🥗</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to cook?</h3>
                <p className="text-gray-500 max-w-sm">
                  Fill out the form with your available ingredients and preferences to generate a unique recipe.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGenerateRecipePage;
