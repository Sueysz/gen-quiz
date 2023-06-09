import { Test } from './pages/test';
import { Quiz } from './pages/Quiz';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from "react-router-dom";

import { FormQuiz } from './pages/FormQuiz';

const App = () => {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path='quiz/:slug' element={<Quiz />} />
        <Route path="*" element={<NotFound />} />
        <Route path='test' element={<Test />} />
        <Route path='FormQuiz' element={<FormQuiz />} />
        <Route path='Profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
