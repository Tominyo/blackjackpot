"use client";

import Deck from "./components/Deck";
import CardCounter from "./components/CardCounter";
import ProbabilityCalculator from "./components/ProbabilityCalculator";
import Recommendation from "./components/Recommendation";
import Controls from "./components/Controls";
import ProbabilityOptions from "./components/ProbabilityOptions";
import { useState, useEffect } from "react";

export default function Home() {
  const [deck, setDeck] = useState({
    1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4, 10: 16,
  });
  const [count, setCount] = useState(0);
  const [drawnCards, setDrawnCards] = useState([]); // Stocker toutes les cartes tirées
  const [probabilityResult, setProbabilityResult] = useState(null);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);

  const totalCardsLeft = Object.values(deck).reduce((sum, qty) => sum + qty, 0);
  const totalValueLeft = Object.entries(deck).reduce(
    (sum, [card, qty]) => sum + card * qty,
    0
  );
    
  useEffect(() => {
    if (dealerHand.length > 0) {
      alert(checkWinner());
    }
  }, [dealerScore, drawnCards]);
  

  const calculateProbability = ({ number, comparison }) => {
    let totalCards = Object.values(deck).reduce((sum, count) => sum + count, 0);
    let favorableCards = 0;

    Object.entries(deck).forEach(([card, qty]) => {
      card = parseInt(card);
      if (
        (comparison === ">" && card > number) ||
        (comparison === "=" && card === number) ||
        (comparison === "<" && card < number)
      ) {
        favorableCards += qty;
      }
    });

    const probability = (favorableCards / totalCards) * 100;
    setProbabilityResult(probability.toFixed(2));
  };

  const drawCard = (card) => {
    if (deck[card] > 0) {
      setDeck((prevDeck) => ({
        ...prevDeck,
        [card]: prevDeck[card] - 1,
      }));
      setDrawnCards((prev) => [...prev, card]); // Ajouter la carte au tableau
      updateCount(card);
    }
  };

  const drawRandomCard = () => {
    const cards = Object.entries(deck).filter(([_, count]) => count > 0);
    if (cards.length === 0) {
      alert("Le deck est vide !");
      return;
    }

    const totalCards = cards.reduce((sum, [_, count]) => sum + count, 0);
    let randomIndex = Math.floor(Math.random() * totalCards);

    for (const [card, count] of cards) {
      if (randomIndex < count) {
        drawCard(parseInt(card));
        return;
      }
      randomIndex -= count;
    }
  };

  const updateCount = (card) => {
    if (card >= 2 && card <= 6) setCount((prev) => prev + 1);
    else if (card === 10 || card === 1) setCount((prev) => prev - 1);
  };

  const resetGame = () => {
    setDeck({
      1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4, 10: 16,
    });
    setCount(0);
    setDrawnCards([]); // Réinitialiser les cartes tirées
    setDealerHand([]);
    setDealerScore(0);
    setProbabilityResult(null);
  };

  const handleStay = () => {
    let updatedDealerHand = [...dealerHand];
    let deckCopy = { ...deck };
  
    while (calculateScore(updatedDealerHand) < 17) {
      // Tirage d'une carte aléatoire
      const cardKeys = Object.keys(deckCopy).filter((key) => deckCopy[key] > 0);
      if (cardKeys.length === 0) break; // Plus de cartes disponibles
  
      const randomIndex = Math.floor(Math.random() * cardKeys.length);
      const drawnCard = parseInt(cardKeys[randomIndex]);
  
      // Mise à jour de la main du croupier
      updatedDealerHand.push(drawnCard);
      deckCopy[drawnCard] -= 1;
    }
  
    setDealerHand(updatedDealerHand);
    setDealerScore(calculateScore(updatedDealerHand));
    setDeck(deckCopy);
  
    alert("Le croupier a terminé son tour !");
  };

  const calculateScore = (hand) => {
    let score = 0;
    let aces = 0;
  
    // Additionnez les cartes, comptez les As séparément
    hand.forEach((card) => {
      if (card === 1) {
        aces += 1;
        score += 11; // Comptez les As comme 11 par défaut
      } else if (card >= 10) {
        score += 10; // 10, J, Q, K comptent pour 10
      } else {
        score += card; // Autres cartes conservent leur valeur nominale
      }
    });
  
    // Ajustez les As si le score dépasse 21
    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }
  
    return score;
  };

  const checkWinner = () => {
    const playerScore = calculateScore(drawnCards);
    if (playerScore > 21) return "Le joueur a dépassé 21. Le croupier gagne !";
    if (dealerScore > 21) return "Le croupier a dépassé 21. Le joueur gagne !";
    if (dealerScore > playerScore) return "Le croupier gagne !";
    if (dealerScore < playerScore) return "Le joueur gagne !";
    return "Égalité !";
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Blackjack Assistant</h1>
        <p className="text-sm text-gray-600">
          Optimisez vos choix grâce à la stratégie et les probabilités
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section Deck */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Deck</h2>
          <Deck deck={deck} drawCard={drawCard} />
          <p className="text-sm text-gray-500 mt-4">
            Cartes restantes : {totalCardsLeft} - Valeur totale : {totalValueLeft}
          </p>
        </section>

        {/* Section Card Counter */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Compteur de Cartes</h2>
          <CardCounter count={count} />
        </section>

        {/* Section Probability Calculator */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Probabilités</h2>
          <ProbabilityOptions calculateProbability={calculateProbability} />
          {probabilityResult !== null && (
            <div className="border p-4 rounded shadow-md bg-green-50 mt-4">
              <p className="text-lg font-medium">
                Résultat : {probabilityResult}% de chance.
              </p>
            </div>
          )}
        </section>

        {/* Section Recommendation */}
        <section className="bg-white rounded-lg shadow p-6">
        <Recommendation 
          playerHand={drawnCards.reduce((sum, card) => sum + card, 0)} 
          dealerCard={drawnCards[0] || 7} 
        />
          {drawnCards.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Cartes tirées :</h3>
              <ul className="flex flex-wrap gap-2 mt-2">
                {drawnCards.map((card, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow"
                  >
                    {card}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Main du Croupier</h2>
        <div className="flex gap-2">
          {dealerHand.map((card, index) => (
            <span key={index} className="px-2 py-1 border rounded bg-gray-100">
              {card}
            </span>
          ))}
        </div>
        <p className="mt-4">Score du croupier : {dealerScore}</p>
      </section>

        {/* Section Controls */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <Controls
            resetGame={resetGame}
            drawCard={() => drawCard(7)}
            drawRandomCard={drawRandomCard}
            stay={handleStay} 
          />
        </section>
      </main>

      <footer className="text-center mt-12 text-gray-500 text-sm">
        Blackjack Assistant © 2024 - TM Développeur
      </footer>
    </div>
  );
}