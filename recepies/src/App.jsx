

import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_KEY = 'd7a3ae8f9dfe4da6976b9a8eabaa6498';

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
          //`https://api.spoonacular.com/recipes/findByNutrients?minCarbs=${MIN_CARBS}&maxCarbs=${MAX_CARBS}&apiKey=${process.env.REACT_APP_API_KEY}`
          
        );
        //console.log("API Key:", process.env.REACT_APP_API_KEY);

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




  const caloriesFatsData = {
    labels: filteredRecipes.map((recipe) => recipe.title),
    datasets: [
      {
        label: 'Calories',
        data: filteredRecipes.map((recipe) => recipe.calories),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Fats',
        data: filteredRecipes.map((recipe) => parseInt(recipe.fat.match(/\d+/) || 0, 10)),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
    ],
  };

  const caloriesCarbsData = {
    labels: filteredRecipes.map((recipe) => recipe.title),
    datasets: [
      {
        label: 'Calories',
        data: filteredRecipes.map((recipe) => recipe.calories),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Carbs',
        data: filteredRecipes.map((recipe) => parseInt(recipe.carbs.match(/\d+/) || 0, 10)),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  };

  const caloriesProteinsData = {
    labels: filteredRecipes.map((recipe) => recipe.title),
    datasets: [
      {
        label: 'Calories',
        data: filteredRecipes.map((recipe) => recipe.calories),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Proteins',
        data: filteredRecipes.map((recipe) => parseInt(recipe.protein.match(/\d+/) || 0, 10)),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
      },
    ],
  };


  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Nutritional Comparison by Recipe',
      },
    },
    scales: {
      x: {
        display: false,
        title: {
          display: true,
          text: 'Recipe',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
 
  };



return (
  <Router>
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Recipe Finder</h1>

              <div className="stats-container">
                <p className="stats-item">
                  Average Calories: {filteredRecipes.length > 0 ? (
                    (filteredRecipes.reduce((acc, recipe) => acc + (recipe.calories || 0), 0) / filteredRecipes.length).toFixed(2)
                  ) : 'N/A'}
                </p>
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

              <div className="content-container">
                <div className="recipe-list">
                  {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                      <div key={recipe.id} className="recipe-item">
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title} />
                        <p>Calories: {recipe.calories}</p>
                        <Link to={`/recipe/${recipe.id}`} className="details-link" style={{ display: 'block', marginTop: '10px' }}>Details</Link>
                      </div>
                    ))
                  ) : (
                    <p>No results found.</p>
                  )}
                </div>
                <div className="chart-container narrow-charts">
                  <div className="chart-item">
                    <Line data={caloriesFatsData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Calories vs Fats' } } }} />
                  </div>
                  <div className="chart-item">
                    <Line data={caloriesCarbsData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Calories vs Carbs' } } }} />
                  </div>
                  <div className="chart-item">
                    <Line data={caloriesProteinsData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Calories vs Proteins' } } }} />
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
      </Routes>
    </div>
  </Router>
);
};


const RecipeDetail = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <p>Calories: {recipe.calories}</p>
      <p>Protein: {recipe.protein}</p>
      <p>Fat: {recipe.fat}</p>
      <p>Carbs: {recipe.carbs}</p>
      <Link to="/" className="back-link" style={{ display: 'block', marginTop: '20px' }}>Back to Home</Link>
    </div>
  );
};


export default App;
