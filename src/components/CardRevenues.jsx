import PropTypes from 'prop-types';
import React from 'react';

function CardRevenues({ recipe, index, titlePage }) {
  const image = titlePage === 'Drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const name = titlePage === 'Drinks' ? 'strDrink' : 'strMeal';
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe[image] }
        alt="img-recipe"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{recipe[name]}</p>
    </div>
  );
}

CardRevenues.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({}).isRequired,
  titlePage: PropTypes.string.isRequired,
};

export default CardRevenues;
