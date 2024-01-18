import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Login from './pages/Login.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' >
      <Route path = 'login' element={<Login />} />
      <Route path='admin/' >
        <Route path='teachers/'></Route>
        <Route path='students/' ></Route>
        <Route path='parents/'></Route>
      </Route>
      <Route path='teacher/'>
        <Route path='teacherTimetable/' />
        <Route path='attendanceFilling/' />
        <Route path='availableTeachers/' />
        <Route path='teacherLeaveApplications/' />
        <Route path='settings/' />
        <Route path='profile/' />
        <Route path='courseDetails/' />
        <Route path='feesDetails/' />
        <Route path='students/'>
          <Route path='studentLeaveApplications/' />
          <Route  path='studentProfiles' />
        </Route>
        <Route path='parents/'></Route>
      </Route>
      <Route path='student/'>
        <Route path='studentTimetable/' />
        <Route path='attendanceSummary/' />
        <Route path='availableTeachers/' />
        <Route path='studentLeaveApplication/' />
        <Route path='settings/' />
        <Route path='profile/' />
        <Route path='courseDetails/' />
        <Route path='feesDetails/' />
      </Route>
      <Route path='parent/'>
      
      </Route>
    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
