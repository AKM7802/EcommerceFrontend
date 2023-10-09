import { createContext, useEffect, useReducer } from "react";
import  reducer from "../reducer/designReducer";
import axios from "axios";

export const DesignContext=createContext()

// const Designs=[
//     {
//         name:"Luffy Design",
//         id:"D01"
//     },
//     {
//         name:"Zoro Swordsman Design",
//         id:"D02"
//     },
//     {
//         name:"Sanji Design",
//         id:"D03"
//     },
//     {
//         name:"Nami Design",
//         id:"D04"
//     }
// ]

const initialState={Designs:[]}

export const DesignProvider=({children,url})=>{
    const [state,dispatch]=useReducer(reducer,initialState)

    async function loadDesigns(){
        const design_data=await axios.get(`${url}api/designs`)
        
        dispatch({type:"Fetch-Designs",payload:{Designs:design_data.data.data.doc}})

    }

    useEffect(()=>{
        loadDesigns()
    },[])
    return(
        <DesignContext.Provider value={state}>
            {children}
        </DesignContext.Provider>
    )
}