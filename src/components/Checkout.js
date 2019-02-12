import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row, Col, CardDeck, Badge,
} from 'reactstrap';
import Banner from './Banner';
import Product from './Product';
import { loadProducts, addProductToCart, removeProductFromCart } from '../actions';

class Checkout extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  handleAddProduct = productCode => this.props.addProductToCart(productCode);

  handleRemoveProduct = productCode => this.props.removeProductFromCart(productCode);

  render() {
    const { products } = this.props;

    let productDisplay;

    if (!products || products.length === 0) {
      productDisplay = <Banner className="p-2" message="No products are available to display." />;
    } else {
      productDisplay = (
        <CardDeck>
          {products.map(p => (
            <Product
              key={p.id}
              product={p}
              handleAddProduct={this.handleAddProduct}
              handleRemoveProduct={this.handleRemoveProduct}
            />
          ))}
        </CardDeck>
      );
    }
    return (
      <Row>
        <Col lg="9">{productDisplay}</Col>
        <Col lg="3">
          <h3>
            <Badge color="secondary">Cart</Badge>
          </h3>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(loadProducts()),
  addProductToCart: productCode => dispatch(addProductToCart(productCode)),
  removeProductFromCart: productCode => dispatch(removeProductFromCart(productCode)),
});

const mapStateToProps = ({ isLoading, products, error }) => ({
  isLoading,
  products,
  error,
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
  loadProducts: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  removeProductFromCart: PropTypes.func.isRequired,
};
