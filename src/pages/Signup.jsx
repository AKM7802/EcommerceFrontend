import './Signup.css'

function Signup(){
    return(
        <div className='signup-page'>
            <div className='signup-component'>
                <h2 className='login-page-heading'>Create Your Account</h2>
                <form className="login-form">
                    <div className="form-content">
                        <label for='first-name'>First Name</label>
                        <input type='text' name='first-name' required placeholder="Enter your First Name" className="form-input"></input>
                    </div>
                    <div className="form-content">
                        <label for='second-name'>Second Name</label>
                        <input type='text' name='second-name' placeholder="Enter your Second Name" className="form-input"></input>
                    </div>
                    <div className='form-content'>
                        <label for="email">Email</label>
                        <input type='email' name="email" placeholder='Enter your Email' className='form-input'/>
                    </div>
                    <div className='form-content'>
                        <label for="password">Password</label>
                        <input type='password' name="password" placeholder='Enter your Password' className='form-input'/>
                    </div>
                    <button className='signup'>Sign Up</button>
                    
                </form>
            </div>
        </div>
    )
}

export default Signup