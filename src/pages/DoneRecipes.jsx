/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeTile } from '../redux/actions';
import CardDoneRecipes from '../components/CardDoneRecipes';
import FilterMealsOrDrinks from '../components/FilterMealsOrDrinks';
import Header from '../components/Header';

function DoneRecipes({ dispatch }) {
  useEffect(() => {
    dispatch(changeTile('Done Recipes'));
  }, []);
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filters, setFilters] = useState(getDoneRecipes);

  return (
    <div>
      <Header />
      { !getDoneRecipes
        ? <h3>Você não tem receitas feitas.</h3>
        : (
          <div>
            <FilterMealsOrDrinks
              getDoneRecipes={ getDoneRecipes }
              setFilters={ setFilters }
            />
            <CardDoneRecipes getDoneRecipes={ filters } />
          </div>
        ) }
    </div>
  );
}

DoneRecipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DoneRecipes);
