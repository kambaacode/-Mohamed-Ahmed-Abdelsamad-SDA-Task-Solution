from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .models import User , RawMaterial , ElectricalPart , MechanicalPart 
from .serializers import MechanicalSerializer , ElectricalSerializer , RawMaterialSerializer

# Create your views here.


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get("uname")
        password = data.get("pass")
        try:
            user = User.objects.get(username = username)
            if(user.password == password):
                print("Correct Data")
                return JsonResponse({"access":True , 'username':user.username})
            else:
                print("inCorrect Data")
                return JsonResponse({"access":False ,"Messege":'Invalid Credintals'})

        except User.DoesNotExist:
            return JsonResponse({"access":False , "Messege":'Invalid Credintals'})
    return JsonResponse({})


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = data.get('uname')
        passw = data.get('pass')
        email = data.get('email')
        
        if User.objects.filter(username = user).exists():
            return JsonResponse({"Valid":False,"Messege":"Username Already Exist"})
        elif User.objects.filter(email = email).exists():
            return JsonResponse({"Valid":False,"Messege":"Email Already Exist"})
        else:
            newuser = User(username = user , password = passw , email = email)
            newuser.save()
            print('user Created')
            return JsonResponse({'Valid':True ,'Messege':'User Created Successfully'})
            
    return JsonResponse({})


@csrf_exempt
def Inventory(request):
    if request.method == 'POST':
        Mechanical_parts = MechanicalPart.objects.all()
        Raw_Material = RawMaterial.objects.all()
        Electrical_Part = ElectricalPart.objects.all()

        MechSer = MechanicalSerializer(Mechanical_parts , many = True)
        RSer = RawMaterialSerializer(Raw_Material , many = True)
        ESer = ElectricalSerializer(Electrical_Part , many = True)

        return JsonResponse({"Mechanical" : MechSer.data , "Raw": RSer.data , "Electrical": ESer.data})
    return JsonResponse({"response":'couldnt'})