"""Admin configuration for the API models."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, LoanRequest


@admin.register(LoanRequest)
class LoanRequestAdmin(admin.ModelAdmin):
    """Admin interface for :class:`LoanRequest`."""
    list_display = ("id", "user", "importo_euro", "stato", "data_richiesta", "data_esito")
    list_filter = ("stato",)

    @staticmethod
    def importo_euro(obj):
        return f"{obj.importo:.2f} €"
    importo_euro.short_description = "Importo"


@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    """Admin interface for :class:`CustomUser`."""
    list_display = (
        "id",
        "email",
        "nome",
        "cognome",
        "citta",
        "via",
        "telefono",
        "carta_identita",
        "is_staff",
    )
    ordering = ("id",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Informazioni personali",
            {"fields": ("nome", "cognome", "citta", "via", "telefono", "carta_identita")},
        ),
        (
            "Permessi",
            {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")},
        ),
        ("Date importanti", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "nome",
                    "cognome",
                    "citta",
                    "via",
                    "telefono",
                    "carta_identita",
                ),
            },
        ),
    )
    search_fields = ("email", "nome", "cognome")
