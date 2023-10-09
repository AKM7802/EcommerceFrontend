import './Quantity.css'
import { useState,useRef } from 'react'

function Quantity({qty,qtyChange}){
    const [ppqty,setPpqty]=useState(qty)
    const incRef=useRef()
    const decRef=useRef()
    const decreaseQty=(element)=>{
        if(ppqty===10) incRef.current.classList.remove('qty-inactive')
        if(ppqty>1){
            const curElement=element.currentTarget
            setPpqty((curValue)=>
            { 
                curValue=curValue-1
                if(curValue === 1){
                    curElement.classList.add('qty-inactive')
                }
                qtyChange(curValue)
                return curValue
            })
            
        }
    }
    const increaseQty=(element)=>{
        if(ppqty === 1) decRef.current.classList.remove('qty-inactive')
        if(ppqty<10){
            const curElement=element.currentTarget
            setPpqty((curValue)=>
            {
                curValue=curValue+1
                if(curValue === 10) curElement.classList.add('qty-inactive')
                qtyChange(curValue) 
                return curValue
            })
            
        }
    }
    return(
        <div className='quantity-container'>
            <button ref={decRef} className='decrease-btn qty-encloser qty-inactive' onClick={decreaseQty}><i class="fa-solid fa-minus"></i></button>
            <p className='quantity qty-encloser'>{ppqty}</p>
            <button ref={incRef} className='increase-btn qty-encloser' onClick={increaseQty}><i class="fa-solid fa-plus"></i></button>
        </div>
    )
}

export default Quantity