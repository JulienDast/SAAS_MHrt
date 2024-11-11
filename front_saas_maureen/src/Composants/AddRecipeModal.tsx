import React, { useState } from 'react';
import axios from 'axios';

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeAdded: () => void; 
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ isOpen, onClose, onRecipeAdded }) => {
  const [name, setName] = useState('');
  const [gateauImgUrl, setGateauImgUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}recette`, {
        name,
        gateauImgUrl,
      });
      onRecipeAdded(); 
      onClose(); 
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la recette.', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Ajouter une recette</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de la recette"
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <input
            type="url"
            value={gateauImgUrl}
            onChange={(e) => setGateauImgUrl(e.target.value)}
            placeholder="URL de l'image"
            className="border rounded p-2 mb-4 w-full"
            required
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
            Ajouter
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500 hover:underline">
          Annuler
        </button>
      </div>
    </div>
  );
};

export default AddRecipeModal;