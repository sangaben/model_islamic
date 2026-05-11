# website/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'hero-slides', views.HeroSlideViewSet, basename='hero-slide')
router.register(r'statistics', views.StatisticViewSet, basename='statistic')
router.register(r'core-values', views.CoreValueViewSet, basename='core-value')
router.register(r'offers', views.OfferViewSet, basename='offer')
router.register(r'campuses', views.CampusViewSet, basename='campus')
router.register(r'gallery', views.GalleryImageViewSet, basename='gallery')
router.register(r'testimonials', views.TestimonialViewSet, basename='testimonial')
router.register(r'events', views.EventViewSet, basename='event')

urlpatterns = [
    path('', include(router.urls)),
    path('homepage-data/', views.get_homepage_data, name='homepage-data'),
]