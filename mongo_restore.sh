#!/bin/bash

# === MongoDB Restore Script ===
# 📌 Purpose: Restore a previously backed-up MongoDB dump into target DB.

# Reminder about .env safety
echo "ℹ️  Reminder: Ensure your .env file is protected with 'chmod 600 .env'."
echo ""
echo "ℹ️  No manual MongoDB connection is required before running this script."
echo "    The script will automatically connect using the URI from your .env file."
echo ""

# Load environment variables
set -o allexport
MONGO_URI=$(node ./get-mongo-uri.js)
echo "🔎 Loaded MONGO_URI: $MONGO_URI"


set +o allexport

# Configuration

DEST_DB="test_clone_2"

# Ask for backup folder
read -p "📂 Enter path to backup folder (inside ./backups/): " BACKUP_FOLDER

if [ ! -d "$BACKUP_FOLDER" ]; then
  echo "❌ Backup folder not found: $BACKUP_FOLDER"
  exit 1
fi

# Restore
echo "⚡ Restoring backup from '$BACKUP_FOLDER' to database '$DEST_DB'..."
mongorestore --uri="$MONGO_URI/$DEST_DB" "$BACKUP_FOLDER/test"

if [ $? -eq 0 ]; then
  echo "✅ Restore completed successfully to database '$DEST_DB'."
else
  echo "❌ Restore failed! Exiting."
  exit 1
fi

echo "🚀 Restore complete!"
echo ""
echo "ℹ️  To verify your restored database, you can run this command:"
echo "mongosh \"$MONGO_URI/$DEST_DB\" --eval 'show collections;'"
