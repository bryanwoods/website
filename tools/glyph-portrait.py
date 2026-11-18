# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow>=11", "numpy"]
# ///
"""Turn a headshot into the darkness grid that office-hours/portrait.js draws as glyphs.

uv run tools/glyph-portrait.py PHOTO office-hours/portrait-data.js [--cols 80 --rows 48]
"""

import argparse
import json

import numpy as np
from PIL import Image, ImageFilter, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument("photo")
ap.add_argument("out")
ap.add_argument("--cols", type=int, default=80)
ap.add_argument("--rows", type=int, default=48)
args = ap.parse_args()

im = ImageOps.fit(ImageOps.exif_transpose(Image.open(args.photo)).convert("L"), (800, 800))
g = np.asarray(im.filter(ImageFilter.GaussianBlur(1.2)).resize((args.cols, args.rows), Image.Resampling.LANCZOS), np.float32) / 255
subject = g < 0.93
lo, hi = np.percentile(g[subject], [2, 98])
dark = (1 - np.clip((g - lo) / (hi - lo), 0, 1)) ** 1.25
cells = "".join(str(min(9, int(v * 10))) if s else "-" for v, s in zip(dark.ravel(), subject.ravel()))

with open(args.out, "w") as f:
    f.write("window.PORTRAIT = " + json.dumps({"cols": args.cols, "rows": args.rows, "d": cells}) + ";\n")
