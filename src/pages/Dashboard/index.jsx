import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Home'
import Todos from './Todos'

function index() {
  return (
    <Routes>
        <Route path='/'>
            <Route index element={<Home />}/>
            <Route path='Todos' element={<Todos />}/>
        </Route>
    </Routes>
  )
}

export default index