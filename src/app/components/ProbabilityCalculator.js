const ProbabilityCalculator = ({ deck, targetCard }) => {
    const totalCards = Object.values(deck).reduce((acc, val) => acc + val, 0);
    const probability = ((deck[targetCard] || 0) / totalCards) * 100;
  
    return (
      <div>
        <p>Probabilité de tirer un {targetCard} :</p>
        <div className="w-full bg-gray-200 rounded h-4 mt-2">
          <div 
            className="bg-blue-500 h-4 rounded" 
            style={{ width: `${probability}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">{probability.toFixed(2)}%</p>
      </div>
    );
  };

  export default ProbabilityCalculator