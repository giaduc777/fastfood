export const getOrders = () => {
    let orders={};
    let ordersArray = [];

    // ** You have to get the items from local storage, or else when ** //
    // ** placeYourOrder.js do a items reset, 'orders' will also be set to zero ** //
    const localStorageItems = JSON.parse(localStorage.getItem('items'))
    
    if(localStorageItems !== null){
          // ** go through the whole itemsInCart & get items that ** //
          // ** has quantity larger than 1 & put it in orders={} ** //
          for(let i=0; i < localStorageItems.length; i++){
            if(localStorageItems[i][0].quantity > 0){
              ordersArray.push(localStorageItems[i][0])
            }
          }
          orders = {...ordersArray}
          return orders;
    }
};