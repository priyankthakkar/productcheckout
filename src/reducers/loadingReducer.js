import { PRODUCTS_LOAD,
    PRODUCTS_LOAD_SUCCESS,
    PRODUCTS_LOAD_FAILURE } from '../constants';

const loadingReducer = (state = false, action) => {
    switch(action.type) {
        case PRODUCTS_LOAD:
            return true;
        case PRODUCTS_LOAD_SUCCESS:
        case PRODUCTS_LOAD_FAILURE:
            return false;
        default:
            return state;
    }
}

export default loadingReducer;
