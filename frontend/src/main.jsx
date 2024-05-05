import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from './pages/Login.jsx'
import { Provider } from 'react-redux'
import { persistedStore, store } from './store/store.js'
import  {Auth} from './components'
import {
    LeaveApplications as TeacherStudentLeaveApplications,
    StudentComponent,
    StudentPassword,
    StudentProfileView,
    StudentTeacherList,
    Attendance,
    FillAttendance,
    ApprovedStudentLeaveApplication,
    PendingStudentLeaves,
    RejectedStudentLeaveApplication,
    ViewStudentLeaveApp
} from './components/teacher/students/index.js'
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
import AdminStudentPage from './pages/admin/student/AdminStudentPage.jsx' 
import AdminStudentComponent from './components/admin/students/AdminStudentComponent.jsx'
import AddStudent from './components/admin/students/AddStudent.jsx'
import StudentList from './components/admin/students/StudentList.jsx'
import StudentProfile from './components/admin/students/StudentProfile.jsx'
import StudentAttendanceReport from './components/admin/students/StudentAttendanceReport.jsx'
import Error from './components/alerts/Error.jsx'
import More from './components/student/more/more.jsx'
import AddProfilePicture from './components/student/more/AddProfilePicture.jsx'
import TimeTableMenu from './components/admin/students/TimeTableMenu.jsx'
import ViewTimeTable from './components/admin/students/timetable/ViewTimeTable.jsx'
import ExamPage from './components/student/exam/ExamPage.jsx'
import ParentDashBoard from './pages/parent/ParentDashBoard.jsx'
import ParentTimeTable from './components/parent/ParentTimeTable.jsx'
import ParentAttendance from './components/parent/ParentAttendance.jsx'
import StudentLeaveApplication from './components/student/LeaveApplication.jsx'
import AddApplication from './components/student/leave/AddApplication.jsx'
import PendingApplication from './components/student/leave/PendingApplication.jsx'
import ApprovedApplication from './components/student/leave/ApprovedApplication.jsx'
import ParentPage from './pages/teacher/parent/ParentPage.jsx'
import ParentComponent from './components/teacher/parents/ParentComponent.jsx'
import RejectedApplication from './components/student/leave/RejectedApplication.jsx'
import ExamTimeTable from './components/student/exam/ExamTimeTable.jsx'
import ExamHomePage from './components/student/exam/ExamHomePage.jsx'
import Result from './components/student/exam/Result.jsx'
import {
  AddMarks ,
  ExamHomePage as TeacherExamHomePage,
  ExamPage as TeacherExamPage,
  ViewExamTimeTable as TeacherViewExamTimeTable,
  ViewMarks as TeacherViewMarks,
  ViewResult as TeacherViewResult
} from './components/teacher/exam/index.js'



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
            path:"exam/",
            element: (
            <Auth authentication>
              <ExamHomePage />
            </Auth>),
            children: [
              {
                path:"timeTable",
                element: (
                <Auth authentication>
                  <ExamTimeTable />
                </Auth>)
              },
              {
                path:"",
                element: (
                <Auth authentication>
                  <ExamPage />
                </Auth>)
              },
              {
                path: "result",
                element: (
                <Auth authentication>
                  <Result />
                </Auth>)
              }
            ]
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
          },
          {
            path: 'leave',
            element: (
              <Auth authentication>
                <StudentLeaveApplication />
              </Auth>
            ),
            children: [
              {
                path: '',
              },
              {
                path: 'add',
                element: (
                  <Auth authentication >
                    <AddApplication />
                  </Auth>
                )
              },
              {
                path: 'pending',
                element: (
                  <Auth authentication >
                    <PendingApplication />
                  </Auth>
                )
              },
              {
                path: 'approved',
                element: (
                  <Auth authentication >
                    <ApprovedApplication />
                  </Auth>
                )
              },
              {
                path: 'rejected',
                element: (
                  <Auth authentication >
                    <RejectedApplication />
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
              },
              {
                path: 'leaveApplications/',
                element: (
                  <Auth authentication>
                    <TeacherStudentLeaveApplications />
                  </Auth>
                ),
                children: [
                  {
                    path: 'pending',
                    element: (
                      <Auth authentication>
                        <PendingStudentLeaves />
                      </Auth>
                    ),
                  },
                  {
                    path: 'view/:sl_id',
                    element: (
                      <Auth authentication>
                        <ViewStudentLeaveApp />
                      </Auth>
                    )
                  },
                  {
                    path: 'approved',
                    element: (
                      <Auth authentication>
                        <ApprovedStudentLeaveApplication />
                      </Auth>
                    )
                  },{
                    path:'rejected',
                    element: (
                      <Auth authentication>
                        <RejectedStudentLeaveApplication />
                      </Auth>
                    )
                  }
                ]
              }
            ]
          },
          {
            path: "parents",
            element: (
              <Auth authentication>
                <ParentPage />
              </Auth>
            ),
            children: [
              {
                path: "",
                element: (
                <Auth authentication>
                  <ParentComponent />
                </Auth>)
              }
            ]
          },
          {
            path: 'exam/',
            element: (
              <Auth authentication>
                <TeacherExamHomePage />
              </Auth>
            ),
            children: [
              {
                path: 'timeTable',
                element: (
                  <Auth authentication>
                    <TeacherViewExamTimeTable />
                  </Auth>
                )
              },
              {
                path: '',
                element: (
                  <Auth authentication>
                    <TeacherExamPage />
                  </Auth>
                )
              },
              {
                path:'result',
                element: (
                  <Auth authentication>
                    <TeacherViewResult />
                  </Auth>
                )
              },
              {
                path: 'addMarks',
                element: (
                  <Auth authentication>
                    <AddMarks />
                  </Auth>
                )
              },
              {
                path: 'viewMarks',
                element: (
                  <Auth authentication>
                    <TeacherViewMarks />
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
            path: '',
            element:(
              <Auth authentication>
                <ParentTimeTable />
              </Auth>
            )
          },
          {
            path: "attendance",
            element: (
              <Auth authentication>
                <ParentAttendance />
              </Auth>
            )
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
