import { takeEvery, call, put } from 'redux-saga/effects';
import { PRODUCTS_LOAD } from '../constants';
import { fetchProducts } from '../api';
import { setProducts, setError } from '../actions';

export function* handleProductsLoad() {
  try {
    const products = yield call(fetchProducts);
    yield put(setProducts(products));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

export default function* watchProductsLoad() {
  yield takeEvery(PRODUCTS_LOAD, handleProductsLoad);
}
