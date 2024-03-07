import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link,Routes, useNavigate, Outlet } from 'react-router-dom';
import './App.css'



function App() {
  
  return (
    <div className='h-screen'>
      <Outlet/>
    </div>
  )
}

export default App