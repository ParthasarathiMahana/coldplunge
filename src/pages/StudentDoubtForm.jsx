import React from 'react'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
// import { debounce } from 'lodash'
// import { useNavigate } from 'react-router-dom'
import DoubtForm from '../components/DoubtForm'
import StudentLogin from './StudentLogin'

const StudentDoubtForm = () => {

    // const navigate = useNavigate()
    const [isAuthChecked, setIsAuthChecked] = useState(false)
    // const debouncedNavigate = debounce((path)=>navigate(path), 500)
    const auth = getAuth()

    useEffect(()=>{
      onAuthStateChanged(auth, (myuser) => {
        if (myuser){
          setIsAuthChecked(true)
        }
        else{
          setIsAuthChecked(false)
        }
      });
    })

  return (
    <>
      {isAuthChecked ? <DoubtForm/> : <StudentLogin/>}
    </>
  )
}

export default StudentDoubtForm