import './MobileSelection.css'
import { useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function MobileSelection({mobileDetails,url}){
    const selectElement=useRef()
    const [modelsAvailable,setModelsAvailable]=useState([])
    const [brand,setBrand]=useState('')
    const [model,setModel]=useState('')
    const navigate=useNavigate()
    const [mobiles,setMobiles]=useState()
    
    useEffect(()=>{
        const Mobiles=axios.get(`${url}api/mobiles`).then(res=>{
            setMobiles(res.data.data.doc)
        })
    },[])
    
    const handleBrand=(currValue)=>{
        
        selectElement.current.removeAttribute('disabled')
        setBrand(currValue.target.value)
        mobiles?.map(mobile=>{
            if(currValue.target.value === mobile.brand){
                setModelsAvailable(mobile.model)
            }
        })
        selectElement.current.value="model"
    }

    const handleModel=(currValue)=>{
        let material=currValue.target.options[currValue.target.selectedIndex].dataset.material
        let model=currValue.target.options[currValue.target.selectedIndex].dataset.model
        setModel({model,materialG: material === 'true' ? true : false})

    }
    const handleFormSubmit=(event)=>{
        event.preventDefault()
        navigate(`/mobile-covers?brand=${brand}&model=${model}`)
    }

    useEffect(()=>{
        mobileDetails(brand,model)
    },[model])


    return(
        <div className='mobileSelectionContainer'>
            <form className='form-container' >
                <label for="brand" className='form-label'>Select your Mobile Brand</label>
                <select name='brand' id="brand" defaultValue={"brand"} className='form-select' onChange={handleBrand}>
                    <option value='brand' disabled>Brand</option>
                    {mobiles && mobiles.map(mobile=>{
                        return <option value={mobile.brand}>{mobile.brand}</option>
                    })}
                </select>
                <label for="model" className='form-label'>Select your Device Model</label>
                <select name="model" id="model" defaultValue={"model"} disabled className='form-select' ref={selectElement} onChange={handleModel}> 
                    <option value='model'  disabled>Model</option>
                    {modelsAvailable && modelsAvailable.map((curValue,key)=>{
                        
                        return(
                        <option key={key} data-material={curValue.materialG} data-model={curValue.modelName}>{curValue.modelName}</option>)
                    })}
                </select>
            </form>
        </div>
    )
}

export default MobileSelection