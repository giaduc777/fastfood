
export const addToCart = (item, menuList) => {
    for(let i=0; i < menuList.length; i++){
        let tempQuantity = menuList[i][0].quantity;
        
        // ** check the selected menu item against the itemsInCart state ** // 
        // ** Increase that item by one if match ** //
        if(item.description[0] === menuList[i][0].name){
            tempQuantity += 1;
            menuList[i][0].quantity = tempQuantity;
            localStorage.setItem('items', JSON.stringify(menuList))
            return menuList;
        }
    }
};