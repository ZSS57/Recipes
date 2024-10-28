import React from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 'auto' }} />
      <p>Calories: {recipe.calories}</p>
      <p>Protein: {recipe.protein}</p>
      <p>Fat: {recipe.fat}</p>
      <p>Carbs: {recipe.carbs}</p>
      {/* Back to Recipe List Button */}
      <Link to="/">
        <button className="back-button">Back to Recipes</button>
      </Link>
    </div>
  );
};

export default RecipeDetail;
