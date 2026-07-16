from pathlib import Path

ROOT = Path(r'c:\Users\olivi\Simba')
HTML_DIR = ROOT / 'html'
FAVICON_LINE = '    <link rel="icon" type="image/png" href="../content/img/simba.png">\n'


def update_file(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    if 'theme-page-header' not in text:
        return False
    if 'rel="icon"' in text or "rel='icon'" in text:
        return False
    marker = '    <link rel="stylesheet" href="../css/style.css">\n'
    if marker not in text:
        raise SystemExit(f'Missing stylesheet marker in {path.name}')
    text = text.replace(marker, marker + FAVICON_LINE, 1)
    path.write_text(text, encoding='utf-8')
    return True


def main() -> None:
    updated = []
    for path in sorted(HTML_DIR.glob('*.html')):
        if update_file(path):
            updated.append(path.name)
    print('\n'.join(updated))


if __name__ == '__main__':
    main()