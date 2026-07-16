from pathlib import Path
from pathlib import Path
import re

ROOT = Path(r'c:\Users\olivi\Simba')
I18N_PATH = ROOT / 'js' / 'i18n.js'

THEME_MESSAGES = {
    'en': 'This theme page is not yet available.',
    'de': 'Diese Themenseite ist noch nicht verfügbar.',
    'fr': 'Cette page thématique n’est pas encore disponible.',
    'es': 'Esta página temática aún no está disponible.',
    'it': 'Questa pagina tematica non è ancora disponibile.',
}


def update_i18n(text: str) -> str:
    for lang, message in THEME_MESSAGES.items():
        pattern = rf'(\n        {lang}: \{{.*?)(\n            quiz:)'
        replacement = rf'\1\n            theme: {{ unavailable: \'{message}\' }},\2'
        text, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
        if count != 1:
            raise SystemExit(f'Could not update i18n for language {lang}')
    return text


def update_theme_pages() -> None:
    replacement = '<div class="theme-page-content">\n        <p data-i18n="pages.theme.unavailable">This theme page is not yet available.</p>\n    </div>'
    for html_file in (ROOT / 'html').glob('*.html'):
        text = html_file.read_text(encoding='utf-8')
        if 'theme-page-content' not in text:
            continue
        next_text, count = re.subn(
            r'<div class="theme-page-content">\s*.*?\s*</div>',
            replacement,
            text,
            count=1,
            flags=re.S,
        )
        if count != 1:
            raise SystemExit(f'Could not update theme content in {html_file.name}')
        html_file.write_text(next_text, encoding='utf-8')


if __name__ == '__main__':
    i18n_text = I18N_PATH.read_text(encoding='utf-8')
    I18N_PATH.write_text(update_i18n(i18n_text), encoding='utf-8')
    update_theme_pages()
    i18n_text = I18N_PATH.read_text(encoding='utf-8')
