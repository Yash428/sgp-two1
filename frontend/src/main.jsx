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
import AdminStudentPage from './pages/admin/student/AdminStudentPage.jsx' 
import AdminStudentComponent from './components/admin/students/AdminStudentComponent.jsx'
import AddStudent from './components/admin/students/AddStudent.jsx'
import StudentList from './components/admin/students/StudentList.jsx'
import StudentProfile from './components/admin/students/StudentProfile.jsx'
import StudentTeacherList from './components/teacher/students/StudentTeacherList.jsx'
import StudentProfileView from './components/teacher/students/StudentProfileView.jsx'
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
                  <Auth authentication>
                    <FillAttendance />
                  </Auth>
                )
              },
              {
                path: 'studentProfiles/',
                element:(
                  <auth authentication>
                    <StudentTeacherList />
                  </auth>
                )
              },
              {
                path: 'studentProfile/:student_id',
                element: (
                  <Auth authentication>
                    <StudentProfileView />
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
        ),
        children:[
          {
            path: "students/",
            element: (
              <Auth authentication>
                <AdminStudentPage />
              </Auth>
            ),
            children: [
              {
                path: "",
                element: (
                <Auth authentication>
                  <AdminStudentComponent/>
                </Auth>
                )
              },
              {
                path: "addStudent/",
                element: (
                  <Auth authentication>
                    <AddStudent />
                  </Auth>
                )
              },
              {
                path: 'studentDatabase',
                element: (
                  <Auth authentication>
                    <StudentList />
                  </Auth>
                )
              },
              {
                path: 'studentProfile/:student_id',
                element: (
                  <Auth authentication>
                    <StudentProfile />
                  </Auth>
                )
              }
            ]
          }
        ]
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
