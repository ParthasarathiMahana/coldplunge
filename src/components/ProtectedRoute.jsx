import React from 'react'
// import { Outlet, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
// import { debounce } from 'lodash'
import StudentLogin from '../pages/StudentLogin'
import DoubtForm from './DoubtForm'

const ProtectedRoute = () => {
    // const navigate = useNavigate();
    const auth = getAuth()
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    // const debouncedNavigate = debounce((path)=>navigate(path), 500)

    useEffect(()=>{
      onAuthStateChanged(auth, (myuser) => {
        if (!myuser){
          // debouncedNavigate('/student-login')
        setIsAuthChecked(false)
        }
        else{
          // debouncedNavigate('/')
          console.log(myuser);
        setIsAuthChecked(true)
        }
      });
    }, [isAuthChecked])

  return (
    <div>
      {isAuthChecked ? <DoubtForm/> : <StudentLogin/>}
    </div>
  )
}

export default ProtectedRoute
