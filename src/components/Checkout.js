import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row, Col, CardDeck, Badge,
} from 'reactstrap';
import Banner from './Banner';
import Product from './Product';
import Cart from './Cart';
import {
  loadProducts,
  loadPromos,
  addProductToCart,
  removeProductFromCart,
  applyPromo,
} from '../actions';
import { calculateQuantity } from '../util';

class Checkout extends Component {
  componentDidMount() {
    const { onLoadProducts, onLoadPromos } = this.props;
    onLoadPromos();
    onLoadProducts();
  }

  handleAddProduct = (productCode) => {
    const { onAddProductToCart } = this.props;
    onAddProductToCart(productCode);
  };

  handleRemoveProduct = (productCode) => {
    const { onRemoveProductFromCart } = this.props;
    onRemoveProductFromCart(productCode);
  };

  handleApplyPromocode = (promoCode) => {
    const { onApplyPromo } = this.props;
    onApplyPromo(promoCode);
  };

  render() {
    const { products, cart, promo } = this.props;
    const { cartItems, cartValue } = cart;
    const { appliedPromos } = promo;

    let productDisplay;

    if (!products || products.length === 0) {
      productDisplay = <Banner message="No products are available to display." />;
    } else {
      productDisplay = (
        <div>
          <div className="d-flex justify-content-center">
            <h3>
              <Badge color="secondary">Products</Badge>
            </h3>
          </div>
          <CardDeck>
            {products.map(p => (
              <Product
                key={p.id}
                product={p}
                handleAddProduct={this.handleAddProduct}
                handleRemoveProduct={this.handleRemoveProduct}
                quantity={calculateQuantity(cartItems, p.code)}
              />
            ))}
          </CardDeck>
        </div>
      );
    }

    return (
      <Row>
        <Col lg="9">{productDisplay}</Col>
        <Col lg="3">
          <Cart
            cartItems={cartItems}
            products={products}
            cartValue={cartValue}
            appliedPromos={appliedPromos}
            handleApplyPromocode={this.handleApplyPromocode}
          />
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoadProducts: () => dispatch(loadProducts()),
  onLoadPromos: () => dispatch(loadPromos()),
  onAddProductToCart: productCode => dispatch(addProductToCart(productCode)),
  onRemoveProductFromCart: productCode => dispatch(removeProductFromCart(productCode)),
  onApplyPromo: promoCode => dispatch(applyPromo(promoCode)),
});

const mapStateToProps = ({
  isLoading, products, error, cart, promo,
}) => ({
  isLoading,
  products,
  error,
  cart,
  promo,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);

Checkout.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  cart: PropTypes.object,
  onLoadProducts: PropTypes.func.isRequired,
  onAddProductToCart: PropTypes.func.isRequired,
  onRemoveProductFromCart: PropTypes.func.isRequired,
  onLoadPromos: PropTypes.func.isRequired,
  onApplyPromo: PropTypes.func.isRequired,
};
