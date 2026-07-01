# RecipeHub — Frontend

Web app for **RecipeHub**, an AI-powered recipe platform. Browse and search recipes, generate recipes from ingredients with GPT-4o-mini, manage your own recipes, rate and favorite, with role-based access (Regular users vs Chefs). Built with React 19, Vite 7, and Tailwind CSS 4.

## Tech Stack

| Layer        | Technology                |
|-------------|---------------------------|
| **Framework** | React 19                  |
| **Build**   | Vite 7.2                  |
| **Routing** | React Router 7.9          |
| **Styling** | Tailwind CSS 4.1          |
| **State**   | AuthContext, ThemeContext |

## Project Structure

```
recipehub-fe/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── context/          # AuthContext, ThemeContext
│   ├── components/       # Navbar, RecipeCard, RecipeForm, RecipeList, ProtectedRoute
│   └── pages/            # Home, Login, Signup, Dashboard, Browse, RecipeDetail,
│                         # MyRecipes, AIGenerateRecipe, CreateRecipe, EditRecipe
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## Features

- **Auth** — Sign up, login, JWT in localStorage, protected routes
- **Browse** — Public recipes (Chef-only), search and filters
- **AI Generate** — Recipe from ingredients + diet/cuisine/time/difficulty (calls backend GPT-4o-mini)
- **My Recipes** — CRUD, public/private (Chef), manual or AI-generated
- **Ratings & Favorites** — 5-star ratings, bookmark recipes
- **Theme** — Dark/light with system preference and persistence

## Local Development

### Prerequisites

- Node.js 18+
- RecipeHub backend running (local or deployed) with CORS allowing this origin

### Setup

1. Clone and install:

   ```bash
   git clone https://github.com/emanamjad61/recipehub-fe.git && cd recipehub-fe
   npm install
   ```

2. Point the app at your backend. Create `.env` in the project root:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

   (Replace with your backend API base URL if different, e.g. `https://your-lambda-url.lambda-url.region.on.aws/api`.)

3. Start the dev server:

   ```bash
   npm run dev
   ```

   App: [http://localhost:5173](http://localhost:5173) (or the port Vite prints).

### Scripts

| Command       | Description        |
|---------------|--------------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build   |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint         |

## Environment Variables

| Variable             | Description                          |
|----------------------|--------------------------------------|
| `VITE_API_BASE_URL`  | Backend API base URL including `/api` (default: `http://localhost:8000/api`) |

## Backend

The frontend expects the [RecipeHub backend](https://github.com/emanamjad61/recipehub-be) API:

- `POST /api/auth/register`, `POST /api/auth/token`
- `GET/POST /api/recipes`, `GET/PUT/DELETE /api/recipes/:id`, favorites, rate
- `POST /api/ai/recipes/generate`

Ensure the backend allows this origin in CORS.

## License

MIT
