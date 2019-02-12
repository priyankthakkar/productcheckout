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

export {
  isCartEmpty, isProductAlreadyPresentInCart, calculateQuantity, calculateCartValue,
};
