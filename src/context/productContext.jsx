import { createContext, useEffect } from "react";
import { useReducer } from "react";
import ProductReducer from "../reducer/productReducer";
import axios from 'axios'
export const ProductContext = createContext()

// const hardCasePrice=[299,249]
// const glassCasePrice=[599,499]

// const Products=[
//     {
//         brand:"Samsung",
//         model:"Galaxy J7 Prime",
//         id:0,
//         seller:"Zepocket",
//         materialG:true,
//         quantity:20
//     },
//     {
//         brand:"Xiaomi",
//         model:"Redmi Note 10",
//         id:1,
//         seller:"Zepocket",
//         materialG:true,
//         quantity:20,
//     },
//     {
//         brand:"Vivo",
//         model:"Y100",
//         id:2,
//         seller:"Zepocket",
//         materialG:true,
//         quantity:20
//     },
//     {
//         brand:"Apple",
//         model:"iPhone 13",
//         id:3,
//         seller:"Zepocket",
//         materialG:true,
//         quantity:20,
//     },
//     {
//         brand:"Apple",
//         model:"iPhone 14",
//         id:4,
//         seller:"Zepocket",
//         materialG:false,
//         quantity:20
//     }
    
// ]

let initialState={
    Products:[],
    Prices:[]
}

export const ProductProvider=({children,url})=>{
    const [state,dispatch]=useReducer(ProductReducer,initialState)

    async function loadProducts(){
        const products=await axios.get(`${url}api/products`)
        const price=await axios.get(`${url}api/prices/General-Pricing`)
        dispatch({type:"Fetch-Products",payload:{
            Products:products.data.data.doc,
            Prices:price.data.data.doc
        }})
       
    }
    useEffect(()=>{
        loadProducts()
    },[])
    
    return(
        <ProductContext.Provider value={{...state}}>
            {children}
        </ProductContext.Provider>
    )
}