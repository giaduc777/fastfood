const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    orderHistory: "",
    phone: "",
    rewardPoints: "",

    /////////////////
    login: false,
    loading: false
}

const reducer = (state = initialState, action) => {
    //console.log("from Reducer >>> state", state)

    if(action.type === "INIT_USER"){
        //console.log("action >>> 'INIT_USER'", action.payload.token)
        return {
            ...state,
            email: action.payload.email,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            orderHistory: action.payload.orderHistory,
            phone: action.payload.phone,
            rewardPoints: action.payload.rewardPoints,
            token: action.payload.token,
            login: true
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
    else if(action.type === "SET_LOADING"){
        return {
            ...state,
            loading: action.value
        }
    }
    else if(action.type === "SET_USER"){
        //console.log("set user......", action.value)
        return{
            ...state,
            firstName: action.value
        }
    }

    return state;

      /*if(action.type === 'SET-TOKEN'){
          return{
              ...state,
              token: action.value
          }
        }
        if(action.type === 'RESET'){
                return {
                    ...state,
                    token: null
                }
        }
        
        else if(action.type === 'SET-USER'){
            return{
                ...state,
                user: action.value
            }
        }
        
        else if(action.type === 'USER-INFO'){
            return {
                ...state,
                firstName: action.value.firstName,
                lastName: action.value.lastName,
                email: action.value.email,
                phone: action.value.phone
            }
        }
        
        */
}

export default reducer;