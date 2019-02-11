import { PRODUCTS_LOAD,
    PRODUCTS_LOAD_SUCCESS,
    PRODUCTS_LOAD_FAILURE,
    CART_ADD_PRODUCT,
    CART_REMOVE_PRODUCT } from '../constants';

export const loadProducts = () => ({
    type: PRODUCTS_LOAD
});

export const setProducts = (products) => ({
    type: PRODUCTS_LOAD_SUCCESS,
    products
});

export const setError = (error) => ({
    type: PRODUCTS_LOAD_FAILURE,
    error
});

export const addProductToCart = (productCode) => ({
    type: CART_ADD_PRODUCT,
    productCode
});

export const removeProductFromCart = (productCode) => ({
    type: CART_REMOVE_PRODUCT,
    productCode
});
