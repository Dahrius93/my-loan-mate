# MyLoanMate – Documentazione Tecnica

MyLoanMate è un'applicazione web full-stack progettata come caso studio per un project work universitario in ambito informatico. Il sistema si presta per la **gestione asincrona e autenticata delle richieste di prestito**, architettata secondo il paradigma RESTful. È composto da un'interfaccia utente sviluppata in **React + TypeScript** e un'infrastruttura backend realizzata in **Django**, integrata con il framework **Django REST Framework**.

---

# 1. Configurazione Locale e avvio rapido

## 1.1 Frontend

1. Installazione delle dipendenze:

   ```bash
   npm install
   ```

2. Avvio del server di sviluppo:
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
   carico su GitHub anche db.sqlite3 quindi non è necessario creare il superuser in quanto già presente
   se superuser non presente di seguito comando per crearlo

   ```python
   python manage.py createsuperuser
   ```

4. Migrazione (preparazione database)
   carico su GitHub anche db.sqlite3 quindi non è necessario fare migrazioni
   se dovesse essere necessario di seguito comando per preparare il database

   ```python
   python manage.py migrate
   ```

5. Avvio del server:
   ```python
   python manage.py runserver
   ```

---

### Documentazione API

- `http://localhost:8000/admin/` → interfaccia admin
- `http://localhost:8000/swagger/` → interfaccia Swagger UI
- `http://localhost:8000/redoc/` → documentazione ReDoc
- `http://localhost:8000/swagger.json` → specifica OpenAPI in JSON
