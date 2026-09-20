@echo off
title VisionPath - API Gateway Reverse Proxy Tunnel
echo =====================================================================
echo  Starting Reverse Proxy Tunnel for VisionPath API Gateway (Port 8080)
echo  Connected to TiDB Cloud & Vercel Cloud Frontend
echo =====================================================================
echo.
echo Forwarding http://localhost:8080 to https://visionpath-api.loca.lt ...
echo.
npx.cmd localtunnel --port 8080 --subdomain visionpath-api
pause
