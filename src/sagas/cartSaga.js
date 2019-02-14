import { takeEvery, select, put } from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';
import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_UPDATE_SUCCESS,
  CART_TRIGGER_CALCULATION,
} from '../constants';
import { setCartItems, setCartValue, triggerCartRecalculation } from '../actions';
import {
  isCartEmpty,
  isProductAlreadyPresentInCart,
  calculateCartValue,
  getCart,
  getAppliedPromos,
  calculateDiscount,
} from '../util';

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
  yield put(triggerCartRecalculation());
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
  yield put(triggerCartRecalculation());
}

export function* watchCartItemRemoveSaga() {
  yield takeEvery(CART_REMOVE_PRODUCT, handleCartItemRemove);
}

const getProducts = state => state.products;

function* handleCartUpdateSuccess() {
  const cart = yield select(getCart);
  const products = yield select(getProducts);
  const appliedPromos = yield select(getAppliedPromos);
  const total = calculateCartValue(cart.cartItems, products);
  debugger;
  let discount = 0;
  let payable = 0;
  if (appliedPromos.length === 0) {
    payable = total;
  } else {
    discount = calculateDiscount(cart, appliedPromos, products);
    console.log(`Calculated discount is: ${discount}`);
    payable = total - discount;
    payable = payable.toFixed(2);
    discount = discount.toFixed(2);
  }
  yield put(setCartValue({ total, discount, payable }));
}

export function* watchCartUpdateSuccess() {
  yield takeEvery(CART_TRIGGER_CALCULATION, handleCartUpdateSuccess);
}
