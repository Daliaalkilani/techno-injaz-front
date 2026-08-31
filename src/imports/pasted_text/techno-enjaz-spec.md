# TECHONO ENJAZ — PUBLIC WEBSITE UI/UX BUILD SPECIFICATION

## 0. دورك

أنت تعمل كـ **Senior Product Designer + Senior Front-end Engineer** متخصص في بناء واجهات احترافية لمواقع الشركات التقنية والهندسية وDigital Portfolios.

مهمتك ليست شرح التصميم أو اقتراح Wireframes فقط.

**مهمتك هي بناء الواجهة الأمامية للموقع فعليًا داخل المشروع الحالي، وإنشاء جميع الصفحات والمكونات والتنقلات والحالات والتفاعلات المطلوبة.**

يجب أن يكون الناتج النهائي **Production-quality UI** منظمًا وقابلًا للتطوير، وليس مجرد Mockup بصري.

عند وجود تفاصيل غير محددة في المواصفات، اتخذ القرار التصميمي الأفضل بنفسك بما يتوافق مع هوية المكتب وطبيعة الموقع، ولا تتوقف لطلب توضيحات.

---

# 1. طبيعة المشروع

الموقع هو الموقع الرسمي والبورتفوليو الرقمي لمكتب:

**تكنو إنجاز الهندسي — TECHNO ENJAZ**

المكتب متخصص في تنفيذ وتطوير مشاريع التخرج والمشاريع التقنية والهندسية للطلاب.

الموقع هو:

**Digital Engineering Portfolio / Digital Catalog**

وليس:

* متجرًا إلكترونيًا
* منصة بيع
* منصة شراء
* نظام دفع
* Shopping Cart
* Checkout
* Invoices
* E-commerce

أي تفاعل تجاري يجب أن يظهر باعتباره:

* تواصل
* استشارة
* طلب معلومات
* طلب تنفيذ مشروع
* استفسار

وليس "شراء منتج".

---

# 2. المرجع الحالي

استخدم الموقع الحالي كمرجع لفهم طبيعة المحتوى والبنية:

https://fable5.abdalgani.com/

الموقع الحالي يحتوي على محتوى ومفاهيم نريد الاستفادة منها، مثل:

* المشاريع
* التصنيفات
* المقالات
* الفيديوهات
* الصور
* الجامعات
* الإحصائيات
* البحث
* صفحات تفاصيل المشاريع

**لكن لا تنسخ التصميم الحالي.**

أعد بناء التجربة بصريًا من الصفر بأسلوب أكثر حداثة واحترافية.

الهدف هو أن يبدو الموقع الجديد كـ:

> شركة هندسية وتقنية احترافية لديها Portfolio قوي

وليس:

> موقعًا أكاديميًا تقليديًا أو معرضًا عشوائيًا لمشاريع الطلاب.

---

# 3. النطاق Scope

## مهم جدًا

في هذه المرحلة قم ببناء:

**PUBLIC WEBSITE ONLY**

لا تقم ببناء:

* Admin Dashboard
* Admin Login
* User Dashboard
* Company Dashboard
* Authentication
* إدارة المحتوى
* إدارة المستخدمين

هذه الأنظمة موجودة أو سيتم تنفيذها لاحقًا.

الواجهة الحالية يجب أن تركز بالكامل على تجربة الزائر.

---

# 4. اللغة والاتجاه

الموقع عربي بالكامل.

يجب تطبيق:

```html
<html lang="ar" dir="rtl">
```

كل الواجهات RTL.

استخدم اللغة العربية في:

* العناوين
* الأزرار
* الرسائل
* الفلاتر
* النماذج
* Breadcrumbs
* حالات التحميل
* حالات الخطأ
* Empty states

يمكن استخدام المصطلحات التقنية الإنجليزية داخل المحتوى عند الحاجة، مثل:

* AI
* IoT
* Robotics
* Arduino
* ESP32
* Python
* React
* Computer Vision

لكن واجهة المستخدم نفسها عربية.

---

# 5. الهوية البصرية

أريد هوية:

**Modern Engineering + Technology + Premium + Trustworthy**

وليست:

