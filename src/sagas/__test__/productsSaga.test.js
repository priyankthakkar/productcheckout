import { runSaga } from 'redux-saga';
import { handleProductsLoad } from '../productsSaga';
import * as api from '../../api';
import { setProducts, setError } from '../../actions';

describe('productsSaga', () => {
  it('should load products and handle in case of success', async () => {
    const dispatchedActions = [];

    const fakeStore = {
      getState: () => ({}),
      dispatch: action => dispatchedActions.push(action),
    };
    const mockedProducts = [
      {
        id: 1,
        code: 'wf',
        name: 'Workflow',
        price: 199.99,
      },
    ];
    api.fetchProducts = jest.fn(() => Promise.resolve(mockedProducts));
    await runSaga(fakeStore, handleProductsLoad).done;
    expect(api.fetchProducts.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setProducts(mockedProducts));
  });

  it('should handle error in case of failure', async () => {
    const dispatchedActions = [];

    const fakeStore = {
      getState: () => ({}),
      dispatch: action => dispatchedActions.push(action),
    };

    const error = 'Some error is thrown.';

    api.fetchProducts = jest.fn(() => Promise.reject(error));
    await runSaga(fakeStore, handleProductsLoad).done;
    expect(api.fetchProducts.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
  });
});
