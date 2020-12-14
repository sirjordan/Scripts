$files = (Get-ChildItem -Recurse -File).fullname
$rnd = Get-Random -Minimum 0 -Maximum $files.Count;
$file = $files[$rnd]
Write-Host('Starting: ' + $file)
& $file
