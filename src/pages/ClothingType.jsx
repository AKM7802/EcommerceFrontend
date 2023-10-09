import './MobileCovers.css'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useRef,useState } from 'react'
import ProductBox from '../components/ProductBox'

import './ClothingType.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


function ClothingType({url}){
    const [searchParams,setSearchParams]=useSearchParams()
    const [material,setMaterial]=useState('All')
    const [sortType,setSortType]=useState('Relevance')

    const dropdown0=useRef()
    const dropdown1=useRef()

    
    const [contents,setContents]=useState({title:'',products:[],price:[]})
    const catSelect=useRef()
    
    const type=searchParams.get('type')
    
    
    async function loadProducts(){
        try{
            const AllProducts=await axios.get(`${url}api/clothings`)
            const ClothType=await axios.get(`${url}api/clothtypes`)
            const Price=await axios.get(`${url}api/prices`)
            for(let i=0;i<ClothType.data.data.doc.length;i++) {
                if(ClothType.data.data.doc[i].id===type){
                    const products=AllProducts.data.data.doc.filter((res)=>res.clothType.id === type)
                    const title=ClothType.data.data.doc[i].name
                    const price=Price.data.data.doc[0].clothingPrice[0]

                    setContents(()=>{
                        return {
                            title,
                            products,
                            price
                        }
                    })
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        loadProducts()
        // setTitle(()=>title_name+" "+window.location.hash.slice(1))
        // catSelect.current.childNodes.forEach((node)=>{
        //     node.childNodes.forEach((ele)=>{
        //         ele.classList.remove('category-active')
        //         if(ele.dataset.cat === window.location.hash.slice(1)) ele.classList.add('category-active')
        //     })

        // })

    },[window.location.hash])    
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
        
        
        
       
        
    },[])
    
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
        <div className="ClothingType">
            <div className='mobile-cover-page-container'>
            <div className='mcp-top-container'>
                <div className='mcp-heading-container'>
                    <h1 className='mcp-heading'>{contents.title}</h1>
                    <h2 className='mcp-stock'>({contents.products.length})</h2>
                </div>
                {/* <div className='sub-design-category-container' ref={catSelect}>
                    <a href={`/clothing/clothingtype?type=${type}#anime`}>
                        <div className="sub-design-category category-active" data-cat="anime">
                            <img src='https://assets-prd.ignimgs.com/2022/08/17/top25animecharacters-blogroll-1660777571580.jpg' alt="" className='sub-design-image'></img>
                            <h2 className='sub-design-title'>ANIME</h2>
                            <div className='sub-design-overlay'></div>
                        </div>
                    </a>
                    <a href={`/clothing/clothingtype?type=${type}#movie`}>
                        <div className="sub-design-category " data-cat="movie">
                            <img src='https://assets-prd.ignimgs.com/2022/08/17/top25animecharacters-blogroll-1660777571580.jpg' alt="" className='sub-design-image'></img>
                            <h2 className='sub-design-title'>MOVIE</h2>
                            <div className='sub-design-overlay'></div>
                        </div>
                    </a>
                    <a href={`/clothing/clothingtype?type=${type}#abstract`}>
                        <div className="sub-design-category " data-cat="abstract">
                            <img src='https://assets-prd.ignimgs.com/2022/08/17/top25animecharacters-blogroll-1660777571580.jpg' alt="" className='sub-design-image'></img>
                            <h2 className='sub-design-title'>ABSTRACT</h2>
                            <div className='sub-design-overlay'></div>
                        </div>
                    </a>
                    <a href={`/clothing/clothingtype?type=${type}`}>
                        <div className="sub-design-category ">
                            <img src='https://assets-prd.ignimgs.com/2022/08/17/top25animecharacters-blogroll-1660777571580.jpg' alt="" className='sub-design-image'></img>
                            <h2 className='sub-design-title'>ANIME</h2>
                            <div className='sub-design-overlay'></div>
                        </div>
                    </a>
                    
                    
                </div> */}
                <div className='filter-container'>
                    <div className='filter-sub-container'>
                        <div className='filter-visible-container m-0'>
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
            <div className='cover-page-product-container border-remove'>
                {contents.products.map((product)=>{
                    return(
                        <div className='single-product-entitler'>
                            <ProductBox style='test' product={product} price={contents.price}/>
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
    )
}

export default ClothingType;