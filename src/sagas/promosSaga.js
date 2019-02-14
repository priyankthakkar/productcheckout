import {
  takeLatest, takeEvery, call, put, select,
} from 'redux-saga/effects';
import { PROMOS_LOAD, PROMO_APPLY } from '../constants';
import { fetchPromos } from '../api';
import {
  setPromos, setError, setPromo, triggerCartRecalculation,
} from '../actions';
import { getCart, getAppliedPromos, isPromoCodeValid } from '../util';

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
  const appliedPromos = yield select(getAppliedPromos);
  const cart = yield select(getCart);
  const code = promos.find(pr => pr.code === promoCode);
  const search = appliedPromos.find(ap => ap.code === promoCode);

  if (code && !search && isPromoCodeValid(cart, code)) {
    yield put(setPromo(code));
    yield put(triggerCartRecalculation());
  }
}

export function* watchApplyPromo() {
  yield takeEvery(PROMO_APPLY, handlePromoApply);
}
