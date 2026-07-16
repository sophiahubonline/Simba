from pathlib import Path
import re

ROOT = Path(r'c:\Users\olivi\Simba')
I18N_PATH = ROOT / 'js' / 'i18n.js'

COMING_SOON_TEXT = {
    'en': 'Coming soon',
    'de': 'Demnächst',
    'fr': 'À venir',
    'es': 'Próximamente',
    'it': 'In arrivo',
}

COMING_SOON_BODY = {
    'en': 'This theme page is not yet available.',
    'de': 'Diese Themenseite ist noch nicht verfügbar.',
    'fr': 'Cette page thématique n’est pas encore disponible.',
    'es': 'Esta página temática aún no está disponible.',
    'it': 'Questa pagina tematica non è ancora disponibile.',
}


def update_i18n(text: str) -> str:
    for lang in ('en', 'de', 'fr', 'es', 'it'):
        pattern = rf'(\n        {lang}: \{{.*?)(\n            quiz:)'
        replacement = rf"\1\n            theme: {{ comingSoon: '{COMING_SOON_TEXT[lang]}' }},\2"
        text, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
        if count != 1:
            raise SystemExit(f'Could not update i18n for language {lang}')

    return text


def update_theme_pages() -> None:
    old_block = (
        '<div class="theme-page-content theme-page-content--coming-soon">\n'
        '        <div class="theme-coming-soon">\n'
        '            <span class="theme-coming-soon__badge" data-i18n="pages.theme.comingSoon">Coming soon</span>\n'
        '            <p class="theme-coming-soon__text" data-i18n="pages.theme.comingSoonBody">This theme page is not yet available.</p>\n'
        '            <span class="theme-coming-soon__hint">SIMBA PROJECT</span>\n'
        '        </div>\n'
        '    </div>'
    )
    new_block = (
        '<div class="theme-page-content theme-page-content--coming-soon">\n'
        '        <div class="theme-coming-soon">\n'
        '            <span class="theme-coming-soon__badge" data-i18n="pages.theme.comingSoon">Coming soon</span>\n'
        '        </div>\n'
        '    </div>'
    )

    for html_file in sorted((ROOT / 'html').glob('*.html')):
        text = html_file.read_text(encoding='utf-8')
        if 'theme-page-content' not in text:
            continue

        if html_file.name == 'attachment.html':
            text = re.sub(
                r'\n\s*<!-- ===== VIDEO SECTION ===== -->\s*<div class="video-section">.*?</div>\s*</div>\s*</div>\s*',
                '\n',
                text,
                flags=re.S,
            )
            text = re.sub(
                r'\n\s*<script>\s*// ===== VIDEO PLAY ===== .*?</script>\s*</body>',
                '\n</body>',
                text,
                flags=re.S,
            )

        if old_block not in text:
            raise SystemExit(f'Could not update theme content in {html_file.name}')
        next_text = text.replace(old_block, new_block, 1)

        html_file.write_text(next_text, encoding='utf-8')


if __name__ == '__main__':
    i18n_text = I18N_PATH.read_text(encoding='utf-8')
    I18N_PATH.write_text(update_i18n(i18n_text), encoding='utf-8')
    update_theme_pages()
