
export const decrease = (item, menuList) => {

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