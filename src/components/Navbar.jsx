import React from "react"
import { Navigate, NavLink } from 'react-router-dom'
function Navbar(){
    return(
        <div>
           <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
      <NavLink to='/'  className="nav-item nav-link">Home</NavLink>
      <NavLink to='/services-list' className="nav-item nav-link">Services List</NavLink>
      <NavLink to='/add-services' className="nav-item nav-link">Add Service</NavLink>
      <NavLink to='/packages-list' className="nav-item nav-link">Packages List</NavLink>
      <NavLink to='/create-pkg' className="nav-item nav-link">Create Package</NavLink>
      </div>
    </div>
  </div>
</nav>
        </div>
    )
}





export default Navbar