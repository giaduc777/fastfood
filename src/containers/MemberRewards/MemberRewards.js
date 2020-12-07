import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import breadStick from '../../asset/rewards_200_compress/breadStick_200.jpg';
import hotWings from '../../asset/rewards_200_compress/hotWings_200.jpg';
import soda from '../../asset/rewards_200_compress/soda_200.jpg';
import mediumCombination from '../../asset/rewards_200_compress/mediumCombination_200.jpg';
import {ADDRESS} from '../../herokuProxy';
import Axios from 'axios';
import styles from './MemberRewards.module.scss';
import RequestError from '../../components/Alerts/RequestError/RequestError';
import Backdrop from '../../components/Alerts/Backdrop/Backdrop';


class MemberRewards extends Component{

    componentDidMount(){
        this.getProfile()
    }

    state = {
        rewardPoints: "",
        requestError: false,
        errorMessage: ""
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
             
            this.setState({rewardPoints: profile.data.rewardPoints})
        }
         catch(err){
            console.log("from catch block", err);
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
            <div className={`${styles.MemberRewards}`}>
                {requestError}
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <button className={`${styles.iconColor} navbar-toggler border`} type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className={"fa fa-bars"}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <Link className="nav-link text-white" to='/memberRewards'>Rewards</Link>
                            <Link className="nav-link text-white" to='/Orders'>Orders</Link>
                            <Link className="nav-link text-white" to='/Profile'>Profile</Link>
                            <Link className="nav-link text-white" to='/'>Home</Link>
                        </ul>
                    </div>
                </nav>
                <div className="bg-background container col-10 mb-3">
                    <h1 className="text-center mt-3 pt-4">Points</h1>
                    <div className="col-8 col-sm-6 col-md-4 col-lg-3 border border-danger borderPoint m-auto p-3">
                        <h2 className="text-center font-weight-bold">{this.state.rewardPoints}</h2>
                    </div>
                    <div className={`${styles.redeemSection}`}>
                        <div >USE YOUR POINTS</div>
                    </div>
                    <div className="pb-4">
                        <div className="row bg-vanilla2 m-auto d-flex flex-column col-6 col-sm-10
                                    align-items-center flex-sm-row justify-content-sm-between
                                    col-lg-8 col-xl-6 p-0 border rounded">
                            <img className={`${styles.image}`} src={breadStick} alt="deal"></img>
                            <div>BreadSticks</div>
                            <div>75 points</div>
                            <div>REDEEM ></div>
                        </div>
                    </div>
                    <div className="pb-4">
                        <div className="row bg-vanilla2 m-auto d-flex flex-column col-6 col-sm-10
                                    align-items-center flex-sm-row justify-content-sm-between
                                    col-lg-8 col-xl-6 p-0 border rounded">
                            <img className={`${styles.image}`} src={hotWings} alt="deal"></img>
                            <div>Hotwings</div>
                            <div>150 points</div>
                            <div>REDEEM ></div>
                        </div>
                    </div>
                    <div className="pb-4">
                        <div className="row bg-vanilla2 m-auto d-flex flex-column col-6 col-sm-10
                                    align-items-center flex-sm-row justify-content-sm-between
                                    col-lg-8 col-xl-6 p-0 border rounded">
                            <img className={`${styles.image}`} src={soda} alt="deal"></img>
                            <div>2L Soda</div>
                            <div>50 points</div>
                            <div>REDEEM ></div>
                        </div>
                    </div>
                    <div className="pb-4">
                        <div className="row bg-vanilla2 m-auto d-flex flex-column col-6 col-sm-10
                                    align-items-center flex-sm-row justify-content-sm-between
                                    col-lg-8 col-xl-6 p-0 border rounded">
                            <img className={`${styles.image}`} src={mediumCombination} alt="deal"></img>
                            <div className="col-sm-4 p-2">Medium Combination</div>
                            <div>75 points</div>
                            <div>REDEEM ></div>
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
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, null)(MemberRewards))

