# VLEARNIN — BEYOND THE CLASSROOM V2
## Asset Manifest, Missing Capability Report & Cutout Quality Specification

### 1. Unavailable Capabilities Reported (Section 62)
- **Gemini Image Generation (`generate_image`)**: Exhausted (`HTTP 429 RESOURCE_EXHAUSTED`, quota resets in ~3h50m).
- **Veo AI Video Generation**: Unavailable in the current toolset.
- **Figma Integration**: No Figma MCP server or plugin connected in the current environment.
- **AI Alpha Matting (`rembg` / SAM)**: Not installed in the local Python environment.

### 2. Rejected Assets Deleted (Section 09 & 67)
The following miniature-object / threshold-cutout PNGs were **deleted** and are not used in production:
- `hero/hero-architecture.png` (miniature building concept rejected; student-centric direction required)
- `philosophy/philosophy-book.png` (visible white edge halo)
- `domains/ai/ai-workspace.png` (visible white edge halo & object-centric concept)

### 3. Current Production Visuals (Cutout Fallback Rule — Section 21)
In accordance with **Section 21 (Cutout Fallback Rule)**, clean complete student photographs from VLEARNIN's verified photography library are composited inside art-directed editorial frames over the clean generated architectural background plates — with **zero forced cutouts, zero white halos, and zero cropped heads/hands**:

| Scene | Educational Topic | Foreground Student Photograph | Architectural Background Plate | Status |
|---|---|---|---|---|
| 01 Hero | The V-Way to Learn, Build & Lead | `/images/hero/vlearnin-main-desktop.webp` & `vlearnin-main-mobile.webp` | `/images/about/hero/hero-background.webp` | Active (Complete Photo) |
| 02 Who We Are | 30-Hour Practical Certifications | `/images/about-campus.jpg` | `/images/about/who-we-are/who-we-are-background.webp` | Active (Complete Photo) |
| 03 Our Vision | Student Imagining Future | `/images/hero-4.jpg` | `/images/about/vision/vision-background.webp` | Temporary Photo (Pending Vision AI Portrait) |
| 04 Our Mission | Mentor Guiding Student Project | `/images/hero-3.jpg` | `/images/about/mission/mission-background.webp` | Active (Complete Photo) |
| 05 Educational Philosophy | Learning Beyond Textbooks | `/images/course-ai-commerce.jpg` | `/images/about/philosophy/philosophy-background.webp` | Temporary Photo (Pending Philosophy AI Montage) |
| 06 Domain 01 (AI & BI) | AI & Business Intelligence | `/images/domain-analytics.jpg` | `/images/about/domains/ai/ai-background.webp` | Active (Complete Photo) |
| 06 Domain 02 (Finance) | Corporate Finance & Capital Markets | `/images/course-investment-banking.jpg` | `/images/about/domains/finance/finance-background.webp` | Active (Complete Photo) |
| 06 Domain 03 (Media) | Digital Marketing & Creative Media | `/images/domain-creative.jpg` & `/images/course-video-editing.jpg` | Warm `#FBF4F1` editorial frame | Active (Complete Photo) |
| 07 Practical Learning | Collaborative Capstone Execution | `/images/hero-2.jpg` | `/images/about/practical-learning/practical-background.webp` | Active (Complete Photo) |
| 08 Small-Batch Mentorship | 1-on-1 Doubt Resolution | `/images/hero-1.jpg` | `/images/about/mentorship/mentorship-background.webp` | Active (Complete Photo) |
| 09 Career Readiness | From Classroom to Corporate | `/images/hero-3.jpg` | `/images/about/career-readiness/career-background.webp` | Active (Complete Photo) |
| 10 Academic Collaboration | College Workshops in Karnataka | `/images/academic-partnership.jpg` | `/images/academic-partnership.jpg` | Active (Complete Photo) |
| 11 Rajajinagar Centre | Visit Our Rajajinagar Center | `/images/about-campus.jpg` | `/images/about-campus.jpg` | Genuine Campus Photo |

### 4. Ready-to-Run Gemini & Veo Prompts (Once Quota Resets)
1. **Our Vision (`vision/master.webp`, `vision/subject-cutout.png`, `vision/mobile.webp` + Veo 6s video):**
   - *Prompt:* Ultra-photorealistic commercial educational advertising photograph of a thoughtful Indian college-age student standing in a sunlit warm-ivory and navy academic hallway holding an open hardcover book, looking optimistically toward a bright modern workspace horizon. Complete head, hair, shoulders, hands, fingers, and open book intact with 10% margin.
2. **Our Educational Philosophy (`philosophy/master.webp`, `philosophy/subject-cutout.png` + Veo 6s video):**
   - *Prompt:* Conceptual educational advertising photograph of a focused Indian college-age student reading an open academic book at a contemporary learning desk, surrounded coherently by applied analytics screens, financial documents, and creative media tools in soft natural daylight.
3. **Hero Student Trio (`hero/master.webp`, `hero/subject-cutout.png`, `hero/mobile.webp` + Veo 6s video):**
   - *Prompt:* Three confident Indian college-age students (holding books, laptop, and project materials) positioned on the right side of a sunlit contemporary ivory-and-navy academy interior, leaving clean left-side negative space for typography.
4. **Domain 03 Creative Media (`domains/media/master.webp`, `domains/media/subject-cutout.png`):**
   - *Prompt:* Confident Indian college-age creative media student holding a professional cinema camera inside a contemporary production studio with editing workstation and soft daylight.
