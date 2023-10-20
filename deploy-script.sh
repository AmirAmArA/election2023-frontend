#!/bin/bash
git pull origin main
npm i
npm run build
pm2 restart next-app
