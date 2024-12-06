import React from 'react';

const Recommendation = ({ playerHand, dealerCard }) => {
    const recommendAction = () => {
        if (dealerCard >= 2 && dealerCard <= 6 && playerHand >= 12) {
            return "Rester";
        }
        if (dealerCard >= 7 && playerHand <= 16) {
            return "Tirer";
        }
        return "Suivre la stratégie de base";
    };

    return (
        <div>
            Recommandation : {recommendAction()}
        </div>
    );
};

export default Recommendation;