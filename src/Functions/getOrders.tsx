type menuList = {
   name: string,
   price: number,
   picture: any,
   quantity: number
}[][];

export const getOrders = (): menuList => {
    let orders: menuList;
    let ordersArray: menuList = [];
 
    const localStorageItems: menuList = JSON.parse(localStorage.getItem('items')!)

    if(localStorageItems !== null){
      let itemLocation = 0;
          /** go through the whole itemsInCart & get items that */
          /** has quantity larger than 1 & put it in orders={} */
          for(let i=0; i < localStorageItems.length; i++){
            if(localStorageItems[i][0].quantity > 0){
              ordersArray[itemLocation] = localStorageItems[i];
              itemLocation++;
            }
          }
          orders = ordersArray.concat();
          return orders;
    }

    /** no items in local storage, return empty array */
    return ordersArray;
};