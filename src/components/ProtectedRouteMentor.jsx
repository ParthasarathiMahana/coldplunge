import React from 'react'
import { Outlet } from 'react-router-dom'

const ProtectedRouteMentor = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ProtectedRouteMentor
