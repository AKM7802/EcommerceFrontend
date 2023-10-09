import { Link } from 'react-router-dom'
import './Login.css'

function Login(){
    return(
        <div className='login-page'>
            <div >
                <h2 className='login-page-heading'>Log in to Zepocket</h2>
                <form className="login-form">
                    <div className='form-content'>
                        <label for="email">Email</label>
                        <input type='email' name="email" placeholder='john@example.com' className='form-input'/>
                    </div>
                    <div className='form-content'>
                        <label for="password">Password</label>
                        <input type='password' name="password" placeholder='Password' className='form-input'/>
                    </div>
                    
                    <button className='login-btn'>Log in</button>
                    <span className='forgot-password'><a href='/' >Forgot Password?</a></span>
                    <span className='create-acc'><Link to='/signup'>Don't have an account? Create here</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login