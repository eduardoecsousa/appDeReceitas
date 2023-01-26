import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardRevenues from '../components/CardRevenues';
import { changeTile } from '../redux/actions';

const NUMBER = 11;

function Meals({ dispatch, revenues, titlepage }) {
  useEffect(() => {
    dispatch(changeTile('Meals'));
  }, []);

  const id = titlepage === 'Drinks' ? 'idDrink' : 'idMeal';
  return (
    <div>
      {revenues.map((recipe, index) => index <= NUMBER && (
        <CardRevenues
          recipe={ recipe }
          index={ index }
          titlepage={ titlepage }
          key={ recipe[id] }
        />
      ))}
    </div>
  );
}

Meals.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  revenues: state.reducerRevenues.revenues,
  titlepage: state.title.title,
});

export default connect(mapStateToProps)(Meals);
