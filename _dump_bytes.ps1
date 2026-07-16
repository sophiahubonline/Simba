$file = 'c:\Users\olivi\Simba\js\i18n.js'
$bytes = [System.IO.File]::ReadAllBytes($file)
$needle = [System.Text.Encoding]::ASCII.GetBytes('Fran')
$pos = -1
for ($i = 0; $i -le $bytes.Length - $needle.Length; $i++) {
    $found = $true
    for ($j = 0; $j -lt $needle.Length; $j++) {
        if ($bytes[$i + $j] -ne $needle[$j]) { $found = $false; break }
    }
    if ($found) { $pos = $i; break }
}
if ($pos -lt 0) { $pos = 0 }
$start = [Math]::Max(0, $pos - 16)
$length = [Math]::Min(80, $bytes.Length - $start)
$segment = $bytes[$start..($start + $length - 1)]
[System.IO.File]::WriteAllText('c:\Users\olivi\Simba\_dump_bytes.txt', (($segment | ForEach-Object { $_.ToString('X2') }) -join ' '))
