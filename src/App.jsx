import { Test } from './pages/test';
import { Quiz } from './pages/Quiz';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { Routes, Route} from "react-router-dom";

import './App.css'

const App = () => {

  return (
    <>
      <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path='quiz/:slug' element={<Quiz/>} />
          <Route path="*" element={<NotFound />} />
          <Route path='test' element={<Test />}/>
      </Routes>
    </>
  )
}

export default App
