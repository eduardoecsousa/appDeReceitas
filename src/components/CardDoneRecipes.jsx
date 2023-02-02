import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const NUMBER = 2;
const TIME = 5000;

function CardDoneRecipes({ getDoneRecipes }) {
  const [isCopy, setIsCopy] = useState({});

  const clickShare = (id, type) => {
    let mealsOrDrinks = '';
    if (type === 'meal') {
      mealsOrDrinks = `http://localhost:3000/meals/${id}`;
    } else {
      mealsOrDrinks = `http://localhost:3000/drinks/${id}`;
    }
    copy(mealsOrDrinks);
    setIsCopy({ id });
    const idTimeOut = setTimeout(() => {
      setIsCopy({});
      clearTimeout(idTimeOut);
    }, TIME);
  };

  return (
    <div>
      {getDoneRecipes.map((item, index) => (
        <div key={ index }>
          <Link
            to={ item.type === 'meal'
              ? `/meals/${item.id}`
              : `/drinks/${item.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt={ item.name }
              style={ {
                maxWidth: '360px',
              } }
            />
            <h5 data-testid={ `${index}-horizontal-name` }>{item.name}</h5>
          </Link>

          <p data-testid={ `${index}-horizontal-top-text` }>
            {(`${item.nationality} - ${item.category}`)}
          </p>
          {item.alcoholicOrNot.length > 0
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {item.alcoholicOrNot}
              </p>)
            : ''}

          <p data-testid={ `${index}-horizontal-done-date` }>
            Done in:
            {' '}
            {item.doneDate}
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
            onClick={ () => clickShare(item.id, item.type) }
          >
            <img src={ shareIcon } alt="share-icon" />
          </button>
          {
            isCopy.id === item.id && (
              <div>
                <p data-testid="link-copied">Link copied!</p>
              </div>
            )
          }
        </div>
      ))}
    </div>
  );
}

CardDoneRecipes.propTypes = {
  getDoneRecipes: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default CardDoneRecipes;
