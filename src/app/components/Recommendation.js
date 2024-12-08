import React from 'react';

const Recommendation = ({ playerHand, dealerCard }) => {
    let advice;

    if (playerHand < 17) {
      advice = "Tirez une carte.";
    } else if (playerHand >= 17 && playerHand < 21) {
      advice = "Restez.";
    } else if (playerHand === 21) {
      advice = "Blackjack ! Vous avez gagné !";
    } else {
      advice = "Vous avez dépassé 21. Vous avez perdu.";
    }
  
    return (
      <div>
        <p className="text-lg font-medium">
          Carte du croupier : {dealerCard}
        </p>
        <p className="text-lg font-medium">
          Votre main : {playerHand}
        </p>
        <p className="text-xl font-bold text-green-700 mt-4">{advice}</p>
      </div>
    );
};

export default Recommendation;