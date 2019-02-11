import { PRODUCTS_LOAD_SUCCESS } from '../constants';

const productsReducer = (state = [], action) => {
    switch(action.type) {
        case PRODUCTS_LOAD_SUCCESS:
            return [...state, ...action.products];
        default:
            return state;
    }
}

export default productsReducer;
