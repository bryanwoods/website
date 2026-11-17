# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow>=11"]
# ///
"""Turn a headshot into a 16-bit style pixel portrait in the site palette.

uv run tools/pixel-portrait.py PHOTO OUT_DIR [--size 64] [--dither 0.5] [--bg paper|accent]
"""

import argparse
from collections import deque
from pathlib import Path

from PIL import Image, ImageOps

PALETTE = {
    "ink": "#1C1B19",
    "hair": "#4A3428",
    "brown": "#7A5A48",
    "muted": "#6E6A63",
    "shadow": "#B98466",
    "skin": "#E2B497",
    "glow": "#F2D4BE",
    "stone": "#C9C1B4",
    "paper": "#F7F4EE",
    "accent": "#E0533D",
}

BAYER4 = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]


def rgb(hex_):
    return tuple(int(hex_[i : i + 2], 16) for i in (1, 3, 5))


def nearest(c, colors):
    return min(colors, key=lambda p: sum((a - b) ** 2 for a, b in zip(c, p)))


def pixelate(photo, size, dither, bg):
    img = ImageOps.exif_transpose(Image.open(photo)).convert("RGB")
    img = ImageOps.fit(img, (size, size), Image.Resampling.LANCZOS, centering=(0.5, 0.35))
    colors = [rgb(v) for k, v in PALETTE.items() if k != "accent"]
    out = Image.new("RGB", (size, size))
    src, dst = img.load(), out.load()
    for y in range(size):
        for x in range(size):
            t = (BAYER4[y % 4][x % 4] / 16 - 0.5) * 48 * dither
            c = tuple(max(0, min(255, int(v + t))) for v in src[x, y])
            dst[x, y] = nearest(c, colors)
    if bg == "accent":
        flood(out, rgb(PALETTE["paper"]), rgb(PALETTE["accent"]))
    return out


def flood(img, match, fill):
    w, h = img.size
    px = img.load()
    queue = deque((x, y) for x in range(w) for y in (0, h - 1))
    queue.extend((x, y) for y in range(h) for x in (0, w - 1))
    while queue:
        x, y = queue.popleft()
        if 0 <= x < w and 0 <= y < h and px[x, y] == match:
            px[x, y] = fill
            queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("photo")
    ap.add_argument("out_dir", type=Path)
    ap.add_argument("--size", type=int, default=64)
    ap.add_argument("--dither", type=float, default=0.5)
    ap.add_argument("--bg", choices=["paper", "accent"], default="paper")
    args = ap.parse_args()

    art = pixelate(args.photo, args.size, args.dither, args.bg)
    args.out_dir.mkdir(parents=True, exist_ok=True)
    art.save(args.out_dir / "bryan-pixel.png", optimize=True)
    for name, px in (("favicon-32.png", 32), ("apple-touch-icon.png", 180)):
        art.resize((px, px), Image.Resampling.NEAREST if px >= args.size else Image.Resampling.BOX).save(
            args.out_dir / name, optimize=True
        )


if __name__ == "__main__":
    main()
