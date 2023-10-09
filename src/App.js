import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import { Route,Routes } from 'react-router-dom';
import MobileCovers from './pages/MobileCovers';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import axios from 'axios';
import Clothings from './pages/Clothings';
import ClothingType from './pages/ClothingType';
import Checkout from './pages/Checkout';

function App({url}) {
  const {user,isAuthenticated}=useAuth0()
 
  const fetchUsers=async()=>{
    if(isAuthenticated){
      const users=await axios.get(`${url}api/users`)
      if(users.data.data.doc.some(el=>el.id === user.sub)) return
      const data = await axios.post(`${url}api/users`,{
        name:user.nickname,
        id:user.sub,
        email:user.email,
        cart:[],
        orders:[]
      })
    }
  }
  useEffect(()=>{
      fetchUsers()
  },[])

  return (
    <div className="App">
    
      <Navbar/> 
      <Routes>
        
        <Route path="/" element={<Home url={url}/>}></Route>
        <Route path="/product-page/:id" element={<ProductPage url={url}/>}></Route>
        
        <Route path="/clothings" element={<Clothings url={url}/>}></Route>
        <Route path='/clothing/clothingtype' element={<ClothingType url={url}/>}></Route>
        
        <Route path="/mobile-covers" element={<MobileCovers url={url}/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path="/checkout/:id" element={<Checkout url={url}/>} ></Route>  
      </Routes>
      
      <Footer/>
      
    </div>
  );
}

export default App;
