import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Login from './pages/Login.jsx'
import PageOne from './pages/PageOne.jsx'
import PrintAllStudents from './components/PrintAllStudents.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import  {Auth} from './components'
import PageTwo from './pages/PageTwo.jsx'

const router = createBrowserRouter(

  [{
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:(
          <Auth authentication>
            {" "}
            <PageOne />
          </Auth>
        )
      },
      {
        path:  '/login',
        element: (
          <Auth authentication= {false}>
            <Login />
          </Auth>
        )
      },
      {
        path: '/dest',
        element:(
          <Auth authentication>
            {" "}
            <PrintAllStudents />
          </Auth>
        )
      },
      {
        path: '/loggedOut',
        element:<PageTwo />
      }
    ]
  }]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
