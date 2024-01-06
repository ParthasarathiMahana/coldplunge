import React from 'react'
// import { Outlet, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
// import { debounce } from 'lodash'
import StudentLogin from '../pages/StudentLogin'
import DoubtForm from './DoubtForm'
import DoubtList from '../pages/DoubtList'

const ProtectedRoute = () => {
    // const navigate = useNavigate();
    const auth = getAuth()
    const [isAuthChecked, setIsAuthChecked] = useState(false)
    const [isMentor, setIsMentor] = useState(false)

    // const debouncedNavigate = debounce((path)=>navigate(path), 500)

    useEffect(()=>{
      onAuthStateChanged(auth, (myuser) => {
        if (!myuser){
          // debouncedNavigate('/student-login')
        setIsAuthChecked(false)
        }
        else{
          // debouncedNavigate('/')
          // console.log(myuser);
          const userEmail = myuser.email;
          const emailRegex = /@gmail\.community$/;
          const isValid = emailRegex.test(userEmail);
          if(isValid){
            setIsMentor(true)
          }else{
            setIsMentor(false)
          }
          setIsAuthChecked(true)
        }
      });
    }, [isAuthChecked])

  return (
    <div>
      {isAuthChecked ? isMentor ? <DoubtList/> : <DoubtForm/> : <StudentLogin/>}
    </div>
  )
}

export default ProtectedRoute
