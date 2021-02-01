import React, { Component } from 'react';
import classes from './SideMenu.module.scss';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import resetItemsInCart from '../../Functions/resetItemsInCart';

class sideMenu extends Component{

    logOut = () => {
        localStorage.clear(); 
        const reduxItemsReset = resetItemsInCart(this.props.reduxMenuList.menuList);
        this.props.resetReduxCart(reduxItemsReset);
        this.props.resetLogin();

        // ** from Layout.js ** //
        this.props.closeSideMenu();
        this.props.history.push('/'); 
    }

    render(){
        let login;
        let signUp;

        if(this.props.login === true){
            login = <a className="btn btn-sm mr-4 btn-primary text-white nav-link" onClick={()=>this.logOut()}>Sign Out</a>
        }
        else if(this.props.login === false){
            signUp = (
                <Link className="btn btn-sm mr-4 btn-deepSky text-white nav-link d-inline" to="/createAccount">SIGN UP</Link>
            )
            login = <Link className="nav-link text-white mt-3 pl-0" to="/signIn">Log in</Link>
        }

        return(
            <div className={classes.SideMenu}>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col bg-warning">
                            <h3 className="text-center p-2">Welcome</h3>
                        </div>
                    </div>

                    <ul className="nav flex-column">
                        {signUp}
                        {login}
                        <Link className="nav-link text-white pl-0" to="/yourCart">Your Cart</Link>
                        {this.props.login ? <Link className="nav-link text-white pl-0" to="/memberRewards">Member Zone</Link> : null}
                        <Link className="nav-link text-white pl-0" to="/AboutUs">About Us</Link>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        login: state.login,
        reduxMenuList: state.reduxMenuList
    }
}

const mapDispatchToProps = dispatch => {
    return{
        resetUser: () => dispatch({type: 'RESET_USER'}),
        resetLogin: () => dispatch({type: "RESET_LOGIN"}),
        resetReduxCart: (reduxItemsReset) => dispatch({type: "RESET_MENU_LIST", payload: reduxItemsReset})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(sideMenu));