* Gaming
* Cyberpunk مبالغ فيه
* Neon مبالغ فيه
* Startup طفولي
* University portal
* E-commerce

## الاتجاه البصري

استخدم:

* مساحات بيضاء مريحة
* Typography قوية
* Grid هندسي دقيق
* خطوط رفيعة
* حدود خفيفة
* Cards نظيفة
* صور كبيرة
* تدرجات بسيطة عند الحاجة
* Micro-interactions هادئة
* تفاصيل مستوحاة من Engineering / Blueprint / Technical drawings

يمكن استخدام:

* Navy
* Charcoal
* Off-white
* لون Accent تقني واحد مثل Cyan أو Emerald

لكن لا تستخدم ألوانًا كثيرة.

**اجعل اللون الأساسي Accent واحدًا واضحًا.**

---

# 6. Typography

استخدم خطًا عربيًا حديثًا واحترافيًا مثل:

* IBM Plex Sans Arabic
* أو Tajawal
* أو Cairo

اختر خطًا واحدًا رئيسيًا للواجهة ولا تخلط عدة خطوط دون سبب.

Hierarchy واضحة:

```text
Display
H1
H2
H3
Body
Caption
Label
```

العناوين يجب أن تكون قوية وواضحة.

النصوص الطويلة يجب أن تكون مريحة للقراءة.

---

# 7. Responsive / Mobile First

صمم الموقع من البداية ليعمل على:

* Mobile
* Tablet
* Desktop
* Large Desktop

لا تعتبر Responsive مجرد تصغير العناصر.

حدد Layout مختلفًا فعليًا عند الحاجة.

## Mobile

* Navbar تتحول إلى Hamburger Menu
* Filters تتحول إلى Bottom Sheet / Drawer
* Cards تصبح عمودًا واحدًا أو Carousel عند الحاجة
* Project Gallery تصبح Swipeable
* CTA للتواصل يكون سهل الوصول
* PDF Viewer مصمم خصيصًا للموبايل
* الجداول تتحول إلى Cards أو Horizontal Scroll
* لا تستخدم نصوصًا صغيرة

## Desktop

استفد من المساحة الأفقية.

استخدم:

* Grid
* Two-column layouts
* Side filters
* Large media
* Sticky elements عند الحاجة

---

# 8. نظام التصميم Design System

قبل بناء الصفحات، أنشئ Design System داخليًا قابلًا لإعادة الاستخدام.

يجب أن توجد مكونات مشتركة مثل:

### Layout

* Header
* Footer
* Container
* Section
* PageHeader

### Navigation

* Navbar
* MobileMenu
* Breadcrumbs

### UI

* Button
* IconButton
* Badge
* Tag
* Card
* Modal
* Drawer
* Tabs
* Accordion
* Tooltip

### Content

* ProjectCard
* ArticleCard
* VideoCard
* CategoryCard
* UniversityCard
* StatisticCard

### Forms

* Input
* Textarea
* Select
* Checkbox
* SearchInput

### Feedback

* Skeleton
* EmptyState
* ErrorState
* Toast
* LoadingIndicator

لا تكرر نفس الـ UI يدويًا في كل صفحة.

---

# 9. الصفحات المطلوبة

قم ببناء جميع الصفحات التالية:

```text
/
 /projects
 /projects/:id
 /search
 /articles
 /articles/:slug
 /videos
 /category/:slug
 /about
 /contact
 /404
```

---

# 10. HEADER

Header مشترك في جميع الصفحات.

## Desktop

يحتوي على:

* Logo
* الرئيسية
* المشاريع
* المقالات
* الفيديوهات
* من نحن
* تواصل معنا
* Search Icon/Button

زر CTA واضح:

**اطلب استشارة**

أو:

**تواصل معنا**

لا تجعل الـ Navbar مزدحمًا.

اجعل Header:

* Sticky
* يتحول بصريًا عند Scroll
* خلفية شبه شفافة أو Solid حسب السياق
* Shadow / Border خفيف عند التمرير

---

# 11. MOBILE HEADER

على الهاتف:

```text
Logo
        Search
        Menu
```

يفتح Menu Drawer من اليمين.

