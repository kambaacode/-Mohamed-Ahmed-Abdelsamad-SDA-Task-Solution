from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    

class InventoryItem(models.Model):
    ItemName = models.CharField(max_length=100)
    qunatity = models.IntegerField()

    def Description(self):
        pass

    def __str__(self):
        return self.ItemName  
    class Meta:
        abstract = True


class MechanicalPart(InventoryItem):
    material = models.CharField(max_length=100)
    dimensions = models.CharField(max_length=100)
    weight = models.FloatField()
    
    def __str__(self):
        return f"{self.ItemName} :MechanicalPart"
    
    def Description(self):
        return [self.ItemName , self.material , self.dimensions , self.weight]
    

class RawMaterial(InventoryItem):
    type = models.CharField(max_length=100)
    purity = models.FloatField()
    def __str__(self):
        return f"{self.ItemName} : RawMaterial"
    
    def Description(self):
        return [self.ItemName , self.type , self.purity]
    

class ElectricalPart(InventoryItem):
    voltage = models.FloatField()
    current = models.FloatField()
    powerRating = models.FloatField()

    def __str__(self):
        return f"{self.ItemName} :ElectricalPart"
    def Description(self):
        return [self.ItemName , self.voltage , self.current , self.powerRating]