import { PRODUCTS_LOAD,
    PRODUCTS_LOAD_SUCCESS,
    PRODUCTS_LOAD_FAILURE } from '../constants';

const errorReducer = (state = null, action) => {
    switch(action.type) {
        case PRODUCTS_LOAD:
        case PRODUCTS_LOAD_SUCCESS:
            return null;
        case PRODUCTS_LOAD_FAILURE:
            return action.error;
        default:
            return state;
    }
}

export default errorReducer;
