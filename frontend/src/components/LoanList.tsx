import { useEffect, useState } from "react";
import { getLoanRequests, updateLoanRequest } from "../services/api";

export interface LoanRequest {
  id: number;
  importo: number;
  motivo: string;
  data_richiesta: string;
  data_esito: string | null;
  stato: string;
  user: {
    id: number;
    email: string;
    nome: string;
    cognome: string;
    citta: string;
    via: string;
    telefono: string;
    carta_identita: string;
  };
}

interface LoanListProps {
  isAdmin: boolean;
  onNewRequest?: () => void;
  onUserClick?: (user: LoanRequest["user"]) => void;
}

export default function LoanList({
  isAdmin,
  onNewRequest,
  onUserClick,
}: LoanListProps) {
  const [loans, setLoans] = useState<LoanRequest[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getLoanRequests();
      const sorted = data.sort(
        (a: LoanRequest, b: LoanRequest) =>
          new Date(b.data_richiesta).getTime() -
          new Date(a.data_richiesta).getTime()
      );
      setLoans(sorted);
    })();
  }, []);

  const handleStatus = async (id: number, status: string) => {
    await updateLoanRequest(id, status);
    const data = await getLoanRequests();
    const sorted = data.sort(
      (a: LoanRequest, b: LoanRequest) =>
        new Date(b.data_richiesta).getTime() -
        new Date(a.data_richiesta).getTime()
    );
    setLoans(sorted);
  };

  const statusClass = (status: string) => {
    if (status === "in attesa")
      return "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200";
    if (status === "approvata")
      return "bg-green-50 text-green-700 ring-1 ring-green-200";
    if (status === "rifiutata")
      return "bg-red-50 text-red-700 ring-1 ring-red-200";
    return "bg-gray-50 text-gray-700 ring-1 ring-gray-200";
  };

  return (
    <div className="w-full overflow-x-auto mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Tutte le richieste
        </h2>
        {onNewRequest && (
          <button
            onClick={onNewRequest}
            className="px-5 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors duration-200"
          >
            + Nuova richiesta
          </button>
        )}
      </div>

      <table className="min-w-[860px] w-full text-sm">
        <thead className="sticky top-0 bg-gray-50/80 backdrop-blur-sm">
          <tr className="h-14">
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Utente
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Importo
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Motivo
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Inoltrata
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Esito
            </th>
            <th className="px-4 py-2 text-center font-semibold text-gray-700">
              {isAdmin ? "Azione" : "Stato"}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loans.map((loan) => (
            <tr key={loan.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <button
                  onClick={() => onUserClick?.(loan.user)}
                  className="text-blue-700 hover:text-blue-800 hover:underline font-medium"
                >
                  {loan.user.email}
                </button>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                {loan.importo.toFixed(2)} €
              </td>
              <td className="px-4 py-3 max-w-xs text-gray-700">
                {loan.motivo}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                {new Date(loan.data_richiesta).toLocaleDateString("it-IT")}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                {loan.data_esito
                  ? new Date(loan.data_esito).toLocaleDateString("it-IT")
                  : "-"}
              </td>
              <td className="px-4 py-3">
                {isAdmin && loan.stato === "in attesa" ? (
                  <div className="flex items-center gap-2 justify-center">
                    <button
                      className="w-24 bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm rounded-full py-1.5"
                      onClick={() => handleStatus(loan.id, "approvata")}
                    >
                      Approva
                    </button>
                    <button
                      className="w-24 bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm rounded-full py-1.5"
                      onClick={() => handleStatus(loan.id, "rifiutata")}
                    >
                      Rifiuta
                    </button>
                  </div>
                ) : (
                  <span
                    className={`inline-flex items-center justify-center w-24 px-3 py-1.5 rounded-full text-sm capitalize ${statusClass(
                      loan.stato
                    )}`}
                  >
                    {loan.stato}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
