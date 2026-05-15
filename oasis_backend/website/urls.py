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
router.register(r'news', views.NewsViewSet, basename='news')  # Add this line for news


router.register(r'about-settings', views.AboutPageSettingsViewSet, basename='about-settings')
router.register(r'history-milestones', views.HistoryMilestoneViewSet, basename='history-milestones')
router.register(r'core-values', views.CoreValueViewSet, basename='core-values')
router.register(r'leadership', views.LeadershipMemberViewSet, basename='leadership')
router.register(r'school-statistics', views.SchoolStatisticViewSet, basename='school-statistics')
router.register(r'mission-vision', views.MissionVisionViewSet, basename='mission-vision')

urlpatterns = [
    path('', include(router.urls)),
    path('homepage-data/', views.get_homepage_data, name='homepage-data'),
    path('about-data/', views.get_about_data, name='about-data'),
]