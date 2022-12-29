import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
function AddService() {
    const {id} = useParams();
    let navigate = useNavigate()
    const [serviceName,setServiceName] = useState('')
    const [servicePrice,setServicePrice] = useState()
    const [serviceDescription,setServiceDescription] = useState('')
    const [data,setData] = useState([])
    const [error, setError] = useState(false)
    // console.log(data)
    useEffect(() => {
        if(id){
            getServiceById()
        }
    },[id])
    async function addService(){
        if(!serviceName || !servicePrice || !serviceDescription){
            return setError(true)
        }
        let response = await fetch('http://localhost:5000/our-services/create-service',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({serviceName , servicePrice , serviceDescription})
        })
        if(response.ok){
            navigate('/services-list')
        }
        
    }
    async function getServiceById(){
        let response = await fetch(`http://localhost:5000/our-services/get-service/${id}`)
        let result = await response.json()
        setServiceName(result.serviceName)
        setServicePrice(result.servicePrice)
        setServiceDescription(result.serviceDescription)
    }
    async function updateServiceData(){
        let response = await fetch(`http://localhost:5000/our-services/update-service/${id}`,{
            method:'PUT',
            headers: {"Content-Type":"Application/json"},
            body:JSON.stringify({serviceName,servicePrice,serviceDescription})
        })
        if(response.ok){
            navigate('/services-list')
        }
    }
    return (
        <div className="container ">
            {error && <div className="alert alert-danger">All fields are required</div>}
        <div class="mb-3 col-3">
        <label for="exampleFormControlInput1" class="form-label">Service Name</label>
        <input value={serviceName} onChange={(e) => setServiceName(e.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="service name" />
        </div>
        <div class="mb-3 col-3">
        <label for="exampleFormControlTextarea1" class="form-label">Service Price</label>
        <input value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} type="number" class="form-control" id="exampleFormControlInput1" placeholder="service price" />
        </div>
        <div class="mb-3 col-3">
        <label for="exampleFormControlTextarea1" class="form-label">Service Description</label>
        <input value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="service Description" />
        </div>
        <button onClick={ !id ? addService : updateServiceData} className="btn btn-primary float-right">{!id ? 'Add Service' :'Edit Service'}</button>
</div>
    )
}

export default AddService