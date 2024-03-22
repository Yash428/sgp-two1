import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Login from './pages/Login.jsx'

// import PrintAllStudents from './components/PrintAllStudents.jsx'
import { Provider, useSelector } from 'react-redux'
import { persistedStore, store } from './store/store.js'
import  {Auth} from './components'

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
import StudentAttendanceReport from './components/admin/students/StudentAttendanceReport.jsx'
import Error from './components/alerts/Error.jsx'
import StudentPassword from './components/teacher/students/StudentPassword.jsx'
import More from './components/student/more/more.jsx'
import AddProfilePicture from './components/student/more/AddProfilePicture.jsx'
import Numbers from './components/admin/dashboard/Numbers.jsx'
import TimeTableMenu from './components/admin/students/TimeTableMenu.jsx'
import ViewTimeTable from './components/admin/students/timetable/ViewTimeTable.jsx'
import ExamPage from './components/student/exam/ExamPage.jsx'
import ParentDashBoard from './pages/parent/ParentDashBoard.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: (
      <Auth authentication>
        <App />
      </Auth>
      
    ),
    children :[
      {
        path: "/",
        element: (
        <Auth authentication={false}  >
          <Login />
        </Auth>)
      },
      {
        path: "login/",
        element: (
        <Auth authentication={false}  >
          <Login />
        </Auth>)
      },
      {
        path: 'student/',
        element: (
          <Auth authentication >
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
            path: "loginError/",
            element: <Error message={'login Error'} description={'invalid username or password'} buttonName={'Ok'} />
          },
          {
            path: "attendance/",
            element: (
            <Auth authentication>
              <AttendanceSummary />
            </Auth>)
          },
          {
            path: 'settings/',
            element: (
              <Auth authentication>
                <SetPassword />
              </Auth>
            )
          },
          {
            path:"exam",
            element: (
            <Auth authentication>
              <ExamPage />
            </Auth>)
          },
          {
            path: 'more/',
            children: [
              {
                path: '',
                element: (
                  <Auth authentication >
                    <More />
                  </Auth>
            )
              },
              {
                path: 'addProfilePicture',
                element: (
                  <Auth authentication >
                    <AddProfilePicture />
                  </Auth>
                )
              }
            ]
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
              },
              {
                path:'studentPasswords/',
                element:(
                  <Auth authentication>
                    <StudentPassword />
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
            path: '',
            element:(
              <Auth authentication>
                <Numbers />
              </Auth>
            )
          },
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
              },
              {
                path: 'attendance',
                element:(
                  <Auth authentication>
                    <StudentAttendanceReport />
                  </Auth>
                )
              },
              {
                path: 'timeTable',
                children: [
                  {
                    path: '',
                    element:(
                      <Auth authentication>
                        <TimeTableMenu />
                      </Auth>
                    )
                  },
                  {
                    path: 'viewTimeTable',
                    element:(
                      <Auth authentication >
                        <ViewTimeTable />
                      </Auth>
                    )
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'parent/',
        element: (
          <Auth authentication>
            <ParentDashBoard />
          </Auth>
        ),
        children: [
          {
            path: "attendance",
          },
          {
            path:"exam"
          },
          {
            path: "leave"
          },
          {
            path: "settings"
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
