import React from 'react'
import styles from '../style/studentdoubtForm.module.css'
import { useState } from 'react'
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from 'react-router-dom'

const StudentSignupForm = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [squad, setSquad] = useState('')
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')

    const auth = getAuth()
    const navigate = useNavigate();

    function handleClickSignup(){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            // use any notification liabrary instead alert
            alert("registered successfully")
            navigate('/student-login')
            // console.log(user);
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage  = error.messsage;
            console.error("errorCode",errorCode, "errorMessage",errorMessage);
        })
        setEmail(''); setName(''); setSquad(''); setPassword(''); setCnfPassword('')
    }

    function handleClickLogin(){
      navigate('/student-login')
    }

  return (
    <div className={styles.mainContainer}>
      <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="text" placeholder='squad number' value={squad} onChange={(e)=>setSquad(e.target.value)}/>
      <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <input type="password" placeholder='confirm password' value={cnfPassword} onChange={(e)=>setCnfPassword(e.target.value)}/>
      <button onClick={handleClickSignup}>Signup</button>
      <button onClick={handleClickLogin}>Login Page</button>
    </div>
  )
}

export default StudentSignupForm