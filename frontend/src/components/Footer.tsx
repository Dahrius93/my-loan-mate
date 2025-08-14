import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-12 pt-10 pb-6">
      {/* Contenuto principale */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo e descrizione */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">MyLoanMate</h2>
          <p className="text-sm leading-relaxed">
            Soluzioni digitali per la gestione delle richieste di prestito.
            Semplifica, velocizza e monitora tutto in un'unica piattaforma.
          </p>
        </div>

        {/* Contatti */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contatti</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Via Roma 123, 00100 Roma (RM), Italia</li>
            <li>📞 +39 06 1234567</li>
            <li>✉️ info@myloanmate.com</li>
            <li>🕒 Lun - Ven: 9:00 - 18:00</li>
          </ul>
        </div>

        {/* Link utili */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Link utili</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white transition">
                Termini e Condizioni
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contattaci
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Seguici</h3>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Informazioni legali */}
      <div className="w-full border-t border-gray-700 mt-8 pt-4 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 space-y-1">
          <p>
            <strong>MyLoanMate S.r.l.</strong> – P.IVA 01234567890 – REA
            RM-123456 – Capitale Sociale € 50.000 i.v.
          </p>
          <p>
            Iscritta al Registro delle Imprese di Roma – Codice Fiscale
            01234567890
          </p>
          <p>Sede legale: Via Roma 123, 00100 Roma (RM), Italia</p>
        </div>
      </div>

      {/* Barra inferiore */}
      <div className="w-full border-t border-gray-700 mt-4 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyLoanMate. Tutti i diritti riservati.
      </div>
    </footer>
  );
}
