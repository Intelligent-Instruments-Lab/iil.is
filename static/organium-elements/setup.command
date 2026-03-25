#!/bin/bash
cd "$(dirname "$0")"

echo "================================"
echo "  Organium Elements — Setup"
echo "================================"
echo ""

# ── Python dependencies ──────────────────────────────────────────────────────
echo "Installing Python dependencies..."
pip3 install -r requirements.txt
echo ""

# ── Git setup ────────────────────────────────────────────────────────────────
if [ ! -d ".git" ]; then
  echo "Setting up Git..."
  echo ""
  read -p "Enter your GitHub repository URL (e.g. https://github.com/user/repo.git): " REPO_URL

  if [ -n "$REPO_URL" ]; then
    git init
    git remote add origin "$REPO_URL"
    git branch -M main
    git add .
    git commit -m "Initial commit"
    echo ""
    echo "Pushing to GitHub (you may be asked for your credentials)..."
    git push -u origin main
    echo ""
    echo "✓ Repository connected."
    echo ""
    echo "Enable GitHub Pages at:"
    echo "  $REPO_URL → Settings → Pages → Branch: main / root"
  else
    echo "⚠ No URL entered. Skipping git setup."
    echo "  You can run this setup again later to connect a repository."
  fi
else
  echo "✓ Git already initialized, skipping."
fi

echo ""
echo "================================"
echo "  Setup complete!"
echo "  Double-click 'admin.command' to begin."
echo "================================"
echo ""
read -p "Press Enter to close..."
