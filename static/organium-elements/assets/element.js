(function () {
  const params = new URLSearchParams(window.location.search);
  const filePath = params.get('file');

  if (!filePath) {
    renderError('No file specified.');
    return;
  }

  fetch(filePath)
    .then(function (res) {
      if (!res.ok) throw new Error('File not found: ' + filePath);
      return res.text();
    })
    .then(function (text) {
      render(text, filePath);
    })
    .catch(function (err) {
      renderError(err.message);
    });

  // ── Parser ──────────────────────────────────────────────────────────────────

  function parseMd(text) {
    const lines = text.split('\n');
    let title = '';
    let meta = {};
    let bodyStart = 0;

    // First line: # Title
    if (lines[0] && lines[0].startsWith('#')) {
      title = lines[0].replace(/^#+\s*/, '').trim();
      bodyStart = 1;
    }

    // Metadata: key: value lines immediately after the title
    const metaPattern = /^([A-Za-z][\w\s]*?):\s*(.*)$/;
    let inMeta = false;
    for (let i = bodyStart; i < lines.length; i++) {
      const m = lines[i].match(metaPattern);
      if (m) {
        meta[m[1].trim()] = m[2].trim();
        inMeta = true;
        bodyStart = i + 1;
      } else if (lines[i].trim() === '' && !inMeta) {
        continue;
      } else if (lines[i].trim() === '' && inMeta) {
        bodyStart = i + 1;
        break;
      } else if (!m && inMeta) {
        bodyStart = i;
        break;
      }
    }

    const body = lines.slice(bodyStart).join('\n');
    return { title, meta, body };
  }

  // ── Renderer ─────────────────────────────────────────────────────────────────

  function render(text) {
    const { title, meta, body } = parseMd(text);

    document.title = title + ' · Organium Elements';

    const page = document.getElementById('page');
    page.innerHTML =
      makeHeader(title, meta) +
      '<div class="page-body">' + makeBody(body) + '</div>';
  }

  function makeHeader(title, meta) {
    return (
      '<header>' +
      '<h1 class="page-title" dir="auto">' + escapeHtml(title) + '</h1>' +
      '<p class="page-description" dir="auto"></p>' +
      makePropertiesTable(meta) +
      '</header>'
    );
  }

  function makePropertiesTable(meta) {
    const icon = function (name) {
      return 'https://www.notion.so/icons/' + name + '_gray.svg';
    };

    const row = function (iconName, label, valueHtml) {
      return (
        '<tr class="property-row">' +
        '<th><span class="icon property-icon">' +
        '<img src="' + icon(iconName) + '" style="width:14px;height:14px;display:block"/>' +
        '</span>' + label + '</th>' +
        '<td>' + valueHtml + '</td>' +
        '</tr>'
      );
    };

    const tags = function (value, color) {
      return value.split(',').map(function (v) {
        return '<span class="selected-value select-value-color-' + (color || 'brown') + '">' +
          escapeHtml(v.trim()) + '</span>';
      }).join('');
    };

    let rows = '';
    if (meta.Type)       rows += row('list',        'Type',       tags(meta.Type));
    if (meta.Added)      rows += row('clock',       'Added',      '<time>' + escapeHtml(meta.Added) + '</time>');
    if (meta.Senses)     rows += row('description', 'Senses',     escapeHtml(meta.Senses));
    if (meta.Actuates)   rows += row('description', 'Actuates',   escapeHtml(meta.Actuates));
    if (meta.Connection) rows += row('description', 'Connection', escapeHtml(meta.Connection));
    if (meta.Status) {
      const color = meta.Status === 'Done' ? 'green' : meta.Status === 'In progress' ? 'yellow' : 'gray';
      rows += row('burst', 'Status',
        '<span class="status-value select-value-color-' + color + '">' +
        '<div class="status-dot status-dot-color-' + color + '"></div>' +
        escapeHtml(meta.Status) + '</span>');
    }
    if (meta.Voltage) rows += row('description', 'Voltage', escapeHtml(meta.Voltage));
    if (meta.Panel)   rows += row('description', 'Panel',   escapeHtml(meta.Panel));

    if (!rows) return '';
    return '<table class="properties"><tbody>' + rows + '</tbody></table>';
  }

  function makeBody(markdown) {
    // Prepend assets/img/ to any relative image path (images are flat in assets/img/)
    const fixedMd = markdown.replace(
      /!\[([^\]]*)\]\((?!https?:\/\/)(?!assets\/img\/)([^)]+)\)/g,
      function (_, alt, src) {
        const filename = decodeURIComponent(src.split('/').pop());
        return '![' + alt + '](assets/img/' + encodeURIComponent(filename) + ')';
      }
    );

    const html = marked.parse(fixedMd);

    // Replace full-size img src with medium version (falls back to original if medium 404s)
    const div = document.createElement('div');
    div.innerHTML = html;
    div.querySelectorAll('img[src^="assets/img/"]').forEach(function (img) {
      const orig = img.getAttribute('src');
      // Only rewrite flat assets/img/ paths (not already in a subdir)
      if (!/^assets\/img\/[^/]+$/.test(orig)) return;
      const name = orig.replace(/^assets\/img\//, '').replace(/\.[^.]+$/, '');
      const medium = 'assets/img/medium/' + name + '.jpg';
      img.setAttribute('src', medium);
      img.setAttribute('loading', 'lazy');
      img.addEventListener('error', function () {
        img.setAttribute('src', orig);
      }, { once: true });
    });
    return div.innerHTML;
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderError(msg) {
    document.getElementById('loading').textContent = 'Error: ' + msg;
  }
})();
