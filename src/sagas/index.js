import { all } from 'redux-saga/effects';
import productsSaga from './productsSaga';
import {
  watchCartItemAddSaga,
  watchCartItemRemoveSaga,
  watchCartUpdateSuccess,
  triggerValidatePromos,
} from './cartSaga';
import { watchPromosLoad, watchApplyPromo } from './promosSaga';

export default function* rootSaga() {
  yield all([
    productsSaga(),
    watchCartItemAddSaga(),
    watchCartItemRemoveSaga(),
    watchPromosLoad(),
    watchCartUpdateSuccess(),
    watchApplyPromo(),
    triggerValidatePromos(),
  ]);
}
