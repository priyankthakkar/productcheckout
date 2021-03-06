import reducers from '..';

test('cartReducer CART_CALCULATE_VALUE_SUCCESS', () => {
  const state = reducers(
    {
      isLoading: false,
      products: [
        {
          id: 1,
          code: 'wf',
          name: 'Workflow',
          price: 199.99,
        },
        {
          id: 2,
          code: 'docgen',
          name: 'Document Generation',
          price: 9.99,
        },
        {
          id: 3,
          code: 'form',
          name: 'Form',
          price: 99.99,
        },
      ],
      error: null,
      cart: {
        cartItems: [{ productCode: 'wf', quantity: 1 }],
        cartValue: { total: 0, discount: 0, payable: 0 },
      },
      promo: {
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
          {
            id: 2,
            code: '44F4T11',
            desc: '15% discount for orders above $1500 (pre-discount)',
            type: 'CART',
            option: 'AMOUNT',
            amount: 1500,
            discountType: 'percentage',
            percentage: 15,
          },
          {
            id: 3,
            code: 'FF9543D1',
            desc:
              'Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased',
            type: 'PRODUCT',
            product: 'docgen',
            option: 'QUANTITY',
            quantity: 10,
            discountType: 'PRICE',
            price: 8.99,
          },
          {
            id: 4,
            code: 'YYGWKJD',
            desc: 'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
            type: 'PRODUCT',
            product: 'form',
            option: 'QUANTITY',
            quantity: 1,
            discountType: 'PRICE',
            price: 89.99,
          },
        ],
        appliedPromos: [],
      },
    },
    {
      type: 'CART_CALCULATE_VALUE_SUCCESS',
      cartValue: { total: '199.99', discount: 0, payable: '199.99' },
    },
  );
  expect(state).toEqual({
    isLoading: false,
    products: [
      {
        id: 1,
        code: 'wf',
        name: 'Workflow',
        price: 199.99,
      },
      {
        id: 2,
        code: 'docgen',
        name: 'Document Generation',
        price: 9.99,
      },
      {
        id: 3,
        code: 'form',
        name: 'Form',
        price: 99.99,
      },
    ],
    error: null,
    cart: {
      cartItems: [{ productCode: 'wf', quantity: 1 }],
      cartValue: { total: '199.99', discount: 0, payable: '199.99' },
    },
    promo: {
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
        {
          id: 2,
          code: '44F4T11',
          desc: '15% discount for orders above $1500 (pre-discount)',
          type: 'CART',
          option: 'AMOUNT',
          amount: 1500,
          discountType: 'percentage',
          percentage: 15,
        },
        {
          id: 3,
          code: 'FF9543D1',
          desc: 'Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased',
          type: 'PRODUCT',
          product: 'docgen',
          option: 'QUANTITY',
          quantity: 10,
          discountType: 'PRICE',
          price: 8.99,
        },
        {
          id: 4,
          code: 'YYGWKJD',
          desc: 'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
          type: 'PRODUCT',
          product: 'form',
          option: 'QUANTITY',
          quantity: 1,
          discountType: 'PRICE',
          price: 89.99,
        },
      ],
      appliedPromos: [],
    },
  });
});
