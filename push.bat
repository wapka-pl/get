:: update data on git repo
@ECHO OFF
SetLocal EnableDelayedExpansion
for /f %%i in ('dir /b /od Ticket\*.md') do set filename=%%i
for /f "delims==" %%a in (Ticket\%filename%) do set message=%%a
@ECHO ON
message.bat && git add . && git commit -m "%message%" && git push origin master
::&& docs.bat
