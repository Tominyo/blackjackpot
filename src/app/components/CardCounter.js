const CardCounter = ({ count }) => {
    const getColor = () => (count > 0 ? "text-green-600" : count < 0 ? "text-red-600" : "text-gray-600");
  
    return (
      <div>
        <p className={`text-2xl font-bold ${getColor()}`}>Compteur : {count}</p>
      </div>
    );
  };

  export default CardCounter