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







# Add this to your existing website/models.py

class News(models.Model):
    CATEGORY_CHOICES = [
        ('announcement', 'Announcement'),
        ('event', 'Event'),
        ('campus_update', 'Campus Update'),
        ('achievement', 'Achievement'),
        ('notice', 'Notice'),
        ('academic', 'Academic'),
        ('sports', 'Sports'),
        ('arts', 'Arts & Culture'),
    ]
    
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='announcement')
    excerpt = models.TextField(max_length=300, help_text="Short summary displayed on news listing page")
    content = models.TextField(help_text="Full news article content")
    featured_image = models.ImageField(upload_to='news/featured/', help_text="Main image for the news article")
    thumbnail = models.ImageField(upload_to='news/thumbnails/', blank=True, null=True)
    
    # Optional fields
    author = models.CharField(max_length=100, default='Oasis Schools Admin')
    date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    published_date = models.DateField(auto_now_add=True)
    
    # Relationships
    campus = models.ForeignKey(Campus, on_delete=models.SET_NULL, null=True, blank=True, related_name='news_articles')
    
    # Metadata
    views = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False, help_text="Show on homepage featured section")
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    
    # SEO fields
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(max_length=500, blank=True)
    
    class Meta:
        ordering = ['-published_date', '-is_featured', 'order']
        verbose_name = 'News Article'
        verbose_name_plural = 'News Articles'
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Auto-generate excerpt if not provided
        if not self.excerpt and self.content:
            self.excerpt = self.content[:300] + '...'
        super().save(*args, **kwargs)


# Add these models to your website/models.py

class AboutPageSettings(models.Model):
    """Main settings for the About page"""
    hero_title = models.CharField(max_length=200, default='About Our School')
    hero_subtitle = models.CharField(max_length=500, default='Model Islamic & City Model Schools - Excellence in Education')
    hero_badge_text = models.CharField(max_length=100, default='بسم الله الرحمن الرحيم')
    hero_background_image = models.ImageField(upload_to='about/hero/', blank=True, null=True)
    
    # Quick info cards
    info_card_1_title = models.CharField(max_length=100, default='Our Location')
    info_card_1_text = models.CharField(max_length=200, default='Former TAWAKAL PRIMARY SCHOOL, Pangsha Ward, Arua')
    info_card_2_title = models.CharField(max_length=100, default='Established')
    info_card_2_text = models.CharField(max_length=100, default='2008')
    info_card_3_title = models.CharField(max_length=100, default='Our Motto')
    info_card_3_text = models.CharField(max_length=200, default='Excellence is our pride')
    
    # CTA Section
    cta_title = models.CharField(max_length=200, default='Join Our Learning Community')
    cta_text = models.CharField(max_length=500, default='Give your child the gift of quality Islamic education')
    cta_button_text = models.CharField(max_length=50, default='Apply for Admission')
    cta_button_link = models.CharField(max_length=200, default='/admissions/apply')
    cta_secondary_button_text = models.CharField(max_length=50, default='Contact Us')
    cta_secondary_button_link = models.CharField(max_length=200, default='/contact')
    
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'About Page Settings'
        verbose_name_plural = 'About Page Settings'
    
    def __str__(self):
        return "About Page Settings"


class HistoryMilestone(models.Model):
    """History timeline milestones"""
    year = models.CharField(max_length=20)
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.year} - {self.title}"


class CoreValue(models.Model):
    """Core values (you already have this, but let's enhance it)"""
    name = models.CharField(max_length=100)
    arabic_name = models.CharField(max_length=100, blank=True, help_text="Arabic translation")
    description = models.TextField()
    icon = models.CharField(max_length=50, default='Shield')  # Icon name from lucide-react
    color = models.CharField(max_length=20, default='#10B981')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.name


class LeadershipMember(models.Model):
    """Leadership team members"""
    name = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    qualification = models.CharField(max_length=200, blank=True)
    experience = models.CharField(max_length=100, blank=True)
    bio = models.TextField()
    image = models.ImageField(upload_to='leadership/')
    email = models.EmailField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Leadership Members'
    
    def __str__(self):
        return self.name


class SchoolStatistic(models.Model):
    """Statistics displayed on About page"""
    value = models.CharField(max_length=50)
    label = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, default='Users')  # Icon name from lucide-react
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = 'School Statistics'
    
    def __str__(self):
        return f"{self.value} - {self.label}"


class MissionVision(models.Model):
    """Mission and Vision content"""
    type = models.CharField(max_length=10, choices=[('mission', 'Mission'), ('vision', 'Vision')])
    title = models.CharField(max_length=200)
    description = models.TextField()
    points = models.JSONField(default=list, help_text='List of key points')
    icon = models.CharField(max_length=50, default='Target')
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name_plural = 'Mission & Vision'
    
    def __str__(self):
        return f"{self.get_type_display()}"