import React from 'react'
import { addDoc, collection, setDoc, doc, getDocs, onSnapshot, deleteDoc} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useEffect, useState } from 'react'
import styles from '../style/doubtList.module.css'

const DoubtList = () => {

    const [doubtListData, setDoubtListData] = useState([])

    useEffect(()=>{
        const doubtList = onSnapshot(collection(db, "doubts"), (snapshot)=>{
            const myData = snapshot.docs.map((data)=>{
                console.log("inside map",data.data());
                return {name: data.data().student, 
                    // date2: data.data().date,
                    date: new Date(data.data().date.seconds * 1000 + Math.floor(data.data().date.nanoseconds / 1e6)),
                    topic: data.data().topic, 
                    doubt: data.data().doubt}
            })
            setDoubtListData(myData)    
            console.log("outside map",doubtList);
        })
    },[])

  return (
    <div>
        <div>
            {doubtListData.map((data, index)=>{
                return <div key={index} className={styles.listItem}>
                    <div>{data.name}</div>
                    <div>{data.topic}</div>
                    <div>{data.doubt}</div>
                    <div>{data.date.getHours()>12 ? data.date.getHours()-12+" : "+data.date.getMinutes()+" PM" : data.date.getHours()+" : "+data.date.getMinutes()+" AM"}</div>
                    <button>Aknowledge</button>
                </div>
            })}
        </div>
    </div>
  )
}

export default DoubtList
