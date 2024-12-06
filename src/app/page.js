"use client"

import Deck from "./components/Deck";
import CardCounter from "./components/CardCounter";
import ProbabilityCalculator from "./components/ProbabilityCalculator";
import Recommendation from "./components/Recommendation";
import Controls from "./components/Controls";
import { useState } from "react";
import ProbabilityOptions from "./components/ProbabilityOptions";

export default function Home() {
  const [deck, setDeck] = useState({
    1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4, 10: 16,
  });
  const [count, setCount] = useState(0);
  const [drawnCard, setDrawnCard] = useState(null);
  const [probabilityResult, setProbabilityResult] = useState(null); // Stocker le résultat des probabilités

  // Fonction pour calculer les probabilités
  const calculateProbability = ({ number, comparison }) => {
    // Exemple simple : simulation de la probabilité basée sur les critères
    let probability = 0;

    if (comparison === ">") {
      probability = ((13 - number) / 13) * 100; // Probabilité d'avoir un nombre supérieur
    } else if (comparison === "=") {
      probability = (1 / 13) * 100; // Probabilité d'avoir exactement ce nombre
    } else if (comparison === "<") {
      probability = ((number - 1) / 13) * 100; // Probabilité d'avoir un nombre inférieur
    }

    // Stocker le résultat
    setProbabilityResult(probability.toFixed(2));
  };


  const drawCard = (card) => {
    if (deck[card] > 0) {
      setDeck((prevDeck) => ({
        ...prevDeck,
        [card]: prevDeck[card] - 1,
      }));
      setDrawnCard(card);
      updateCount(card);
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
    setDrawnCard(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Blackjack Assistant</h1>
        <p className="text-sm text-gray-600">Optimisez vos choix grâce à la stratégie et les probabilités</p>
      </header>
      
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section Deck */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Deck</h2>
          <Deck deck={deck} drawCard={drawCard} />
        </section>

        {/* Section Card Counter */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Compteur de Cartes</h2>
          <CardCounter count={count} />
        </section>

        {/* Section Probability Calculator */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Probabilités</h2>
          <ProbabilityCalculator deck={deck} targetCard={7} />
          
          <div className="grid grid-cols-1 gap-8 p-8">
          {/* Section Critères de Probabilité */}
          <ProbabilityOptions calculateProbability={calculateProbability} />

          {/* Résultat de la probabilité */}
          {probabilityResult !== null && (
            <div className="border p-4 rounded shadow-md bg-green-50">
              <p className="text-lg font-medium">
                Résultat : {probabilityResult}% de chance.
              </p>
            </div>
          )}
        </div>
        </section>

        {/* Section Recommendation */}
        <section className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recommandations</h2>
          <Recommendation playerHand={15} dealerCard={drawnCard || 7} />
        </section>

        {/* Section Controls */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <Controls resetGame={resetGame} drawCard={() => drawCard(7)} />
        </section>
      </main>

      <footer className="text-center mt-12 text-gray-500 text-sm">
        Blackjack Assistant © 2024 - Par vos soins
      </footer>
    </div>
  );
}