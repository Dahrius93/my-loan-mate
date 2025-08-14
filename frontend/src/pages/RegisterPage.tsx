import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

interface Props {
  onRegistered: (token: string, email: string) => void;
}

export default function RegisterPage({ onRegistered }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [citta, setCitta] = useState("");
  const [via, setVia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cartaIdentita, setCartaIdentita] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await register({
        email,
        password,
        nome,
        cognome,
        citta,
        via,
        telefono,
        carta_identita: cartaIdentita,
      });
      onRegistered(token, email);
    } catch {
      setError("Registrazione fallita");
    }
  };

  return (
    <div>
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-24">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          MyLoanMate
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            type="email"
            required
            autoComplete="email"
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            required
            autoComplete="given-name"
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="text"
            required
            autoComplete="family-name"
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="Cognome"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
          />

          <input
            type="text"
            required
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="Comune di residenza"
            value={citta}
            onChange={(e) => setCitta(e.target.value)}
          />

          <input
            type="text"
            required
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="Indirizzo (Via e numero civico)"
            value={via}
            onChange={(e) => setVia(e.target.value)}
          />

          <input
            type="tel"
            required
            pattern="[0-9]{6,15}"
            title="Inserisci un numero valido (6-15 cifre)"
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="Telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <input
            type="text"
            required
            maxLength={24}
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="Numero carta d'identità"
            value={cartaIdentita}
            onChange={(e) => setCartaIdentita(e.target.value)}
          />

          <input
            type="password"
            required
            autoComplete="new-password"
            minLength={6}
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="Password (minimo 6 caratteri)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Registrati
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}
