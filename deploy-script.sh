#!/bin/bash
git pull origin main
npm i
pm2 restart my-next-app
