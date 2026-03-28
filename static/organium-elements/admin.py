#!/usr/bin/env python3
"""
Organium Admin — local GUI for managing the component database.
Run: python3 admin.py
"""

import os
import re
import glob
import shutil
import subprocess
import webbrowser
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

from convert import parse_md, BASE, EXPORT_DIR, slugify

MD_DIR = EXPORT_DIR  # database/Organium Elements

ALL_TYPES = ['Actuator','Amplifier','Connector','Driver','Enclosure',
             'Integrated System','Material','Power Supply','Resistor',
             'Sensor','Software','Transducer']

app = Flask(__name__, template_folder='admin', static_folder='assets', static_url_path='/assets')
app.secret_key = 'organium-admin'
app.config['TEMPLATES_AUTO_RELOAD'] = True


# ── Data helpers ───────────────────────────────────────────────────────────────

def list_components():
    files = sorted(glob.glob(os.path.join(MD_DIR, '*.md')))
    components = []
    for f in files:
        title, meta, _ = parse_md(f)
        components.append({
            'filename': os.path.splitext(os.path.basename(f))[0],
            'title': title,
            'status': meta.get('Status', ''),
            'type': meta.get('Type', ''),
            'published': meta.get('Published', 'Yes').strip().lower() != 'no',
        })
    return components


def get_component(filename):
    path = os.path.join(MD_DIR, filename + '.md')
    if not os.path.exists(path):
        return None
    title, meta, body = parse_md(path)
    slug = slugify(filename)
    images = []
    for ext in ('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'):
        images += glob.glob(os.path.join(BASE, 'assets', 'img', f'{slug}-*.{ext}'))
    images = [os.path.basename(p) for p in sorted(images)]
    return {'filename': filename, 'title': title, 'meta': meta, 'body': body, 'images': images}


def save_component(filename, title, meta, body):
    path = os.path.join(MD_DIR, filename + '.md')
    lines = [f'# {title}', '']
    for key, value in meta.items():
        if value:
            lines.append(f'{key}: {value}')
    lines.append('')
    lines.append(body.strip())
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')


def collect_meta(form):
    return {
        'Type':       ', '.join(form.getlist('Type')),
        'Added':      form.get('Added', '').strip(),
        'Senses':     form.get('Senses', '').strip(),
        'Actuates':   form.get('Actuates', '').strip(),
        'Connection': form.get('Connection', '').strip(),
        'Status':     form.get('Status', 'Not started').strip(),
        'Voltage':    form.get('Voltage', '').strip(),
        'Panel':      form.get('Panel', '').strip(),
        'Published':  'Yes' if form.get('Published') == 'Yes' else 'No',
    }


# ── Routes ─────────────────────────────────────────────────────────────────────

@app.route('/')
def index():
    return render_template('list.html', components=list_components())


@app.route('/component/new', methods=['GET', 'POST'])
def new_component():
    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        if not title:
            flash('Title is required.', 'error')
            return redirect(url_for('new_component'))

        path = os.path.join(MD_DIR, title + '.md')
        if os.path.exists(path):
            flash('A component with that name already exists.', 'error')
            return redirect(url_for('new_component'))

        meta = collect_meta(request.form)
        meta['Added'] = datetime.now().strftime('%B %-d, %Y %-I:%M %p')
        save_component(title, title, meta, request.form.get('body', ''))
        subprocess.run(['python3', 'convert.py'], cwd=BASE, capture_output=True)
        flash(f'"{title}" created.', 'success')
        return redirect(url_for('edit_component', filename=title))

    return render_template('edit.html', component=None, is_new=True,
                           all_types=ALL_TYPES, current_types=[], extra_types=[])


@app.route('/component/<path:filename>', methods=['GET', 'POST'])
def edit_component(filename):
    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        meta = collect_meta(request.form)
        body = request.form.get('body', '')

        new_filename = title
        if new_filename != filename:
            new_path = os.path.join(MD_DIR, new_filename + '.md')
            if os.path.exists(new_path):
                flash('A component with that name already exists.', 'error')
                return redirect(url_for('edit_component', filename=filename))
            os.rename(os.path.join(MD_DIR, filename + '.md'), new_path)
            old_img = os.path.join(MD_DIR, filename)
            new_img = os.path.join(MD_DIR, new_filename)
            if os.path.isdir(old_img):
                os.rename(old_img, new_img)

            # Rename images in assets/img/ and update body references
            old_slug = slugify(filename)
            new_slug = slugify(new_filename)
            img_dir = os.path.join(BASE, 'assets', 'img')
            for img_path in glob.glob(os.path.join(img_dir, f'{old_slug}-*')):
                img_name = os.path.basename(img_path)
                new_img_name = new_slug + img_name[len(old_slug):]
                os.rename(img_path, os.path.join(img_dir, new_img_name))
                body = body.replace(img_name, new_img_name)

            filename = new_filename

        save_component(filename, title, meta, body)
        subprocess.run(['python3', 'convert.py'], cwd=BASE, capture_output=True)
        flash('Saved.', 'success')
        return redirect(url_for('edit_component', filename=filename))

    component = get_component(filename)
    if not component:
        flash('Component not found.', 'error')
        return redirect(url_for('index'))
    raw = component['meta'].get('Type', '')
    current_types = [t.strip() for t in raw.split(',') if t.strip()]
    extra_types = [t for t in current_types if t not in ALL_TYPES]
    return render_template('edit.html', component=component, is_new=False,
                           all_types=ALL_TYPES, current_types=current_types,
                           extra_types=extra_types)


