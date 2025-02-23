import { useState } from 'react';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRecipe = async () => {
    setLoading(true);
    setRecipe('');
    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });
      
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      setRecipe('Error fetching recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Recipe Generator</h1>
      <div className="input-container">
        <textarea
          placeholder="Enter ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={fetchRecipe} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </div>
      {recipe && <div className="recipe-result"><h2>Generated Recipe:</h2><p>{recipe}</p></div>}
    </div>
  );
}

export default App;
