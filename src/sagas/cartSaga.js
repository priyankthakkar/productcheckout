import { takeEvery, select, put } from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';
import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT } from '../constants';
import { setCartItems } from '../actions';
import { isCartEmpty, isProductAlreadyPresentInCart } from '../util';

const getCartItems = state => state.cartItems;

function* handleCartItemAdd({ productCode }) {
  const cartItems = cloneDeep(yield select(getCartItems));
  let updatedItems;

  if (isCartEmpty(cartItems)) {
    updatedItems = [];
    updatedItems.push({
      productCode,
      quantity: 1,
    });
  } else if (!isProductAlreadyPresentInCart(cartItems, productCode)) {
    updatedItems = [...cartItems];
    updatedItems.push({
      productCode,
      quantity: 1,
    });
  } else {
    updatedItems = cartItems.map((item) => {
      if (item.productCode === productCode) {
        item.quantity += 1;
        return item;
      }
      return item;
    });
  }

  yield put(setCartItems(updatedItems));
}

export function* watchCartItemAddSaga() {
  yield takeEvery(CART_ADD_PRODUCT, handleCartItemAdd);
}

function* handleCartItemRemove({ productCode }) {
  const cartItems = cloneDeep(yield select(getCartItems));
  let updatedItems;

  if (!isCartEmpty(cartItems) && isProductAlreadyPresentInCart(cartItems, productCode)) {
    updatedItems = cartItems.map((item) => {
      if (item.productCode === productCode) {
        item.quantity -= 1;
        return item;
      }
      return item;
    });

    updatedItems = updatedItems.filter(item => item.quantity !== 0);
  } else {
    updatedItems = cartItems;
  }

  yield put(setCartItems(updatedItems));
}

export function* watchCartItemRemoveSaga() {
  yield takeEvery(CART_REMOVE_PRODUCT, handleCartItemRemove);
}
