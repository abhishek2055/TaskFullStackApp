import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import "./App.css"
import Register from './pages/register/Register'
import UpdateArticle from './pages/update/UpdateArticle'
const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/update/:id' element={<UpdateArticle />}></Route>

      </Routes>
    </div>
  )
}

export default App
