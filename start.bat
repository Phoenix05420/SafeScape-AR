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
echo    [1]  🚀  Run Entire Project (Backend + Dashboard + Mobile Expo)
echo    [2]  📱  Start Mobile App Only (React Native Expo)
echo    [3]  🖥️   Start Admin Dashboard Only (React)
echo    [4]  🔧  Start Backend Server Only (FastAPI)
echo    [5]  🔍  Check Requirements
echo    [6]  📦  Setup All Dependencies
echo    [7]  🎮  Unity AR Project Info
echo    [8]  🛑  Stop All Services
echo    [9]  ❌  Exit
echo.
set /p choice="  Enter your choice (1-9): "

if "%choice%"=="1" (
    call "%~dp0run.bat"
    goto menu
)
if "%choice%"=="2" (
    call "%~dp0start-mobile.bat"
    goto menu
)
if "%choice%"=="3" (
    call "%~dp0start-dashboard.bat"
    goto menu
)
if "%choice%"=="4" (
    call "%~dp0start-backend.bat"
    goto menu
)
if "%choice%"=="5" (
    call "%~dp0check-requirements.bat"
    goto menu
)
if "%choice%"=="6" (
    call "%~dp0setup.bat"
    goto menu
)
if "%choice%"=="7" goto open_unity
if "%choice%"=="8" (
    call "%~dp0stop-all.bat"
    goto menu
)
if "%choice%"=="9" exit /b 0

echo.
echo  Invalid choice. Try again.
timeout /t 2 >nul
goto menu

:open_unity
echo.
echo  ================================================================
echo   Unity AR App (Alternative Native Engine)
echo  ================================================================
echo.
set "UNITY_PROJECT=%~dp0unity-app"
if exist "%UNITY_PROJECT%\Assets" (
    echo   Unity project source found at:
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
