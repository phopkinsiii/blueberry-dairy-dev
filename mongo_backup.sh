#!/bin/bash

# === MongoDB Backup Script ===
# 📌 Purpose: Safely dump MongoDB 'test' database into timestamped backup folder.

# Reminder about .env file permissions
echo "ℹ️  Reminder: Ensure your .env file is protected with 'chmod 600 .env'."
echo ""
echo "ℹ️  No manual MongoDB connection is required before running this script."
echo "    The script will automatically connect using the URI from your .env file."
echo ""

# Load cleaned Mongo URI using Node.js helper
MONGO_URI=$(node ./get-mongo-uri.js | grep '^mongodb')


# Echo cleaned URI for confirmation (safe since password is shown only if script permits)
echo "🔎 Cleaned MONGO_URI: $MONGO_URI"

# Configuration
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FOLDER="$BACKUP_DIR/mongo_backup_$TIMESTAMP"

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Perform the backup (mongodump automatically uses the DB from the URI)
echo "📦 Backing up database..."
mongodump --uri="$MONGO_URI" --out="$DUMP_FOLDER"

# Check if mongodump succeeded
if [ $? -eq 0 ]; then
  echo "✅ Backup completed successfully: $DUMP_FOLDER"
else
  echo "❌ Backup failed! Exiting."
  exit 1
fi

echo "🚀 Backup complete!"
