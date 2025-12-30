@echo off
echo 🔄 Portfolio Data Update Script
echo.

echo Step 1: Make sure your resume.pdf is in backend/public/files/
pause

echo.
echo Step 2: Updating database with new seed data...
cd backend
call npx prisma db push --force-reset
call npx prisma db seed

echo.
echo Step 3: Restarting servers...
echo Please restart both frontend and backend servers manually
echo Frontend: npm run dev (in frontend directory)
echo Backend: npm run dev (in backend directory)

echo.
echo ✅ Portfolio update complete!
echo Visit http://localhost:3000 to see your changes
pause