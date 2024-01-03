import React from 'react'
import styles from '../style/studentdoubtForm.module.css'
import { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const StudentLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(()=>{
      const user = auth.currentUser;
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/')
        }
        setIsAuth(true)
      });
    })

    function toggleShowPassword(){
        setShowPassword(!showPassword)
    }

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
    <>
      {isAuth ? <div className={styles.mainContainer}>
        <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
        {showPassword?<input type="text" value={password} onChange={e=>setPassword(e.target.value)}/>
        :<input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>}
        <button onClick={toggleShowPassword}>show password</button>
        <button onClick={handleClickLogin}>Login</button>
      </div> : null}
    </>
  )
}

export default StudentLogin
