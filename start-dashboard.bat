@echo off
setlocal
title SafeScape AR - Dashboard
color 0D

echo.
echo  ================================================================
echo            SafeScape AR - Admin Dashboard
echo  ================================================================
echo.

set "PROJROOT=%~dp0"
cd /d "%PROJROOT%dashboard"

REM --- Pre-flight Checks ---
echo  -- Pre-flight Checks ----------------------------
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
        echo   [FAIL] npm install failed.
        pause
        exit /b 1
    )
    echo   [OK] Dependencies installed
) else (
    echo   [OK] Dashboard dependencies verified
)

if not exist "src\App.tsx" (
    echo   [FAIL] src\App.tsx not found!
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

call npm run dev

echo.
echo  Dashboard stopped.
pause
