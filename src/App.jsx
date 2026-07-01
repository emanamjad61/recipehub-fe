import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import BrowseRecipesPage from './pages/BrowseRecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import MyRecipesPage from './pages/MyRecipesPage';
import AIGenerateRecipePage from './pages/AIGenerateRecipePage';
import EditRecipePage from './pages/EditRecipePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/recipes" element={<BrowseRecipesPage />} />
              <Route path="/recipes/:id" element={<RecipeDetailPage />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/my-recipes" element={
                <ProtectedRoute>
                  <MyRecipesPage />
                </ProtectedRoute>
              } />
              <Route path="/ai/generate" element={
                <ProtectedRoute>
                  <AIGenerateRecipePage />
                </ProtectedRoute>
              } />
              <Route path="/recipes/:id/edit" element={
                <ProtectedRoute>
                  <EditRecipePage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="text-center mt-4 mb-4" style={{ color: '#888', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} RecipeHub AI. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
