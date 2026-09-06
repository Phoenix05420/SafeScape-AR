@echo off
title SafeScape AR - Stop All Services
color 0C

echo.
echo  ================================================================
echo            SafeScape AR - Stop All Services
echo  ================================================================
echo.

echo  Stopping all SafeScape AR processes...
echo.

REM Kill Backend (uvicorn/python)
tasklist /FI "WINDOWTITLE eq SafeScape AR - Backend*" 2>nul | find /I "cmd.exe" >nul
if %errorlevel% equ 0 (
    echo   Stopping Backend window...
    taskkill /FI "WINDOWTITLE eq SafeScape AR - Backend*" /F >nul 2>&1
    echo   [OK] Backend stopped
) else (
    echo   [--] No backend window found
)

REM Kill Dashboard (node/vite)
tasklist /FI "WINDOWTITLE eq SafeScape AR - Dashboard*" 2>nul | find /I "cmd.exe" >nul
if %errorlevel% equ 0 (
    echo   Stopping Dashboard window...
    taskkill /FI "WINDOWTITLE eq SafeScape AR - Dashboard*" /F >nul 2>&1
    echo   [OK] Dashboard stopped
) else (
    echo   [--] No dashboard window found
)

REM Kill Mobile (expo)
tasklist /FI "WINDOWTITLE eq SafeScape AR - Mobile*" 2>nul | find /I "cmd.exe" >nul
if %errorlevel% equ 0 (
    echo   Stopping Mobile App window...
    taskkill /FI "WINDOWTITLE eq SafeScape AR - Mobile*" /F >nul 2>&1
    echo   [OK] Mobile App stopped
) else (
    echo   [--] No mobile window found
)

echo.
echo  Done. All services stopped.
echo.
pause
