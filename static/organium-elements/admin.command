#!/bin/bash
cd "$(dirname "$0")"

# Start the static site server on port 8080 in the background
python3 -m http.server 8080 &
HTTP_PID=$!

# Start the admin panel (this blocks until closed)
python3 admin.py

# Clean up the static server when admin exits
kill $HTTP_PID 2>/dev/null
