import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Header from './components/Header/Header'
import "./App.css";

const App = () => {
  return (
    <>
     <BrowserRouter>
     <Header/>
     <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
     </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App