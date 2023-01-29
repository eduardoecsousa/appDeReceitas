import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

function CardDatailsDrinks({ details }) {
  const [recipeIngredient, setRecipeIngredient] = useState([]);
  // const [recommendations, setrecommendations] = useState(null);
  const { makeFetch } = useFetch();

  useEffect(() => {
    const getRecommendations = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      await makeFetch(url);
    };
    getRecommendations();
  }, []);

  useEffect(() => {
    const keys = Object.keys(details);
    const keysIngredients = keys.filter((keyObj) => keyObj
      .toLowerCase().includes('strIngredient'.toLowerCase()));
    const keysMeasure = keys.filter((keyObj) => keyObj
      .toLowerCase().includes('strMeasure'.toLowerCase()));
    const arrayObj = [];
    keysIngredients.forEach((keyIngredint, index) => arrayObj
      .push({
        ingredient: details[keyIngredint], measure: details[keysMeasure[index]],
      }));
    setRecipeIngredient(arrayObj);
  }, [details]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt="img-details"
      />
      <h4 data-testid="recipe-title">{ details.strDrink }</h4>
      <p data-testid="recipe-category">{ details.strAlcoholic}</p>
      {recipeIngredient.map((component, index) => (
        component.ingredient !== null || component.ingredient !== '' ? (
          <div key={ index }>
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {component.ingredient}
            </p>
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {component.measure}
            </p>
          </div>
        ) : ''
      ))}
      <p data-testid="instructions">{details.strInstructions}</p>
    </div>
  );
}

CardDatailsDrinks.propTypes = {
  details: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
};

export default CardDatailsDrinks;
