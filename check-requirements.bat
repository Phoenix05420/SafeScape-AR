@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion
title SafeScape AR - Requirement Checker
color 0B

echo.
echo  ================================================================
echo             SafeScape AR - Requirement Check
echo  ================================================================
echo.

set PASS=0
set FAIL=0
set WARN=0

REM --- Python Check ---
echo  -- Python ------------------------------------------
python --version >nul 2>&1
if !errorlevel! equ 0 (
    for /f "tokens=*" %%i in ('python --version 2^>^&1') do echo   [OK] %%i
    set /a PASS+=1
) else (
    echo   [FAIL] Python not found!
    echo          Download: https://www.python.org/downloads/
    echo          Check "Add Python to PATH" during install
    set /a FAIL+=1
)

REM --- pip Check ---
echo.
echo  -- pip ---------------------------------------------
pip --version >nul 2>&1
if !errorlevel! equ 0 (
    echo   [OK] pip found
    set /a PASS+=1
) else (
    echo   [FAIL] pip not found!
    echo          Run: python -m ensurepip --upgrade
    set /a FAIL+=1
)

REM --- Node.js Check ---
echo.
echo  -- Node.js -----------------------------------------
node --version >nul 2>&1
if !errorlevel! equ 0 (
    for /f "tokens=*" %%i in ('node --version 2^>^&1') do echo   [OK] Node.js %%i
    set /a PASS+=1
) else (
    echo   [FAIL] Node.js not found!
    echo          Download: https://nodejs.org/
    set /a FAIL+=1
)

REM --- npm Check ---
echo.
echo  -- npm ---------------------------------------------
npm --version >nul 2>&1
if !errorlevel! equ 0 (
    for /f "tokens=*" %%i in ('npm --version 2^>^&1') do echo   [OK] npm v%%i
    set /a PASS+=1
) else (
    echo   [FAIL] npm not found! (Comes bundled with Node.js)
    set /a FAIL+=1
)

REM --- Git Check ---
echo.
echo  -- Git ---------------------------------------------
git --version >nul 2>&1
if !errorlevel! equ 0 (
    for /f "tokens=*" %%i in ('git --version 2^>^&1') do echo   [OK] %%i
    set /a PASS+=1
) else (
    echo   [WARN] Git not found (optional but recommended)
    echo          Download: https://git-scm.com/downloads
    set /a WARN+=1
)

REM --- Docker Check ---
echo.
echo  -- Docker (Optional) -------------------------------
docker --version >nul 2>&1
if !errorlevel! equ 0 (
    for /f "tokens=*" %%i in ('docker --version 2^>^&1') do echo   [OK] %%i
    set /a PASS+=1
) else (
    echo   [WARN] Docker not found (optional - needed for docker-compose)
    echo          Download: https://www.docker.com/products/docker-desktop/
    set /a WARN+=1
)

REM --- PostgreSQL Check ---
echo.
echo  -- PostgreSQL (Optional) ---------------------------
psql --version >nul 2>&1
if !errorlevel! equ 0 (
    for /f "tokens=*" %%i in ('psql --version 2^>^&1') do echo   [OK] %%i
    set /a PASS+=1
) else (
    echo   [WARN] PostgreSQL not found
    echo          Option 1: Install from https://www.postgresql.org/download/
    echo          Option 2: Use Docker (docker-compose up)
    set /a WARN+=1
)

REM --- Unity Check ---
echo.
echo  -- Unity Hub (Optional) ----------------------------
if exist "%ProgramFiles%\Unity Hub\Unity Hub.exe" (
    echo   [OK] Unity Hub found
    set /a PASS+=1
) else if exist "%LOCALAPPDATA%\Programs\Unity Hub\Unity Hub.exe" (
    echo   [OK] Unity Hub found
    set /a PASS+=1
) else (
    echo   [WARN] Unity Hub not found (needed to build the AR mobile app)
    echo          Download: https://unity.com/download
    set /a WARN+=1
)

REM --- Project Files Check ---
echo.
echo  -- Project Files -----------------------------------
set PROJROOT=%~dp0

if exist "%PROJROOT%backend\app\main.py" (
    echo   [OK] Backend source files found
    set /a PASS+=1
) else (
    echo   [FAIL] Backend source files missing!
    set /a FAIL+=1
)

if exist "%PROJROOT%backend\requirements.txt" (
    echo   [OK] Backend requirements.txt found
    set /a PASS+=1
) else (
    echo   [FAIL] Backend requirements.txt missing!
    set /a FAIL+=1
)

if exist "%PROJROOT%dashboard\package.json" (
    echo   [OK] Dashboard package.json found
    set /a PASS+=1
) else (
    echo   [FAIL] Dashboard package.json missing!
    set /a FAIL+=1
)

if exist "%PROJROOT%dashboard\node_modules" (
    echo   [OK] Dashboard node_modules installed
    set /a PASS+=1
) else (
    echo   [WARN] Dashboard node_modules not installed (run setup.bat first)
    set /a WARN+=1
)

if exist "%PROJROOT%backend\venv" (
    echo   [OK] Backend virtual environment found
    set /a PASS+=1
) else (
    echo   [WARN] Backend venv not created (run setup.bat first)
    set /a WARN+=1
)

if exist "%PROJROOT%unity-app\Assets\Scripts" (
    echo   [OK] Unity AR app source files found
    set /a PASS+=1
) else (
    echo   [FAIL] Unity AR app source files missing!
    set /a FAIL+=1
)

REM --- Summary ---
echo.
echo  ================================================================
echo   REQUIREMENT CHECK SUMMARY
echo  ================================================================
echo.
echo   Passed:   !PASS!
echo   Failed:   !FAIL!
echo   Warnings: !WARN!
echo.
if !FAIL! gtr 0 (
    echo   [FAIL] Some required dependencies are missing.
    echo          Please install them before running the project.
) else (
    echo   [OK] All required dependencies are installed!
    if !WARN! gtr 0 (
        echo        Some optional tools are missing - see warnings above.
    )
)
echo.
echo  Press any key to continue...
pause >nul
