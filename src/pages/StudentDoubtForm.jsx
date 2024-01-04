import React from 'react'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'
import DoubtForm from '../components/DoubtForm'

const StudentDoubtForm = () => {

    const navigate = useNavigate()
    const [isAuthChecked, setIsAuthChecked] = useState(false)
    const debouncedNavigate = debounce((path)=>navigate(path), 500)
    const auth = getAuth()

    useEffect(()=>{
      onAuthStateChanged(auth, (myuser) => {
        if (myuser){
          debouncedNavigate('/')
        }
        else{
          navigate('/student-login')
        }
        setIsAuthChecked(true)
        // setTimeout(()=>{
        // }, 2000)
      });
    })

  return (
    <>
      {isAuthChecked ? <DoubtForm/> : null}
    </>
  )
}

export default StudentDoubtForm