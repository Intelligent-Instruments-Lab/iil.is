#!/bin/bash
lsof -ti :5001 -ti :8080 | xargs kill 2>/dev/null
echo "Servers stopped."
