import React from 'react';
import Menu from '../Menus/Menu/Menu';
import styles from './Menus.module.scss';

import img1 from '../../asset/carousel_400_compress/1_400.jpg';
import img2 from '../../asset/carousel_400_compress/2_400.jpg';
import img3 from '../../asset/carousel_400_compress/3_400.jpg';
import img4 from '../../asset/carousel_400_compress/4_400.jpg';
import img5 from '../../asset/carousel_400_compress/5_400.jpg';
import img6 from '../../asset/carousel_400_compress/6_400.jpg';

const menus = props => {
 
   let menuArray=[];

   for(let i=0; i < props.menuDescription.length; i++){
       menuArray.push(props.menuDescription[i].name)
   }
  
   return(
       <div className={`${styles.Menus}`}>
           <div className="container"> 
          <div className={`row ${styles.dailyMenuText}`}>
            <div className="col-lg-6 col-md-11 mt-5 mb-5 p-0">
                <div className={`${styles.dailyMenuContainer}`}></div>
                <h1 className={`${styles.title}`}>Daily Menu</h1>
                
                {menuArray.map((v, i) => {
                    return <Menu menu={v} key={i}  id={props.menuDescription[i].id} add={props.add} />
                })}
            </div>
            
                <div className="col-lg-6 d-none d-lg-block">
                    <div id="carouselExampleFade" className={`${styles.carouselExampleFade} border rounded carousel slide carousel-fade w-75 bg-primary`} data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-interval="">
                            <img src={img1} style={{width: "150px", height: "350px"}} className="d-block w-100" alt="Hamburger"></img>
                            </div>
                            <div className="carousel-item" data-interval="">
                            <img src={img2} style={{width: "150px", height: "350px"}} className="d-block w-100" alt="Hamburger"></img>
                            </div>
                            <div className="carousel-item" data-interval="">
                            <img src={img3} style={{width: "150px", height: "350px"}} className="d-block w-100" alt="Hamburger"></img>
                            </div>
                            <div className="carousel-item" data-interval="">
                            <img src={img4} style={{width: "150px", height: "350px"}} className="d-block w-100" alt="Hamburger"></img>
                            </div>
                            <div className="carousel-item" data-interval="">
                            <img src={img5} style={{width: "150px", height: "350px"}} className="d-block w-100" alt="Hamburger"></img>
                            </div>
                            <div className="carousel-item" data-interval="">
                            <img src={img6} style={{width: "150px", height: "350px"}} className="d-block w-100" alt="Hamburger"></img>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev" >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next w-25" href="#carouselExampleFade" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div> 
       </div>
   )
}

export default menus;
