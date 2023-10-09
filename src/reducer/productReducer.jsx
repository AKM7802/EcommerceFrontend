const ProductReducer=(state,action)=>{
    if(action.type === 'Fetch-Products'){
        const Prices={hardCasePrice:action.payload.Prices.hardCasePrice,glassCasePrice:action.payload.Prices.glassCasePrice}
        return{...state,Products:action.payload.Products,Prices:Prices}
    }
    return state
}

export default ProductReducer