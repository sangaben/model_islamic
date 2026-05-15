# oasis_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def root_html(request):
    html_content = '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Model Islamic API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background: linear-gradient(135deg, #1a2b4c 0%, #2d5e3b 100%);
                color: white;
            }
            .container {
                background: rgba(255,255,255,0.1);
                border-radius: 10px;
                padding: 30px;
            }
            h1 { color: #ffd700; }
            a { color: #ffd700; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .endpoint {
                background: rgba(0,0,0,0.3);
                padding: 10px;
                margin: 10px 0;
                border-radius: 5px;
                font-family: monospace;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🏫 Islamic Model API</h1>
            <p>Welcome to the Islamic Model backend API. Below are the available endpoints:</p>
            
            <h2>📡 API Endpoints:</h2>
            <div class="endpoint">GET /api/website/homepage-data/ - All homepage data</div>
            <div class="endpoint">GET /api/website/news/ - List all news articles</div>
            <div class="endpoint">GET /api/website/news/featured/ - Featured news</div>
            <div class="endpoint">GET /api/website/news/latest/ - Latest 5 news</div>
            <div class="endpoint">GET /api/website/hero-slides/ - Hero slides</div>
            <div class="endpoint">GET /api/website/statistics/ - Statistics</div>
            <div class="endpoint">GET /api/website/campuses/ - Campus information</div>
            <div class="endpoint">GET /api/website/events/ - Events</div>
            <div class="endpoint">GET /api/website/testimonials/ - Testimonials</div>
            
            <h2>🔧 Admin:</h2>
            <div class="endpoint"><a href="/admin/">/admin/</a> - Admin panel</div>
            
            <p style="margin-top: 30px; font-size: 12px;">Model Islamic Kindergarten & Primary School</p>
        </div>
    </body>
    </html>
    '''
    return HttpResponse(html_content)

urlpatterns = [
    path('', root_html),  # Show HTML page at root
    path('admin/', admin.site.urls),
    path('api/admissions/', include('admissions.urls')),  
    path('api/website/', include('website.urls')),        
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)