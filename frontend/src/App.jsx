import Notes from './components/notes'
import Signup from './components/signup'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';
import Navbar from './components/Navbar';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {

  const {login} = useContext(AuthContext)
  useEffect(()=>{
    login()
  },[])

  return <>
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup/>} />
    <Route path="/note/all" element={<ProtectedRoute><Notes/></ProtectedRoute>} />
<Route path="/note/add" element={<ProtectedRoute><AddNote/></ProtectedRoute>} />
<Route path="/note/:id" element={<ProtectedRoute><EditNote/></ProtectedRoute>} />

  </Routes>
  </BrowserRouter>
    
  </>
}

export default App
