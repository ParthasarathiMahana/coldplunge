import React from 'react'
import styles from '../style/navbar.module.css'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    function handleClickSignout(){
        signOut(auth).then(() => {
            alert("signedout successfully")
            navigate('/student-login')
        }).catch((error) => {
        // An error happened.
        });
    }
  return (
    <div className={styles.mainContainer}>
      <button onClick={handleClickSignout}>Signout</button>
    </div>
  )
}

export default Navbar
