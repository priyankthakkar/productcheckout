import { runSaga } from 'redux-saga';
import { handlePromosLoad, getPromos, handlePromoApply } from '../promosSaga';
import * as api from '../../api';
import {
  setPromos, setError, setPromo, triggerCartRecalculation,
} from '../../actions';

describe('promosSaga', () => {
  it('should load promos and handle in case of success', async () => {
    const dispatchedActions = [];

    const fakeStore = {
      getState: () => ({}),
      dispatch: action => dispatchedActions.push(action),
    };
    const mockedPromos = [
      {
        id: 1,
        code: 'RRD4D32',
        desc: '10% discount for orders above $1000 (pre-discount)',
        type: 'CART',
        option: 'AMOUNT',
        amount: 1000,
        discountType: 'percentage',
        percentage: 10,
      },
    ];
    api.fetchPromos = jest.fn(() => Promise.resolve(mockedPromos));
    await runSaga(fakeStore, handlePromosLoad).done;
    expect(api.fetchPromos.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setPromos(mockedPromos));
  });

  it('should handle error in case of failure', async () => {
    const dispatchedActions = [];

    const fakeStore = {
      getState: () => ({}),
      dispatch: action => dispatchedActions.push(action),
    };

    const error = 'Some error is thrown.';

    api.fetchPromos = jest.fn(() => Promise.reject(error));
    await runSaga(fakeStore, handlePromosLoad).done;
    expect(api.fetchPromos.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
  });

  it('should return promos from global state', () => {
    const promo = {
      promos: [
        {
          id: 1,
          code: 'RRD4D32',
          desc: '10% discount for orders above $1000 (pre-discount)',
          type: 'CART',
          option: 'AMOUNT',
          amount: 1000,
          discountType: 'percentage',
          percentage: 10,
        },
      ],
    };

    const fakeState = { promo };
    expect(getPromos(fakeState)).toBe(promo.promos);
  });

  it('should apply a promo code if it is not used', async () => {
    const dispatchedActions = [];

    const promo = {
      promos: [
        {
          id: 1,
          code: 'RRD4D32',
          desc: '10% discount for orders above $1000 (pre-discount)',
          type: 'CART',
          option: 'AMOUNT',
          amount: 1000,
          discountType: 'percentage',
          percentage: 10,
        },
      ],
      appliedPromos: [],
    };

    const cart = {
      cartItems: [
        {
          productCode: 'wf',
          quantity: 6,
        },
      ],
      cartValue: {
        total: '1199.94',
        discount: 0,
        payable: '1199.94',
      },
    };

    const fakeStore = {
      getState: () => ({ promo, cart }),
      dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handlePromoApply, { promoCode: 'RRD4D32' }).done;
    expect(dispatchedActions).toContainEqual(setPromo(promo.promos[0]));
    expect(dispatchedActions).toContainEqual(triggerCartRecalculation());
  });
});
