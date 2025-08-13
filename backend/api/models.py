from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    """Manager for :class:`CustomUser` using email as the unique identifier."""
    
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user."""
        if not email:
            raise ValueError("L'email è obbligatoria")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser with admin permissions."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin): 
    """Custom user model identified by email.""" 

    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=150)
    cognome = models.CharField(max_length=150)
    citta = models.CharField(max_length=100)
    via = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    carta_identita = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email" # Email is the unique identifier
    REQUIRED_FIELDS = ["nome", "cognome", "citta", "via", "telefono", "carta_identita"] # Required fields for user creation

    objects = CustomUserManager()

    def __str__(self) -> str: 
        return self.email


class LoanRequest(models.Model): 
    """Loan request created by a user."""
    PENDING = "in attesa"  
    APPROVED = "approvata"
    REJECTED = "rifiutata" 

    STATUS_CHOICES = [ 
        (PENDING, "In attesa"),     
        (APPROVED, "Approvata"),
        (REJECTED, "Rifiutata"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    """Reference to the user who made the loan request."""
    user_email = models.EmailField(blank=True) 
    user_nome = models.CharField(max_length=150, blank=True)
    user_cognome = models.CharField(max_length=150, blank=True)
    user_citta = models.CharField(max_length=100, blank=True)
    user_via = models.CharField(max_length=200, blank=True)
    user_telefono = models.CharField(max_length=20, blank=True)
    user_carta_identita = models.CharField(max_length=50, blank=True)
    importo = models.FloatField()
    motivo = models.TextField()
    data_richiesta = models.DateTimeField(auto_now_add=True)
    data_esito = models.DateTimeField(null=True, blank=True)
    stato = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)

    def __str__(self):
        return f"{self.user.email} - {self.importo}"
