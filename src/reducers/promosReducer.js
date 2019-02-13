import { PROMOS_LOAD_SUCCESS } from '../constants';

const promosReducer = (state = [], action) => {
  switch (action.type) {
    case PROMOS_LOAD_SUCCESS:
      return [...state, ...action.promos];
    default:
      return state;
  }
};

export default promosReducer;
