import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const RecipeForm = ({ initialData, onSubmit, buttonText }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    time_minutes: 30,
    difficulty: 'Easy',
    tags: '',
    is_public: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        ingredients: Array.isArray(initialData.ingredients) ? initialData.ingredients.join('\n') : initialData.ingredients,
        steps: Array.isArray(initialData.steps) ? initialData.steps.join('\n') : initialData.steps,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      ingredients: formData.ingredients.split('\n').filter(line => line.trim()),
      steps: formData.steps.split('\n').filter(line => line.trim()),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      time_minutes: parseInt(formData.time_minutes)
    };
    
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          name="title"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors"
          placeholder="Give your recipe a name"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors resize-none"
          rows="3"
          placeholder="Describe your recipe..."
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ingredients <span className="text-gray-400 font-normal">(one per line)</span>
        </label>
        <textarea
          name="ingredients"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors resize-none font-mono text-sm"
          rows="6"
          placeholder="2 cups flour&#10;1 tsp salt&#10;3 eggs"
          value={formData.ingredients}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Steps <span className="text-gray-400 font-normal">(one per line)</span>
        </label>
        <textarea
          name="steps"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors resize-none"
          rows="6"
          placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients"
          value={formData.steps}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time (minutes)</label>
          <input
            type="number"
            name="time_minutes"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors"
            value={formData.time_minutes}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags <span className="text-gray-400 font-normal">(comma separated)</span>
        </label>
        <input
          type="text"
          name="tags"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors"
          placeholder="e.g. vegetarian, quick, healthy"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>

      {user?.user_type === 'CHEF' && (
        <div className="bg-gray-50 rounded-xl p-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="is_public"
              checked={formData.is_public}
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <div className="ml-3">
              <span className="font-medium text-gray-900">Make Public</span>
              <p className="text-sm text-gray-500">Everyone can see this recipe</p>
            </div>
          </label>
        </div>
      )}
      
      {user?.user_type === 'REGULAR' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-medium text-blue-800">Private Recipe</p>
            <p className="text-sm text-blue-600">As a regular user, this recipe will be saved to your private collection.</p>
          </div>
        </div>
      )}

      <button 
        type="submit" 
        className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
      >
        {buttonText || 'Save Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;
