from pathlib import Path
from io import BytesIO
import argparse
from PIL import Image
from rembg import remove, new_session


def create_cutout(
    source: str,
    output: str,
    model_name: str = "u2net",
    fg_threshold: int = 240,
    bg_threshold: int = 10,
    erode_size: int = 10,
) -> None:
    src = Path(source)
    out = Path(output)

    if not src.exists():
        raise FileNotFoundError(f"Source image not found: {src}")

    out.parent.mkdir(parents=True, exist_ok=True)
    session = new_session(model_name)
    result = remove(
        src.read_bytes(),
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=fg_threshold,
        alpha_matting_background_threshold=bg_threshold,
        alpha_matting_erode_size=erode_size,
    )

    image = Image.open(BytesIO(result)).convert("RGBA")
    alpha = image.getchannel("A")
    minimum, maximum = alpha.getextrema()

    if minimum == 255:
        raise ValueError("No transparent pixels detected.")
    if maximum == 0:
        raise ValueError("Subject was removed completely.")

    image.save(out)
    webp_output = out.with_suffix(".webp")
    image.save(webp_output, format="WEBP", lossless=True, method=6)

    print(f"PNG: {out}")
    print(f"WebP: {webp_output}")
    print(f"Dimensions: {image.size}")
    print(f"Alpha range: {minimum}-{maximum}")
    print("Manual visual inspection still required via check-cutout.py.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create alpha-matted RGBA PNG and WebP cutout.")
    parser.add_argument("source", help="Path to master image")
    parser.add_argument("output", help="Path to output PNG file")
    parser.add_argument("--model", default="u2net", help="rembg session model (default: u2net)")
    parser.add_argument("--fg-threshold", type=int, default=240)
    parser.add_argument("--bg-threshold", type=int, default=10)
    parser.add_argument("--erode-size", type=int, default=10)
    args = parser.parse_args()

    create_cutout(
        args.source,
        args.output,
        model_name=args.model,
        fg_threshold=args.fg_threshold,
        bg_threshold=args.bg_threshold,
        erode_size=args.erode_size,
    )
