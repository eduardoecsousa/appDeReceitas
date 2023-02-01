import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import ButtonCompFavor from './ButtonCompFavor';
import CardDetails from './CardDetails';
import CardRecomend from './CardRecomend';

function CardDatailsDrinks({ details, history }) {
  const [recipeIngredient, setRecipeIngredient] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const { makeFetch } = useFetch();
  useEffect(() => {
    if (details && localStorage.inProgressRecipes) {
      const recipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      console.log(recipeProgress.drinks);
      if (recipeProgress.drinks) {
        const keysMeals = Object.keys(recipeProgress.drinks);
        setContinueRecipe(keysMeals.some((key) => key === details.idDrink));
      }
    }
  }, [details]);

  useEffect(() => {
    const getRecommendations = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const result = await makeFetch(url);
      setRecommendations(result.meals);
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

  const redirectInProgress = () => {
    history.push(`/drinks/${details.idDrink}/in-progress`);
  };

  const shareUrl = `http://localhost:3000${history.location.pathname}`;

  return (
    <div>
      <ButtonCompFavor shareUrl={ shareUrl } recipeFavorite={ details } />
      <CardDetails details={ details } />
      {recipeIngredient.map((component, index) => (
        component.ingredient !== null || component.ingredient !== '' ? (
          <div key={ index }>
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {component.ingredient}

              {component.measure}
            </p>
          </div>
        ) : ''
      ))}
      <CardRecomend recomends={ recommendations } mealsOrDrinks="drinks" />
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

CardDatailsDrinks.propTypes = {
  details: PropTypes.shape({
    idDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};

export default CardDatailsDrinks;
