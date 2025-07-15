import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'

function index() {
    return (
        <Routes>
            <Route path='/'>
                <Route path='Login' element={<Login />} />
                <Route path='Register' element={<Register />} />
                <Route path='ForgotPassword' element={<ForgotPassword />} />
            </Route>
        </Routes>
    )
}

export default index