# Creazione app Backend – Architettura e database

### 1. Creare e attivare un venv

```bash
python -m venv env
source env/bin/activate
```

---

### 2. Installare Django

```bash
pip install django
pip install djangorestframework
pip install drf-yasg
```

---

### 3. Creare un nuovo progetto Django

```bash
django-admin startproject nome_progetto
```

Questo comando genera una struttura base.

---

### 4. Struttura iniziale dei file creati

Dentro `nome_progetto/` ci sarà:

```
nome_progetto/
├── manage.py                  # Script per gestire il progetto (runserver, migrate, ecc.)
└── nome_progetto/
    ├── __init__.py            # Fa sì che la cartella sia un modulo Python
    ├── settings.py            # Tutte le impostazioni del progetto (DB, app, middleware…)
    ├── urls.py                # Routing principale del progetto
    ├── asgi.py                # Entry-point per server ASGI
    └── wsgi.py                # Entry-point per server WSGI
```

---

### 5. Creare una app (es: `api`)

```bash
python manage.py startapp api
```

Dentro `api/` verranno creati i seguenti file:

```
api/
├── admin.py           # Configurazione pannello admin per i modelli
├── apps.py            # Config info dell’app (nome, ecc.)
├── models.py          # Definizione classi (modelli) che diventano tabelle DB
├── views.py           # Definizione funzioni/classi che gestiscono le richieste
├── urls.py            # (Da creare) – routing dell'app
├── tests.py           # Per i test automatici
└── migrations/        # Contiene i file per sincronizzare i modelli col DB
```

---

### 6. Collegamento dell'app al progetto

Aggiungere `'api',` in `INSTALLED_APPS` dentro `settings.py`:

```python
INSTALLED_APPS = [
    'api',
    'rest_framework',
    'drf_yasg',
    ...,
]
```

necessario aggiungere tutto quello che si vuole collegare

---

### 7. Creare un file `urls.py` nella cartella `api`

```python
# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),  # esempio: GET /
]
```

---

### 8. Creare una view base in `api/views.py`

```python
from django.http import HttpResponse

def home(request):
    return HttpResponse("Ciao dal backend Django!")
```

---

### 9. Collegare le URL dell’app al progetto

Nel file `nome_progetto/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),  # include le rotte dell’app "api"
]
```

---

### 10. Impostare il database (opzionale)

Di default per progettazione locale -> SQLite.
Modificare `DATABASES` in `settings.py` per usare PostgreSQL o altro.

---

### 11. Creare un modello (tabella) in `api/models.py`

```python
from django.db import models

class Prodotto(models.Model):
    nome = models.CharField(max_length=100)
    prezzo = models.DecimalField(max_digits=10, decimal_places=2)
```

---

### 12. Generare e applicare le migrazioni

```bash
python manage.py makemigrations
python manage.py migrate
```

se presenti modifiche su tabelle database allora verrà creato un file su `\api\migrations`.
Django utilizza questi file per storicizzare le modifiche al database.

---

### 13. Creare un superuser per l’admin

```bash
python manage.py shell < create_admin.py
```

questo comando crea un utente amministratore

oppure in alternativa..

```bash
python manage.py createsuperuser
```

questo comando chiederà una e-mail e una password per il superuser

---

### 14. Avviare il server

```bash
python manage.py runserver
```

il server si attiverà su `http://127.0.0.1:8000` altrimenti è possibile definire su quale porta eseguirlo
tuttavia su frontend bisogna specificare l'url corretto del backend

---

# aggiungere documentazione swagger

`drf-yasg` (acronimo di **Django REST Framework - Yet Another Swagger Generator**) è una libreria che permette di **generare automaticamente la documentazione interattiva** (Swagger UI e ReDoc) per le API sviluppate con **Django REST Framework (DRF)**.

### A cosa serve?

**Documentazione API automatica**

**Interfaccia interattiva** per testare le chiamate API (POST, GET, PUT, DELETE…)

**Specifica OpenAPI/Swagger** esportabile in JSON o YAML

Utile in team: backend e frontend possono vedere facilmente cosa fa ogni endpoint
Si possono aggiungere **descrizioni, esempi, validazioni e sicurezza**

È un’alternativa a `drf-spectacular` o `drf-openapi`, ma più semplice da configurare

---

### Installazione

```bash
pip install drf-yasg
```

---

### Configurazione della documentazione in `urls.py` (esempio)

```python
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path, re_path

schema_view = get_schema_view(
   openapi.Info(
      title="LoanMate API",
      default_version='v1',
      description="Documentazione API del progetto",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # ...
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r'^swagger\.json$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
]
```

---

### Cosa si ottiene?

- `http://localhost:8000/swagger/` → interfaccia Swagger UI
- `http://localhost:8000/redoc/` → documentazione ReDoc
- `http://localhost:8000/swagger.json` → specifica OpenAPI in JSON
