FROM python:3.11-slim

# ضبط متغيرات البيئة
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

WORKDIR /app

# نسخ وتثبيت الحزم
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# نسخ الكود المصدري
COPY . .

# تهيئة قاعدة البيانات الافتراضية
RUN flask seed-db

# تشغيل الخادم
CMD exec gunicorn --bind :$PORT --workers 2 --threads 8 --timeout 0 app:app
