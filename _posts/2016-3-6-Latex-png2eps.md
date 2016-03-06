```
for %%s in (*.png, *.jpg) do ( 

echo %%s 
bmeps -c %%s %%~ns.eps

) 
pause
```
