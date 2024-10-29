import React from "react";

interface ResultModalProps {
  isOpen: boolean;
  result: number | null;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, result, onClose }) => {
  if (!isOpen || result === null) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-xl font-semibold text-center mb-4">Calculation Result</h3>
        <p className="text-center text-lg">
          Payment per period: <span className="font-bold">${result.toFixed(2)}</span>
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
