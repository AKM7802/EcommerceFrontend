import axios from "axios"
const cartReducer=(state,action)=>{
    let total_item=0,total_price=0,total_selling_price=0,discount=0
    
    const computeCart=(cart)=>{
        const newCart=cart?.map((item)=>{
            console.log(item)
            total_item+=item.quantity
            total_price+=item.price.mrp*item.quantity
            total_selling_price+=item.quantity*item.price.sellingPrice
            discount=total_price-total_selling_price
            return item
        })
        return newCart
    }
    if(action.type === "Load-Cart-Products"){
        let {cart}=action.payload
        const newCart=computeCart(cart)
        return{cart:newCart,total_item,total_price,total_selling_price,discount}
    }
    if(action.type === "QTY-CHANGE"){
        let {id,newQuantity}=action.payload;
        
        let cart=state.cart.map((item)=>{ 
            if(item.id===id){
                item.quantity=newQuantity
            }
            total_item+=item.quantity
            total_price+=item.price.mrp*item.quantity
            total_selling_price+=item.quantity*item.price.sellingPrice
            discount=total_price-total_selling_price
            
            return item
        })
        return {cart,total_item,total_price,total_selling_price,discount}
    }

    if(action.type==="REMOVE-CART"){
        let {id,url,userId}=action.payload;

        const filtered_cart=state.cart.filter((item)=>{
            return item.id !== id
        })
        if(userId){
            axios.patch(`${url}api/users/${userId}`,{
                cart:filtered_cart
            }).then((response)=>console.log(response)) 
        }
        let cart=computeCart(filtered_cart)
        return {cart,total_item,total_price,total_selling_price,discount}
    }

    if(action.type==="ADD-TO-CART"){
        console.log("State",state)
        console.log(action.payload)
        const {id,price,product,quantity} =action.payload 
        const productDetails={id,price,product,quantity}
        const {url,userId}=action.payload
        const newCart=state.cart.concat(productDetails)
        const cart=computeCart(newCart)
        if(userId){
            axios.patch(`${url}api/users/${userId}`,{
                cart:newCart
            }).then((response)=>console.log(response)) 
        }
        
        return {cart,total_item,total_price,total_selling_price,discount}
    }

    return state;
}

export default cartReducer