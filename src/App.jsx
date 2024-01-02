import './App.css';
import StudentDoubtForm from './pages/StudentDoubtForm'
import DoubtList from './pages/DoubtList'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<StudentDoubtForm/>}></Route>
          <Route path='/mentor' element={<DoubtList/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
