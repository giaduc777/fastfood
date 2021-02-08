type menuList = {
  name: string;
  price: number;
  quantity: number;
  picture: any;
}[][];

type itemType = {
  id: string
}

export const add = (item: itemType, menuList: menuList): menuList | void => {
    for(let i=0; i < menuList.length; i++){
      let tempItemsInCart = menuList;
      let tempQuantity = tempItemsInCart[i][0].quantity;
     
      // ** check the selected menu item against the itemsInCart state ** //
      // ** Increase that item by one if match ** //
      if(item.id === tempItemsInCart[i][0].name){
          tempQuantity += 1;
          tempItemsInCart[i][0].quantity = tempQuantity;
          localStorage.setItem('items', JSON.stringify(tempItemsInCart))
          return tempItemsInCart;
      }
    }
};