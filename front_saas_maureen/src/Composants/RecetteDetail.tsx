import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Modal from './ModalIngredients'; 
import EditRecipeModal from './EditRecetteModal';

const RecetteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [recette, setRecette] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]); 
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [showDropdown, setShowDropdown] = useState<boolean>(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecetteDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recette/${id}`);
        setRecette(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des détails de la recette.');
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ingredient'); 
        setProducts(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des ingrédients.', err);
      }
    };

    fetchRecetteDetail();
    fetchProducts();
  }, [id]);

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (selectedProductId && quantity > 0) {
      try {
        await axios.post(`http://localhost:5000/recette_ingredient/${id}`, {
          productId: selectedProductId,
          quantity,
        });
        
        if (recette) {
          const newIngredient = products.find(product => product.id === selectedProductId);
          if (newIngredient) {
            setRecette((prevRecette: { products: any; }) => ({
              ...prevRecette,
              products: [
                ...prevRecette.products,
                { ...newIngredient, quantity } 
              ]
            }));
          }
        }
        setSelectedProductId(null);
        setQuantity(0);
        setSearchTerm(''); 
        setShowDropdown(false); 
        setIsModalOpen(false); 
      } catch (err) {
        console.error('Erreur lors de l\'ajout de l\'ingrédient.', err);
        setMessage('Erreur lors de l\'ajout de l\'ingrédient.');
      }
    } else {
      setMessage('Veuillez sélectionner un produit et entrer une quantité valide.');
    }
  };

  const handleDeleteIngredient = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:5000/recette_ingredient/${id}`, {
        data: { productId },
      });

      setRecette((prevRecette: any) => ({
        ...prevRecette,
        products: prevRecette.products.filter((product: any) => product.id !== productId),
      }));

    } catch (err) {
      console.error('Erreur lors de la suppression de l\'ingrédient.', err);
      setMessage('Erreur lors de la suppression de l\'ingrédient.');
    }
  };

  const handleDeleteRecette = async () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?");
    
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/recette/${id}`);
        alert('Recette supprimée avec succès !');
        window.location.href = '/recettes'; 
      } catch (err) {
        console.error('Erreur lors de la suppression de la recette.', err);
        alert('Erreur lors de la suppression de la recette.');
      }
    }
  };

  const handleRecipeUpdated = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recette/${id}`);
      setRecette(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des détails de la recette mise à jour.', err);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="p-4 mt-16">
        {recette && (
          <div className="bg-white rounded-lg text-center shadow-md p-6">
            <h1 className="text-7xl md:text-9xl font-cursive font-bold my-16 text-center">{recette.name}</h1>
            <div className="my-8">
            <button 
              onClick={() => setIsEditModalOpen(true)} 
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 font-mono text-center text-xl md:text-3xl mb-8 md:mr-8 text-white p-2 rounded"
            >
              Modifier la recette
            </button>
            {recette && (
              <EditRecipeModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                recipe={recette}
                onRecipeUpdated={handleRecipeUpdated}
              />
            )}
            <button 
              onClick={handleDeleteRecette} 
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 font-mono text-center text-xl md:text-3xl text-white p-2 rounded"
            >
              Supprimer cette recette
            </button>
            </div>
            {(() => {
              const totalPrice = recette.products.reduce((total: number, product: any) => {
                return total + (product.price * product.quantity);
              }, 0);
              return (
                <div className="mb-4 text-2xl font-bold">
                  <span className='underline'>Prix total du gâteau</span> : {totalPrice.toFixed(2)}€💶💰🤑
                </div>
              );
            })()}
            <img className='my-16 w-full h-64 object-cover rounded' src={recette.gateauImgUrl} alt={recette.name}/>
            <h2 className="text-2xl font-semibold mb-6"><span className='underline'>Liste des ingrédients</span> :</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recette.products.map((product: any) => (
                <div key={product.id} className="bg-gray-100 rounded-lg shadow-md p-4 relative w-full">
                  <h3 className="font-semibold mb-4 text-lg">{product.name}</h3>
                  {product.imageUrl !== null ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="mb-2 w-full h-32 object-cover rounded" 
                    />
                  ) : (
                    <img 
                      src="https://echosverts.com/wp-content/uploads/2021/10/Basics-cuisine-vegane.png"  
                      alt={product.name} 
                      className="mb-2 w-full h-32 object-cover rounded" 
                    />
                  )}
                  <p><strong>Prix :</strong> {product.price}€ /{product.unity}</p>
                  <p><strong>Quantité :</strong> {product.quantity}</p>
                  <p><strong>Coût pour la recette :</strong> {(product.price * product.quantity).toFixed(2)}€</p>
                  <p><strong>Description :</strong> {product.description}</p>
                  
                  <button onClick={() => handleDeleteIngredient(product.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                    🗑️ 
                  </button>
                </div>
              ))}
            </div>
            
            <button onClick={() => setIsModalOpen(true)} className="bg-green-500 hover:bg-green-600 active:bg-green-700 font-mono text-center text-xl md:text-3xl text-white p-2 rounded mt-8">
              + Ajouter un ingrédient
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <h2 className="text-xl font-semibold mb-4">Sélectionner un ingrédient</h2>
              {message && <p className="text-green-500">{message}</p>}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value === '') {
                    setShowDropdown(false); 
                  } else {
                    setShowDropdown(true); 
                  }
                }}
                placeholder="Rechercher un ingrédient"
                className="border rounded p-2 w-full"
              />
              
              {showDropdown && searchTerm && filteredProducts.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded mt-1 z-10 max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <li 
                      key={product.id} 
                      onClick={() => {
                        setSelectedProductId(product.id); 
                        setSearchTerm(product.name + " / " + product.unity);
                        setShowDropdown(false); 
                      }} 
                      className="cursor-pointer hover:bg-gray-100 p-2"
                    >
                      {product.name} / {product.unity}
                    </li>
                  ))}
                </ul>
              )}

              <input
                type="number"
                min="0.01"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Quantité"
                className="border rounded p-2 mt-4 w-full"
              />
              
              <button onClick={handleAddIngredient} className="bg-green-500 text-white p-2 rounded mt-4 w-full">
                Ajouter à la recette
              </button>
              <button onClick={() => setIsModalOpen(false)} className="mt-2 text-red-500 hover:underline">
                Annuler
              </button>
            </Modal>

          </div>
        )}
        <div className="my-8 text-center">
          <Link to="/recettes" className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 font-mono text-center text-xl md:text-3xl text-white p-2 rounded">
            Retour aux recettes
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecetteDetail;