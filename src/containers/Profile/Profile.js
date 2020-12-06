import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {ADDRESS} from '../../herokuProxy';
import Axios from 'axios';
import styles from './Profile.module.scss';
import RequestError from '../../components/Alerts/RequestError/RequestError';
import Backdrop from '../../components/Alerts/Backdrop/Backdrop';

class Profile extends Component{

    componentDidMount(){
        this.getProfile()
    }

    state = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        rewardPoints: '',
        requestError: false,
        errorMessage: ''
    }

    resetRequestError = () => {
        this.setState({requestError: false})
    }

    getProfile = async () => {
        
        let myURL;

        if( process.env.NODE_ENV === 'production'){
            myURL = ADDRESS + '/api/profile';
        }
        else {
            myURL = '/api/profile';
        }

        const tempToken = localStorage.getItem("token");

        try{
            const profile = await Axios.post(myURL, {
                token: tempToken
            }); 

            this.setState({...profile.data})
        }
         catch(err){
            console.log("From catch block", err);
            this.setState({requestError: true, errorMessage: "Oops! there might be a connection error. Please try again."});
        }
    }

    render(){
        let Contents = null;
        let requestError;

        if(this.state.requestError){
            requestError = (
                <div className={`d-flex justify-content-center`}>
                    <Backdrop />
                    <RequestError resetRequestError={this.resetRequestError} errorMessage={this.state.errorMessage} />
                </div>
            )
        }
        
        if(localStorage.getItem('token') !== null){
            Contents = (
                <div className={`${styles.Profile}`}>
                    {requestError}
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <button className={`${styles.iconColor} navbar-toggler border`} type="button" data-toggle="collapse" data-target="#navbarNav">
                            <span className={"fa fa-bars"}></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to='/memberRewards'>Rewards</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to='/Orders'>Orders</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to='/Profile'>Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to='/'>Home</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="mt-4 mb-5 row">
                        <div className="col-10 col-sm-8 col-md-6 col-lg-4 bg-background m-auto container d-flex flex-column align-items-center">
                            <div className="title pt-4 pb-4">PROFILE</div>
                            <div className="d-flex flex-column">
                                <div className={`${styles.description}`}>First Name:<span>{this.state.firstName}</span></div>
                                <div className={`${styles.description}`}>Last Name:<span>{this.state.lastName}</span></div>
                                <div className={`${styles.description}`}>Email:<span>{this.state.email}</span></div>
                                <div className={`${styles.description}`}>Phone:<span>{this.state.phone}</span></div>
                                <div className={`${styles.description} pb-4`}>Reward Points:<span>{this.state.rewardPoints}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            this.props.history.push('/');
        }
       
        return(
            <div>
                {Contents}
            </div>
         );
     }
};

const mapStateToProps = state => {
    return {
        userProfile: state
    }
}

export default withRouter(connect(mapStateToProps, null)(Profile))
