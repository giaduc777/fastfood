import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ADDRESS} from '../../herokuProxy';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './SignInToCheckout.module.scss';

class SignInToCheckout extends Component{

    state = {
        Email: '',
        Password: ''
    }

    handleChange = (e) => {
        this.setState({
           ...this.state,
            [e.target.name]: e.target.value
        })
    };

    //send Data to backend when user hit submit/////
    handleSubmit = async (e) => {
        e.preventDefault()

        if( process.env.NODE_ENV === 'production'){
            let myURL = ADDRESS + '/api/signIn';
        }
        else {
            let myURL = '/api/signIn';
        }
  
          try{
              const user = await axios.post(myURL,{
                  email: this.state.Email,
                  password: this.state.Password
              });
        
              //if user does not exist/////
             if(user.data === false){
                 alert("Login denied !")
                 this.props.history.push('/');
             }
             else if(user.data === "mongoose connection error"){
                 alert("Connection error, please try again !");
             }
             else{
                 //set token in redux
                this.props.setToken(user.data.token);
                this.props.setUser(user.data.firstName);
  
                //set login state to true in App()
                this.props.login();
                this.props.history.push('/checkout');
             }
          }
          catch(err){
              console.log("Mongoose ERROR>>>>>>>", err)
          }
      };

    render(){
        return(     
                <div class={`bg-background mt-5 mb-5 ml-auto mr-auto p-0 d-flex flex-column col-10 col-md-8 col-lg-6 ${styles.SigninToCheckout}`}>
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



