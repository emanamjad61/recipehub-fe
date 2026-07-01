import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.12)] dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)] dark:hover:border-gray-600 transition-all duration-300 overflow-hidden group">
      {/* Card Header with Gradient */}
      <div className="h-3 bg-gradient-to-r from-primary-400 to-primary-600"></div>
      
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {recipe.title}
        </h3>
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.time_minutes}m
          </span>
          <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          <span className="inline-flex items-center text-sm text-amber-500 font-medium">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {recipe.avg_rating ? Number(recipe.avg_rating).toFixed(1) : 'New'}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-lg"
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2.5 py-1 text-gray-400 text-xs">
                +{recipe.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* View Button */}
        <Link 
          to={`/recipes/${recipe.id}`} 
          className="w-full inline-flex items-center justify-center px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
        >
          View Recipe
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
