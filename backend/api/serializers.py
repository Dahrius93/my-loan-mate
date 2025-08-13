"""Serializers used to expose API data."""

from rest_framework import serializers
from .models import CustomUser, LoanRequest


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the custom user model."""

    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "password",
            "nome",
            "cognome",
            "citta",
            "via",
            "telefono",
            "carta_identita",
            "is_staff",
        ]

    def create(self, validated_data):
        """Create and return a new user."""
        return CustomUser.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update an existing user instance."""
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class LoanRequestSerializer(serializers.ModelSerializer):
    """Serializer for loan request objects with frozen user data."""

    user = serializers.SerializerMethodField()

    class Meta:
        model = LoanRequest
        fields = [
            "id",
            "user",
            "importo",
            "motivo",
            "data_richiesta",
            "data_esito",
            "stato",
        ]

    def update(self, instance, validated_data):
        """Update a loan request and record the outcome timestamp."""
        status = validated_data.get("stato")
        if status and status != LoanRequest.PENDING:
            from django.utils import timezone

            instance.data_esito = timezone.now()
        return super().update(instance, validated_data)

    def get_user(self, obj):
        """Return frozen user data from the request."""
        return {
            "id": obj.user_id,
            "email": obj.user_email,
            "nome": obj.user_nome,
            "cognome": obj.user_cognome,
            "citta": obj.user_citta,
            "via": obj.user_via,
            "telefono": obj.user_telefono,
            "carta_identita": obj.user_carta_identita,
        }
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
