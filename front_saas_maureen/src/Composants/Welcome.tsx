import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-cursive text-7xl md:text-9xl text-center mt-32">
        Hola Maoline !
      </h1>
      <img className='h-64 w-64' src='https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-cupcake-png-with-ai-generated-png-image_11571382.png' alt='Cupcake'/>
    </div>
  );
};

export default Welcome;