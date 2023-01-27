/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardRevenues from '../components/CardRevenues';
import { changeTile, getRevenues } from '../redux/actions';
import Footer from '../components/Footer';
import useFetch from '../hooks/useFetch';

const NUMBER = 11;

function Recipes({ dispatch, revenues, titlePage, history: { location: { pathname } } }) {
  const { makeFetch, isLoading } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      if (pathname === '/drinks') {
        dispatch(changeTile('Drinks'));
        const response = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        dispatch(getRevenues(response.drinks));
        console.log(response);
      } else {
        dispatch(changeTile('Meals'));
        const response = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        dispatch(getRevenues(response.meals));
        console.log(response);
      }
    };
    fetchData();
  }, [pathname]);

  const id = titlePage === 'Drinks' ? 'idDrink' : 'idMeal';
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {revenues.map((recipe, index) => index <= NUMBER && (
        <CardRevenues
          recipe={ recipe }
          index={ index }
          titlePage={ titlePage }
          key={ recipe[id] }
        />
      ))}
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  revenues: PropTypes.shape({
    map: PropTypes.shape({}),
  }).isRequired,
  titlePage: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  revenues: state.reducerRevenues.revenues,
  titlePage: state.title.title,
});

export default connect(mapStateToProps)(Recipes);
