export const CHANGE_TITLE = 'CHANGE_TITLE';
export const GET_REVENUES = 'GET_REVENUES';

export const changeTile = (title) => ({
  type: CHANGE_TITLE,
  payload: title,
});

export const getRevenues = (revenues) => ({
  type: GET_REVENUES,
  payload: revenues,
});
