import React, { Fragment, useContext } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Dashboard from '../pages/Dashboard'
import Courses from '../pages/Courses'
import Newcourse from '../pages/Newcourse'
import appContext from '../context/appContext'

function Router() {
  const { State } = useContext(appContext);
  const {
    WalletAddress
  } = State;

  return (
    <Fragment>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' index element={<Dashboard />}/>
                <Route path='/courses' element={(WalletAddress) ? <Courses /> : <Dashboard />}/>
                <Route path='/new-course' element={(WalletAddress) ? <Newcourse /> : <Dashboard />}/>
            </Routes>
            <Outlet />
        </BrowserRouter>
    </Fragment>
  )
}

export default Router