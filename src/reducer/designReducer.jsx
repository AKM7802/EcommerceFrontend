const designReducer=(state,action)=>{
    if(action.type === 'Fetch-Designs'){
        return {...state,Designs:action.payload.Designs}
    }
    return state
}

export default designReducer