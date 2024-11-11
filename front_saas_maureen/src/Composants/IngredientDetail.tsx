import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import EditIngredientModal from './EditIngredientModal'; 

const IngredientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [ingredient, setIngredient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  useEffect(() => {
    const fetchIngredientDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}ingredient/${id}`);
        setIngredient(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des détails de l\'ingrédient.');
      } finally {
        setLoading(false);
      }
    };

    fetchIngredientDetail();
  }, [id]);

  const handleDeleteIngredient = async () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet ingrédient ? Cette action supprimera également l'ingrédient de toutes les recettes associées !");
    
    if (isConfirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}ingredient/${id}`);
        alert('Ingrédient supprimé avec succès !');
        window.location.href = '/ingredients'; 
      } catch (err) {
        console.error('Erreur lors de la suppression de l\'ingrédient.', err);
        alert('Erreur lors de la suppression de l\'ingrédient.');
      }
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 mt-16">
        {ingredient && (
          <div className="bg-white rounded-lg shadow-md p-6 flex w-full flex-col items-center justify-center">
            <h1 className="text-3xl md:text-6xl font-cursive font-bold my-16 text-center">{ingredient.name}</h1>
            <img 
              src={ingredient.imageUrl || "https://echosverts.com/wp-content/uploads/2021/10/Basics-cuisine-vegane.png"} 
              alt={ingredient.name}
              className="mb-4 w-64 h-64 object-cover rounded"
            />
            <p className="text-lg mb-2">
              <strong>Prix :</strong> {ingredient.price}€ / {ingredient.unity}
            </p>
            <p className="text-gray-700">Description : {ingredient.description}</p>

            <div className="flex space-x-4 mt-4">
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 font-mono text-center text-xl md:text-3xl mb-8 md:mr-8 text-white p-2 rounded"
              >
                Modifier
              </button>
              <button 
                onClick={handleDeleteIngredient} 
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 font-mono text-center text-xl md:text-3xl mb-8 md:mr-8 text-white p-2 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        )}
        <div className="my-8 text-center">
          <Link to="/ingredients" className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 font-mono text-center text-xl md:text-3xl text-white p-2 rounded">
            Retour aux ingrédients
          </Link>
        </div>
      </div>

      {ingredient && (
        <EditIngredientModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          ingredient={ingredient} 
          onIngredientUpdated={() => {
             window.location.reload(); 
           }} 
        />
      )}
    </>
  );
};

export default IngredientDetail;