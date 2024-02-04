import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Login from './pages/Login.jsx'
import PageOne from './pages/PageOne.jsx'
// import PrintAllStudents from './components/PrintAllStudents.jsx'
import { Provider, useSelector } from 'react-redux'
import { persistedStore, store } from './store/store.js'
import  {Auth} from './components'
import PageTwo from './pages/PageTwo.jsx'
import PageThree from './pages/PageThree.jsx'
import { TableOne } from './components/TableOne.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import StudentDashBoard from './pages/student/studentDashBoard.jsx'
import TeacherDashBoard from './pages/teacher/TeacherDashBoard.jsx'
import AttendanceSummary from './components/student/AttendanceSummary.jsx'
import TimeTable from './components/student/TimeTable.jsx'
import SetPassword from './components/student/settings/SetPassword.jsx'
import TeacherTimeTable from './components/teacher/TeacherTimeTable.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import StudentPage from './pages/teacher/student/StudentPage.jsx'
import Attendance from './components/teacher/students/Attendance.jsx'
import StudentComponent from './components/teacher/students/StudentComponent.jsx'
import FillAttendance from './components/teacher/students/FillAttendance.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: (
      <Auth authentication>
        <App />
      </Auth>
      // <App />
    ),
    children :[
      {
        path: "",
        element: (
        <Auth authentication={false} >
          <Login />
        </Auth>)
      },
      {
        path: 'student/',
        element: (
          <Auth authentication>
            <StudentDashBoard />
          </Auth>
        ),
        children: [
          {
            path: "",
            element: (
            <Auth authentication>
              <TimeTable />
            </Auth>)
          },
          {
            path: "attendance/",
            element: (
            <Auth authentication>
              <AttendanceSummary />
            </Auth>)
          },
          {
            path: 'settings',
            element: (
              <Auth authentication>
                <SetPassword />
              </Auth>
            )
          }
        ]
      },
      {
        path: 'teacher/',
        element:(
          <Auth authentication >
            <TeacherDashBoard />
          </Auth> 
        ),
        children: [
          {
            path: "",
            element: (
            <Auth authentication>
              <TeacherTimeTable />
            </Auth>)
          },
          {
            path: "students/",
            element: (
              <Auth authentication>
                <StudentPage />
              </Auth>
            ),
            children: [
              {
                path: "",
                element: (
                <Auth authentication>
                  <StudentComponent />
                </Auth>)
              },
              {
                path: "attendance/",
                element: (
                  <Auth authentication >
                    <Attendance />
                  </Auth>
                ),
              },
              {
                path: "fillAttendance/:att_p_id",
                element: (
                  <Auth>
                    <FillAttendance />
                  </Auth>
                )
              }
            ]
          }
        ]
      },
      {
        path: 'admin/',
        element: (
          <Auth authentication>
            <AdminDashboard />
          </Auth>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistedStore}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
