from django.contrib import admin                        
from django.urls import path, include                  
from rest_framework import permissions                  
from drf_yasg.views import get_schema_view              
from drf_yasg import openapi                            
from django.urls import re_path                         

# Importing the schema view for API documentation
schema_view = get_schema_view(
    openapi.Info(
        title="LoanMate API",
        default_version="v1",
        description="Documentazione API per la piattaforma LoanMate",
    ),
    public=True, # Make the schema public
    permission_classes=(permissions.AllowAny,), # Allow any permissions for accessing the schema
)

# URL patterns for the API application
api_patterns = [
    path("", include("api.urls")),
]

# Main URL patterns for the project
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(api_patterns)),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"), # Swagger UI for API documentation 
    re_path(r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"),
]

# Swagger schema view for API documentation
# This view generates the OpenAPI schema for the API and provides a UI for it.
# Swagger -> Framework OpenAPI specification (OAS) 
schema_view = get_schema_view(
    openapi.Info(
        title="LoanMate API",
        default_version="v1",
        description="Documentazione API per la piattaforma LoanMate",
    ),
    public=True,    # Make the schema public
    permission_classes=(permissions.AllowAny,), # Allow any permissions for accessing the schema
)
