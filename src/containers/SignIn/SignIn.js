import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ADDRESS} from '../../herokuProxy';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './SignIn.module.scss';
import RequestError from '../../components/Alerts/RequestError/RequestError';
import Backdrop from '../../components/Alerts/Backdrop/Backdrop';
import SpinningCircle from '../../components/SpinningCircle/SpinningCircle';


class SignIn extends Component{

    state = {
        Email: '',
        Password: '',
        requestError: false,
        errorMessage: '',
        spinningCircleState: false
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
        this.setState({spinningCircleState: true})

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
                this.setState({
                    requestError: true, 
                    errorMessage: "Sorry, invalid login !",
                    spinningCircleState: false
                });
             }
             else{
                this.props.initUser(user.data);
                localStorage.setItem("token", user.data.token)
                this.props.login()
                this.setState({spinningCircleState: false})
                this.props.history.push('/');
             }
          }
          catch(err){
            console.log("From catch block", err);
            this.setState({requestError: true, errorMessage: "Oops! there might be a connection error. Please try again."});
          }
      };
    render(){
        let requestError;
        let spinningCircle;

        if(this.state.spinningCircleState){
            spinningCircle = (<SpinningCircle />)
        }

        if(this.state.requestError){
            requestError = (
                <div className={`d-flex justify-content-center`}>
                    <Backdrop />
                    <RequestError resetRequestError={this.resetRequestError} errorMessage={this.state.errorMessage} />
                </div>
            )
        }

        return(
           <div className="container bg-background p-0 d-flex flex-column mt-5 genericClasses col-10 col-md-8 col-lg-6">
               {spinningCircle}
               {requestError}
                <div className="align-self-end"><Link to="/"><span className="badge x-button">X</span></Link></div>
                <div className={`col-lg-9 m-auto ${styles.SignIn}`}>
                    <div className={`${styles.top}`}>
                        <h2>Create an Account</h2>
                        <hr></hr>
                        <p>
                            With a FastFood account, you can save your favorite orders, delivery addresses, 
                            and payment information. You'll speed through checkout and will be eating your
                            favorite food before you know it! Plus, it's the only way to enroll in FastFood
                            Rewards to earn Free delicious food!
                        </p>
                        <div>
                            <Link className="btn border inputButton" to='/createAccount'>Create an Account</Link>
                        </div>
                    </div>
                        
                    <div className={`${styles.bottom}`}>
                        <h2>Already an account? Sign In</h2>
                        <hr></hr>
                        <form className="form" autoComplete="off"  method="POST" onSubmit={(e) => this.handleSubmit(e)}>
                            <label htmlFor="Email">Email Address</label>
                            <input type="text" name="Email" value={this.state.Email}
                                onChange={(e) => this.handleChange(e)} />

                            <label htmlFor="Password">Password</label>
                            <input type="password" name="Password" value={this.state.Password}
                                onChange={(e) => this.handleChange(e)} />

                            <button className="btn border inputButton" value="Submit">Submit</button>
                        </form>
                    </div>
                </div>
           </div>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initUser: (payload) => dispatch({type: "INIT_USER", payload: payload}),
        login: () => dispatch({type: "SET_LOGIN", value: true})
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SignIn));




