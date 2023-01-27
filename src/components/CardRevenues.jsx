import PropTypes from 'prop-types';
import React from 'react';

function CardRevenues({ recipe, index, titlepage }) {
  const image = titlepage === 'Drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const name = titlepage === 'Drinks' ? 'strDrink' : 'strMeal';
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
  recipe: PropTypes.shape([]).isRequired,
  titlepage: PropTypes.string.isRequired,
};

export default CardRevenues;
