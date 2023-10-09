import { useEffect, useState } from 'react'
import './Checkout.css'
import { useParams,useSearchParams } from 'react-router-dom'
import axios from 'axios'
const Checkout=({url})=>{
    const params=useParams()
    const [productDesc,setProductDesc]=useState()
    const [product,setProduct]=useState()
    const [price,setPrice]=useState()
    const ids=params.id.split('-')

    const states=[
      {name:'Andhra Pradesh',short:"AP"},
      {name:"Arunachal Pradesh",short:"AR"},
      {name:"Assam",short:"AS"},
      {name:"Bihar",short:"BR"},
      {name:"Chhattisgarh",short:"CH"},
      {name:"Goa",short:"GA"},
      {name:"Gujarat",short:"GJ"},
      {name:"Haryana",short:"HA"},
      {name:"Himachal Pradesh",short:"HP"},
      {name:"Jharkhand",short:"JH"},
      {name:"Karnataka",short:"KA"},
      {name:"Kerala",short:"KE"},
      {name:"Madhya Pradesh",short:"MP"},
      {name:"Maharashtra",short:"MA"},
      {name:"Manipur",short:"MN"},
      {name:"Meghalaya",short:"ME"},
      {name:"Mizoram",short:"MZ"},
      {name:"Nagaland",short:"NA"},
      {name:"Odisha",short:"OD"},
      {name:"Punjab",short:"PJ"},
      {name:"Rajasthan",short:"RJ"},
      {name:"Sikkim",short:"SI"},
      {name:"Tamil Nadu",short:"TN"},
      {name:"Telangana",short:"TA"},
      {name:"Tripura",short:"TR"},
      {name:"Uttar Pradesh",short:"UP"},
      {name:"Uttarakhand",short:"UT"},
      {name:"West Bengal",short:"WB"}
    ]


    async function fetchProducts(){
        const prices=await axios.get(`${url}api/prices`)
        if(ids[0] === 'CAT02'){
            const products= await axios.get(`${url}api/clothings/${ids[1]}`)
            setProduct(products.data.data.doc)
            setProductDesc(()=>{
                return {
                    color:products.data.data.doc.colors[ids[2]],
                    size:ids[3],
                    quantity:ids[4]
                }
            })
            console.log(prices.data.data.doc)
            console.log("Products",products.data.data.doc)


        }
        
    }
    useEffect(()=>{
        fetchProducts()
        
    },[])
    return(
        <div className='checkout-page'>
            <div className='checkout-left'>
            <div className='checkout-section-1'>
              <h2 className='checkout-title'>Delivery Address</h2>
              <div className='address-container'>
                <form className='address-form'>
                  <div className='form-content'>
                    <label for="name" className='address-label'>Name</label>
                    <input type='text' className='address-input' name='name' placeholder=' '/>
                  </div>
                  <div className='form-content'>
                    <label for="number" className='address-label'>10-digit mobile number</label>
                    <input type='number' name='number' className='address-input' placeholder=' '/>
                  </div>
                  <div className='form-content'>
                    <label for="pincode" className='address-label'>Pincode</label>
                    <input type='number' name="pincode" className='address-input' placeholder=' '/>
                  </div>
                  <div className='form-content'>
                    <label for="address" className='address-label'>Address</label>
                    <textarea name='address' className='address-input' rows="3"/>
                  </div>
                  <div className='form-content'>
                    <label for="city" className='address-label'>City</label>
                    <input type='text' name="city" className='address-input' placeholder=' '/>
                  </div>
                  <div className='form-content'>
                    <label for="state" className='address-label'>State</label>
                    <select name='state' className='address-input'>
                      <option selected value hidden disabled></option>
                      {states.map(state=>{
                        return <option data-full-value={state.name} value={state.short}>{state.name}</option>
                      })}
                      
                    </select>
                  </div>
                  <div className='form-content'>
                    <label for="email" className='address-label'>Email</label>
                    <input type="email" className='address-input' name='email' placeholder=' '/>
                  </div>
                </form>
              </div>
            </div>
            <div className='checkout-session-2'>
              <h2 className='checkout-title'>Payment Method</h2>
              <div className='payment-options-container'>
                    <div className='paymeny-option'>
                      <input type='radio' name="cod" className='payment-input'/>
                      <label className='payment-label' for="cod">Cash On Delivery</label> 
                    </div>
              </div>
            </div>
            <div className='checkout-session-3'>
              <div className='buttons-container'>
                <button className='place-order-btn'>Place Order</button>
              </div>
            </div>
            </div>
            <div className='checkout-right'>
             <h2>TeSt</h2>
            </div>
        </div>
    )
}

export default Checkout