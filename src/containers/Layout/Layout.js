import React, {Component} from "react";
import Navigation from '../../components/Navigation/Navigation';
import {Link} from 'react-router-dom';
import{connect} from 'react-redux';
import classes from './Layout.module.scss';

import Main from '../../components/Main/Main';
import Menus from '../../components/Menus/Menus';
import SideMenu from '../SideMenu/SideMenu';
import Backdrop from '../../components/Backdrop/Backdrop';
import Footer from '../../components/Footer/Footer';
import SlideItemContainer from '../../components/SlideItemContainer/SlideItemContainer';

class Layout extends Component{

    state={
      sideMenu: null,
      backdrop: null
    }

    openSideMenu = () => {
      this.setState({sideMenu: <SideMenu resetItemsInCart={this.props.resetItemsInCart} login={this.props.state.login} logout={this.props.logout} closeSideMenu={() => this.closeSideMenu()}/>, 
      backdrop: <Backdrop closeSideMenu={() => this.closeSideMenu()} />})
    }

    closeSideMenu = () => {
      this.setState({sideMenu: null, backdrop: null})
    }

    setLogout = () => {
      localStorage.clear(); 
      this.props.setUser();
      this.props.resetToken();
      this.props.logout();
      
      // ** this will reset the itemsInCart state of App.js ** //
      this.props.resetItemsInCart();
    }

    render(){  
        let memberRewards;
        let login;
        let signUp;
        let user;

        if(this.props.state.login === true){
            
            login = (
              <Link className={`nav-link text-white btn btn-sm mr-4 btn-deepSky`} onClick={()=>this.setLogout()} to="/">Sign Out</Link>
            );

            memberRewards = (
              <Link className={`nav-link text-white`} to="/memberRewards">Member Zone</Link>
            );

            user = (
              <h5 className={`text-white mr-3 align-self-center`}>Hi, {this.props.user}!</h5>
            );
        }
        else if(this.props.state.login === false){

            signUp = (
                <Link className={`btn btn-sm mr-4 btn-deepSky nav-link`} to="/createAccount">SIGN UP</Link>
            );

            login = (
              <Link className={`nav-link text-white`} to="/signIn">Log in</Link>
            );

            user = "";
        }
    
        let menuDescription = [
                                {name: "Slice of vegan pizza $2.99", id: "Slice of vegan pizza"},
                                {name: "Slice of cheese pizza $2.99", id: "Slice of cheese pizza"},
                                {name: "Supreme hotdog $3.99", id: "Supreme hotdog"},
                                {name: "Kobei BBQ sauce burger $5.99", id: "Kobei BBQ sauce burger"},
                                {name: "Jumbo chili dog $2.99", id: "Jumbo chili dog"},
                                {name: "Fry mushroom $1.49", id: "Fry mushroom"},
                                {name: "Onion rings $1.49", id: "Onion rings"},
                                {name: "Apple juice $.99", id: "Apple juice"},
                                {name: "Ginger ale $1.49", id: "Ginger ale"},
                                {name: "Root beer float $1.25", id: "Root beer float"} 
                              ]
      
        return (      
                  <div className={`${classes.Layout}`}>
                    {this.state.sideMenu}
                    {this.state.backdrop}

                    <Navigation>
                          <nav className={`navbar navbar-expand-md d-flex flex-row-reverse`}>
                              <div className={`d-flex justify-content-between`}>
                              {user}
                              <Link to="/yourCart" className={`navbar-brand ${classes.cartFrame}`}>
                                  <div className={`${classes.cart}`}>
                                    <svg width="2em" height="2em" viewBox="0 0 16 16" className={`bi bi-cart3`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                                    </svg>
                                  </div>
                                  <div className={`${classes.cartBubble}`}>
                                      <span className={`badge badge-warning border rounded-pill`}>{this.props.getTotalQuantity()}</span>
                                  </div>
                                </Link>
                              </div>
                              <button className={`navbar-toggler border`} type="button" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                 <a onClick={() => this.openSideMenu()} className={`${classes.menu}`}><i className={`fa fa-bars`}></i></a>
                              </button>
                              <div className={`collapse navbar-collapse`} id="navbarNavAltMarkup">
                                <div className={`navbar-nav`}>
                                      <ul className={`nav`}>
                                          {signUp}
                                          {login}
                                          <Link className={`nav-link text-white`} to="/yourCart">Your Cart</Link>
                                          {memberRewards}
                                          <Link className={`nav-link text-white`} to="/AboutUs">About Us</Link>
                                      </ul>
                                </div>
                              </div>
                          </nav>
                    </Navigation>
                    <Main />
                    <SlideItemContainer addToCart={this.props.addToCart}/>
                    <Menus menuDescription={menuDescription} add={this.props.add} />
                    <Footer />
            </div>
        )  
    }
}

const mapStateToProps = state => {
   return {
     user: state.user
   }
}

const mapDispatchToProps = dispatch => {
  return{
       resetToken: () => dispatch({type: 'RESET'}),
      setUser: (user) => dispatch({type: 'SET-USER', value: user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);


