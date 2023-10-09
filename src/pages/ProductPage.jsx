import './ProductPage.css'
import ProductBox from '../components/ProductBox'
import { useContext, useEffect, useRef } from 'react'
import { CartContext } from '../context/cartContext'
import {useState} from 'react'
import Success from '../components/Success'
import { ProductContext } from '../context/productContext'
import { DesignContext } from '../context/designContext'
import { useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import Quantity from '../components/Quantity'
import axios from 'axios'
import MobileSelection from './MobileSelection'
import { useNavigate } from 'react-router-dom'



function ProductPage({url}){
    const Products=useContext(ProductContext)
    const Designs=useContext(DesignContext)
    const Cart=useContext(CartContext)
    const [added,setAdded]=useState(false)
    const {id}=useParams()
    const [product,setProduct]=useState()
    const [design,setDesign]=useState()
    const [price,setPrice]=useState({sellingPrice:'',mrp:''})
    const [searchParams,setSearchParams]=useSearchParams()
    const parentMaterial=useRef()
    const colorBtn=useRef()
    const [quantity,setQuantity]=useState(1)
    const [material,setMaterial]=useState('Hard Case')
    const [cartCopy,setCartCopy]=useState(false)
    let loadSimilarProducts
    const [priceContainer,setPriceContainer]=useState()
    const [showWarning,setShowWarning]=useState(false)
    const [size,setSize]=useState()
    const [mobile,setMobile]=useState({
        brand:"",
        model:""
    })
    const [colorIndex,setColorIndex]=useState(0)
    const hardContainer=useRef()
    const navigate=useNavigate()

    const calculateClothPrice=async(product)=>{
        const Price=await axios.get(`${url}api/prices`)
        const price=Price.data.data.doc[0].clothingPrice[0]
        if(product.clothType.id === 'CT01'){
            setPrice(()=>{
                return {
                    sellingPrice:price?.tshirtPrice.sellingPrice,
                    mrp:price.tshirtPrice.mrp
                }
            })
        }else if(product.clothType.id==='CT02'){
            setPrice(()=>{
                return {
                    sellingPrice:price?.oversizedPrice.sellingPrice,
                    mrp:price.oversizedPrice.mrp
                }
            })
        }else if(product.clothType.id==='CT03'){
            setPrice(()=>{
                return {
                    sellingPrice:price?.hoodiePrice.sellingPrice,
                    mrp:price.hoodiePrice.mrp
                }
            })
        }
    }
    
    
    useEffect(()=>{
        
        
        if(id.charAt(0) === 'C'){
            const Product=axios.get(`${url}api/clothings/${id}`).then(res=>{
                setProduct(()=>{
                    console.log("Clothings",res.data.data.doc)
                    return {productCloth:true,...res.data.data.doc}})
                setColorIndex(res.data.data.doc.colors.findIndex(ele=>ele===searchParams.get('color')))
                calculateClothPrice(res.data.data.doc)
            })
            

        }else{
            const Product=axios.get(`${url}api/covers/${id}`).then(res=>{
                console.log("Covers",res.data.data.doc)
                setProduct(res.data.data.doc)
                const Price=axios.get(`${url}api/prices`).then(res=>{
                    setPriceContainer(res.data.data.doc[0].casePrice[0])
                    setPrice(res.data.data.doc[0].casePrice[0].hardCasePrice)
                })
            })
           
        }
        // const brandId=searchParams.get("brand")
        // const modelId=decodeURI(searchParams.get("model"))
        // Products.Products.forEach((product)=>{
        //     if(product.id === brandId){
                

        //         product.model.forEach((element)=>{
                    
        //             if(element.modelId === modelId){
        //                 console.log("Success",element)
        //                 const productDetails={
        //                     brand:{
        //                         brandName:product.brand,
        //                         brandId:product.id,
        //                         seller:product.seller
        //                     },
        //                     model:{
        //                         modelName:element.modelName,
        //                         materialG:element.materialG,
        //                         image:element.image,
        //                         modelId:element.modelId
        //                     }
        //                 }
        //                 setProduct(productDetails)
        //                 setPrice(Products.Prices.hardCasePrice)
        //                 return 
        //             }
        //         })
        //     }
            
        //     // if(product.brand.toLowerCase()===brand.toLowerCase() && product.model.toLowerCase() === model.toLowerCase()){
        //     //     console.log("product",product)
        //     //     setProduct(product)
        //     //     return
        //     // }
        // })
        
        // setDesign(()=>Designs.Designs.find((design)=>design.id === id))
       
        
        
    },[])



    const handleAddCart=()=>{

        let cartId
        
        let cartProduct

        if(product.productCloth){
            if(!size){
                setShowWarning(true)
                return
            }
            const imageIndex=product.colors.findIndex(ele=>ele===searchParams.get('color'))
             cartProduct={
                category:product.category.id,
                clothType:product.clothType.name,
                color:searchParams.get('color'),
                productId:product.id,
                image:product.image[imageIndex],
                productName:product.name,
                seller:product.seller,
                size:size,
                productCloth:true
            }
            cartId=product.category.id+product.id+size+cartProduct.color
        }else{
            if(!mobile.model){
                setShowWarning(true)
                return 
            }
             cartProduct={
                category:product.category.id,
                productId:product.id,
                image:product.image,
                productName:product.name,
                seller:product.seller,
                brand:mobile.brand,
                model:mobile.model,
                material:material,
                productCloth:false
            }
            cartId=product.category.id+product.id+cartProduct.model+cartProduct.material
        } 
        for(let element in Cart.cart){
            if(Cart.cart[element].id === cartId){
                setCartCopy(true)
                setAdded(true)
                setTimeout(()=>{
                    setAdded(false)
                },2000)
                return 
            }
        }
        Cart.addToCart(cartId,quantity,price,cartProduct)
        setAdded(true)
        setTimeout(()=>{
            setAdded(false)
        },2000)
    }

    const handleMateral=(event)=>{
        event.stopPropagation()
        if (event.currentTarget.classList.contains('active-material')) return
        const test=parentMaterial.current.childNodes
        test.forEach((ele)=>{
            ele.classList.remove('active-material')
        })
        event.currentTarget.classList.add('active-material')
        
        if (event.currentTarget.dataset.materialType === 'glass'){
            setPrice(priceContainer.glassCasePrice)
            setMaterial('Glass Case')
        } 
        else{
            setPrice(priceContainer.hardCasePrice)
            setMaterial("Hard Case")
        } 
    }

    loadSimilarProducts=()=>{
        // const Content=[]
        // if(!product) return
        // for(let i=0;i<4;i++){
        //     Content.push(<ProductBox style='similar-width' name={Designs.Designs[i].name} designId={Designs.Designs[i].id} brand={product.brand} model={product.model} price={Products.Prices}/>) 
        // }
        
        // return Content

    }
    const qtyChange=(qty)=>{
        setQuantity(qty)
    }
    const handleColorSelect=(e)=>{
        setSearchParams({color:e.target.title})
        
        setColorIndex(product.colors.findIndex(ele=>ele===e.target.title))
    }
    const handleSizeSelect=(e)=>{
        if (showWarning) setShowWarning(false)
        document.querySelectorAll('.size-div').forEach(ele=>{
            ele.classList.remove('size-active')
        })
        e.target.classList.add('size-active')
        setSize(e.target.innerText)
    }
    
    const mobileDetails=(brand,model)=>{
        setMobile({brand,model})
        if (showWarning) setShowWarning(false)
        
    }

    useEffect(()=>{
        if(!mobile.model.materialG){
            setMaterial("Hard Case")
            setPrice(priceContainer?.hardCasePrice)
            hardContainer.current?.classList.add('active-material')
        }
    },[mobile,hardContainer])

    const handleBuy=()=>{
        if(product.category.id==="CAT02") navigate(`/checkout/${product.category.id}-${product.id}-${colorIndex}-${size}-${quantity}?cart=false`)
        else navigate(`/checkout/${product.category.id}-${product.id}?cart=false`)
   }
    return(
        <div className='product-page'>
            
            <div className='product-container0'>
                <div className='image-container0'>
                    <img className='product-image0' src={`/images/Clothing/${product?.image[colorIndex]}`} alt=""/>
                    
                </div>
                <div className='product-details0'>
                    <h1 className='product-name0'>{product ? (searchParams.get("color") && searchParams.get("color")[0].toUpperCase()+ searchParams.get("color").slice(1) +" "+ product.name) || product.name : "Loading"}</h1>
                    <div className='price-container0'>
                        <div className='encloser'>
                            <span className='mrp0'>₹{price ? price.mrp  : ""}</span>
                        </div>
                        <div className='encloser'>
                            <span className='selling-price0'>₹{price ? price.sellingPrice : ""}</span>
                        </div>
                        
                        <div className='discount-container'><p className='discount'>{price && 100-Math.ceil((price.sellingPrice/price.mrp)*100)}% OFF</p></div>
                    </div>

                    {!product?.productCloth && <div className='cover-features-container'>
                            <MobileSelection mobileDetails={mobileDetails} url={url}/>
                            {showWarning && <h3 className='warning'>Please select your mobile device!</h3>}
                        </div>
                    }
                    {mobile?.model && <div className='material-container-product-page' ref={parentMaterial}>
                        
                        <div className='material-box-product-page active-material' ref={hardContainer} data-material-type="hard" onClick={handleMateral}>
                            <h2 className='material-product-page '>
                                Hard Case 
                            </h2>
                        </div>
                        {mobile?.model?.materialG && 
                            <div className='material-box-product-page' data-material-type="glass" onClick={handleMateral}> 
                                <h2 className='material-product-page'>
                                    Glass Case
                                </h2>
                            </div>
                        }
                    </div>}
                    {product?.productCloth && <div className='cloth-features-container'>
                        <div className='color-container'>
                            <h2 className='color-heading font-bold text-gray-600'>Available Colors</h2>
                            <div className='color-sub-container'>
                                {product?.colors.map((color)=>{
                                    return <div  className={`color-border ${searchParams.get("color") === color ? 'color-active' : ""}`} ref={colorBtn}><div onClick={handleColorSelect} className='color-fill ' title={color}  style={{backgroundColor:color}} ></div></div>
                                })}
                            </div>
                        </div>
                        <div className='size-container'>
                            <h2 className='color-heading font-bold text-gray-600'>Sizes</h2>
                            <div className='size-sub-container'>
                                {product?.clothType.size.map((size)=>{
                                    return <div className='size-div' onClick={handleSizeSelect}>{size}</div>
                                })
                                }
                            </div>
                            {showWarning && <h3 className='warning'>Please select your size!</h3>}
                        </div>


                    </div>}
                    <ul className='features-list'>
                        <li className='feature'><p className='feature-desc'>Free Cash On Delivery</p></li>
                        <li className='feature'><p className='feature-desc'>Free Shipping</p></li>
                        <li className='feature'><p className='feature-desc'>The product will get shipped within <span>48 Hours</span>.</p></li>
                    </ul>
                    <Quantity qty={quantity} qtyChange={qtyChange}/>
                    <div className='main-btn-container'>
                        <button className='add-cart-btn' onClick={handleAddCart}><span><i class="fa-solid fa-cart-shopping"></i></span> ADD TO CART</button>
                        <button className='buy-btn' onClick={handleBuy}><i class="fa-solid fa-bag-shopping"></i> BUY NOW</button>
                    </div>
                </div>
            </div>
            {/* <div className='product-description'>
                <p className='product-description'> 
                    <span className='desc'>Material: 100% Cotton</span>
                    <span className='desc'>Fabric: 180GSM Biowash</span>
                    <span className='desc'>100% Ring Spun Super Combed Cotton</span>
                    <span className='desc'>Tolerance: + / - 0.5 inch</span>
                    <span className='desc'>Single Jersey Knit</span>
                    <span className='desc'>Only Heather Colors are 90% Cotton 10% Polyester</span>
                    <span className='desc'>Bio Washed / Color Fastness Guaranteed</span>
                    <span className='desc'>Digital Printing</span>
                </p>
            </div> */}
            <div className='similar-product-container'>
                    <div className='heading-container'><h1 className='heading'>Similar Products</h1></div>
                    <div className='similar-products'>
                        <div className='s-product-container'>
                             {loadSimilarProducts()}
                        </div>
                          
                    </div>
            </div>
            <div className='review-container'>

            </div>
            {added && <Success message={cartCopy ?  "Product is already present in your cart" : "Product is Added to your Cart!" }/>}
        </div>
    )
}

export default ProductPage