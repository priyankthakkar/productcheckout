import { takeLatest, call, put } from 'redux-saga/effects';
import { PROMOS_LOAD } from '../constants';
import { fetchPromos } from '../api';
import { setPromos, setError } from '../actions';

function* handlePromosLoad() {
  try {
    const promos = yield call(fetchPromos);
    yield put(setPromos(promos));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

export default function* watchPromosLoad() {
  yield takeLatest(PROMOS_LOAD, handlePromosLoad);
}
