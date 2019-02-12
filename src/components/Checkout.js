import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  CardDeck,
  Badge,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import Banner from './Banner';
import Product from './Product';
import Cart from './Cart';
import { loadProducts, addProductToCart, removeProductFromCart } from '../actions';

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

  calculateQuantity = (cartItems, code) => {
    const item = cartItems.find(ci => ci.productCode === code);
    if (item) {
      return item.quantity;
    }
    return 0;
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
                quantity={this.calculateQuantity(cartItems, p.code)}
              />
            ))}
          </CardDeck>
        </div>
      );
    }

    let cartDisplay;
    if (!cartItems || cartItems.length === 0) {
      cartDisplay = <Banner message="Your cart is empty." />;
    } else {
      const cartItemsToDisplay = cartItems.map((ci) => {
        const product = products.find(p => p.code === ci.productCode);
        return {
          product,
          quantity: ci.quantity,
        };
      });

      cartDisplay = cartItemsToDisplay.map((displayItem) => {
        const { product, quantity } = displayItem;
        return (
          <ListGroupItem key={product.id}>
            <div className="clearfix" style={{ padding: '0.5 rem' }}>
              <div className="float-left">
                {`${product.name} `}
                <i className="fa fa-times" />
                &nbsp;
                <Badge pill>{quantity}</Badge>
              </div>
              <div className="float-right">{`${(product.price * quantity).toFixed(2)} $`}</div>
            </div>
          </ListGroupItem>
        );
      });
    }
    return (
      <Row>
        <Col lg="9">{productDisplay}</Col>
        <Col lg="3">
          <div className="d-flex justify-content-center">
            <h3>
              <Badge color="secondary">Cart</Badge>
            </h3>
          </div>
          <div>
            <ListGroup>{cartDisplay}</ListGroup>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <InputGroup>
                <Input placeholder="PROMO CODE" />
                <InputGroupAddon addonType="append">
                  <Button color="primary">APPLY</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <ListGroup>
                <ListGroupItem>Total Amount:</ListGroupItem>
                <ListGroupItem>Discount: </ListGroupItem>
                <ListGroupItem>Amount Payable: </ListGroupItem>
              </ListGroup>
            </div>
          </div>
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
