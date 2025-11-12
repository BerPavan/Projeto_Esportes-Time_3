from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import SignUpForm
from django.contrib.auth.decorators import login_required

# Views de cada página secundária
def criaConta_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form_is_valid():
            user = form.save()
            login(request, user)
            return redirect('home.html')
    else:
        form = SignUpForm()
    return render(request, 'secundarios/criaConta.html', {'form': form})

def feed_view(request):
    return render(request, 'secundarios/feed.html')

def home_conta_view(request):
    return render(request, 'secundarios/home_conta.html')

def login_view(request):
    return render(request, 'secundarios/login.html')

def mapa_view(request):
    return render(request, 'secundarios/mapa.html')

@login_required
def perfil_view(request):
    return render(request, 'secundarios/perfil.html')

def post_view(request):
    return render(request, 'secundarios/post.html')