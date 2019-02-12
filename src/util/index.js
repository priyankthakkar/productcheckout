const isCartEmpty = cartItems => (cartItems.length > 0 ? true : false);

const isProductAlreadyPresentInCart = (cartItems, productCode) => {
  const item = cartItems.find(item => item.productCode === productCode);
  return item ? true : false;
};

export { isCartEmpty, isProductAlreadyPresentInCart };
