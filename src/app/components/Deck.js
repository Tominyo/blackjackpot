const Deck = ({ deck, drawCard }) => {
    return (
      <div>
        {Object.keys(deck).map((card) => (
          <div key={card} className="flex justify-between items-center py-1">
            <span>Carte {card} :</span>
            <span>{deck[card]} restantes</span>
            <button 
              onClick={() => drawCard(Number(card))} 
              className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-700"
            >
              Tirer
            </button>
          </div>
        ))}
      </div>
    );
  };

  export default Deck;