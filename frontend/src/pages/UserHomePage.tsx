import { useState, useEffect } from "react";
import { getUserProfile } from "../services/api";
import LoanList from "../components/LoanList";
import { UserDetailModal } from "../components/UserDetailModal";
import type { LoanRequest } from "../components/LoanList";
import LoanFormModal from "../components/LoanFormModal";

export default function UserHomePage() {
  const [refresh, setRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [selectedUser, setSelectedUser] = useState<LoanRequest["user"] | null>(
    null
  );

  useEffect(() => {
    getUserProfile()
      .then((data) => setIsAdmin(data.is_staff))
      .catch(() => setIsAdmin(false));
  }, []);

  if (isAdmin === null) return <p>Caricamento...</p>;

  return (
    <div className="mt-20 mx-auto max-w-5xl px-4">
      <LoanList
        key={String(refresh)}
        isAdmin={Boolean(isAdmin)}
        onNewRequest={() => setShowNewRequest(true)}
        onUserClick={(u) => setSelectedUser(u)}
      />
      <LoanFormModal
        showModal={showNewRequest}
        onClose={() => setShowNewRequest(false)}
        onCreated={() => setRefresh((v) => !v)}
      />
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
