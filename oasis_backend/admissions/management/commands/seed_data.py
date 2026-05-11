from django.core.management.base import BaseCommand
from admissions.models import (
    Program, FAQ, Testimonial, ImportantDate, Requirement
)
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Seed initial data for admissions app'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # Create Programs
        programs = [
            {
                'name': 'Pre-Primary (Ages 3-5)',
                'code': 'PREP',
                'duration': '3 years',
                'capacity': 60,
                'description': 'Early childhood development and foundational learning',
                'icon': 'Heart',
                'color': 'from-pink-500 to-rose-500'
            },
            {
                'name': 'Primary (Grades 1-7)',
                'code': 'PRIM',
                'duration': '7 years',
                'capacity': 120,
                'description': 'Comprehensive primary education with holistic development',
                'icon': 'BookOpen',
                'color': 'from-blue-500 to-indigo-500'
            },
            {
                'name': 'Lower Secondary (S1-S4)',
                'code': 'LSEC',
                'duration': '4 years',
                'capacity': 100,
                'description': 'UNEBB curriculum with focus on sciences and arts',
                'icon': 'GraduationCap',
                'color': 'from-purple-500 to-violet-500'
            },
            {
                'name': 'Upper Secondary (S5-S6)',
                'code': 'USEC',
                'duration': '2 years',
                'capacity': 80,
                'description': 'Advanced level with specialized subject combinations',
                'icon': 'Target',
                'color': 'from-orange-500 to-red-500'
            },
            {
                'name': 'International Baccalaureate',
                'code': 'IB',
                'duration': '2 years',
                'capacity': 40,
                'description': 'Globally recognized pre-university program',
                'icon': 'Globe',
                'color': 'from-green-500 to-emerald-500'
            },
        ]
        
        for prog in programs:
            Program.objects.get_or_create(
                code=prog['code'],
                defaults=prog
            )
        
        # Create Requirements
        requirements = [
            {'text': 'Completed application form', 'icon': 'FileText', 'color': 'text-blue-600', 'order': 1},
            {'text': 'Previous school reports (last 2 years)', 'icon': 'BookOpen', 'color': 'text-purple-600', 'order': 2},
            {'text': 'Birth certificate (copy)', 'icon': 'Shield', 'color': 'text-green-600', 'order': 3},
            {'text': 'Passport photos (2)', 'icon': 'Camera', 'color': 'text-orange-600', 'order': 4},
            {'text': 'Immunization records', 'icon': 'Heart', 'color': 'text-red-600', 'order': 5},
            {'text': 'Recommendation letter (optional)', 'icon': 'Star', 'color': 'text-yellow-600', 'order': 6, 'is_mandatory': False},
        ]
        
        for req in requirements:
            Requirement.objects.get_or_create(
                text=req['text'],
                defaults=req
            )
        
        # Create Important Dates
        today = date.today()
        dates = [
            {'event': 'Applications Open', 'date': date(today.year, 1, 15), 'badge_color': 'bg-green-100 text-green-800'},
            {'event': 'Early Bird Deadline', 'date': date(today.year, 2, 28), 'badge_color': 'bg-blue-100 text-blue-800'},
            {'event': 'Regular Deadline', 'date': date(today.year, 3, 30), 'badge_color': 'bg-yellow-100 text-yellow-800'},
            {'event': 'Entrance Exams', 'date': date(today.year, 4, 5), 'badge_color': 'bg-purple-100 text-purple-800'},
            {'event': 'Interviews', 'date': date(today.year, 4, 15), 'badge_color': 'bg-indigo-100 text-indigo-800'},
            {'event': 'Results Released', 'date': date(today.year, 5, 1), 'badge_color': 'bg-orange-100 text-orange-800'},
        ]
        
        for d in dates:
            ImportantDate.objects.get_or_create(
                event=d['event'],
                defaults={'date': d['date'], 'badge_color': d['badge_color']}
            )
        
        # Create FAQs
        faqs = [
            {
                'question': 'When should I apply?',
                'answer': 'We recommend applying as early as possible. The application deadline is March 30, 2026. Early applications have a better chance of securing a spot and qualify for early bird discounts.',
                'order': 1
            },
            {
                'question': 'Is there an application fee?',
                'answer': 'Yes, there is a non-refundable application fee of UGX 50,000. This covers processing, assessment costs, and initial documentation review.',
                'order': 2
            },
            {
                'question': 'Do you offer scholarships?',
                'answer': 'Yes, we offer merit-based and need-based scholarships. Contact our admissions office for details and application forms. Scholarships cover up to 50% of tuition fees.',
                'order': 3
            },
            {
                'question': 'Can I visit the campus before applying?',
                'answer': 'Absolutely! We encourage campus visits. Schedule a tour through our contact page and experience our facilities, meet teachers, and see our learning environment firsthand.',
                'order': 4
            },
            {
                'question': 'What is the student-teacher ratio?',
                'answer': 'Our average class size is 25 students with a student-teacher ratio of 15:1, ensuring personalized attention and support for every student.',
                'order': 5
            },
        ]
        
        for faq in faqs:
            FAQ.objects.get_or_create(
                question=faq['question'],
                defaults={'answer': faq['answer'], 'order': faq['order']}
            )
        
        # Create Testimonials
        testimonials = [
            {
                'name': 'Sarah Johnson',
                'role': 'Parent',
                'content': 'The admissions process was smooth and transparent. My daughter loves the supportive environment.',
                'rating': 5
            },
            {
                'name': 'Michael Chen',
                'role': 'Student',
                'content': 'The teachers are amazing and really care about our success. Best decision ever!',
                'rating': 5
            },
            {
                'name': 'Dr. Akello Patricia',
                'role': 'Alumni Parent',
                'content': 'Three of my children graduated from here. The quality of education is outstanding.',
                'rating': 5
            },
        ]
        
        for test in testimonials:
            Testimonial.objects.get_or_create(
                name=test['name'],
                defaults={'role': test['role'], 'content': test['content'], 'rating': test['rating']}
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded data'))