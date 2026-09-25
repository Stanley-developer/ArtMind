@echo off
REM Double-click this to start the BACKEND. Leave the window open.

cd /d "%~dp0backend"

if not exist "node_modules" (
    echo.
    echo  First time setup - downloading packages...
    echo.
    call npm install
)

echo.
echo  Starting the ArtMind backend on http://localhost:5000
echo  Press CTRL+C to stop.
echo.

call npm start

echo.
echo  The backend has stopped.
pause
