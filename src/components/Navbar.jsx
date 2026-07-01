import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={() => setIsMobileMenuOpen(false)}
      className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
        isActive(to)
          ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30'
          : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {children}
    </Link>
  );

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🍳</span>
            </div>
            <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
              RecipeHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/recipes">Browse</NavLink>
            {user && (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/my-recipes">My Recipes</NavLink>
                <NavLink to="/ai/generate">AI Generate</NavLink>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-sage-100 dark:bg-sage-900 rounded-full flex items-center justify-center">
                    <span className="text-sage-700 dark:text-sage-300 font-medium text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{user.name}</span>
                  {user.user_type === 'CHEF' && (
                    <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                      Chef
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-3 space-y-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/recipes">Browse Recipes</NavLink>
            {user && (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/my-recipes">My Recipes</NavLink>
                <NavLink to="/ai/generate">AI Generate</NavLink>
              </>
            )}
          </div>
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-sage-100 dark:bg-sage-900 rounded-full flex items-center justify-center">
                    <span className="text-sage-700 dark:text-sage-300 font-medium text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium rounded-lg transition-colors text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-center text-gray-600 dark:text-gray-300 hover:text-primary-600 font-medium border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-center bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
