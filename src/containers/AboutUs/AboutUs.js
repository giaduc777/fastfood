import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './AboutUs.module.scss';

class AboutUs extends Component{
    render(){
        return(
           <div className={`container h-75 d-flex ${styles.AboutUs}`}>
               
                <div className={`${styles.frame} d-flex flex-column`}>
                    <div className="align-self-end genericClasses"><Link to="/"><span className="badge x-button">X</span></Link></div>
                    <div className="p-4">
                            <div className="mb-3">Welcome to FastFood. We are a small family owned restaurant located in the bay area. We specialize in making classic Hamburgers & Hotdogs, plus many delicious traditional side orders.</div>
                        <div>
                            <div className="mb-3">Our Location:</div>
                            <div >
                                <div>999 Fast Food Ave</div> 
                                <div>San jose, CA, 95009</div>
                                <div>555-555-5555</div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        );
    };
}

export default AboutUs;


