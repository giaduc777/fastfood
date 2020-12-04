import React from 'react';
import classes from './SlideItemContainer.module.scss';

import DailyDeal from '../Deals/Deals';
import HappyHours from '../Deals/Deals';

import deal1 from '../../asset/slideItems_300_compress/deal1_300.jpg';
import deal2 from '../../asset/slideItems_300_compress/deal2_300.jpg';
import deal3 from '../../asset/slideItems_300_compress/deal3_300.jpg';
import deal7 from '../../asset/slideItems_300_compress/deal7_300.jpg';
import deal8 from '../../asset/slideItems_300_compress/deal8_300.jpg';
import deal9 from '../../asset/slideItems_300_compress/deal9_300.jpg';

import hour4 from '../../asset/slideItems_300_compress/deal4_300.jpg';
import hour5 from '../../asset/slideItems_300_compress/deal5_300.jpg';
import hour6 from '../../asset/slideItems_300_compress/deal6_300.jpg';
import hour10 from '../../asset/slideItems_300_compress/deal10_300.jpeg';
import redwinepasta from '../../asset/slideItems_300_compress/redwinepasta_300.jpg';

const slideItemContainer = props => {
    
    let dailyDeal = [deal1,deal2,deal3,deal7,deal8,deal9];
    let happyHours = [hour4,hour5,hour6,hour10,redwinepasta];

    let dailyDescription = {
        0: ["Daily Tripple Dog special","Frestly grilled hotdog with chopped onions, bell peppers, & garlics.", "$7.99"],
        1: ["Daily Plain Dog special","We made the hotdog, you bring your own toppings.", "$5.99"],
        2: ["Daily Supreme Dog special","Reduced fat sour cream, chopped tomato, red onions, & sprinkle of cilantro.", "$4.99"],
        3: ["Daily Vocanal Burger spcl.","Sourdough bread, kobei beef, tripple cheeses, onions, & crispy olive oil fries.", "$6.99"],
        4: ["Daily Double Burger special","Plain old classic burgers, with all the healthy veggies.", "$3.99"],
        5: ["Daily Party Tray special","Classic buns, freshly grilled A1 beef, with home made BBQ sauce ", "$9.99"]
      }

      let happyHourDescription = {
        0: ["Mon. Happy hour special","Hand tossed vegan pizza, with tripple layer cheese.", "$6.99"],
        1: ["Tue. Happy hour special","Spicy jumbo cheese stuffed chili dog with glazed buns.", "$3.99"],
        2: ["Wed. Happy hour special","Combination hotdog tray, these are our most popular dogs on the menu.", "$10.99"],
        3: ["Thur. Happy hour special","Flame grilled deluxe quarter pounder, with whole wheat buns & jumble fries.", "$5.99"],
        4: ["Fri. Happy hour special", "Homemade organic red wine pasta, serve with a glass of Austerity wine.", "$8.99"]
      }

     return(

        <div className={classes.SlideItemContainer}>
            <DailyDeal dailyDeal={dailyDeal} 
              dailyDescription={dailyDescription} descriptionName={"dailyDescription"} 
              addToCart={props.addToCart} name={'dailyDeal'}>
            </DailyDeal>

            <HappyHours happyHours={happyHours} 
                happyHourDescription={happyHourDescription} addToCart={props.addToCart}
                descriptionName={'happyHourDescription'} name={'happyHours'}>
            </HappyHours>
        </div>
     )
}

export default slideItemContainer;