import React from 'react'
import { db } from '../firebase/config'
import { collection, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const Showstopper = (prop) => {

    const [doubtData, setDoubtData] = useState({})

    // useEffect(()=>{
    //     onSnapshot(collection(db, "doubts"), (snapshot)=>{
    //         snapshot.docs.map((item)=>{
    //             if(item.id == prop.id){
    //                 setDoubtId(item.id)
    //             }
    //         })
    //     })
    // },[])

    async function handleClickShowStopper(){
        const data = await getDoc(doc(db, "doubts", prop.id))
        setDoubtData(data.data())
        if(!doubtData.showStopper){
            await updateDoc(doc(db, "doubts", prop.id), {"showStopper":true, "mentorNotified":false})
        }
    }

  return (
    <div>
      <button onClick={handleClickShowStopper}>show stopper</button>
    </div>
  )
}

export default Showstopper
