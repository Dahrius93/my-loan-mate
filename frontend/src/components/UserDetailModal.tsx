import LoanChart from "./LoanChart";
import ModalPortal from "./ModalPortal";

interface UserModalProps {
  onClose: () => void;
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

export function UserDetailModal({ onClose, user }: UserModalProps) {
  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[101] grid place-items-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="user-modal-title"
          className="relative w-[min(92vw,900px)] max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl ring-1 ring-gray-200 p-6"
        >
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50"
          >
            ✕
          </button>

          <h2
            id="user-modal-title"
            className="text-2xl font-bold text-center text-gray-900"
          >
            Dati utente
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            <dl className="space-y-3">
              <div className="grid grid-cols-3 items-baseline">
                <dt className="col-span-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </dt>
                <dd className="col-span-2 text-gray-900">{user.email}</dd>
              </div>
              <div className="grid grid-cols-3 items-baseline">
                <dt className="col-span-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Cognome
                </dt>
                <dd className="col-span-2 text-gray-900">{user.cognome}</dd>
              </div>
              <div className="grid grid-cols-3 items-baseline">
                <dt className="col-span-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Via
                </dt>
                <dd className="col-span-2 text-gray-900">{user.via}</dd>
              </div>
              <div className="grid grid-cols-3 items-baseline">
                <dt className="col-span-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Carta identità
                </dt>
                <dd className="col-span-2 text-gray-900">
                  {user.carta_identita}
                </dd>
              </div>
            </dl>
            <dl className="space-y-3">
              <div className="grid grid-cols-3 items-baseline">
                <dt className="col-span-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Nome
                </dt>
                <dd className="col-span-2 text-gray-900">{user.nome}</dd>
              </div>
              <div className="grid grid-cols-3 items-baseline">
                <dt className="col-span-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Città
                </dt>
                <dd className="col-span-2 text-gray-900">{user.citta}</dd>
              </div>
              <div className="grid grid-cols-3 items-baseline">
                <dt className="col-span-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Telefono
                </dt>
                <dd className="col-span-2 text-gray-900">{user.telefono}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 border-t border-gray-200" />
          <div className="mt-4 mx-auto w-full max-w-3xl">
            <LoanChart userId={user.id} />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
