import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function RadioIngredients({ details, setAllDone }) {
  const [recipeIngredient, setRecipeIngredient] = useState([]);
  const [id, setId] = useState();
  const [key, setKey] = useState();

  const filterIngredients = () => {
    const keys = Object.keys(details);
    const keysIngredients = keys.filter((keyObj) => keyObj
      .toLowerCase().includes('strIngredient'.toLowerCase()));
    const keysMeasure = keys.filter((keyObj) => keyObj
      .toLowerCase().includes('strMeasure'.toLowerCase()));
    const arrayObj = [];
    keysIngredients.forEach((keyIngredint, index) => arrayObj
      .push({
        marked: false,
        ingredient: details[keyIngredint],
        measure: details[keysMeasure[index]],
      }));
    setRecipeIngredient(arrayObj);
  };

  useEffect(() => {
    let idRecipe = '';
    let keyRecipe = '';

    if (details.idMeal) {
      setId(details.idMeal);
      setKey('meals');
      idRecipe = details.idMeal;
      keyRecipe = 'meals';
    } else {
      setId(details.idDrink);
      setKey('drinks');
      idRecipe = details.idDrink;
      keyRecipe = 'drinks';
    }

    const storageInProgress = localStorage.inProgressRecipes
      ? JSON.parse(localStorage.inProgressRecipes)
      : undefined;

    if (storageInProgress) {
      if (storageInProgress[keyRecipe]) {
        if (storageInProgress[keyRecipe][idRecipe]) {
          setRecipeIngredient(storageInProgress[keyRecipe][idRecipe]);
        } else {
          filterIngredients();
        }
      } else {
        filterIngredients();
      }
    } else {
      filterIngredients();
    }
  }, [details]);

  const saveOnStorage = (recipe) => {
    if (localStorage.inProgressRecipes) {
      const inProgress = JSON.parse(localStorage.inProgressRecipes);
      inProgress[key] = { ...inProgress[key], [id]: recipe };
      localStorage.inProgressRecipes = JSON.stringify(inProgress);
    } else {
      const inProgress = { [key]: { [id]: recipe } };
      localStorage.inProgressRecipes = JSON.stringify(inProgress);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    let valueBool = '';
    if (typeof value === 'string') {
      console.log(value);
      valueBool = JSON.parse(value);
    } else {
      valueBool = value;
    }
    const toggleMark = recipeIngredient.map((recipe) => {
      if (recipe.ingredient === name) {
        return { ...recipe, marked: !valueBool };
      }
      return recipe;
    });
    console.log(toggleMark);
    const newRecipes = toggleMark.filter((recipe) => recipe.ingredient);
    console.log(newRecipes);
    setAllDone(newRecipes.every((recipe) => recipe.marked === true));
    setRecipeIngredient(toggleMark);
    saveOnStorage(toggleMark);
  };

  return (
    <div>
      {recipeIngredient.map((component, index) => (
        component.ingredient ? (
          <label
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `${index}-ingredient-step` }
            key={ index }
            className={ component.marked && 'isMarked' }
          >
            <input
              type="checkbox"
              value={ component.marked }
              checked={ component.marked }
              onChange={ handleChange }
              name={ component.ingredient }
              id={ `${index}-ingredient-step` }
            />
            {component.ingredient}
            {component.measure}

          </label>
        ) : ''
      ))}
    </div>
  );
}

RadioIngredients.propTypes = {
  details: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
  setAllDone: PropTypes.func.isRequired,
};
