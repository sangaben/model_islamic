# website/views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from .models import *
from .serializers import *


from .models import AboutPageSettings, HistoryMilestone, CoreValue, LeadershipMember, SchoolStatistic, MissionVision
from .serializers import AboutPageSettingsSerializer, HistoryMilestoneSerializer, CoreValueSerializer, LeadershipMemberSerializer, SchoolStatisticSerializer, MissionVisionSerializer


# Pagination for News
class NewsPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 50

# News ViewSet
class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for news articles
    """
    queryset = News.objects.filter(is_published=True).order_by('-published_date', '-is_featured')
    serializer_class = NewsSerializer
    pagination_class = NewsPagination
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured news articles for homepage"""
        featured_news = self.get_queryset().filter(is_featured=True)[:3]
        serializer = self.get_serializer(featured_news, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get latest 5 news articles"""
        latest_news = self.get_queryset()[:5]
        serializer = self.get_serializer(latest_news, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Filter news by category"""
        category = request.query_params.get('category', None)
        if category:
            news = self.get_queryset().filter(category=category)
            page = self.paginate_queryset(news)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
        return Response([])
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        """Increment view count for a news article"""
        news = self.get_object()
        news.views += 1
        news.save()
        return Response({'status': 'success', 'views': news.views})
    
    def retrieve(self, request, *args, **kwargs):
        """Get single news article with incremented views"""
        response = super().retrieve(request, *args, **kwargs)
        # Increment views when article is fetched
        news = self.get_object()
        news.views += 1
        news.save()
        return response

# Hero Slide ViewSet
class HeroSlideViewSet(viewsets.ModelViewSet):
    queryset = HeroSlide.objects.filter(is_active=True)
    serializer_class = HeroSlideSerializer

# Statistic ViewSet
class StatisticViewSet(viewsets.ModelViewSet):
    queryset = Statistic.objects.filter(is_active=True)
    serializer_class = StatisticSerializer

# Core Value ViewSet
class CoreValueViewSet(viewsets.ModelViewSet):
    queryset = CoreValue.objects.filter(is_active=True)
    serializer_class = CoreValueSerializer

# Offer ViewSet
class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.filter(is_active=True)
    serializer_class = OfferSerializer

# Campus ViewSet
class CampusViewSet(viewsets.ModelViewSet):
    queryset = Campus.objects.filter(is_active=True)
    serializer_class = CampusSerializer

# Gallery Image ViewSet
class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.filter(is_active=True)
    serializer_class = GalleryImageSerializer

# Testimonial ViewSet
class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer

# Event ViewSet
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def get_queryset(self):
        # Safely filter only if is_active field exists
        if hasattr(Event, 'is_active'):
            return Event.objects.filter(is_active=True)
        return Event.objects.all()

# Homepage Data API View
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
    
    # Latest News - Add to homepage
    try:
        data['latest_news'] = NewsSerializer(
            News.objects.filter(is_published=True)[:3], many=True
        ).data
    except:
        data['latest_news'] = []
    
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
    
    # Site Settings
    try:
        settings = SiteSettings.objects.first()
        if settings:
            data['settings'] = SiteSettingsSerializer(settings).data
        else:
            data['settings'] = None
    except:
        data['settings'] = None
    
    return Response(data)



class AboutPageSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutPageSettings.objects.filter(is_active=True)
    serializer_class = AboutPageSettingsSerializer


class HistoryMilestoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HistoryMilestone.objects.filter(is_active=True)
    serializer_class = HistoryMilestoneSerializer


class CoreValueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CoreValue.objects.filter(is_active=True)
    serializer_class = CoreValueSerializer


class LeadershipMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeadershipMember.objects.filter(is_active=True)
    serializer_class = LeadershipMemberSerializer


class SchoolStatisticViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SchoolStatistic.objects.filter(is_active=True)
    serializer_class = SchoolStatisticSerializer


class MissionVisionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MissionVision.objects.filter(is_active=True)
    serializer_class = MissionVisionSerializer


@api_view(['GET'])
def get_about_data(request):
    """Get all about page data in one request"""
    try:
        data = {
            'settings': AboutPageSettingsSerializer(AboutPageSettings.objects.first()).data if AboutPageSettings.objects.first() else None,
            'history_milestones': HistoryMilestoneSerializer(HistoryMilestone.objects.filter(is_active=True), many=True).data,
            'core_values': CoreValueSerializer(CoreValue.objects.filter(is_active=True), many=True).data,
            'leadership': LeadershipMemberSerializer(LeadershipMember.objects.filter(is_active=True), many=True).data,
            'statistics': SchoolStatisticSerializer(SchoolStatistic.objects.filter(is_active=True), many=True).data,
            'mission': MissionVisionSerializer(MissionVision.objects.filter(type='mission', is_active=True).first()).data,
            'vision': MissionVisionSerializer(MissionVision.objects.filter(type='vision', is_active=True).first()).data,
        }
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)