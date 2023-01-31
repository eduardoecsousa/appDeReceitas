import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import ButtonCompFavor from './ButtonCompFavor';
import CardRecomend from './CardRecomend';

function CardDetailsMeals({ details, history }) {
  const [urlYoutube, setUrlYoutube] = useState('');
  const [recipeIngredient, setRecipeIngredient] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const { makeFetch } = useFetch();

  useEffect(() => {
    if (details && localStorage.inProgressRecipes) {
      const recipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const keysMeals = Object.keys(recipeProgress.meals);
      setContinueRecipe(keysMeals.some((key) => key === details.idMeal));
    }
  }, [details]);

  useEffect(() => {
    const getRecommendations = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const result = await makeFetch(url);
      setRecommendations(result.drinks);
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

  const redirectInProgress = () => {
    history.push(`/meals/${details.idMeal}/in-progress`);
  };

  const allow = (
    'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  );

  const shareUrl = `http://localhost:3000${history.location.pathname}`;

  return (
    <div>
      <ButtonCompFavor shareUrl={ shareUrl } recipeFavorite={ details } />
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt="img-details"
        style={ {
          maxWidth: '360px',
        } }
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
      <CardRecomend recomends={ recommendations } mealsOrDrinks="meals" />
      <button
        data-testid="start-recipe-btn"
        className="start-recipe"
        onClick={ redirectInProgress }
      >
        {continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

CardDetailsMeals.propTypes = {
  details: PropTypes.shape({
    idMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strYoutube: PropTypes.shape({
      split: PropTypes.func,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};

export default CardDetailsMeals;
