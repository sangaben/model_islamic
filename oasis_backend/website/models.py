# website/models.py
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class HeroSlide(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=100, help_text="Campus name or location")
    image = models.ImageField(upload_to='hero_slides/')
    overlay_color = models.CharField(
        max_length=200, 
        default='linear-gradient(135deg, rgba(10,26,47,0.7) 0%, rgba(26,43,76,0.5) 100%)'
    )
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Hero Slide'
    
    def __str__(self):
        return self.title

class Statistic(models.Model):
    ICON_CHOICES = [
        ('Users', 'Users'),
        ('Award', 'Award'),
        ('TrendingUp', 'Trending Up'),
        ('GraduationCap', 'Graduation Cap'),
        ('BookOpen', 'Book Open'),
        ('MapPin', 'Map Pin'),
    ]
    
    label = models.CharField(max_length=100)
    value = models.PositiveIntegerField()
    suffix = models.CharField(max_length=10, blank=True, default='+')
    description = models.TextField(blank=True)
    trend = models.CharField(max_length=100, blank=True)
    icon = models.CharField(max_length=20, choices=ICON_CHOICES, default='Users')
    color = models.CharField(max_length=20, default='#1a2b4c')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Statistics'
    
    def __str__(self):
        return f"{self.label}: {self.value}{self.suffix}"

class CoreValue(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=10, help_text="Emoji icon (e.g., 🤝, ⭐, 🏆)")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.name

class Offer(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=10, help_text="Emoji icon (e.g., 📚, 👨‍🏫, 🏫)")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title

class Campus(models.Model):
    CAMPUS_TYPES = [
        ('day', 'Day Only'),
        ('boarding', 'Boarding Only'),
        ('both', 'Both Day & Boarding'),
    ]
    
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.CharField(max_length=200, help_text="Short description")
    full_description = models.TextField()
    programs = models.JSONField(default=list, help_text='["Nursery", "Primary P.1-P.7", etc.]')
    campus_type = models.CharField(max_length=20, choices=CAMPUS_TYPES, default='both')
    facilities = models.JSONField(default=list, help_text='["Modern Classrooms", "Library", etc.]')
    established = models.CharField(max_length=10, default='2013')
    image = models.ImageField(upload_to='campuses/')
    icon = models.CharField(max_length=10, default='🏛️')
    student_count = models.CharField(max_length=20, default='450+')
    staff_count = models.CharField(max_length=20, default='50+')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Campuses'
    
    def __str__(self):
        return f"{self.name} - {self.location}"

class GalleryImage(models.Model):
    CATEGORY_CHOICES = [
        ('academics', 'Academics'),
        ('sports', 'Sports'),
        ('arts', 'Arts'),
        ('events', 'Events'),
    ]
    
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='gallery/')
    thumbnail = models.ImageField(upload_to='gallery/thumbnails/', blank=True, null=True)
    campus = models.ForeignKey(Campus, on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_images')
    photographer = models.CharField(max_length=100, default='Oasis Schools')
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-is_featured', 'order']
        verbose_name_plural = 'Gallery Images'
    
    def __str__(self):
        return self.title

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    quote = models.TextField()
    image = models.ImageField(upload_to='testimonials/')
    campus = models.ForeignKey(Campus, on_delete=models.SET_NULL, null=True, blank=True, related_name='testimonials')
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)], 
        default=5
    )
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.name} - {self.role}"

# website/models.py - Update the Event class

class Event(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    date_display = models.CharField(max_length=20, help_text="e.g., 'MAR 20'")
    time = models.CharField(max_length=100, help_text="e.g., '8:00 AM - 4:00 PM'")
    location = models.CharField(max_length=200)
    campus = models.ForeignKey(Campus, on_delete=models.SET_NULL, null=True, blank=True, related_name='events')
    image = models.ImageField(upload_to='events/')
    description = models.TextField(blank=True)
    is_upcoming = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)  # Add this line
    
    class Meta:
        ordering = ['date']
    
    def __str__(self):
        return self.title

class WelcomeSection(models.Model):
    subtitle = models.CharField(max_length=100, default='Welcome to Oasis')
    title = models.CharField(max_length=200, default='Nurturing Young Minds, Building Futures')
    description_paragraphs = models.JSONField(
        default=list, 
        help_text='["First paragraph", "Second paragraph"]'
    )
    image = models.ImageField(upload_to='welcome/')
    image_caption = models.CharField(max_length=200, blank=True)
    learn_more_link = models.CharField(max_length=200, default='/about')
    vision_text = models.TextField()
    mission_text = models.TextField()
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = 'Welcome Section'
    
    def __str__(self):
        return "Welcome Section"

class CTASection(models.Model):
    title = models.CharField(max_length=200, default='Begin Your Journey Today')
    text = models.TextField(default='Join a community where every learner thrives across our four specialized campuses')
    year_text = models.CharField(max_length=100, default='Applications Open for 2026—27')
    background_image = models.ImageField(upload_to='cta/')
    primary_button_text = models.CharField(max_length=50, default='Apply Now')
    primary_button_link = models.CharField(max_length=200, default='/admissions/apply')
    secondary_button_text = models.CharField(max_length=50, default='Request Information')
    secondary_button_link = models.CharField(max_length=200, default='/contact')
    features = models.JSONField(
        default=list, 
        help_text='["Quality Education", "Strong Values", "Holistic Development"]'
    )
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = 'CTA Section'
    
    def __str__(self):
        return "CTA Section"

class SiteSettings(models.Model):
    typing_texts = models.JSONField(
        default=list, 
        help_text='["Oasis Schools Arua", "Main Campus", "Muni Campus", etc.]'
    )
    auto_rotate_speed = models.PositiveIntegerField(
        default=3500, 
        help_text='Hero slide rotation speed in milliseconds'
    )
    testimonials_auto_play_speed = models.PositiveIntegerField(default=4000)
    enable_parallax = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'
    
    def __str__(self):
        return "Site Settings"