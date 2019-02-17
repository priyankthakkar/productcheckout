import { takeEvery, select, put } from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';
import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_TRIGGER_CALCULATION,
  PROMO_VALIDATE,
  PROMO_PRODUCT_TYPE,
  PROMO_AMOUNT_OPTION,
  PROMO_CART_TYPE,
  PROMO_QUANTITY_OPTION,
} from '../constants';
import {
  setCartItems,
  setCartValue,
  triggerCartRecalculation,
  validatePromos,
  updateValidPromos,
} from '../actions';
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
      const newItem = cloneDeep(item);
      if (newItem.productCode === productCode) {
        newItem.quantity += 1;
        return newItem;
      }
      return newItem;
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
      const newItem = cloneDeep(item);
      if (newItem.productCode === productCode) {
        newItem.quantity -= 1;
        return newItem;
      }
      return newItem;
    });

    updatedItems = updatedItems.filter(item => item.quantity !== 0);
  } else {
    updatedItems = cartItems;
  }

  yield put(setCartItems(updatedItems));
  yield put(triggerCartRecalculation());
  yield put(validatePromos(productCode));
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
  let discount = 0;
  let payable = 0;
  if (appliedPromos.length === 0) {
    payable = total;
  } else {
    discount = calculateDiscount(cart, appliedPromos, products);
    payable = total - discount;
    payable = payable.toFixed(2);
    discount = discount.toFixed(2);
  }
  yield put(setCartValue({ total, discount, payable }));
}

export function* watchCartUpdateSuccess() {
  yield takeEvery(CART_TRIGGER_CALCULATION, handleCartUpdateSuccess);
}

function* validateAppliedPromos({ productCode }) {
  let appliedPromos = yield select(getAppliedPromos);
  let promosToRemove = [];
  const cart = yield select(getCart);
  const productPromo = appliedPromos.find(
    ap => ap.type === PROMO_PRODUCT_TYPE && ap.product === productCode,
  );
  const { cartItems, cartValue } = cart;
  const product = cartItems.find(ci => ci.productCode === productCode);

  if (!product && productPromo) {
    promosToRemove.push(productPromo);
  } else if (productPromo) {
    if (productPromo.option === PROMO_QUANTITY_OPTION) {
      const quantity = productPromo[PROMO_QUANTITY_OPTION.toLowerCase()];
      if (product.quantity < quantity) {
        promosToRemove.push(productPromo);
      }
    }
  }

  let removedPromosFilter;
  if (promosToRemove && promosToRemove.length > 0) {
    removedPromosFilter = promosToRemove.map(ptr => ptr.code);
    const result = appliedPromos.filter(ap => !removedPromosFilter.includes(ap.code));
    yield put(updateValidPromos(result));
  }

  promosToRemove = [];
  const cartPromos = appliedPromos.filter(ap => ap.type === PROMO_CART_TYPE);
  if (cartPromos && cartPromos.length > 0) {
    promosToRemove = cartPromos.filter(
      cp => cp.option === PROMO_AMOUNT_OPTION
        && cartValue.total < cp[PROMO_AMOUNT_OPTION.toLowerCase()],
    );
    // promosToRemove = cartPromos.filter((cp) => {
    //   if (cp.option === PROMO_AMOUNT_OPTION) {
    //     const amount = cp[PROMO_AMOUNT_OPTION.toLowerCase()];
    //     if (cartValue.total < amount) {
    //       return cp;
    //     }
    //   }
    // });
  }

  appliedPromos = yield select(getAppliedPromos);
  if (promosToRemove && promosToRemove.length > 0) {
    removedPromosFilter = promosToRemove.map(ptr => ptr.code);
    const result = appliedPromos.filter(ap => !removedPromosFilter.includes(ap.code));
    yield put(updateValidPromos(result));
  }
}

export function* triggerValidatePromos() {
  yield takeEvery(PROMO_VALIDATE, validateAppliedPromos);
}
