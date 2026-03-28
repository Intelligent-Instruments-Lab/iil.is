#!/usr/bin/env python3
"""
Generate compressed thumbnails for card grid.
Resizes all images in assets/img/ to max 400px and saves to assets/img/thumbs/.
Run this once after adding new images, or when images change.
"""

import os
import glob
from PIL import Image

BASE      = os.path.dirname(os.path.abspath(__file__))
SRC_DIR   = os.path.join(BASE, 'assets', 'img')
THUMB_DIR = os.path.join(BASE, 'assets', 'img', 'thumbs')
MAX_SIZE  = 400   # px on longest side
QUALITY   = 82    # JPEG quality

MEDIUM_DIR  = os.path.join(BASE, 'assets', 'img', 'medium')
MEDIUM_SIZE = 1200  # px on longest side for detail page images

os.makedirs(THUMB_DIR,  exist_ok=True)
os.makedirs(MEDIUM_DIR, exist_ok=True)

exts = ('*.jpg', '*.jpeg', '*.png', '*.gif', '*.webp')
sources = []
for pat in exts:
    sources.extend(glob.glob(os.path.join(SRC_DIR, pat)))
sources = [s for s in sources if os.path.dirname(s) == SRC_DIR]  # skip subdirs

generated = 0
skipped   = 0

for src in sorted(sources):
    name = os.path.splitext(os.path.basename(src))[0]
    thumb  = os.path.join(THUMB_DIR,  name + '.jpg')
    medium = os.path.join(MEDIUM_DIR, name + '.jpg')
    src_mtime = os.path.getmtime(src)

    thumb_ok  = os.path.exists(thumb)  and os.path.getmtime(thumb)  >= src_mtime
    medium_ok = os.path.exists(medium) and os.path.getmtime(medium) >= src_mtime

    if thumb_ok and medium_ok:
        skipped += 1
        continue

    try:
        with Image.open(src) as img:
            img = img.convert('RGB')
            src_kb = os.path.getsize(src) // 1024

            if not thumb_ok:
                t = img.copy()
                t.thumbnail((MAX_SIZE, MAX_SIZE), Image.LANCZOS)
                t.save(thumb, 'JPEG', quality=QUALITY, optimize=True)

            if not medium_ok:
                m = img.copy()
                m.thumbnail((MEDIUM_SIZE, MEDIUM_SIZE), Image.LANCZOS)
                m.save(medium, 'JPEG', quality=85, optimize=True)

        thumb_kb  = os.path.getsize(thumb)  // 1024
        medium_kb = os.path.getsize(medium) // 1024
        print(f'  ✓  {os.path.basename(src)}  {src_kb}KB → thumb:{thumb_kb}KB  medium:{medium_kb}KB')
        generated += 1
    except Exception as e:
        print(f'  ✗  {os.path.basename(src)}: {e}')

print(f'\nDone: {generated} generated, {skipped} up-to-date')
