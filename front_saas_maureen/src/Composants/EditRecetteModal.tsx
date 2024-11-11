import React, { useState } from 'react';
import axios from 'axios';

interface EditRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: any;
  onRecipeUpdated: () => void;
}

const EditRecipeModal: React.FC<EditRecipeModalProps> = ({ isOpen, onClose, recipe, onRecipeUpdated }) => {
  const [name, setName] = useState(recipe.name);
  const [gateauImgUrl, setGateauImgUrl] = useState(recipe.gateauImgUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}recette/${recipe.id}`, {
        name,
        gateauImgUrl,
      });
      onRecipeUpdated();
      onClose();
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la recette', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Modifier la recette</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de la recette"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            value={gateauImgUrl}
            onChange={(e) => setGateauImgUrl(e.target.value)}
            placeholder="URL de l'image"
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipeModal;