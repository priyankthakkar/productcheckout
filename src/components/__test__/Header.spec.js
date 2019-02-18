import React from 'react';
import { shallow } from 'enzyme';
import { NavbarBrand } from 'reactstrap';
import Header from '../Header';

describe('Header Component', () => {
  it('It should match the snapshot', () => {
    expect(shallow(<Header />)).toMatchSnapshot();
  });

  it('It should contain header text', () => {
    expect(
      shallow(<Header />)
        .find(NavbarBrand)
        .html()
        .includes('Product Checkout'),
    );
  });
});
