import React from 'react';

const Controls = ({ resetGame, drawCard }) => (
<div className="flex flex-col gap-4">
      {/* Bouton pour tirer une carte */}
      <button
        onClick={() => drawCard(7)} // Exemple avec une carte fixe
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Tirer une carte
      </button>

      {/* Bouton pour réinitialiser */}
      <button
        onClick={resetGame}
        className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700"
      >
        Réinitialiser le jeu
      </button>
    </div>
);

export default Controls;