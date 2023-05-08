import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { getRevenues } from '../redux/actions';

function Filter({ titlePage, dispatch, setClear }) {
  const { makeFetch, isLoading } = useFetch();
  const [categories, setCategories] = useState(null);
  const [toggled, setToggled] = useState('');
  const MAX_CATEGORIES = 4;

  useEffect(() => {
    const API_NAME = titlePage === 'Drinks' ? 'thecocktaildb' : 'themealdb';
    const KEY = titlePage === 'Drinks' ? 'drinks' : 'meals';
    const url = `https://www.${API_NAME}.com/api/json/v1/1/list.php?c=list`;
    if (titlePage.length < 1) {
      return;
    }
    const fetchData = async () => {
      const response = await makeFetch(url);
      setCategories(response[KEY]);
    };
    fetchData();
  }, [titlePage]);

  const onClickFilter = async ({ target: { name } }) => {
    if (name === toggled) {
      setToggled('');
      setClear((prevClear) => !prevClear);
      return;
    }
    const API_NAME = titlePage === 'Drinks' ? 'thecocktaildb' : 'themealdb';
    const KEY = titlePage === 'Drinks' ? 'drinks' : 'meals';
    const url = `https://www.${API_NAME}.com/api/json/v1/1/filter.php?c=${name}`;
    const response = await makeFetch(url);
    dispatch(getRevenues(response[KEY]));
    setToggled(name);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {
        categories && (
          <div>
            { categories.map((categorie, index) => {
              if (index > MAX_CATEGORIES) {
                return;
              }
              return (
                <button
                  key={ index }
                  type="button"
                  name={ categorie.strCategory }
                  data-testid={ `${categorie.strCategory}-category-filter` }
                  onClick={ onClickFilter }
                >
                  { categorie.strCategory }
                </button>
              );
            })}
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ () => { setClear((prevClear) => !prevClear); } }
            >
              ALL
            </button>
          </div>
        )
      }

    </div>
  );
}

Filter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  setClear: PropTypes.func.isRequired,
  titlePage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  titlePage: state.title.title,
});

export default connect(mapStateToProps)(Filter);
