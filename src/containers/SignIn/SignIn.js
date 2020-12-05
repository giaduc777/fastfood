import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ADDRESS} from '../../herokuProxy';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './SignIn.module.scss';

class SignIn extends Component{

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

        let myURL;

        if( process.env.NODE_ENV === 'production'){
        myURL = ADDRESS + '/api/placeOrder';
        }
        else {
            myURL = '/api/placeOrder';
        }

          try{
              const user = await axios.post(myURL,{
                  email: this.state.Email,
                  password: this.state.Password
              });
              
             //send to redux/////
             if(user.data === false){
                 alert("Login denied !")
                 this.props.history.push('/');
             }
             else{
                //set token in redux
                this.props.setToken(user.data.token);
                this.props.setUser(user.data.firstName);

                //set login state to true in App()
                this.props.login();
                this.props.history.push('/');
             }
          }
          catch(err){
              console.log(err)
          }
      };
    render(){
        return(
           <div className="container bg-background p-0 d-flex flex-column mt-5 genericClasses">
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
        setToken: (newToken) => dispatch({type: 'SET-TOKEN', value: newToken}),
        setUser: (user) => dispatch({type: 'SET-USER', value: user})
    }
}

const mapStateToProps = state =>{
    return {
        token: state.token
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));




