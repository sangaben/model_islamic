# website/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import *

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

@admin.register(CoreValue)
class CoreValueAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'order', 'is_active']
    list_editable = ['order', 'is_active']

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

@admin.register(CTASection)
class CTASectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'primary_button_text', 'is_active', 'image_preview']
    
    def image_preview(self, obj):
        if obj.background_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.background_image.url)
        return "No Image"
    image_preview.short_description = 'Preview'

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['id']
    
    def has_add_permission(self, request):
        # Prevent multiple settings instances
        return not SiteSettings.objects.exists()