import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeTile } from '../redux/actions';
import FilterMealsOrDrinks from '../components/FilterMealsOrDrinks';
import CardFavorite from '../components/CardFavorite';
import Header from '../components/Header';

function FavoriteRecipes({ dispatch }) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filters, setFilters] = useState(favorites);
  const [updateStorage, setUpdateStorage] = useState(false);

  useEffect(() => {
    dispatch(changeTile('Favorite Recipes'));
  }, []);

  useEffect(() => {
    setFilters(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [updateStorage]);
  return (
    <div>
      <Header />
      { !filters || filters.length < 1
        ? <h3>Você não tem receitas favoritas.</h3>
        : (
          <div>
            <FilterMealsOrDrinks
              getDoneRecipes={ favorites }
              setFilters={ setFilters }
            />
            <CardFavorite favorites={ filters } setUpdateStorage={ setUpdateStorage } />
          </div>
        ) }
    </div>
  );
}

FavoriteRecipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(FavoriteRecipes);
