import React from 'react'
import { useState } from 'react'
import { db } from '../firebase/config'
import { addDoc, collection, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore'

const ReplyForm = (props) => {
    const [reply, setReply] = useState('')

    async function handleClickAnswer(){
        if(reply === ''){
            return alert("answer can not be empty")
        }
        const docRef = doc(db, "doubts", props.id)
        const existingData = await getDoc(docRef)
        let tempData = {...existingData.data()}
        tempData.answer = reply
        await updateDoc(docRef, tempData)
        setReply('')
    }

  return (
    <div>
      <input type="text" value={reply} onChange={(e)=>setReply(e.target.value)}/>
      <button onClick={handleClickAnswer}>Answer</button>
    </div>
  )
}

export default ReplyForm