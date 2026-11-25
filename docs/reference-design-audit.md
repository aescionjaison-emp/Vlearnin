# Reference Design Audit — VLEARNIN v2 Frontend Reconstruction

Inspected via headless Chromium (`1440×900`, `1920×1080`, `390×844`) on **2026-11-25**.
Screenshots saved in `docs/reference-screenshots/`.

## 1. Primary Reference: JAIN (Deemed-to-be University) (`https://www.jainuniversity.ac.in/`)
- **Computed Measurements (`1440×900`)**:
  - `headerHeight`: `113px`
  - `bodyBg`: `rgb(255, 255, 255)` (`#FFFFFF`)
  - `bodyColor`: `rgb(33, 37, 41)`
  - `bodyFont`: `Roboto, sans-serif`, `15px`
  - `navFont`: `Roboto, sans-serif`, `15px`
  - `h1Font`: `Roboto, sans-serif`, `24px` (editorial intro card); Hero campaign headlines are large display text (`44–56px`)
  - `scrollHeight`: `8615px`
- **Visual & Layout Principles**:
  - **Diagonal Two-Level Header**: Left white zone holds the prominent logo; top-right `#082F62` slanted utility bar holds secondary links; bottom-right white row holds crisp uppercase navigation links with dropdown carets.
  - **Campaign Hero Banner**: Deep-blue `#082F62` / `#0F4C81` horizontal composition with bold white + warm-yellow (`#F4C430`) split headline, crisp white badge pill, rectangular `APPLY NOW` CTA, right-side student photography with subtle curved graphic arc, and left-edge circular `<` / `>` controls.
  - **Framed Editorial Intro Card**: White bordered container directly below hero with large campus photo on left and institutional overview on right.
  - **Mobile (`390×844`)**: Compact header with logo + hamburger, square-ish hero banner, 2-column institutional quick-access icon grid, and fixed bottom action bar (`Apply` / `Enquire` pills).

## 2. Reference 1: CHRIST (Deemed to be University) (`https://www.christuniversity.in/`)
- Resolved from `https://share.google/0bJmTdBSof7PxOAch`.
- **Computed Measurements**: `headerHeight: 151px`, `h1Font: "Cormorant Garamond", serif (37px)`, `bodyFont: Heebo, sans-serif (16px)`.
- **Key Takeaways**: Diagonal white logo cutout in dark navy top bar; editorial serif display headings paired with clean sans-serif body; 4-column dark-navy institutional metrics bar directly below the hero with gold serif numerals.

## 3. Reference 2: JAIN Programs (`https://www.jainuniversity.ac.in/programs`)
- Resolved from `https://share.google/BFBi4V5KCAsjln7Xj`.
- **Computed Measurements**: `headerHeight: 113px`, `bodyFont: Roboto, sans-serif (15px)`.
- **Key Takeaways**: Diagonal-slanted split page header (white left text + breadcrumb, diagonal-cut photograph on right); crisp 4-column category cards with top photo, clear title, and royal-blue `Know More` button.

## 4. Reference 3: Mount Carmel University (`https://mountcarmeluniversity.edu.in/`)
- Resolved from `https://share.google/mrJXhS8aoM6iLSu41`.
- **Computed Measurements**: `h1Font: "Cormorant Garamond", serif (56px)`, `bodyFont: "Source Sans 3", sans-serif (16px)`.
- **Key Takeaways**: Large editorial serif headlines (`56px`) with warm gold second-line emphasis, clean rectangular `Explore Programs ↗` and `Apply Now ↗` buttons.

## 5. Reference 4: QSpiders (`https://qspiders.com/`)
- Resolved from `https://share.google/8iNUBagNdqFXCZd7D`.
- **Computed Measurements**: `headerHeight: 52px`, `h1Font: Poppins, sans-serif (54px)`, `bodyFont: Poppins, sans-serif (16px)`.
- **Key Takeaways**: Prominent `Book a Demo` primary CTA, clean course discovery tabs, and persistent bottom-right `Request a Call Back` + `WhatsApp` actions.
