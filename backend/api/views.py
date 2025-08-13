from django.contrib.auth import authenticate
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import CustomUser, LoanRequest
from .serializers import UserSerializer, LoanRequestSerializer, LoginSerializer


class LoginView(ObtainAuthToken):
    """Authenticate a user and return an auth token."""

    serializer_class = LoginSerializer # dichiaro che il serializer da usare è LoginSerializer in questo modo swagger mostra login e non user

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request=request, email=email, password=password)
        if not user:
            return Response({"detail": "Credenziali non valide."}, status=400)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "is_staff": user.is_staff, "nome": user.nome})
    
class LogoutView(generics.GenericAPIView):
    """Endpoint to log out a user by deleting their auth token."""

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """Delete the user's auth token to log them out."""
        request.user.auth_token.delete()
        return Response({"detail": "Logout effettuato con successo."}, status=200)
    
class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class RegisterView(generics.CreateAPIView):
    """Endpoint used to create a new user account."""

    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})


class LoanRequestListCreate(generics.ListCreateAPIView):

    serializer_class = LoanRequestSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            # Admins can view every loan request
            return LoanRequest.objects.all()
        # Regular users only see their own requests
        return LoanRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_staff:
            # Prevent admins from creating requests on behalf of others
            raise PermissionDenied("Admin users cannot create loan requests")
        serializer.save(
            user=user,
            user_email=user.email,
            user_nome=user.nome,
            user_cognome=user.cognome,
            user_citta=user.citta,
            user_via=user.via,
            user_telefono=user.telefono,
            user_carta_identita=user.carta_identita,
        )


class LoanRequestDetail(generics.UpdateAPIView, generics.DestroyAPIView):
    """Retrieve, update or delete a specific loan request."""

    queryset = LoanRequest.objects.all()
    serializer_class = LoanRequestSerializer

    def get_permissions(self):
        """Return proper permissions based on the HTTP method."""
        if self.request.method in ["PUT", "PATCH"]:
            # Only admins can change a loan request
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def patch(self, request, *args, **kwargs):
        """Partially update the loan request status for admins only."""
        return self.partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """Delete a loan request if the user is allowed to.

        Parameters
        ----------
        request : HttpRequest
            The request that triggered the deletion.

        Returns
        -------
        Response
            The DRF response with status 204 on success.
        """
        instance = self.get_object()
        # Non admin users can only remove their own requests
        if not request.user.is_staff and instance.user != request.user:
            raise PermissionDenied("You do not have permission to delete this loan request")
        return super().destroy(request, *args, **kwargs)


class UserDetailView(generics.RetrieveUpdateAPIView):
    """Retrieve or update the authenticated user's profile."""

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        """Allow partial updates via PUT requests."""
        return self.partial_update(request, *args, **kwargs)
