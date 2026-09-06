@echo off
setlocal
title SafeScape AR - Mobile App (Expo)
color 0B

echo.
echo  ================================================================
echo            SafeScape AR - Mobile App (React Native Expo)
echo  ================================================================
echo.

set "PROJROOT=%~dp0"
cd /d "%PROJROOT%mobile"

REM --- Pre-flight Checks ---
echo  -- Checking Mobile Environment ------------------
echo.

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo   [FAIL] Node.js not found in PATH!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version 2^>^&1') do echo   [OK] Node.js %%i

if not exist "node_modules" (
    echo   [WARN] node_modules not found. Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo   [FAIL] Failed to install mobile dependencies.
        pause
        exit /b 1
    )
    echo   [OK] Dependencies installed
) else (
    echo   [OK] Mobile dependencies verified
)

echo.
echo  ================================================================
echo   Starting Expo Development Server...
echo  ================================================================
echo.
echo   HOW TO TEST ON YOUR ANDROID PHONE:
echo     1. Install "Expo Go" app from Google Play Store
echo     2. Scan the QR code that appears below with your phone camera
echo     3. SafeScape AR will load immediately with interactive AR!
echo.
echo   HOW TO TEST ON YOUR COMPUTER (WEB):
echo     - Press 'w' in this terminal to open in browser
echo     - Press 'a' for Android Emulator (if installed)
echo.
echo   Press Ctrl+C to stop Expo server
echo  ----------------------------------------------------------------
echo.

call npx expo start -c

echo.
echo  Expo server stopped.
pause
