import { takeEvery, select, put } from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';
import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT, CART_UPDATE_SUCCESS } from '../constants';
import { setCartItems, setCartValue } from '../actions';
import { isCartEmpty, isProductAlreadyPresentInCart, calculateCartValue } from '../util';

const getCartItems = state => state.cart.cartItems;

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

const getCart = state => state.cart;
const getProducts = state => state.products;

function* handleCartUpdateSuccess() {
  const cart = yield select(getCart);
  const products = yield select(getProducts);
  const total = calculateCartValue(cart.cartItems, products);
  yield put(setCartValue({ total, discount: 0, payable: 100 }));
}

export function* watchCartUpdateSuccess() {
  yield takeEvery(CART_UPDATE_SUCCESS, handleCartUpdateSuccess);
}
