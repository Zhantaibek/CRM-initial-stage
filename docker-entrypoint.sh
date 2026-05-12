#!/bin/sh

echo "Running Prisma migrations..."
npx prisma db push

echo "Starting server..."
node -r tsconfig-paths/register dist/server.js