import React from 'react'
import styles from '../style/studentdoubtForm.module.css'
import Navbar from '../components/Navbar'
import { addDoc, collection, setDoc, doc, getDocs, onSnapshot, deleteDoc} from 'firebase/firestore'
import {db} from '../firebase/config'
import { useState } from 'react'

const DoubtForm = () => {

    const [name, setName] = useState('')
    const [batch, setBatch] = useState('')
    const [subject, setSubject] = useState('')
    const [topic, setTopic] = useState('')
    const [doubt, setDoubt] = useState('')
    const [mode, setMode] = useState('')

    async function handleSubmit(){
        console.log(name, batch, subject, topic, doubt, mode);
        await addDoc(collection(db, "doubts"), {
            student: name,
            date: new Date(),
            doubt,
            subject,
            topic,
            "mode of resolution":mode
          });
          setName('')
          setBatch('')
          setSubject('')
          setTopic('')
          setDoubt('')
          setMode('')
    }

  return (
    <div>
        <Navbar/>
        <div className={styles.mainContainer}>
          <input type="text" placeholder='Name' value={name} onChange={e=>setName(e.target.value)}/>
          <input type="text" placeholder='Enter batch number' onChange={e=>setBatch(e.target.value)} value={batch}/>
          <input type="text" placeholder='Subject' onChange={e=>setSubject(e.target.value)} value={subject}/>
          <input type="text" placeholder='Topic' onChange={e=>setTopic(e.target.value)} value={topic}/>
          <textarea name="" id="" cols="30" rows="10" placeholder='Explain doubt in detail' onChange={e=>setDoubt(e.target.value)} value={doubt}></textarea>
          <input type="text" placeholder='Need 1 on 1, or text reply' onChange={e=>setMode(e.target.value)} value={mode}/>
          <button onClick={handleSubmit}>Raise the doubt</button>
        </div>
    </div>
  )
}

export default DoubtForm
