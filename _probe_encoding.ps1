$sample = 'Fran├ºais'
$encodings = @(
	[System.Text.Encoding]::UTF8,
	[System.Text.Encoding]::GetEncoding(1252),
	[System.Text.Encoding]::GetEncoding(437),
	[System.Text.Encoding]::GetEncoding(850)
)
$lines = foreach ($from in $encodings) {
	foreach ($to in $encodings) {
		$bytes = $from.GetBytes($sample)
		$converted = $to.GetString($bytes)
		$codes = [int[]][char[]]$converted -join ','
		"{0}->{1}:{2}" -f $from.WebName, $to.WebName, $codes
	}
}
[System.IO.File]::WriteAllText('c:\Users\olivi\Simba\_probe_out.txt', ($lines -join [Environment]::NewLine))
