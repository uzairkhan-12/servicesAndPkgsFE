import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
function ServicesList(){
    let navigate = useNavigate()
    const [services, setServices] = useState([])
    useEffect(() => {
        getServices()
        
    },[])
    
    async function getServices(){
        let response = await fetch('http://localhost:5000/our-services/get-all-services')
        let data = await response.json()
        setServices(data)
    }
    async function handleDeleteService(id){
        let response = await fetch(`http://localhost:5000/our-services/delete-service/${id}`,{
            method:"Delete"
        })
        if(response.ok){
            getServices()
        }
    }
    function editService(id){
        navigate(`/editService/${id}`)
    }
    return(
        <div className="row">
        {services && services.map(service => {
            return(
                <div key={services._id} className="card mt-3 col-md-3 mx-3" >
                    <div className="card-body">
                    <h5 className="card-title">{service.serviceName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Price: {service.servicePrice}</h6>
                    <p className="card-text">{service.serviceDescription}</p>
                    <button className="btn btn-primary" onClick={() => {editService(service._id)}}>Edit Service</button>
                    <button className="btn btn-danger mx-2" onClick={() => {handleDeleteService(service._id)}}>Delete Service</button>
  </div>
  </div>
  )})}
</div>
    )
}

export default ServicesList