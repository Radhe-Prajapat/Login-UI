import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default App