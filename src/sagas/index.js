import { all } from 'redux-saga/effects';
import productsSaga from './productsSaga';
import { watchCartItemAddSaga, watchCartItemRemoveSaga } from './cartSaga';
import promosSaga from './promosSaga';

export default function* rootSaga() {
  yield all([productsSaga(), watchCartItemAddSaga(), watchCartItemRemoveSaga(), promosSaga()]);
}
