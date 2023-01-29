import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

function CardDetailsMeals({ details }) {
  const [urlYoutube, setUrlYoutube] = useState('');
  const [recipeIngredient, setRecipeIngredient] = useState([]);
  // const [recommendations, setrecommendations] = useState(null);
  const { makeFetch } = useFetch();

  useEffect(() => {
    const getRecommendations = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      await makeFetch(url);
    };
    getRecommendations();
  }, []);

  useEffect(() => {
    if (details.strYoutube) {
      const separateStinf = details.strYoutube.split('watch?v=');
      const newUrlYoutube = `${separateStinf[0]}embed/${separateStinf[1]}`;
      setUrlYoutube(newUrlYoutube);
    }
  }, [details]);

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

  const allow = (
    'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  );

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt="img-details"
      />
      <h4 data-testid="recipe-title">{ details.strMeal }</h4>
      <p data-testid="recipe-category">{ details.strCategory}</p>
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
      <iframe
        width="360"
        height="200"
        src={ urlYoutube }
        allow={ allow }
        allowFullScreen
        title="Embedded youtube"
        data-testid="video"
      />
    </div>
  );
}

CardDetailsMeals.propTypes = {
  details: PropTypes.shape({
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.shape({
      split: PropTypes.func,
    }).isRequired,
  }).isRequired,
};

export default CardDetailsMeals;
