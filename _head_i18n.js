(function() {
    const languages = {
        en: 'English',
        de: 'Deutsch',
        fr: 'Français',
        es: 'Español',
        it: 'Italiano'
    };

    const locales = {
        en: 'en-US',
        de: 'de-DE',
        fr: 'fr-FR',
        es: 'es-ES',
        it: 'it-IT'
    };

    const translations = {
        en: {
            language: { label: 'Language', aria: 'Choose website language' },
            nav: { thematics: 'Thematics', test: 'Test', forum: 'Forum', contact: 'Contact Us', about: 'About Us' },
            auth: { signup: 'Sign Up', login: 'Login', signout: 'Sign out' },
            cookie: { text: 'We use cookies to improve this website. See our Privacy Policy.', accept: 'Accept all', reject: 'Reject', manage: 'Manage settings' },
            index: {
                hero: { subtitle: 'a new perspective on mental health', title: 'your struggle is a call to adventure' },
                intro: {
                    kicker: 'What is SIMBA?',
                    title: 'The site helps you explore mental health topics in a simple way.',
                    body1: 'SIMBA is built around short tests and clear pages for each notion. You can browse a theme, take a 10-question quiz, read your result, and save your scores in your profile if you log in.',
                    body2: 'The goal is to make each topic easy to understand and easy to revisit, so you can move from curiosity to self-observation without getting lost.'
                },
                categories: { relationships: 'Relationships', 'mental-health': 'Mental Health', 'personal-growth': 'Growth', neurodiversity: 'Neurodiversity', 'mind-body': 'Mind & Body' }
            },
            forum: {
                kicker: 'Forum',
                title: 'Ask, reply, and discuss the themes together.',
                lead: 'A short space for questions, support, and conversation. Post a message, answer others, and keep the discussion going.',
                stepsTitle: 'How it works',
                step1: 'Post a question or a thought.',
                step2: 'Reply with support or advice.',
                step3: 'Keep it respectful.',
                startTopic: 'Start a topic',
                postTitle: 'Post a question or start a discussion',
                publicBoard: 'Public board',
                postingAs: 'Posting as',
                topicType: 'Topic type',
                question: 'Question',
                discussion: 'Discussion',
                support: 'Support',
                feedback: 'Feedback',
                titleLabel: 'Title',
                titlePlaceholder: 'What do you want to ask?',
                messageLabel: 'Message',
                messagePlaceholder: 'Describe your question or share your point of view...',
                note: 'Keep it respectful and specific.',
                postMessage: 'Post message',
                posted: 'Your message has been posted.',
                communityThreads: 'Community threads',
                latestMessages: 'Latest messages',
                noPosts: 'No posts yet. Be the first one to start the conversation.',
                reply: 'Reply',
                replies: 'replies',
                noReplies: 'No replies yet. Start the conversation.',
                replyPlaceholder: 'Write a reply...',
                sendReply: 'Send reply',
                anonymousMessage: 'Anonymous message',
                anonymous: 'Anonymous'
            },
            profile: {
                notLoggedIn: 'Not logged in',
                loginPrompt: 'Please login to see your profile.',
                editProfile: 'Edit profile',
                message: 'Message',
                quickStats: 'Quick stats',
                tests: 'Tests',
                avgScore: 'Avg score',
                rank: 'Rank',
                about: 'About',
                aboutBody: 'This is your profile. You can update your display name, bio and avatar.',
                scoreHistory: 'Score history',
                noTestsYet: 'No tests yet',
                showingAll: 'Showing all {count} results',
                showingRecent: 'Showing your 5 most recent results',
                seeMore: 'See more',
                showLess: 'Show less',
                noScores: 'No scores yet',
                test: 'Test',
                result: 'Result',
                unknownDate: 'Unknown date',
                displayName: 'Display name',
                bio: 'Bio',
                profilePhoto: 'Profile photo',
                saveChanges: 'Save changes',
                cancel: 'Cancel'
            },
            modal: {
                loginTitle: 'Login',
                signupTitle: 'Sign Up',
                profileTitle: 'Your Profile',
                email: 'Email',
                password: 'Password',
                loginButton: 'Login',
                signupButton: 'Sign Up',
                logout: 'Log out',
                pleaseLogin: 'Please login first.',
                displayName: 'Display name',
                bio: 'Bio',
                uploadAvatar: 'Custom Avatar (upload)',
                saveProfile: 'Save profile',
                enterCredentials: 'Enter email and password',
                noSuchUser: 'No such user (local)',
                invalidCredentials: 'Invalid credentials',
                emailExists: 'Email already exists (local)',
                profileSaved: 'Profile saved',
                profileSavedLocal: 'Profile saved (local)',
                profileSavedServer: 'Profile saved (server)'
            },
            theme: { learnMore: 'Learn more about it' },
            dropdown: { allTests: 'All tests', relationships: 'Relationships', mentalHealth: 'Mental Health', personalGrowth: 'Personal Growth', neurodiversity: 'Neurodiversity', mindBody: 'Mind & Body' },
            quiz: { retake: 'Retake', backToTopics: 'Back to topics', goToTopicPage: 'Go to topic page' }
        },
        de: {
            language: { label: 'Sprache', aria: 'Website-Sprache wählen' },
            nav: { thematics: 'Themen', test: 'Test', forum: 'Forum', contact: 'Kontakt', about: 'Über uns' },
            auth: { signup: 'Registrieren', login: 'Anmelden', signout: 'Abmelden' },
            cookie: { text: 'Wir verwenden Cookies, um diese Website zu verbessern. Siehe unsere Datenschutzerklärung.', accept: 'Alle akzeptieren', reject: 'Ablehnen', manage: 'Einstellungen verwalten' },
            index: { hero: { subtitle: 'eine neue Perspektive auf mentale Gesundheit', title: 'dein Kampf ist ein Ruf zum Abenteuer' }, intro: { kicker: 'Was ist SIMBA?', title: 'Die Seite hilft dir, Themen der mentalen Gesundheit einfach zu entdecken.', body1: 'SIMBA basiert auf kurzen Tests und klaren Seiten für jedes Thema. Du kannst ein Thema ansehen, ein Quiz mit 10 Fragen machen, dein Ergebnis lesen und deine Punktzahl im Profil speichern, wenn du dich anmeldest.', body2: 'Das Ziel ist, jedes Thema leicht verständlich und später leicht wieder auffindbar zu machen, damit du von Neugier zu Selbstbeobachtung kommst, ohne den Überblick zu verlieren.' }, categories: { relationships: 'Beziehungen', 'mental-health': 'Psychische Gesundheit', 'personal-growth': 'Wachstum', neurodiversity: 'Neurodiversität', 'mind-body': 'Geist & Körper' } },
            forum: { kicker: 'Forum', title: 'Fragen stellen, antworten und die Themen gemeinsam besprechen.', lead: 'Ein kurzer Bereich für Fragen, Unterstützung und Gespräche. Veröffentliche eine Nachricht, antworte anderen und halte die Diskussion am Laufen.', stepsTitle: 'So funktioniert es', step1: 'Stelle eine Frage oder teile einen Gedanken.', step2: 'Antworte mit Unterstützung oder Rat.', step3: 'Bleib respektvoll.', startTopic: 'Thema starten', postTitle: 'Eine Frage stellen oder eine Diskussion beginnen', publicBoard: 'Öffentliches Board', topicType: 'Thema', question: 'Frage', discussion: 'Diskussion', support: 'Unterstützung', feedback: 'Feedback', titleLabel: 'Titel', titlePlaceholder: 'Was möchtest du fragen?', messageLabel: 'Nachricht', messagePlaceholder: 'Beschreibe deine Frage oder teile deine Meinung...', note: 'Bitte respektvoll und präzise bleiben.', postMessage: 'Nachricht posten', communityThreads: 'Community-Themen', latestMessages: 'Neueste Beiträge', noPosts: 'Noch keine Beiträge. Starte als Erste*r die Unterhaltung.', reply: 'Antworten', replies: 'Antworten', noReplies: 'Noch keine Antworten. Starte die Unterhaltung.', replyPlaceholder: 'Schreibe eine Antwort...', sendReply: 'Antwort senden', anonymousMessage: 'Anonyme Nachricht', anonymous: 'Anonym' },
            profile: { notLoggedIn: 'Nicht angemeldet', loginPrompt: 'Bitte melde dich an, um dein Profil zu sehen.', editProfile: 'Profil bearbeiten', message: 'Nachricht', quickStats: 'Schnellstatistiken', tests: 'Tests', avgScore: 'Durchschnitt', rank: 'Rang', about: 'Info', aboutBody: 'Das ist dein Profil. Du kannst Anzeigename, Bio und Avatar aktualisieren.', scoreHistory: 'Punktestand-Verlauf', noTestsYet: 'Noch keine Tests', showingAll: 'Alle {count} Ergebnisse werden angezeigt', showingRecent: 'Es werden deine 5 neuesten Ergebnisse angezeigt', seeMore: 'Mehr anzeigen', showLess: 'Weniger anzeigen', noScores: 'Noch keine Punkte', test: 'Test', result: 'Ergebnis', unknownDate: 'Unbekanntes Datum', displayName: 'Anzeigename', bio: 'Bio', profilePhoto: 'Profilfoto', saveChanges: 'Änderungen speichern', cancel: 'Abbrechen' },
            modal: { loginTitle: 'Anmelden', signupTitle: 'Registrieren', profileTitle: 'Dein Profil', email: 'E-Mail', password: 'Passwort', loginButton: 'Anmelden', signupButton: 'Registrieren', logout: 'Abmelden', pleaseLogin: 'Bitte zuerst anmelden.', displayName: 'Anzeigename', bio: 'Bio', uploadAvatar: 'Eigenes Avatar-Bild hochladen', saveProfile: 'Profil speichern', enterCredentials: 'E-Mail und Passwort eingeben', noSuchUser: 'Kein solcher Nutzer (lokal)', invalidCredentials: 'Ungültige Zugangsdaten', emailExists: 'E-Mail existiert bereits (lokal)', profileSaved: 'Profil gespeichert', profileSavedLocal: 'Profil gespeichert (lokal)', profileSavedServer: 'Profil gespeichert (Server)' },
            theme: { learnMore: 'Mehr dazu' },
            dropdown: { allTests: 'Alle Tests', relationships: 'Beziehungen', mentalHealth: 'Psychische Gesundheit', personalGrowth: 'Persönliches Wachstum', neurodiversity: 'Neurodiversität', mindBody: 'Geist & Körper' },
            quiz: { retake: 'Erneut versuchen', backToTopics: 'Zurück zu den Themen', goToTopicPage: 'Zur Themenseite' }
        },
        fr: {
            language: { label: 'Langue', aria: 'Choisir la langue du site' },
            nav: { thematics: 'Thématiques', test: 'Test', forum: 'Forum', contact: 'Contact', about: 'À propos' },
            auth: { signup: 'S’inscrire', login: 'Connexion', signout: 'Se déconnecter' },
            cookie: { text: 'Nous utilisons des cookies pour améliorer ce site. Voir notre politique de confidentialité.', accept: 'Tout accepter', reject: 'Refuser', manage: 'Gérer les paramètres' },
            index: { hero: { subtitle: 'une nouvelle perspective sur la santé mentale', title: 'ton combat est un appel à l’aventure' }, intro: { kicker: 'Qu’est-ce que SIMBA ?', title: 'Le site t’aide à explorer les thèmes de santé mentale de façon simple.', body1: 'SIMBA repose sur des tests courts et des pages claires pour chaque notion. Tu peux parcourir un thème, faire un quiz de 10 questions, lire ton résultat et enregistrer tes scores dans ton profil si tu te connectes.', body2: 'Le but est de rendre chaque thème facile à comprendre et facile à retrouver, pour passer de la curiosité à l’auto-observation sans te perdre.' }, categories: { relationships: 'Relations', 'mental-health': 'Santé mentale', 'personal-growth': 'Développement', neurodiversity: 'Neurodiversité', 'mind-body': 'Corps & esprit' } },
            forum: { kicker: 'Forum', title: 'Posez des questions, répondez et discutez des thèmes ensemble.', lead: 'Un espace court pour les questions, le soutien et les échanges. Publie un message, réponds aux autres et fais vivre la discussion.', stepsTitle: 'Comment ça marche', step1: 'Publie une question ou une idée.', step2: 'Réponds avec du soutien ou un conseil.', step3: 'Reste respectueux.', startTopic: 'Commencer un sujet', postTitle: 'Poser une question ou lancer une discussion', publicBoard: 'Tableau public', topicType: 'Type de sujet', question: 'Question', discussion: 'Discussion', support: 'Soutien', feedback: 'Retour', titleLabel: 'Titre', titlePlaceholder: 'Que veux-tu demander ?', messageLabel: 'Message', messagePlaceholder: 'Décris ta question ou partage ton point de vue...', note: 'Reste respectueux et précis.', postMessage: 'Publier le message', communityThreads: 'Sujets de la communauté', latestMessages: 'Derniers messages', noPosts: 'Aucun message pour le moment. Sois la première personne à lancer la conversation.', reply: 'Répondre', replies: 'réponses', noReplies: 'Pas encore de réponses. Lance la conversation.', replyPlaceholder: 'Écris une réponse...', sendReply: 'Envoyer la réponse', anonymousMessage: 'Message anonyme', anonymous: 'Anonyme' },
            profile: { notLoggedIn: 'Non connecté', loginPrompt: 'Connecte-toi pour voir ton profil.', editProfile: 'Modifier le profil', message: 'Message', quickStats: 'Statistiques rapides', tests: 'Tests', avgScore: 'Moyenne', rank: 'Classement', about: 'À propos', aboutBody: 'Voici ton profil. Tu peux mettre à jour ton nom affiché, ta bio et ton avatar.', scoreHistory: 'Historique des scores', noTestsYet: 'Pas encore de test', showingAll: 'Affichage de tous les résultats ({count})', showingRecent: 'Affichage de tes 5 résultats les plus récents', seeMore: 'Voir plus', showLess: 'Voir moins', noScores: 'Aucun score pour le moment', test: 'Test', result: 'Résultat', unknownDate: 'Date inconnue', displayName: 'Nom affiché', bio: 'Bio', profilePhoto: 'Photo de profil', saveChanges: 'Enregistrer les modifications', cancel: 'Annuler' },
            modal: { loginTitle: 'Connexion', signupTitle: 'Inscription', profileTitle: 'Ton profil', email: 'E-mail', password: 'Mot de passe', loginButton: 'Connexion', signupButton: 'S’inscrire', logout: 'Se déconnecter', pleaseLogin: 'Connecte-toi d’abord.', displayName: 'Nom affiché', bio: 'Bio', uploadAvatar: 'Avatar personnalisé (téléversement)', saveProfile: 'Enregistrer le profil', enterCredentials: 'Saisis l’e-mail et le mot de passe', noSuchUser: 'Aucun utilisateur (local)', invalidCredentials: 'Identifiants invalides', emailExists: 'Cet e-mail existe déjà (local)', profileSaved: 'Profil enregistré', profileSavedLocal: 'Profil enregistré (local)', profileSavedServer: 'Profil enregistré (serveur)' },
            theme: { learnMore: 'En savoir plus' },
            dropdown: { allTests: 'Tous les tests', relationships: 'Relations', mentalHealth: 'Santé mentale', personalGrowth: 'Développement personnel', neurodiversity: 'Neurodiversité', mindBody: 'Corps & esprit' },
            quiz: { retake: 'Recommencer', backToTopics: 'Retour aux thèmes', goToTopicPage: 'Aller à la page du thème' }
        },
        es: {
            language: { label: 'Idioma', aria: 'Elegir el idioma del sitio' },
            nav: { thematics: 'Temáticas', test: 'Test', forum: 'Foro', contact: 'Contacto', about: 'Sobre nosotros' },
            auth: { signup: 'Registrarse', login: 'Iniciar sesión', signout: 'Cerrar sesión' },
            cookie: { text: 'Usamos cookies para mejorar este sitio. Consulta nuestra política de privacidad.', accept: 'Aceptar todo', reject: 'Rechazar', manage: 'Gestionar ajustes' },
            index: { hero: { subtitle: 'una nueva perspectiva sobre la salud mental', title: 'tu lucha es una llamada a la aventura' }, intro: { kicker: '¿Qué es SIMBA?', title: 'El sitio te ayuda a explorar temas de salud mental de forma sencilla.', body1: 'SIMBA se basa en pruebas cortas y páginas claras para cada noción. Puedes explorar un tema, hacer un cuestionario de 10 preguntas, leer tu resultado y guardar tus puntuaciones en tu perfil si inicias sesión.', body2: 'El objetivo es hacer que cada tema sea fácil de entender y fácil de volver a visitar, para pasar de la curiosidad a la autoobservación sin perderte.' }, categories: { relationships: 'Relaciones', 'mental-health': 'Salud mental', 'personal-growth': 'Crecimiento', neurodiversity: 'Neurodiversidad', 'mind-body': 'Mente y cuerpo' } },
            forum: { kicker: 'Foro', title: 'Haz preguntas, responde y habla de los temas juntos.', lead: 'Un espacio breve para preguntas, apoyo y conversación. Publica un mensaje, responde a otros y mantén la discusión en marcha.', stepsTitle: 'Cómo funciona', step1: 'Publica una pregunta o una idea.', step2: 'Responde con apoyo o consejo.', step3: 'Mantén el respeto.', startTopic: 'Crear un tema', postTitle: 'Haz una pregunta o empieza una discusión', publicBoard: 'Panel público', topicType: 'Tipo de tema', question: 'Pregunta', discussion: 'Discusión', support: 'Apoyo', feedback: 'Opinión', titleLabel: 'Título', titlePlaceholder: '¿Qué quieres preguntar?', messageLabel: 'Mensaje', messagePlaceholder: 'Describe tu pregunta o comparte tu punto de vista...', note: 'Sé respetuoso y concreto.', postMessage: 'Publicar mensaje', communityThreads: 'Temas de la comunidad', latestMessages: 'Últimos mensajes', noPosts: 'Aún no hay mensajes. Sé la primera persona en iniciar la conversación.', reply: 'Responder', replies: 'respuestas', noReplies: 'Aún no hay respuestas. Inicia la conversación.', replyPlaceholder: 'Escribe una respuesta...', sendReply: 'Enviar respuesta', anonymousMessage: 'Mensaje anónimo', anonymous: 'Anónimo' },
            profile: { notLoggedIn: 'No has iniciado sesión', loginPrompt: 'Inicia sesión para ver tu perfil.', editProfile: 'Editar perfil', message: 'Mensaje', quickStats: 'Estadísticas rápidas', tests: 'Pruebas', avgScore: 'Promedio', rank: 'Rango', about: 'Acerca de', aboutBody: 'Este es tu perfil. Puedes actualizar tu nombre visible, biografía y avatar.', scoreHistory: 'Historial de puntuaciones', noTestsYet: 'Todavía no hay pruebas', showingAll: 'Mostrando todos los resultados ({count})', showingRecent: 'Mostrando tus 5 resultados más recientes', seeMore: 'Ver más', showLess: 'Ver menos', noScores: 'Todavía no hay puntuaciones', test: 'Prueba', result: 'Resultado', unknownDate: 'Fecha desconocida', displayName: 'Nombre visible', bio: 'Biografía', profilePhoto: 'Foto de perfil', saveChanges: 'Guardar cambios', cancel: 'Cancelar' },
            modal: { loginTitle: 'Iniciar sesión', signupTitle: 'Registrarse', profileTitle: 'Tu perfil', email: 'Correo', password: 'Contraseña', loginButton: 'Iniciar sesión', signupButton: 'Registrarse', logout: 'Cerrar sesión', pleaseLogin: 'Primero inicia sesión.', displayName: 'Nombre visible', bio: 'Biografía', uploadAvatar: 'Avatar personalizado (subir)', saveProfile: 'Guardar perfil', enterCredentials: 'Introduce correo y contraseña', noSuchUser: 'No existe ese usuario (local)', invalidCredentials: 'Credenciales no válidas', emailExists: 'Ese correo ya existe (local)', profileSaved: 'Perfil guardado', profileSavedLocal: 'Perfil guardado (local)', profileSavedServer: 'Perfil guardado (servidor)' },
            theme: { learnMore: 'Saber más' },
            dropdown: { allTests: 'Todas las pruebas', relationships: 'Relaciones', mentalHealth: 'Salud mental', personalGrowth: 'Crecimiento personal', neurodiversity: 'Neurodiversidad', mindBody: 'Mente y cuerpo' },
            quiz: { retake: 'Repetir', backToTopics: 'Volver a los temas', goToTopicPage: 'Ir a la página del tema' }
        },
        it: {
            language: { label: 'Lingua', aria: 'Scegli la lingua del sito' },
            nav: { thematics: 'Argomenti', test: 'Test', forum: 'Forum', contact: 'Contatti', about: 'Chi siamo' },
            auth: { signup: 'Registrati', login: 'Accedi', signout: 'Esci' },
            cookie: { text: 'Usiamo i cookie per migliorare questo sito. Vedi la nostra informativa sulla privacy.', accept: 'Accetta tutto', reject: 'Rifiuta', manage: 'Gestisci impostazioni' },
            index: { hero: { subtitle: 'una nuova prospettiva sulla salute mentale', title: 'la tua lotta è una chiamata all’avventura' }, intro: { kicker: 'Che cos’è SIMBA?', title: 'Il sito ti aiuta a esplorare i temi della salute mentale in modo semplice.', body1: 'SIMBA si basa su test brevi e pagine chiare per ogni concetto. Puoi esplorare un tema, fare un quiz di 10 domande, leggere il risultato e salvare i tuoi punteggi nel profilo se accedi.', body2: 'L’obiettivo è rendere ogni tema facile da capire e facile da ritrovare, così puoi passare dalla curiosità all’auto-osservazione senza perderti.' }, categories: { relationships: 'Relazioni', 'mental-health': 'Salute mentale', 'personal-growth': 'Crescita', neurodiversity: 'Neurodiversità', 'mind-body': 'Mente e corpo' } },
            forum: { kicker: 'Forum', title: 'Fai domande, rispondi e parla dei temi insieme.', lead: 'Uno spazio breve per domande, supporto e conversazione. Pubblica un messaggio, rispondi agli altri e tieni viva la discussione.', stepsTitle: 'Come funziona', step1: 'Pubblica una domanda o un’idea.', step2: 'Rispondi con supporto o consiglio.', step3: 'Rimani rispettoso.', startTopic: 'Crea un argomento', postTitle: 'Fai una domanda o avvia una discussione', publicBoard: 'Bacheca pubblica', topicType: 'Tipo di argomento', question: 'Domanda', discussion: 'Discussione', support: 'Supporto', feedback: 'Feedback', titleLabel: 'Titolo', titlePlaceholder: 'Cosa vuoi chiedere?', messageLabel: 'Messaggio', messagePlaceholder: 'Descrivi la tua domanda o condividi il tuo punto di vista...', note: 'Sii rispettoso e preciso.', postMessage: 'Pubblica messaggio', communityThreads: 'Argomenti della community', latestMessages: 'Ultimi messaggi', noPosts: 'Nessun messaggio ancora. Sii la prima persona ad avviare la conversazione.', reply: 'Rispondi', replies: 'risposte', noReplies: 'Nessuna risposta ancora. Avvia la conversazione.', replyPlaceholder: 'Scrivi una risposta...', sendReply: 'Invia risposta', anonymousMessage: 'Messaggio anonimo', anonymous: 'Anonimo' },
            profile: { notLoggedIn: 'Non hai effettuato l’accesso', loginPrompt: 'Accedi per vedere il tuo profilo.', editProfile: 'Modifica profilo', message: 'Messaggio', quickStats: 'Statistiche rapide', tests: 'Test', avgScore: 'Media', rank: 'Posizione', about: 'Informazioni', aboutBody: 'Questo è il tuo profilo. Puoi aggiornare il nome visualizzato, la biografia e l’avatar.', scoreHistory: 'Cronologia punteggi', noTestsYet: 'Nessun test ancora', showingAll: 'Mostrando tutti i risultati ({count})', showingRecent: 'Mostrando i tuoi 5 risultati più recenti', seeMore: 'Mostra di più', showLess: 'Mostra meno', noScores: 'Nessun punteggio ancora', test: 'Test', result: 'Risultato', unknownDate: 'Data sconosciuta', displayName: 'Nome visualizzato', bio: 'Biografia', profilePhoto: 'Foto profilo', saveChanges: 'Salva modifiche', cancel: 'Annulla' },
            modal: { loginTitle: 'Accedi', signupTitle: 'Registrati', profileTitle: 'Il tuo profilo', email: 'Email', password: 'Password', loginButton: 'Accedi', signupButton: 'Registrati', logout: 'Esci', pleaseLogin: 'Prima accedi.', displayName: 'Nome visualizzato', bio: 'Biografia', uploadAvatar: 'Avatar personalizzato (carica)', saveProfile: 'Salva profilo', enterCredentials: 'Inserisci email e password', noSuchUser: 'Nessun utente trovato (locale)', invalidCredentials: 'Credenziali non valide', emailExists: 'Email già esistente (locale)', profileSaved: 'Profilo salvato', profileSavedLocal: 'Profilo salvato (locale)', profileSavedServer: 'Profilo salvato (server)' },
            theme: { learnMore: 'Scopri di più' },
            dropdown: { allTests: 'Tutti i test', relationships: 'Relazioni', mentalHealth: 'Salute mentale', personalGrowth: 'Crescita personale', neurodiversity: 'Neurodiversità', mindBody: 'Mente e corpo' },
            quiz: { retake: 'Rifai', backToTopics: 'Torna agli argomenti', goToTopicPage: 'Vai alla pagina dell’argomento' }
        }
    };

    const themeCopies = {
        en: {
            attachment: { name: 'Attachment', description: 'Understanding the bonds we form and how they shape our emotional well-being.' },
            'family-conflict': { name: 'Family Conflict', description: 'Navigate complex family dynamics and improve communication with loved ones.' },
            'unfairness-relationships': { name: 'Unfairness in Relationships', description: 'Recognizing and addressing imbalances in your relationships.' },
            'social-anxiety': { name: 'Social Anxiety', description: 'Overcome the fear and worry that comes with social interactions.' },
            fomo: { name: 'FOMO', description: 'Break free from the fear of missing out and find contentment in the present.' },
            ocd: { name: 'OCD', description: 'Understanding obsessive-compulsive disorder and breaking the cycle of anxiety.' },
            ptsd: { name: 'PTSD', description: 'Healing from trauma and reclaiming your sense of safety.' },
            burnout: { name: 'Burnout', description: 'Recognize exhaustion and restore balance to your life.' },
            dissociation: { name: 'Dissociation', description: 'Understanding detachment from reality and grounding techniques.' },
            'binge-eating-disorder': { name: 'Binge Eating Disorder', description: 'Address unhealthy eating patterns and develop a healthier relationship with food.' },
            insomnia: { name: 'Insomnia', description: 'Improve your sleep quality and establish better sleep habits.' },
            resilience: { name: 'Resilience', description: 'Build inner strength and bounce back from life’s challenges.' },
            'imposter-syndrome': { name: 'Imposter Syndrome', description: 'Overcome self-doubt and recognize your true worth and achievements.' },
            procrastination: { name: 'Procrastination', description: 'Understand why you delay and develop productive habits.' },
            helplessness: { name: 'Helplessness', description: 'Regain agency and control over your life circumstances.' },
            'feedback-circuit': { name: 'The Feedback Circuit', description: 'Learn to give and receive feedback for continuous personal growth.' },
            adhd: { name: 'ADHD', description: 'Understand attention and executive function challenges and find strategies that work for you.' },
            dreams: { name: 'Dreams', description: 'Explore the meaning and significance of your dreams.' },
            pms: { name: 'PMS', description: 'Manage premenstrual symptoms and understand hormonal changes.' },
            'mental-load': { name: 'Mental Load', description: 'Reduce cognitive overwhelm and manage your mental energy effectively.' }
        },
        de: {
            attachment: { name: 'Bindung', description: 'Verstehe die Bindungen, die wir aufbauen, und wie sie unser emotionales Wohlbefinden prägen.' },
            'family-conflict': { name: 'Familienkonflikt', description: 'Gehe mit komplexen Familiendynamiken um und verbessere die Kommunikation mit deinen Liebsten.' },
            'unfairness-relationships': { name: 'Ungerechtigkeit in Beziehungen', description: 'Ungleichgewichte in deinen Beziehungen erkennen und ansprechen.' },
            'social-anxiety': { name: 'Soziale Angst', description: 'Überwinde die Angst und Sorge, die mit sozialen Situationen einhergeht.' },
            fomo: { name: 'FOMO', description: 'Befreie dich von der Angst, etwas zu verpassen, und finde Ruhe im Hier und Jetzt.' },
            ocd: { name: 'OCD', description: 'Zwangsstörungen verstehen und den Kreislauf der Angst durchbrechen.' },
            ptsd: { name: 'PTBS', description: 'Von Trauma heilen und ein Gefühl von Sicherheit zurückgewinnen.' },
            burnout: { name: 'Burnout', description: 'Erschöpfung erkennen und dein Gleichgewicht wiederfinden.' },
            dissociation: { name: 'Dissoziation', description: 'Entfremdung von der Realität verstehen und dich wieder erden.' },
            'binge-eating-disorder': { name: 'Binge-Eating-Störung', description: 'Ungesunde Essmuster angehen und eine gesündere Beziehung zum Essen entwickeln.' },
            insomnia: { name: 'Schlaflosigkeit', description: 'Deine Schlafqualität verbessern und bessere Schlafgewohnheiten aufbauen.' },
            resilience: { name: 'Resilienz', description: 'Innere Stärke aufbauen und nach Herausforderungen wieder aufstehen.' },
            'imposter-syndrome': { name: 'Impostor-Syndrom', description: 'Selbstzweifel überwinden und deinen Wert sowie deine Erfolge erkennen.' },
            procrastination: { name: 'Prokrastination', description: 'Verstehen, warum du aufschiebst, und produktive Gewohnheiten entwickeln.' },
            helplessness: { name: 'Hilflosigkeit', description: 'Handlungsfähigkeit und Kontrolle über dein Leben zurückgewinnen.' },
            'feedback-circuit': { name: 'Der Feedback-Kreislauf', description: 'Lerne, Feedback zu geben und anzunehmen, um dich weiterzuentwickeln.' },
            adhd: { name: 'ADHS', description: 'Aufmerksamkeit und Exekutivfunktionen verstehen und passende Strategien finden.' },
            dreams: { name: 'Träume', description: 'Die Bedeutung und Wichtigkeit deiner Träume erkunden.' },
            pms: { name: 'PMS', description: 'Beschwerden vor der Periode besser managen und hormonelle Veränderungen verstehen.' },
            'mental-load': { name: 'Mentale Last', description: 'Mentale Überlastung reduzieren und deine Energie besser steuern.' }
        },
        fr: {
            attachment: { name: 'Attachement', description: 'Comprendre les liens que nous formons et leur impact sur notre bien-être émotionnel.' },
            'family-conflict': { name: 'Conflit familial', description: 'Gérer des dynamiques familiales complexes et améliorer la communication avec ses proches.' },
            'unfairness-relationships': { name: 'Injustice dans les relations', description: 'Reconnaître et traiter les déséquilibres dans tes relations.' },
            'social-anxiety': { name: 'Anxiété sociale', description: 'Surmonter la peur et l’inquiétude liées aux interactions sociales.' },
            fomo: { name: 'FOMO', description: 'Te libérer de la peur de manquer quelque chose et trouver plus de sérénité dans le présent.' },
            ocd: { name: 'TOC', description: 'Comprendre le trouble obsessionnel-compulsif et casser le cycle de l’anxiété.' },
            ptsd: { name: 'TSPT', description: 'Guérir d’un trauma et retrouver un sentiment de sécurité.' },
            burnout: { name: 'Burn-out', description: 'Reconnaître l’épuisement et retrouver l’équilibre.' },
            dissociation: { name: 'Dissociation', description: 'Comprendre le détachement de la réalité et les techniques d’ancrage.' },
            'binge-eating-disorder': { name: 'Hyperphagie boulimique', description: 'Traiter les comportements alimentaires problématiques et développer une relation plus saine à la nourriture.' },
            insomnia: { name: 'Insomnie', description: 'Améliorer la qualité du sommeil et construire de meilleures habitudes.' },
            resilience: { name: 'Résilience', description: 'Développer une force intérieure et rebondir face aux difficultés.' },
            'imposter-syndrome': { name: 'Syndrome de l’imposteur', description: 'Dépasser le doute de soi et reconnaître sa vraie valeur.' },
            procrastination: { name: 'Procrastination', description: 'Comprendre pourquoi tu repousses et développer des habitudes plus productives.' },
            helplessness: { name: 'Impuissance', description: 'Retrouver de l’initiative et du contrôle sur ta vie.' },
            'feedback-circuit': { name: 'Le circuit du feedback', description: 'Apprendre à donner et recevoir des retours pour progresser.' },
            adhd: { name: 'TDAH', description: 'Comprendre l’attention et les fonctions exécutives, puis trouver des stratégies qui fonctionnent pour toi.' },
            dreams: { name: 'Rêves', description: 'Explorer le sens et l’importance de tes rêves.' },
            pms: { name: 'SPM', description: 'Mieux gérer les symptômes prémenstruels et comprendre les changements hormonaux.' },
            'mental-load': { name: 'Charge mentale', description: 'Réduire la surcharge cognitive et mieux gérer ton énergie mentale.' }
        },
        es: {
            attachment: { name: 'Apego', description: 'Entender los vínculos que formamos y cómo influyen en nuestro bienestar emocional.' },
            'family-conflict': { name: 'Conflicto familiar', description: 'Navegar dinámicas familiares complejas y mejorar la comunicación con los seres queridos.' },
            'unfairness-relationships': { name: 'Injusticia en las relaciones', description: 'Reconocer y abordar los desequilibrios en tus relaciones.' },
            'social-anxiety': { name: 'Ansiedad social', description: 'Superar el miedo y la preocupación que acompañan a las interacciones sociales.' },
            fomo: { name: 'FOMO', description: 'Liberarte del miedo a perderte algo y encontrar calma en el presente.' },
            ocd: { name: 'TOC', description: 'Entender el trastorno obsesivo-compulsivo y romper el ciclo de la ansiedad.' },
            ptsd: { name: 'TEPT', description: 'Sanar del trauma y recuperar la sensación de seguridad.' },
            burnout: { name: 'Burnout', description: 'Reconocer el agotamiento y recuperar el equilibrio.' },
            dissociation: { name: 'Disociación', description: 'Entender el distanciamiento de la realidad y las técnicas de anclaje.' },
            'binge-eating-disorder': { name: 'Trastorno por atracón', description: 'Abordar patrones de alimentación poco saludables y construir una relación más sana con la comida.' },
            insomnia: { name: 'Insomnio', description: 'Mejorar tu calidad de sueño y crear mejores hábitos de descanso.' },
            resilience: { name: 'Resiliencia', description: 'Construir fuerza interior y recuperarte de los desafíos.' },
            'imposter-syndrome': { name: 'Síndrome del impostor', description: 'Superar la autodeuda y reconocer tu verdadero valor y logros.' },
            procrastination: { name: 'Procrastinación', description: 'Entender por qué retrasas las cosas y desarrollar hábitos productivos.' },
            helplessness: { name: 'Indefensión', description: 'Recuperar capacidad de acción y control sobre tu vida.' },
            'feedback-circuit': { name: 'El circuito de feedback', description: 'Aprender a dar y recibir retroalimentación para crecer de forma continua.' },
            adhd: { name: 'TDAH', description: 'Entender la atención y las funciones ejecutivas, y encontrar estrategias que funcionen para ti.' },
            dreams: { name: 'Sueños', description: 'Explorar el significado y la importancia de tus sueños.' },
            pms: { name: 'SPM', description: 'Gestionar mejor los síntomas premenstruales y entender los cambios hormonales.' },
            'mental-load': { name: 'Carga mental', description: 'Reducir la sobrecarga cognitiva y gestionar mejor tu energía mental.' }
        },
        it: {
            attachment: { name: 'Attaccamento', description: 'Capire i legami che creiamo e come influenzano il nostro benessere emotivo.' },
            'family-conflict': { name: 'Conflitto familiare', description: 'Gestire dinamiche familiari complesse e migliorare la comunicazione con le persone care.' },
            'unfairness-relationships': { name: 'Ingiustizia nelle relazioni', description: 'Riconoscere e affrontare gli squilibri nelle tue relazioni.' },
            'social-anxiety': { name: 'Ansia sociale', description: 'Superare la paura e la preoccupazione legate alle interazioni sociali.' },
            fomo: { name: 'FOMO', description: 'Liberarti dalla paura di perderti qualcosa e trovare più serenità nel presente.' },
            ocd: { name: 'DOC', description: 'Capire il disturbo ossessivo-compulsivo e interrompere il ciclo dell’ansia.' },
            ptsd: { name: 'PTSD', description: 'Guarire dal trauma e ritrovare un senso di sicurezza.' },
            burnout: { name: 'Burnout', description: 'Riconoscere l’esaurimento e ritrovare equilibrio.' },
            dissociation: { name: 'Dissociazione', description: 'Capire il distacco dalla realtà e le tecniche di grounding.' },
            'binge-eating-disorder': { name: 'Disturbo da alimentazione incontrollata', description: 'Affrontare abitudini alimentari non sane e costruire un rapporto più sano con il cibo.' },
            insomnia: { name: 'Insonnia', description: 'Migliorare la qualità del sonno e creare abitudini migliori.' },
            resilience: { name: 'Resilienza', description: 'Costruire forza interiore e riprendersi dalle difficoltà.' },
            'imposter-syndrome': { name: 'Sindrome dell’impostore', description: 'Superare il dubbio su di sé e riconoscere il tuo vero valore.' },
            procrastination: { name: 'Procrastinazione', description: 'Capire perché rimandi e sviluppare abitudini più produttive.' },
            helplessness: { name: 'Senso di impotenza', description: 'Recuperare iniziativa e controllo sulla tua vita.' },
            'feedback-circuit': { name: 'Il circuito del feedback', description: 'Imparare a dare e ricevere feedback per crescere nel tempo.' },
            adhd: { name: 'ADHD', description: 'Capire attenzione e funzioni esecutive e trovare strategie adatte a te.' },
            dreams: { name: 'Sogni', description: 'Esplorare il significato e l’importanza dei tuoi sogni.' },
            pms: { name: 'PMS', description: 'Gestire meglio i sintomi premestruali e comprendere i cambiamenti ormonali.' },
            'mental-load': { name: 'Carico mentale', description: 'Ridurre il sovraccarico cognitivo e gestire meglio la tua energia mentale.' }
        }
    };

    function getThemeCard(theme) {
        const key = String((theme && theme.link) || '').replace(/\.html$/i, '');
        const language = getCurrentLanguage();
        const copy = (themeCopies[language] && themeCopies[language][key]) || (themeCopies.en && themeCopies.en[key]);
        return copy || { name: theme?.name || '', description: theme?.description || '' };
    }

    function getThemePageKey() {
        const path = String(window.location.pathname || '');
        const file = path.split('/').pop() || '';
        return file.replace(/\.html$/i, '');
    }

    function translateThemePage() {
        const content = document.querySelector('.theme-page-content');
        const header = document.querySelector('.theme-page-header h1');
        const themeKey = getThemePageKey();
        if (!content || !header || !themeKey) return;

        const themeCopy = getThemeCard({ link: `${themeKey}.html` });
        const language = getCurrentLanguage();
        const headingTemplates = {
            en: 'Understanding {name}',
            de: '{name} verstehen',
            fr: 'Comprendre {name}',
            es: 'Entender {name}',
            it: 'Capire {name}'
        };
        const bridgeParagraphs = {
            en: [
                'Learning more about it can help you notice patterns, understand triggers, and choose strategies that fit you.',
                'The goal is not to label yourself, but to build awareness and support better decisions over time.'
            ],
            de: [
                'Mehr darüber zu lernen kann dir helfen, Muster zu erkennen, Auslöser zu verstehen und passende Strategien zu wählen.',
                'Das Ziel ist nicht, dich zu labeln, sondern Bewusstsein aufzubauen und langfristig bessere Entscheidungen zu treffen.'
            ],
            fr: [
                'Mieux comprendre ce thème peut t’aider à repérer des schémas, identifier des déclencheurs et choisir des stratégies adaptées.',
                'Le but n’est pas de te coller une étiquette, mais de gagner en clarté et de faire des choix plus utiles dans le temps.'
            ],
            es: [
                'Aprender más sobre este tema puede ayudarte a reconocer patrones, entender desencadenantes y elegir estrategias que te convengan.',
                'El objetivo no es etiquetarte, sino ganar conciencia y tomar mejores decisiones con el tiempo.'
            ],
            it: [
                'Conoscerlo meglio può aiutarti a notare schemi, capire i trigger e scegliere strategie adatte a te.',
                'L’obiettivo non è etichettarti, ma costruire consapevolezza e prendere decisioni migliori nel tempo.'
            ]
        };

        header.textContent = themeCopy.name;
        document.title = `${themeCopy.name} - SIMBA PROJECT`;
        content.innerHTML = `
            <h2>${formatTemplate(headingTemplates[language] || headingTemplates.en, { name: themeCopy.name })}</h2>
            <p>${themeCopy.description}</p>
            <p>${(bridgeParagraphs[language] || bridgeParagraphs.en)[0]}</p>
            <p>${(bridgeParagraphs[language] || bridgeParagraphs.en)[1]}</p>
        `;
    }

    function normalizeLanguage(languageCode) {
        const candidate = String(languageCode || '').toLowerCase().slice(0, 2);
        return Object.prototype.hasOwnProperty.call(translations, candidate) ? candidate : 'en';
    }

    function getBrowserLanguage() {
        try {
            return normalizeLanguage((navigator.language || navigator.userLanguage || 'en').slice(0, 2));
        } catch (error) {
            return 'en';
        }
    }

    function getCurrentLanguage() {
        try {
            return normalizeLanguage(localStorage.getItem('simba_language') || getBrowserLanguage());
        } catch (error) {
            return 'en';
        }
    }

    function getLocale(languageCode) {
        return locales[normalizeLanguage(languageCode)] || 'en-US';
    }

    function getTranslation(path, fallback = '') {
        const language = getCurrentLanguage();
        const segments = String(path || '').split('.');
        const lookup = (dictionary) => segments.reduce((value, segment) => (value && Object.prototype.hasOwnProperty.call(value, segment) ? value[segment] : undefined), dictionary);
        return lookup(translations[language]) ?? lookup(translations.en) ?? fallback;
    }

    function formatTemplate(template, values) {
        return String(template || '').replace(/\{(\w+)\}/g, (_, token) => {
            if (values && Object.prototype.hasOwnProperty.call(values, token)) {
                return values[token];
            }
            return '';
        });
    }

    function translateRoot(root) {
        const scope = root && typeof root.querySelectorAll === 'function' ? root : document;
        scope.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            const rawValue = getTranslation(key, element.textContent || '');
            const value = element.dataset.i18nCount ? formatTemplate(rawValue, { count: element.dataset.i18nCount }) : rawValue;
            if (element.dataset.i18nHtml === 'true') {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
        });

        scope.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.setAttribute('placeholder', getTranslation(key, element.getAttribute('placeholder') || ''));
        });

        scope.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
            const key = element.getAttribute('data-i18n-aria-label');
            element.setAttribute('aria-label', getTranslation(key, element.getAttribute('aria-label') || ''));
        });
    }

    function updateNavigation() {
        const navMap = {
            'index.html': 'nav.thematics',
            'test.html': 'nav.test',
            'forum.html': 'nav.forum',
            'contact.html': 'nav.contact',
            'about-us.html': 'nav.about'
        };

        Object.entries(navMap).forEach(([href, key]) => {
            document.querySelectorAll(`.nav-list a[href="${href}"]`).forEach((link) => {
                link.textContent = getTranslation(key, link.textContent || '');
            });
        });
    }

    function updateCookieBanner() {
        const banner = document.getElementById('cookieBanner');
        if (!banner) return;

        const text = banner.querySelector('.cookie-inner p');
        if (text) text.innerHTML = getTranslation('cookie.text', text.textContent || '').replace('Privacy Policy', '<a href="datenschutz.html">Privacy Policy</a>');

        const accept = document.getElementById('acceptCookies');
        const reject = document.getElementById('rejectCookies');
        const manage = document.getElementById('manageCookies');

        if (accept) accept.textContent = getTranslation('cookie.accept', accept.textContent || '');
        if (reject) reject.textContent = getTranslation('cookie.reject', reject.textContent || '');
        if (manage) manage.textContent = getTranslation('cookie.manage', manage.textContent || '');
    }

    function ensureLanguageSwitcher(authSection) {
        const section = authSection || document.querySelector('.auth-section');
        if (!section) return;

        let switcher = section.querySelector('.language-switcher');
        if (!switcher) {
            switcher = document.createElement('label');
            switcher.className = 'language-switcher';
            switcher.innerHTML = '<span class="language-switcher__label"></span><select id="simba-language-select"></select>';
            section.appendChild(switcher);
        }

        const label = switcher.querySelector('.language-switcher__label');
        const select = switcher.querySelector('select');
        if (label) label.textContent = getTranslation('language.label', 'Language');
        if (select) {
            select.innerHTML = Object.entries(languages).map(([code, name]) => `<option value="${code}">${name}</option>`).join('');
            select.value = getCurrentLanguage();
            select.setAttribute('aria-label', getTranslation('language.aria', 'Choose website language'));
            if (!select.dataset.languageBound) {
                select.addEventListener('change', (event) => setCurrentLanguage(event.target.value));
                select.dataset.languageBound = 'true';
            }
        }
    }

    function applyLanguage() {
        document.documentElement.lang = getCurrentLanguage();
        translateRoot(document);
        updateNavigation();
        updateCookieBanner();
        translateThemePage();
        if (typeof window.refreshNavbarDropdownLabels === 'function') {
            window.refreshNavbarDropdownLabels();
        }
        if (typeof window.updateAuthUI === 'function') {
            window.updateAuthUI();
        }
        if (typeof window.refreshProfileButton === 'function') {
            window.refreshProfileButton();
        }
        try {
            window.dispatchEvent(new CustomEvent('simba-language-changed', { detail: { language: getCurrentLanguage() } }));
        } catch (error) {}
    }

    function setCurrentLanguage(languageCode) {
        const nextLanguage = normalizeLanguage(languageCode);
        localStorage.setItem('simba_language', nextLanguage);
        applyLanguage();
        return nextLanguage;
    }

    window.SimbaI18n = {
        languages,
        getCurrentLanguage,
        getLocale,
        getTranslation,
        getThemeCard,
        translateRoot,
        applyLanguage,
        ensureLanguageSwitcher,
        setCurrentLanguage
    };

    document.addEventListener('DOMContentLoaded', function() {
        applyLanguage();
        ensureLanguageSwitcher();
    });

    if (document.readyState !== 'loading') {
        applyLanguage();
        ensureLanguageSwitcher();
    }
})();
