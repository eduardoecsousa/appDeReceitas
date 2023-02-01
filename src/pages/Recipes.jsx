/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CardRevenues from '../components/CardRevenues';
import { changeTile, getRevenues } from '../redux/actions';
import Footer from '../components/Footer';
import useFetch from '../hooks/useFetch';
import Filter from '../components/Filter';
import Header from '../components/Header';

const NUMBER = 11;

function Recipes({ dispatch, revenues, titlePage, history: { location: { pathname } } }) {
  const { makeFetch, isLoading } = useFetch();
  const [clear, setClear] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (pathname === '/drinks') {
        dispatch(changeTile('Drinks'));
        const response = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        if (!response.drinks) {
          return;
        }
        dispatch(getRevenues(response.drinks));
      } else {
        dispatch(changeTile('Meals'));
        const response = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!response.meals) {
          return;
        }
        dispatch(getRevenues(response.meals));
      }
    };
    fetchData();
  }, [pathname, clear]);

  const id = titlePage === 'Drinks' ? 'idDrink' : 'idMeal';
  return (
    <div>
      <Header />
      <Filter setClear={ setClear } />
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
  revenues: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
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
