import Banner from "../components/Banner"
import image from '../pics/ClothBanner.png'
import { Link } from "react-router-dom"
import { DesignContext } from "../context/designContext"
import { useContext, useEffect, useState } from "react"
import ProductBox from "../components/ProductBox"
import { ProductContext } from "../context/productContext"
import axios from "axios"
import './Clothings.css'
const Clothings=({url})=>{
    const [products,setProducts]=useState([])
    const [clothTypes,setClothTypes]=useState([])
    const [price,setPrice]=useState()
    //  const Designs=useContext(DesignContext)
    //  const Products=useContext(ProductContext)
    const showClothings=()=>{
        const Contents=[]
        for(let i=0;i<products.length && i<10;i++){ 
            const randomDesign=Math.floor(Math.random()*4)
            Contents.push(<ProductBox  product={products[i]} price={price}/>) 
        }
        return Contents
    }
    useEffect(()=>{
        const Clothings=axios.get(`${url}api/clothings`).then((result)=>setProducts(result.data.data.doc))
        const ClothTypes=axios.get(`${url}api/clothtypes`).then((result)=>setClothTypes(result.data.data.doc))
        const Price=axios.get(`${url}api/prices`).then((result)=>setPrice(result.data.data.doc[0].clothingPrice[0]))
    },[])
    return(
        <div>
            <Banner imageUrl={image}/> 
            <div className="Clothings p-8">
                <div className='home-page-categories'>
                    <h1 className='content-headings'>Categories</h1>
                    <div className='category-container'>
                        {clothTypes.map((type)=>{
                           return <Link to={`/clothing/clothingtype?type=${type.id}`} className='category-content category-bg-cover'> 
                                <div>
                                    <h2 className='category-name'>{type.name}</h2>
                                    <div className='cat-overlay'></div>
                                </div>
                            </Link>
                        })}
                        
                        {/* <Link to='/clothing/clothingtype?type=oversized' className='category-content category-bg-clothing'> <div >
                            <h2 className='category-name'>Oversized Tees</h2>
                            <div className='cat-overlay'></div>
                        </div></Link>
                        <Link to='/clothing/clothingtype?type=hoodies' className='category-content category-bg-clothing'> <div >
                            <h2 className='category-name'>Hoodies</h2>
                            <div className='cat-overlay'></div>
                        </div></Link> */}
                    </div>
                </div>
                <div className="content">
                    <h1 className='content-headings'>Featured Products</h1>
                    <div className='product-container-box'>
                            {showClothings()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clothings