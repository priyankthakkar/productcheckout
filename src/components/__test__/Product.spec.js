import React from 'react';
import { shallow } from 'enzyme';
import {
  CardHeader, CardTitle, CardFooter, Button,
} from 'reactstrap';
import Product from '../Product';

let product;
let handleAddProduct;
let handleRemoveProduct;

beforeEach(() => {
  product = {
    id: 1,
    code: 'wf',
    name: 'Workflow',
    price: 199.99,
  };
  handleAddProduct = jest.fn();
  handleRemoveProduct = jest.fn();
});
describe('Product Component', () => {
  it('should render without throwing error', () => {
    expect(
      shallow(
        <Product
          product={product}
          quantity={20}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('Passing a product as a prop', () => {
    expect(
      shallow(
        <Product
          product={product}
          quantity={20}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />,
      )
        .find(CardHeader)
        .html()
        .includes(product.name),
    );

    expect(
      shallow(
        <Product
          product={product}
          quantity={20}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />,
      )
        .find(CardTitle)
        .html()
        .includes(product.code),
    );

    expect(
      shallow(
        <Product
          product={product}
          quantity={20}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />,
      )
        .find(CardFooter)
        .html()
        .includes(product.price),
    );

    expect(
      shallow(
        <Product
          product={product}
          quantity={20}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />,
      ).find(CardHeader),
    ).toHaveLength(1);
  });

  it('it should call handleAddProduct method', () => {
    const addProductButton = shallow(
      <Product
        product={product}
        quantity={20}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
      />,
    ).find('.btn-add-product');
    expect(addProductButton).toHaveLength(1);
    addProductButton.simulate('click');
    expect(handleAddProduct).toHaveBeenCalledTimes(1);
  });

  it('it should call handleRemoveProduct method', () => {
    const removeProductButton = shallow(
      <Product
        product={product}
        quantity={20}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
      />,
    ).find('.btn-remove-product');
    expect(removeProductButton).toHaveLength(1);
    removeProductButton.simulate('click');
    expect(handleRemoveProduct).toHaveBeenCalledTimes(1);
  });
});
