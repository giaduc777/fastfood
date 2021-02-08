type menuList = {
  name: string;
  price: number;
  quantity: number;
  picture: any;
}[][];

export const decrease = (item: string, menuList: menuList): boolean | menuList => {

    // ** Search the state itemsInCart[], & decrease the item by 1 ** //
    for(let i=0; i < menuList.length; i++){
      if(menuList[i][0].name === item && menuList[i][0].quantity > 1){
            menuList[i][0].quantity -= 1;
            localStorage.setItem('items', JSON.stringify(menuList));
            return menuList;
      };
    };
    return false;
};