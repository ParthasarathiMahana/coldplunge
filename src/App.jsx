import './App.css';
import StudentDoubtForm from './pages/StudentDoubtForm'
import DoubtList from './pages/DoubtList'
import StudentSignupForm from './pages/StudentSignupForm';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<StudentDoubtForm/>}></Route>
          </Route>
          <Route path='/mentor' element={<DoubtList/>}></Route>
          <Route path='/signup' element={<StudentSignupForm/>}></Route>
          <Route path='/student-login' element={<StudentLogin/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
