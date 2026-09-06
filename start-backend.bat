@echo off
setlocal
title SafeScape AR - Backend Server
color 0A

echo.
echo  ================================================================
echo            SafeScape AR - Backend Server
echo  ================================================================
echo.

set "PROJROOT=%~dp0"
cd /d "%PROJROOT%backend"

REM --- Pre-flight Checks ---
echo  -- Pre-flight Checks ----------------------------
echo.

python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo   [FAIL] Python not found in PATH! Install from https://www.python.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version 2^>^&1') do echo   [OK] %%i

REM Select active virtual environment (.venv preferred)
set "PY_EXE="
if exist ".venv\Scripts\python.exe" (
    set "PY_EXE=.venv\Scripts\python.exe"
    set "VENV_ACTIVATE=.venv\Scripts\activate.bat"
) else if exist "venv\Scripts\python.exe" (
    set "PY_EXE=venv\Scripts\python.exe"
    set "VENV_ACTIVATE=venv\Scripts\activate.bat"
) else (
    echo   [WARN] Virtual environment not found. Creating .venv...
    python -m venv .venv
    if %errorlevel% neq 0 (
        echo   [FAIL] Failed to create virtualenv.
        pause
        exit /b 1
    )
    set "PY_EXE=.venv\Scripts\python.exe"
    set "VENV_ACTIVATE=.venv\Scripts\activate.bat"
)

echo   Activating environment: %VENV_ACTIVATE%
call %VENV_ACTIVATE%

REM Verify FastAPI dependency using the venv python directly
%PY_EXE% -c "import fastapi" >nul 2>&1
if %errorlevel% neq 0 (
    echo   [WARN] Dependencies missing. Installing requirements...
    %PY_EXE% -m pip install -r requirements.txt --quiet
    if %errorlevel% neq 0 (
        echo   [FAIL] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo   [OK] Dependencies installed
) else (
    echo   [OK] Backend dependencies verified
)

if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo   [WARN] Created .env from template
    )
) else (
    echo   [OK] .env configuration found
)

if not exist "app\main.py" (
    echo   [FAIL] app\main.py not found!
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

%PY_EXE% -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

echo.
echo  Backend server stopped.
pause
