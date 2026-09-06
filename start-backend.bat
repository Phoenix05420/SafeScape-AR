@echo off
setlocal enabledelayedexpansion
title SafeScape AR - Backend Server
color 0A

echo.
echo  ================================================================
echo            SafeScape AR - Backend Server
echo  ================================================================
echo.

set PROJROOT=%~dp0
cd /d "%PROJROOT%backend"

REM --- Pre-flight Checks ---
echo  -- Pre-flight Checks ----------------------------
echo.

python --version >nul 2>&1
if !errorlevel! neq 0 (
    echo   [FAIL] Python not found! Install from https://www.python.org/downloads/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version 2^>^&1') do echo   [OK] %%i

if not exist "venv\Scripts\activate.bat" (
    echo   [WARN] Virtual environment not found. Creating...
    python -m venv venv
    if !errorlevel! neq 0 (
        echo   [FAIL] Failed to create venv. Run setup.bat first.
        pause
        exit /b 1
    )
    echo   [OK] Virtual environment created
) else (
    echo   [OK] Virtual environment found
)

call venv\Scripts\activate.bat
echo   [OK] Virtual environment activated

pip show fastapi >nul 2>&1
if !errorlevel! neq 0 (
    echo   [WARN] Dependencies not installed. Installing...
    pip install -r requirements.txt --quiet
    if !errorlevel! neq 0 (
        echo   [FAIL] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo   [OK] Dependencies installed
) else (
    echo   [OK] Dependencies already installed
)

if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo   [WARN] Created .env from template - edit with your DB credentials!
    ) else (
        echo   [WARN] No .env file found. Using default settings.
    )
) else (
    echo   [OK] .env configuration found
)

if not exist "app\main.py" (
    echo   [FAIL] app\main.py not found! Project files may be corrupted.
    pause
    exit /b 1
)
echo   [OK] Backend source files verified

echo.
echo  -- All checks passed! --------------------------
echo.

REM --- Start Server ---
echo  ================================================================
echo   Starting FastAPI Backend Server...
echo  ================================================================
echo.
echo   API Server:    http://localhost:8000
echo   API Docs:      http://localhost:8000/docs
echo   ReDoc:         http://localhost:8000/redoc
echo.
echo   Press Ctrl+C to stop the server
echo  ----------------------------------------------------------------
echo.

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

echo.
echo  Server stopped.
call deactivate 2>nul
pause
