#!/bin/bash
set -e

# Array of all required databases
DATABASES=(
  "visionpath_auth_db"
  "visionpath_user"
  "visionpath_student"
  "visionpath_counselor"
  "visionpath_admin"
  "visionpath_assessment"
  "visionpath_ai"
  "visionpath_career"
  "visionpath_skill"
  "visionpath_study_plan"
  "visionpath_resume"
  "visionpath_notification"
  "visionpath_file"
)

for db in "${DATABASES[@]}"; do
  echo "Checking/creating database: $db"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
      SELECT 'CREATE DATABASE $db'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$db')\gexec
EOSQL
done
echo "All VisionPath databases ready!"
