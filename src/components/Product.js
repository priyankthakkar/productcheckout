import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";

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
      </Button>{" "}
      <Button disabled color="info">
        0
      </Button>{" "}
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
