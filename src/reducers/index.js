import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    isLoading: loadingReducer,
    products: productsReducer,
    error: errorReducer
});

export default rootReducer;
