import { CGU } from './pages/CGU';
import { Test } from './pages/Test';
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
    // Utilisation de useEffect pour récupérer les catégories lors du chargement de l'application (j'ai commencer à coder différement pendant mon stage du coup maintenant j'utilise les parents)
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
      
      {/* Utilisation de la composante Routes pour gérer les routes de l'application */}  
      <Routes>

        {/* Définition des routes avec le chemin (path) et le composant à afficher (element) */}
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
