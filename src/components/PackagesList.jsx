import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PackageList(){
    const navigate = useNavigate()
    const [packages , setPackages] = useState([])
    useEffect(() => {
        getAllPackages()
    },[])
    
    async function getAllPackages() {
        let response = await fetch('http://localhost:5000/packages/get-all-pkgs')
        let result = await response.json()
        setPackages(result)
    }

    const handleDeletePackage = async(id) => {
        let response = await fetch(`http://localhost:5000/packages/${id}`,{
            method:"Delete"
        })
        if(response.ok){
            getAllPackages()
        }  
    }
    const editPackage = async(id) => {
        navigate(`/edit-package/${id}`)
    }
    return(
        <div className="row">
        {packages && packages.map(pkg => {
            return(
                <div key={packages._id} className="card mt-3 col-md-3 mx-3" >
                    <h1>{pkg.packageName}</h1>
                     <h3 className="card-subtitle mb-2 text-muted">Price: {pkg.packagePrice}</h3>
                    <div className="card-body">
                        {pkg.services.map(service => {
                            return(
                            <div>
                    <h5 className="card-title">Service Name :{service.service.serviceName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Quantity: {service.quantity}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Price: {service.service.servicePrice}</h6>
                    <p className="card-text">{service.serviceDescription}</p>
                    </div>
                 )})} 
                 <button className="btn btn-primary" onClick={() => {editPackage(pkg._id)}}>Edit Service</button>
                 <button className="btn btn-danger mx-2" onClick={() => {handleDeletePackage(pkg._id)}}>Delete Service</button>
  </div>
  </div>
  )})}
  </div>
    )
}

export default PackageList