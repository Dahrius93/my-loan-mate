import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  type RegisterPayload,
} from "../services/api";

export default function UserUpdate() {
  const [form, setForm] = useState<RegisterPayload & { email: string }>({
    email: "",
    password: "",
    nome: "",
    cognome: "",
    citta: "",
    via: "",
    telefono: "",
    carta_identita: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getProfile();
      setForm({
        email: data.email,
        password: "",
        nome: data.nome,
        cognome: data.cognome,
        citta: data.citta,
        via: data.via,
        telefono: data.telefono,
        carta_identita: data.carta_identita,
      });
    }
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      setMessage("Profilo aggiornato");
    } catch {
      setMessage("Errore aggiornamento profilo");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Profilo utente</h2>
      {message && <p className="text-center mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          name="email"
          value={form.email}
          disabled
          className="border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
        />
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Nome"
        />
        <input
          type="text"
          name="cognome"
          value={form.cognome}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Cognome"
        />
        <input
          type="text"
          name="citta"
          value={form.citta}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Città"
        />
        <input
          type="text"
          name="via"
          value={form.via}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Via"
        />
        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Telefono"
        />
        <input
          type="text"
          name="carta_identita"
          value={form.carta_identita}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Carta identità"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Nuova password (opzionale)"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Salva modifiche
        </button>
      </form>
    </div>
  );
}
