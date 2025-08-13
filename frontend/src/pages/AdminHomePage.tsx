import LoanList, { type LoanRequest } from "../components/LoanList";
import { UserDetailModal } from "../components/UserDetailModal";
import { useState, useEffect } from "react";
import { getUserProfile } from "../services/api";

export default function AdminHomePage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [selectedUser, setSelectedUser] = useState<LoanRequest["user"] | null>(
    null
  );

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setIsAdmin(data.is_staff);
      })
      .catch((err) => {
        console.error("Errore utente:", err);
        setIsAdmin(false);
      });
  }, []);

  if (isAdmin === null) return <p>Caricamento...</p>;

  return (
    <div>
      <div className="pt-2 px-2 md:px-8">
        <div className="w-full">
          <LoanList isAdmin={isAdmin} onUserClick={(u) => setSelectedUser(u)} />
          {selectedUser && (
            <UserDetailModal
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          )}
          <div className="pt-16 pb-16"></div>
        </div>
      </div>
    </div>
  );
}
