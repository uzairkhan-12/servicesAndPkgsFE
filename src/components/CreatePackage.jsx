import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
function CreatePackage(){
    const {id} = useParams();
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [packageName,setPackageName] = useState('')
    const [packagePrice,setPackagePrice] = useState('')
    const [nameAndPriceError , setNameAndPriceError] = useState(false)
    const [serviceError,setServiceError] = useState(false)
    const [selectedServicesState,setSelectedServices] = useState([])
    const [count, setCount] = useState(0)
    console.log("Id",id)
    // let selectedServices = []
    useEffect(() => {
        getServices()
        
    },[])
    async function getServices(){
        let response = await fetch('http://localhost:5000/our-services/get-all-services')
        let data = await response.json()
        setServices(data)
    }
    function getSelectedService(id){
        let selectedService = selectedServicesState.find(x => x.service === id)
        console.log({selectedService})
        return selectedService
    }

    function addServiceToPkg(id){
        let selectedService = getSelectedService(id)
        // console.log({selectedService})
        if (selectedService) {
            console.log('if is calling')
            const tempServie = selectedServicesState.filter(x => x.service === id)
            console.log("temp service: ",tempServie)
            setSelectedServices(tempServie);
            return            
        }
            console.log('else is calling')
        setSelectedServices(current => [...current, {service:id , quantity:1}]);
     
    }
    console.log("selectedServices ",selectedServicesState)
    function handleServicesQuantityInc(id){
        let selectedService = getSelectedService(id)
        selectedService = {...selectedService, quantity: selectedService.quantity+1}
        const temp_services = selectedServicesState.map(serv=>{
            if (serv.service===id) {
                return selectedService
            }
            return serv
        })
        setSelectedServices(temp_services)
    }
    function handleServicesQuantityDec(id){
            let selectedService = getSelectedService(id)
            if (selectedService.quantity <=1) {
                const temp_services = selectedServicesState.filter(serv=>serv.service !== id)
                setSelectedServices(temp_services)
                return                
            }
            selectedService = {...selectedService, quantity: selectedService.quantity-1}
            const temp_services = selectedServicesState.map(serv=>{
                if (serv.service===id) {
                    return selectedService
                }
                return serv
            })
            setSelectedServices(temp_services)
    }

    async function updatePackage(){
        let response = await fetch(`http://localhost:5000/packages/${id}`,{
            method:"PUT",
            headers:{"content-Type":"Application/json"},
            body:JSON.stringify({packageName , packagePrice , services:selectedServicesState})
        })
        if(response.ok){
            navigate('/packages-list')
        }
       }

    async function createPackage(){

    if(!packageName || !packagePrice){
       return setNameAndPriceError(true)
    }
    // if(selectedServices.length <= 1){
    //     return setServiceError(true)
    // }
    // let ourService = {
    //     service:selectedServices,
    //     quantity:count
    // }
    let response = await fetch('http://localhost:5000/packages/create-package',{
        method:"POST",
        headers:{"content-Type":"Application/json"},
        body:JSON.stringify({packageName , packagePrice , services:selectedServicesState})
    })
    if(response.ok){
        navigate('/packages-list')
    }
  
    }
    
    return(
    <div>
        {serviceError && <div className="alert alert-danger">Please Select at least two services</div>}
        {nameAndPriceError && <div className="alert alert-danger">Please enter the name and price of package</div>}
        <div className="mb-3 col-3">
        <label for="exampleFormControlInput1" class="form-label">Package Name</label>
        <input value={packageName} onChange={(e) => setPackageName(e.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Package name" />
        </div>
        <div class="mb-3 col-3">
        <label for="exampleFormControlTextarea1" class="form-label">Package Price</label>
        <input value={packagePrice} onChange={(e) => setPackagePrice(e.target.value)} type="number" class="form-control" id="exampleFormControlInput1" placeholder="Package price" />
        </div>
        <div className="row">
        {services && services.map(service => {
            return(
                <div className="card mt-3 col-md-3 mx-3" >
                    <div className="card-body">
                    <h5 className="card-title">{service.serviceName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Price: {service.servicePrice}</h6>
                    <p className="card-text">{service.serviceDescription}</p>
                    <div className="row">
                    <input className="col-md-3" type='checkbox' onClick={() => {addServiceToPkg(service._id)}}/>
                
                    {getSelectedService(service._id) ?
                    <div className="bg-red col-md-9 d-flex h-10"> 
                        <button onClick={()=>handleServicesQuantityInc(service._id)}> + </button>
                        <p className="mx-2">{getSelectedService(service._id).quantity}</p>
                        <button onClick={()=>handleServicesQuantityDec(service._id)}> - </button>
                    </div>
                    : null
                    }
                    </div>
  </div>
  </div>
  )})}
</div>
  <button onClick={ !id ? createPackage : updatePackage} className="btn btn-primary float-right">{!id ? 'Create Package' :'Edit Package'}</button>
</div>
    )
}

export default CreatePackage