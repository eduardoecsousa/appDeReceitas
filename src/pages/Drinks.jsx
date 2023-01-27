/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardRevenues from '../components/CardRevenues';
import { changeTile } from '../redux/actions';
import Footer from '../components/Footer';

const NUMBER = 11;

function Drinks({ dispatch, revenues, titlepage }) {
  useEffect(() => {
    dispatch(changeTile('Drinks'));
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
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  revenues: PropTypes.shape([]).isRequired,
  titlepage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  revenues: state.reducerRevenues.revenues,
  titlepage: state.title.title,
});

export default connect(mapStateToProps)(Drinks);
