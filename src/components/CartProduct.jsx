import './CartProduct.css'
import {useRef} from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/cartContext'

function CartProduct({id,quantity,price,product}){
    
    
    const quantityContainer=useRef()
    
    const {quantityChange,removeCart}=useContext(CartContext)
    console.log("Product",product)

    const handleQuantitySelect=()=>{
        quantityContainer.current.classList.toggle('hidden')

        quantityContainer.current.childNodes.forEach((element)=>{
           
            element.addEventListener('click',(clickedElement)=>{
                
                if(clickedElement.target.parentElement.classList.contains('qty-active')) return
                quantityContainer.current.childNodes.forEach((element)=>{
                    element.classList.remove('qty-active')
                })
                clickedElement.target.parentElement.classList.add('qty-active')
                let newQuantity=parseInt(clickedElement.target.innerText)
            
                quantityChange(id,newQuantity)
                
                quantityContainer.current.classList.add('hidden')
            })
        })

    }
    return(
        <div className='cart-item'>
                        <div className='cart-product-pic-encloser'>
                            <img src={`/images/Clothing/${product.image}`} alt="" className='product-pic-cart'></img>
                        </div>
                        <div className='cart-product-description'>
                            <div className='cart-product-general-info'>
                                <h2 className='cart-product-name cpn'>{product.productName}</h2>
                                <p className='cart-product-seller'>Seller: {product.seller}</p>
                                {product.productCloth ? <>
                                    <p className='features'>Type :<span> {product.clothType}</span></p>
                                    <p className='features'>Color :<span> {product.color}</span></p>
                                    <p className='features'>Size :<span> {product.size}</span></p>
                                    </>
                                :<>
                                    <p className='features'>Mobile Device :<span> {product.brand + " " + product.model.model}</span></p>
                                    <p className='features'>Material :<span> {product.material}</span></p>
                                </>
                                }
                                
                                <p className="features">Free Shipping</p>
                               
                            </div>
                            <div className='cart-product-action-container'>
                                <div className='cart-product-quantity-container'>
                                    <h2 className='cart-product-quantity' onClick={handleQuantitySelect}>Qty: {quantity} <i class="fa-solid fa-angle-down"></i></h2>
                                    <div className='quantity-available-container hidden' ref={quantityContainer}>
                                        <div className='quantity-dropdown-element-wrapper qty-active'>
                                                <p className='quantity-dropdown-element'>1</p>
                                        </div>
                                        <div className='quantity-dropdown-element-wrapper '>
                                                <p className='quantity-dropdown-element'>2</p>
                                        </div>
                                        <div className='quantity-dropdown-element-wrapper '>
                                                <p className='quantity-dropdown-element'>3</p>
                                        </div>
                                        <div className='quantity-dropdown-element-wrapper '>
                                                <p className='quantity-dropdown-element'>4</p>
                                        </div>
                                        <div className='quantity-dropdown-element-wrapper'>
                                                <p className='quantity-dropdown-element'>5</p>
                                        </div>
                                        <div className='quantity-dropdown-element-wrapper '>
                                                <p className='quantity-dropdown-element'>6</p>
                                        </div>
                                        <div className='quantity-dropdown-element-wrapper '>
                                                <p className='quantity-dropdown-element'>7</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='remove-button-container'>
                                    <button className='remove' onClick={()=>removeCart(id)}>REMOVE</button>
                                </div>
                            </div>
                        </div>
                        <div className='cart-price-container'>
                            <h2 className='price'>₹{price.sellingPrice}</h2>
                            <h2 className='text-base m-1 text-gray-500 line-through'>₹{price.mrp}</h2> 
                        </div>
            </div>
    )
}

export default CartProduct