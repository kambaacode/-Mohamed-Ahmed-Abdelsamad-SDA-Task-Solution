from django.contrib import admin
from .models import RawMaterial , ElectricalPart , MechanicalPart ,User 

# Register your models here.
admin.site.register(User)
admin.site.register(RawMaterial)
admin.site.register(ElectricalPart)
admin.site.register(MechanicalPart)