يحتوي على جميع روابط الموقع.

أضف CTA واضح:

**تواصل معنا**

---

# 12. HOME PAGE /

هذه أهم صفحة في الموقع.

## Hero

صمم Hero قويًا جدًا.

المحتوى:

### Eyebrow

**TECHNO ENJAZ | ENGINEERING PORTFOLIO**

### Main Heading

مثال:

**نحوّل الأفكار الهندسية إلى مشاريع تقنية قابلة للتنفيذ**

### Description

نص مختصر يشرح أن المكتب يعمل على مشاريع التخرج والمشاريع التقنية والهندسية.

### CTA Primary

**استكشف مشاريعنا**

→ `/projects`

### CTA Secondary

**تواصل معنا**

→ `/contact`

أضف Visual قويًا في Hero:

* صورة مشروع
* Robot
* Electronic board
* AI visualization
* أو Composition من عدة مشاريع

يمكن استخدام Motion خفيف.

لا تستخدم Hero مزدحمًا.

---

# 13. HOME — Statistics

بعد Hero مباشرة.

اعرض إحصائيات المكتب.

مثال:

```text
+130
مشروعًا منفذًا

+100
مشروع تخرج

+20
مجالًا تقنيًا

+2700
صورة وفيديو
```

الأرقام يجب أن تكون واضحة وقابلة للـ Count-up Animation.

استخدم Mock Data حاليًا.

لا تربط Backend الآن.

---

# 14. HOME — SERVICES

قسم:

**ماذا ننفذ؟**

اعرض الخدمات/المجالات الأساسية.

مثال:

* Robotics
* Artificial Intelligence
* IoT
* Embedded Systems
* Web Development
* Mobile Applications
* Networks
* Electronics
* Computer Vision
* Automation

كل Card يحتوي:

* Icon / Visual
* اسم المجال
* وصف قصير
* عدد المشاريع
* Arrow

عند النقر:

→ `/category/:slug`

---

# 15. HOME — FEATURED PROJECTS

عنوان:

**مشاريع مختارة**

وصف قصير.

اعرض 6 مشاريع مميزة.

Project Card يحتوي:

* صورة رئيسية
* اسم المشروع
* التصنيف
* الجامعة
* السنة
* نوع المشروع
* Technologies
* Arrow

Hover:

* Image zoom خفيف
* Card elevation
* ظهور Arrow

CTA:

**استعرض جميع المشاريع**

→ `/projects`

---

# 16. HOME — ROBOTICS FEATURE

بما أن Robotics من أهم أنواع المشاريع، أضف Section مميزًا.

عنوان:

**من المختبر إلى الواقع**

أو:

**Robotics Projects**

يعرض مشروعًا أو مشروعين بشكل بصري كبير.

يحتوي:

* صورة كبيرة
* فيديو قصير أو Video Thumbnail
* وصف مختصر لما يقوم به الروبوت
* Technologies
* CTA

**شاهد المشروع**

---

# 17. HOME — ARTICLES

قسم:

**من مدونة تكنو إنجاز**

اعرض 3 أو 4 مقالات.

Article Card:

* Cover Image
* Category
* Title
* Short excerpt
* Reading time
* Date
* Arrow

CTA:

**جميع المقالات**

---

# 18. HOME — VIDEOS

اعرض مجموعة صغيرة من فيديوهات المشاريع.

كل Video Card:

* Thumbnail
* Play button
* Title
* Category
* Duration

النقر يفتح Video Modal أو صفحة الفيديو.

CTA:

**استكشف جميع الفيديوهات**

---

# 19. HOME — TRUST SECTION

أضف قسمًا يعطي ثقة للمستخدم.

يمكن أن يحتوي على:

* عدد المشاريع
* الجامعات
* المجالات
* سنوات الخبرة
* أو شعارات جامعات إذا كانت البيانات حقيقية

لا تستخدم Testimonials وهمية.

إذا لم توجد شهادات حقيقية، لا تضفها.

---

# 20. HOME — FINAL CTA

في نهاية الصفحة:

عنوان قوي:

**لديك فكرة مشروع؟**

نص:

