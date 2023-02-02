import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import heartWhite from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import heartBlack from '../images/blackHeartIcon.svg';

const TIME = 3000;

function ButtonCompFavor({ shareUrl, recipeFavorite, setUpdateStorage, buttonIndex }) {
  const [favorites, setFavorites] = useState([]);
  const [isCopy, setIsCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const favoriteId = typeof buttonIndex === 'number'
    ? `${buttonIndex}-horizontal-favorite-btn` : 'favorite-btn';
  const shareId = typeof buttonIndex === 'number'
    ? `${buttonIndex}-horizontal-share-btn` : 'share-btn';

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  useEffect(() => {
    if (recipeFavorite) {
      const keyObjId = shareUrl.split('/')[3] === 'drinks'
        ? 'idDrink'
        : 'idMeal';
      const favVerify = favorites
        .some((recipe) => recipe.id === recipeFavorite[keyObjId]);
      setIsFavorite(favVerify);
    }
  }, [favorites, recipeFavorite]);

  const clickShare = () => {
    copy(shareUrl);
    setIsCopy(true);
    const idTimeOut = setTimeout(() => {
      setIsCopy(false);
      clearTimeout(idTimeOut);
    }, TIME);
  };

  // useEffect(() => {
  // localStorage(favorites)
  // }, [favorites]);

  const saveDrinks = () => {
    const { idDrink, strDrink, strAlcoholic,
      strCategory, strDrinkThumb } = recipeFavorite;
    const drink = {
      id: idDrink,
      name: strDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      image: strDrinkThumb,
    };
    if (isFavorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const storageFavorites = (storage
        .filter((recipe) => recipe.id !== idDrink));
      setFavorites(storageFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(storageFavorites));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, drink]));
      setFavorites([...favorites, drink]);
    }
  };

  const saveMeals = () => {
    const { idMeal, strMeal, strArea, strCategory, strMealThumb } = recipeFavorite;
    const meal = {
      id: idMeal,
      name: strMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      image: strMealThumb,
    };
    if (isFavorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const storageFavorites = (storage
        .filter((recipe) => recipe.id !== idMeal));
      setFavorites(storageFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(storageFavorites));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, meal]));
      setFavorites([...favorites, meal]);
    }
  };

  const saveFavorite = () => {
    const drinksOrMeals = shareUrl.split('/')[3];
    if (drinksOrMeals === 'drinks') {
      saveDrinks();
    } else {
      saveMeals();
    }
    if (setUpdateStorage) setUpdateStorage((prevState) => !prevState);
  };
  return (
    <div>
      <button
        data-testid={ favoriteId }
        onClick={ saveFavorite }
        src={ isFavorite ? heartBlack : heartWhite }
      >
        {isFavorite
          ? <img src={ heartBlack } alt="heart-black" />
          : <img src={ heartWhite } alt="heart-white" />}
      </button>
      <button data-testid={ shareId } onClick={ clickShare } src={ shareIcon }>
        <img src={ shareIcon } alt="share-icon" />
      </button>
      {
        isCopy && (
          <div>
            <p>Link copied!</p>
          </div>
        )
      }
    </div>
  );
}

ButtonCompFavor.propTypes = {
  buttonIndex: PropTypes.number.isRequired,
  recipeFavorite: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  setUpdateStorage: PropTypes.func.isRequired,
  shareUrl: PropTypes.shape({
    split: PropTypes.func,
  }).isRequired,
};

export default ButtonCompFavor;
