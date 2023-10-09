import './Home.css'

import Banner from '../components/Banner'
import ProductBox from '../components/ProductBox'
import {useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import image from '../pics/img3.jpg'
import axios from 'axios'

function Home({url}){
    const [Products,setProducts]=useState({
        cases:[],
        casePrice:[],
        clothings:[],
        clothingsPrice:[]
    })
  
    

    const showMobileCovers=()=>{
        const Contents=[]
        for(let i=0;i<Products.cases.length && i<5;i++){
            const randomDesign=Math.floor(Math.random()*2)
            Contents.push(<ProductBox style='test' product={Products.cases[randomDesign]} price={Products.casePrice[0]}/>) 
        }
       
        return Contents
    }

    const showClothings=()=>{
        const Contents=[]
        for(let i=0;i<Products.clothings.length && i<5;i++){
            const randomDesign=Math.floor(Math.random()*7)
            console.log(Products)
            Contents.push(<ProductBox style='test' product={Products.clothings[randomDesign]} price={Products.clothingsPrice[0]}/>) 
        }
        
        return Contents
    }

    const fetchCovers=async ()=>{
        const coversdata=await axios.get(`${url}api/covers`)
        const clothingsdata=await axios.get(`${url}api/clothings`)
        const pricedata=await axios.get(`${url}api/prices`)

        setProducts(()=>{
            const loadedProducts={
                cases:coversdata.data.data.doc,
                clothings:clothingsdata.data.data.doc,
                casePrice:pricedata.data.data.doc[0].casePrice,
                clothingsPrice:pricedata.data.data.doc[0].clothingPrice

            }
            
            return loadedProducts
        })
        
        
    }

    useEffect(()=>{
        fetchCovers()
    },[])
    return(
        <div>
            <Banner imageUrl={image}/>
            <div className='home-page-content p-8'>
                <div className="content">
                    <h1 className='content-headings'>Top Selling Mobile Covers</h1>
                    <div className='product-container-box'>
                            {showMobileCovers()}
                    </div>
                </div>
                <div className='home-page-categories'>
                    <h1 className='content-headings'>Categories</h1>
                    <div className='category-container'>
                        <Link to='/mobile-covers' className='category-content category-bg-cover'> <div>
                            <h2 className='category-name'>MOBILE COVERS</h2>
                            <div className='cat-overlay'></div>
                        </div></Link>
                        <Link to='/clothings' className='category-content category-bg-clothing'> <div >
                            <h2 className='category-name'>CLOTHING</h2>
                            <div className='cat-overlay'></div>
                        </div></Link>
                    </div>
                </div>
                <div className="content">
                    <h1 className='content-headings'>Top Selling Clothings</h1>
                    <div className='product-container-box'>
                            {showClothings()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home