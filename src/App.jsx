import React, { useEffect } from "react";
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

function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  let routers = createBrowserRouter([
    { path: "register", element: <CompanyRegister /> },
    { path: "login", element: <Login /> },
    { path: "reset-password", element: <ResetPassword /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Volunteer />
            </ProtectedRoute>
          ),
        },
        {
          path: "requestes",
          element: (
            <ProtectedRoute>
              <VolunteerRequestes />
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
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
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
  }

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
