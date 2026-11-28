"""Automated multi-provider asset pipeline for VLEARNIN About Us (Beyond the Classroom)."""

from __future__ import annotations

import argparse
import importlib.util
import json
import os
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ABOUT_DIR = ROOT / "apps" / "web" / "public" / "images" / "about"
SCRIPT_DIR = Path(__file__).resolve().parent


def _load(filename: str):
    spec = importlib.util.spec_from_file_location(filename.replace("-", "_"), SCRIPT_DIR / filename)
    mod = importlib.util.module_from_spec(spec)  # type: ignore[arg-type]
    assert spec and spec.loader
    spec.loader.exec_module(mod)
    return mod


create_cutout = _load("create-cutout.py").create_cutout
check_cutout = _load("check-cutout.py").check_cutout
extract_frames = _load("extract-frames.py").extract_frames

SCENES = [
    {
        "id": "vision",
        "title": "Our Vision",
        "cutout_name": "student-cutout.png",
        "prompt": (
            "Ultra-photorealistic international university advertising artwork featuring a thoughtful "
            "Indian college-age woman standing while holding a large open academic book in both hands, "
            "looking slightly upwards toward a sunlit horizon with curiosity and optimism. Warm ivory "
            "(#FAF9F6) and deep navy (#10264A) palette, 12% safe margin, no embedded text."
        ),
    },
    {
        "id": "mission",
        "title": "Our Mission",
        "cutout_name": "student-mentor-cutout.png",
        "prompt": (
            "Ultra-photorealistic educational advertising composition featuring a focused Indian "
            "college-age student completing a practical laptop-based project while an approachable "
            "experienced mentor provides individual guidance. Natural daylight, warm ivory and navy, "
            "complete hands and laptop, no boardroom, no embedded text."
        ),
    },
    {
        "id": "philosophy",
        "title": "Our Educational Philosophy",
        "cutout_name": "student-cutout.png",
        "prompt": (
            "Photorealistic conceptual educational advertising composition featuring an Indian "
            "college-age student reading a large open academic book, surrounded by coherent "
            "photographic representations of AI, business analytics, financial modelling, digital "
            "marketing, and creative media. Warm ivory and navy palette, no embedded text."
        ),
    },
]


def discover_providers() -> list[str]:
    available: list[str] = []
    if os.environ.get("OPENAI_API_KEY"):
        available.append("openai")
    if os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"):
        available.append("gemini")
    if os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_HUB_TOKEN"):
        available.append("huggingface")
    return available


def make_mobile_crop(master_path: Path, mobile_path: Path) -> None:
    with Image.open(master_path) as im:
        im = im.convert("RGB")
        w, h = im.size
        target_ratio = 9 / 16
        crop_w = min(w, int(h * target_ratio))
        left = max(0, (w - crop_w) // 2)
        cropped = im.crop((left, 0, left + crop_w, h))
        cropped.thumbnail((900, 1600), Image.Resampling.LANCZOS)
        cropped.save(mobile_path, "WEBP", quality=86, method=6)


def process_scene(scene: dict[str, str], check_only: bool = False) -> dict:
    scene_dir = ABOUT_DIR / scene["id"]
    scene_dir.mkdir(parents=True, exist_ok=True)

    master = next(
        (scene_dir / f"master.{ext}" for ext in ("webp", "png", "jpg") if (scene_dir / f"master.{ext}").exists()),
        None,
    )
    video = next(
        (scene_dir / f"cinematic.{ext}" for ext in ("mp4", "webm") if (scene_dir / f"cinematic.{ext}").exists()),
        None,
    )
    bg = scene_dir / "background.webp"
    cutout = scene_dir / scene["cutout_name"]
    mobile = scene_dir / "mobile.webp"
    manifest_path = scene_dir / "scene-manifest.json"

    status = {
        "scene": scene["id"],
        "title": scene["title"],
        "master": str(master.relative_to(ROOT)) if master else None,
        "video": str(video.relative_to(ROOT)) if video else None,
        "cutout": str(cutout.relative_to(ROOT)) if cutout.exists() else None,
        "background": str(bg.relative_to(ROOT)) if bg.exists() else None,
        "mobile": str(mobile.relative_to(ROOT)) if mobile.exists() else None,
        "ready": False,
    }

    if not check_only:
        if video and not (scene_dir / "frames").exists():
            extract_frames(str(video), str(scene_dir / "frames"))
        if master:
            if not cutout.exists():
                create_cutout(str(master), str(cutout))
            check_cutout(str(cutout))
            if not mobile.exists():
                make_mobile_crop(master, mobile)
            status["cutout"] = str(cutout.relative_to(ROOT))
            status["mobile"] = str(mobile.relative_to(ROOT))

    status["ready"] = bool(video or (cutout.exists() and bg.exists()))
    manifest_path.write_text(json.dumps(status, indent=2), encoding="utf-8")
    return status


def main() -> int:
    parser = argparse.ArgumentParser(description="VLEARNIN About Us automated asset pipeline.")
    parser.add_argument("--check", action="store_true", help="Inspect providers and scene asset readiness.")
    args = parser.parse_args()

    providers = discover_providers()
    print(f"Authorized external providers detected: {providers or 'NONE (awaiting Gemini cooldown or API key)'}")

    results = [process_scene(scene, check_only=args.check) for scene in SCENES]
    print(json.dumps(results, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
