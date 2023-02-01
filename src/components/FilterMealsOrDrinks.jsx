import React from 'react';
import PropTypes from 'prop-types';

function FilterMealsOrDrinks({ getDoneRecipes, setFilters }) {
  const handleFilters = (type = '') => {
    if (type === 'meal') {
      const filterMeals = getDoneRecipes.filter((meal) => meal.type === 'meal');
      setFilters(filterMeals);
    } else {
      const filterDrinks = getDoneRecipes.filter((meal) => meal.type === 'drink');
      setFilters(filterDrinks);
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilters(getDoneRecipes) }

      >
        ALL
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilters('meal') }
      >
        MEALS
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilters('drink') }
      >
        DRINKS
      </button>
    </div>
  );
}

FilterMealsOrDrinks.propTypes = {
  getDoneRecipes: PropTypes.shape({
    filter: PropTypes.func,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterMealsOrDrinks;
