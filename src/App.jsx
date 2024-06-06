import React from 'react'
import { BrowserRouter, Route, Router } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'

const App = () => {
  return (
    <>
     <BrowserRouter>
     <Router>
      <Route path='/' element={<Signup/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
     </Router>
     </BrowserRouter> 
    </>
  )
}

export default App