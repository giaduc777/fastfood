import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ADDRESS} from '../../herokuProxy';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './SignInToCheckout.module.scss';
import RequestError from '../../components/Alerts/RequestError/RequestError';
import Backdrop from '../../components/Alerts/Backdrop/Backdrop';

class SignInToCheckout extends Component{

    state = {
        Email: '',
        Password: '',
        requestError: false,
        errorMessage: ''
    }

    resetRequestError = () => {
        this.setState({requestError: false})
    }

    handleChange = (e) => {
        this.setState({
           ...this.state,
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = async (e) => {
        e.preventDefault()

        let myURL;

        if( process.env.NODE_ENV === 'production'){
            myURL = ADDRESS + '/api/signIn';
        }
        else {
            myURL = '/api/signIn';
        }
  
          try{
              const user = await axios.post(myURL,{
                  email: this.state.Email,
                  password: this.state.Password
              });
        
             if(user.data === false){
                this.setState({requestError: true, errorMessage: "Sorry, invalid login !"});
             }
             else if(user.data === "mongoose connection error"){
                this.setState({requestError: true, errorMessage: "Oops! there might be a connection error. Please try again."});
             }
             else{
                this.props.setToken(user.data.token);
                this.props.setUser(user.data.firstName);
  
                // ** set login state to true in App() ** //
                this.props.login();
                this.props.history.push('/checkout');
             }
          }
          catch(err){
            console.log("From catch block", err);
            this.setState({requestError: true, errorMessage: "Oops! there might be a connection error. Please try again."});
          }
      };

    render(){
        let requestError;

        if(this.state.requestError){
            requestError = (
                <div className={`d-flex justify-content-center`}>
                    <Backdrop />
                    <RequestError resetRequestError={this.resetRequestError} errorMessage={this.state.errorMessage} />
                </div>
            )
        }


        return(     
                <div class={`bg-background mt-5 mb-5 ml-auto mr-auto p-0 d-flex flex-column col-10 col-md-8 col-lg-6 ${styles.SigninToCheckout}`}>
                    {requestError}
                    <div className="align-self-end genericClasses"><Link to="/"><span class="badge x-button">X</span></Link></div>
                    <div className={`${styles.top}`}>
                            <h1>Create an Account</h1>
                            <hr></hr>
                            <p>
                                With a FastFood account, you can save your favorite orders, delivery addresses, 
                                and payment information. You'll speed through checkout and will be eating your
                                favorite food before you know it! Plus, it's the only way to enroll in FastFood
                                Rewards to earn Free delicious food!
                            </p>
                            <div className={`${styles.createAccount}`}>
                                <Link style={{color:"white"}} to='/createAccount'>Create an Account</Link>
                            </div>
                    </div>
                    <div className={`${styles.bottom}`}>
                        <h1>Already an account? Sign In</h1>
                        <hr></hr>
                        <form className={`${styles.form}`} autoComplete="off" method="POST" onSubmit={(e) => this.handleSubmit(e)}>
                            <label htmlFor="Email">Email Address</label>
                            <input type="text" name="Email" value={this.state.Email}
                                onChange={(e) => this.handleChange(e)} />

                            <label htmlFor="Password">Password</label>
                            <input type="password" name="Password" value={this.state.Password}
                                onChange={(e) => this.handleChange(e)} />

                            <button className={`${styles.signInButton}`} value="Submit">Submit</button>
                        </form>
                    </div>
                </div>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setToken: (newToken) => dispatch({type: 'SET-TOKEN', value: newToken}),
        setUser: (user) => dispatch({type: 'SET-USER', value: user})
    }
}

const mapStateToProps = state =>{
    return {
        token: state.token
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInToCheckout));



