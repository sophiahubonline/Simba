$file = 'c:\Users\olivi\Simba\js\i18n.js'
$text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$fixed = [System.Text.Encoding]::UTF8.GetString([System.Text.Encoding]::GetEncoding(1252).GetBytes($text))
[System.IO.File]::WriteAllText($file, $fixed, [System.Text.Encoding]::UTF8)
