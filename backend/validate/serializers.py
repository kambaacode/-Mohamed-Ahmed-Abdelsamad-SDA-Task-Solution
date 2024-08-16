from rest_framework import serializers
from.models import MechanicalPart , RawMaterial , ElectricalPart

class MechanicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = MechanicalPart
        fields = ['ItemName' , 'qunatity' , 'material' , 'dimensions' , 'weight']

class ElectricalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectricalPart
        fields = ['ItemName' , 'qunatity' , 'voltage' , 'current' , 'powerRating']

class RawMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawMaterial
        fields = ['ItemName' , 'qunatity' , 'type' , 'purity']