from django.shortcuts import render_to_response
from django.http import HttpResponse

def index(request):
	return HttpResponse('registration/static/registration/index.html')

# Create your views here.
