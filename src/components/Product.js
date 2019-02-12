import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardFooter, CardBody, CardTitle, Button,
} from 'reactstrap';

const Product = ({ product, handleAddProduct, handleRemoveProduct }) => (
  <Card body outline color="info">
    <CardHeader>{product.name}</CardHeader>
    <CardBody>
      <CardTitle>{`Product Code: ${product.code}`}</CardTitle>
      <Button
        color="primary"
        outline
        className="rounded-circle"
        onClick={() => handleAddProduct(product.code)}
      >
        <i className="fa fa-plus" />
      </Button>
      {' '}
      <Button disabled color="info">
        0
      </Button>
      {' '}
      <Button
        color="primary"
        outline
        className="rounded-circle"
        onClick={() => handleRemoveProduct(product.code)}
      >
        <i className="fa fa-minus" />
      </Button>
    </CardBody>
    <CardFooter>{`Price: $${product.price}`}</CardFooter>
  </Card>
);

export default Product;

Product.propTypes = {
  product: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      code: PropTypes.code.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  handleAddProduct: PropTypes.func.isRequired,
  handleRemoveProduct: PropTypes.func.isRequired,
};
