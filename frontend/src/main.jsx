import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Login from './pages/Login.jsx'
import PageOne from './pages/PageOne.jsx'
// import PrintAllStudents from './components/PrintAllStudents.jsx'
import { Provider } from 'react-redux'
import { persistedStore, store } from './store/store.js'
import  {Auth} from './components'
import PageTwo from './pages/PageTwo.jsx'
import PageThree from './pages/PageThree.jsx'
import { TableOne } from './components/TableOne.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

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
        <Auth authentication={false}>
          <Login />
        </Auth>)

      },
      {
        path: 'student',
        element: (
          <Auth authentication>
            <PageOne />
          </Auth>
        )
      },
      {
        path: 'teacher',
        element:(
          <Auth authentication >
            <TableOne />
          </Auth>
          // <TableOne />
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
