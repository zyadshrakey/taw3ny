import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Login from "./Component/Login/Login";
import CompanyRegister from "./Component/CompanyRegister/CompanyRegister";
import { jwtDecode } from "jwt-decode";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import Volunteer from "./Component/Volunteer/Volunteer";
import VolunteerRequestes from "./Component/VolunteerRequestes/VolunteerRequestes";
import VolunteerOpportunities from "./Component/VolunteerOpportunities/VolunteerOpportunities";
import Profile from "./Component/Profile/Profile";
import Home from "./Component/Home/Home";

function App() {

  const [userData, setUserData]= useState(null)

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  let routers = createBrowserRouter([
    { path: "register", element: <CompanyRegister /> },
    { path: "login", element: <Login saveUserData={saveUserData}/> },
    { path: "reset-password", element: <ResetPassword /> },
    {
      path: "/",
      element: <Layout userData={userData}/>,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          ),
        },
        {
          path: "requestes",
          element: (
            <ProtectedRoute>
              <VolunteerRequestes userData={userData}/>
            </ProtectedRoute>
          ),
        },
        {
          path: "opportunities",
          element: (
            <ProtectedRoute>
              <VolunteerOpportunities />
            </ProtectedRoute>
          ),
        },
        {
          path:'volunteer',
          element:(
            <ProtectedRoute>
              <Volunteer/>
            </ProtectedRoute>
          )
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile userData={userData}/>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  function saveUserData() {
    const encodedToke = localStorage.getItem("userToken");
    const decodedToken = jwtDecode(encodedToke);
    console.log(decodedToken);
    setUserData(decodedToken)
    console.log(userData)
  }

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
