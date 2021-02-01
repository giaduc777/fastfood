import {MenuList} from './MenuList';

const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    orderHistory: "",
    phone: "",
    rewardPoints: "",
    login: false,
    totalQuantity: 0,
    reduxMenuList: MenuList.menuList
}

const reducer = (state = initialState, action) => {

    if(action.type === "INIT_USER"){
        return {
            ...state,
            email: action.payload.email,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            orderHistory: action.payload.orderHistory,
            phone: action.payload.phone,
            rewardPoints: action.payload.rewardPoints,
        }
    }
    else if(action.type === "RESET_MENU_LIST"){
        return {
            ...state,
            reduxMenuList: action.payload.itemsReset
        }
    }
    else if(action.type === "SET_MENU_LIST"){
        return {
            ...state,
            reduxMenuList: action.payload
        }
    }
    else if(action.type === "SET_LOGIN"){
        return {
            ...state,
            login: true
        }
    }
    else if(action.type === "RESET_LOGIN"){
        return {
            ...state,
            login: false
        }
    }
    else if(action.type === "RESET_USER"){
        return {
            ...state,
            email: "",
            firstName: "",
            lastName: "",
            orderHistory: "",
            phone: "",
            rewardPoints: "",
            token: "",
            login: false
        }
    }
    else if(action.type === "SET_USER"){
        return{
            ...state,
            firstName: action.value
        }
    }
    else if(action.type === "SET_TOTAL_QUANTITY"){
        console.log("from polo reducer>>>>", action.value)
        return{
            ...state,
            totalQuantity: action.value
        }
    }


    return state;
}

export default reducer;