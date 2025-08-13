import { useState } from "react";
import { createLoanRequest } from "../services/api";

interface LoanFormProps {
  onCreated: () => void;
  onClose?: () => void;
}

export default function LoanForm({ onCreated, onClose }: LoanFormProps) {
  const [importo, setImporto] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(importo);
    if (!amount || !motivo) return;
    await createLoanRequest({ importo: amount, motivo });
    setImporto("");
    setMotivo("");
    onCreated();
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 z-20"
        >
          ✕
        </button>
      )}
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 tracking-tight">
        Nuova richiesta
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Importo{" "}
            <span className="text-gray-500 font-normal">(max 10.000.000€)</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              €
            </span>
            <input
              type="number"
              value={importo}
              onChange={(e) => setImporto(e.target.value)}
              min="100"
              max="10000000"
              step="100.00"
              required
              placeholder="Es. 25.000"
              className="w-full rounded-2xl border border-gray-300 bg-gray-50 pl-8 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm"
            />
          </div>
          <p className="text-xs text-gray-500">Importo richiesto in euro.</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Motivo{" "}
            <span className="text-gray-500 font-normal">
              (max 50 caratteri)
            </span>
          </label>
          <input
            type="text"
            value={motivo}
            onChange={(e) => {
              if (e.target.value.length <= 50) setMotivo(e.target.value);
            }}
            maxLength={50}
            required
            placeholder="Es. Ristrutturazione, attrezzature, liquidità"
            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Descrizione sintetica del fabbisogno.</span>
            <span>{motivo.length}/50</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-colors duration-200 shadow-sm"
        >
          Invia richiesta
        </button>
      </form>
    </div>
  );
}
