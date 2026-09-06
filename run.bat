@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion
title SafeScape AR - Master Launcher
color 0A

cls
echo.
echo  ================================================================
echo.
echo        🛡️  SAFESCAPE AR — ONE-CLICK MASTER LAUNCHER
echo        Augmented Reality Industrial Safety Training Platform
echo        Smart India Hackathon (SIH26041)
echo.
echo  ================================================================
echo.

set PROJROOT=%~dp0

REM --- 1. Quick Requirements Validation ---
echo  [1/4] Checking environment requirements...

python --version >nul 2>&1
if !errorlevel! neq 0 (
    echo.
    echo   ❌ [ERROR] Python not found in PATH!
    echo      Please install Python 3.10+ from https://www.python.org/
    echo      Make sure to check "Add Python to PATH".
    echo.
    pause
    exit /b 1
)

node --version >nul 2>&1
if !errorlevel! neq 0 (
    echo.
    echo   ❌ [ERROR] Node.js not found in PATH!
    echo      Please install Node.js 18+ from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo   ✅ Core tools verified (Python + Node.js)
echo.

REM --- 2. Starting Backend Server ---
echo  [2/4] Starting FastAPI Backend API on port 8000...
start "SafeScape AR - Backend" cmd /k "call "%PROJROOT%start-backend.bat""

REM Give backend a short headstart
timeout /t 2 >nul

REM --- 3. Starting Admin Dashboard ---
echo  [3/4] Starting React Admin Dashboard on port 5173...
start "SafeScape AR - Dashboard" cmd /k "call "%PROJROOT%start-dashboard.bat""

REM --- 4. Starting Mobile App (Expo) ---
echo  [4/4] Starting React Native Mobile App (Expo)...
start "SafeScape AR - Mobile App" cmd /k "call "%PROJROOT%start-mobile.bat""

timeout /t 3 >nul

REM --- Launch Browser ---
echo.
echo  Opening Admin Dashboard & Backend Docs in browser...
start http://localhost:5173
start http://localhost:8000/docs

echo.
echo  ================================================================
echo   🚀  ALL SERVICES RUNNING SUCCESSFULLY!
echo  ================================================================
echo.
echo   [1] 🔧 BACKEND API:
echo       URL:  http://localhost:8000/docs (Swagger Interactive UI)
echo.
echo   [2] 🖥️ ADMIN DASHBOARD:
echo       URL:  http://localhost:5173
echo       Role: Manage workers, compliance reports, verify QR certificates
echo.
echo   [3] 📱 MOBILE AR APPLICATION (EXPO):
echo       Look at the "SafeScape AR - Mobile App" window:
echo       • SCAN the QR code with "Expo Go" app on any Android phone!
echo       • OR press 'w' in the Mobile terminal to preview in Web browser
echo       • Features: Multilingual (EN/HI/SAT), AR Fire & Gas Leakage,
echo                   Auto Assessment (80%% rule), Digital QR Certificate,
echo                   Offline Mode & Auto-Sync
echo.
echo   To stop all running services at any time, run: stop-all.bat
echo  ================================================================
echo.
echo  Keep this window open or press any key to close launcher.
pause >nul
