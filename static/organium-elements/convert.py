#!/usr/bin/env python3
"""
Converts Notion markdown exports to HTML element pages and updates elements.js.

Usage: python3 convert.py
"""

import os
import re
import csv
import shutil
import glob
import json
import markdown

BASE       = os.path.dirname(os.path.abspath(__file__))
EXPORT_DIR = os.path.join(BASE, "database", "Organium_Elements")
OUTPUT_DIR = os.path.join(BASE, "Organium Elements")
ASSETS_IMG = os.path.join(BASE, "assets", "img")


# ── Helpers ────────────────────────────────────────────────────────────────────

def slugify(name):
    s = name.lower()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_]+', '-', s)
    return s.strip('-')


def find_md_files():
    """Return list of (md_path, component_name) tuples."""
    results = []
    for f in sorted(glob.glob(os.path.join(EXPORT_DIR, "*.md"))):
        basename = os.path.splitext(os.path.basename(f))[0]
        results.append((f, basename))
    return results


def parse_md(filepath):
    """Parse markdown file into (title, metadata dict, body string)."""
    with open(filepath, encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()

    # First line: # Title
    title = lines[0].lstrip('#').strip() if lines and lines[0].startswith('#') else ''

    # Parse metadata block (key: value lines right after title)
    meta = {}
    body_start = 1
    for i, line in enumerate(lines[1:], start=1):
        m = re.match(r'^([A-Za-z][\w\s]*?):\s*(.*)$', line)
        if m:
            meta[m.group(1).strip()] = m.group(2).strip()
        elif line.strip() == '' and not meta:
            continue  # skip blank lines before first property
        elif line.strip() == '' and meta:
            body_start = i + 1
            break
        elif not m:
            body_start = i
            break

    body = '\n'.join(lines[body_start:])
    return title, meta, body


def fix_image_paths(body, component_folder_name):
    """Rewrite relative image paths to be relative from the output HTML location."""
    # ![alt](ComponentName/image.jpg)  →  keep as-is since HTML is alongside the folder
    # But source md uses paths like Photo-resistor/Ljos.jpeg
    # Output HTML sits in "Organium Elements/" so the image folder is a sibling
    # The export asset folders were already copied so paths stay the same
    return body


def md_body_to_html(body, component_folder_name):
    """Convert markdown body to HTML, fixing image paths."""
    # Rewrite image paths: the source md references e.g. "Photo-resistor/image.jpg"
    # The output HTML is in "Organium Elements/" alongside the copied asset folders
    # so paths are already correct if we keep them relative.

    # Also rewrite any absolute Notion URLs for icons to keep them working
    html = markdown.markdown(
        body,
        extensions=['extra', 'nl2br'],
        output_format='html'
    )
    return html


def make_property_row(icon_url, label, value_html):
    return (
        f'<tr class="property-row">'
        f'<th><span class="icon property-icon">'
        f'<img src="{icon_url}" style="width:14px;height:14px;display:block"/>'
        f'</span>{label}</th>'
        f'<td>{value_html}</td>'
        f'</tr>'
    )


def make_tag_html(value, color='brown'):
    tags = [v.strip() for v in value.split(',') if v.strip()]
    spans = ''.join(
        f'<span class="selected-value select-value-color-{color}">{t}</span>'
        for t in tags
    )
    return spans if spans else value


def build_html(title, meta, body_html, uuid):
    icon = lambda name: f"https://www.notion.so/icons/{name}_gray.svg"

    rows = ''
    if meta.get('Type'):
        rows += make_property_row(icon('list'), 'Type', make_tag_html(meta['Type']))
    if meta.get('Added'):
        rows += make_property_row(icon('clock'), 'Added',
                                  f'<time>{meta["Added"]}</time>')
    if meta.get('Senses'):
        rows += make_property_row(icon('description'), 'Senses', meta['Senses'])
    if meta.get('Actuates'):
        rows += make_property_row(icon('description'), 'Actuates', meta['Actuates'])
    if meta.get('Connection'):
        rows += make_property_row(icon('description'), 'Connection', meta['Connection'])
    if meta.get('Status'):
        status = meta['Status']
        color = 'green' if status == 'Done' else ('yellow' if status == 'In progress' else 'gray')
        rows += make_property_row(icon('burst'), 'Status',
            f'<span class="status-value select-value-color-{color}">'
            f'<div class="status-dot status-dot-color-{color}"></div>{status}</span>')
    if meta.get('Voltage'):
        rows += make_property_row(icon('description'), 'Voltage', meta['Voltage'])
    if meta.get('Panel'):
        rows += make_property_row(icon('description'), 'Panel', meta['Panel'])

    article_id = uuid if uuid else re.sub(r'[^a-z0-9]', '', title.lower())

    return f"""<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>{title}</title><link rel="stylesheet" href="../assets/notion.css"/></head><body><article id="{article_id}" class="page sans"><header><h1 class="page-title" dir="auto">{title}</h1><p class="page-description" dir="auto"></p><table class="properties"><tbody>{rows}</tbody></table></header><div class="page-body">{body_html}</div></article></body></html>"""


def find_thumbnail(component_name):
    """Find the first flat image for this component (e.g. assets/img/slug-1.jpg)."""
    slug = slugify(component_name)
    for ext in ('jpg', 'jpeg', 'png', 'gif', 'webp'):
        matches = sorted(glob.glob(os.path.join(ASSETS_IMG, f'{slug}-*.{ext}')))
        if matches:
            return matches[0]
    return None


def copy_thumbnail(component_name):
    """Return the relative path of the first image for use as an index card thumbnail."""
    src = find_thumbnail(component_name)
    if not src:
        return None
    return f"assets/img/{os.path.basename(src)}"


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    md_files = find_md_files()
    print(f"Found {len(md_files)} markdown files")

    elements_js_entries = []
    processed = 0
    skipped = 0

    for md_path, component_name in md_files:
        try:
            title, meta, _ = parse_md(md_path)

            # Skip hidden components
            if meta.get('Published', 'Yes').strip().lower() == 'no':
                print(f"  –  {title} (hidden)")
                continue

            # Thumbnail for the index card (images already live in assets/img/)
            thumb = copy_thumbnail(component_name)

            # Page link: dynamic viewer with path to the md file
            md_rel = os.path.relpath(md_path, BASE).replace('\\', '/')
            page_url = f"element.html?file={md_rel}"

            entry = {
                'name': title,
                'page': page_url,
                'img': thumb,
                'type': meta.get('Type', '')
            }
            elements_js_entries.append(entry)
            processed += 1
            print(f"  ✓  {title}")

        except Exception as e:
            print(f"  ✗  {component_name}: {e}")
            skipped += 1

    # Write elements.js
    from datetime import date
    build_date = date.today().isoformat()
    lines = [f'const ELEMENTS_DATE = "{build_date}";', 'const ELEMENTS = [']
    for entry in elements_js_entries:
        img_val = f'"{entry["img"]}"' if entry['img'] else 'null'
        lines.append(f'  {{')
        lines.append(f'    name: {json.dumps(entry["name"])},')
        lines.append(f'    page: {json.dumps(entry["page"])},')
        lines.append(f'    img: {img_val},')
        lines.append(f'    type: {json.dumps(entry["type"])}')
        lines.append(f'  }},')
    lines.append('];')

    elements_js_path = os.path.join(BASE, 'assets', 'elements.js')
    with open(elements_js_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')

    # Bust the browser cache by updating the version in index.html
    import time
    version = str(int(time.time()))
    index_path = os.path.join(BASE, 'index.html')
    with open(index_path, 'r', encoding='utf-8') as f:
        html = f.read()
    html = re.sub(r'elements\.js\?v=\w+', f'elements.js?v={version}', html)
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"\nDone: {processed} entries, {skipped} skipped")
    print(f"elements.js updated with {len(elements_js_entries)} entries")


if __name__ == '__main__':
    main()
