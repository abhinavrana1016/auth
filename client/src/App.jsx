import React, { lazy } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Header from './Component/Header'
const Home = lazy(()=>import("./pages/Home"))
const About = lazy(()=>import("./pages/About"))
const SignIn = lazy(()=>import("./pages/SignIn"))
const SignUp = lazy(()=>import("./pages/SignUp"))
const Profile = lazy(()=>import("./pages/Profile"))
const App = () => {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/about' element={<About/>}/>
   <Route path='/sign-in' element={<SignIn/>}/>
   <Route path='/sign-up' element={<SignUp/>}/>
   <Route path='/profile' element={<Profile/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App