**شاركنا فكرتك وسنساعدك في تحويلها إلى مشروع تقني واضح وقابل للتنفيذ.**

Buttons:

**تحدث معنا**

**اطلب استشارة**

---

# 21. FOOTER

Footer يحتوي:

* Logo
* وصف قصير للمكتب
* روابط الموقع
* الخدمات
* معلومات التواصل
* الهاتف
* العنوان
* Instagram
* WhatsApp
* Copyright

العنوان:

**حماة – ساحة العاصي – بناء الخاني – بجوار أفران السلام – الطابق الرابع**

الهاتف:

**0958794195**

Instagram:

**@TECHNO_ENJAZ**

اجعل الهاتف قابلًا للنقر:

```text
tel:0958794195
```

---

# 22. PROJECTS PAGE /projects

عنوان:

**مشاريعنا**

وصف:

**استكشف مجموعة من المشاريع الهندسية والتقنية التي تم تنفيذها وتطويرها.**

## Search

Search input واضح:

**ابحث عن مشروع...**

## Filters

Desktop:

Sidebar أو Filter Bar.

الفلاتر:

### المجال

* Robotics
* AI
* IoT
* Embedded
* Web
* Mobile
* Networking
* Electronics
* وغيرها

### نوع المشروع

* مشروع تخرج
* مشروع فصلي
* حلقة بحث
* عمل شركة

### الجامعة

Dropdown.

### السنة

Dropdown.

### التقنيات

Multi-select.

### وجود فيديو

Checkbox.

### وجود تقرير PDF

Checkbox.

## Sorting

* الأحدث
* الأكثر مشاهدة
* أبجديًا

---

# 23. PROJECT CARD

يجب أن تكون موحدة في الموقع.

تحتوي:

```text
Image

Badge: مشروع تخرج

Title

University

Year

Category

Technology Tags

View Project →
```

لا تضع معلومات كثيرة جدًا داخل Card.

الأولوية:

1. الصورة
2. الاسم
3. المجال
4. الجامعة/السنة
5. CTA

---

# 24. PROJECTS STATES

نفذ الحالات التالية:

### Loading

Skeleton Cards.

### Empty

رسالة:

**لم نجد مشاريع مطابقة لخيارات البحث.**

زر:

**مسح الفلاتر**

### Error

رسالة واضحة مع:

**إعادة المحاولة**

### Normal

Grid المشاريع.

---

# 25. PROJECT DETAILS /projects/:id

هذه أهم صفحة بعد Home.

يجب أن تبدو كصفحة Case Study احترافية، وليس صفحة Product.

## Breadcrumb

الرئيسية / المشاريع / اسم المشروع

---

# 26. PROJECT HERO

اعرض:

* Project Title
* Category
* Project Type
* University
* Year

ثم صورة/فيديو Hero كبير.

أسفل العنوان:

Technology Tags.

أضف:

**مشاركة المشروع**

* Copy Link
* WhatsApp
* Facebook إن لزم

وأضف Favorite محلي:

**♡ حفظ المشروع**

بدون تسجيل دخول باستخدام LocalStorage.

---

# 27. PROJECT OVERVIEW

قسم:

**عن المشروع**

شرح مختصر.

ثم:

### المشكلة

ما المشكلة التي يحلها المشروع؟

### الحل

كيف عالج المشروع المشكلة؟

### الهدف

أهداف المشروع.

لا تستخدم نصوص Lorem Ipsum في النسخة النهائية؛ استخدم Mock Data عربية واقعية.

---

# 28. TECHNICAL SPECIFICATION

اعرض:

### التقنيات المستخدمة

مثال:

```text
Arduino
ESP32
Python
OpenCV
TensorFlow
React
Firebase
```

### Hardware

### Software

### Communication

### Sensors

حسب المشروع.

استخدم Grid أو Table نظيفة.

---

# 29. PROJECT ARCHITECTURE

إذا كان المشروع يحتوي Architecture:

اعرض:

**System Architecture**

صورة أو Diagram كبيرة.

يمكن فتحها Fullscreen.

إذا لم توجد Architecture، أخفِ القسم بدل ترك مساحة فارغة.

