import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import functions from '../../Functions/Functions';
import Top from './Top/Top';
import Cart from './Cart/Cart';

const yourCart = (): JSX.Element => {

    type menuList = {
        name: string;
        price: number;
        quantity: number;
        picture: any;
    }[][];
    
    interface RootState {
        login: boolean;
        totalQuantity: number,
        menuList: menuList
    }

    /** Hook to redux-store */
    const dispatch = useDispatch();
    const state = useSelector( (state: RootState) => state);
    
    /** Redux-state */
    let reduxLogin = state.login;
    let reduxTotalQuantity = state.totalQuantity;
    let reduxMenuList = state.menuList;

    /** Decrease quantity by 1 */
    const callDecrease = (item: string): void => {
        const tempItemsInCart = functions.decrease(item, reduxMenuList);

        if(tempItemsInCart){
            dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});

            if(reduxTotalQuantity > 1){
                dispatch({type: "SET_TOTAL_QUANTITY", value: reduxTotalQuantity - 1});
            }
        }
    };

    /** Increase quantity by 1 */
    const callIncrease = (item: string): void => {
            const tempItemsInCart = functions.increase(item, reduxMenuList);
            dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
            dispatch({type: "SET_TOTAL_QUANTITY", value: (reduxTotalQuantity + 1)});
    };
   
    /** Remove the whole item */
    const callRemoveItem = (item: string): void => {
        const tempItemsInCart = functions.removeItem(item, reduxMenuList);
    
        if(tempItemsInCart){
            let totalQuantity = functions.getTotalQuantity(tempItemsInCart);
            dispatch({type: "SET_TOTAL_QUANTITY", value: totalQuantity});
            dispatch({type: "SET_MENU_LIST", payload: tempItemsInCart});
        }
    };

    let items: JSX.Element[] = [];
    let orders = functions.getOrders();
    
    /** If there's at least 1 item in cart */
    if(Object.keys(orders).length !== 0){
        for(let i=0; i < Object.keys(orders).length; i++){   
            items.push(
                <Top key={i} id={i} menuList={orders} quantity={orders[i][0].quantity} 
                     callDecrease={() => callDecrease(orders![i][0].name)} 
                     callIncrease={() => callIncrease(orders![i][0].name)} 
                     callRemoveItem={() => callRemoveItem(orders![i][0].name)} />
            );
        };
    }

    return(
        <div className="container text-center">
            <div className="bg-background border rounded mt-3 mb-3">
                <h3 className="pt-4">Your cart</h3>
                <Cart orders={orders} items={items} reduxTotalQuantity={reduxTotalQuantity} 
                      reduxLogin={reduxLogin} reduxMenuList={reduxMenuList} />
            </div>
        </div>
    );
};

export default yourCart;


 


