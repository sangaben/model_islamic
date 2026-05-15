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


# Add to your website/serializers.py

class NewsSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    campus_name = serializers.CharField(source='campus.name', read_only=True, allow_null=True)
    
    class Meta:
        model = News
        fields = [
            'id', 'title', 'category', 'category_display', 'excerpt', 'content',
            'featured_image', 'thumbnail', 'author', 'date', 'published_date',
            'campus', 'campus_name', 'views', 'is_featured', 'is_published'
        ]



# Add to website/serializers.py

class AboutPageSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPageSettings
        fields = '__all__'


class HistoryMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryMilestone
        fields = '__all__'


class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = '__all__'


class LeadershipMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadershipMember
        fields = '__all__'


class SchoolStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolStatistic
        fields = '__all__'


class MissionVisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissionVision
        fields = '__all__'