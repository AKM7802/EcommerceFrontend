import { Link } from 'react-router-dom'
import './ProductBox.css'
import { useEffect, useState } from 'react'


function ProductBox({style,price,product}){
    const [productPrice,setProductPrice]=useState({
        sellingPrice:'',
        mrp:''
    })
    let randomIndex,randomColor,colorIndex
    useEffect(()=>{
        if(!price) return 
        if(product.category.id === 'CAT02'){
            
            if(product.clothType.id === 'CT01'){
                setProductPrice(()=>{
                    return {
                        sellingPrice:price?.tshirtPrice.sellingPrice,
                        mrp:price?.tshirtPrice.mrp
                    }
                })
            }else if(product.clothType.id==='CT02'){
                setProductPrice(()=>{
                    return {
                        sellingPrice:price?.oversizedPrice.sellingPrice,
                        mrp:price?.oversizedPrice.mrp
                    }
                })
            }else if(product.clothType.id==='CT03'){
                setProductPrice(()=>{
                    return {
                        sellingPrice:price?.hoodiePrice.sellingPrice,
                        mrp:price.hoodiePrice.mrp
                    }
                })
            }
        }else if(product.category.id === "CAT01"){
            
            setProductPrice(()=>{
                return {
                    sellingPrice:price?.hardCasePrice.sellingPrice,
                    mrp:price?.hardCasePrice.mrp
                }
            })
        }
    },[product])
    if(product.category.id === "CAT02"){
            randomIndex=Math.floor(Math.random()*7)
            randomColor=product.colors[randomIndex] || product.colors[0]
            colorIndex=product.colors.findIndex(ele=>ele===randomColor)
    }
     
    return(
    <a href={product.colors ? `/product-page/${product.id}?color=${randomColor}` :`/product-page/${product.id}`} className={`a-tag `}>
    <div className={`product-container`}>
        <div className='product-box-image-container'>
            <img src={`/images/${product.category.name}/${product.image[colorIndex]}`} alt="" className='product-image' />
            {/* <img src={`/images/${product.category.name}/te3.jpg`} alt="" className='product-image' /> */}
        </div>

        <div className='product-details-container p-3'>
            <h2 className='product-title text-base my-1 '>{product.colors ? product.colors[colorIndex][0].toUpperCase()+ product.colors[colorIndex].slice(1) +" "+ product.name : product.name}</h2>
            <div className='material-container'>
                {/* <div className='hard-material-box'>
                    <h2 className='hard-material-text'>Hard Case</h2>
                </div> */}
                
            </div>
            <div className='price-container flex'>
                    <h3 className='selling-price mr-3 mb-1 font-bold'>₹{productPrice.sellingPrice}</h3> 
                    <h3 className='retail-price font-bold line-through text-gray-600'>₹{productPrice.mrp}</h3>
                    <div className='product-box-discount'>
                        <p>{100-Math.ceil((productPrice.sellingPrice/productPrice.mrp)*100)}% OFF</p>
                    </div>
                    
            </div>
            {
                product.category.id === "CAT02" &&<><h2>Colors Available</h2>
                 <div className='color-sub-container'>
                
                {product?.colors.map((color)=>{
                    return <div  className='color-border0' ><div  className='color-fill0' title={color}  style={{backgroundColor:color}} ></div></div>
                })}
                </div>
            </>
            }
            
            <h4 className='delivery text-xs'>Free Cash On Delivery</h4>
        </div>
    </div>
    </a>
   
    )
}

export default ProductBox