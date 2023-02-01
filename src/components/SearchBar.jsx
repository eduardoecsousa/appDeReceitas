/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from '../images/searchIcon.svg';
import useFetch from '../hooks/useFetch';
import { getRevenues } from '../redux/actions';

function SearchBar({ titlePage, dispatch }) {
  const [search, setSearch] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [option, setOption] = useState('');
  const [returnAPI, setReturnAPI] = useState();
  const [redirect, setRedirect] = useState(false);
  const { makeFetch, isLoading } = useFetch();

  useEffect(() => {
    const obj = titlePage === 'Drinks' ? 'drinks' : 'meals';
    if (!returnAPI) {
      return;
    }
    if (!returnAPI[obj]) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    dispatch(getRevenues(returnAPI[obj]));
    if (returnAPI[obj].length === 1) {
      setRedirect(true);
    }
  }, [returnAPI]);

  const handleSearch = async () => {
    if (option === 'firstLetter' && valueInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const API = titlePage === 'Drinks' ? 'thecocktaildb' : 'themealdb';
    const urlIngredient = `https://www.${API}.com/api/json/v1/1/filter.php?i=${valueInput}`;
    const urlName = `https://www.${API}.com/api/json/v1/1/search.php?s=${valueInput}`;
    const urlFirstLetter = `https://www.${API}.com/api/json/v1/1/search.php?f=${valueInput}`;
    switch (option) {
    case 'ingredient':
      setReturnAPI(await makeFetch(urlIngredient));
      break;
    case 'name':
      setReturnAPI(await makeFetch(urlName));
      break;
    case 'firstLetter':
      setReturnAPI(await makeFetch(urlFirstLetter));
      break;
    default:
      return [];
    }
  };

  const toRedirect = () => {
    const API = titlePage === 'Drinks' ? 'drinks' : 'meals';
    const ID = titlePage === 'Drinks' ? 'idDrink' : 'idMeal';
    return (<Redirect to={ `/${API}/${returnAPI[API][0][ID]}` } />);
  };

  return (
    <div>
      {redirect && toRedirect()}
      <button
        type="button"
        onClick={ () => { setSearch(!search); } }
      >
        <img
          src={ SearchIcon }
          alt="icon-search"
          data-testid="search-top-btn"
        />
      </button>
      {
        search && (
          <div>
            <input
              data-testid="search-input"
              type="text"
              value={ valueInput }
              onChange={ ({ target }) => setValueInput(target.value) }
            />
            <label htmlFor="ingredient-search-radio">
              <input
                type="radio"
                data-testid="ingredient-search-radio"
                name="radio-button"
                id="ingredient-search-radio"
                onChange={ () => setOption('ingredient') }
              />
              Ingredient
            </label>
            <label htmlFor="name-search-radio">
              <input
                type="radio"
                data-testid="name-search-radio"
                name="radio-button"
                id="name-search-radio"
                onChange={ () => setOption('name') }
              />
              Name
            </label>
            <label htmlFor="first-letter-search-radio">
              <input
                type="radio"
                data-testid="first-letter-search-radio"
                name="radio-button"
                id="first-letter-search-radio"
                onChange={ () => setOption('firstLetter') }
              />
              First letter
            </label>
            <button
              data-testid="exec-search-btn"
              onClick={ handleSearch }
            >
              BUSCAR
            </button>
          </div>
        )
      }
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

SearchBar.propTypes = {
  titlePage: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  titlePage: state.title.title,
});

export default connect(mapStateToProps)(SearchBar);
