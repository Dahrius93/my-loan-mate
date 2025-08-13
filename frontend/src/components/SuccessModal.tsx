import ModalPortal from "./ModalPortal";

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({
  show,
  onClose,
  message,
}: SuccessModalProps) {
  if (!show) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
          <p className="text-lg font-semibold mb-4">{message}</p>
          <img
            src="/src/assets/AffareFatto.png"
            alt=""
            className="w-64 mx-auto mt-12 m-4"
          />
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ok
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}
