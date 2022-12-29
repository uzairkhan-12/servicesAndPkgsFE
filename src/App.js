import './App.css';
import ServicesList from './components/ServicesList';
// import AddService from './components/AddService';
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddService from './components/AddService';
import PackageList from './components/PackagesList';
import CreatePackage from './components/CreatePackage';
function App() {
  return (
    <>
    <Navbar />
    
    {/* <BrowserRouter> */}
      <Routes>
          <Route path="/services-list" element={<ServicesList />}/>
          <Route path='editService/:id' element={<AddService />}/>
          <Route path="edit-package/:id" element={<CreatePackage />}></Route>
          <Route path="/add-services" element={<AddService />} />
          <Route path="/packages-list" element={<PackageList />} />
          <Route path="/create-pkg" element={<CreatePackage />} />
        <Route exact path="/" element={<AddService />}>
        </Route>
      </Routes>
    {/* </BrowserRouter> */}
    
    </>
  );
}

export default App;