---

# 30. PROJECT MEDIA

قسم:

**معرض المشروع**

Gallery احترافي.

Features:

* Masonry / Grid
* Lightbox
* Fullscreen
* Next / Previous
* Zoom

Lazy loading.

---

# 31. PROJECT VIDEO

قسم:

**شاهد المشروع أثناء العمل**

Video Player كبير.

إذا كان Robotics:

* الفيديو يكون عنصرًا أساسيًا وليس ثانويًا.
* أظهر وصفًا لما يحدث في الفيديو.

---

# 32. PROJECT ARTICLE

إذا كان هناك مقال/شرح مرتبط:

اعرض:

**شرح المشروع**

مع:

* Introduction
* How it works
* Components
* Implementation
* Results
* Conclusion

CTA:

**اقرأ الشرح الكامل**

→ `/articles/:slug`

---

# 33. PROJECT PDF — 3D FLIPBOOK

هذه ميزة رئيسية في الموقع.

اعرض:

**التقرير الكامل للمشروع**

Button:

**فتح التقرير**

عند الضغط افتح Fullscreen Modal / Viewer.

التجربة:

* PDF يظهر ككتاب حقيقي
* Page Flip Animation
* Next / Previous
* Zoom
* Fullscreen
* Page Number
* Keyboard Navigation على Desktop
* Swipe على Mobile

التقنية المقترحة:

```text
pdfjs-dist
+
react-pageflip / StPageFlip
```

يمكن تحويل صفحات PDF إلى Canvas / Images وعرضها داخل Page Flip.

## مهم جدًا:

لا تدّعِ أن PDF يمكن "منع تنزيله" بشكل أمني كامل.

من جهة المتصفح لا يمكن ضمان منع المستخدم من حفظ المحتوى إذا كانت الصفحات قد وصلت إلى جهازه.

لذلك في الـ UI:

* لا تعرض Download Button
* لا تعرض رابط PDF مباشرًا للمستخدم
* لا تعرض browser PDF viewer التقليدي
* استخدم Canvas / rendered pages
* لا تكشف رابط الملف في الواجهة
* عطّل Context Menu داخل الـ Viewer إن كان مناسبًا
* عطّل drag للصور
* يمكن إضافة watermark بصري باسم المكتب

لكن اعتبر ذلك **Discouraging Download وليس Security Mechanism**.

---

# 34. RELATED PROJECTS

أسفل Project Details:

**مشاريع قد تهمك**

اعرض 3–4 مشاريع مشابهة بناءً على:

* Category
* Technologies
* University

---

# 35. PROJECT FINAL CTA

في نهاية كل مشروع:

**هل تبحث عن مشروع مشابه؟**

زر:

**تواصل معنا**

→ `/contact`

---

# 36. SEARCH PAGE /search

صفحة بحث متقدمة.

Hero صغير:

**ابحث في مشاريع تكنو إنجاز**

Search Input كبير.

أثناء الكتابة:

Instant suggestions.

يمكن اقتراح:

* Projects
* Articles
* Categories
* Universities

Results:

```text
المشاريع
المقالات
الفيديوهات
```

استخدم Tabs.

Filters جانبية Desktop.

Drawer على Mobile.

---

# 37. ARTICLES /articles

صفحة Blog / Technical Journal.

Header:

**المقالات التقنية**

وصف قصير.

Categories:

* AI
* Robotics
* IoT
* Embedded
* Web
* Networking

Grid.

كل Card:

* Image
* Category
* Title
* Excerpt
* Reading time
* Date

Pagination أو Load More.

---

# 38. ARTICLE DETAILS /articles/:slug

صفحة قراءة احترافية.

يجب أن تكون القراءة هي الأولوية.

Layout:

Desktop:

```text
Main Article
+
Sticky Table of Contents
```

Mobile:

Table of Contents داخل Accordion.

المحتوى:

* Cover
* Title
* Metadata
* Introduction
* Headings
* Images
* Technical diagrams
* Code blocks
* Tables
* Conclusion

إذا كان المقال مرتبطًا بمشروع:

اعرض:

**المشروع المرتبط**

CTA:

