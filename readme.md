# MyLoanMate – Documentazione Tecnica

MyLoanMate è un'applicazione web full-stack progettata come caso studio per un project work universitario in ambito informatico. Il sistema si presta per la **gestione asincrona e autenticata delle richieste di prestito**, architettata secondo il paradigma RESTful. È composto da un'interfaccia utente sviluppata in **React + TypeScript** e un'infrastruttura backend realizzata in **Django**, integrata con il framework **Django REST Framework**.

---

# 1. Configurazione Locale e avvio rapido

## 1.1 Frontend

1. Installazione delle dipendenze:

   ```bash
   npm install
   ```

2. Creazione del file `.env`:

   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

3. Avvio del server di sviluppo:
   ```bash
   npm run dev
   ```

## 1.2 Backend

1. Creazione e attivazione di un ambiente virtuale:
   ```python
   python -m venv venv
   source venv/bin/activate
   ```
2. Installazione delle dipendenze:
   ```python
   pip install -r requirements.txt
   ```
3. Migrazioni e creazione superuser:
   ```python
   python manage.py migrate
   python manage.py shell < create_admin.py
   ```
4. Avvio del server:
   ```python
   python manage.py runserver
   ```

---

### Url utili

- `http://localhost:8000/admin/` → interfaccia admin
- `http://localhost:8000/swagger/` → interfaccia Swagger UI
- `http://localhost:8000/redoc/` → documentazione ReDoc
- `http://localhost:8000/swagger.json` → specifica OpenAPI in JSON
