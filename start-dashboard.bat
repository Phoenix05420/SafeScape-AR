@echo off
setlocal enabledelayedexpansion
title SafeScape AR - Dashboard
color 0D

echo.
echo  ================================================================
echo            SafeScape AR - Admin Dashboard
echo  ================================================================
echo.

set PROJROOT=%~dp0
cd /d "%PROJROOT%dashboard"

REM --- Pre-flight Checks ---
echo  -- Pre-flight Checks ----------------------------
echo.

node --version >nul 2>&1
if !errorlevel! neq 0 (
    echo   [FAIL] Node.js not found! Install from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version 2^>^&1') do echo   [OK] Node.js %%i

npm --version >nul 2>&1
if !errorlevel! neq 0 (
    echo   [FAIL] npm not found! Reinstall Node.js from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version 2^>^&1') do echo   [OK] npm v%%i

if not exist "package.json" (
    echo   [FAIL] package.json not found! Project files may be corrupted.
    pause
    exit /b 1
)
echo   [OK] package.json found

if not exist "node_modules" (
    echo   [WARN] node_modules not found. Installing dependencies...
    echo         (This may take a minute on first run)
    echo.
    npm install
    if !errorlevel! neq 0 (
        echo.
        echo   [FAIL] npm install failed! Check your network and try again.
        pause
        exit /b 1
    )
    echo.
    echo   [OK] Dependencies installed successfully
) else (
    echo   [OK] node_modules found
)

if not exist "src\App.tsx" (
    echo   [FAIL] src\App.tsx not found! Project files may be corrupted.
    pause
    exit /b 1
)
echo   [OK] Dashboard source files verified

echo.
echo  -- All checks passed! --------------------------
echo.

REM --- Start Dev Server ---
echo  ================================================================
echo   Starting React Dashboard Dev Server...
echo  ================================================================
echo.
echo   Dashboard:     http://localhost:5173
echo.
echo   Login with mock credentials:
echo     Email:       admin@safescape.com
echo     Password:    admin123
echo.
echo   Press Ctrl+C to stop the server
echo  ----------------------------------------------------------------
echo.

npm run dev

echo.
echo  Dashboard stopped.
pause
