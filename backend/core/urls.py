"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    # OAuth
    path("auth/", include("drf_social_oauth2.urls", namespace="drf")),
    # Project URLs
    path("admin/", admin.site.urls),
    path("transactions/", include("transactions.urls", namespace="transactions")),
    # User Management
    path("user/", include("users.urls", namespace="users")),
    # path("auth/", include("rest_framework.urls", namespace="rest_framework")),
    # API Schema and Documentation
    # path(
    #     "schema/",
    #     get_schema_view(
    #         title="Split Buddy",
    #         description="API for Split Buddy",
    #         version="1.0.0",
    #     ),
    #     name="openapi-schema",
    # ),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "docs/swagger-ui",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "docs/redoc",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc-ui",
    ),
]
