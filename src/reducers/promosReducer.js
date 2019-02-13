import cloneDeep from 'lodash/cloneDeep';
import { PROMOS_LOAD_SUCCESS, PROMO_APPLY_SUCCESS } from '../constants';

const promosReducer = (state = { promos: [], appliedPromos: [] }, action) => {
  switch (action.type) {
    case PROMOS_LOAD_SUCCESS: {
      const clonedPromos = cloneDeep(state.promos);
      const newPromos = [...clonedPromos, ...action.promos];
      return Object.assign({}, state, { promos: newPromos });
    }
    case PROMO_APPLY_SUCCESS: {
      const newAppliedPromos = [...cloneDeep(state.appliedPromos), action.promo];
      return Object.assign({}, state, { appliedPromos: newAppliedPromos });
    }
    default:
      return state;
  }
};

export default promosReducer;
