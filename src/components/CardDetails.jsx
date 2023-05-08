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

  if (details.strInstructions && recipe) {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ details[recipe.img] }
          alt="img-details"
          style={ {
            maxWidth: '360px',
          } }
          className="img-card-details"
        />
        <h4 data-testid="recipe-title" className="title">{ details[recipe.title] }</h4>
        <div className="container-category">
          <h5 className="title-secondary">Category:</h5>
          <p
            data-testid="recipe-category"
            className="category"
          >
            { details[recipe.category]}

          </p>
        </div>
        <div>
          <h3 className="title-secondary">Instructions</h3>
          <div className="constainer-border">
            <p
              data-testid="instructions"
              className="instructions"
            >
              {details.strInstructions}

            </p>
          </div>
        </div>
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
