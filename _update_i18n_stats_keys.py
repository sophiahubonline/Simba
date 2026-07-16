from pathlib import Path
import re

path = Path(r'c:\Users\olivi\Simba\js\i18n.js')
text = path.read_text(encoding='utf-8')

patterns = [
    (r"(overview:\s*'Overview',\s*)(threads:\s*'Threads',\s*unread:\s*'Unread',)", r"\1back: 'Back', conversationsLabel: 'Conversations', testsDone: 'Tests done', \2"),
    (r"(message:\s*'Message',\s*quickStats:\s*'Quick stats',\s*)(tests:\s*'Tests',)", r"\1threadCount: 'Topics', testsDone: 'Tests done', unreadMessages: 'Unread messages', \2"),
    (r"(overview:\s*'Übersicht',\s*)(threads:\s*'Chats',\s*unread:\s*'Ungelesen',)", r"\1back: 'Zurück', conversationsLabel: 'Unterhaltungen', testsDone: 'Tests durchgeführt', \2"),
    (r"(message:\s*'Nachricht',\s*quickStats:\s*'Schnellstatistiken',\s*)(tests:\s*'Tests',)", r"\1threadCount: 'Themen', testsDone: 'Tests abgeschlossen', unreadMessages: 'Ungelesene Nachrichten', \2"),
    (r"(overview:\s*'Aperçu',\s*)(threads:\s*'Conversations',\s*unread:\s*'Non lus',)", r"\1back: 'Retour', conversationsLabel: 'Conversations', testsDone: 'Tests effectués', \2"),
    (r"(message:\s*'Message',\s*quickStats:\s*'Statistiques rapides',\s*)(tests:\s*'Tests',)", r"\1threadCount: 'Sujets', testsDone: 'Tests effectués', unreadMessages: 'Messages non lus', \2"),
    (r"(overview:\s*'Resumen',\s*)(threads:\s*'Conversaciones',\s*unread:\s*'No leídos',)", r"\1back: 'Volver', conversationsLabel: 'Conversaciones', testsDone: 'Tests realizados', \2"),
    (r"(message:\s*'Mensaje',\s*quickStats:\s*'Estadísticas rápidas',\s*)(tests:\s*'Pruebas',)", r"\1threadCount: 'Temas', testsDone: 'Tests realizados', unreadMessages: 'Mensajes no leídos', \2"),
    (r"(overview:\s*'Panoramica',\s*)(threads:\s*'Conversazioni',\s*unread:\s*'Non letti',)", r"\1back: 'Indietro', conversationsLabel: 'Conversazioni', testsDone: 'Test effettuati', \2"),
    (r"(message:\s*'Messaggio',\s*quickStats:\s*'Statistiche rapide',\s*)(tests:\s*'Test',)", r"\1threadCount: 'Argomenti', testsDone: 'Test effettuati', unreadMessages: 'Messaggi non letti', \2"),
]

for pattern, replacement in patterns:
    text, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f'Could not update pattern: {pattern}')

path.write_text(text, encoding='utf-8')
