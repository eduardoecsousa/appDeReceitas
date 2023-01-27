import React from 'react';

function ButtonGeneric({id, name, history, pathname}) {
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

export default ButtonGeneric;
