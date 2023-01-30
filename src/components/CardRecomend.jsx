import PropTypes from 'prop-types';
import React from 'react';

const FIVE = 5;

function CardRecomend({ recomends, mealsOrDrinks }) {
  const keyObjId = mealsOrDrinks === 'drinks' ? 'idMeal' : 'idDrink';
  const keyObjName = mealsOrDrinks === 'drinks' ? 'strMeal' : 'strDrink';
  const keyObjImg = mealsOrDrinks === 'drinks' ? 'strMealThumb' : 'strDrinkThumb';
  if (recomends) {
    return (
      <div className="carrosel">
        {recomends.map((recomend, index) => index <= FIVE && (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ recomend[keyObjId] }
            className="container-item-carrosel"
          >
            <img
              src={ recomend[keyObjImg] }
              alt="img-recomends"
              style={ {
                maxWidth: '160px',
              } }
            />
            <h5
              data-testid={ `${index}-recommendation-title` }
            >
              {recomend[keyObjName]}

            </h5>
          </div>
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
