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
            nav: { thematics: 'Thematics', test: 'Test', visios: 'Live Sessions', forum: 'Forum', contact: 'Contact Us', about: 'About Us' },
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
                anonymous: 'Anonymous',
                reactionLoginPrompt: 'Please log in or sign up to react to posts.',
                deletePost: 'Delete post',
                deleteReply: 'Delete reply',
                deleteOwnPost: 'Delete my post',
                deleteOwnReply: 'Delete my reply',
                deleteDialogTitle: 'Delete post',
                deleteDialogHelp: 'Choose a reason before deleting this post.',
                otherReason: 'Other reason',
                deleteConfirm: 'Delete',
                deletePermanentlyConfirm: 'Delete this post permanently?',
                couldNotDelete: 'Could not delete this post.',
                provideReason: 'Please provide a reason.',
                enterEmailFirst: 'Enter an account email first.',
                accountNotFound: 'Account not found.',
                couldNotPromote: 'Could not promote this account.',
                adminGranted: 'Admin granted.',
                couldNotRemove: 'Could not remove admin access.',
                adminAccessRemoved: 'Admin access removed.',
                postDeletedNotificationTitle: 'Your forum post was deleted',
                postDeletedNotificationBody: 'A moderator removed your {type}. Reason: {reason}'
            },
            messages: {
                title: 'Messages - SIMBA PROJECT',
                pageTitle: 'Messages',
                sidebarBody: 'Private conversations and admin inbox.',
                refresh: 'Refresh',
                overview: 'Overview',
                back: 'Back', conversationsLabel: 'Conversations', testsDone: 'Tests done', threads: 'Threads',
                unread: 'Unread',
                role: 'Role',
                heading: 'Messages',
                hint: 'Open a private conversation and reply without posting publicly.',
                noLoginTitle: 'Not logged in',
                noLoginBody: 'Please log in to access private messages.',
                noLoginThread: 'You need an account to use private messages.',
                noConversations: 'No conversations yet.',
                noConversationSelected: 'No conversation selected',
                startFromProfile: 'Start a private message from the profile button.',
                noMessagesYet: 'No messages yet. Send the first one.',
                singlePrivateThread: '1 private thread',
                choosePerson: 'Choose a person from the inbox and reply here.',
                directToAdmins: 'Send a private message directly to the admins.',
                sendMessage: 'Send message',
                sendReply: 'Send reply',
                writePrivateMessage: 'Write a private message...',
                writeReply: 'Write a reply...',
                selectConversationFirst: 'Select a conversation first.',
                newAdminReply: 'New admin reply',
                newPrivateMessage: 'New private message',
                privateChat: 'Private chat',
                adminInbox: 'Admin inbox',
                adminRole: 'Admin',
                userRole: 'User',
                conversations: '{count} conversations'
            },
            visios: {
                pageTitle: 'Live Sessions - SIMBA PROJECT',
                title: 'Live Sessions',
                heroTitle: 'Live sessions and video calls',
                heroLead: 'Plan private or public video sessions, control who can see each slot, and join when the time comes.',
                calendarTitle: 'Calendar',
                heroCardBody: 'Create private slots with an admin or publish live sessions for everyone.',
                adminTitle: 'Admin calendar',
                adminBody: 'Create public slots for everyone or private slots for selected people only.',
                requestTitle: 'Request a live session',
                requestBody: 'Book a private slot with an admin. Only you and the admins can see it.',
                requestMeeting: 'Request private slot',
                subjectLabel: 'Subject',
                dateLabel: 'Date',
                timeLabel: 'Time',
                durationLabel: 'Duration',
                duration30: '30 min',
                duration45: '45 min',
                duration60: '60 min',
                duration90: '90 min',
                visibilityLabel: 'Visibility',
                publicOption: 'Public',
                privateOption: 'Private',
                inviteesLabel: 'Invited emails',
                inviteesPlaceholder: 'friend@example.com, teammate@example.com',
                createMeeting: 'Create slot',
                descriptionLabel: 'Description',
                loading: 'Loading...',
                missingFields: 'Please fill in the title, date, and time.',
                invalidDate: 'Invalid date or time.',
                upcomingTitle: 'Upcoming sessions',
                noMeetings: 'No live sessions yet.',
                joinCall: 'Join call',
                startsAt: 'Starts at',
                endsAt: 'Ends at',
                onlyGuests: 'Private slot. Only invited people can see it.',
                publicMeeting: 'Public session',
                privateMeeting: 'Private session',
                groupMeeting: 'Group session',
                statusPending: 'Pending approval',
                statusApproved: 'Approved',
                statusRejected: 'Rejected',
                reviewQueueTitle: 'Requests to review',
                reviewQueueBody: 'Approve a request before the session can happen.',
                noPendingRequests: 'No requests pending approval.',
                approveRequest: 'Approve',
                rejectRequest: 'Reject',
                rejectionReasonLabel: 'Reason for rejection',
                rejectionReasonPlaceholder: 'Explain why this request is refused',
                rejectionReasonRequired: 'Please provide a reason.',
                approvalRequired: 'Waiting for admin approval.',
                requestPending: 'This request is waiting for admin approval.',
                requestApproved: 'This request has been approved.',
                requestRejected: 'This request was rejected.',
                rejectionReason: 'Reason: {reason}',
                couldNotUpdateApproval: 'Could not update this request.',
                privateAppointment: 'Private appointment',
                joinNow: 'Join now',
                waitForStart: 'Starts in {time}',
                ended: 'Ended',
                accessDenied: 'You do not have access to this session.',
                roomTitle: 'Session room',
                roomLead: 'Camera and microphone controls for this meeting.',
                startCamera: 'Turn on camera',
                stopCamera: 'Turn off camera',
                startMic: 'Turn on microphone',
                stopMic: 'Turn off microphone',
                shareScreen: 'Share screen',
                openChat: 'Open chat',
                chatIntro: 'The chat is local to this browser session for now.',
                chatPlaceholder: 'Write a message',
                sendMessage: 'Send',
                leaveCall: 'Leave call',
                participantCamera: 'Camera',
                participantMic: 'Microphone',
                participantsLabel: 'Participants',
                waitingMedia: 'Enable your camera or microphone to join the call.',
                joinRoom: 'Join room',
                backToCalendar: 'Back to calendar',
                requestCreated: 'Request created.',
                shareUnavailable: 'Screen sharing is not available in this browser.',
                sharingScreen: 'You are sharing your screen.',
                youLabel: 'You',
                weekDays: { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' },
                publicRoom: 'Public room',
                privateRoom: 'Private room'
            },
            profile: {
                pageTitle: 'Profile - SIMBA PROJECT',
                notLoggedIn: 'Not logged in',
                loginPrompt: 'Please login to see your profile.',
                editProfile: 'Edit profile',
                message: 'Message',
                quickStats: 'Quick stats',
                threadCount: 'Topics', testsDone: 'Tests done', unreadMessages: 'Unread messages', tests: 'Tests',
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
                cancel: 'Cancel',
                yourName: 'Your name',
                yourBio: 'Your bio',
                notifications: 'Notifications',
                adminTools: 'Admin tools',
                adminToolsDescription: 'Promote or revoke admin access for existing accounts.',
                adminEmailPlaceholder: 'Email address',
                makeAdmin: 'Make admin',
                removeAdmin: 'Remove admin',
                viewProfile: 'View a profile',
                viewProfileDescription: 'Open another account to inspect its profile and forum activity.',
                profileLookupPlaceholder: 'Email address',
                openProfile: 'Open profile',
                backToMyProfile: 'Back to my profile',
                forumActivity: 'Forum activity',
                activePosts: 'Active posts',
                deletedPosts: 'Deleted posts',
                postLabel: 'Post',
                replyLabel: 'Reply',
                noPostsYet: 'No posts yet',
                noDeletedPostsYet: 'No deleted posts yet',
                profileSaved: 'Profile saved',
                enterEmailFirst: 'Enter an account email first.',
                accountNotFound: 'Account not found.',
                couldNotPromote: 'Could not promote this account.',
                adminGranted: 'Admin granted.',
                couldNotRemove: 'Could not remove admin access.',
                adminAccessRemoved: 'Admin access removed.',
                adminBadge: 'Admin'
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
            pages: {
                contact: {
                    title: 'Contact Us',
                    body1: "We'd love to hear from you! Whether you have questions, feedback, or just want to share your thoughts about the SIMBA PROJECT, please feel free to reach out.",
                    body2: 'Your input is invaluable in helping us create a better, more supportive community for everyone on their mental health journey.',
                    body3: 'Coming soon: Contact form and direct messaging to our support team.',
                    body4: 'In the meantime, you can reach us through our social media channels:',
                    messageButton: 'Send a private message',
                    youtube: 'YouTube: @simbaproject',
                    instagram: 'Instagram: @simbaproject',
                    whatsapp: 'WhatsApp: Available for support and questions'
                },
                about: {
                    title: 'About Us',
                    missionTitle: 'Our Mission',
                    missionBody: "The SIMBA PROJECT is dedicated to supporting mental health and personal growth through education, community, and evidence-based resources. We believe that everyone's struggle is a call to adventure - an opportunity for transformation and growth.",
                    visionTitle: 'Our Vision',
                    visionBody: "We envision a world where mental health is prioritized, stigma is eliminated, and everyone has access to the tools and support they need to embark on their hero's journey.",
                    journeyTitle: "The Hero's Journey",
                    journeyBody: "Inspired by Joseph Campbell's monomyth, we view mental health challenges as part of a larger narrative of growth and transformation. Just like the hero in every great story, we all face challenges that call us to grow, adapt, and discover our inner strength.",
                    valuesTitle: 'Our Values',
                    compassion: 'Compassion: We approach mental health with empathy and understanding.',
                    education: 'Education: We provide evidence-based information to empower our community.',
                    community: 'Community: We foster a supportive environment where everyone belongs.',
                    growth: 'Growth: We believe in the potential for continuous personal development.'
                },
                legal: {
                    backToHome: 'Back to home',
                    imprintTitle: 'Imprint',
                    privacyTitle: 'Privacy Policy',
                    loading: 'Loading...',
                    missingToken: 'Missing token',
                    confirmSuccess: 'Email confirmed. You can close this page.',
                    confirmFailure: 'Confirmation failed',
                    networkError: 'Network error',
                    footerRights: 'All rights reserved.',
                    cookieText: 'We use cookies to improve this website. See our Privacy Policy.',
                    contactIntro: 'We would love to hear from you.',
                    contactFallback: 'Please log in to send a private message.'
                }
            },
            theme: { comingSoon: 'Coming soon', comingSoonBody: 'This page will be available soon.' },
            quiz: { kicker: '10-question tests per topic', title: 'Explore each topic one by one', lead: 'Choose a topic, answer 10 questions, and see whether you show low, some, or strong signs. Results can be saved to your profile.', topicsAvailable: 'topics available', questionsPerTest: 'questions per test', resultSaved: 'result saved to profile', testsAvailable: '{count} tests available', questionsBadge: '10 questions', alertThreshold: 'Alert threshold: {percent}%', start: 'Start', question: 'Question {current} / 10', chooseAnswer: 'Choose an answer to continue', back: 'Back', result: 'Result', scoreReading: 'Score reading', questionsCompleted: 'Questions completed', inProfile: 'In profile', saved: 'Saved', notLoggedIn: 'Not logged in', loginToSave: 'Log in to save score', scoreSaved: 'The score has been added to your profile.', scoreQueued: 'Log in now or later to save this score to your profile.', highSignals: 'High signals', moderateSignals: 'Moderate signals', someSigns: 'Some signs', lowSigns: 'Low signs', affected: 'You show several signs consistent with {topic}.', calm: 'You show few signs of {topic} for now.', retake: 'Retake', backToTopics: 'Back to topics', goToTopicPage: 'Go to topic page', scaleNever: 'Never', scaleSometimes: 'Sometimes', scaleOften: 'Often', scaleVeryOften: 'Very often' }
        },
        de: {
            language: { label: 'Sprache', aria: 'Website-Sprache wählen' },
            nav: { thematics: 'Themen', test: 'Test', visios: 'Live-Sessions', forum: 'Forum', contact: 'Kontakt', about: 'Über uns' },
            auth: { signup: 'Registrieren', login: 'Anmelden', signout: 'Abmelden' },
            cookie: { text: 'Wir verwenden Cookies, um diese Website zu verbessern. Siehe unsere Datenschutzerklärung.', accept: 'Alle akzeptieren', reject: 'Ablehnen', manage: 'Einstellungen verwalten' },
            index: { hero: { subtitle: 'eine neue Perspektive auf mentale Gesundheit', title: 'dein Kampf ist ein Ruf zum Abenteuer' }, intro: { kicker: 'Was ist SIMBA?', title: 'Die Seite hilft dir, Themen der mentalen Gesundheit einfach zu entdecken.', body1: 'SIMBA basiert auf kurzen Tests und klaren Seiten für jedes Thema. Du kannst ein Thema ansehen, ein Quiz mit 10 Fragen machen, dein Ergebnis lesen und deine Punktzahl im Profil speichern, wenn du dich anmeldest.', body2: 'Das Ziel ist, jedes Thema leicht verständlich und später leicht wieder auffindbar zu machen, damit du von Neugier zu Selbstbeobachtung kommst, ohne den Überblick zu verlieren.' }, categories: { relationships: 'Beziehungen', 'mental-health': 'Psychische Gesundheit', 'personal-growth': 'Wachstum', neurodiversity: 'Neurodiversität', 'mind-body': 'Geist & Körper' } },
            forum: { kicker: 'Forum', title: 'Fragen stellen, antworten und die Themen gemeinsam besprechen.', lead: 'Ein kurzer Bereich für Fragen, Unterstützung und Gespräche. Veröffentliche eine Nachricht, antworte anderen und halte die Diskussion am Laufen.', stepsTitle: 'So funktioniert es', step1: 'Stelle eine Frage oder teile einen Gedanken.', step2: 'Antworte mit Unterstützung oder Rat.', step3: 'Bleib respektvoll.', startTopic: 'Thema starten', postTitle: 'Eine Frage stellen oder eine Diskussion beginnen', publicBoard: 'Öffentliches Board', topicType: 'Thema', question: 'Frage', discussion: 'Diskussion', support: 'Unterstützung', feedback: 'Feedback', titleLabel: 'Titel', titlePlaceholder: 'Was möchtest du fragen?', messageLabel: 'Nachricht', messagePlaceholder: 'Beschreibe deine Frage oder teile deine Meinung...', note: 'Bitte respektvoll und präzise bleiben.', postMessage: 'Nachricht posten', communityThreads: 'Community-Themen', latestMessages: 'Neueste Beiträge', noPosts: 'Noch keine Beiträge. Starte als Erste*r die Unterhaltung.', reply: 'Antworten', replies: 'Antworten', noReplies: 'Noch keine Antworten. Starte die Unterhaltung.', replyPlaceholder: 'Schreibe eine Antwort...', sendReply: 'Antwort senden', anonymousMessage: 'Anonyme Nachricht', anonymous: 'Anonym', reactionLoginPrompt: 'Bitte melde dich an oder registriere dich, um auf Beiträge zu reagieren.', deletePost: 'Beitrag löschen', deleteReply: 'Antwort löschen', deleteOwnPost: 'Meinen Beitrag löschen', deleteOwnReply: 'Meine Antwort löschen', deleteDialogTitle: 'Beitrag löschen', deleteDialogHelp: 'Wähle einen Grund, bevor du diesen Beitrag löschst.', otherReason: 'Anderer Grund', deleteConfirm: 'Löschen', deletePermanentlyConfirm: 'Diesen Beitrag dauerhaft löschen?', couldNotDelete: 'Dieser Beitrag konnte nicht gelöscht werden.', provideReason: 'Bitte gib einen Grund an.', enterEmailFirst: 'Bitte zuerst eine E-Mail-Adresse eingeben.', accountNotFound: 'Konto nicht gefunden.', couldNotPromote: 'Dieses Konto konnte nicht zum Admin gemacht werden.', adminGranted: 'Admin-Rechte vergeben.', couldNotRemove: 'Admin-Zugriff konnte nicht entfernt werden.', adminAccessRemoved: 'Admin-Zugriff entfernt.', postDeletedNotificationTitle: 'Dein Forumsbeitrag wurde gelöscht', postDeletedNotificationBody: 'Eine Moderation hat deinen {type} entfernt. Grund: {reason}' },
            messages: { title: 'Nachrichten - SIMBA PROJECT', pageTitle: 'Nachrichten', sidebarBody: 'Private Unterhaltungen und Admin-Postfach.', refresh: 'Aktualisieren', overview: 'Übersicht', back: 'Zurück', conversationsLabel: 'Unterhaltungen', testsDone: 'Tests durchgeführt', threads: 'Chats', unread: 'Ungelesen', role: 'Rolle', heading: 'Nachrichten', hint: 'Öffne eine private Unterhaltung und antworte, ohne öffentlich zu posten.', noLoginTitle: 'Nicht angemeldet', noLoginBody: 'Bitte melde dich an, um private Nachrichten zu nutzen.', noLoginThread: 'Du brauchst ein Konto, um private Nachrichten zu nutzen.', noConversations: 'Noch keine Unterhaltungen.', noConversationSelected: 'Keine Unterhaltung ausgewählt', startFromProfile: 'Starte eine private Nachricht über den Profil-Button.', noMessagesYet: 'Noch keine Nachrichten. Sende die erste.', singlePrivateThread: '1 privater Chat', choosePerson: 'Wähle eine Person aus dem Postfach und antworte hier.', directToAdmins: 'Sende den Admins direkt eine private Nachricht.', sendMessage: 'Nachricht senden', sendReply: 'Antwort senden', writePrivateMessage: 'Schreibe eine private Nachricht...', writeReply: 'Schreibe eine Antwort...', selectConversationFirst: 'Wähle zuerst eine Unterhaltung aus.', newAdminReply: 'Neue Admin-Antwort', newPrivateMessage: 'Neue private Nachricht', privateChat: 'Privater Chat', adminInbox: 'Admin-Postfach', adminRole: 'Admin', userRole: 'Nutzer', conversations: '{count} Unterhaltungen' },
            visios: {
                pageTitle: 'Live-Sitzungen - SIMBA PROJECT',
                title: 'Live-Sitzungen',
                heroTitle: 'Live-Sitzungen und Videoanrufe',
                heroLead: 'Plane öffentliche oder private Videositzungen, kontrolliere, wer jeden Termin sehen kann, und trete bei, wenn die Zeit gekommen ist.',
                calendarTitle: 'Kalender',
                heroCardBody: 'Erstelle private Termine mit einem Admin oder veröffentliche Live-Sessions für alle.',
                adminTitle: 'Admin-Kalender',
                adminBody: 'Erstelle öffentliche Termine für alle oder private Termine nur für ausgewählte Personen.',
                requestTitle: 'Eine Live-Session anfragen',
                requestBody: 'Buche einen privaten Termin mit einem Admin. Nur du und die Admins können ihn sehen.',
                requestMeeting: 'Privaten Termin anfragen',
                subjectLabel: 'Betreff',
                dateLabel: 'Datum',
                timeLabel: 'Uhrzeit',
                durationLabel: 'Dauer',
                duration30: '30 Min',
                duration45: '45 Min',
                duration60: '60 Min',
                duration90: '90 Min',
                visibilityLabel: 'Sichtbarkeit',
                publicOption: 'Öffentlich',
                privateOption: 'Privat',
                inviteesLabel: 'Eingeladene E-Mails',
                inviteesPlaceholder: 'freund@example.com, teamkollege@example.com',
                createMeeting: 'Termin erstellen',
                descriptionLabel: 'Beschreibung',
                loading: 'Laden...',
                missingFields: 'Bitte Titel, Datum und Uhrzeit ausfüllen.',
                invalidDate: 'Ungültiges Datum oder Uhrzeit.',
                upcomingTitle: 'Bevorstehende Sessions',
                noMeetings: 'Noch keine Live-Sessions vorhanden.',
                joinCall: 'Anruf beitreten',
                startsAt: 'Beginnt um',
                endsAt: 'Endet um',
                onlyGuests: 'Privater Termin. Nur eingeladene Personen können ihn sehen.',
                publicMeeting: 'Öffentliche Session',
                privateMeeting: 'Private Session',
                groupMeeting: 'Gruppen-Session',
                statusPending: 'Genehmigung ausstehend',
                statusApproved: 'Genehmigt',
                statusRejected: 'Abgelehnt',
                reviewQueueTitle: 'Zu prüfende Anfragen',
                reviewQueueBody: 'Eine Anfrage genehmigen, bevor die Session stattfinden kann.',
                noPendingRequests: 'Keine Anfragen zur Genehmigung.',
                approveRequest: 'Genehmigen',
                rejectRequest: 'Ablehnen',
                rejectionReasonLabel: 'Ablehnungsgrund',
                rejectionReasonPlaceholder: 'Erkläre, warum diese Anfrage abgelehnt wird',
                rejectionReasonRequired: 'Bitte einen Grund angeben.',
                approvalRequired: 'Wartet auf die Genehmigung durch einen Admin.',
                requestPending: 'Diese Anfrage wartet auf die Genehmigung durch einen Admin.',
                requestApproved: 'Diese Anfrage wurde genehmigt.',
                requestRejected: 'Diese Anfrage wurde abgelehnt.',
                rejectionReason: 'Grund: {reason}',
                couldNotUpdateApproval: 'Diese Anfrage konnte nicht aktualisiert werden.',
                privateAppointment: 'Privater Termin',
                joinNow: 'Jetzt beitreten',
                waitForStart: 'Startet in {time}',
                ended: 'Beendet',
                accessDenied: 'Du hast keinen Zugriff auf diese Session.',
                roomTitle: 'Session-Raum',
                roomLead: 'Kamera- und Mikrofonsteuerung für dieses Meeting.',
                startCamera: 'Kamera einschalten',
                stopCamera: 'Kamera ausschalten',
                startMic: 'Mikrofon einschalten',
                stopMic: 'Mikrofon ausschalten',
                shareScreen: 'Bildschirm teilen',
                openChat: 'Chat öffnen',
                chatIntro: 'Der Chat ist vorerst nur in dieser Browser-Sitzung lokal.',
                chatPlaceholder: 'Nachricht schreiben',
                sendMessage: 'Senden',
                leaveCall: 'Anruf verlassen',
                participantCamera: 'Kamera',
                participantMic: 'Mikrofon',
                participantsLabel: 'Teilnehmende',
                waitingMedia: 'Aktiviere deine Kamera oder dein Mikrofon, um dem Anruf beizutreten.',
                joinRoom: 'Raum betreten',
                backToCalendar: 'Zurück zum Kalender',
                requestCreated: 'Anfrage erstellt.',
                shareUnavailable: 'Bildschirmfreigabe ist in diesem Browser nicht verfügbar.',
                sharingScreen: 'Du teilst deinen Bildschirm.',
                youLabel: 'Du',
                weekDays: { mon: 'Mo', tue: 'Di', wed: 'Mi', thu: 'Do', fri: 'Fr', sat: 'Sa', sun: 'So' },
                publicRoom: 'Öffentlicher Raum',
                privateRoom: 'Privater Raum'
            },
            profile: { notLoggedIn: 'Nicht angemeldet', loginPrompt: 'Bitte melde dich an, um dein Profil zu sehen.', editProfile: 'Profil bearbeiten', message: 'Nachricht', quickStats: 'Schnellstatistiken', threadCount: 'Themen', testsDone: 'Tests abgeschlossen', unreadMessages: 'Ungelesene Nachrichten', tests: 'Tests', avgScore: 'Durchschnitt', rank: 'Rang', about: 'Info', aboutBody: 'Das ist dein Profil. Du kannst Anzeigename, Bio und Avatar aktualisieren.', scoreHistory: 'Punktestand-Verlauf', noTestsYet: 'Noch keine Tests', showingAll: 'Alle {count} Ergebnisse werden angezeigt', showingRecent: 'Es werden deine 5 neuesten Ergebnisse angezeigt', seeMore: 'Mehr anzeigen', showLess: 'Weniger anzeigen', noScores: 'Noch keine Punkte', test: 'Test', result: 'Ergebnis', unknownDate: 'Unbekanntes Datum', displayName: 'Anzeigename', bio: 'Bio', profilePhoto: 'Profilfoto', saveChanges: 'Änderungen speichern', cancel: 'Abbrechen', pageTitle: 'Profil - SIMBA PROJECT', yourName: 'Dein Name', yourBio: 'Deine Bio', notifications: 'Benachrichtigungen', adminTools: 'Admin-Tools', adminToolsDescription: 'Admin-Zugriff für bestehende Konten vergeben oder entziehen.', adminEmailPlaceholder: 'E-Mail-Adresse', makeAdmin: 'Zum Admin machen', removeAdmin: 'Admin entfernen', viewProfile: 'Profil ansehen', viewProfileDescription: 'Öffne ein anderes Konto, um Profil und Forum-Aktivität zu prüfen.', profileLookupPlaceholder: 'E-Mail-Adresse', openProfile: 'Profil öffnen', backToMyProfile: 'Zurück zu meinem Profil', forumActivity: 'Forum-Aktivität', activePosts: 'Aktive Beiträge', deletedPosts: 'Gelöschte Beiträge', postLabel: 'Beitrag', replyLabel: 'Antwort', noPostsYet: 'Noch keine Beiträge', noDeletedPostsYet: 'Noch keine gelöschten Beiträge', profileSaved: 'Profil gespeichert', enterEmailFirst: 'Bitte zuerst eine E-Mail-Adresse eingeben.', accountNotFound: 'Konto nicht gefunden.', couldNotPromote: 'Dieses Konto konnte nicht zum Admin gemacht werden.', adminGranted: 'Admin-Rechte vergeben.', couldNotRemove: 'Admin-Zugriff konnte nicht entfernt werden.', adminAccessRemoved: 'Admin-Zugriff entfernt.', adminBadge: 'Admin' },
            modal: { loginTitle: 'Anmelden', signupTitle: 'Registrieren', profileTitle: 'Dein Profil', email: 'E-Mail', password: 'Passwort', loginButton: 'Anmelden', signupButton: 'Registrieren', logout: 'Abmelden', pleaseLogin: 'Bitte zuerst anmelden.', displayName: 'Anzeigename', bio: 'Bio', uploadAvatar: 'Eigenes Avatar-Bild hochladen', saveProfile: 'Profil speichern', enterCredentials: 'E-Mail und Passwort eingeben', noSuchUser: 'Kein solcher Nutzer (lokal)', invalidCredentials: 'Ungültige Zugangsdaten', emailExists: 'E-Mail existiert bereits (lokal)', profileSaved: 'Profil gespeichert', profileSavedLocal: 'Profil gespeichert (lokal)', profileSavedServer: 'Profil gespeichert (Server)' },
            theme: { learnMore: 'Mehr dazu' },
            dropdown: { allTests: 'Alle Tests', relationships: 'Beziehungen', mentalHealth: 'Psychische Gesundheit', personalGrowth: 'Persönliches Wachstum', neurodiversity: 'Neurodiversität', mindBody: 'Geist & Körper' },
            pages: {
                contact: { title: 'Kontakt', body1: 'Wir freuen uns, von dir zu hören. Wenn du Fragen oder Feedback hast oder Gedanken zum SIMBA PROJECT teilen möchtest, melde dich gern.', body2: 'Dein Input hilft uns, eine bessere und unterstützendere Community für alle auf ihrem Weg mit mentaler Gesundheit aufzubauen.', body3: 'Demnächst: Kontaktformular und direkte Nachrichten an unser Support-Team.', body4: 'Bis dahin erreichst du uns über unsere Social-Media-Kanäle:', messageButton: 'Private Nachricht senden', youtube: 'YouTube: @simbaproject', instagram: 'Instagram: @simbaproject', whatsapp: 'WhatsApp: Für Support und Fragen verfügbar' },
                about: { title: 'Über uns', missionTitle: 'Unsere Mission', missionBody: 'Das SIMBA PROJECT unterstützt mentale Gesundheit und persönliches Wachstum durch Bildung, Community und evidenzbasierte Ressourcen. Wir glauben, dass jeder Kampf ein Ruf zum Abenteuer ist - eine Chance für Veränderung und Wachstum.', visionTitle: 'Unsere Vision', visionBody: 'Wir stellen uns eine Welt vor, in der mentale Gesundheit Priorität hat, Stigma verschwindet und alle Zugang zu den Werkzeugen und der Unterstützung haben, die sie für ihre eigene Heldenreise brauchen.', journeyTitle: 'Die Heldenreise', journeyBody: 'Inspiriert von Joseph Campbells Monomythos sehen wir mentale Herausforderungen als Teil einer größeren Geschichte von Wachstum und Veränderung. Wie Heldinnen und Helden in großen Geschichten begegnen wir Herausforderungen, die uns wachsen, anpassen und innere Stärke entdecken lassen.', valuesTitle: 'Unsere Werte', compassion: 'Mitgefühl: Wir begegnen mentaler Gesundheit mit Empathie und Verständnis.', education: 'Bildung: Wir teilen evidenzbasierte Informationen, die unsere Community stärken.', community: 'Community: Wir fördern ein unterstützendes Umfeld, in dem alle dazugehören.', growth: 'Wachstum: Wir glauben an die Möglichkeit kontinuierlicher persönlicher Entwicklung.' }
                ,legal: { backToHome: 'Zurück zur Startseite', imprintTitle: 'Impressum', privacyTitle: 'Datenschutzerklärung', loading: 'Lädt...', missingToken: 'Token fehlt', confirmSuccess: 'E-Mail bestätigt. Du kannst diese Seite schließen.', confirmFailure: 'Bestätigung fehlgeschlagen', networkError: 'Netzwerkfehler', footerRights: 'Alle Rechte vorbehalten.', cookieText: 'Wir verwenden Cookies, um diese Website zu verbessern. Siehe unsere Datenschutzerklärung.', contactIntro: 'Wir freuen uns, von dir zu hören.', contactFallback: 'Bitte melde dich an, um eine private Nachricht zu senden.' }
            },
                theme: { comingSoon: 'Demnächst', comingSoonBody: 'Diese Seite wird in Kürze verfügbar sein.' },
            quiz: { kicker: 'Tests mit 10 Fragen pro Thema', title: 'Entdecke jedes Thema einzeln', lead: 'Wähle ein Thema, beantworte 10 Fragen und sieh, ob du geringe, einige oder starke Anzeichen zeigst. Ergebnisse können in deinem Profil gespeichert werden.', topicsAvailable: 'Themen verfügbar', questionsPerTest: 'Fragen pro Test', resultSaved: 'Ergebnis im Profil gespeichert', testsAvailable: '{count} Tests verfügbar', questionsBadge: '10 Fragen', alertThreshold: 'Warnschwelle: {percent}%', start: 'Starten', question: 'Frage {current} / 10', chooseAnswer: 'Wähle eine Antwort, um fortzufahren', back: 'Zurück', result: 'Ergebnis', scoreReading: 'Einschätzung', questionsCompleted: 'Fragen abgeschlossen', inProfile: 'Im Profil', saved: 'Gespeichert', notLoggedIn: 'Nicht angemeldet', loginToSave: 'Anmelden, um zu speichern', scoreSaved: 'Der Punktestand wurde deinem Profil hinzugefügt.', scoreQueued: 'Melde dich jetzt oder später an, um diesen Punktestand im Profil zu speichern.', highSignals: 'Starke Signale', moderateSignals: 'Mäßige Signale', someSigns: 'Einige Anzeichen', lowSigns: 'Wenige Anzeichen', affected: 'Du zeigst mehrere Anzeichen, die zu {topic} passen.', calm: 'Du zeigst aktuell nur wenige Anzeichen von {topic}.', retake: 'Erneut versuchen', backToTopics: 'Zurück zu den Themen', goToTopicPage: 'Zur Themenseite', scaleNever: 'Nie', scaleSometimes: 'Manchmal', scaleOften: 'Oft', scaleVeryOften: 'Sehr oft' }
        },
        fr: {
            language: { label: 'Langue', aria: 'Choisir la langue du site' },
            nav: { thematics: 'Thématiques', test: 'Test', visios: 'Sessions en direct', forum: 'Forum', contact: 'Contact', about: 'À propos' },
            auth: { signup: 'S’inscrire', login: 'Connexion', signout: 'Se déconnecter' },
            cookie: { text: 'Nous utilisons des cookies pour améliorer ce site. Voir notre politique de confidentialité.', accept: 'Tout accepter', reject: 'Refuser', manage: 'Gérer les paramètres' },
            index: { hero: { subtitle: 'une nouvelle perspective sur la santé mentale', title: 'ton combat est un appel à l’aventure' }, intro: { kicker: 'Qu’est-ce que SIMBA ?', title: 'Le site t’aide à explorer les thèmes de santé mentale de façon simple.', body1: 'SIMBA repose sur des tests courts et des pages claires pour chaque notion. Tu peux parcourir un thème, faire un quiz de 10 questions, lire ton résultat et enregistrer tes scores dans ton profil si tu te connectes.', body2: 'Le but est de rendre chaque thème facile à comprendre et facile à retrouver, pour passer de la curiosité à l’auto-observation sans te perdre.' }, categories: { relationships: 'Relations', 'mental-health': 'Santé mentale', 'personal-growth': 'Développement', neurodiversity: 'Neurodiversité', 'mind-body': 'Corps & esprit' } },
            forum: { kicker: 'Forum', title: 'Posez des questions, répondez et discutez des thèmes ensemble.', lead: 'Un espace court pour les questions, le soutien et les échanges. Publie un message, réponds aux autres et fais vivre la discussion.', stepsTitle: 'Comment ça marche', step1: 'Publie une question ou une idée.', step2: 'Réponds avec du soutien ou un conseil.', step3: 'Reste respectueux.', startTopic: 'Commencer un sujet', postTitle: 'Poser une question ou lancer une discussion', publicBoard: 'Tableau public', topicType: 'Type de sujet', question: 'Question', discussion: 'Discussion', support: 'Soutien', feedback: 'Retour', titleLabel: 'Titre', titlePlaceholder: 'Que veux-tu demander ?', messageLabel: 'Message', messagePlaceholder: 'Décris ta question ou partage ton point de vue...', note: 'Reste respectueux et précis.', postMessage: 'Publier le message', communityThreads: 'Sujets de la communauté', latestMessages: 'Derniers messages', noPosts: 'Aucun message pour le moment. Sois la première personne à lancer la conversation.', reply: 'Répondre', replies: 'réponses', noReplies: 'Pas encore de réponses. Lance la conversation.', replyPlaceholder: 'Écris une réponse...', sendReply: 'Envoyer la réponse', anonymousMessage: 'Message anonyme', anonymous: 'Anonyme', reactionLoginPrompt: 'Connecte-toi ou crée un compte pour réagir aux messages.', deletePost: 'Supprimer le message', deleteReply: 'Supprimer la réponse', deleteOwnPost: 'Supprimer mon message', deleteOwnReply: 'Supprimer ma réponse', deleteDialogTitle: 'Supprimer le message', deleteDialogHelp: 'Choisis une raison avant de supprimer ce message.', otherReason: 'Autre raison', deleteConfirm: 'Supprimer', deletePermanentlyConfirm: 'Supprimer définitivement ce message ?', couldNotDelete: 'Ce message n’a pas pu être supprimé.', provideReason: 'Veuillez indiquer une raison.', enterEmailFirst: 'Entre d’abord une adresse e-mail.', accountNotFound: 'Compte introuvable.', couldNotPromote: 'Impossible de promouvoir ce compte.', adminGranted: 'Accès admin accordé.', couldNotRemove: 'Impossible de retirer l’accès admin.', adminAccessRemoved: 'Accès admin retiré.', postDeletedNotificationTitle: 'Ton message du forum a été supprimé', postDeletedNotificationBody: 'Une modération a supprimé ton {type}. Raison : {reason}' },
            messages: { title: 'Messages - SIMBA PROJECT', pageTitle: 'Messages', sidebarBody: 'Conversations privées et boîte de réception admin.', refresh: 'Actualiser', overview: 'Aperçu', back: 'Retour', conversationsLabel: 'Conversations', testsDone: 'Tests effectués', threads: 'Conversations', unread: 'Non lus', role: 'Rôle', heading: 'Messages', hint: 'Ouvre une conversation privée et réponds sans publier en public.', noLoginTitle: 'Non connecté', noLoginBody: 'Connecte-toi pour accéder aux messages privés.', noLoginThread: 'Tu as besoin d’un compte pour utiliser les messages privés.', noConversations: 'Aucune conversation pour le moment.', noConversationSelected: 'Aucune conversation sélectionnée', startFromProfile: 'Commence un message privé depuis le bouton du profil.', noMessagesYet: 'Pas encore de messages. Envoie le premier.', singlePrivateThread: '1 conversation privée', choosePerson: 'Choisis une personne dans la boîte de réception et réponds ici.', directToAdmins: 'Envoie un message privé directement aux admins.', sendMessage: 'Envoyer le message', sendReply: 'Envoyer la réponse', writePrivateMessage: 'Écris un message privé...', writeReply: 'Écris une réponse...', selectConversationFirst: 'Sélectionne d’abord une conversation.', newAdminReply: 'Nouvelle réponse admin', newPrivateMessage: 'Nouveau message privé', privateChat: 'Discussion privée', adminInbox: 'Boîte admin', adminRole: 'Admin', userRole: 'Utilisateur', conversations: '{count} conversations' },
            visios: {
                pageTitle: 'Sessions en direct - SIMBA PROJECT',
                title: 'Sessions en direct',
                heroTitle: 'Sessions en direct et appels vidéo',
                heroLead: 'Planifie des visios publiques ou privées, contrôle qui voit chaque créneau et rejoins la réunion quand l’heure arrive.',
                calendarTitle: 'Calendrier',
                heroCardBody: 'Crée des créneaux privés avec un admin ou publie des sessions en direct pour tout le monde.',
                adminTitle: 'Calendrier admin',
                adminBody: 'Crée des créneaux publics pour tout le monde ou des créneaux privés pour des personnes choisies.',
                requestTitle: 'Demander une session en direct',
                requestBody: 'Réserve un créneau privé avec un admin. Toi seul et les admins pouvez le voir.',
                requestMeeting: 'Demander un créneau privé',
                subjectLabel: 'Sujet',
                dateLabel: 'Date',
                timeLabel: 'Heure',
                durationLabel: 'Durée',
                duration30: '30 min',
                duration45: '45 min',
                duration60: '60 min',
                duration90: '90 min',
                visibilityLabel: 'Visibilité',
                publicOption: 'Public',
                privateOption: 'Privé',
                inviteesLabel: 'Emails invités',
                inviteesPlaceholder: 'ami@example.com, collègue@example.com',
                createMeeting: 'Créer le créneau',
                descriptionLabel: 'Description',
                loading: 'Chargement...',
                missingFields: 'Veuillez remplir le titre, la date et l’heure.',
                invalidDate: 'Date ou heure invalide.',
                upcomingTitle: 'Prochaines sessions',
                noMeetings: 'Aucune session en direct pour le moment.',
                joinCall: 'Rejoindre l’appel',
                startsAt: 'Commence à',
                endsAt: 'Se termine à',
                onlyGuests: 'Créneau privé. Seules les personnes invitées peuvent le voir.',
                publicMeeting: 'Session publique',
                privateMeeting: 'Session privée',
                groupMeeting: 'Session de groupe',
                statusPending: 'En attente de validation',
                statusApproved: 'Approuvée',
                statusRejected: 'Refusée',
                reviewQueueTitle: 'Demandes à examiner',
                reviewQueueBody: 'Valide une demande avant que la session puisse avoir lieu.',
                noPendingRequests: 'Aucune demande en attente de validation.',
                approveRequest: 'Valider',
                rejectRequest: 'Refuser',
                rejectionReasonLabel: 'Motif du refus',
                rejectionReasonPlaceholder: 'Explique pourquoi cette demande est refusée',
                rejectionReasonRequired: 'Veuillez indiquer une raison.',
                approvalRequired: 'En attente de validation par un admin.',
                requestPending: 'Cette demande attend la validation d’un admin.',
                requestApproved: 'Cette demande a été validée.',
                requestRejected: 'Cette demande a été refusée.',
                rejectionReason: 'Motif : {reason}',
                couldNotUpdateApproval: 'Impossible de mettre à jour cette demande.',
                privateAppointment: 'Rendez-vous privé',
                joinNow: 'Rejoindre maintenant',
                waitForStart: 'Commence dans {time}',
                ended: 'Terminé',
                accessDenied: 'Tu n’as pas accès à cette session.',
                roomTitle: 'Salle de session',
                roomLead: 'Contrôles caméra et micro pour cette réunion.',
                startCamera: 'Activer la caméra',
                stopCamera: 'Désactiver la caméra',
                startMic: 'Activer le micro',
                stopMic: 'Désactiver le micro',
                shareScreen: 'Partager l’écran',
                openChat: 'Ouvrir le chat',
                chatIntro: 'Le chat est local à cette session du navigateur pour le moment.',
                chatPlaceholder: 'Écris un message',
                sendMessage: 'Envoyer',
                leaveCall: 'Quitter l’appel',
                participantCamera: 'Caméra',
                participantMic: 'Microphone',
                participantsLabel: 'Participants',
                waitingMedia: 'Active ta caméra ou ton micro pour rejoindre l’appel.',
                joinRoom: 'Rejoindre la salle',
                backToCalendar: 'Retour au calendrier',
                requestCreated: 'Demande créée.',
                shareUnavailable: 'Le partage d’écran n’est pas disponible dans ce navigateur.',
                sharingScreen: 'Tu partages ton écran.',
                youLabel: 'Toi',
                weekDays: { mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Jeu', fri: 'Ven', sat: 'Sam', sun: 'Dim' },
                publicRoom: 'Salle publique',
                privateRoom: 'Salle privée'
            },
            profile: { notLoggedIn: 'Non connecté', loginPrompt: 'Connecte-toi pour voir ton profil.', editProfile: 'Modifier le profil', message: 'Message', quickStats: 'Statistiques rapides', threadCount: 'Sujets', testsDone: 'Tests effectués', unreadMessages: 'Messages non lus', tests: 'Tests', avgScore: 'Moyenne', rank: 'Classement', about: 'À propos', aboutBody: 'Voici ton profil. Tu peux mettre à jour ton nom affiché, ta bio et ton avatar.', scoreHistory: 'Historique des scores', noTestsYet: 'Pas encore de test', showingAll: 'Affichage de tous les résultats ({count})', showingRecent: 'Affichage de tes 5 résultats les plus récents', seeMore: 'Voir plus', showLess: 'Voir moins', noScores: 'Aucun score pour le moment', test: 'Test', result: 'Résultat', unknownDate: 'Date inconnue', displayName: 'Nom affiché', bio: 'Bio', profilePhoto: 'Photo de profil', saveChanges: 'Enregistrer les modifications', cancel: 'Annuler', pageTitle: 'Profil - SIMBA PROJECT', yourName: 'Ton nom', yourBio: 'Ta bio', notifications: 'Notifications', adminTools: 'Outils admin', adminToolsDescription: 'Attribuer ou retirer l’accès admin pour les comptes existants.', adminEmailPlaceholder: 'Adresse e-mail', makeAdmin: 'Nommer admin', removeAdmin: 'Retirer admin', viewProfile: 'Voir un profil', viewProfileDescription: 'Ouvre un autre compte pour consulter son profil et son activité forum.', profileLookupPlaceholder: 'Adresse e-mail', openProfile: 'Ouvrir le profil', backToMyProfile: 'Retour à mon profil', forumActivity: 'Activité du forum', activePosts: 'Messages actifs', deletedPosts: 'Messages supprimés', postLabel: 'Message', replyLabel: 'Réponse', noPostsYet: 'Aucun message pour le moment', noDeletedPostsYet: 'Aucun message supprimé pour le moment', profileSaved: 'Profil enregistré', enterEmailFirst: 'Entre d’abord une adresse e-mail.', accountNotFound: 'Compte introuvable.', couldNotPromote: 'Impossible de promouvoir ce compte.', adminGranted: 'Accès admin accordé.', couldNotRemove: 'Impossible de retirer l’accès admin.', adminAccessRemoved: 'Accès admin retiré.', adminBadge: 'Admin' },
            modal: { loginTitle: 'Connexion', signupTitle: 'Inscription', profileTitle: 'Ton profil', email: 'E-mail', password: 'Mot de passe', loginButton: 'Connexion', signupButton: 'S’inscrire', logout: 'Se déconnecter', pleaseLogin: 'Connecte-toi d’abord.', displayName: 'Nom affiché', bio: 'Bio', uploadAvatar: 'Avatar personnalisé (téléversement)', saveProfile: 'Enregistrer le profil', enterCredentials: 'Saisis l’e-mail et le mot de passe', noSuchUser: 'Aucun utilisateur (local)', invalidCredentials: 'Identifiants invalides', emailExists: 'Cet e-mail existe déjà (local)', profileSaved: 'Profil enregistré', profileSavedLocal: 'Profil enregistré (local)', profileSavedServer: 'Profil enregistré (serveur)' },
            theme: { learnMore: 'En savoir plus' },
            dropdown: { allTests: 'Tous les tests', relationships: 'Relations', mentalHealth: 'Santé mentale', personalGrowth: 'Développement personnel', neurodiversity: 'Neurodiversité', mindBody: 'Corps & esprit' },
            pages: {
                contact: { title: 'Contact', body1: 'Nous serions ravis de recevoir ton message. Si tu as des questions, des retours ou simplement envie de partager tes pensées sur le SIMBA PROJECT, n’hésite pas à nous contacter.', body2: 'Ton avis nous aide énormément à créer une communauté plus utile et plus soutenante pour chaque personne dans son parcours de santé mentale.', body3: 'Bientôt disponible : un formulaire de contact et une messagerie directe avec notre équipe de soutien.', body4: 'En attendant, tu peux nous joindre sur nos réseaux sociaux :', messageButton: 'Envoyer un message privé', youtube: 'YouTube : @simbaproject', instagram: 'Instagram : @simbaproject', whatsapp: 'WhatsApp : disponible pour le soutien et les questions' },
                about: { title: 'À propos', missionTitle: 'Notre mission', missionBody: 'Le SIMBA PROJECT soutient la santé mentale et le développement personnel grâce à l’éducation, la communauté et des ressources fondées sur des données fiables. Nous croyons que chaque difficulté peut devenir un appel à l’aventure - une occasion de transformation et de croissance.', visionTitle: 'Notre vision', visionBody: 'Nous imaginons un monde où la santé mentale est une priorité, où la stigmatisation disparaît et où chaque personne a accès aux outils et au soutien nécessaires pour avancer dans son propre parcours.', journeyTitle: 'Le voyage du héros', journeyBody: 'Inspirés par le monomythe de Joseph Campbell, nous voyons les défis de santé mentale comme une partie d’un récit plus large de croissance et de transformation. Comme les héros des grandes histoires, nous faisons face à des défis qui nous invitent à grandir, nous adapter et découvrir notre force intérieure.', valuesTitle: 'Nos valeurs', compassion: 'Compassion : nous abordons la santé mentale avec empathie et compréhension.', education: 'Éducation : nous partageons des informations fondées sur des données fiables pour aider notre communauté.', community: 'Communauté : nous cultivons un environnement de soutien où chacun a sa place.', growth: 'Croissance : nous croyons au potentiel de développement personnel continu.' }
            },
                theme: { comingSoon: 'À venir', comingSoonBody: 'Cette page sera bientôt disponible.' },
            quiz: { kicker: 'Tests de 10 questions par thème', title: 'Explore chaque thème un par un', lead: 'Choisis un thème, réponds à 10 questions et vois si tu présentes peu, quelques ou de forts signes. Les résultats peuvent être enregistrés dans ton profil.', topicsAvailable: 'thèmes disponibles', questionsPerTest: 'questions par test', resultSaved: 'résultat enregistré dans le profil', testsAvailable: '{count} tests disponibles', questionsBadge: '10 questions', alertThreshold: 'Seuil d’alerte : {percent}%', start: 'Commencer', question: 'Question {current} / 10', chooseAnswer: 'Choisis une réponse pour continuer', back: 'Retour', result: 'Résultat', scoreReading: 'Lecture du score', questionsCompleted: 'Questions terminées', inProfile: 'Dans le profil', saved: 'Enregistré', notLoggedIn: 'Non connecté', loginToSave: 'Se connecter pour enregistrer', scoreSaved: 'Le score a été ajouté à ton profil.', scoreQueued: 'Connecte-toi maintenant ou plus tard pour enregistrer ce score dans ton profil.', highSignals: 'Signaux forts', moderateSignals: 'Signaux modérés', someSigns: 'Quelques signes', lowSigns: 'Peu de signes', affected: 'Tu présentes plusieurs signes cohérents avec {topic}.', calm: 'Tu présentes peu de signes de {topic} pour le moment.', retake: 'Recommencer', backToTopics: 'Retour aux thèmes', goToTopicPage: 'Aller à la page du thème', scaleNever: 'Jamais', scaleSometimes: 'Parfois', scaleOften: 'Souvent', scaleVeryOften: 'Très souvent' }
        },
        es: {
            language: { label: 'Idioma', aria: 'Elegir el idioma del sitio' },
            nav: { thematics: 'Temáticas', test: 'Test', visios: 'Sesiones en directo', forum: 'Foro', contact: 'Contacto', about: 'Sobre nosotros' },
            auth: { signup: 'Registrarse', login: 'Iniciar sesión', signout: 'Cerrar sesión' },
            cookie: { text: 'Usamos cookies para mejorar este sitio. Consulta nuestra política de privacidad.', accept: 'Aceptar todo', reject: 'Rechazar', manage: 'Gestionar ajustes' },
            index: { hero: { subtitle: 'una nueva perspectiva sobre la salud mental', title: 'tu lucha es una llamada a la aventura' }, intro: { kicker: '¿Qué es SIMBA?', title: 'El sitio te ayuda a explorar temas de salud mental de forma sencilla.', body1: 'SIMBA se basa en pruebas cortas y páginas claras para cada noción. Puedes explorar un tema, hacer un cuestionario de 10 preguntas, leer tu resultado y guardar tus puntuaciones en tu perfil si inicias sesión.', body2: 'El objetivo es hacer que cada tema sea fácil de entender y fácil de volver a visitar, para pasar de la curiosidad a la autoobservación sin perderte.' }, categories: { relationships: 'Relaciones', 'mental-health': 'Salud mental', 'personal-growth': 'Crecimiento', neurodiversity: 'Neurodiversidad', 'mind-body': 'Mente y cuerpo' } },
            forum: { kicker: 'Foro', title: 'Haz preguntas, responde y habla de los temas juntos.', lead: 'Un espacio breve para preguntas, apoyo y conversación. Publica un mensaje, responde a otros y mantén la discusión en marcha.', stepsTitle: 'Cómo funciona', step1: 'Publica una pregunta o una idea.', step2: 'Responde con apoyo o consejo.', step3: 'Mantén el respeto.', startTopic: 'Crear un tema', postTitle: 'Haz una pregunta o empieza una discusión', publicBoard: 'Panel público', topicType: 'Tipo de tema', question: 'Pregunta', discussion: 'Discusión', support: 'Apoyo', feedback: 'Opinión', titleLabel: 'Título', titlePlaceholder: '¿Qué quieres preguntar?', messageLabel: 'Mensaje', messagePlaceholder: 'Describe tu pregunta o comparte tu punto de vista...', note: 'Sé respetuoso y concreto.', postMessage: 'Publicar mensaje', communityThreads: 'Temas de la comunidad', latestMessages: 'Últimos mensajes', noPosts: 'Aún no hay mensajes. Sé la primera persona en iniciar la conversación.', reply: 'Responder', replies: 'respuestas', noReplies: 'Aún no hay respuestas. Inicia la conversación.', replyPlaceholder: 'Escribe una respuesta...', sendReply: 'Enviar respuesta', anonymousMessage: 'Mensaje anónimo', anonymous: 'Anónimo', reactionLoginPrompt: 'Inicia sesión o crea una cuenta para reaccionar a los mensajes.', deletePost: 'Eliminar publicación', deleteReply: 'Eliminar respuesta', deleteOwnPost: 'Eliminar mi publicación', deleteOwnReply: 'Eliminar mi respuesta', deleteDialogTitle: 'Eliminar publicación', deleteDialogHelp: 'Elige un motivo antes de eliminar esta publicación.', otherReason: 'Otro motivo', deleteConfirm: 'Eliminar', deletePermanentlyConfirm: '¿Eliminar esta publicación de forma permanente?', couldNotDelete: 'No se pudo eliminar esta publicación.', provideReason: 'Por favor, indica un motivo.', enterEmailFirst: 'Introduce primero una dirección de correo.', accountNotFound: 'Cuenta no encontrada.', couldNotPromote: 'No se pudo promocionar esta cuenta.', adminGranted: 'Acceso admin concedido.', couldNotRemove: 'No se pudo retirar el acceso admin.', adminAccessRemoved: 'Acceso admin retirado.', postDeletedNotificationTitle: 'Tu publicación del foro fue eliminada', postDeletedNotificationBody: 'Una moderación eliminó tu {type}. Motivo: {reason}' },
            messages: { title: 'Mensajes - SIMBA PROJECT', pageTitle: 'Mensajes', sidebarBody: 'Conversaciones privadas y bandeja admin.', refresh: 'Actualizar', overview: 'Resumen', back: 'Volver', conversationsLabel: 'Conversaciones', testsDone: 'Tests realizados', threads: 'Conversaciones', unread: 'No leídos', role: 'Rol', heading: 'Mensajes', hint: 'Abre una conversación privada y responde sin publicar en público.', noLoginTitle: 'Sin sesión', noLoginBody: 'Inicia sesión para acceder a los mensajes privados.', noLoginThread: 'Necesitas una cuenta para usar mensajes privados.', noConversations: 'Aún no hay conversaciones.', noConversationSelected: 'No se ha seleccionado ninguna conversación', startFromProfile: 'Empieza un mensaje privado desde el botón del perfil.', noMessagesYet: 'Todavía no hay mensajes. Envía el primero.', singlePrivateThread: '1 conversación privada', choosePerson: 'Elige a una persona de la bandeja y responde aquí.', directToAdmins: 'Envía un mensaje privado directamente a los admins.', sendMessage: 'Enviar mensaje', sendReply: 'Enviar respuesta', writePrivateMessage: 'Escribe un mensaje privado...', writeReply: 'Escribe una respuesta...', selectConversationFirst: 'Selecciona primero una conversación.', newAdminReply: 'Nueva respuesta del admin', newPrivateMessage: 'Nuevo mensaje privado', privateChat: 'Chat privado', adminInbox: 'Bandeja admin', adminRole: 'Admin', userRole: 'Usuario', conversations: '{count} conversaciones' },
            visios: {
                pageTitle: 'Sesiones en directo - SIMBA PROJECT',
                title: 'Sesiones en directo',
                heroTitle: 'Sesiones en directo y videollamadas',
                heroLead: 'Planifica sesiones de vídeo públicas o privadas, controla quién puede ver cada franja y únete cuando llegue la hora.',
                calendarTitle: 'Calendario',
                heroCardBody: 'Crea franjas privadas con un admin o publica sesiones en directo para todo el mundo.',
                adminTitle: 'Calendario admin',
                adminBody: 'Crea franjas públicas para todo el mundo o franjas privadas para personas concretas.',
                requestTitle: 'Pedir una sesión en directo',
                requestBody: 'Reserva una franja privada con un admin. Solo tú y los admins pueden verla.',
                requestMeeting: 'Pedir franja privada',
                subjectLabel: 'Asunto',
                dateLabel: 'Fecha',
                timeLabel: 'Hora',
                durationLabel: 'Duración',
                duration30: '30 min',
                duration45: '45 min',
                duration60: '60 min',
                duration90: '90 min',
                visibilityLabel: 'Visibilidad',
                publicOption: 'Pública',
                privateOption: 'Privada',
                inviteesLabel: 'Correos invitados',
                inviteesPlaceholder: 'amigo@ejemplo.com, colega@ejemplo.com',
                createMeeting: 'Crear franja',
                descriptionLabel: 'Descripción',
                loading: 'Cargando...',
                missingFields: 'Rellena el título, la fecha y la hora.',
                invalidDate: 'Fecha u hora no válidas.',
                upcomingTitle: 'Próximas sesiones',
                noMeetings: 'Aún no hay sesiones en directo.',
                joinCall: 'Unirse a la llamada',
                startsAt: 'Empieza a las',
                endsAt: 'Termina a las',
                onlyGuests: 'Franja privada. Solo las personas invitadas pueden verla.',
                publicMeeting: 'Sesión pública',
                privateMeeting: 'Sesión privada',
                groupMeeting: 'Sesión de grupo',
                statusPending: 'Pendiente de aprobación',
                statusApproved: 'Aprobada',
                statusRejected: 'Rechazada',
                reviewQueueTitle: 'Solicitudes por revisar',
                reviewQueueBody: 'Aprueba una solicitud antes de que la sesión pueda ocurrir.',
                noPendingRequests: 'No hay solicitudes pendientes de aprobación.',
                approveRequest: 'Aprobar',
                rejectRequest: 'Rechazar',
                rejectionReasonLabel: 'Motivo del rechazo',
                rejectionReasonPlaceholder: 'Explica por qué se rechaza esta solicitud',
                rejectionReasonRequired: 'Indica un motivo.',
                approvalRequired: 'Esperando la aprobación de un admin.',
                requestPending: 'Esta solicitud espera la aprobación de un admin.',
                requestApproved: 'Esta solicitud ha sido aprobada.',
                requestRejected: 'Esta solicitud ha sido rechazada.',
                rejectionReason: 'Motivo: {reason}',
                couldNotUpdateApproval: 'No se pudo actualizar esta solicitud.',
                privateAppointment: 'Cita privada',
                joinNow: 'Unirse ahora',
                waitForStart: 'Empieza en {time}',
                ended: 'Terminada',
                accessDenied: 'No tienes acceso a esta sesión.',
                roomTitle: 'Sala de sesión',
                roomLead: 'Controles de cámara y micrófono para esta reunión.',
                startCamera: 'Encender cámara',
                stopCamera: 'Apagar cámara',
                startMic: 'Encender micrófono',
                stopMic: 'Apagar micrófono',
                shareScreen: 'Compartir pantalla',
                openChat: 'Abrir chat',
                chatIntro: 'El chat es local a esta sesión del navegador por ahora.',
                chatPlaceholder: 'Escribe un mensaje',
                sendMessage: 'Enviar',
                leaveCall: 'Salir de la llamada',
                participantCamera: 'Cámara',
                participantMic: 'Micrófono',
                participantsLabel: 'Participantes',
                waitingMedia: 'Activa la cámara o el micrófono para unirte a la llamada.',
                joinRoom: 'Entrar en la sala',
                backToCalendar: 'Volver al calendario',
                requestCreated: 'Solicitud creada.',
                shareUnavailable: 'El uso compartido de pantalla no está disponible en este navegador.',
                sharingScreen: 'Estás compartiendo tu pantalla.',
                youLabel: 'Tú',
                weekDays: { mon: 'Lun', tue: 'Mar', wed: 'Mié', thu: 'Jue', fri: 'Vie', sat: 'Sáb', sun: 'Dom' },
                publicRoom: 'Sala pública',
                privateRoom: 'Sala privada'
            },
            profile: { notLoggedIn: 'No has iniciado sesión', loginPrompt: 'Inicia sesión para ver tu perfil.', editProfile: 'Editar perfil', message: 'Mensaje', quickStats: 'Estadísticas rápidas', threadCount: 'Temas', testsDone: 'Tests realizados', unreadMessages: 'Mensajes no leídos', tests: 'Pruebas', avgScore: 'Promedio', rank: 'Rango', about: 'Acerca de', aboutBody: 'Este es tu perfil. Puedes actualizar tu nombre visible, biografía y avatar.', scoreHistory: 'Historial de puntuaciones', noTestsYet: 'Todavía no hay pruebas', showingAll: 'Mostrando todos los resultados ({count})', showingRecent: 'Mostrando tus 5 resultados más recientes', seeMore: 'Ver más', showLess: 'Ver menos', noScores: 'Todavía no hay puntuaciones', test: 'Prueba', result: 'Resultado', unknownDate: 'Fecha desconocida', displayName: 'Nombre visible', bio: 'Biografía', profilePhoto: 'Foto de perfil', saveChanges: 'Guardar cambios', cancel: 'Cancelar', pageTitle: 'Perfil - SIMBA PROJECT', yourName: 'Tu nombre', yourBio: 'Tu biografía', notifications: 'Notificaciones', adminTools: 'Herramientas admin', adminToolsDescription: 'Conceder o retirar acceso admin a cuentas existentes.', adminEmailPlaceholder: 'Dirección de correo', makeAdmin: 'Hacer admin', removeAdmin: 'Quitar admin', viewProfile: 'Ver un perfil', viewProfileDescription: 'Abre otra cuenta para revisar su perfil y la actividad del foro.', profileLookupPlaceholder: 'Dirección de correo', openProfile: 'Abrir perfil', backToMyProfile: 'Volver a mi perfil', forumActivity: 'Actividad del foro', activePosts: 'Publicaciones activas', deletedPosts: 'Publicaciones eliminadas', postLabel: 'Publicación', replyLabel: 'Respuesta', noPostsYet: 'Todavía no hay publicaciones', noDeletedPostsYet: 'Todavía no hay publicaciones eliminadas', profileSaved: 'Perfil guardado', enterEmailFirst: 'Introduce primero una dirección de correo.', accountNotFound: 'Cuenta no encontrada.', couldNotPromote: 'No se pudo promocionar esta cuenta.', adminGranted: 'Acceso admin concedido.', couldNotRemove: 'No se pudo retirar el acceso admin.', adminAccessRemoved: 'Acceso admin retirado.', adminBadge: 'Admin' },
            modal: { loginTitle: 'Iniciar sesión', signupTitle: 'Registrarse', profileTitle: 'Tu perfil', email: 'Correo', password: 'Contraseña', loginButton: 'Iniciar sesión', signupButton: 'Registrarse', logout: 'Cerrar sesión', pleaseLogin: 'Primero inicia sesión.', displayName: 'Nombre visible', bio: 'Biografía', uploadAvatar: 'Avatar personalizado (subir)', saveProfile: 'Guardar perfil', enterCredentials: 'Introduce correo y contraseña', noSuchUser: 'No existe ese usuario (local)', invalidCredentials: 'Credenciales no válidas', emailExists: 'Ese correo ya existe (local)', profileSaved: 'Perfil guardado', profileSavedLocal: 'Perfil guardado (local)', profileSavedServer: 'Perfil guardado (servidor)' },
            theme: { learnMore: 'Saber más' },
            dropdown: { allTests: 'Todas las pruebas', relationships: 'Relaciones', mentalHealth: 'Salud mental', personalGrowth: 'Crecimiento personal', neurodiversity: 'Neurodiversidad', mindBody: 'Mente y cuerpo' },
            pages: {
                contact: { title: 'Contacto', body1: 'Nos encantaria saber de ti. Si tienes preguntas, comentarios o quieres compartir tus ideas sobre SIMBA PROJECT, no dudes en contactarnos.', body2: 'Tu aporte nos ayuda a crear una comunidad mejor y mas solidaria para todos en su camino de salud mental.', body3: 'Proximamente: formulario de contacto y mensajeria directa con nuestro equipo de apoyo.', body4: 'Mientras tanto, puedes encontrarnos en nuestras redes sociales:', messageButton: 'Enviar un mensaje privado', youtube: 'YouTube: @simbaproject', instagram: 'Instagram: @simbaproject', whatsapp: 'WhatsApp: disponible para apoyo y preguntas' },
                about: { title: 'Sobre nosotros', missionTitle: 'Nuestra mision', missionBody: 'SIMBA PROJECT apoya la salud mental y el crecimiento personal mediante educacion, comunidad y recursos basados en evidencia. Creemos que cada lucha puede ser una llamada a la aventura - una oportunidad de transformacion y crecimiento.', visionTitle: 'Nuestra vision', visionBody: 'Imaginamos un mundo donde la salud mental sea una prioridad, el estigma desaparezca y todas las personas tengan acceso a herramientas y apoyo para iniciar su propio viaje.', journeyTitle: 'El viaje del heroe', journeyBody: 'Inspirados por el monomito de Joseph Campbell, vemos los retos de salud mental como parte de una narrativa mas amplia de crecimiento y transformacion. Como los heroes de las grandes historias, todos enfrentamos desafios que nos llaman a crecer, adaptarnos y descubrir nuestra fuerza interior.', valuesTitle: 'Nuestros valores', compassion: 'Compasion: abordamos la salud mental con empatia y comprension.', education: 'Educacion: ofrecemos informacion basada en evidencia para fortalecer a nuestra comunidad.', community: 'Comunidad: fomentamos un entorno de apoyo donde todos pertenecen.', growth: 'Crecimiento: creemos en el potencial de desarrollo personal continuo.' }
            },
                theme: { comingSoon: 'Próximamente', comingSoonBody: 'Esta página estará disponible pronto.' },
            quiz: { kicker: 'Pruebas de 10 preguntas por tema', title: 'Explora cada tema uno por uno', lead: 'Elige un tema, responde 10 preguntas y mira si muestras pocas, algunas o fuertes senales. Los resultados pueden guardarse en tu perfil.', topicsAvailable: 'temas disponibles', questionsPerTest: 'preguntas por prueba', resultSaved: 'resultado guardado en el perfil', testsAvailable: '{count} pruebas disponibles', questionsBadge: '10 preguntas', alertThreshold: 'Umbral de alerta: {percent}%', start: 'Empezar', question: 'Pregunta {current} / 10', chooseAnswer: 'Elige una respuesta para continuar', back: 'Volver', result: 'Resultado', scoreReading: 'Lectura del resultado', questionsCompleted: 'Preguntas completadas', inProfile: 'En el perfil', saved: 'Guardado', notLoggedIn: 'Sin sesion', loginToSave: 'Iniciar sesion para guardar', scoreSaved: 'La puntuacion se ha anadido a tu perfil.', scoreQueued: 'Inicia sesion ahora o mas tarde para guardar esta puntuacion en tu perfil.', highSignals: 'Senales fuertes', moderateSignals: 'Senales moderadas', someSigns: 'Algunas senales', lowSigns: 'Pocas senales', affected: 'Muestras varias senales compatibles con {topic}.', calm: 'Por ahora muestras pocas senales de {topic}.', retake: 'Repetir', backToTopics: 'Volver a los temas', goToTopicPage: 'Ir a la pagina del tema', scaleNever: 'Nunca', scaleSometimes: 'A veces', scaleOften: 'A menudo', scaleVeryOften: 'Muy a menudo' }
        },
        it: {
            language: { label: 'Lingua', aria: 'Scegli la lingua del sito' },
            nav: { thematics: 'Argomenti', test: 'Test', visios: 'Sessioni in diretta', forum: 'Forum', contact: 'Contatti', about: 'Chi siamo' },
            auth: { signup: 'Registrati', login: 'Accedi', signout: 'Esci' },
            cookie: { text: 'Usiamo i cookie per migliorare questo sito. Vedi la nostra informativa sulla privacy.', accept: 'Accetta tutto', reject: 'Rifiuta', manage: 'Gestisci impostazioni' },
            index: { hero: { subtitle: 'una nuova prospettiva sulla salute mentale', title: 'la tua lotta è una chiamata all’avventura' }, intro: { kicker: 'Che cos’è SIMBA?', title: 'Il sito ti aiuta a esplorare i temi della salute mentale in modo semplice.', body1: 'SIMBA si basa su test brevi e pagine chiare per ogni concetto. Puoi esplorare un tema, fare un quiz di 10 domande, leggere il risultato e salvare i tuoi punteggi nel profilo se accedi.', body2: 'L’obiettivo è rendere ogni tema facile da capire e facile da ritrovare, così puoi passare dalla curiosità all’auto-osservazione senza perderti.' }, categories: { relationships: 'Relazioni', 'mental-health': 'Salute mentale', 'personal-growth': 'Crescita', neurodiversity: 'Neurodiversità', 'mind-body': 'Mente e corpo' } },
            forum: { kicker: 'Forum', title: 'Fai domande, rispondi e parla dei temi insieme.', lead: 'Uno spazio breve per domande, supporto e conversazione. Pubblica un messaggio, rispondi agli altri e tieni viva la discussione.', stepsTitle: 'Come funziona', step1: 'Pubblica una domanda o un’idea.', step2: 'Rispondi con supporto o consiglio.', step3: 'Rimani rispettoso.', startTopic: 'Crea un argomento', postTitle: 'Fai una domanda o avvia una discussione', publicBoard: 'Bacheca pubblica', topicType: 'Tipo di argomento', question: 'Domanda', discussion: 'Discussione', support: 'Supporto', feedback: 'Feedback', titleLabel: 'Titolo', titlePlaceholder: 'Cosa vuoi chiedere?', messageLabel: 'Messaggio', messagePlaceholder: 'Descrivi la tua domanda o condividi il tuo punto di vista...', note: 'Sii rispettoso e preciso.', postMessage: 'Pubblica messaggio', communityThreads: 'Argomenti della community', latestMessages: 'Ultimi messaggi', noPosts: 'Nessun messaggio ancora. Sii la prima persona ad avviare la conversazione.', reply: 'Rispondi', replies: 'risposte', noReplies: 'Nessuna risposta ancora. Avvia la conversazione.', replyPlaceholder: 'Scrivi una risposta...', sendReply: 'Invia risposta', anonymousMessage: 'Messaggio anonimo', anonymous: 'Anonimo', reactionLoginPrompt: 'Accedi o registrati per reagire ai messaggi.', deletePost: 'Elimina post', deleteReply: 'Elimina risposta', deleteOwnPost: 'Elimina il mio post', deleteOwnReply: 'Elimina la mia risposta', deleteDialogTitle: 'Elimina post', deleteDialogHelp: 'Scegli un motivo prima di eliminare questo post.', otherReason: 'Altro motivo', deleteConfirm: 'Elimina', deletePermanentlyConfirm: 'Eliminare definitivamente questo post?', couldNotDelete: 'Impossibile eliminare questo post.', provideReason: 'Inserisci un motivo.', enterEmailFirst: 'Inserisci prima un indirizzo email.', accountNotFound: 'Account non trovato.', couldNotPromote: 'Impossibile promuovere questo account.', adminGranted: 'Accesso admin concesso.', couldNotRemove: 'Impossibile rimuovere l’accesso admin.', adminAccessRemoved: 'Accesso admin rimosso.', postDeletedNotificationTitle: 'Il tuo post del forum è stato eliminato', postDeletedNotificationBody: 'Una moderazione ha eliminato il tuo {type}. Motivo: {reason}' },
            messages: { title: 'Messaggi - SIMBA PROJECT', pageTitle: 'Messaggi', sidebarBody: 'Conversazioni private e inbox admin.', refresh: 'Aggiorna', overview: 'Panoramica', back: 'Indietro', conversationsLabel: 'Conversazioni', testsDone: 'Test effettuati', threads: 'Conversazioni', unread: 'Non letti', role: 'Ruolo', heading: 'Messaggi', hint: 'Apri una conversazione privata e rispondi senza pubblicare in pubblico.', noLoginTitle: 'Non hai effettuato l’accesso', noLoginBody: 'Accedi per usare i messaggi privati.', noLoginThread: 'Ti serve un account per usare i messaggi privati.', noConversations: 'Nessuna conversazione ancora.', noConversationSelected: 'Nessuna conversazione selezionata', startFromProfile: 'Avvia un messaggio privato dal pulsante profilo.', noMessagesYet: 'Nessun messaggio ancora. Invia il primo.', singlePrivateThread: '1 chat privata', choosePerson: 'Scegli una persona dalla inbox e rispondi qui.', directToAdmins: 'Invia un messaggio privato direttamente agli admin.', sendMessage: 'Invia messaggio', sendReply: 'Invia risposta', writePrivateMessage: 'Scrivi un messaggio privato...', writeReply: 'Scrivi una risposta...', selectConversationFirst: 'Seleziona prima una conversazione.', newAdminReply: 'Nuova risposta admin', newPrivateMessage: 'Nuovo messaggio privato', privateChat: 'Chat privata', adminInbox: 'Inbox admin', adminRole: 'Admin', userRole: 'Utente', conversations: '{count} conversazioni' },
            visios: {
                pageTitle: 'Sessioni in diretta - SIMBA PROJECT',
                title: 'Sessioni in diretta',
                heroTitle: 'Sessioni in diretta e videochiamate',
                heroLead: 'Organizza sessioni video pubbliche o private, controlla chi può vedere ogni fascia oraria e unisciti quando arriva il momento.',
                calendarTitle: 'Calendario',
                heroCardBody: 'Crea fasce private con un admin o pubblica sessioni in diretta di gruppo per tutti.',
                adminTitle: 'Calendario admin',
                adminBody: 'Crea fasce pubbliche per tutti o fasce private solo per persone selezionate.',
                requestTitle: 'Richiedi una sessione in diretta',
                requestBody: 'Prenota una fascia privata con un admin. Solo tu e gli admin potete vederla.',
                requestMeeting: 'Richiedi fascia privata',
                subjectLabel: 'Oggetto',
                dateLabel: 'Data',
                timeLabel: 'Ora',
                durationLabel: 'Durata',
                duration30: '30 min',
                duration45: '45 min',
                duration60: '60 min',
                duration90: '90 min',
                visibilityLabel: 'Visibilità',
                publicOption: 'Pubblica',
                privateOption: 'Privata',
                inviteesLabel: 'Email invitate',
                inviteesPlaceholder: 'amico@esempio.com, collega@esempio.com',
                createMeeting: 'Crea fascia',
                descriptionLabel: 'Descrizione',
                loading: 'Caricamento...',
                missingFields: 'Compila titolo, data e ora.',
                invalidDate: 'Data o ora non valida.',
                upcomingTitle: 'Prossime sessioni',
                noMeetings: 'Nessuna sessione in diretta per ora.',
                joinCall: 'Unisciti alla chiamata',
                startsAt: 'Inizia alle',
                endsAt: 'Finisce alle',
                onlyGuests: 'Fascia privata. Solo le persone invitate possono vederla.',
                publicMeeting: 'Sessione pubblica',
                privateMeeting: 'Sessione privata',
                groupMeeting: 'Sessione di gruppo',
                statusPending: 'In attesa di approvazione',
                statusApproved: 'Approvata',
                statusRejected: 'Rifiutata',
                reviewQueueTitle: 'Richieste da esaminare',
                reviewQueueBody: 'Approva una richiesta prima che la sessione possa svolgersi.',
                noPendingRequests: 'Nessuna richiesta in attesa di approvazione.',
                approveRequest: 'Approva',
                rejectRequest: 'Rifiuta',
                rejectionReasonLabel: 'Motivo del rifiuto',
                rejectionReasonPlaceholder: 'Spiega perché questa richiesta viene rifiutata',
                rejectionReasonRequired: 'Inserisci un motivo.',
                approvalRequired: 'In attesa dell’approvazione di un admin.',
                requestPending: 'Questa richiesta è in attesa dell’approvazione di un admin.',
                requestApproved: 'Questa richiesta è stata approvata.',
                requestRejected: 'Questa richiesta è stata rifiutata.',
                rejectionReason: 'Motivo: {reason}',
                couldNotUpdateApproval: 'Impossibile aggiornare questa richiesta.',
                privateAppointment: 'Appuntamento privato',
                joinNow: 'Unisciti ora',
                waitForStart: 'Inizia tra {time}',
                ended: 'Terminata',
                accessDenied: 'Non hai accesso a questa sessione.',
                roomTitle: 'Sala sessione',
                roomLead: 'Controlli per videocamera e microfono di questa riunione.',
                startCamera: 'Accendi videocamera',
                stopCamera: 'Spegni videocamera',
                startMic: 'Accendi microfono',
                stopMic: 'Spegni microfono',
                shareScreen: 'Condividi schermo',
                openChat: 'Apri chat',
                chatIntro: 'Per ora la chat è locale a questa sessione del browser.',
                chatPlaceholder: 'Scrivi un messaggio',
                sendMessage: 'Invia',
                leaveCall: 'Esci dalla chiamata',
                participantCamera: 'Videocamera',
                participantMic: 'Microfono',
                participantsLabel: 'Partecipanti',
                waitingMedia: 'Attiva la videocamera o il microfono per entrare nella chiamata.',
                joinRoom: 'Entra nella sala',
                backToCalendar: 'Torna al calendario',
                requestCreated: 'Richiesta creata.',
                shareUnavailable: 'La condivisione schermo non è disponibile in questo browser.',
                sharingScreen: 'Stai condividendo lo schermo.',
                youLabel: 'Tu',
                weekDays: { mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Gio', fri: 'Ven', sat: 'Sab', sun: 'Dom' },
                publicRoom: 'Sala pubblica',
                privateRoom: 'Sala privata'
            },
            profile: { notLoggedIn: 'Non hai effettuato l’accesso', loginPrompt: 'Accedi per vedere il tuo profilo.', editProfile: 'Modifica profilo', message: 'Messaggio', quickStats: 'Statistiche rapide', threadCount: 'Argomenti', testsDone: 'Test effettuati', unreadMessages: 'Messaggi non letti', tests: 'Test', avgScore: 'Media', rank: 'Posizione', about: 'Informazioni', aboutBody: 'Questo è il tuo profilo. Puoi aggiornare il nome visualizzato, la biografia e l’avatar.', scoreHistory: 'Cronologia punteggi', noTestsYet: 'Nessun test ancora', showingAll: 'Mostrando tutti i risultati ({count})', showingRecent: 'Mostrando i tuoi 5 risultati più recenti', seeMore: 'Mostra di più', showLess: 'Mostra meno', noScores: 'Nessun punteggio ancora', test: 'Test', result: 'Risultato', unknownDate: 'Data sconosciuta', displayName: 'Nome visualizzato', bio: 'Biografia', profilePhoto: 'Foto profilo', saveChanges: 'Salva modifiche', cancel: 'Annulla', pageTitle: 'Profilo - SIMBA PROJECT', yourName: 'Il tuo nome', yourBio: 'La tua biografia', notifications: 'Notifiche', adminTools: 'Strumenti admin', adminToolsDescription: 'Concedi o rimuovi l’accesso admin per gli account esistenti.', adminEmailPlaceholder: 'Indirizzo email', makeAdmin: 'Rendi admin', removeAdmin: 'Rimuovi admin', viewProfile: 'Visualizza un profilo', viewProfileDescription: 'Apri un altro account per controllarne il profilo e l’attività del forum.', profileLookupPlaceholder: 'Indirizzo email', openProfile: 'Apri profilo', backToMyProfile: 'Torna al mio profilo', forumActivity: 'Attività del forum', activePosts: 'Messaggi attivi', deletedPosts: 'Messaggi eliminati', postLabel: 'Messaggio', replyLabel: 'Risposta', noPostsYet: 'Nessun messaggio ancora', noDeletedPostsYet: 'Nessun messaggio eliminato ancora', profileSaved: 'Profilo salvato', enterEmailFirst: 'Inserisci prima un indirizzo email.', accountNotFound: 'Account non trovato.', couldNotPromote: 'Impossibile promuovere questo account.', adminGranted: 'Accesso admin concesso.', couldNotRemove: 'Impossibile rimuovere l’accesso admin.', adminAccessRemoved: 'Accesso admin rimosso.', adminBadge: 'Admin' },
            modal: { loginTitle: 'Accedi', signupTitle: 'Registrati', profileTitle: 'Il tuo profilo', email: 'Email', password: 'Password', loginButton: 'Accedi', signupButton: 'Registrati', logout: 'Esci', pleaseLogin: 'Prima accedi.', displayName: 'Nome visualizzato', bio: 'Biografia', uploadAvatar: 'Avatar personalizzato (carica)', saveProfile: 'Salva profilo', enterCredentials: 'Inserisci email e password', noSuchUser: 'Nessun utente trovato (locale)', invalidCredentials: 'Credenziali non valide', emailExists: 'Email già esistente (locale)', profileSaved: 'Profilo salvato', profileSavedLocal: 'Profilo salvato (locale)', profileSavedServer: 'Profilo salvato (server)' },
            theme: { learnMore: 'Scopri di più' },
            dropdown: { allTests: 'Tutti i test', relationships: 'Relazioni', mentalHealth: 'Salute mentale', personalGrowth: 'Crescita personale', neurodiversity: 'Neurodiversità', mindBody: 'Mente e corpo' },
            pages: {
                contact: { title: 'Contatti', body1: 'Ci farebbe piacere ricevere un tuo messaggio. Se hai domande, feedback o vuoi condividere i tuoi pensieri su SIMBA PROJECT, contattaci pure.', body2: 'Il tuo contributo ci aiuta a creare una comunita migliore e piu accogliente per chi sta attraversando un percorso legato alla salute mentale.', body3: 'In arrivo: modulo di contatto e messaggi diretti al nostro team di supporto.', body4: 'Nel frattempo puoi raggiungerci sui nostri canali social:', messageButton: 'Invia un messaggio privato', youtube: 'YouTube: @simbaproject', instagram: 'Instagram: @simbaproject', whatsapp: 'WhatsApp: disponibile per supporto e domande' },
                about: { title: 'Chi siamo', missionTitle: 'La nostra missione', missionBody: 'SIMBA PROJECT sostiene la salute mentale e la crescita personale attraverso educazione, comunita e risorse basate su evidenze. Crediamo che ogni difficolta possa essere una chiamata all’avventura - un’opportunita di trasformazione e crescita.', visionTitle: 'La nostra visione', visionBody: 'Immaginiamo un mondo in cui la salute mentale sia una priorita, lo stigma venga eliminato e ogni persona abbia accesso agli strumenti e al supporto necessari per il proprio viaggio.', journeyTitle: 'Il viaggio dell’eroe', journeyBody: 'Ispirati dal monomito di Joseph Campbell, vediamo le sfide di salute mentale come parte di una storia piu ampia di crescita e trasformazione. Come gli eroi delle grandi storie, affrontiamo sfide che ci invitano a crescere, adattarci e scoprire la nostra forza interiore.', valuesTitle: 'I nostri valori', compassion: 'Compassione: affrontiamo la salute mentale con empatia e comprensione.', education: 'Educazione: offriamo informazioni basate su evidenze per dare forza alla nostra comunita.', community: 'Comunita: promuoviamo un ambiente di supporto in cui tutti hanno un posto.', growth: 'Crescita: crediamo nel potenziale di sviluppo personale continuo.' }
            },
                theme: { comingSoon: 'In arrivo', comingSoonBody: 'Questa pagina sarà disponibile a breve.' },
            quiz: { kicker: 'Test da 10 domande per argomento', title: 'Esplora ogni argomento uno alla volta', lead: 'Scegli un argomento, rispondi a 10 domande e scopri se mostri pochi, alcuni o forti segnali. I risultati possono essere salvati nel tuo profilo.', topicsAvailable: 'argomenti disponibili', questionsPerTest: 'domande per test', resultSaved: 'risultato salvato nel profilo', testsAvailable: '{count} test disponibili', questionsBadge: '10 domande', alertThreshold: 'Soglia di attenzione: {percent}%', start: 'Inizia', question: 'Domanda {current} / 10', chooseAnswer: 'Scegli una risposta per continuare', back: 'Indietro', result: 'Risultato', scoreReading: 'Lettura del punteggio', questionsCompleted: 'Domande completate', inProfile: 'Nel profilo', saved: 'Salvato', notLoggedIn: 'Non connesso', loginToSave: 'Accedi per salvare', scoreSaved: 'Il punteggio e stato aggiunto al tuo profilo.', scoreQueued: 'Accedi ora o piu tardi per salvare questo punteggio nel profilo.', highSignals: 'Segnali forti', moderateSignals: 'Segnali moderati', someSigns: 'Alcuni segnali', lowSigns: 'Pochi segnali', affected: 'Mostri diversi segnali compatibili con {topic}.', calm: 'Per ora mostri pochi segnali di {topic}.', retake: 'Rifai', backToTopics: 'Torna agli argomenti', goToTopicPage: 'Vai alla pagina dell’argomento', scaleNever: 'Mai', scaleSometimes: 'A volte', scaleOften: 'Spesso', scaleVeryOften: 'Molto spesso' }
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
            'visios.html': 'nav.visios',
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
