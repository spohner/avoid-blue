@ echo off
xcopy d:\Git\Escape y:\ /y
cd d:\Git\Escape
git commit -a -m %1
git push
PING 1.1.1.1 -n 1 -w 5000 >NUL
pause