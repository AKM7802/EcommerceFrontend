import './Success.css'

function Success({message}){
    return(
        <div className="success-box-container">
            <h2 className="success-message">{message}</h2>
        </div>
    )
}

export default Success