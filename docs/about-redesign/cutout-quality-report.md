# Cutout Quality Report — VLEARNIN About Us

## Verification Tooling Ready
- `scripts/image-processing/create-cutout.py`: `rembg 2.0.88` + `onnxruntime 1.32.0` + `pymatting 1.1.16` alpha-matting (`RGBA` PNG + lossless transparent WebP).
- `scripts/image-processing/check-cutout.py`: Generates 5-background contact sheets (`#FFFFFF`, `#FAF9F6`, `#10264A`, `#808080`, and checkerboard) and asserts valid `RGBA`, non-trivial alpha (`min < 255`, `max > 0`), and minimum resolution.

## Cutout Audit Status
- **Rejected Previous Cutouts (Deleted):** `hero-architecture.png`, `philosophy-book.png`, `ai-workspace.png` — removed due to object-centric concept and white edge halos from earlier thresholding.
- **Pending Cutouts (Awaiting External / Post-Cooldown Master Artwork):**
  - `vision/student-cutout.png` — Pending `vision/master.webp`
  - `mission/student-cutout.png` — Pending `mission/master.webp`
  - `philosophy/student-cutout.png` — Pending `philosophy/master.webp`
  - `hero/student-cutout.png` — Pending `hero/master.webp`
  - `domains/ai/student-cutout.png`, `domains/finance/student-cutout.png`, `domains/media/student-cutout.png`, `career-readiness/student-cutout.png` — Pending master artwork.
