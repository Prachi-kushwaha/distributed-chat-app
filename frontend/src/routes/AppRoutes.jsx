import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx"
import Protectedroute from "../components/Protectedroute.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<Protectedroute />}>
                    <Route path="/" element={<Home />} />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes