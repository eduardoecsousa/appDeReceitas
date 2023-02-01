/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeTile } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
// import useFetch from '../hooks/useFetch';

const NUMBER = 2;

// const getDoneRecipes = [
//   {
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

function DoneRecipes({ dispatch }) {
  useEffect(() => {
    dispatch(changeTile('Done Recipes'));
  }, []);
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  // const { makeFetch } = useFetch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (getDoneRecipes.type === 'drink') {
  //       const response = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  //       console.log(response);
  //     } else {
  //       const response = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          ALL
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          MEALS
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          DRINKS
        </button>
      </div>

      {getDoneRecipes.map((item, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
            alt={ item.name }
            style={ {
              maxWidth: '360px',
            } }
          />
          <h5 data-testid={ `${index}-horizontal-name` }>{item.name}</h5>

          <p data-testid={ `${index}-horizontal-top-text` }>
            {(`${item.nationality} - ${item.category}`)}
          </p>
          { item.alcoholicOrNot.length > 0
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {item.alcoholicOrNot}
              </p>)
            : '' }

          <p data-testid={ `${index}-horizontal-done-date` }>
            Done in:
            {' '}
            { item.doneDate }
          </p>

          {item.tags.map((tag, i) => i <= NUMBER && (
            <p
              key={ tag.i }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}

            </p>
          ))}
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="share-icon" />
          </button>
        </div>
      ))}
    </div>
  );
}

DoneRecipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DoneRecipes);
