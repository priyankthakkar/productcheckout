import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, CardDeck, Badge } from 'reactstrap';
import Banner from './Banner';
import Product from './Product';
import { loadProducts } from '../actions';

class Checkout extends Component {

    componentDidMount() {
        this.props.loadProducts();
    }

    render() {
        const { products } = this.props;

        let productDisplay;



        if(!products || products.length === 0) {
            productDisplay = (
                <Banner className="p-2" message="No products are available to display."/>);
        } else {
            productDisplay = (
                <CardDeck>
                    {
                        products.map(p => <Product key={p.id} product={p} />)
                    }
                </CardDeck>
            );
        }
        return (
            <Row>
                <Col lg="9">
                    {productDisplay}
                </Col>
                <Col lg="3">
                    <h3>
                        <Badge color="secondary">Cart</Badge>
                    </h3>

                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadProducts: () => dispatch(loadProducts())
})

const mapStateToProps = ({ isLoading, products, error}) => ({
    isLoading,
    products,
    error
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
