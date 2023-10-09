import './navbar.css'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

function Navbar(){
    const { loginWithRedirect,logout,isAuthenticated,user  } = useAuth0();
    return(
        <div className='nav-parent'>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand brand-name" href="/">ZEPOCKET</a>

                    
                    <button class="navbar-toggler toggle-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa-solid fa-bars"></i>
                    </button>   
                    
                    <div class="collapse navbar-collapse nav-items-container" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-list">
                            <li class="nav-item">
                                <Link className="nav-link" aria-current="page" to="/mobile-covers">Mobile Covers</Link>
                            </li>
                            <p className='text-yellow-700 font-bold'>|</p>
                            <li class="nav-item">
                                <Link className="nav-link" aria-current="page" to="/clothings">Clothing</Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className='button-container'>
                        <div className='cart-button'>
                            <Link to='/cart'>
                                <i title='Cart' class="fa-solid fa-cart-shopping"></i>
                            </Link>
                        </div>
                        <div className='login-btn-container'>
                            {/* <Link to='/login'>
                                <button className='login-button'>
                                    <i class="fa-regular fa-user"></i> Login
                                </button>
                            </Link> */}
                            {isAuthenticated && <p>{user.nickname}</p>}
                            {isAuthenticated ?
                            (<button  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                    Logout
                            </button>):
                            (<button className='login-button' onClick={() => loginWithRedirect()}>
                                    <i class="fa-regular fa-user"></i> Login
                            </button> )
                            
                            }
                        </div>
                        
                    </div>
                    
                    
                </div>
                </nav>
        </div>
    )
}

export default Navbar