# VLEARNIN About Us — Asset Requirements & External Import Guide

All scenes live under `apps/web/public/images/about/<scene>/`.
Supported files per scene:
- `master.webp` (complete approved composition)
- `background.webp` (clean plate without foreground student)
- `student-cutout.png` & `student-cutout.webp` (genuine RGBA alpha-matted cutout)
- `shadow.webp` (contact shadow layer)
- `mobile.webp` (portrait 9:16 mobile composition)
- `cinematic.mp4` (optional 5–8s AI video — Mode A)
- `frames/frame-0001.webp ...` (optional FFmpeg WebP frame sequence — Mode B)
- `scene-manifest.json` (mode, dimensions, anchor coordinates, availability)

## Priority 3 Proof-of-Concept Scenes (Mandatory Student-Centric Prompts)

### 1. Our Vision (`apps/web/public/images/about/vision/`)
- **Mandatory Visual:** Thoughtful Indian college-age woman standing while holding a large open academic book with both hands, looking slightly upwards toward a bright horizon with curiosity and optimism.
- **Expected Files:** `master.webp`, `background.webp`, `student-cutout.png`, `student-cutout.webp`, `mobile.webp`, optional `cinematic.mp4`.
- **Prompt:**
  > Create an extraordinary ultra-photorealistic premium educational advertising artwork featuring a thoughtful Indian college-age woman standing while holding a large open academic book with both hands. She looks slightly upwards toward a naturally illuminated horizon with an expression of curiosity, ambition and optimism. Use realistic human anatomy, natural hair, detailed skin textures, smart-casual clothing and accurate hands holding the complete open book. Behind her, create a subtle aspirational photographic montage representing educational growth, modern professional environments and future career opportunities. Warm ivory (#FAF9F6), deep navy (#10264A), muted blue (#2463A6), soft daylight. Preserve 10–15% safe margin around head, hair, hands and book. No text, no watermark, no cartoon thought bubbles, no rectangular frame.

### 2. Our Mission (`apps/web/public/images/about/mission/`)
- **Mandatory Visual:** Focused Indian college-age student developing a practical laptop-based project with individual guidance from an approachable experienced mentor.
- **Expected Files:** `master.webp`, `background.webp`, `student-cutout.png`, `student-cutout.webp`, `mobile.webp`, optional `cinematic.mp4`.
- **Prompt:**
  > Create a premium ultra-photorealistic educational advertising composition featuring a focused Indian college-age student completing a practical laptop-based project with guidance from an approachable experienced mentor. Capture an authentic moment of understanding and professional development. Include realistic notebooks, project materials, laptop equipment and contemporary academic surroundings. Warm natural daylight, ivory and navy palette, natural wood textures, realistic human anatomy, complete hands and natural laptop contact. No corporate boardroom scene, no embedded text, no watermark.

### 3. Our Educational Philosophy (`apps/web/public/images/about/philosophy/`)
- **Mandatory Visual:** Indian college-age student reading a large open academic book at the emotional centre, surrounded by a coherent photographic montage of knowledge developing into AI, business analytics, financial modelling, digital marketing, and creative media.
- **Expected Files:** `master.webp`, `background.webp`, `student-cutout.png`, `student-cutout.webp`, `mobile.webp`, optional `cinematic.mp4`.
- **Prompt:**
  > Create a world-class photorealistic conceptual educational advertising composition featuring an Indian college-age student reading a large open academic book. Around the student, create a sophisticated cinematic photographic montage representing practical applications of knowledge through artificial intelligence, business analytics, financial modelling, digital marketing and creative media. Coherent perspective, natural daylight, warm ivory surfaces, muted navy accents. Preserve complete hair, hands and book details. No embedded text, no miniature buildings, no cartoon thought bubbles, no futuristic holograms.

## Remaining Scenes
- `hero/`: Three confident Indian college-age students (books, laptop, creative materials) + `mobile.webp`.
- `who-we-are/`: Mentor guiding two students on laptops (`30 Hours`, `5 Modules`, `1 Capstone`).
- `domains/ai/`: Student exploring Power BI & data analytics.
- `domains/finance/`: Aspiring finance student with financial reports & models.
- `domains/media/`: Creative media student holding a professional camera.
- `practical-learning/`, `mentorship/`, `career-readiness/` (learner holding portfolio), `academic-collaboration/`, `campus-visit/` (genuine Rajajinagar centre photography).

## Cutout & Frame Extraction Commands (Windows PowerShell)
```powershell
.\.venv-image\Scripts\python.exe scripts/image-processing/create-cutout.py "apps/web/public/images/about/vision/master.webp" "apps/web/public/images/about/vision/student-cutout.png"
.\.venv-image\Scripts\python.exe scripts/image-processing/check-cutout.py "apps/web/public/images/about/vision/student-cutout.png"
.\.venv-image\Scripts\python.exe scripts/image-processing/extract-frames.py "apps/web/public/images/about/vision/cinematic.mp4" "apps/web/public/images/about/vision/frames"
```
