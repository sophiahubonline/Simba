$file = 'c:\Users\olivi\Simba\js\i18n.js'
$bytes = [System.IO.File]::ReadAllBytes($file)
$encodings = @(
    [System.Text.Encoding]::UTF8,
    [System.Text.Encoding]::GetEncoding(1252),
    [System.Text.Encoding]::GetEncoding(437),
    [System.Text.Encoding]::GetEncoding(850),
    [System.Text.Encoding]::GetEncoding(28591)
)
$matches = foreach ($enc in $encodings) {
    try {
        $text = $enc.GetString($bytes)
        if ($text.Contains('Français') -and $text.Contains('Español')) {
            $enc.WebName
        }
    } catch {}
}
[System.IO.File]::WriteAllText('c:\Users\olivi\Simba\_probe_raw_out.txt', ($matches -join [Environment]::NewLine))
