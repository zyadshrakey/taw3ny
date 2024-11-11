import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Login from './Component/Login/Login'
import CompanyRegister from './Component/CompanyRegister/CompanyRegister'
import UserRegister from './Component/UserRegister/UserRegister'
import Home from './Component/Home/Home'
import { jwtDecode } from 'jwt-decode'


function App() {


  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      saveUserData()
    }
  },[])
  
  let routers= createBrowserRouter([  
    {index:true, element:<UserRegister/>},
    {path: 'companyregister', element: <CompanyRegister/>},
    {path:'login', element:<Login/>},
    {path:'/', element:<Layout/>, children:[
      {path:'home', element:<Home/>}
    ]}
  ])


  function saveUserData(){
    const encodedToke= localStorage.getItem('userToken')
    const decodedToken= jwtDecode(encodedToke)
    console.log(decodedToken)
    // setUserData(decodedToken)

  }

  return <>
    <RouterProvider router={routers}/>
  </>
}

export default App
