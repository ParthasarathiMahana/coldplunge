import React from 'react'
import { addDoc, collection, setDoc, doc, getDocs, onSnapshot, deleteDoc, getDoc, updateDoc} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useEffect, useState } from 'react'
import styles from '../style/doubtList.module.css'
import Navbar from '../components/Navbar'
import ReplyForm from '../components/ReplyForm'
import { doubtActions, doubtSelector } from '../redux/reducers/doubtReducers'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const DoubtList = () => {

    const dispatch = useDispatch();
    const allDoubts = useSelector(doubtSelector);
    const [visibility, setVisibility] = useState('none');
    const notificationAudio = new Audio("audio/Iphone Original Ringtone Download - MobCup.Com.Co.mp3")

    useEffect(()=>{
        onSnapshot(collection(db, "doubts"), (snapshot)=>{
            const myData = snapshot.docs.map((data)=>{
                const calculatedDate = data.data().date.seconds * 1000 + Math.floor(data.data().date.nanoseconds / 1e6)
                const dateObj = new Date(calculatedDate)
                return {email: data.data().email,
                    date: [dateObj.getHours(), dateObj.getMinutes()],
                    topic: data.data().topic, 
                    doubt: data.data().doubt,
                    mode: data.data().mode,
                    id: data.id,
                    acknowledgement: data.data().acknowledgement? data.data().acknowledgement:false}
            })
            console.log(myData);
            dispatch(doubtActions.addDoubts(myData))
        })
    },[])

    useEffect(()=>{
        onSnapshot(collection(db, "doubts"), (snapshot)=>{
            const myData = snapshot.docs.map(async(data)=>{
                if(data.data().showStopper == true && data.data().mentorNotified == false){
                    var deadLockNotification;
                    Notification.requestPermission().then(()=>{
                        deadLockNotification = new Notification("new show stopper", {
                            body: `New Showstopper raised by ${data.data().email}, doubt is: ${data.data().doubt}`
                        });
                        // notification audio will play along with notification
                        notificationAudio.play()
                        // if notification will be closed audio will stop
                        deadLockNotification.onclose = function() {
                            notificationAudio.pause()
                            notificationAudio.currentTime = 0;
                        };
                        // if notification will be clicked audio will stop
                        deadLockNotification.onclick = function() {
                            notificationAudio.pause();
                            notificationAudio.currentTime = 0;
                            deadLockNotification.close();
                        };
                        // testing the email and doubt of user
                        // console.log("DoubtList.jsx: "+`New Showstopper raised by ${data.data().email}, doubt is: ${data.data().doubt}`);
                    })
                    const data2 = await updateDoc(doc(db, "doubts", data.id), {"mentorNotified":true})
                }
            })
        })
    },[])

    async function handleClickAcknowledge(index){

        const docRef = doc(db, "doubts", allDoubts[index].id)
        try {
            // await updateDoc(docRef, doubtListData[index])
            let statOfAcknowledgement = allDoubts[index].acknowledgement
            await setDoc(docRef, {acknowledgement: !allDoubts[index].acknowledgement}, {merge: true})
            if(!statOfAcknowledgement){
                toast("Acknowledged",{icon: '✅'})
            }else{
                toast("Unacknowledged",{icon: '❌'})
            }
        } catch (e) {
            console.log("Error getting cached document:", e);
        }
    }

    function handleClickReply(index){
        if(visibility === 'none'){
            setVisibility('flex')
        }else{
            setVisibility('none')
        }

        dispatch(doubtActions.activateDoubt(index))
    }

  return (
    <div>
        <Navbar/>
        <div className={styles.mainContainer}>
            <div className={styles.listItem}>
                <h3>Email</h3>
                <h3 className={styles.topicHeading}>Topic</h3>
                <h3>Doubt</h3>
                <h3>Mode</h3>
                <h3 className={styles.topicHeading}>Time</h3>
                <h3>Stat</h3>
            </div>
            <div className={styles.doubtContainer}>
                {allDoubts.map((data, index)=>{
                    return (
                        <div  key={index} className={styles.doubtsWithReplyBox}>
                            <div className={styles.doubtRow}>
                                <div>{data.email}</div>
                                <div className={styles.topic}>{data.topic}</div>
                                <div>{data.doubt}</div>
                                <div>{data.mode}</div>
                                <div className={styles.time}>{data.date[0]>12 ? data.date[0]-12+" : "+data.date[1]+" PM" : data.date[0]+" : "+data.date[1]+" AM"}</div>
                                <div>{data.acknowledgement?<button onClick={()=>handleClickAcknowledge(index)} style={{backgroundColor:"green"}} className={styles.statBtn}>Aknowledged</button>:<button onClick={()=>handleClickAcknowledge(index)} style={{backgroundColor:"red"}} className={styles.statBtn}>Aknowledge</button>}
                                {data.mode === "textReply"?<button onClick={()=>handleClickReply(index)} style={{backgroundColor:"black", marginLeft:"5px"}} className={styles.statBtn}>Reply</button>:null}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <ReplyForm data = {{visibility:visibility, setVisibility:setVisibility}}/>
            </div>
        </div>
    </div>
  )
}

export default DoubtList
