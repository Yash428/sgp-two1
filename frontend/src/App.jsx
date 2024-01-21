import { useEffect, useState } from 'react'
import {Button, Input} from "./components"
import { BrowserRouter as Router, Route, Link,Routes, useNavigate, Outlet } from 'react-router-dom';
import './App.css'
import PrintAllStudents from './components/PrintAllStudents'
import AllStudentPassword from './components/AllStudentPassword'
import { TableOne } from './components/TableOne'
import Login from './pages/Login.jsx'


function App() {
  
  return (
    <>
      <Outlet />
    </>
  )
}

export default App