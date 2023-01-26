import React, { useState } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import SearchIcon from '../images/searchIcon.svg';
import useFetch from '../hooks/useFetch';

function SearchBar() {
  const [search, setSearch] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [option, setOption] = useState('');
  const { makeFetch, isLoading } = useFetch();

  const handleSearch = async () => {
    if (option === 'firstLetter' && valueInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const urlIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`;
    const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${valueInput}`;
    const urlFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`;
    switch (option) {
    case 'ingredient':
      console.log(await makeFetch(urlIngredient));
      break;
    case 'name':
      console.log(await makeFetch(urlName));
      break;
    case 'firstLetter':
      console.log(await makeFetch(urlFirstLetter));
      break;
    default:
      return [];
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => { setSearch(!search); } }
      >
        <img
          src={ SearchIcon }
          alt="icon-seach"
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

// SearchBar.propTypes = {
//   titlePage: PropTypes.string.isRequired,
// };

const mapStateToProps = (state) => ({
  titlePage: state.title.title,
});

export default connect(mapStateToProps)(SearchBar);