**استكشف المشروع**

---

# 39. VIDEOS /videos

عنوان:

**فيديوهات المشاريع**

Grid.

Filters:

* Category
* Year

Video Card:

* Thumbnail
* Play
* Title
* Category
* Duration

عند النقر:

Modal Player أو صفحة التفاصيل حسب المحتوى.

---

# 40. CATEGORY PAGE /category/:slug

هذه ليست مجرد صفحة Filter.

كل Category لها Landing Page خاصة.

مثال:

`/category/robotics`

Hero:

# Robotics

وصف المجال.

ثم:

### مشاريع Robotics

Grid.

### فيديوهات Robotics

Horizontal/Video Grid.

### تقنيات مستخدمة

Tags.

### صور

Gallery.

### مقالات مرتبطة

Cards.

وفي النهاية:

CTA.

إذا لم توجد بيانات كافية لأحد الأقسام، أخفِ القسم بدل عرض Empty State غير ضرورية.

---

# 41. ABOUT /about

صفحة:

**من نحن**

تشرح المكتب وهويته.

Sections:

### من نحن

### رؤيتنا

### ماذا نقدم؟

### منهجية العمل

اعرض Process:

```text
01 — فهم الفكرة
02 — تحليل المتطلبات
03 — التصميم
04 — التطوير
05 — الاختبار
06 — التوثيق
07 — التسليم
```

ثم:

### المجالات التي نعمل بها

ثم Team إذا كانت بيانات الفريق متوفرة.

لا تخترع أسماء أو صورًا.

---

# 42. CONTACT /contact

Hero:

**تواصل معنا**

نص:

**لديك فكرة مشروع أو استفسار؟ تواصل معنا.**

## Contact Cards

### الموقع

حماة – ساحة العاصي – بناء الخاني – بجوار أفران السلام – الطابق الرابع

### الهاتف

0958794195

### Instagram

@TECHNO_ENJAZ

### WhatsApp

زر مباشر.

---

# 43. CONTACT FORM

Fields:

```text
الاسم
رقم الهاتف
الجامعة
الاختصاص
نوع المشروع
رسالتك
```

Button:

**إرسال الاستفسار**

لا تستخدم:

* Buy
* Order Product
* Checkout
* Payment

بعد الإرسال:

Success State:

**تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.**

---

# 44. MAP

ضع خريطة للموقع.

يجب أن تكون واضحة ومناسبة للموبايل.

أضف زر:

**فتح الموقع في الخرائط**

---

# 45. 404

صفحة 404 بنفس الهوية.

مثال:

**يبدو أن هذه الصفحة خرجت عن المسار.**

زر:

**العودة للرئيسية**

وزر:

**استكشف المشاريع**

لا تستخدم تصميمًا منفصلًا عن الهوية.

---

# 46. GLOBAL UX FEATURES

أضف:

## Dark / Light Mode

يفضل دعم:

* Light
* Dark

لكن Dark Mode يجب أن يكون احترافيًا وليس Cyberpunk.

احفظ الاختيار في LocalStorage.

---

## Back To Top

في الصفحات الطويلة.

---

## Breadcrumbs

في:

* Project
* Category
* Article

---

## Share

Project / Article:

* Copy Link
* WhatsApp
* Social sharing عند الحاجة

---

## Favorites

بدون Login.

LocalStorage.

---

## WhatsApp Floating Button

Floating CTA واضح ولكن غير مزعج.

---

# 47. LOADING STATES

كل صفحة تعتمد على بيانات يجب أن تحتوي Skeleton.

لا تستخدم Spinner واحدًا يغطي الصفحة كلها إلا عند الضرورة.

Skeleton يجب أن يشبه Layout النهائي.

---

# 48. ERROR STATES

كل API/Data Section يجب أن يحتوي Error State.

مثال:

**تعذر تحميل المشاريع.**

Button:

**إعادة المحاولة**

لا تعرض شاشة بيضاء.

---

# 49. EMPTY STATES

أمثلة:

**لا توجد مشاريع في هذا التصنيف حاليًا.**

**لا توجد نتائج مطابقة لبحثك.**

**لا توجد مقالات حاليًا.**

