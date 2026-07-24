# هوية NESP — منصة الإدارة التنفيذية للخدمات التمريضية
### مستشفى جازان التخصصي · Jazan Specialist Hospital

حزمة الهوية الموحّدة المستخرجة من الشعار الرسمي، جاهزة لمشروعك على Vercel/GitHub ولـ Figma.

---

## 📁 محتويات الحزمة

```
nesp-brand/
├── logo/
│   ├── lockup-navy-master.png            ← القفل الرسمي الكامل (كما في صورتك) 992×1040
│   ├── lockup-navy-transparent.png       ← القفل الكامل بخلفية شفافة
│   ├── mark-white-transparent.png        ← الرمز فقط (أبيض) شفاف — للخلفيات الكحلية
│   ├── mark-blue-transparent.png         ← الرمز فقط (أزرق) شفاف — للخلفيات البيضاء
│   └── NespLogo.jsx                       ← مكوّن React جاهز للقفل الرسمي
├── tokens/
│   ├── nesp-tokens.json                   ← مرجع كل قيم الهوية
│   ├── nesp-brand.css                     ← متغيّرات CSS جاهزة
│   └── tailwind.nesp.js                   ← إعداد Tailwind
├── guidelines/
│   └── nesp-brand-guidelines.html         ← دليل الهوية (افتحه في المتصفح)
└── figma/
    ├── manifest.json
    └── code.js                            ← بلجن Figma ينشئ الهوية تلقائياً
```

---

## 🎨 ألوان الهوية (مستخرجة من الشعار)

| اللون | Hex | الاستخدام |
|------|-----|----------|
| Navy | `#102037` | الأساسي — خلفيات، رؤوس |
| Navy 800 | `#18283C` | أسطح مرتفعة |
| Blue | `#3C78A8` | العناصر التفاعلية |
| Blue Light | `#609CC0` | إبرازات، تدرّجات |
| Sky | `#8FC1DB` | خلفيات ناعمة |
| White | `#FBFCFC` | النص على الكحلي |

---

## 🚀 الاستخدام في مشروع React (CliNurse / Vercel)

**1. انسخ الأصول:** ضع مجلد `logo/` داخل `public/assets/nesp/`.

**2. اربط الـ CSS:** في `src/main.tsx` أو `index.css`:
```js
import './assets/nesp/nesp-brand.css';
```

**3. Tailwind (اختياري):** ادمج `tailwind.nesp.js` في `theme.extend` داخل `tailwind.config.js`.

**4. استخدم الشعار:**
```jsx
import NespLogo from './assets/nesp/NespLogo';
<NespLogo variant="navy" />     // على خلفية كحلية
<NespLogo variant="light" />    // على خلفية بيضاء
```

---

## 🖼️ تشغيل بلجن Figma (خطوة بخطوة)

مقعدك الحالي في Figma "View" فقط. للتشغيل تحتاج مقعد **Editor** (مجاني عبر خطة Starter).

1. افتح تطبيق **Figma Desktop** (وليس المتصفح).
2. من القائمة: **Menu → Plugins → Development → New plugin…**
3. اختر **"Link existing plugin"** ثم اختر ملف `figma/manifest.json`.
4. افتح ملف تصميم جديد، ثم **Menu → Plugins → Development → NESP Brand Setup**.
5. سيُنشئ البلجن: متغيّرات الألوان + صفحة "NESP Brand" فيها القفل الرسمي ولوحة الألوان.
6. **أضف الرمز:** اسحب `mark-white-transparent.png` وأفلته داخل الإطار المُعلّم "★ ضع صورة الرمز هنا".

> ملاحظة: النصوص العربية تحتاج خط **IBM Plex Sans Arabic** مثبّتاً في Figma. إن لم يكن مثبّتاً، سيستخدم البلجن خطاً بديلاً تلقائياً.

---

## 📐 قواعد الاستخدام

✔ **افعل:** حافظ على مساحة الفراغ (نصف ارتفاع الرمز)، النسخة البيضاء على الكحلي والزرقاء على الأبيض، النسب الأصلية.

✘ **لا تفعل:** تغيير الألوان، إضافة تأثيرات، خلفيات منخفضة التباين، تشويه الأبعاد أو التدوير.

---

*الهوية متوافقة مع معايير الهوية البصرية لوزارة الصحة السعودية (MOH-KSA).*
