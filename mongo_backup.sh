#!/bin/bash

# === MongoDB Backup Script ===
# 📌 Purpose: Safely dump MongoDB 'test' database into timestamped backup folder.

# Reminder about .env safety
echo "ℹ️  Reminder: Ensure your .env file is protected with 'chmod 600 .env'."
echo ""
echo "ℹ️  No manual MongoDB connection is required before running this script."
echo "    The script will automatically connect using the URI from your .env file."
echo ""

# Load Mongo URI using Node helper
MONGO_URI=$(node ./get-mongo-uri.js)

# Strip query parameters from URI (for mongodump compatibility)
MONGO_URI_CLEANED="${MONGO_URI%%\?*}"
echo "🔎 Cleaned MONGO_URI: $MONGO_URI_CLEANED"

# Configuration
SOURCE_DB="test"
BACKUP_DIR="./backups"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Timestamped backup folder
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FOLDER="$BACKUP_DIR/${SOURCE_DB}_backup_$TIMESTAMP"

# Backup
echo "📦 Backing up database '$SOURCE_DB'..."
mongodump --uri="$MONGO_URI_CLEANED/$SOURCE_DB" --out="$DUMP_FOLDER"

if [ $? -eq 0 ]; then
  echo "✅ Backup completed successfully: $DUMP_FOLDER"
else
  echo "❌ Backup failed! Exiting."
  exit 1
fi

echo "🚀 Backup complete!"
