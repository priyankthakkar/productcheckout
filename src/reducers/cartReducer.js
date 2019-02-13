import { CART_UPDATE_SUCCESS, CART_CALCULATE_VALUE_SUCCESS } from '../constants';

const cartReducer = (
  state = { cartItems: [], cartValue: { total: 0, discount: 0, payable: 0 } },
  { type, cartItems, cartValue },
) => {
  switch (type) {
    case CART_UPDATE_SUCCESS:
      return Object.assign({}, state, { cartItems });
    case CART_CALCULATE_VALUE_SUCCESS:
      return Object.assign({}, state, { cartValue });
    default:
      return state;
  }
};

export default cartReducer;
