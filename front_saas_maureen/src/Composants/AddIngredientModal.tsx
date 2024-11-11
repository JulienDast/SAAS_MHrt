import React, { useState } from 'react';
import axios from 'axios';

interface AddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIngredientAdded: () => void; 
}

const AddIngredientModal: React.FC<AddIngredientModalProps> = ({ isOpen, onClose, onIngredientAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [unity, setUnity] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/ingredient', {
        name,
        price,
        unity,
        description,
        imageUrl,
      });
      onIngredientAdded(); 
      onClose(); 
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'ingrédient.', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Ajouter un ingrédient</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom"
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <div className="flex items-center">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Prix"
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <h1>€</h1>
          </div>
          <input
            type="text"
            value={unity}
            onChange={(e) => setUnity(e.target.value)}
            placeholder="Unité"
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optionnel)"
            className="border rounded p-2 mb-2 w-full"
          />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL de l'image (optionnel)"
            className="border rounded p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-green-500 text-white p-2 font-mono rounded w-full">
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

export default AddIngredientModal;