import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import cartReducer from './cartReducer';
import promosReducer from './promosReducer';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  products: productsReducer,
  error: errorReducer,
  cartItems: cartReducer,
  promos: promosReducer,
});

export default rootReducer;
