import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import UserUpdate from "./pages/UserUpdate";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import Header from "./components/Header";
import { setAuthToken, logout, getProfile } from "./services/api";
import "./App.css";

function AppRoutes() {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [nome, setNome] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    setAuthToken("");
    setToken(null);
    setIsAdmin(false);
    setNome(null);
    sessionStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setAuthToken(savedToken);

      getProfile()
        .then((user) => {
          setToken(savedToken);
          setIsAdmin(user.is_staff);
          setNome(user.nome);
        })
        .catch((err) => {
          console.error("Token non valido o scaduto", err);
          handleLogout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [handleLogout]);

  return (
    <>
      <Header nome={token && nome ? nome : undefined} onLogout={handleLogout} />
      {!loading && (
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                onLogged={(t, admin, _mail, nome) => {
                  void _mail;
                  setAuthToken(t);
                  setToken(t);
                  setIsAdmin(admin);
                  setNome(nome);
                  sessionStorage.setItem("token", t);
                  navigate("/home");
                }}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterPage
                onRegistered={(t, _mail) => {
                  void _mail;
                  setAuthToken(t);
                  setToken(t);
                  setIsAdmin(false);
                  sessionStorage.setItem("token", t);
                  navigate("/home");
                }}
              />
            }
          />
          <Route
            path="/profile"
            element={token ? <UserUpdate /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/home"
            element={
              token ? (
                isAdmin ? <AdminHomePage /> : <UserHomePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
