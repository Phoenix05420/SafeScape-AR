@echo off
title SafeScape AR - Project Launcher
color 0A

:menu
cls
echo.
echo  ================================================================
echo.
echo        SafeScape AR - SIH26041
echo        AR-based Industrial Safety Training Platform
echo.
echo  ================================================================
echo.
echo  Select an option:
echo.
echo    [1]  Check Requirements
echo    [2]  Setup All (Install Dependencies)
echo    [3]  Start Backend (FastAPI)
echo    [4]  Start Dashboard (React)
echo    [5]  Start All (Backend + Dashboard)
echo    [6]  Open Unity Project Info
echo    [7]  Stop All Services
echo    [8]  Exit
echo.
set /p choice="  Enter your choice (1-8): "

if "%choice%"=="1" (
    call "%~dp0check-requirements.bat"
    goto menu
)
if "%choice%"=="2" (
    call "%~dp0setup.bat"
    goto menu
)
if "%choice%"=="3" (
    call "%~dp0start-backend.bat"
    goto menu
)
if "%choice%"=="4" (
    call "%~dp0start-dashboard.bat"
    goto menu
)
if "%choice%"=="5" goto start_all
if "%choice%"=="6" goto open_unity
if "%choice%"=="7" (
    call "%~dp0stop-all.bat"
    goto menu
)
if "%choice%"=="8" exit /b 0

echo.
echo  Invalid choice. Try again.
timeout /t 2 >nul
goto menu

:start_all
echo.
echo  ================================================================
echo   Starting Backend + Dashboard simultaneously...
echo  ================================================================
echo.
start "SafeScape AR - Backend" cmd /k "call "%~dp0start-backend.bat""
timeout /t 3 >nul
start "SafeScape AR - Dashboard" cmd /k "call "%~dp0start-dashboard.bat""
echo.
echo  Both services starting in separate windows!
echo.
echo     Backend API:    http://localhost:8000/docs
echo     Dashboard:      http://localhost:5173
echo.
pause
goto menu

:open_unity
echo.
echo  ================================================================
echo   Unity AR App
echo  ================================================================
echo.
set "UNITY_PROJECT=%~dp0unity-app"
if exist "%UNITY_PROJECT%\Assets" (
    echo   Unity project found at:
    echo   %UNITY_PROJECT%
    echo.
    echo   To open in Unity:
    echo     1. Open Unity Hub
    echo     2. Click "Add" and select the unity-app folder
    echo     3. Open with Unity 2022.3 LTS or later
    echo     4. Install AR Foundation + ARCore XR Plugin from Package Manager
    echo     5. Switch platform to Android (File ^> Build Settings)
    echo     6. Set minimum API level to 24 (Player Settings)
) else (
    echo   Unity project not found at: %UNITY_PROJECT%
)
echo.
pause
goto menu
