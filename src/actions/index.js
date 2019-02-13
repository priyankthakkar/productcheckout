import {
  PRODUCTS_LOAD,
  PRODUCTS_LOAD_SUCCESS,
  PRODUCTS_LOAD_FAILURE,
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_UPDATE_SUCCESS,
  PROMOS_LOAD,
  PROMOS_LOAD_SUCCESS,
} from '../constants';

export const loadProducts = () => ({
  type: PRODUCTS_LOAD,
});

export const setProducts = products => ({
  type: PRODUCTS_LOAD_SUCCESS,
  products,
});

export const loadPromos = () => ({
  type: PROMOS_LOAD,
});

export const setPromos = promos => ({
  type: PROMOS_LOAD_SUCCESS,
  promos,
});

export const setError = error => ({
  type: PRODUCTS_LOAD_FAILURE,
  error,
});

export const setCartItems = cartItems => ({
  type: CART_UPDATE_SUCCESS,
  cartItems,
});

export const addProductToCart = productCode => ({
  type: CART_ADD_PRODUCT,
  productCode,
});

export const removeProductFromCart = productCode => ({
  type: CART_REMOVE_PRODUCT,
  productCode,
});
