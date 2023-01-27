import React from 'react';

function ButtonGeneric({id, name}) {
  return (
    <div>
      <button data-testid={ id }>{name}</button>
    </div>
  );
}

export default ButtonGeneric;
