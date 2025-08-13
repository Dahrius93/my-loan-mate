const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"
let authToken: string | null = null


export function setAuthToken(token: string) {
  authToken = token
}

function authHeaders(): Record<string, string> {
  return authToken ? { Authorization: `Token ${authToken}` } : {}
}

export interface LoanRequestPayload {
  importo: number
  motivo: string
}

export interface LoanUser { 
  id: number
  email: string
  nome: string
  cognome: string
  citta: string
  via: string
  telefono: string
  carta_identita: string
  is_staff: boolean
}

export interface LoanRequest {
  id: number
  user: LoanUser
  importo: number
  motivo: string
  data_richiesta: string
  data_esito: string | null
  stato: string
}

export async function createLoanRequest(payload: LoanRequestPayload) {
  const res = await fetch(`${API_URL}/loan-requests/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Errore nella creazione')
  return res.json()
}

export async function getLoanRequests(): Promise<LoanRequest[]> {
  const res = await fetch(`${API_URL}/loan-requests/`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Errore nel caricamento')
  const data = await res.json()
  return data as LoanRequest[]
}

export async function updateLoanRequest(
  id: number,
  status: string,
) {
  const res = await fetch(`${API_URL}/loan-requests/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ stato: status }),
  })
  if (!res.ok) throw new Error('Errore aggiornamento')
  return res.json()
}

export interface LoginResponse {
  token: string
  is_staff: boolean
  nome: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/login/`, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Credenziali errate')
  const data = await res.json()
  return data as LoginResponse
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout/`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Errore logout')
  return res.json()
}

export async function getUserProfile() {
  const res = await fetch(`${API_URL}/me/`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Errore nel caricamento del profilo utente");

  return res.json();
}

export interface RegisterPayload {
  email: string
  password: string
  nome: string
  cognome: string
  citta: string
  via: string
  telefono: string
  carta_identita: string
}

export async function register(data: RegisterPayload) {
  const res = await fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Errore registrazione')
  const json = await res.json()
  return json.token as string
}

export async function getProfile(): Promise<LoanUser> {
  const res = await fetch(`${API_URL}/user/`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Errore caricamento profilo')
  return res.json()
}

export async function updateProfile(data: Partial<RegisterPayload>): Promise<LoanUser> {
  const res = await fetch(`${API_URL}/user/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Errore aggiornamento profilo')
  return res.json()
}
