// import React, { useState, useEffect } from 'react';
// import './App.css';

// const API_KEY = '80f0a9d4ba9e4af5a4f0673ca67f2ed1';
// const MIN_CARBS = 10;
// const MAX_CARBS = 1000;

// const App = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [searchTitle, setSearchTitle] = useState('');
//   const [calorieFilter, setCalorieFilter] = useState(190);

//   // Fetching the data using useEffect and async/await
//   useEffect(() => {
//     const fetchRecipeData = async () => {
//       try {
//         const response = await fetch(
//           `https://api.spoonacular.com/recipes/findByNutrients?minCarbs=${MIN_CARBS}&maxCarbs=${MAX_CARBS}&apiKey=${API_KEY}`
//         );
//         const data = await response.json();
//         console.log('Recipes:', data);

//         setRecipes(data);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     fetchRecipeData();
//   }, []);

//   // Filter recipes by title and calories
//   const filteredRecipes = recipes.filter((recipe) => {
//     const matchesTitle = recipe.title.toLowerCase().includes(searchTitle.toLowerCase());
//     const matchesCalories = recipe.calories <= calorieFilter;

//     return matchesTitle && matchesCalories;
//   });

//   return (
//     <div className="App">
//       <h1>Recipe Finder</h1>

//       <div className="stats-container">
//         <p className="stats-item">Average Calories: {filteredRecipes.length > 0 ? (filteredRecipes.reduce((acc, recipe) => acc + recipe.calories, 0) / filteredRecipes.length).toFixed(2) : 'N/A'}</p>
//         <p className="stats-item">Average Protein: {filteredRecipes.length > 0 ? (filteredRecipes.reduce((acc, recipe) => acc + parseInt(recipe.protein), 0) / filteredRecipes.length).toFixed(2) + 'g' : 'N/A'}</p>
//         <p className="stats-item">Average Fat: {filteredRecipes.length > 0 ? (filteredRecipes.reduce((acc, recipe) => acc + parseInt(recipe.fat), 0) / filteredRecipes.length).toFixed(2) + 'g' : 'N/A'}</p>
//         <p className="stats-item">Average Carbs: {filteredRecipes.length > 0 ? (filteredRecipes.reduce((acc, recipe) => acc + parseInt(recipe.carbs), 0) / filteredRecipes.length).toFixed(2) + 'g' : 'N/A'}</p>
//       </div>

//       {/* Input to search by title */}
//       <input
//         type="text"
//         placeholder="Search by title..."
//         value={searchTitle}
//         onChange={(e) => setSearchTitle(e.target.value)}
//       />

//       {/* Slider to filter by calories */}
//       <div className="slider-container">
//         <label>Calories: {calorieFilter}</label>
//         <input
//           type="range"
//           min="190"
//           max="1000"
//           value={calorieFilter}
//           onChange={(e) => setCalorieFilter(Number(e.target.value))}
//         />
//       </div>

//       {/* Displaying the list of recipes */}
//       {/* <div className="recipe-list">
//         {filteredRecipes.map((recipe) => (
//           <div key={recipe.id} className="recipe-item">
//             <h3>{recipe.title}</h3>
//             <img src={recipe.image} alt={recipe.title} />
//             <p>Calories: {recipe.calories}</p>
//             <p>Protein: {recipe.protein}</p>
//             <p>Fat: {recipe.fat}</p>
//             <p>Carbs: {recipe.carbs}</p>
//           </div>
//         ) */}
//         <div className="recipe-list">
//         {filteredRecipes.length > 0 ? (
//           filteredRecipes.map((recipe) => (
//             <div key={recipe.id} className="recipe-item">
//               <h3>{recipe.title}</h3>
//               <img src={recipe.image} alt={recipe.title} />
//               <p>Calories: {recipe.calories}</p>
//               <p>Protein: {recipe.protein}</p>
//               <p>Fat: {recipe.fat}</p>
//               <p>Carbs: {recipe.carbs}</p>
//             </div>
//           ))
//         ) : (
//           <p>No results found.</p>
        
        
//         )}
//       </div>
//     </div>
//   );
// };
  

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '80f0a9d4ba9e4af5a4f0673ca67f2ed1';
const MIN_CARBS = 10;
const MAX_CARBS = 1000;

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [calorieFilter, setCalorieFilter] = useState(190);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByNutrients?minCarbs=${MIN_CARBS}&maxCarbs=${MAX_CARBS}&apiKey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        console.log('Recipes:', data);
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesTitle = recipe.title.toLowerCase().includes(searchTitle.toLowerCase());
    return matchesTitle && recipe.calories <= calorieFilter;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Recipe Finder</h1>

      <div className="stats-container">
        <p className="stats-item">
          Average Calories: {filteredRecipes.length > 0 ? (
            (filteredRecipes.reduce((acc, recipe) => acc + (recipe.calories || 0), 0) / filteredRecipes.length).toFixed(2)
          ) : 'N/A'}
        </p>
        {/* Adjusted parsing for protein, fat, carbs */}
        <p className="stats-item">
          Average Protein: {filteredRecipes.length > 0 ? (
            (filteredRecipes.reduce((acc, recipe) => acc + parseInt(recipe.protein.match(/\d+/) || 0, 10), 0) / filteredRecipes.length).toFixed(2) + 'g'
          ) : 'N/A'}
        </p>
        <p className="stats-item">
          Average Fat: {filteredRecipes.length > 0 ? (
            (filteredRecipes.reduce((acc, recipe) => acc + parseInt(recipe.fat.match(/\d+/) || 0, 10), 0) / filteredRecipes.length).toFixed(2) + 'g'
          ) : 'N/A'}
        </p>
        <p className="stats-item">
          Average Carbs: {filteredRecipes.length > 0 ? (
            (filteredRecipes.reduce((acc, recipe) => acc + parseInt(recipe.carbs.match(/\d+/) || 0, 10), 0) / filteredRecipes.length).toFixed(2) + 'g'
          ) : 'N/A'}
        </p>
      </div>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />

      <div className="slider-container">
        <label>Calories: {calorieFilter}</label>
        <input
          type="range"
          min="190"
          max="1000"
          value={calorieFilter}
          onChange={(e) => setCalorieFilter(Number(e.target.value))}
        />
      </div>

      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
              <p>Calories: {recipe.calories}</p>
              <p>Protein: {recipe.protein}</p>
              <p>Fat: {recipe.fat}</p>
              <p>Carbs: {recipe.carbs}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
