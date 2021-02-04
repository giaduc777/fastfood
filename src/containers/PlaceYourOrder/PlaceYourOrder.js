import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class placeYourOrder extends Component{

    componentDidMount(){
        localStorage.removeItem('items');
    }

    render(){
        return(
            <div className="bg-background mt-5 ml-auto mr-auto p-0 d-flex flex-column col-10 col-md-8 col-lg-6">
                <div className="align-self-end genericClasses"><Link to="/"><span className="badge x-button">X</span></Link></div>
                <div className="p-4">
                    <div>Thank you, your order has been received, & will be ready for pick up in 30 min.</div>
                    <div>ORDER #: 77</div>
                    <div>Subtotal: ${this.props.reduxSubTotal}</div>
                    <hr></hr>
                    <div>
                        <h5>Pick up location:</h5>
                        <div>
                            <h4>555 Your favorite place Ave</h4>
                            <h4>San jose, Ca, 95009</h4>
                            <h4>(555) 555-5555</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        reduxSubTotal: state.subTotal
    }
}

export default connect(mapStateToProps)(placeYourOrder);