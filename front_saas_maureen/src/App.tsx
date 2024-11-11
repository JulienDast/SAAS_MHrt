import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CodeInput from './Composants/CodeInput';
import ProtectedRoute from './Composants/ProtectedRoute';
import RecetteDetail from './Composants/RecetteDetail';
import Welcome from './Composants/Welcome';
import Recettes from './Composants/Recettes';
import IngredientsList from './Composants/Ingredients';
import IngredientDetail from './Composants/IngredientDetail';


const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen pt-16">
      <div className='flex items-center justify-center mx-12'>
        <Link to="/recettes" className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 font-mono text-center text-xl md:text-3xl text-white p-2 rounded h-20 w-72 mr-8 flex items-center justify-center">
          Les recettes
        </Link>        
        <Link to="/ingredients" className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 font-mono text-center text-xl md:text-3xl text-white p-2 rounded h-20 w-72 ml-8 flex items-center justify-center">
          Les ingrédients
        </Link>        
      </div>
      <Routes>
        <Route path="/" element={<CodeInput />} /> 
        <Route path="/welcome" element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        } /> 
        <Route path="/recettes" element={
          <ProtectedRoute>
            <Recettes />
          </ProtectedRoute>
        } /> 
        <Route path="/recettes/:id" element={
          <ProtectedRoute>
            <RecetteDetail/>
            </ProtectedRoute>
        } /> 
        <Route path='/ingredients' element={
          <ProtectedRoute>
            <IngredientsList/>
          </ProtectedRoute>
        }/>
        <Route path='/ingredients/:id' element={
          <ProtectedRoute>
            <IngredientDetail/>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

export default App;
