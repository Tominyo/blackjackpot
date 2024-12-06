import { useState } from "react";

const ProbabilityOptions = ({ calculateProbability }) => {
  const [number, setNumber] = useState(7); // Nombre à comparer (exemple initial : 7)
  const [comparison, setComparison] = useState(">"); // Type de comparaison (exemple initial : >)

  const handleSubmit = () => {
    calculateProbability({ number, comparison }); // Appel de la fonction pour calculer les probabilités
  };

  return (
    <div className="flex flex-col gap-4 border p-4 rounded shadow-md bg-gray-50">
      <h3 className="font-semibold text-lg">Critères de Probabilité</h3>

      {/* Sélection du nombre */}
      <div className="flex items-center gap-2">
        <label htmlFor="number" className="font-medium">
          Nombre :
        </label>
        <input
          type="number"
          id="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value, 10))}
          className="border rounded px-2 py-1 w-16"
          min={1}
          max={13}
        />
      </div>

      {/* Sélection du type de comparaison */}
      <div className="flex items-center gap-2">
        <label htmlFor="comparison" className="font-medium">
          Comparaison :
        </label>
        <select
          id="comparison"
          value={comparison}
          onChange={(e) => setComparison(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value=">">Supérieur à</option>
          <option value="=">Égal à</option>
          <option value="<">Inférieur à</option>
        </select>
      </div>

      {/* Bouton pour valider */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Calculer la probabilité
      </button>
    </div>
  );
};

export default ProbabilityOptions;