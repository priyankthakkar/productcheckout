import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import styled from 'styled-components';

const BannerContainer = styled.div`
  padding: 0.625rem;
`;

const Banner = ({ message }) => (
  <BannerContainer className="d-flex justify-content-center align-items-center">
    <h6>
      <Alert color="info">
        <i className="fa fa-info-circle" />
        {` ${message}`}
      </Alert>
    </h6>
  </BannerContainer>
);

export default Banner;

Banner.propTypes = {
  message: PropTypes.string.isRequired,
};
