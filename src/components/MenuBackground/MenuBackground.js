import React from 'react';
import styles from './MenuBackground.module.scss';
import italianStreet_800_compress from '../../asset/background_800_compress/italianStreet_800.jpg';
import italianStreet from '../../asset/background_3800_compress/italianStreet.jpg';

const menuBackground = props => {
     return(
        <div className={styles.MenuBackground}>
           <img srcSet={`${italianStreet}, ${italianStreet_800_compress} 1300w`} alt="italianStreet" style={{width: "100%", height: "100vh", zIndex: "-2",position:"fixed"}}></img>
        </div>
     )
}

export default  menuBackground;