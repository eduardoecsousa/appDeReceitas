import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeTile } from '../redux/actions';
import ButtonCompFavor from '../components/ButtonCompFavor';

function FavoriteRecipes({ dispatch }) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const keyObjId = mealsOrDrinks === 'drinks' ? 'idMeal' : 'idDrink';
  // const keyObjName = mealsOrDrinks === 'drinks' ? 'strMeal' : 'strDrink';
  // const keyObjImg = mealsOrDrinks === 'drinks' ? 'strMealThumb' : 'strDrinkThumb';

  useEffect(() => {
    dispatch(changeTile('Favorite Recipes'));
  }, []);

  return (
    <div>
      { favorites.map((favorite) => (
        <div
          key={ favorite.name }
        >
          <img
            src={ favorite.image }
            alt={ favorite.name }
            // data-testid={ `${index}-horizontal-image` }
            style={ {
              maxWidth: '360px',
            } }
          />
          <h5>{favorite.name}</h5>
          <p>{favorite.nationality}</p>
          <p>{favorite.type}</p>
          <ButtonCompFavor shareUrl={ shareUrl } />
        </div>
      ))}
    </div>
  );
}

FavoriteRecipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(FavoriteRecipes);
