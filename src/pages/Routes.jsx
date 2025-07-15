import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frontend from './Frontend'
import Authentication from './authentication'
import Dashboard from './Dashboard'

import { AuthContext } from '../context/AuthContext'
import PrivateRoute from "../component/PrivateRoute";

function Index() {

    const { isAuthenticated, user } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Frontend />} />
                <Route path="/authentication/*" element={!isAuthenticated ? <Authentication /> : <Navigate to='/Dashboard' />} />
                <Route path="/Dashboard/*" element={<PrivateRoute Component={Dashboard} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index;
