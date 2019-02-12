const isCartEmpty = cartItems => cartItems.length === 0;

const isProductAlreadyPresentInCart = (cartItems, productCode) => {
  const item = cartItems.find(ci => ci.productCode === productCode);
  return !!item;
};

export { isCartEmpty, isProductAlreadyPresentInCart };
