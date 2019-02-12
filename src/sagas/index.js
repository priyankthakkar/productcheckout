import { all } from 'redux-saga/effects';
import productsSaga from './productsSaga';
import { watchCartItemAddSaga, watchCartItemRemoveSaga } from './cartSaga';

export default function* rootSaga() {
  yield all([productsSaga(), watchCartItemAddSaga(), watchCartItemRemoveSaga()]);
}
