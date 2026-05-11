# website/serializers.py
from rest_framework import serializers
from .models import *

class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = ['id', 'title', 'description', 'location', 'image', 'overlay_color']

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ['label', 'value', 'suffix', 'description', 'trend', 'icon', 'color']

class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = ['name', 'description', 'icon']

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['title', 'description', 'icon']

class CampusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campus
        fields = '__all__'

class GalleryImageSerializer(serializers.ModelSerializer):
    campus_name = serializers.CharField(source='campus.name', read_only=True)
    
    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'category', 'image', 'thumbnail', 'campus_name', 'photographer']

class TestimonialSerializer(serializers.ModelSerializer):
    campus_name = serializers.CharField(source='campus.name', read_only=True)
    
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'role', 'quote', 'image', 'campus_name', 'rating']

class EventSerializer(serializers.ModelSerializer):
    campus_name = serializers.CharField(source='campus.name', read_only=True)
    
    class Meta:
        model = Event
        fields = ['id', 'title', 'date_display', 'time', 'location', 'campus_name', 'image']

class WelcomeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WelcomeSection
        fields = '__all__'

class CTASectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTASection
        fields = '__all__'

class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'