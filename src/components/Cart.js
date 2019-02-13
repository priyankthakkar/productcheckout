import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Badge,
  ListGroup,
  ListGroupItem,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from 'reactstrap';
import Banner from './Banner';

const ClearFixDiv = styled.div`
  padding: 0.5rem 0;
`;

const PromoContainer = styled.div`
  padding: 0.625rem 0;
`;

const Cart = ({ cartItems, products, cartValue }) => {
  const { total, discount, payable } = cartValue;
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

    const cartContent = cartItemsToDisplay.map((displayItem) => {
      const { product, quantity } = displayItem;
      return (
        <ListGroupItem key={product.id}>
          <ClearFixDiv className="clearfix">
            <div className="float-left">
              {`${product.name} `}
              <i className="fa fa-times" />
              &nbsp;
              <Badge pill>{quantity}</Badge>
            </div>
            <div className="float-right">{`${(product.price * quantity).toFixed(2)} $`}</div>
          </ClearFixDiv>
        </ListGroupItem>
      );
    });

    cartDisplay = (
      <Fragment>
        <ListGroup>{cartContent}</ListGroup>
        <PromoContainer>
          <InputGroup>
            <Input placeholder="PROMO CODE" />
            <InputGroupAddon addonType="append">
              <Button color="primary">APPLY</Button>
            </InputGroupAddon>
          </InputGroup>
        </PromoContainer>
        <div>
          <ListGroup>
            <ListGroupItem>
              <ClearFixDiv className="clearfix">
                <div className="float-left">Total Amount:</div>
                <div className="float-right">
                  {total}
                  {' $'}
                </div>
              </ClearFixDiv>
            </ListGroupItem>
            <ListGroupItem>
              <ClearFixDiv className="clearfix">
                <div className="float-left">Discount: </div>
                <div className="float-right">
                  {discount}
                  {' $'}
                </div>
              </ClearFixDiv>
            </ListGroupItem>
            <ListGroupItem>
              <ClearFixDiv className="clearfix">
                <div className="float-left">Amount Payable: </div>
                <div className="float-right">
                  {payable}
                  {' $'}
                </div>
              </ClearFixDiv>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <h3>
          <Badge color="secondary">Cart</Badge>
        </h3>
      </div>
      <div>{cartDisplay}</div>
    </Fragment>
  );
};

export default Cart;

Cart.propTypes = {
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
  cartValue: PropTypes.objectOf(
    PropTypes.shape({
      total: PropTypes.number.isRequired,
      discout: PropTypes.number.isRequired,
      payable: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
