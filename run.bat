@echo off
setlocal
title SafeScape AR - Master Launcher
color 0A

echo.
echo  ================================================================
echo.
echo        SafeScape AR - ONE-CLICK MASTER LAUNCHER
echo        Industrial Safety AR Training Platform (SIH26041)
echo.
echo  ================================================================
echo.

set "PROJROOT=%~dp0"

REM --- 1. Requirements Validation ---
echo  [1/4] Checking environment requirements...

python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo   [ERROR] Python was not found in your PATH.
    echo   Please install Python from https://www.python.org/
    echo   Make sure to check "Add Python to PATH" during installation.
    echo.
    pause
    exit /b 1
)

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo   [ERROR] Node.js was not found in your PATH.
    echo   Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo   [OK] Python and Node.js detected.
echo.

REM --- 2. Starting Backend Server ---
echo  [2/4] Starting FastAPI Backend on port 8000...
start "SafeScape AR - Backend" "%COMSPEC%" /k "cd /d "%PROJROOT%backend" && call "%PROJROOT%start-backend.bat""

REM Non-blocking sleep
ping 127.0.0.1 -n 3 >nul

REM --- 3. Starting Admin Dashboard ---
echo  [3/4] Starting Admin Dashboard on port 5173...
start "SafeScape AR - Dashboard" "%COMSPEC%" /k "cd /d "%PROJROOT%dashboard" && call "%PROJROOT%start-dashboard.bat""

REM Non-blocking sleep
ping 127.0.0.1 -n 3 >nul

REM --- 4. Starting Mobile App (Expo) ---
echo  [4/4] Starting Mobile App (Expo)...
start "SafeScape AR - Mobile App" "%COMSPEC%" /k "cd /d "%PROJROOT%mobile" && call "%PROJROOT%start-mobile.bat""

ping 127.0.0.1 -n 4 >nul

REM --- Launch Browser ---
echo.
echo  Opening Admin Dashboard and Backend Docs in your browser...
start http://localhost:5173
start http://localhost:8000/docs

echo.
echo  ================================================================
echo   ALL SERVICES ARE RUNNING!
echo  ================================================================
echo.
echo   [1] BACKEND API:
echo       URL: http://localhost:8000/docs
echo.
echo   [2] ADMIN DASHBOARD:
echo       URL: http://localhost:5173
echo.
echo   [3] MOBILE AR APP (EXPO):
echo       Look at the "SafeScape AR - Mobile App" window:
echo       - SCAN the QR code using "Expo Go" on your Android phone
echo       - OR press 'w' in the Mobile terminal to open in Web browser
echo.
echo   To stop all services later, run: stop-all.bat
echo  ================================================================
echo.
echo  Press any key to close this launcher window.
pause
