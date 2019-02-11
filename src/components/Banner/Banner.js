import React from 'react';
import { Alert } from 'reactstrap';
import './Banner.css';

const Banner = ({ message }) => (
    <div className="banner-container d-flex justify-content-center align-items-center">
        <h6>
            <Alert color="info">
                <i className="fa fa-info-circle" />
                {` ${message}`}
            </Alert>
        </h6>
    </div>
);

export default Banner;
