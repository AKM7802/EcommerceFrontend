import './footer.css'

function Footer(){
    return(
        <div className='footer'>
            <div className='social-media-container'>
                <a href='www.instagram.com' className='icon'><i class="fa-brands fa-instagram"></i></a>
                <a href='www.facebook.com' className='icon'><i class="fa-brands fa-facebook"></i></a>
                <a href='www.twitter.com' className='icon'><i class="fa-brands fa-twitter"></i></a>
            </div>
            <p className='copyright'><i class="fa-regular fa-copyright"></i> 2023, ZEPOCKET</p>
        </div>
    )
}

export default Footer