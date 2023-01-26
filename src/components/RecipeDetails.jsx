import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const { makeFetch, isLoading } = useFetch();
  useEffect(() => {
    const API = pathname === `meals/${id}` ? 'thecocktaildb' : 'themealdb';
    const url = `https://www.${API}.com/api/json/v1/1/lookup.php?i=${id}`;
  }, []);
  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
