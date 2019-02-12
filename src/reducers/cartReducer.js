import { CART_UPDATE_SUCCESS } from "../constants";

const cartReducer = (state = [], { type, cartItems }) => {
  switch (type) {
    case CART_UPDATE_SUCCESS:
      return cartItems;
    default:
      return state;
  }
};

export default cartReducer;
