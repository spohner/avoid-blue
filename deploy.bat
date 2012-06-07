@ echo off
cd d:\Git\Escape
git commit -a -m %1
xcopy d:\Git\Escape y:\ /y
git push
TYPE NUL | CHOICE.COM /N /CY /TY,5 >NUL
%2