import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import useReactRouter from 'use-react-router';
import {ADDRESS} from '../../herokuProxy';
import styles from './SignIn.module.scss';
import RequestError from '../../components/Alerts/RequestError/RequestError';
import Backdrop from '../../components/Alerts/Backdrop/Backdrop';
import SpinningCircle from '../../components/SpinningCircle/SpinningCircle';
import { useDispatch } from 'react-redux';

const signIn = () => {
    const dispatch = useDispatch();
    const {history} = useReactRouter();

    const[Email,setEmail] = useState('');
    const[Password,setPassword] = useState('');
    const[requestError,setRequestError] = useState(false);
    const[errorMessage, setErrorMessage] = useState('');
    const[spinningCircleState,setSpinningCircleState] = useState(false);

    let resetRequestError = () => {
        setRequestError(false);
    }

    let handleChange = (e) => {
        if(e.target.name === "Email"){
            setEmail(e.target.value);
        }
        else{
            setPassword(e.target.value);
        }
    };

    let handleSubmit = async (e) => {
        e.preventDefault()
        setSpinningCircleState(true);

        let myURL;

        if( process.env.NODE_ENV === 'production'){
            myURL = ADDRESS + '/api/signIn';
        }
        else {
            myURL = '/api/signIn';
        }

          try{
              const user = await axios.post(myURL,{
                  email: Email,
                  password: Password
              });
              
             if(user.data === false){
                setRequestError(true);
                setErrorMessage("Sorry, invalid login !");
                setSpinningCircleState(false);
             }
             else{
                dispatch({type: "INIT_USER", payload: user.data});
                localStorage.setItem("token", user.data.token);
                dispatch({type: "SET_LOGIN", value: true});
                setSpinningCircleState(false);
                history.push('/');
             }
          }
          catch(err){
            console.log("From catch block", err);
            setRequestError(true);
            setErrorMessage("Oops! there might be a connection error. Please try again.");
          }
      };

    let reqError;
    let spinningCircle;

    if(spinningCircleState){
        spinningCircle = (<SpinningCircle />)
    }

    if(requestError){
        reqError = (
            <div className={`d-flex justify-content-center`}>
                <Backdrop />
                <RequestError resetRequestError={resetRequestError} errorMessage={errorMessage} />
            </div>
        )
    }

    return(
        <div className="container bg-background p-0 d-flex flex-column mt-5 genericClasses col-10 col-md-8 col-lg-6">
            {spinningCircle}
            {reqError}
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
                    <form className="form" autoComplete="off"  method="POST" onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="Email">Email Address</label>
                        <input type="text" name="Email" 
                            onChange={(e) => handleChange(e)} />

                        <label htmlFor="Password">Password</label>
                        <input type="password" name="Password" 
                            onChange={(e) => handleChange(e)} />

                        <button className="btn border inputButton" value="Submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default signIn;