مع CTA مناسب.

---

# 50. MOCK DATA

في مرحلة التصميم لا تنتظر Backend.

أنشئ Mock Data منظمة في ملفات منفصلة.

مثلاً:

```text
src/data/projects.ts
src/data/articles.ts
src/data/categories.ts
src/data/videos.ts
src/data/universities.ts
```

يجب أن تكون البيانات عربية واقعية.

أنشئ على الأقل:

* 12 مشروعًا
* 8 مقالات
* 8 فيديوهات
* 8 تصنيفات
* 5 جامعات

بحيث تظهر الصفحات وكأنها موقع حقيقي.

---

# 51. DATA MODEL للمشروع

اجعل Mock Project يحتوي على الأقل:

```text
id
slug
title
shortDescription
description
category
categories[]
type
year
university
students[]
supervisors[]
coverImage
images[]
videos[]
technologies[]
hardware[]
software[]
architectureImage
articleSlug
pdfUrl
views
featured
```

إذا كانت بعض البيانات غير متوفرة، اجعل الحقل optional.

---

# 52. ROUTING

استخدم:

**react-router**

Routes:

```text
/
 /projects
 /projects/:id
 /search
 /articles
 /articles/:slug
 /videos
 /category/:slug
 /about
 /contact
 *
```

كل الروابط يجب أن تعمل.

لا تستخدم أزرارًا وهمية لا تؤدي إلى صفحات.

---

# 53. PERFORMANCE

طبّق:

* Lazy loading للصور
* Responsive images
* Lazy loading للفيديو
* Code splitting للصفحات الثقيلة
* Lazy load لـ PDF viewer
* عدم تحميل PDF قبل فتحه
* عدم تحميل Gallery كاملة دفعة واحدة
* تجنب animations الثقيلة

---

# 54. ACCESSIBILITY

يجب دعم:

* Semantic HTML
* aria-label للأيقونات
* Keyboard navigation
* Focus states
* Contrast مناسب
* Alt text
* Visible focus
* Buttons حقيقية بدل div clickable
* Dialog accessibility
* Keyboard navigation للـ PDF Viewer

---

# 55. MICRO-INTERACTIONS

استخدم Animation باعتدال.

أريد:

* Fade
* Slide
* Scale بسيط
* Hover
* Image zoom
* Count-up
* Page transitions خفيفة

لا أريد:

* Parallax مبالغ
* عناصر تطير
* Infinite animations
* Neon effects
* Animation تؤثر على سرعة الموقع

الهدف:

**Premium + Engineering + Calm**

---

# 56. IMPORTANT DESIGN RULES

لا تستخدم:

* Lorem Ipsum
* صور عشوائية لا علاقة لها بالمشاريع
* ألوان كثيرة
* Gradients مبالغ فيها
* Cards ضخمة بلا سبب
* أزرار كثيرة
* Popups مزعجة
* Newsletter غير مطلوبة
* E-commerce patterns
* Pricing tables
* Shopping cart
* Checkout
* Fake reviews
* Fake statistics

كل عنصر يجب أن يخدم:

**Portfolio + Trust + Discovery + Contact**

---

# 57. CONTENT PRIORITY

رتب المعلومات حسب أهمية المستخدم.

في المشروع:

```text
1. ماذا أنجز المكتب؟
2. ما فكرة المشروع؟
3. كيف يعمل؟
4. ما التقنيات المستخدمة؟
5. شاهد المشروع
6. شاهد الصور
7. اقرأ التقرير
8. شاهد مشاريع مشابهة
9. تواصل معنا
```

لا تجعل التفاصيل التقنية الثقيلة تظهر قبل أن يفهم المستخدم المشروع.

---

# 58. SEO FRIENDLY STRUCTURE

اجعل كل صفحة قابلة لإضافة:

```text
title
description
ogImage
canonical
slug
```

Project URL يجب أن يكون:

```text
/projects/project-slug
```

Article:

```text
/articles/article-slug
```

Category:

```text
/category/category-slug
```

---

# 59. FINAL NAVIGATION

الـ Header الأساسي:

