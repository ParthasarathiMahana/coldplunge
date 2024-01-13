import React from 'react'
import { useState } from 'react'
import { db } from '../firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import styles from '../style/replyForm.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { activeDoubtSelector, doubtActions, doubtSelector } from '../redux/reducers/doubtReducers'

const ReplyForm = (props) => {
    const [reply, setReply] = useState('')

    const activeDoubtID = useSelector(activeDoubtSelector);
    const dispatch = useDispatch()

    async function handleClickAnswer(){
        if(reply === ''){
            return alert("answer can not be empty")
        }
        console.log(activeDoubtID);
        const docRef = doc(db, "doubts", activeDoubtID)
        await setDoc(docRef, {answer: reply}, {merge: true})
        dispatch(doubtActions.addAnswer({id: activeDoubtID, reply}))
        setReply('')
    }

  return (
    <div style={{display:props.visibility}} className={styles.formContainer}>
      {/* <input type="text" value={reply} onChange={(e)=>setReply(e.target.value)}/> */}
      <textarea value={reply} onChange={(e)=>setReply(e.target.value)}></textarea>
      <button onClick={handleClickAnswer}>Answer</button>
    </div>
  )
}

export default ReplyForm