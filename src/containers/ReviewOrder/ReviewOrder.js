import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';
import {ADDRESS} from '../../herokuProxy';
import {withRouter} from 'react-router-dom';
import styles from './ReviewOrder.module.scss';

class ReviewOrder extends Component{

    placeOrder = async () => {
        console.log("from ReviewOrder placeOrder() >>>")
        let myURL;

        if( process.env.NODE_ENV === 'production'){
            myURL = ADDRESS + '/api/placeOrder';
        }
        else {
            myURL = '/api/placeOrder';
        }

        this.props.setLoading(true)

        //const tempToken = localStorage.getItem("token");
         
        try{
            await Axios.post(myURL, {
                firstName: this.props.userInfo.firstName,
                lastName: this.props.userInfo.lastName,
                email: this.props.userInfo.email,
                phone: this.props.userInfo.phone,
                token: this.props.userInfo.token,
                login: this.props.userInfo.login,
                items: this.props.getOrders(),
                rewardPoints: Math.round(this.props.getSubtotal()),
                subTotal: this.props.getSubtotal()
            }); 
            
            this.props.setLoading(false)
            this.props.history.push('/placeYourOrder')
        }
         catch(err){
            //will implement later
            //the error is throw from the backend
        }
    }
    
    render(){
        let items = [];
        let orders = this.props.getOrders();
    
        if(Object.keys(orders).length !== 0){
            for(let i=0; i < Object.keys(orders).length; i++){
                items.push(
                    <div key={i} className={`${styles.ReviewOrder}`}>
                        <li className={`${styles.item}`}>  
                            <div>
                                <hr></hr>
                                <div className="d-sm-flex justify-content-sm-between">
                                    <div ><img className={`${styles.image} mb-3 border`} src={orders[i].picture} alt="icon_picture"></img></div>
                                    <div className="mb-2 pl-sm-4 pr-sm-4">{orders[i].name}</div>
                                    <div >${orders[i].price}</div>
                                </div>
                            </div>
                            <div className="d-flex mt-3">
                                <div className="mr-3">Quantity: </div>
                                <div ><span className="badge badge-light" style={{fontSize:"1rem"}}>{orders[i].quantity}</span></div>
                            </div>
                       </li>
                    </div>
                );
            };
        }

        return(
                <div className={`${styles.ReviewOrder} bg-background mt-5 ml-auto mr-auto p-0 d-flex flex-column col-10 col-md-8 col-lg-6`}>
                    
                    <div className="align-self-end genericClasses"><Link to="/"><span className="badge x-button">X</span></Link></div>
                    <div className="p-4">
                        <div >
                            <h3>You're Almost Done !</h3>
                            <h5>Just make sure the information below is correct & place your order.</h5>
                        </div>
                        <hr></hr>
                        <div className="border p-3">
                            <h5>Contact & Payment Information</h5>
                            <div >{this.props.userInfo.firstName} {this.props.userInfo.lastName}</div>
                            <div className="text-break">{this.props.userInfo.email}</div>
                            <div >{this.props.userInfo.phone}</div>
                            <div ><i>Payment Method</i>: CREDIT</div>
                            <a href="#">Edit Contact & Payment Information</a>
                        </div>
                        <hr></hr>
                        <div className="border p-3">
                            <h4>Your Carry Out Store</h4>
                            <div>
                                <div>555 Your favorite place Ave</div>
                                <div>San jose, Ca, 95009</div>
                                <div>(555) 555-5555</div>
                                <div>Today's Hours</div>
                                <div>10:00 a.m  to  09:00 p.m</div>
                            </div>
                        </div>
                        <div className="d-flex flex-column border mt-4">
                            <div className=" col-sm-9 col-lg-7 m-auto">
                                <h3 className="text-center mt-5">Your Cart</h3>
                                {items}
                            </div>
                            <div className="col-10 m-auto">
                                <hr></hr>
                                <div className={`${styles.button}`}>
                                    <button onClick={() => this.placeOrder()} className={`${styles.placeYourOrder}`}>Place Your Order</button>
                                </div>
                                <div className="col-sm-7 col-lg-5 m-auto p-0">
                                    <div className="d-flex justify-content-between h6"><div>Total:</div><span>{this.props.getTotalPrice()}</span></div>
                                    <div className="d-flex justify-content-between h6">Tax:<span>{this.props.getTaxes()}</span></div>
                                    <div className="d-flex justify-content-between h6">Subtotal:<span>{this.props.getSubtotal()}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
     return {
         userInfo: state,
         loading: state.loading
     }
}

const mapDispatchToProps = dispatch => {
    return{
         setLoading: (value) => dispatch({type: 'SET-LOADING', value: value})
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewOrder));