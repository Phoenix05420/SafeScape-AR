@echo off
setlocal enabledelayedexpansion
title SafeScape AR - Setup
color 0E

echo.
echo  ================================================================
echo            SafeScape AR - Project Setup
echo  ================================================================
echo.

set PROJROOT=%~dp0

REM ============================================
REM  STEP 1: Verify Core Requirements
REM ============================================
echo  -- Step 1: Checking core requirements --------
echo.

python --version >nul 2>&1
if !errorlevel! neq 0 (
    echo   [FAIL] Python is required but not found!
    echo          Download: https://www.python.org/downloads/
    echo          IMPORTANT: Check "Add Python to PATH" during install
    echo.
    echo   Setup cannot continue. Press any key to exit...
    pause >nul
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version 2^>^&1') do echo   [OK] %%i

node --version >nul 2>&1
if !errorlevel! neq 0 (
    echo   [FAIL] Node.js is required but not found!
    echo          Download: https://nodejs.org/
    echo.
    echo   Setup cannot continue. Press any key to exit...
    pause >nul
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version 2^>^&1') do echo   [OK] Node.js %%i

npm --version >nul 2>&1
if !errorlevel! neq 0 (
    echo   [FAIL] npm is required but not found!
    echo.
    echo   Setup cannot continue. Press any key to exit...
    pause >nul
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version 2^>^&1') do echo   [OK] npm v%%i

echo.
echo   All core requirements met!
echo.

REM ============================================
REM  STEP 2: Setup Backend
REM ============================================
echo  -- Step 2: Setting up Backend ----------------
echo.

cd /d "%PROJROOT%backend"

if not exist "venv" (
    echo   Creating Python virtual environment...
    python -m venv venv
    if !errorlevel! neq 0 (
        echo   [FAIL] Failed to create virtual environment!
        goto dashboard_setup
    )
    echo   [OK] Virtual environment created
) else (
    echo   [OK] Virtual environment already exists
)

echo   Installing Python dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt --quiet 2>nul
if !errorlevel! equ 0 (
    echo   [OK] Python dependencies installed successfully
) else (
    echo   [WARN] Some dependencies may have failed. Check manually.
)

if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo   [OK] Created .env from .env.example
        echo        NOTE: Edit backend\.env with your database credentials!
    )
) else (
    echo   [OK] .env file already exists
)

call deactivate 2>nul
echo.

REM ============================================
REM  STEP 3: Setup Dashboard
REM ============================================
:dashboard_setup
echo  -- Step 3: Setting up Dashboard -------------
echo.

cd /d "%PROJROOT%dashboard"

if not exist "node_modules" (
    echo   Installing npm dependencies (this may take a minute)...
    npm install --loglevel=error 2>nul
    if !errorlevel! equ 0 (
        echo   [OK] npm dependencies installed successfully
    ) else (
        echo   [FAIL] npm install failed! Try manually: cd dashboard ^&^& npm install
    )
) else (
    echo   [OK] node_modules already exists
)

echo.

REM ============================================
REM  STEP 4: Verify Build
REM ============================================
echo  -- Step 4: Verifying dashboard build ---------
echo.

call npm run build >nul 2>&1
if !errorlevel! equ 0 (
    echo   [OK] Dashboard builds successfully!
) else (
    echo   [WARN] Dashboard build had issues. Try: cd dashboard ^&^& npm run build
)

echo.

REM ============================================
REM  DONE
REM ============================================
cd /d "%PROJROOT%"

echo.
echo  ================================================================
echo   SETUP COMPLETE!
echo  ================================================================
echo.
echo   Next steps:
echo.
echo     1. Edit backend\.env with your PostgreSQL credentials
echo        (or use Docker: cd backend ^&^& docker-compose up -d)
echo.
echo     2. Run database migrations:
echo        cd backend
echo        venv\Scripts\activate
echo        alembic upgrade head
echo.
echo     3. Seed sample data:
echo        python -m app.seed
echo.
echo     4. Start the project:
echo        Run start.bat and select option [5] to start everything!
echo.
echo   Or just run start-dashboard.bat to see the demo immediately
echo   (dashboard works standalone with built-in mock data)
echo.
echo  Press any key to exit...
pause >nul
