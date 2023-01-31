import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CardRevenues({ recipe, index, titlePage }) {
  const image = titlePage === 'Drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const name = titlePage === 'Drinks' ? 'strDrink' : 'strMeal';
  const ROUT = titlePage === 'Drinks' ? '/drinks' : '/meals';
  const ID = titlePage === 'Drinks' ? 'idDrink' : 'idMeal';
  return (
    <Link
      to={ `${ROUT}/${recipe[ID]}` }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ recipe[image] }
        alt="img-recipe"
        data-testid={ `${index}-card-img` }
        style={ {
          maxWidth: '360px',
        } }
      />
      <p data-testid={ `${index}-card-name` }>{recipe[name]}</p>
    </Link>
  );
}

CardRevenues.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({}).isRequired,
  titlePage: PropTypes.string.isRequired,
};

export default CardRevenues;
