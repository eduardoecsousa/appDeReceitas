import { combineReducers } from 'redux';
import title from './title';
import reducerRevenues from './ReducerRevenues';

const rootReducer = combineReducers({ title, reducerRevenues });

export default rootReducer;
