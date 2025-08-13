import LoanForm from "./LoanForm";
import SuccessModal from "./SuccessModal";
import { useState } from "react";

interface LoanFormModalProps {
  showModal: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function LoanFormModal({
  showModal,
  onClose,
  onCreated,
}: LoanFormModalProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 overflow-visible">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-50 h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-200 hover:bg-gray-50"
          aria-label="Chiudi"
        >
          ✕
        </button>
        <LoanForm
          onCreated={() => {
            onCreated();
            setShowSuccessModal(true);
          }}
        />
        <SuccessModal
          show={showSuccessModal}
          message="Richiesta inviata con successo!"
          onClose={() => {
            setShowSuccessModal(false);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
