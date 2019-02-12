import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row, Col, CardDeck, Badge,
} from 'reactstrap';
import Banner from './Banner';
import Product from './Product';
import Cart from './Cart';
import { loadProducts, addProductToCart, removeProductFromCart } from '../actions';
import { calculateQuantity } from '../util';

class Checkout extends Component {
  componentDidMount() {
    const { onLoadProducts } = this.props;
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

  render() {
    const { products, cartItems } = this.props;

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
          <Cart cartItems={cartItems} products={products} />
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoadProducts: () => dispatch(loadProducts()),
  onAddProductToCart: productCode => dispatch(addProductToCart(productCode)),
  onRemoveProductFromCart: productCode => dispatch(removeProductFromCart(productCode)),
});

const mapStateToProps = ({
  isLoading, products, error, cartItems,
}) => ({
  isLoading,
  products,
  error,
  cartItems,
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
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      productCode: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onLoadProducts: PropTypes.func.isRequired,
  onAddProductToCart: PropTypes.func.isRequired,
  onRemoveProductFromCart: PropTypes.func.isRequired,
};
