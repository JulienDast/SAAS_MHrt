import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddIngredientModal from './AddIngredientModal'; 

const IngredientsList: React.FC = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}ingredient`);
        setIngredients(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des ingrédients.');
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleIngredientAdded = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}ingredient`);
      setIngredients(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des ingrédients.', err);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  const sortedIngredients = [...ingredients].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="p-4 mt-16 text-center mx-auto"> 
      <h1 className="text-3xl mb-8 font-bold">
        Mes ingrédients
      </h1>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-green-500 hover:bg-green-600 active:bg-green-700 font-mono text-center text-xl md:text-3xl text-white p-2 rounded"
      >
        + Ajouter un ingrédient
      </button>
      <table className="min-w-full bg-white border border-gray-300 mt-16">
        <thead>
          <tr className='bg-rose-300'>
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Prix / Unité</th>
            <th className="py-2 px-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {sortedIngredients.map((ingredient) => (
            <tr key={ingredient.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b h-16">
                <Link to={`/ingredients/${ingredient.id}`} className="text-blue-500 hover:underline">
                  {ingredient.name}
                </Link>
              </td>
              <td className="py-2 px-4 border-b h-16">{ingredient.price}€ / {ingredient.unity}</td>
              <td className="py-2 px-4 border-b h-16 overflow-hidden">
                <div className="line-clamp-1">{ingredient.description}</div>
              </td>            
            </tr>
          ))}
        </tbody>
      </table>

      <AddIngredientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onIngredientAdded={handleIngredientAdded} 
      />
    </div>
  );
};

export default IngredientsList;