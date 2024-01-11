import React from 'react'
import { addDoc, collection, setDoc, doc, getDocs, onSnapshot, deleteDoc, getDoc, updateDoc} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useEffect, useState } from 'react'
import styles from '../style/doubtList.module.css'
import Navbar from '../components/Navbar'
import ReplyForm from '../components/ReplyForm'

const DoubtList = () => {

    const [doubtListData, setDoubtListData] = useState([])
    const [textReply, setTextReply] = useState(false)

    useEffect(()=>{
        onSnapshot(collection(db, "doubts"), (snapshot)=>{
            const myData = snapshot.docs.map((data)=>{
                // console.log("inside map",data.data());
                return {name: data.data().student, 
                    date: new Date(data.data().date.seconds * 1000 + Math.floor(data.data().date.nanoseconds / 1e6)),
                    topic: data.data().topic, 
                    doubt: data.data().doubt,
                    mode: data.data().mode,
                    id: data.id,
                    acknowledgement: data.data().acknowledgement? data.data().acknowledgement:false}
            })
            setDoubtListData(myData)    
        })
    })

    async function handleClickAcknowledge(index){
        const docRef = doc(db, "doubts", doubtListData[index].id)
        try {
            doubtListData[index].acknowledgement = !doubtListData[index].acknowledgement;
            await updateDoc(docRef, doubtListData[index])
          } catch (e) {
            console.log("Error getting cached document:", e);
          }
    }

  return (
    <div>
        <Navbar/>
        <div>
            <div className={styles.listItem}>
                    <h3>Student</h3>
                    <h3>Topic</h3>
                    <h3>Doubt</h3>
                    <h3>Mode of reply</h3>
                    <h3>Time of doubt raised</h3>
                    <h3>Status</h3>

            </div>
            {doubtListData.map((data, index)=>{
                return (
                    <div  key={index}>
                        <div style={{display:"flex"}}>
                            <div className={styles.listItem}>
                                <div style={{width:"20%"}}>{data.name}</div>
                                <div style={{width:"20%"}}>{data.topic}</div>
                                <div style={{width:"20%"}}>{data.doubt}</div>
                                <div style={{width:"20%"}}>{data.mode}</div>
                                <div style={{width:"20%"}}>{data.date.getHours()>12 ? data.date.getHours()-12+" : "+data.date.getMinutes()+" PM" : data.date.getHours()+" : "+data.date.getMinutes()+" AM"}</div>
                            </div>
                            {data.acknowledgement?<button onClick={()=>handleClickAcknowledge(index)} style={{backgroundColor:"green"}}>Aknowledged</button>:<button onClick={()=>handleClickAcknowledge(index)} style={{backgroundColor:"red"}}>Aknowledge</button>}
                        </div>
                        {data.mode === "textReply"? <ReplyForm id = {data.id}/> : null}
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default DoubtList
