🏫 Model Islamic Nursery & Primary School Website

A modern web platform for Model Islamic Nursery and Primary School (Arua, Uganda) built using Django.
The system is designed to improve communication, school management, and online presence.

🚀 Project Overview

This website helps the school to:

Share announcements and updates
Display school programs and activities
Showcase gallery and events
Provide admission information
Improve communication with parents and students
🛠️ Tech Stack
Python (Django)
HTML, CSS, JavaScript
Bootstrap / Tailwind (if used)
SQLite / PostgreSQL
Git & GitHub
📂 Project Structure
model-islamic/
│
├── oasis_backend/
│   ├── settings.py
│   ├── urls.py
│   ├── apps/
│   ├── media/
│
├── frontend/ (if applicable)
├── templates/
├── static/
├── requirements.txt
└── manage.py
⚙️ Installation
1. Clone repository
git clone https://github.com/sangaben/model_islamic.git
cd model_islamic
2. Create virtual environment
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
3. Install dependencies
pip install -r requirements.txt
4. Run migrations
python manage.py makemigrations
python manage.py migrate
5. Create superuser
python manage.py createsuperuser
6. Run server
python manage.py runserver
🌍 Features
🏫 School profile pages
📰 News & announcements
📸 Gallery for school activities
🧑‍🏫 Staff & teacher information
📝 Admission information section
📱 Mobile-friendly design
📸 Media Handling

Uploaded files are stored in:

media/gallery/

⚠️ Note: Media files are excluded from Git for performance and security reasons.

⚠️ Important Notes
Do NOT push venv/ to GitHub
Do NOT push media files (images/videos)
Always use requirements.txt for dependencies
👨‍💻 Developer

Sanga Biz
Developer | Founder of EduRise Initiative | EcoHope Co. Ltd
Uganda 🇺🇬

📜 License

This project is for educational and institutional use.
