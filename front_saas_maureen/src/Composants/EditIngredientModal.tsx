import React, { useState } from 'react';
import axios from 'axios';

interface EditIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: any; 
  onIngredientUpdated: () => void; 
}

const EditIngredientModal: React.FC<EditIngredientModalProps> = ({ isOpen, onClose, ingredient, onIngredientUpdated }) => {
  const [name, setName] = useState(ingredient.name);
  const [price, setPrice] = useState<number>(ingredient.price);
  const [unity, setUnity] = useState(ingredient.unity);
  const [description, setDescription] = useState(ingredient.description);
  const [imageUrl, setImageUrl] = useState(ingredient.imageUrl || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}ingredient/${ingredient.id}`, {
        name,
        price,
        unity,
        description,
        imageUrl,
      });
      onIngredientUpdated(); 
      onClose(); 
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'ingrédient.', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Modifier l'ingrédient</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom"
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Prix"
            className="border rounded p-2 mb-2 w-full"
            required
          />
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
          <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
            Mettre à jour
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500 hover:underline w-full">
          Annuler
        </button>
      </div>
    </div>
  );
};

export default EditIngredientModal;