```text
الشعار

الرئيسية
المشاريع
المقالات
الفيديوهات
من نحن
تواصل معنا

بحث
```

CTA:

**تواصل معنا**

---

# 60. USER JOURNEY الأساسي

صمم الموقع بحيث يدعم الرحلة التالية:

```text
Instagram / Google
        ↓
Homepage
        ↓
Projects
        ↓
Filter / Search
        ↓
Project Details
        ↓
Photos / Video
        ↓
Technical Description
        ↓
PDF Report
        ↓
Related Projects
        ↓
"هل تريد مشروعًا مشابهًا؟"
        ↓
Contact
```

هذه الرحلة أهم من إضافة عشرات الميزات غير الضرورية.

---

# 61. التصميم النهائي المطلوب

أريد أن يكون الانطباع بعد الدخول إلى الموقع:

> "هذا مكتب هندسي وتقني محترف لديه خبرة ومشاريع حقيقية."

وليس:

> "هذا موقع لبيع مشاريع التخرج."

ولا:

> "هذا موقع جامعي."

ولا:

> "هذا معرض صور."

يجب أن تكون **المشاريع هي البطل الرئيسي للموقع**.

---

# 62. ترتيب البناء

نفذ الموقع بهذا الترتيب:

### المرحلة 1

* Design System
* Theme
* RTL
* Typography
* Header
* Footer
* Routing

### المرحلة 2

* Home
* Projects
* Project Details

### المرحلة 3

* PDF Flipbook
* Gallery
* Video Player

### المرحلة 4

* Articles
* Article Details
* Videos
* Categories

### المرحلة 5

* About
* Contact
* 404

### المرحلة 6

* Search
* Favorites
* Dark Mode
* Animations
* Accessibility
* Performance

---

# 63. قاعدة مهمة أثناء التنفيذ

**لا تكتفِ بإنشاء Skeleton أو Wireframe.**

قم ببناء:

* Layout
* Components
* Typography
* Colors
* Spacing
* Icons
* Cards
* Forms
* States
* Interactions
* Responsive layouts
* Mock content

بحيث أستطيع تشغيل المشروع والتنقل بين الصفحات ورؤية **تجربة الموقع كاملة**.

---

# 64. قاعدة مهمة ثانية

عندما تحتاج إلى اتخاذ قرار لم أحدده صراحة:

**لا تسألني أولًا.**

اختر القرار الأكثر احترافية بناءً على:

1. طبيعة المكتب الهندسية
2. طبيعة المستخدمين وهم طلاب وعملاء محتملون
3. Digital Portfolio UX
4. RTL Arabic UX
5. Mobile-first
6. Accessibility
7. Performance
8. Trust

---

# 65. Definition of Done

اعتبر المهمة مكتملة فقط عندما:

* جميع Routes تعمل
* جميع الصفحات موجودة
* Header/Footer يعملان في كل الصفحات
* Navigation حقيقي
* Mock Data موجودة
* Project Cards تعمل
* Filters تعمل على Mock Data
* Search يعمل
* Project Details مكتمل
* Gallery تعمل
* Video UI يعمل
* PDF Flipbook يعمل أو يكون مهيأ بالكامل للربط
* Contact Form يحتوي Validation وحالات Success/Error
* Mobile Navigation تعمل
* Desktop Layout مكتمل
* RTL صحيح
* Loading States موجودة
* Empty States موجودة
* Error States موجودة
* 404 موجودة
* Dark/Light Mode يعمل
* لا توجد عناصر Placeholder واضحة
* لا توجد روابط ميتة
* التصميم متناسق بين جميع الصفحات
* الموقع يبدو كمنتج واحد متكامل وليس مجموعة صفحات منفصلة.

---

# النتيجة المطلوبة

ابنِ **TECHNO ENJAZ** كـ:

**Premium Arabic RTL Engineering Portfolio**

يكون فيه:

**Projects First**

**Technical Storytelling**

**Visual Case Studies**

**3D PDF Reports**

**Engineering Categories**

**Technical Articles**

**Project Videos**

**Advanced Search**

**Strong Contact Experience**

مع الحفاظ على تجربة بسيطة وسريعة واحترافية.
