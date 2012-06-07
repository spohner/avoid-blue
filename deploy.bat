@ echo off
xcopy d:\Git\Escape y:\ /y
cd d:\Git\Escape
IF NOT "%1"=="" (
	git commit -a -m %1
)