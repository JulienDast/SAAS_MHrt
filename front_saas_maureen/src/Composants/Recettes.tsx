import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddRecipeModal from './AddRecipeModal';

const Recettes: React.FC = () => {
  const [recettes, setRecettes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recette');
        const sortedRecettes = response.data.sort((a: any, b: any) => 
          a.name.localeCompare(b.name)
        );
        setRecettes(sortedRecettes);
      } catch (err) {
        setError('Erreur lors de la récupération des recettes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecettes();
  }, []);

  const handleRecipeAdded = async () => {
    try {
      const response = await axios.get('http://localhost:5000/recette');
      const sortedRecettes = response.data.sort((a: any, b: any) => 
        a.name.localeCompare(b.name)
      );
      setRecettes(sortedRecettes);
    } catch (err) {
      console.error('Erreur lors de la récupération des recettes.', err);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 mt-16 text-center mx-auto">
      <h1 className="text-3xl mb-8 font-bold">
        Mes recettes
      </h1>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-green-500 hover:bg-green-600 active:bg-green-700 font-mono text-center text-xl md:text-3xl text-white p-2 rounded"
      >
        + Ajouter une recette
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-16 justify-items-center">
        {recettes.map((recette) => (
          <Link 
            to={`/recettes/${recette.id}`} 
            key={recette.id} 
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 w-full"
          >
            <h2 className="font-semibold font-cursive text-3xl mb-4 h-16 flex items-center justify-center">
              {recette.name}
            </h2>
            <img 
              className='h-48 w-full object-cover rounded' 
              src={recette.gateauImgUrl} 
              alt={recette.name} 
            />
          </Link>
        ))}
      </div>

      <AddRecipeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRecipeAdded={handleRecipeAdded} 
      />
    </div>
  );
};

export default Recettes;