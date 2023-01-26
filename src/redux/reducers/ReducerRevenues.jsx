import { GET_REVENUES } from '../actions';

const initialState = {
  revenues: [],
};

const reducerRevenues = (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_REVENUES:
    return { revenues: payload };

  default:
    return state;
  }
};

export default reducerRevenues;
