const initialState = {
    token : null,
    user: undefined,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    loading: false
}

const reducer = (state = initialState, action) => {
      if(action.type === 'SET-TOKEN'){
          return{
              ...state,
              token: action.value
          }
        }
        else if(action.type === 'RESET'){
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
        else if(action.type === "SET-LOADING"){
            return {
                ...state,
                loading: action.value
            }
        }

      return state;
}

export default reducer;