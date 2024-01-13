import './App.css';
import StudentDoubtForm from './pages/StudentDoubtForm'
import DoubtList from './pages/DoubtList'
import StudentSignupForm from './pages/StudentSignupForm';
import StudentLogin from './pages/StudentLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              <Route element={<ProtectedRoute/>}>
                <Route path='/' element={<StudentDoubtForm/>}></Route>
                <Route path='/mentor' element={<DoubtList/>}></Route>
              </Route>
              <Route path='/student-signup' element={<StudentSignupForm/>}></Route>
              <Route path='/student-login' element={<StudentLogin/>}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
