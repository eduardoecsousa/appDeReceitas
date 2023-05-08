import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CardRevenues({ recipe, index, titlePage }) {
  const image = titlePage === 'Drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const name = titlePage === 'Drinks' ? 'strDrink' : 'strMeal';
  const ROUT = titlePage === 'Drinks' ? '/drinks' : '/meals';
  const ID = titlePage === 'Drinks' ? 'idDrink' : 'idMeal';
  return (
    <Card
      style={ {
        maxWidth: '160px',
        display: 'flex',
      } }
    >

      <Link
        to={ `${ROUT}/${recipe[ID]}` }
        data-testid={ `${index}-recipe-card` }
      >
        <Card.Img
          src={ recipe[image] }
          alt="img-recipe"
          data-testid={ `${index}-card-img` }

        />
        <Card.Body>
          <Card.Title data-testid={ `${index}-card-name` }>{recipe[name]}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}

CardRevenues.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({}).isRequired,
  titlePage: PropTypes.string.isRequired,
};

export default CardRevenues;
