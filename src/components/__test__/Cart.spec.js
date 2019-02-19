import React from 'react';
import { shallow, mount } from 'enzyme';
import Cart from '../Cart';
import { calculateCartValue, calculateDiscount, isCartEmpty } from '../../util';
import cart from './CartTestData/cart.json';
import products from './CartTestData/products.json';
import appliedPromos from './CartTestData/appliedPromos.json';

describe('Cart Component', () => {
  let handleApplyPromocode;
  let CartComponent;
  const emptyCartMessage = 'Your cart is empty.';

  beforeEach(() => {
    handleApplyPromocode = jest.fn();
    const { cartItems, cartValue } = cart;

    CartComponent = shallow(
      <Cart
        products={products}
        cartItems={cartItems}
        cartValue={cartValue}
        appliedPromos={appliedPromos}
        handleApplyPromocode={handleApplyPromocode}
      />,
    );
  });

  it('CartComponent should match its snapshot', () => {
    expect(CartComponent).toMatchSnapshot();
  });

  it('Cart should have 2 items', () => {
    expect(CartComponent.find('.cart-item')).toHaveLength(2);
  });

  it('Cart should have 2 promos applied', () => {
    expect(CartComponent.find('.applied-promo')).toHaveLength(2);
  });

  it('Displayed cart value should match calculatedCartValue', () => {
    const { cartItems } = cart;
    const totalValue = calculateCartValue(cartItems, products);
    const discount = calculateDiscount(cart, appliedPromos, products);
    expect(CartComponent.find('.cart-total').text()).toBe(`${totalValue} $`);
    expect(CartComponent.find('.cart-discount').text()).toBe(`${discount.toFixed(2)} $`);
    expect(CartComponent.find('.amount-payable').text()).toBe(
      `${(totalValue - discount).toFixed(2)} $`,
    );
  });

  it('Verify cart is empty', () => {
    const emptyCart = {
      cartItems: [],
      cartValue: {
        total: '0',
        discount: '0',
        payable: '0',
      },
    };

    const currentPromosApplied = [];
    expect(isCartEmpty(emptyCart.cartItems)).toBe(true);

    expect(
      shallow(
        <Cart
          products={products}
          cartItems={emptyCart.cartItems}
          cartValue={emptyCart.cartValue}
          appliedPromos={currentPromosApplied}
          handleApplyPromocode={handleApplyPromocode}
        />,
      ).find('.cart-item'),
    ).toHaveLength(0);

    expect(
      mount(
        <Cart
          products={products}
          cartItems={emptyCart.cartItems}
          cartValue={emptyCart.cartValue}
          appliedPromos={currentPromosApplied}
          handleApplyPromocode={handleApplyPromocode}
        />,
      )
        .find('.cart-status-message')
        .find('.alert-info')
        .first()
        .text()
        .trim(),
    ).toBe(emptyCartMessage);
  });
});
