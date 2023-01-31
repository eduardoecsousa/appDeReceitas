import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function CardDetails({ details }) {
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    let recipeObj = {};
    if (details.strMeal) {
      recipeObj = {
        title: 'strMeal',
        img: 'strMealThumb',
        category: 'strCategory',
      };
    } else {
      recipeObj = {
        title: 'strDrink',
        img: 'strDrinkThumb',
        category: 'strAlcoholic',
      };
    }
    setRecipe(recipeObj);
  }, [details]);
  if (details.strInstructions) {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ details[recipe.img] }
          alt="img-details"
          style={ {
            maxWidth: '360px',
          } }
        />
        <h4 data-testid="recipe-title">{ details[recipe.title] }</h4>
        <p data-testid="recipe-category">{ details[recipe.category]}</p>
        <p data-testid="instructions">{details.strInstructions}</p>
      </div>
    );
  }
}

CardDetails.propTypes = {
  details: PropTypes.shape({
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
  }).isRequired,
};
