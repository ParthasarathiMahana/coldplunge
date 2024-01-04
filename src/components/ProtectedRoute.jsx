import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const auth = getAuth()
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    const debouncedNavigate = debounce((path)=>navigate(path), 500)

    useEffect(()=>{
      onAuthStateChanged(auth, (myuser) => {
        if (!myuser){
          debouncedNavigate('/student-login')
        }
        else{
          debouncedNavigate('/')
        }
        setIsAuthChecked(true)
      });
    })

  return (
    <div>
      {isAuthChecked ? <Outlet/> : null}
    </div>
  )
}

export default ProtectedRoute
