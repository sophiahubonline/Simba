from pathlib import Path

ROOT = Path(r'c:\Users\olivi\Simba')
VERSION = '20260715'


def bust(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    updated = text
    updated = updated.replace('../js/i18n.js"></script>', f'../js/i18n.js?v={VERSION}"></script>')
    updated = updated.replace('../js/script.js"></script>', f'../js/script.js?v={VERSION}"></script>')
    if updated != text:
        path.write_text(updated, encoding='utf-8')
        return True
    return False


def main() -> None:
    changed = []
    for html_file in sorted((ROOT / 'html').glob('*.html')):
        if bust(html_file):
            changed.append(html_file.name)
    print('\n'.join(changed))


if __name__ == '__main__':
    main()
