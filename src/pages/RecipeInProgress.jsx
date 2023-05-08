import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ButtonCompFavor from '../components/ButtonCompFavor';
import CardDetails from '../components/CardDetails';
import RadioIngredients from '../components/RadioIngredients';
import useFetch from '../hooks/useFetch';

function RecipeInProgress({
  history: {
    location: { pathname },
  },
  history,
  match: {
    params: { id },
  } }) {
  const [details, setDetails] = useState([]);
  const [allDone, setAllDone] = useState(false);
  const { makeFetch } = useFetch();
  useEffect(() => {
    const API = pathname === `/meals/${id}/in-progress` ? 'themealdb' : 'thecocktaildb';
    const KEY = pathname === `/meals/${id}/in-progress` ? 'meals' : 'drinks';
    const url = `https://www.${API}.com/api/json/v1/1/lookup.php?i=${id}`;
    const getDetails = async () => {
      const result = await makeFetch(url);
      setDetails(result[KEY][0]);
    };
    getDetails();
  }, []);

  const saveDoned = () => {
    let keys = {};
    if (details.idMeal) {
      keys = {
        id: details.idMeal,
        type: 'meal',
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb,
        doneDate: new Date().toISOString(),
        tags: details.strTags.split(','),
      };
    } else {
      keys = {
        id: details.idDrink,
        type: 'drink',
        nationality: '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic,
        name: details.strDrink,
        image: details.strDrinkThumb,
        doneDate: new Date().toISOString(),
        tags: [],
      };
    }
    const recipesDone = localStorage.doneRecipes
      ? JSON.parse(localStorage.doneRecipes)
      : [];
    recipesDone.push(keys);
    localStorage.doneRecipes = JSON.stringify(recipesDone);
    history.push('/done-recipes');
  };

  const shareUrl = `http://localhost:3000${pathname}`.split('/in-progress')[0];
  return (
    <div>
      <ButtonCompFavor recipeFavorite={ details } shareUrl={ shareUrl } />
      <CardDetails details={ details } />
      <RadioIngredients details={ details } setAllDone={ setAllDone } />
      <div className="container-button">
        <button
          type="button"
          onClick={ saveDoned }
          data-testid="finish-recipe-btn"
          disabled={ !allDone }
          className="start-recipe btn btn-warning"
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
