import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FIVE = 5;

function CardRecomend({ recomends, mealsOrDrinks }) {
  const keyObjId = mealsOrDrinks === 'drinks' ? 'idMeal' : 'idDrink';
  const keyObjName = mealsOrDrinks === 'drinks' ? 'strMeal' : 'strDrink';
  const keyObjImg = mealsOrDrinks === 'drinks' ? 'strMealThumb' : 'strDrinkThumb';
  const url = mealsOrDrinks === 'drinks' ? '/meals' : '/drinks';
  if (recomends) {
    return (
      <div className="carrosel">
        {recomends.map((recomend, index) => index <= FIVE && (
          <Card
            data-testid={ `${index}-recommendation-card` }
            key={ recomend[keyObjId] }
            className="container-item-carrosel"
          >
            <Link to={ `${url}/${recomend[keyObjId]}` } className="link">
              <Card.Img
                src={ recomend[keyObjImg] }
                alt="img-recomends"
                style={ {
                  maxWidth: '160px',
                } }
              />
              <Card.Body>
                <Card.Title
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recomend[keyObjName]}

                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </div>
    );
  }
}

CardRecomend.propTypes = {
  mealsOrDrinks: PropTypes.string.isRequired,
  recomends: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default CardRecomend;
