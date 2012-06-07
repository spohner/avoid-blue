@ echo off
cd d:\Git\Escape
git commit -a -m %1
git push
xcopy d:\Git\Escape y:\ /y