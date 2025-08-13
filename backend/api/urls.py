from django.urls import path
from .views import (
    RegisterView,
    LoanRequestListCreate,
    LoanRequestDetail,
    LoginView,
    LogoutView,
    MeView,
    UserDetailView,
)

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("me/", MeView.as_view()),
    path("register/", RegisterView.as_view()),
    path("loan-requests/", LoanRequestListCreate.as_view()),
    path("loan-requests/<int:pk>/", LoanRequestDetail.as_view()),
    path("user/", UserDetailView.as_view()),
]
