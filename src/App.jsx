import { CGU } from './pages/CGU';
import { Test } from './pages/test';
import { Quiz } from './pages/Quiz';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from "react-router-dom";

import { FormQuiz } from './pages/FormQuiz';
import { useEffect, useState } from 'react';
import { fetchCategories } from './api';


const App = () => {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategoriesList(categoriesData);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategoriesData();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path='quiz/:id' element={<Quiz />} />
        <Route path="*" element={<NotFound />} />
        <Route path='test' element={<Test />} />
        <Route path='FormQuiz' element={<FormQuiz categoriesList={categoriesList} />} />
        <Route path='Profile' element={<Profile />} />
        <Route path="CGU" element={<CGU />} />
      </Routes>
    </>
  )
}

export default App
