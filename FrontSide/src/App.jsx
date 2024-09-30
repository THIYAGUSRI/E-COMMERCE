import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './Component/Header'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import PrivateRoute from './Component/PrivateRoute'
import DashBoard from './Pages/DashBoard'
import CreateProduct from './Pages/CreateProduct'
import OnlyBuyerPrivateRoute from './Component/OnlyBuyerPrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />}/>
          </Route>
          <Route element={<OnlyBuyerPrivateRoute />}>
          <Route path='/createproduct' element={<CreateProduct />}/>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}