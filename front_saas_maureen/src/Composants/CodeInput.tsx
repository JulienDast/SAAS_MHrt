// src/CodeInput.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CodeInput: React.FC = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const correctCode = process.env.REACT_APP_CODE; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === correctCode) { 
      sessionStorage.setItem('sessionCode', code); 
      navigate('/welcome'); 
    } else {
      alert('Code incorrect. Veuillez réessayer.');
    }
  };

  return (
    <>
    <h1 className="font-cursive text-7xl md:text-9xl text-center mt-32 mb-16">
      Hola Maoline !
    </h1>
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray-300 text-xl p-2 mb-12 text-center rounded mb-4"
          placeholder="Entrez le code à 4 chiffres"
        />
        <button type="submit" className="bg-red-600 text-white p-2 rounded">
          ENTRER
        </button>
      </form>
    </div>
    </>
  );
};

export default CodeInput;