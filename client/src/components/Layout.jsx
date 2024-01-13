import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
const Layour = () => {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default Layour