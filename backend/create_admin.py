# ===========================================
# Script di utilità per creazione superuser
# ===========================================
# Questo file contiene uno script autonomo che crea un utente
# amministratore (superuser) predefinito nel sistema, utile per
# ambienti di sviluppo, test o setup iniziale.
# 
# lanciare questo script dalla riga di comando con:
#
#                                   python manage.py shell < create_admin.py


from django.contrib.auth import get_user_model


def run():
    email = "admin@example.com"
    password = "admin"
    User = get_user_model()
    if not User.objects.filter(email=email).exists():
        User.objects.create_superuser(
            email=email,
            password=password,
            nome="Admin",
            cognome="Admin",
            citta="-",
            via="-",
            telefono="-",
            carta_identita="-",
        )
        print("Admin creato: admin@example.com/admin")
    else:
        print("Admin già presente")


run()
