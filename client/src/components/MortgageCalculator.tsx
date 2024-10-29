import React, { useState } from "react";
import MortgageForm from "./MortgageForm";
import ResultModal from "./ResultModal";

const MortgageCalculator: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentResult, setPaymentResult] = useState<number | null>(null);

  const handleResult = (result: number) => {
    setPaymentResult(result);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPaymentResult(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-4">Mortgage Calculator</h2>
        <MortgageForm onResult={handleResult} />
      </div>
      <ResultModal isOpen={modalOpen} result={paymentResult} onClose={closeModal} />
    </div>
  );
};

export default MortgageCalculator;
