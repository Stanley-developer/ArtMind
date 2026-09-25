@echo off
REM Double-click this to start the WEBSITE. Start run-backend.bat first.

cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo.
    echo  First time setup - downloading packages. This takes 2-3 minutes...
    echo.
    call npm install
)

echo.
echo  Starting the ArtMind website on http://localhost:5173
echo  Press CTRL+C to stop.
echo.

call npm run dev

echo.
echo  The website has stopped.
pause
