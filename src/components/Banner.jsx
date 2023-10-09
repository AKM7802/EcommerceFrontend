import './banner.css'




function Banner({imageUrl}){
 
    return(
        <div id="carouselExampleInterval" class="carousel slide banner" data-bs-ride="carousel">
            <div class="carousel-inner h-full">
                <div class="carousel-item active image-container" >
                {/* <img src="https://cdn.shopify.com/s/files/1/0210/2968/3222/articles/trending_products_to_sell_in_India_ad8fc9e0-5052-44bf-bd93-7bec4335f5ee.jpg?v=1647462399" class="d-block w-100 image" alt="..."/> */}
                <img src={imageUrl} class="d-block w-100 image" alt="..."/>
                </div>
                
            </div>
            {/* <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button> */}
        </div>
    )
}

export default Banner