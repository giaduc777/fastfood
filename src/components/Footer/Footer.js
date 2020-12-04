import React from 'react';
import styles from './Footer.module.scss';

const footer = props => {
    return(
      <nav className={`navbar navbar-light bg-footerColor ${styles.Footer}`}>
        <small className={`align-self-end text-deepSky`}>Design by Duc_Le</small>
        <div className={`${styles.iconGroup}`}>
            <a className={`${styles.icon}`} href="#">
              <i className={`fab fa-facebook-square`}></i>
            </a>
            <a className={`${styles.icon}`} href="#">
              <i className={`fab fa-instagram`}></i>
            </a>
            <a className={`${styles.icon}`}  href="#">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a className={`${styles.icon}`} href="#">
              <i className="fab fa-youtube-square"></i>
            </a>
        </div>
    </nav>
    )
}

export default footer;






