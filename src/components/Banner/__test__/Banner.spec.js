import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'reactstrap';
import Banner from '..';

let message;

beforeEach(() => {
  message = 'This is a sample message';
});

describe('Banner Component', () => {
  it('Banner should match its snapshot', () => {
    expect(shallow(<Banner message={message} />)).toMatchSnapshot();
  });

  it('Banner must contain the message passed as props', () => {
    expect(
      shallow(<Banner message={message} />)
        .find(Alert)
        .html()
        .includes(message),
    );
  });
});
