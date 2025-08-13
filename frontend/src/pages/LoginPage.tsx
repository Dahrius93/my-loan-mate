import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

interface Props {
  onLogged: (
    token: string,
    isAdmin: boolean,
    email: string,
    nome: string
  ) => void;
}

export default function LoginPage({ onLogged }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      sessionStorage.setItem("nome", data.nome);
      onLogged(data.token, data.is_staff, email, data.nome);
    } catch {
      setError("Login fallito");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2 tracking-tight">
        MyLoanMate
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Accedi al tuo account per continuare
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-center">
            {error}
          </p>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="esempio@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 pr-10 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              @
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 pr-10 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              🔒
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-colors duration-200 shadow-sm"
        >
          Accedi
        </button>

        <div className="flex flex-col space-y-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full text-blue-700 hover:text-blue-800 hover:bg-blue-50 font-medium py-3 rounded-2xl transition-colors duration-200"
          >
            Torna alla home
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full text-white bg-green-600 hover:bg-green-700 font-medium py-3 rounded-2xl transition-colors duration-200"
          >
            Registrati
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-xs text-gray-500">
        Accedendo dichiari di aver letto e accettato le informative applicabili.
      </p>
    </div>
  );
}
