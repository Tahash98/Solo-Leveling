#!/bin/bash
set -e

echo "Starting Life RPG App build process..."

# Clean install dependencies
echo "Installing dependencies..."
npm ci

# Verify react-scripts is installed
echo "Verifying react-scripts..."
npx react-scripts --version

# Build the app
echo "Building the app..."
npm run build

echo "Build completed successfully!"