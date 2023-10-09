import './MobileCovers.css'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useRef,useState } from 'react'
import ProductBox from '../components/ProductBox'
import { useContext } from 'react'
import { ProductContext } from '../context/productContext'
import { DesignContext } from '../context/designContext'
import Banner from '../components/Banner'
import image from '../pics/5.jpg'
import axios from 'axios'

function MobileCovers({url}){
    const [searchParams,setSearchParams]=useSearchParams()
    const [material,setMaterial]=useState('All')
    const [sortType,setSortType]=useState('Relevance')
    const [product,setProduct]=useState([])
    const dropdown0=useRef()
    const dropdown1=useRef()
    //const Products=useContext(ProductContext)
   // const {Designs}=useContext(DesignContext)
    const [price,setPrice]=useState()
    
    useEffect(()=>{
        
        // const brand=searchParams.get("brand")
        // const model=searchParams.get("model")
      
        // Products.Products.forEach((product)=>{
        //     if(product.brand.toLowerCase()===brand.toLowerCase() && product.model.replaceAll(" ","-").toLowerCase() === model.toLowerCase()){
        //         setProduct(product)
        //         if(product.materialG){
        //             setPrice(()=>{
                       
        //                 const hardCasePrice=Products.hardCasePrice
        //                 const glassCasePrice=Products.glassCasePrice
        //                 return {hardCasePrice,glassCasePrice}
        //             })

        //         }else{
        //             setPrice(()=>{
        //                 const hardCasePrice=Products.hardCasePrice
        //                 return {hardCasePrice}
        //             })
                    
        //         }
        //         return
        //     }
        // })
        
        const Products=axios.get(`${url}api/covers`).then((result)=>setProduct(result.data.data.doc))
        const Prices=axios.get(`${url}api/prices`).then((result)=>setPrice(result.data.data.doc[0].casePrice[0]))
        
        
        
        
    },[])
    
    const handleMaterialDropdown=(curItem)=>{
       if(dropdown0.current.classList.contains('hidden')){
            dropdown0.current.classList.remove('hidden')
            document.querySelectorAll('.mde').forEach((element)=>{
                element.addEventListener('click',(clickedElement,value)=>{
                    document.querySelectorAll('.mde').forEach((element)=>{
                        element.classList.remove('active')
                    })
                    setMaterial(clickedElement.target.innerText)
                    clickedElement.target.classList.add('active')
                    dropdown0.current.classList.add('hidden')

                })
            })
       }else{
            dropdown0.current.classList.add('hidden')
       } 
    }

    const handleSortDropdown=()=>{
        if(dropdown1.current.classList.contains('hidden')){
            dropdown1.current.classList.remove('hidden')
            document.querySelectorAll('.sort-element').forEach((element)=>{
                element.addEventListener('click',(clickedElement,value)=>{
                    document.querySelectorAll('.sort-element').forEach((element)=>{
                        element.classList.remove('active')
                    })
                    setSortType(clickedElement.target.innerText)
                    clickedElement.target.classList.add('active')
                    dropdown1.current.classList.add('hidden')

                })
            })
       }else{
            dropdown1.current.classList.add('hidden')
       } 
    }
    return(
        <div>
        <Banner imageUrl={image}/>
        <div className='mobile-cover-page-container'>
            
            <div className='mcp-top-container'>
                <div className='mcp-heading-container'>
                    {/* <h1 className='mcp-heading'>{product.brand +" "+ product.model+" Cases"}</h1>
                    <h2 className='mcp-stock'>({designs.length})</h2> */}
                </div>
                <div className='filter-container'>
                    <div className='filter-sub-container'>
                        <div className='filter-visible-container'>
                            <p className='filter-title'>Case Material : </p>
                            <button className='filter-dropdown' onClick={handleMaterialDropdown}>{material} <i class="fa-solid fa-chevron-down"></i></button>
                        </div>
                        <div className='dropdown-container hidden' ref={dropdown0}>
                            <div className='dropdown-element-wrapper'>
                                <p className='dropdown-element mde active'>All</p>
                            </div>
                            <div className='dropdown-element-wrapper'>
                                <p className='dropdown-element mde'>Hard Case</p>
                            </div>
                            <div className='dropdown-element-wrapper'>
                                <p className='dropdown-element mde'>Glass Case</p>
                            </div>
                            <div className='dropdown-element-wrapper'>
                                <p className='dropdown-element mde'>Printed TPU Case</p>
                            </div>
                        </div>
                    </div>

                    <div className='filter-sub-container'>
                        <div className='filter-visible-container'>
                            <p className='filter-title'>Sort By : </p>
                            <button className='filter-dropdown' onClick={handleSortDropdown}>{sortType} <i class="fa-solid fa-chevron-down"></i></button>
                        </div>
                        <div className='dropdown-container hidden' ref={dropdown1}>
                            <div className='dropdown-element-wrapper'>
                                <p className='dropdown-element sort-element active'>Relevance</p>
                            </div>
                            <div className='dropdown-element-wrapper'>
                                <p className='dropdown-element sort-element'>Latest</p>
                            </div>
                            <div className='dropdown-element-wrapper'>
                                <p className='dropdown-element sort-element'>Price-Low to High</p>
                            </div>
                            <div className='dropdown-element-wrapper'>
                                <p className='dropdown-element sort-element'>Price-High to Low</p>
                            </div>
                        </div>
                    </div>


                </div>
                
            </div>
            <div className='cover-page-product-container'>
                {product.map((product)=>{
                    console.log("Ind Product",product)
                    return(
                        <div className='single-product-entitler'>
                            <ProductBox style='test' product={product} price={price}/>
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
    )
}

export default MobileCovers