import React, { useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../firebase/config'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'

const MyDoubts = (props) => {
  const auth = getAuth()
  const [mydoubtList, setMyDoubtList] = useState([])

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      onSnapshot(collection(db, "doubts"), (snapshot)=>{
        const tempDoubtList = snapshot.docs.filter((item)=>{
          return item.data().student === props.email
        })
        const tempDL2 = tempDoubtList.map((item)=>item.data())
        // console.log(tempDL2);
        setMyDoubtList(tempDL2)
      })
    })
  },[])
  return (
    <div style={{marginTop:"1rem"}}>
      {mydoubtList.map((item, index)=>{
        return (
          <div key={index} style={{display:"flex", width:"50%", justifyContent:"space-evenly", marginTop:"1rem"}}>
            <div>{item.subject}</div>
            <div>{item.topic}</div>
            <div>{item.doubt}</div>
            <div>{item.acknowledgement ? "acknowledged" : "yet to see"}</div>
          </div>
        )
      })}
    </div>
  )
}

export default MyDoubts
