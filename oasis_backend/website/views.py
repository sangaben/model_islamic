# website/views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import *
from .serializers import *

class HeroSlideViewSet(viewsets.ModelViewSet):
    queryset = HeroSlide.objects.filter(is_active=True)
    serializer_class = HeroSlideSerializer

class StatisticViewSet(viewsets.ModelViewSet):
    queryset = Statistic.objects.filter(is_active=True)
    serializer_class = StatisticSerializer

class CoreValueViewSet(viewsets.ModelViewSet):
    queryset = CoreValue.objects.filter(is_active=True)
    serializer_class = CoreValueSerializer

class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.filter(is_active=True)
    serializer_class = OfferSerializer

class CampusViewSet(viewsets.ModelViewSet):
    queryset = Campus.objects.filter(is_active=True)
    serializer_class = CampusSerializer

class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.filter(is_active=True)
    serializer_class = GalleryImageSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer

class EventViewSet(viewsets.ModelViewSet):
    # Check if is_active field exists before filtering
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def get_queryset(self):
        # Safely filter only if is_active field exists
        if hasattr(Event, 'is_active'):
            return Event.objects.filter(is_active=True)
        return Event.objects.all()

@api_view(['GET'])
def get_homepage_data(request):
    # Safely get data with error handling
    data = {}
    
    # Hero Slides
    try:
        data['hero_slides'] = HeroSlideSerializer(
            HeroSlide.objects.filter(is_active=True), many=True
        ).data
    except:
        data['hero_slides'] = []
    
    # Statistics
    try:
        data['statistics'] = StatisticSerializer(
            Statistic.objects.filter(is_active=True), many=True
        ).data
    except:
        data['statistics'] = []
    
    # Core Values
    try:
        data['core_values'] = CoreValueSerializer(
            CoreValue.objects.filter(is_active=True), many=True
        ).data
    except:
        data['core_values'] = []
    
    # Offers
    try:
        data['offers'] = OfferSerializer(
            Offer.objects.filter(is_active=True), many=True
        ).data
    except:
        data['offers'] = []
    
    # Campuses
    try:
        data['campuses'] = CampusSerializer(
            Campus.objects.filter(is_active=True), many=True
        ).data
    except:
        data['campuses'] = []
    
    # Gallery
    try:
        data['gallery'] = GalleryImageSerializer(
            GalleryImage.objects.filter(is_active=True), many=True
        ).data
    except:
        data['gallery'] = []
    
    # Testimonials
    try:
        data['testimonials'] = TestimonialSerializer(
            Testimonial.objects.filter(is_active=True), many=True
        ).data
    except:
        data['testimonials'] = []
    
    # Events - handle safely
    try:
        if hasattr(Event, 'is_active'):
            data['events'] = EventSerializer(
                Event.objects.filter(is_active=True)[:6], many=True
            ).data
        else:
            data['events'] = EventSerializer(
                Event.objects.all()[:6], many=True
            ).data
    except:
        data['events'] = []
    
    # Welcome Section
    try:
        welcome = WelcomeSection.objects.first()
        if welcome:
            data['welcome'] = WelcomeSectionSerializer(welcome).data
        else:
            data['welcome'] = None
    except:
        data['welcome'] = None
    
    # CTA Section
    try:
        cta = CTASection.objects.first()
        if cta:
            data['cta'] = CTASectionSerializer(cta).data
        else:
            data['cta'] = None
    except:
        data['cta'] = None
    
    # Settings
    try:
        settings = SiteSettings.objects.first()
        if settings:
            data['settings'] = SiteSettingsSerializer(settings).data
        else:
            data['settings'] = None
    except:
        data['settings'] = None
    
    return Response(data)