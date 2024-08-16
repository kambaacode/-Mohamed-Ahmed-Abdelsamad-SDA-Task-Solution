from django.urls import path
from .views import login , register,Inventory


urlpatterns = [
    path('login/' ,login , name="login"),
    path('register/' , register , name="register"),
    path('Inventory/' , Inventory , name = "Inventory"),
]