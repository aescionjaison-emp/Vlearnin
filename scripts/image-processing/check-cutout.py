from pathlib import Path
import argparse
from PIL import Image, ImageDraw


BACKGROUNDS = [
    ("White #FFFFFF", (255, 255, 255, 255)),
    ("Ivory #FAF9F6", (250, 249, 246, 255)),
    ("Navy #10264A", (16, 38, 74, 255)),
    ("Grey #808080", (128, 128, 128, 255)),
    ("Checkerboard", None),
]


def make_checkerboard(width: int, height: int, tile: int = 24) -> Image.Image:
    board = Image.new("RGBA", (width, height), (225, 225, 225, 255))
    draw = ImageDraw.Draw(board)
    for y in range(0, height, tile):
        for x in range(0, width, tile):
            if ((x // tile) + (y // tile)) % 2 == 1:
                draw.rectangle([x, y, x + tile, y + tile], fill=(190, 190, 190, 255))
    return board


def check_cutout(cutout_path: str, sheet_output: str | None = None) -> None:
    src = Path(cutout_path)
    if not src.exists():
        raise FileNotFoundError(f"Cutout not found: {src}")

    im = Image.open(src)
    if im.mode != "RGBA":
        im = im.convert("RGBA")

    w, h = im.size
    alpha = im.getchannel("A")
    minimum, maximum = alpha.getextrema()
    if minimum == 255:
        raise ValueError(f"{src.name}: No transparent pixels found (alpha min=255).")
    if maximum == 0:
        raise ValueError(f"{src.name}: Image is completely transparent (alpha max=0).")
    if w < 200 or h < 200:
        raise ValueError(f"{src.name}: Dimensions too small ({w}x{h}).")

    cell_w = 560
    cell_h = max(320, int(cell_w * (h / w)))
    resized = im.resize((cell_w, cell_h), Image.Resampling.LANCZOS)

    cols = len(BACKGROUNDS)
    pad = 24
    header_h = 44
    sheet = Image.new("RGBA", (cols * cell_w + (cols + 1) * pad, cell_h + header_h + pad * 2), (240, 242, 245, 255))
    draw = ImageDraw.Draw(sheet)

    for idx, (label, color) in enumerate(BACKGROUNDS):
        x0 = pad + idx * (cell_w + pad)
        y0 = header_h + pad
        bg = make_checkerboard(cell_w, cell_h) if color is None else Image.new("RGBA", (cell_w, cell_h), color)
        comp = Image.alpha_composite(bg, resized)
        sheet.paste(comp, (x0, y0))
        draw.text((x0 + 8, 16), label, fill=(16, 38, 74, 255))

    out_path = Path(sheet_output) if sheet_output else src.with_name(f"{src.stem}-contact-sheet.png")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.convert("RGB").save(out_path, "PNG", optimize=True)

    print(f"Verified RGBA: {src} ({w}x{h}), alpha={minimum}..{maximum}")
    print(f"Contact Sheet: {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Verify RGBA cutout and generate multi-background contact sheet.")
    parser.add_argument("cutout", help="Path to transparent PNG or WebP cutout")
    parser.add_argument("--out", default=None, help="Optional contact sheet output path")
    args = parser.parse_args()
    check_cutout(args.cutout, args.out)
