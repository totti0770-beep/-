#!/bin/bash
echo "🚀 بدء نشر منصة الإدارة التنفيذية للتمريض على Google Cloud Run..."

# تفعيل الخدمات المطلوبة
gcloud services enable run.googleapis.com containerregistry.googleapis.com cloudbuild.googleapis.com

# الحصول على معرف المشروع
export PROJECT_ID=$(gcloud config get-value project)

# بناء الحاوية ورفعها
echo "📦 جاري بناء الحاوية..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/nursing-admin-system

# النشر على Cloud Run
echo "☁️ جاري النشر على Cloud Run..."
gcloud run deploy nursing-admin-system \
    --image gcr.io/$PROJECT_ID/nursing-admin-system \
    --platform managed \
    --region me-central1 \
    --allow-unauthenticated

echo "✅ اكتمل النشر! يمكنك الآن الدخول للرابط المولد أعلاه."
