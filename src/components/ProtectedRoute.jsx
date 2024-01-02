import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const user = getAuth().currentUser;

    useEffect(()=>{
        if(!user){
            navigate('/student-login')
        }
    },[])

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ProtectedRoute
