import React, { Component } from 'react';
import classes from './SideMenu.module.scss';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class sideMenu extends Component{

    setLogout = () => {
        localStorage.clear(); 
        this.props.closeSideMenu();
        this.props.setUser();
        this.props.resetToken();
        this.props.logout();

        //this will reset the itemsInCart state of App.js
        this.props.resetItemsInCart();
    }

    render(){
        
        let login;
        let signUp;

        if(this.props.login === true){
            //localStorage.clear()
            login = <a class="btn btn-sm mr-4 btn-primary text-white nav-link" onClick={()=>this.setLogout()}>Sign Out</a>
        }
        else if(this.props.login === false){

            signUp = (
                <li><Link class="btn btn-sm mr-4 btn-deepSky text-white nav-link d-inline" to="/createAccount">SIGN UP</Link></li>
            )

            login = <Link class="nav-link text-white mt-3 pl-0" to="/signIn">Log in</Link>
        }

        return(
            <div className={classes.SideMenu}>
                <div class="container-fluid">
                    <div class="row mb-5">
                        <div class="col bg-warning">
                            <h3 class="text-center p-2">Welcome</h3>
                        </div>
                    </div>

                    <ul class="nav flex-column">
                        <li class="nav-item">
                            {signUp}
                        </li>
                        <li class="nav-item">
                            {login}
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link text-white pl-0" to="/yourCart">Your Cart</Link>
                        </li>
                        {this.props.user ? <li><Link class="nav-link text-white pl-0" to="/memberRewards">Member Zone</Link></li> : null}
                        <li class="nav-item">
                        <Link class="nav-link text-white pl-0" to="/AboutUs">About Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        resetToken: () => dispatch({type: 'RESET'}),
        setUser: () => dispatch({type: 'SET-USER', value: undefined})
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(sideMenu));