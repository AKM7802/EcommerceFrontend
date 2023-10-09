
import './Cart.css'
import CartProduct from '../components/CartProduct'
import { useContext } from 'react'
import { CartContext } from '../context/cartContext'

function Cart(){
    const {cart,total_item,total_price,total_selling_price,discount}=useContext(CartContext)
    
    return(
        <div className="cart-page">
            <div className='cart-container'>
                <div className='cart-heading-container'>
                    <h2 className='cart-heading'>Shopping Cart</h2>
                    <p className='cart-price-title'>Price</p>
                </div>
                <div className='cart-items-container'>
                    {cart.map((cartItem)=>{
                        console.log("CART ITEM",cartItem)
                        return <CartProduct product={cartItem.product} id={cartItem.id} quantity={cartItem.quantity} price={cartItem.price}/>
                    })}
                    
                </div>
                
            </div>
            <div className='price-details-outer-container'>
                <div className="price-sticky-container">

                
                    <div className='price-details-heading-container'>
                        <h2 className='price-details-heading'>PRICE DETAILS</h2>
                    </div>
                    <div className='price-distribution-container'>
                        <div className='price-details-container'>
                            <div className='price-detail-name'>
                                <h1 className='price-label'>Price ({total_item} items)</h1>
                            </div>
                            <div className='price-value'>
                                <h1 className='price-amount'>₹{total_price}</h1>
                            </div>
                        </div>
                        <div className='price-details-container'>
                            <div className='price-detail-name'>
                                <h1 className='price-label'>Discount</h1>
                            </div>
                            <div className='price-value'>
                                <h1 className='price-amount text-green-600'>-₹{discount}</h1>
                            </div>
                        </div>
                        <div className='price-details-container'>
                            <div className='price-detail-name'>
                                <h1 className='price-label'>Delivery Charges</h1>
                            </div>
                            <div className='price-value'>
                                <h1 className='price-amount text-green-600'>Free</h1>
                            </div>
                        </div>
                        <div className='price-details-container font-bold border-t pt-2'>
                            <div className='price-detail-name'>
                                <h1 className='price-label'>Total Amount</h1>
                            </div>
                            <div className='price-value'>
                                <h1 className='price-amount'>₹{total_selling_price}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='cart-place-order-container'>
                        <button className='cart-place-order'>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart