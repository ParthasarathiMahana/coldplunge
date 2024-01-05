import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentDashboard = () => {

  const [showList, setShowList] = useState(true)
  const navigate = useNavigate()

  function handleClickMyDoubts(){
    setShowList(!showList)
    if(!showList){
      navigate('/')
    }
  }

  return (
    <div>
      {showList?<><button onClick={handleClickMyDoubts} style={{backgroundColor:"green"}}>My Doubts</button>
      <button onClick={handleClickMyDoubts}>Raise Doubt</button></>
      :<><button onClick={handleClickMyDoubts}>My Doubts</button>
      <button onClick={handleClickMyDoubts} style={{backgroundColor:"green"}}>Raise Doubt</button></>}
      
    </div>
  )
}

export default StudentDashboard
