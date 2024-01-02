import React from 'react'
import styles from '../style/studentdoubtForm.module.css'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    function toggleShowPassword(){
        setShowPassword(!showPassword)
    }

    const auth = getAuth();
    const navigate = useNavigate();

    function handleClickLogin(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("signedin successfully")
            navigate('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error code:",errorCode, "error message:", errorMessage);
        });
    }

  return (
    <div className={styles.mainContainer}>
      <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
      {showPassword?<input type="text" value={password} onChange={e=>setPassword(e.target.value)}/>
      :<input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>}
      <button onClick={toggleShowPassword}>show password</button>
      <button onClick={handleClickLogin}>Login</button>
    </div>
  )
}

export default StudentLogin
