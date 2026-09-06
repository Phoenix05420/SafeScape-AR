@echo off
setlocal
title SafeScape AR - Mobile App (Expo SDK 57)
color 0B

echo.
echo  ================================================================
echo            SafeScape AR - Mobile App (Expo SDK 57)
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
    echo   [OK] Mobile dependencies verified (SDK 57)
)

echo.
echo  ================================================================
echo   Select Connection Mode:
echo  ================================================================
echo.
echo   [1] Standard LAN Mode (Recommended if Phone and PC on same Wi-Fi)
echo   [2] Cloud Tunnel Mode (RECOMMENDED IF PHONE IS ON MOBILE DATA 4G/5G)
echo   [3] Open in Web Browser (No phone required)
echo.
set /p MODE="  Enter choice (1, 2, or 3) [Default: 1]: "
if "%MODE%"=="" set MODE=1

echo.
if "%MODE%"=="2" (
    echo   Starting in Cloud Tunnel mode (bypasses local network/firewall)...
    call npx expo start --tunnel -c
) else if "%MODE%"=="3" (
    echo   Starting in Web browser mode...
    call npx expo start --web -c
) else (
    echo   Starting in Standard LAN mode...
    call npx expo start -c
)

echo.
echo  Expo server stopped.
pause
