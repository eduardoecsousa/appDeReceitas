import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ButtonCompFavor from './ButtonCompFavor';

function CardFavorite({ favorites, setUpdateStorage }) {
  return (
    <div>
      {favorites.map((item, index) => {
        let url = '';
        let itemObj = {};
        if (item.type === 'meal') {
          itemObj = { idMeal: item.id };
          url = `http://localhost:3000/meals/${item.id}`;
        } else {
          url = `http://localhost:3000/drinks/${item.id}`;
          itemObj = { idDrink: item.id };
        }
        return (
          <div key={ index }>
            <Link
              to={ item.type === 'meal'
                ? `/meals/${item.id}`
                : `/drinks/${item.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                alt={ item.name }
                style={ {
                  maxWidth: '360px',
                } }
              />
              <h5 data-testid={ `${index}-horizontal-name` }>{item.name}</h5>
            </Link>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {(`${item.nationality} - ${item.category}`)}
            </p>
            {item.alcoholicOrNot.length > 0
              ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {item.alcoholicOrNot}
                </p>)
              : ''}
            <ButtonCompFavor
              recipeFavorite={ { ...item, ...itemObj } }
              shareUrl={ url }
              setUpdateStorage={ setUpdateStorage }
              buttonIndex={ index }
            />
          </div>
        );
      })}
    </div>
  );
}

CardFavorite.propTypes = {
  favorites: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  getDoneRecipes: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  setUpdateStorage: PropTypes.func.isRequired,
};

export default CardFavorite;
