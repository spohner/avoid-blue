@ echo off
xcopy d:\Git\Escape y:\ /y
cd d:\Git\Escape
IF NOT "%1"=="" (
	IF "%1"=="-m" (
		git commit -a -m %2
	)
)