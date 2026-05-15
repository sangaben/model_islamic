# website/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import *

# ============ NEWS ADMIN ============
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'published_date', 'is_featured', 'is_published', 'views', 'image_preview']
    list_editable = ['is_featured', 'is_published']
    list_filter = ['category', 'is_featured', 'is_published', 'campus', 'published_date']
    search_fields = ['title', 'content', 'excerpt', 'author']
    readonly_fields = ['views', 'date', 'updated_date']
    date_hierarchy = 'published_date'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'category', 'campus', 'author')
        }),
        ('Content', {
            'fields': ('excerpt', 'content', 'featured_image', 'thumbnail')
        }),
        ('Publication Settings', {
            'fields': ('is_published', 'is_featured', 'order', 'published_date')
        }),
        ('SEO Settings', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Statistics', {
            'fields': ('views', 'date', 'updated_date'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.featured_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 5px;" />', obj.featured_image.url)
        return "No Image"
    image_preview.short_description = 'Preview'
    
    actions = ['publish_articles', 'unpublish_articles', 'make_featured', 'reset_views']
    
    def publish_articles(self, request, queryset):
        updated = queryset.update(is_published=True)
        self.message_user(request, f'{updated} article(s) published successfully.')
    publish_articles.short_description = "Publish selected articles"
    
    def unpublish_articles(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f'{updated} article(s) unpublished.')
    unpublish_articles.short_description = "Unpublish selected articles"
    
    def make_featured(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f'{updated} article(s) marked as featured.')
    make_featured.short_description = "Mark as featured"
    
    def reset_views(self, request, queryset):
        updated = queryset.update(views=0)
        self.message_user(request, f'{updated} article(s) view count reset.')
    reset_views.short_description = "Reset view counts"


# ============ ABOUT PAGE ADMIN ============
@admin.register(AboutPageSettings)
class AboutPageSettingsAdmin(admin.ModelAdmin):
    list_display = ['id', 'hero_title', 'updated_at']
    fieldsets = (
        ('Hero Section', {
            'fields': ('hero_title', 'hero_subtitle', 'hero_badge_text', 'hero_background_image')
        }),
        ('Quick Info Cards', {
            'fields': ('info_card_1_title', 'info_card_1_text', 'info_card_2_title', 'info_card_2_text', 'info_card_3_title', 'info_card_3_text')
        }),
        ('CTA Section', {
            'fields': ('cta_title', 'cta_text', 'cta_button_text', 'cta_button_link', 'cta_secondary_button_text', 'cta_secondary_button_link')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )
    
    def has_add_permission(self, request):
        # Allow only one instance
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)


@admin.register(HistoryMilestone)
class HistoryMilestoneAdmin(admin.ModelAdmin):
    list_display = ['year', 'title', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'description']


@admin.register(CoreValue)
class CoreValueAdmin(admin.ModelAdmin):
    list_display = ['name', 'arabic_name', 'icon', 'color', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'description']


@admin.register(LeadershipMember)
class LeadershipMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'order', 'is_active', 'image_preview']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'position', 'bio']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 50%;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'


@admin.register(SchoolStatistic)
class SchoolStatisticAdmin(admin.ModelAdmin):
    list_display = ['value', 'label', 'icon', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']


@admin.register(MissionVision)
class MissionVisionAdmin(admin.ModelAdmin):
    list_display = ['type', 'title', 'is_active']
    list_filter = ['type', 'is_active']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('type', 'title', 'description', 'icon')
        }),
        ('Key Points', {
            'fields': ('points',),
            'help_text': 'Enter each point as a string in the JSON array. Example: ["Point 1", "Point 2", "Point 3"]'
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )


# ============ EXISTING ADMIN REGISTRATIONS ============
@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ['title', 'location', 'order', 'is_active', 'image_preview']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active', 'location']
    search_fields = ['title', 'description']
    fieldsets = (
        ('Content', {
            'fields': ('title', 'description', 'location', 'image')
        }),
        ('Settings', {
            'fields': ('overlay_color', 'order', 'is_active')
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'


@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'suffix', 'trend', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active', 'icon']


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order', 'is_active']
    list_editable = ['order', 'is_active']


@admin.register(Campus)
class CampusAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'campus_type', 'order', 'is_active', 'image_preview']
    list_editable = ['order', 'is_active']
    list_filter = ['campus_type', 'is_active']
    search_fields = ['name', 'location']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'campus', 'is_featured', 'order', 'is_active', 'image_preview']
    list_editable = ['is_featured', 'order', 'is_active']
    list_filter = ['category', 'campus', 'is_featured', 'is_active']
    search_fields = ['title']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'campus', 'rating', 'order', 'is_active', 'image_preview']
    list_editable = ['order', 'is_active']
    list_filter = ['campus', 'rating', 'is_active']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date_display', 'date', 'campus', 'is_upcoming', 'image_preview']
    list_editable = ['is_upcoming']
    list_filter = ['campus', 'is_upcoming']
    date_hierarchy = 'date'
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'


@admin.register(WelcomeSection)
class WelcomeSectionAdmin(admin.ModelAdmin):
    list_display = ['subtitle', 'title', 'is_active', 'image_preview']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'
    
    def has_add_permission(self, request):
        # Allow only one instance
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)


@admin.register(CTASection)
class CTASectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'primary_button_text', 'is_active', 'image_preview']
    
    def image_preview(self, obj):
        if obj.background_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.background_image.url)
        return "No Image"
    image_preview.short_description = 'Preview'
    
    def has_add_permission(self, request):
        # Allow only one instance
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['id']
    
    def has_add_permission(self, request):
        # Prevent multiple settings instances
        return not SiteSettings.objects.exists()