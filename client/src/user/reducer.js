const initialState = {
    user : null,
    token : null,
    wallet : 0

}
const reducer = (state = initialState , action) =>{
    
    switch (action.type){
        
        case "SET_USER":
            return{
                ...state,
                user : action.payload
            }
        
        case "SET_TOKEN":
            return{
                ...state,
                token : action.payload
            }

        case "SET_WALLET":
            return{
                ...state,
                wallet : action.payload
            }

        default:
            return state
    }
}

export default reducer