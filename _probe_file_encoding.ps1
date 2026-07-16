$file = 'c:\Users\olivi\Simba\js\i18n.js'
$text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$encodings = @(
    [System.Text.Encoding]::UTF8,
    [System.Text.Encoding]::GetEncoding(1252),
    [System.Text.Encoding]::GetEncoding(437),
    [System.Text.Encoding]::GetEncoding(850)
)
$matches = foreach ($from in $encodings) {
    foreach ($to in $encodings) {
        $converted = $to.GetString($from.GetBytes($text))
        if ($converted.Contains('Français') -and $converted.Contains('Español')) {
            '{0}->{1}' -f $from.WebName, $to.WebName
        }
    }
}
[System.IO.File]::WriteAllText('c:\Users\olivi\Simba\_probe_file_out.txt', ($matches -join [Environment]::NewLine))
