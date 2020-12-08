import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './Checkout.module.scss';

class Checkout extends Component{

    componentDidMount(){
        document.getElementById('credit').addEventListener('click', e => {
            document.getElementById('paymentInfo').className=`${styles.billing2}`
        });

        document.getElementById('cash').addEventListener('click', e => {
            document.getElementById('paymentInfo').className=`${styles.billing}`
        });
    }

    state = {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
                <div className={`bg-background mt-5 mb-5 ml-auto mr-auto p-0 d-flex flex-column col-10 col-md-8 col-lg-6 ${styles.CheckOut}`}>
                    <div className="align-self-end genericClasses"><Link to="/"><span className="badge x-button">X</span></Link></div>
                    <div className={`${styles.contact}`}>
                        <h1>Tell Us About Yourself</h1>
                        <form className={`${styles.form}`}>
                            <label htmlFor="firstName">First Name</label>
                            <input onChange={(e) => this.handleChange(e)} id="firstName" name="firstName" type="input"></input>

                            <label htmlFor="lastName">Last Name</label>
                            <input onChange={(e) => this.handleChange(e)} id="lastName" name="lastName" type="input"></input>

                            <label htmlFor="email">Send email confirmation to:</label>
                            <input onChange={(e) => this.handleChange(e)} id="email" name="email" type="input"></input>

                            <label htmlFor="phone">Phone</label>
                            <input onChange={(e) => this.handleChange(e)} id="phone" name="phone" type="input"></input>
                        </form>
                    </div>
                    <hr></hr>
                    <div className={`${styles.carryoutAddress}`}>
                            <h2>Carryout Address</h2>
                            <div>
                                <h4>555 Your favorite place Ave</h4>
                                <h4>San jose, Ca, 95009</h4>
                                <h4>(555) 555-5555</h4>
                            </div>
                    </div>
                    <hr></hr>
                    
                    <div className={`m-auto bg-light col-6 d-flex justify-content-between`}>
                        <div>
                            <input className={`mr-1`} type="radio" id="cash" name="paymentType"></input>
                            <label for="cash">Cash</label>
                        </div>
                        <div>
                            <input className={`mr-1`} type="radio" id="credit" name="paymentType"></input>
                            <label for="credit">Credit</label>
                        </div>
                    </div>

                    <div id='paymentInfo' className={`${styles.billing}`}>
                            <h2>Payment Information</h2>
                            <form className={`${styles.form}`}>
                            <label htmlFor="cardNumber">Card Number</label>
                            <input id="cardNumber" name="cardNumber" type="input"></input>

                            <label htmlFor="nameOnCard">Name On Card</label>
                            <input id="nameOnCard" name="nameOnCard" type="input"></input>

                            <div className={`${styles.dropdown} d-flex flex-column flex-sm-row`}>
                                <div className={`${styles.month} w-100`}>
                                    <label htmlFor="month">Exp. Month:</label>
                                    <select id="month">
                                        <option value="january">01 - January</option>
                                        <option value="february">02 - February</option>
                                        <option value="march">03 - March</option>
                                        <option value="april">04 - April</option>
                                        <option value="may">05 - May</option>
                                        <option value="june">06 - June</option>
                                        <option value="july">07 - July</option>
                                        <option value="august">08 - August</option>
                                        <option value="september">09 - September</option>
                                        <option value="october">10 - October</option>
                                        <option value="november">11 - November</option>
                                        <option value="december">12 - December</option>
                                    </select>
                                </div>
                                        
                                <div className={`${styles.year}`}>
                                    <label htmlFor="year">Exp. Year:</label>
                                    <select id="year">
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                        <option value="2031">2031</option>
                                    </select>
                                </div>
                            </div>
                
                            <div className="d-flex flex-column flex-sm-row mt-4">
                                <div className="d-flex flex-column">
                                    <label htmlFor="zipcode">Zip Code</label>
                                    <input className="w-50" id="zipcode" name="zipcode" type="input"></input>
                                </div>

                                <div className="d-flex flex-column">
                                    <label htmlFor="securityCode">Security Code</label>
                                    <input className="w-25" id="securityCode" name="securityCode" type="input"></input>
                                </div>
                            </div>
                          
                        </form>
                    </div>
                    
                    <div className={`${styles.button}`}>
                        <Link onClick={() => this.props.userInfo(this.state)} className={`${styles.reviewOrder}`} to='/reviewOrder'>Review Order</Link>
                    </div>
                </div>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return (
        {
            userInfo: (userInfo) => dispatch({type: 'USER-INFO', value: userInfo})
        }
    )
}

export default connect(null, mapDispatchToProps)(Checkout);

