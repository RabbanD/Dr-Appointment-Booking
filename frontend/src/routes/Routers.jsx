import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Hospitals from '../pages/Hospitals/Hospitals'
import HospitalsDetails from '../pages/Hospitals/HospitalDetails'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Dashboard from '../Dashboard/hospital-account/Dashboard'
import CheckoutSuccess from '../pages/CheckoutSuccess'

import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/hospitals" element={<Hospitals/>} />
    <Route path="/hospitals/:id" element={<HospitalsDetails/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Signup/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/services" element={<Services/>} />
    <Route path="/checkout-success" element={<CheckoutSuccess/>} />

    <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={["patient"]}><MyAccount/></ProtectedRoute>}/>
    <Route path="/hospitals/profile/me" element={<ProtectedRoute allowedRoles={["hospital"]}><Dashboard/></ProtectedRoute>}/>
    
  </Routes>
}

export default Routers