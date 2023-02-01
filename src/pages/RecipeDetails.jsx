/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useFetch from '../hooks/useFetch';
import CardDetailsMeals from '../components/CardDetailsMeals';
import CardDatailsDrinks from '../components/CardDatailsDrinks';
import { changeTile } from '../redux/actions';

function RecipeDetails({
  match: { params: { id } }, location: { pathname }, history, dispatch }) {
  const { makeFetch } = useFetch();
  const [details, setDetails] = useState([]);
  useEffect(() => {
    dispatch(changeTile('Recipe Details'));
    const API = pathname === `/meals/${id}` ? 'themealdb' : 'thecocktaildb';
    const KEY = pathname === `/meals/${id}` ? 'meals' : 'drinks';
    const url = `https://www.${API}.com/api/json/v1/1/lookup.php?i=${id}`;
    const getDetails = async () => {
      const result = await makeFetch(url);
      setDetails(result[KEY][0]);
    };
    getDetails();
  }, []);
  return (
    <div>
      {pathname === `/meals/${id}` ? (
        <CardDetailsMeals details={ details } history={ history } />)
        : <CardDatailsDrinks details={ details } history={ history } />}
    </div>
  );
}

RecipeDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(RecipeDetails);
