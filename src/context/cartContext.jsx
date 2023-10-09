import { createContext, useEffect } from "react";
import { useReducer } from "react";
import reducer from "../reducer/cartReducer";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

export const CartContext=createContext()

let cart=[]
let total_items=0,total_price=0,total_selling_price=0,discount=0
cart.forEach(item=>{
    total_items+=item.quantity
    total_price+=item.quantity*item.price
    total_selling_price+=item.quantity*item.selling_price
    discount=total_price-total_selling_price
})

const initialState={
    cart:cart,
    total_item:total_items,
    total_price:total_price,
    discount:discount,
    total_selling_price:total_selling_price
}





export const CartProvider=({children,url})=>{
    const { isAuthenticated,user  } = useAuth0();
    
    const [state,dispatch]=useReducer(reducer,initialState)

    
    const quantityChange=(id,newQuantity)=>{
        dispatch({type:"QTY-CHANGE",payload:{id,newQuantity}})
    }

    const removeCart=(id)=>{
        let userId
        if(isAuthenticated) userId=user.sub
        dispatch({type:'REMOVE-CART',payload:{id,url,userId}})
    }

    const addToCart=(id,quantity,price,product)=>{
        let userId
        if(isAuthenticated) userId=user.sub
        dispatch({type:"ADD-TO-CART",payload:{id,quantity,price,product,url,userId}})
        
    }

    function loadCartProducts(){
        if(isAuthenticated){
            axios.get(`${url}api/users/${user.sub}`).then(result=>{
                dispatch({type:"Load-Cart-Products",payload:{
                    cart:result.data.data.doc.cart
                }})
            })
            
        }
    }

    useEffect(()=>{
        loadCartProducts()
    },[isAuthenticated])
    return(
        <CartContext.Provider value={{...state,quantityChange,removeCart,addToCart}}>
            {children}
        </CartContext.Provider>
    )
}