@app.route('/component/<path:filename>/toggle-publish', methods=['POST'])
def toggle_publish(filename):
    component = get_component(filename)
    if not component:
        return redirect(url_for('index'))
    currently = component['meta'].get('Published', 'Yes').strip().lower() != 'no'
    component['meta']['Published'] = 'No' if currently else 'Yes'
    save_component(filename, component['title'], component['meta'], component['body'])
    subprocess.run(['python3', 'convert.py'], cwd=BASE, capture_output=True)
    return redirect(url_for('index'))


@app.route('/component/<path:filename>/delete', methods=['POST'])
def delete_component(filename):
    path = os.path.join(MD_DIR, filename + '.md')
    if os.path.exists(path):
        os.remove(path)
    img_dir = os.path.join(MD_DIR, filename)
    if os.path.isdir(img_dir):
        shutil.rmtree(img_dir)
    flash(f'"{filename}" deleted.', 'success')
    return redirect(url_for('index'))


@app.route('/component/<path:filename>/upload', methods=['POST'])
def upload_image(filename):
    file = request.files.get('image')
    if not file or not file.filename:
        return jsonify({'error': 'No file provided'}), 400
    ext = os.path.splitext(file.filename)[1].lower()
    slug = slugify(filename)
    img_dir = os.path.join(BASE, 'assets', 'img')
    # Find next available index for this slug
    existing = glob.glob(os.path.join(img_dir, f'{slug}-*{ext}'))
    indices = []
    for f in existing:
        m = re.match(rf'^{re.escape(slug)}-(\d+)\{ext}$', os.path.basename(f))
        if m:
            indices.append(int(m.group(1)))
    next_index = max(indices, default=0) + 1
    new_name = f'{slug}-{next_index}{ext}'
    dest_path = os.path.join(img_dir, new_name)
    file.save(dest_path)

    # Generate compressed thumbnail and medium image for faster web delivery
    try:
        from PIL import Image as PILImage
        base_name = os.path.splitext(new_name)[0] + '.jpg'
        thumb_dir  = os.path.join(img_dir, 'thumbs')
        medium_dir = os.path.join(img_dir, 'medium')
        os.makedirs(thumb_dir,  exist_ok=True)
        os.makedirs(medium_dir, exist_ok=True)
        with PILImage.open(dest_path) as img:
            img = img.convert('RGB')
            t = img.copy()
            t.thumbnail((400, 400), PILImage.LANCZOS)
            t.save(os.path.join(thumb_dir, base_name), 'JPEG', quality=82, optimize=True)
            m = img.copy()
            m.thumbnail((1200, 1200), PILImage.LANCZOS)
            m.save(os.path.join(medium_dir, base_name), 'JPEG', quality=85, optimize=True)
    except Exception:
        pass  # image generation is optional

    return jsonify({'markdown': f'![{new_name}]({new_name})'})


@app.route('/component/<path:filename>/delete-image/<image>', methods=['POST'])
def delete_image(filename, image):
    img_path = os.path.join(BASE, 'assets', 'img', image)
    if os.path.exists(img_path):
        os.remove(img_path)
    return redirect(url_for('edit_component', filename=filename))


@app.route('/img-proxy/<path:filename>/upload', methods=['POST'])
def upload_image_proxy(filename):
    return upload_image(filename)


@app.route('/img-proxy/<path:rel_path>')
def img_proxy(rel_path):
    from flask import send_file
    full = os.path.join(MD_DIR, rel_path)
    if not os.path.exists(full):
        return '', 404
    return send_file(full)


@app.route('/rebuild', methods=['POST'])
def rebuild():
    result = subprocess.run(['python3', 'convert.py'], cwd=BASE, capture_output=True, text=True)
    if result.returncode == 0:
        flash('Rebuilt successfully.', 'success')
    else:
        flash(f'Rebuild failed: {result.stderr}', 'error')
    return redirect(request.referrer or url_for('index'))


@app.route('/publish', methods=['POST'])
def publish():
    r = subprocess.run(['python3', 'convert.py'], cwd=BASE, capture_output=True, text=True)
    if r.returncode != 0:
        flash(f'Rebuild failed: {r.stderr}', 'error')
        return redirect(url_for('index'))

    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
    cmds = [
        ['git', 'add', '.'],
        ['git', 'commit', '-m', f'Update elements {timestamp}'],
        ['git', 'push'],
    ]
    for cmd in cmds:
        r = subprocess.run(cmd, cwd=BASE, capture_output=True, text=True)
        if r.returncode != 0 and 'nothing to commit' not in r.stdout:
            flash(f'Git: {r.stderr or r.stdout}', 'error')
            return redirect(url_for('index'))

    flash('Published to GitHub Pages.', 'success')
    return redirect(url_for('index'))


@app.route('/quit', methods=['POST'])
def quit_server():
    import os, signal
    flash('Admin stopped.', 'success')
    os.kill(os.getpid(), signal.SIGTERM)
    return redirect(url_for('index'))


# ── Run ────────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    webbrowser.open('http://localhost:5001')
    app.run(port=5001, debug=False)
