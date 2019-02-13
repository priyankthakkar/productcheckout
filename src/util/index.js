import {
  PROMO_CART_TYPE,
  PROMO_PRODUCT_TYPE,
  PROMO_AMOUNT_OPTION,
  PROMO_QUANTITY_OPTION,
  PROMO_PERCENTAGE_DISCONUT,
  PROMO_PRICE_DISCOUNT,
} from '../constants';

const isCartEmpty = cartItems => cartItems.length === 0;

const isProductAlreadyPresentInCart = (cartItems, productCode) => {
  const item = cartItems.find(ci => ci.productCode === productCode);
  return !!item;
};

const calculateQuantity = (cartItems, code) => {
  const item = cartItems.find(ci => ci.productCode === code);
  if (item) {
    return item.quantity;
  }
  return 0;
};

const calculateCartValue = (cartItems, products) => {
  if (!cartItems || cartItems.length === 0) {
    return 0;
  }

  if (!products || products.length === 0) {
    return 0;
  }

  const reducer = (accumulator, currentValue) => {
    const product = products.find(p => p.code === currentValue.productCode);
    return accumulator + currentValue.quantity * product.price;
  };
  return cartItems.reduce(reducer, 0).toFixed(2);
};

const getCart = state => state.cart;

const getAppliedPromos = state => state.promo.appliedPromos;

const isPromoCodeValid = (cart, code) => {
  const { cartItems, cartValue } = cart;
  if (!code || !cartItems || cartItems.length === 0) return false;

  if (code.type === PROMO_CART_TYPE || code.type === PROMO_PRODUCT_TYPE) {
    if (code.option === PROMO_AMOUNT_OPTION) {
      const amount = code[code.option.toLowerCase()];
      if (cartValue.payable >= amount) {
        return true;
      }
    } else if (code.option === PROMO_QUANTITY_OPTION) {
      const quantity = code[code.option.toLowerCase()];
      const item = cartItems.find(ci => ci.productCode === code.product);
      if (item && item.quantity >= quantity) {
        return true;
      }
    }
  }

  return false;
};

const calculateDiscount = (cart, appliedPromos, products) => {
  const { cartItems, cartValue } = cart;
  if (
    !cart
    || !cartItems
    || cartItems.length === 0
    || cartValue.total === 0
    || !appliedPromos
    || appliedPromos.length === 0
    || !products
    || products.length === 0
  ) {
    return 0;
  }

  const reducer = (accumulator, code) => {
    if (!code) {
      return accumulator + 0;
    }

    if (code.type === PROMO_CART_TYPE && code.option === PROMO_AMOUNT_OPTION) {
      const amount = code[code.option.toLowerCase()];
      if (cartValue.payable >= amount) {
        if (code.disountType === PROMO_PERCENTAGE_DISCONUT) {
          const percentage = code[code.disountType.toLowerCase()];
          const discount = (cartValue.payable * percentage) / 100;
          return accumulator + discount;
        }
      }
    } else if (code.type === PROMO_PRODUCT_TYPE && code.option === PROMO_QUANTITY_OPTION) {
      const quantity = code[code.option.toLowerCase()];
      const item = cartItems.find(ci => ci.productCode === code.product);
      if (item && item.quantity >= quantity) {
        if (code.disountType === PROMO_PRICE_DISCOUNT) {
          const specialPrice = code[code.disountType.toLowerCase()];
          const product = products.find(p => p.code === code.product);
          let difference = product.price - specialPrice;
          if (difference < 0) {
            difference *= -1;
          }
          const discount = quantity * difference;
          return accumulator + discount;
        }
      }
    }
    return accumulator + 0;
  };
  appliedPromos.reduce(reducer, 0);
};

export {
  isCartEmpty,
  isProductAlreadyPresentInCart,
  calculateQuantity,
  calculateCartValue,
  getCart,
  isPromoCodeValid,
  getAppliedPromos,
  calculateDiscount,
};
