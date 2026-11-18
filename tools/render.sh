#!/bin/sh
# Render the portrait stills, icons and link preview into office-hours/. Run from the repo root.
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
shot() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --virtual-time-budget=6000 "$@" 2>/dev/null; }
T=$(mktemp -d)
shot --force-device-scale-factor=2 --window-size=600,600 --default-background-color=00000000 --screenshot="$T/light.png" "file://$PWD/tools/portrait-still.html#still"
shot --force-device-scale-factor=2 --window-size=600,600 --default-background-color=00000000 --force-dark-mode --blink-settings=preferredColorScheme=0 --screenshot="$T/dark.png" "file://$PWD/tools/portrait-still.html#still"
shot --force-device-scale-factor=1 --window-size=1200,630 --force-dark-mode --blink-settings=preferredColorScheme=0 --screenshot=office-hours/og.png "file://$PWD/tools/og.html#still"
shot --force-device-scale-factor=1 --window-size=600,600 --default-background-color=00000000 --screenshot="$T/icon.png" "file://$PWD/office-hours/favicon.svg"
uv run -q --with pillow python - "$T" <<'PY'
import sys
from PIL import Image
t = sys.argv[1]
for name in ("light", "dark"):
    Image.open(f"{t}/{name}.png").crop((0, 0, 352, 352)).save(f"office-hours/portrait-{name}.png", optimize=True)
icon = Image.open(f"{t}/icon.png")
icon.resize((32, 32), Image.Resampling.LANCZOS).save("office-hours/favicon-32.png", optimize=True)
icon.resize((180, 180), Image.Resampling.LANCZOS).save("office-hours/apple-touch-icon.png", optimize=True)
PY
rm -rf "$T"
