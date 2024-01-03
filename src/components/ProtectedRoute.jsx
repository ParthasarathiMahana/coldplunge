import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const auth = getAuth()
    const [isAuthChecked, setIsAuthChecked] = useState(false)


    useEffect(()=>{
      const user = auth.currentUser;
      onAuthStateChanged(auth, (myuser) => {
        if (!myuser){
          setIsAuthChecked(true)
          return navigate('/student-login')
        }else{
          setIsAuthChecked(true)
          return navigate('/')
        }
      });
    })

  return (
    <div>
      {isAuthChecked?<Outlet/>:null}
    </div>
  )
}

export default ProtectedRoute
