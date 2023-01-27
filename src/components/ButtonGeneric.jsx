import PropTypes from 'prop-types';
import React from 'react';

function ButtonGeneric({ id, name, history, pathname }) {
  const handleRedirect = () => {
    if (pathname === '/') {
      localStorage.clear();
      history.push(pathname);
    } else {
      history.push(pathname);
    }
  };
  return (
    <div>
      <button data-testid={ id } onClick={ handleRedirect }>{name}</button>
    </div>
  );
}

ButtonGeneric.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default ButtonGeneric;
