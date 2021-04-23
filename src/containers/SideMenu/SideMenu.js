import React from 'react';
import classes from './SideMenu.module.scss';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import useReactRouter from "use-react-router";
import resetItemsInCart from '../../Functions/resetItemsInCart';

const sideMenu = (props) => {
    
    const { history } = useReactRouter();
    const dispatch = useDispatch();
    const menuList = useSelector(state => state.menuList);
    const reduxLogin = useSelector(state => state.login);

    let logOut = () => {
        localStorage.clear(); 
        const itemsReset = resetItemsInCart(menuList);
        dispatch({type: "RESET_MENU_LIST", payload: itemsReset});
        dispatch({type: "RESET_LOGIN"});
        dispatch({type: "SET_TOTAL_QUANTITY", value: 0});

        // ** from Layout.js ** //
        props.closeSideMenu();
        history.push('/'); 
    }

    let login;
    let signUp;

    if(reduxLogin === true){
        login = <a className="btn btn-sm mr-4 btn-primary text-white nav-link" onClick={() => logOut()}>Sign Out</a>
    }
    else if(reduxLogin === false){
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
                    {reduxLogin ? <Link className="nav-link text-white pl-0" to="/memberRewards">Member Zone</Link> : null}
                    <Link className="nav-link text-white pl-0" to="/AboutUs">About Us</Link>
                </ul>
            </div>
        </div>
    )
}

export default sideMenu;
