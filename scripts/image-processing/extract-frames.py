from pathlib import Path
import argparse
import subprocess


def extract_frames(video_path: str, output_dir: str, fps: int = 18, width: int = 1280, quality: int = 85) -> None:
    src = Path(video_path)
    out = Path(output_dir)
    if not src.exists():
        raise FileNotFoundError(f"Video not found: {src}")

    out.mkdir(parents=True, exist_ok=True)
    pattern = str(out / "frame-%04d.webp")
    cmd = [
        "ffmpeg",
        "-y",
        "-i",
        str(src),
        "-vf",
        f"fps={fps},scale={width}:-2",
        "-c:v",
        "libwebp",
        "-quality",
        str(quality),
        pattern,
    ]
    subprocess.run(cmd, check=True)
    frames = sorted(out.glob("frame-*.webp"))
    print(f"Extracted {len(frames)} WebP frames to {out}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract optimized WebP frame sequence from cinematic MP4/WebM.")
    parser.add_argument("video", help="Path to source cinematic.mp4")
    parser.add_argument("output_dir", help="Target frames/ directory")
    parser.add_argument("--fps", type=int, default=18)
    parser.add_argument("--width", type=int, default=1280)
    parser.add_argument("--quality", type=int, default=85)
    args = parser.parse_args()
    extract_frames(args.video, args.output_dir, args.fps, args.width, args.quality)
