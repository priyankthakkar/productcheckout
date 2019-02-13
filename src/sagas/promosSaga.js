import {
  takeLatest, takeEvery, call, put, select,
} from 'redux-saga/effects';
import { PROMOS_LOAD, PROMO_APPLY } from '../constants';
import { fetchPromos } from '../api';
import { setPromos, setError, setPromo } from '../actions';

function* handlePromosLoad() {
  try {
    const promos = yield call(fetchPromos);
    yield put(setPromos(promos));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

export function* watchPromosLoad() {
  yield takeLatest(PROMOS_LOAD, handlePromosLoad);
}

const getPromos = state => state.promo.promos;

function* handlePromoApply({ promoCode }) {
  const promos = yield select(getPromos);
  const code = promos.find(pr => pr.code === promoCode);
  yield put(setPromo(code));
}

export function* watchApplyPromo() {
  yield takeEvery(PROMO_APPLY, handlePromoApply);
}
