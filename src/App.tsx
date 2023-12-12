import React from 'react'
// import './App.css'
// import List from './pages/manage/List'
import routes from './router'
import { RouterProvider } from 'react-router-dom'

function App() {
  return <RouterProvider router={routes}></RouterProvider>
}

export default App
