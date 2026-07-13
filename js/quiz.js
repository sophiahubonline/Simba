(function() {
    const topics = [
        { id: 'attachment', title: 'Attachment', category: 'relationships', summary: 'How you bond, trust, and react to distance.' },
        { id: 'family_conflict', title: 'Family Conflict', category: 'relationships', summary: 'How family tension affects your balance.' },
        { id: 'unfairness_relationships', title: 'Unfairness in Relationships', category: 'relationships', summary: 'Whether your relationships feel balanced.' },
        { id: 'social_anxiety', title: 'Social Anxiety', category: 'mental-health', summary: 'Fear, avoidance, and overthinking in social settings.' },
        { id: 'fomo', title: 'FOMO', category: 'mind-body', summary: 'How often fear of missing out drives comparison.' },
        { id: 'ocd', title: 'OCD', category: 'mental-health', summary: 'Intrusive thoughts, checking, and rituals.' },
        { id: 'ptsd', title: 'PTSD', category: 'mental-health', summary: 'Trauma triggers, hypervigilance, and re-experiencing.' },
        { id: 'burnout', title: 'Burnout', category: 'mental-health', summary: 'Exhaustion, detachment, and loss of energy.' },
        { id: 'dissociation', title: 'Dissociation', category: 'mental-health', summary: 'Unreality, autopilot, and memory gaps under stress.' },
        { id: 'binge_eating_disorder', title: 'Binge Eating Disorder', category: 'mental-health', summary: 'Loss of control, guilt, and emotional relief through eating.' },
        { id: 'insomnia', title: 'Insomnia', category: 'mental-health', summary: 'Difficulty falling asleep, waking up, or staying asleep.' },
        { id: 'resilience', title: 'Resilience', category: 'personal-growth', summary: 'Your ability to recover and adapt after setbacks.' },
        { id: 'imposter_syndrome', title: 'Imposter Syndrome', category: 'personal-growth', summary: 'Whether you downplay success or fear being exposed.' },
        { id: 'procrastination', title: 'Procrastination', category: 'personal-growth', summary: 'Delay, avoidance, and pressure from unfinished tasks.' },
        { id: 'helplessness', title: 'Helplessness', category: 'personal-growth', summary: 'Feeling stuck, powerless, or discouraged from acting.' },
        { id: 'feedback_circuit', title: 'The Feedback Circuit', category: 'personal-growth', summary: 'How feedback and critique affect you.' },
        { id: 'adhd', title: 'ADHD', category: 'neurodiversity', summary: 'Attention, time management, restlessness, and switching tasks.' },
        { id: 'dreams', title: 'Dreams', category: 'mind-body', summary: 'Dream recall, vividness, and emotional weight.' },
        { id: 'pms', title: 'PMS', category: 'mind-body', summary: 'Premenstrual symptoms and their impact on life.' },
        { id: 'mental_load', title: 'Mental Load', category: 'mind-body', summary: 'Invisible planning, remembering, and exhaustion.' }
    ];

    const questionTemplates = {
        attachment: [
            'I often fear that people close to me will pull away.',
            'I need reassurance about where I stand in other people\'s lives.',
            'I become attached to someone quickly and intensely.',
            'I struggle with silence or delayed replies.',
            'I have trouble trusting without repeated proof.',
            'I can become anxious when someone I care about creates distance.',
            'I often check whether a relationship still feels secure.',
            'I sometimes hold on to a relationship rather than risk losing the bond.',
            'I strongly feel conflicts around closeness or distance.',
            'I recognize repeated patterns of emotional dependency or fear of abandonment.'
        ],
        family_conflict: [
            'Family conversations often become tense or heavy.',
            'I avoid certain topics to prevent conflict.',
            'I feel emotionally drained after family interactions.',
            'I feel caught in the middle of family disagreements.',
            'Family criticism stays with me for a long time.',
            'I feel forced to act as the mediator in family situations.',
            'Family gatherings or meals make me tense.',
            'I keep unresolved family conflicts inside me.',
            'I sometimes feel pressure to stay loyal at the expense of my well-being.',
            'Family tension clearly affects my mood or sleep.'
        ],
        unfairness_relationships: [
            'I often feel like I give more than I receive.',
            'I feel frustrated when my efforts are not recognized.',
            'I sometimes tolerate unequal situations for too long.',
            'I often feel shortchanged in my relationships.',
            'I find it hard to set limits when I sense a lack of fairness.',
            'I notice resentment building up toward certain people.',
            'I feel that my needs come after everyone else\'s.',
            'I can stay in a relationship out of habit even when it feels unbalanced.',
            'I pay close attention to reciprocity and mutual respect.',
            'Relationship unfairness affects me deeply and for a long time.'
        ],
        social_anxiety: [
            'I often worry that other people are judging me.',
            'Social interactions take a lot of mental energy from me.',
            'I replay conversations in my head for a long time afterward.',
            'I avoid events because I fear feeling awkward.',
            'I monitor my behavior closely when I am with people.',
            'I worry about seeming weird, annoying, or not good enough.',
            'I notice physical stress symptoms before or during social situations.',
            'I feel safer when I can predict exactly what will happen.',
            'Speaking in groups or taking the floor takes real effort from me.',
            'The anticipation of social situations is sometimes harder than the event itself.'
        ],
        fomo: [
            'I often check what other people are doing so I do not miss anything.',
            'I feel restless when I see activities I am not part of.',
            'I say yes too quickly out of fear of missing an opportunity.',
            'Social media increases comparison and urgency for me.',
            'I struggle to stay calm when I know something is happening without me.',
            'I sometimes feel left out if I am not invited.',
            'I struggle to enjoy the present when I think about what I might miss.',
            'I often compare my life to other people\'s lives.',
            'I feel guilty when I say no to an outing or invitation.',
            'The fear of missing out influences my choices more often than I would like.'
        ],
        ocd: [
            'I sometimes check the same thing several times to calm myself down.',
            'Intrusive thoughts upset me even when I know they are not logical.',
            'I have trouble leaving a task incomplete or imperfect.',
            'I feel the need to repeat certain actions or thoughts.',
            'Uncertainty is especially difficult for me.',
            'I can spend a lot of time trying to neutralize a worry.',
            'I often seek reassurance or repeated validation.',
            'I feel forced to follow very strict personal rules.',
            'Rituals sometimes take more time than expected.',
            'These thoughts or habits clearly disrupt my day.'
        ],
        ptsd: [
            'Certain memories or sensations trigger strong distress.',
            'I avoid places, people, or topics linked to a difficult event.',
            'I can stay on guard without any obvious reason.',
            'Images or flashbacks can return intrusively.',
            'My sleep is sometimes disturbed by nightmares or tension.',
            'I startle or become alert very quickly.',
            'I sometimes feel like my body stays in survival mode.',
            'I feel guilt, shame, or deep sadness related to this experience.',
            'I feel detached from certain emotions or from my surroundings when triggered.',
            'These reactions have a real impact on my daily life.'
        ],
        burnout: [
            'I feel drained even after a break.',
            'Routine tasks require much more effort than before.',
            'I feel a sense of distance or weariness toward what I do.',
            'I am often mentally or physically tired.',
            'I have less desire or motivation than usual.',
            'I feel irritated or on edge quite easily.',
            'I struggle to recover even when I sleep or rest.',
            'I can feel my concentration dropping noticeably.',
            'I feel like I have taken on too much for too long.',
            'Overwork clearly affects my quality of life.'
        ],
        dissociation: [
            'I sometimes feel detached from myself.',
            'Certain situations make me feel like I am on autopilot.',
            'I sometimes have trouble clearly remembering what just happened.',
            'The world can feel blurry, unreal, or far away.',
            'When I am very stressed, I feel like I mentally disconnect.',
            'I sometimes feel cut off from my emotions or my body.',
            'Time can feel strange or confusing to me.',
            'I have felt like I was watching a scene from the outside.',
            'I can feel numb or absent during difficult moments.',
            'These episodes worry me or disrupt my day.'
        ],
        binge_eating_disorder: [
            'I sometimes eat more than I planned and feel out of control with the amount.',
            'I eat quickly when I feel overwhelmed by an emotion.',
            'I sometimes keep eating even when I already feel full.',
            'I sometimes eat alone because I feel embarrassed or ashamed.',
            'After some episodes, I feel guilty or disgusted.',
            'I sometimes use food to calm tension, emptiness, or stress.',
            'I often think about food even outside of meals.',
            'I have trouble stopping once an episode starts.',
            'These episodes frustrate me and weigh on me emotionally.',
            'Food has become a topic that takes up too much space in my life.'
        ],
        insomnia: [
            'I often have trouble falling asleep.',
            'I wake up several times during the night.',
            'I ruminate or anticipate too much when I try to sleep.',
            'I feel tired during the day because of poor sleep.',
            'I sometimes dread going to bed.',
            'It takes me a long time to fall back asleep after waking up.',
            'My sleep is irregular and hard to predict.',
            'I feel that stress disrupts my rest.',
            'I sometimes compensate with naps or late-night screen time.',
            'Sleep problems clearly affect my mood or concentration.'
        ],
        resilience: [
            'I usually manage to bounce back after a difficulty.',
            'I can learn from mistakes without getting stuck on them.',
            'I look for solutions instead of staying frozen.',
            'I rely on helpful resources or trusted people quite easily.',
            'Unexpected changes unsettle me less than before.',
            'I often keep some hope even in difficult periods.',
            'I know how to adapt when plans change.',
            'I speak to myself kindly when something goes wrong.',
            'I manage to keep going despite obstacles.',
            'I notice a real ability to recover and move forward.'
        ],
        imposter_syndrome: [
            'I sometimes think my success is mostly due to luck.',
            'I fear people will discover that I am not as competent as they think.',
            'I minimize my strengths or achievements easily.',
            'I compare myself a lot to people I consider better than me.',
            'Compliments can make me uncomfortable.',
            'I tend to overdo things to avoid mistakes.',
            'I often doubt whether I truly belong where I am.',
            'I feel strong pressure to be perfect.',
            'I worry about being judged if I show weakness.',
            'Success does not always calm my doubts.'
        ],
        procrastination: [
            'I often put off important tasks even when they stress me out.',
            'I start late because I wait for the right mood or moment.',
            'Tasks sometimes feel heavier than they really are.',
            'I get distracted when I should be making progress on something.',
            'I tend to wait until the last minute to really get to work.',
            'I feel relief only once I finally start.',
            'Breaking a task into small steps helps me or is something I often miss.',
            'I feel guilty after delaying too long.',
            'I avoid tasks that feel vague or long more easily.',
            'Procrastination costs me time, energy, or peace of mind.'
        ],
        helplessness: [
            'I sometimes feel like my actions change very little.',
            'I get discouraged quickly when a problem lasts too long.',
            'I can struggle to believe that a solution exists.',
            'I sometimes feel passive when facing difficulties.',
            'I tend to give up faster when I feel overwhelmed.',
            'I sometimes feel that effort does not matter much.',
            'I feel less motivated to try new approaches.',
            'I feel vulnerable when things are out of my control.',
            'I notice that I ask for less help than I could.',
            'The feeling of powerlessness clearly holds me back.'
        ],
        feedback_circuit: [
            'I usually see feedback as a chance to learn.',
            'Even constructive criticism can affect me deeply.',
            'I try to give feedback in a clear and respectful way.',
            'I often replay what I was told after a conversation.',
            'I understand fairly quickly what I can improve.',
            'I can become defensive when feedback surprises me.',
            'I like feedback that helps me make concrete progress.',
            'I can separate criticism from my personal value.',
            'I see feedback exchanges as mutual learning.',
            'Feedback often helps me adjust my behavior.'
        ],
        adhd: [
            'I get distracted easily even when a task matters.',
            'I sometimes forget simple things like appointments or objects.',
            'I can struggle to organize my tasks or priorities.',
            'I often feel restless inside or outside.',
            'Time sometimes feels blurry or hard to manage.',
            'I switch tasks easily without finishing the first one.',
            'I can enter a hyperfocus state on something I enjoy.',
            'Routines help me, but I have trouble keeping them.',
            'I procrastinate when a task feels long or boring.',
            'These difficulties regularly affect my daily life.'
        ],
        dreams: [
            'I often remember my dreams when I wake up.',
            'My dreams can feel very vivid or memorable.',
            'I have dreams that reflect my stress or concerns.',
            'I sometimes wake up with a strong emotion because of a dream.',
            'I notice recurring themes in my dreams.',
            'I spend time thinking about what a dream might mean.',
            'Dreams sometimes disturb my rest or mood.',
            'I sometimes have nightmares or unpleasant dreams.',
            'Sleep and dreams influence my day.',
            'I am very interested in dream life and its messages.'
        ],
        pms: [
            'Before my period, I often notice mood changes.',
            'I sometimes feel physical tension such as bloating or sensitivity.',
            'I can become more irritable or sensitive at that time.',
            'I notice stronger fatigue before my period.',
            'I sometimes have more trouble concentrating.',
            'I get stronger cravings before my period.',
            'These symptoms affect my relationships or activities.',
            'I sometimes feel a temporary dip in mood.',
            'I can anticipate these changes because they return regularly.',
            'Premenstrual symptoms have a real impact on my daily life.'
        ],
        mental_load: [
            'I constantly think about what needs to be done, even when resting.',
            'I often need to keep several things in mind at once.',
            'I feel like I carry the mental organization for everyone.',
            'I rarely forget things because I stay in constant mental alertness.',
            'I feel exhausted by managing daily life mentally.',
            'I often plan ahead to avoid being overwhelmed.',
            'I have to think about details that others do not always notice.',
            'This invisible load makes it feel like I never fully disconnect.',
            'I find it hard to truly delegate tasks.',
            'Mental load takes up too much space in my life.'
        ]
    };

    const localizedQuestionTemplates = {
        fr: {
            attachment: [
                'J’ai souvent peur que les personnes proches de moi s’éloignent.',
                'J’ai besoin d’être rassuré sur la place que j’occupe dans la vie des autres.',
                'Je m’attache rapidement et intensément à quelqu’un.',
                'J’ai du mal avec les silences ou les réponses tardives.',
                'J’ai du mal à faire confiance sans preuves répétées.',
                'Je peux devenir anxieux quand une personne importante prend de la distance.',
                'Je vérifie souvent si une relation est encore sécurisante.',
                'Je m’accroche parfois à une relation plutôt que de risquer de perdre le lien.',
                'Je ressens fortement les tensions autour de la proximité ou de la distance.',
                'Je reconnais des schémas répétés de dépendance émotionnelle ou de peur de l’abandon.'
            ],
            family_conflict: [
                'Les conversations familiales deviennent souvent tendues ou lourdes.',
                'J’évite certains sujets pour empêcher un conflit.',
                'Je me sens vidé émotionnellement après des interactions familiales.',
                'Je me sens pris au milieu des désaccords familiaux.',
                'Les critiques familiales restent longtemps dans ma tête.',
                'Je me sens obligé de jouer le rôle de médiateur dans ma famille.',
                'Les réunions ou repas de famille me rendent tendu.',
                'Je garde en moi des conflits familiaux non résolus.',
                'Je ressens parfois une pression à rester loyal au détriment de mon bien-être.',
                'Les tensions familiales affectent clairement mon humeur ou mon sommeil.'
            ],
            unfairness_relationships: [
                'J’ai souvent l’impression de donner plus que je ne reçois.',
                'Je me sens frustré quand mes efforts ne sont pas reconnus.',
                'Je tolère parfois trop longtemps des situations inégales.',
                'Je me sens souvent lésé dans mes relations.',
                'J’ai du mal à poser des limites quand je sens un manque d’équité.',
                'Je remarque que de la rancœur s’accumule envers certaines personnes.',
                'J’ai l’impression que mes besoins passent après ceux des autres.',
                'Je peux rester dans une relation par habitude même quand elle semble déséquilibrée.',
                'Je fais très attention à la réciprocité et au respect mutuel.',
                'L’injustice dans les relations me touche profondément et longtemps.'
            ],
            social_anxiety: [
                'Je crains souvent que les autres me jugent.',
                'Les interactions sociales me demandent beaucoup d’énergie mentale.',
                'Je repasse longtemps les conversations dans ma tête après coup.',
                'J’évite des événements parce que j’ai peur de me sentir mal à l’aise.',
                'Je surveille beaucoup mon comportement quand je suis avec des gens.',
                'J’ai peur de paraître bizarre, agaçant ou pas assez bien.',
                'Je ressens des symptômes physiques de stress avant ou pendant des situations sociales.',
                'Je me sens plus en sécurité quand je peux prévoir exactement ce qui va se passer.',
                'Prendre la parole en groupe me demande un vrai effort.',
                'L’anticipation des situations sociales est parfois plus difficile que l’événement lui-même.'
            ],
            fomo: [
                'Je regarde souvent ce que font les autres pour ne rien manquer.',
                'Je me sens agité quand je vois des activités auxquelles je ne participe pas.',
                'Je dis oui trop vite par peur de rater une occasion.',
                'Les réseaux sociaux augmentent la comparaison et l’urgence chez moi.',
                'J’ai du mal à rester calme quand je sais qu’il se passe quelque chose sans moi.',
                'Je me sens parfois exclu quand je ne suis pas invité.',
                'J’ai du mal à profiter du présent quand je pense à ce que je pourrais manquer.',
                'Je compare souvent ma vie à celle des autres.',
                'Je culpabilise quand je refuse une sortie ou une invitation.',
                'La peur de manquer quelque chose influence mes choix plus souvent que je ne voudrais.'
            ],
            ocd: [
                'Je vérifie parfois la même chose plusieurs fois pour me rassurer.',
                'Des pensées intrusives me perturbent même quand je sais qu’elles ne sont pas logiques.',
                'J’ai du mal à laisser une tâche incomplète ou imparfaite.',
                'Je ressens le besoin de répéter certaines actions ou pensées.',
                'L’incertitude est particulièrement difficile pour moi.',
                'Je peux passer beaucoup de temps à essayer de neutraliser une inquiétude.',
                'Je cherche souvent de la réassurance ou des validations répétées.',
                'Je me sens forcé de suivre des règles personnelles très strictes.',
                'Les rituels prennent parfois plus de temps que prévu.',
                'Ces pensées ou habitudes perturbent clairement ma journée.'
            ],
            ptsd: [
                'Certains souvenirs ou sensations déclenchent une forte détresse.',
                'J’évite des lieux, personnes ou sujets liés à un événement difficile.',
                'Je peux rester sur mes gardes sans raison évidente.',
                'Des images ou flashbacks peuvent revenir de façon intrusive.',
                'Mon sommeil est parfois perturbé par des cauchemars ou de la tension.',
                'Je sursaute ou deviens alerte très rapidement.',
                'J’ai parfois l’impression que mon corps reste en mode survie.',
                'Je ressens de la culpabilité, de la honte ou une grande tristesse liée à cette expérience.',
                'Je me sens détaché de certaines émotions ou de mon environnement quand je suis déclenché.',
                'Ces réactions ont un vrai impact sur ma vie quotidienne.'
            ],
            burnout: [
                'Je me sens épuisé même après une pause.',
                'Les tâches habituelles demandent beaucoup plus d’effort qu’avant.',
                'Je ressens une distance ou une lassitude envers ce que je fais.',
                'Je suis souvent fatigué mentalement ou physiquement.',
                'J’ai moins d’envie ou de motivation que d’habitude.',
                'Je me sens facilement irrité ou à cran.',
                'J’ai du mal à récupérer même quand je dors ou me repose.',
                'Je sens que ma concentration baisse nettement.',
                'J’ai l’impression d’en avoir trop porté pendant trop longtemps.',
                'Le surmenage affecte clairement ma qualité de vie.'
            ],
            dissociation: [
                'Je me sens parfois détaché de moi-même.',
                'Certaines situations me donnent l’impression d’être en pilote automatique.',
                'J’ai parfois du mal à me souvenir clairement de ce qui vient de se passer.',
                'Le monde peut me sembler flou, irréel ou lointain.',
                'Quand je suis très stressé, j’ai l’impression de me déconnecter mentalement.',
                'Je me sens parfois coupé de mes émotions ou de mon corps.',
                'Le temps peut me sembler étrange ou confus.',
                'J’ai déjà eu l’impression d’observer une scène de l’extérieur.',
                'Je peux me sentir engourdi ou absent pendant des moments difficiles.',
                'Ces épisodes m’inquiètent ou perturbent ma journée.'
            ],
            binge_eating_disorder: [
                'Je mange parfois plus que prévu et je perds le contrôle sur la quantité.',
                'Je mange vite quand une émotion me submerge.',
                'Je continue parfois à manger même quand je suis déjà rassasié.',
                'Je mange parfois seul parce que je me sens gêné ou honteux.',
                'Après certains épisodes, je ressens de la culpabilité ou du dégoût.',
                'J’utilise parfois la nourriture pour calmer une tension, un vide ou du stress.',
                'Je pense souvent à la nourriture même en dehors des repas.',
                'J’ai du mal à m’arrêter quand un épisode commence.',
                'Ces épisodes me frustrent et pèsent émotionnellement sur moi.',
                'La nourriture prend trop de place dans ma vie.'
            ],
            insomnia: [
                'J’ai souvent du mal à m’endormir.',
                'Je me réveille plusieurs fois pendant la nuit.',
                'Je rumine ou j’anticipe trop quand j’essaie de dormir.',
                'Je me sens fatigué pendant la journée à cause d’un mauvais sommeil.',
                'Je redoute parfois le moment d’aller me coucher.',
                'Il me faut longtemps pour me rendormir après un réveil.',
                'Mon sommeil est irrégulier et difficile à prévoir.',
                'J’ai l’impression que le stress perturbe mon repos.',
                'Je compense parfois avec des siestes ou des écrans tard le soir.',
                'Les problèmes de sommeil affectent clairement mon humeur ou ma concentration.'
            ],
            resilience: [
                'J’arrive généralement à rebondir après une difficulté.',
                'Je peux apprendre de mes erreurs sans rester bloqué dessus.',
                'Je cherche des solutions au lieu de rester figé.',
                'Je m’appuie assez facilement sur des ressources utiles ou des personnes de confiance.',
                'Les changements inattendus me déstabilisent moins qu’avant.',
                'Je garde souvent un peu d’espoir même dans les périodes difficiles.',
                'Je sais m’adapter quand les plans changent.',
                'Je me parle avec bienveillance quand quelque chose se passe mal.',
                'J’arrive à continuer malgré les obstacles.',
                'Je remarque une vraie capacité à récupérer et avancer.'
            ],
            imposter_syndrome: [
                'Je pense parfois que mes réussites sont surtout dues à la chance.',
                'J’ai peur que les autres découvrent que je ne suis pas aussi compétent qu’ils le pensent.',
                'Je minimise facilement mes forces ou mes réussites.',
                'Je me compare beaucoup à des personnes que je considère meilleures que moi.',
                'Les compliments peuvent me mettre mal à l’aise.',
                'J’ai tendance à en faire trop pour éviter les erreurs.',
                'Je doute souvent de ma légitimité là où je suis.',
                'Je ressens une forte pression à être parfait.',
                'J’ai peur d’être jugé si je montre une faiblesse.',
                'La réussite ne calme pas toujours mes doutes.'
            ],
            procrastination: [
                'Je repousse souvent des tâches importantes même quand elles me stressent.',
                'Je commence tard parce que j’attends la bonne humeur ou le bon moment.',
                'Les tâches me semblent parfois plus lourdes qu’elles ne le sont vraiment.',
                'Je me distrais quand je devrais avancer sur quelque chose.',
                'J’attends souvent le dernier moment pour vraiment m’y mettre.',
                'Je ressens du soulagement seulement quand je commence enfin.',
                'Découper une tâche en petites étapes m’aide, ou c’est quelque chose que j’oublie souvent.',
                'Je culpabilise après avoir trop repoussé.',
                'J’évite plus facilement les tâches vagues ou longues.',
                'La procrastination me coûte du temps, de l’énergie ou de la tranquillité.'
            ],
            helplessness: [
                'J’ai parfois l’impression que mes actions changent peu de choses.',
                'Je me décourage vite quand un problème dure trop longtemps.',
                'J’ai du mal à croire qu’une solution existe.',
                'Je me sens parfois passif face aux difficultés.',
                'J’ai tendance à abandonner plus vite quand je me sens dépassé.',
                'J’ai parfois l’impression que mes efforts ne comptent pas beaucoup.',
                'Je me sens moins motivé à essayer de nouvelles approches.',
                'Je me sens vulnérable quand les choses échappent à mon contrôle.',
                'Je remarque que je demande moins d’aide que je pourrais.',
                'Le sentiment d’impuissance me freine clairement.'
            ],
            feedback_circuit: [
                'Je vois généralement le feedback comme une occasion d’apprendre.',
                'Même une critique constructive peut me toucher profondément.',
                'J’essaie de donner un feedback clair et respectueux.',
                'Je repense souvent à ce qu’on m’a dit après une conversation.',
                'Je comprends assez vite ce que je peux améliorer.',
                'Je peux devenir défensif quand un feedback me surprend.',
                'J’aime les retours qui m’aident à progresser concrètement.',
                'Je peux séparer une critique de ma valeur personnelle.',
                'Je vois les échanges de feedback comme un apprentissage mutuel.',
                'Le feedback m’aide souvent à ajuster mon comportement.'
            ],
            adhd: [
                'Je me distrais facilement même quand une tâche est importante.',
                'J’oublie parfois des choses simples comme des rendez-vous ou des objets.',
                'J’ai du mal à organiser mes tâches ou mes priorités.',
                'Je me sens souvent agité intérieurement ou physiquement.',
                'Le temps me semble parfois flou ou difficile à gérer.',
                'Je passe facilement d’une tâche à l’autre sans finir la première.',
                'Je peux entrer dans un état d’hyperconcentration sur quelque chose qui m’intéresse.',
                'Les routines m’aident, mais j’ai du mal à les maintenir.',
                'Je procrastine quand une tâche semble longue ou ennuyeuse.',
                'Ces difficultés affectent régulièrement ma vie quotidienne.'
            ],
            dreams: [
                'Je me souviens souvent de mes rêves au réveil.',
                'Mes rêves peuvent être très vifs ou marquants.',
                'Je fais des rêves qui reflètent mon stress ou mes préoccupations.',
                'Je me réveille parfois avec une émotion forte à cause d’un rêve.',
                'Je remarque des thèmes récurrents dans mes rêves.',
                'Je passe du temps à réfléchir à ce qu’un rêve pourrait signifier.',
                'Les rêves perturbent parfois mon repos ou mon humeur.',
                'Je fais parfois des cauchemars ou des rêves désagréables.',
                'Le sommeil et les rêves influencent ma journée.',
                'Je m’intéresse beaucoup à la vie des rêves et à leurs messages.'
            ],
            pms: [
                'Avant mes règles, je remarque souvent des changements d’humeur.',
                'Je ressens parfois des tensions physiques comme des ballonnements ou une sensibilité.',
                'Je peux devenir plus irritable ou sensible à ce moment-là.',
                'Je remarque une fatigue plus forte avant mes règles.',
                'J’ai parfois plus de mal à me concentrer.',
                'J’ai des envies alimentaires plus fortes avant mes règles.',
                'Ces symptômes affectent mes relations ou mes activités.',
                'Je ressens parfois une baisse temporaire de moral.',
                'Je peux anticiper ces changements parce qu’ils reviennent régulièrement.',
                'Les symptômes prémenstruels ont un vrai impact sur ma vie quotidienne.'
            ],
            mental_load: [
                'Je pense constamment à ce qui doit être fait, même quand je me repose.',
                'Je dois souvent garder plusieurs choses en tête en même temps.',
                'J’ai l’impression de porter l’organisation mentale pour tout le monde.',
                'J’oublie rarement les choses parce que je reste en alerte mentale constante.',
                'Je me sens épuisé par la gestion mentale du quotidien.',
                'Je planifie souvent à l’avance pour éviter d’être dépassé.',
                'Je dois penser à des détails que les autres ne remarquent pas toujours.',
                'Cette charge invisible me donne l’impression de ne jamais vraiment déconnecter.',
                'J’ai du mal à déléguer réellement des tâches.',
                'La charge mentale prend trop de place dans ma vie.'
            ]
        }
    };

    const scale = [
        { label: 'Never', value: 0 },
        { label: 'Sometimes', value: 1 },
        { label: 'Often', value: 2 },
        { label: 'Very often', value: 3 }
    ];

    const passingThreshold = 55;
    const maxPerQuestion = 3;
    const topicPages = {
        attachment: 'attachment.html',
        family_conflict: 'family-conflict.html',
        unfairness_relationships: 'unfairness-relationships.html',
        social_anxiety: 'social-anxiety.html',
        fomo: 'fomo.html',
        ocd: 'ocd.html',
        ptsd: 'ptsd.html',
        burnout: 'burnout.html',
        dissociation: 'dissociation.html',
        binge_eating_disorder: 'binge-eating-disorder.html',
        insomnia: 'insomnia.html',
        resilience: 'resilience.html',
        imposter_syndrome: 'imposter-syndrome.html',
        procrastination: 'procrastination.html',
        helplessness: 'helplessness.html',
        feedback_circuit: 'feedback-circuit.html',
        adhd: 'adhd.html',
        dreams: 'dreams.html',
        pms: 'pms.html',
        mental_load: 'mental-load.html'
    };
    let activeTopicId = null;
    let answers = [];

    function t(key, fallback = '', values) {
        const raw = (window.SimbaI18n && typeof window.SimbaI18n.getTranslation === 'function')
            ? window.SimbaI18n.getTranslation(key, fallback)
            : fallback;
        return String(raw || '').replace(/\{(\w+)\}/g, (_, token) => (
            values && Object.prototype.hasOwnProperty.call(values, token) ? values[token] : ''
        ));
    }

    function topicIdToPageKey(topicId) {
        return String(topicId || '').replace(/_/g, '-');
    }

    function getTopicCopy(topic) {
        if (!topic) return { title: '', summary: '' };
        const pageKey = topicIdToPageKey(topic.id);
        if (window.SimbaI18n && typeof window.SimbaI18n.getThemeCard === 'function') {
            const copy = window.SimbaI18n.getThemeCard({ link: `${pageKey}.html`, name: topic.title, description: topic.summary });
            return {
                title: copy.name || topic.title,
                summary: copy.description || topic.summary
            };
        }
        return { title: topic.title, summary: topic.summary };
    }

    function getCategoryLabel(category) {
        const keys = {
            relationships: 'dropdown.relationships',
            'mental-health': 'dropdown.mentalHealth',
            'personal-growth': 'dropdown.personalGrowth',
            neurodiversity: 'dropdown.neurodiversity',
            'mind-body': 'dropdown.mindBody'
        };
        return t(keys[category], category);
    }

    function getScale() {
        return [
            { label: t('quiz.scaleNever', 'Never'), value: 0 },
            { label: t('quiz.scaleSometimes', 'Sometimes'), value: 1 },
            { label: t('quiz.scaleOften', 'Often'), value: 2 },
            { label: t('quiz.scaleVeryOften', 'Very often'), value: 3 }
        ];
    }

    function getQuestions(topicId) {
        const language = (window.SimbaI18n && typeof window.SimbaI18n.getCurrentLanguage === 'function')
            ? window.SimbaI18n.getCurrentLanguage()
            : 'en';
        return (localizedQuestionTemplates[language] && localizedQuestionTemplates[language][topicId])
            || questionTemplates[topicId]
            || [];
    }

    function getAppRoot() {
        return document.getElementById('quizApp');
    }

    function getCurrentUser() {
        try { return JSON.parse(localStorage.getItem('simba_user') || 'null'); } catch (e) { return null; }
    }

    function getPendingScores() {
        try { return JSON.parse(localStorage.getItem('simba_pending_quiz_scores') || '[]'); } catch (e) { return []; }
    }

    function setPendingScores(scores) {
        localStorage.setItem('simba_pending_quiz_scores', JSON.stringify(scores || []));
    }

    function queueScore(entry) {
        const pending = getPendingScores();
        pending.push(entry);
        setPendingScores(pending);
    }

    function flushPendingScores() {
        const user = getCurrentUser();
        if (!user || !user.email || typeof window.appendProfileScore !== 'function') return 0;
        const pending = getPendingScores();
        if (!pending.length) return 0;

        let latestProfile = null;
        pending.forEach((entry) => {
            latestProfile = window.appendProfileScore(entry) || latestProfile;
        });
        setPendingScores([]);
        if (latestProfile) {
            try { window.dispatchEvent(new CustomEvent('simba-profile-updated', { detail: latestProfile })); } catch (e) {}
        }
        return pending.length;
    }

    function openLogin() {
        if (typeof window.showAuthModal === 'function') {
            window.showAuthModal('login');
        }
    }

    function buildResultInterpretation(topic, percentage) {
        const topicName = topic.title.toLowerCase();
        const language = (window.SimbaI18n && typeof window.SimbaI18n.getCurrentLanguage === 'function')
            ? window.SimbaI18n.getCurrentLanguage()
            : 'en';

        if (language === 'fr') {
            if (percentage >= 75) {
                return `Tes réponses indiquent un schéma fort et récurrent autour de ${topicName}. Cela ne constitue pas un diagnostic en soi, mais cela suggère que ce thème a un impact clair sur ta façon de penser, de ressentir ou de réagir au quotidien. Si cela te parle, il peut être utile d’explorer ce schéma plus précisément, surtout les situations qui le renforcent et les moments où il s’apaise.`;
            }

            if (percentage >= 55) {
                return `Tes réponses montrent un schéma notable autour de ${topicName}. Certains signes semblent présents assez souvent pour mériter ton attention, même s’ils ne dominent pas toutes les situations. Tu fais peut-être face à un mélange d’habitudes installées et de réactions déclenchées par le stress ; observer quand ce thème apparaît le plus et ce qui l’intensifie peut t’aider.`;
            }

            if (percentage >= 30) {
                return `Tes réponses suggèrent quelques signes liés à ${topicName}, mais ils ne semblent pas particulièrement centraux pour le moment. Cela peut vouloir dire que le thème est présent de façon plus légère ou occasionnelle, ou qu’il apparaît surtout dans certains contextes. Il peut quand même être utile de le garder à l’œil, surtout si le schéma devient plus fort avec le temps ou pendant les périodes de stress.`;
            }

            return `Tes réponses suggèrent que ${topicName} n’est pas fortement présent pour le moment. Cela ne veut pas dire que ce thème est sans importance, seulement qu’il ne ressort pas comme un schéma majeur dans ce test actuellement. Si quelque chose change plus tard, les questions de ce test peuvent t’aider à repérer si ce schéma devient plus visible.`;
        }

        if (percentage >= 75) {
            return `Your answers point to a strong and recurring pattern around ${topicName}. This does not mean a diagnosis by itself, but it does suggest that this theme is having a clear impact on how you think, feel, or react in daily life. If this feels familiar, it may be worth exploring the pattern more closely, especially the situations that make it stronger and the moments where it eases.`;
        }

        if (percentage >= 55) {
            return `Your answers show a noticeable pattern around ${topicName}. Some of these signs seem present often enough to deserve attention, even if they do not dominate every situation. You may be dealing with a mix of stable habits and stress-triggered reactions, so it can help to notice when this theme shows up most and what tends to intensify it.`;
        }

        if (percentage >= 30) {
            return `Your answers suggest a few signs related to ${topicName}, but they do not appear especially central right now. This can mean the theme is present in a lighter or more occasional way, or that it only appears in certain contexts. It may still be useful to keep an eye on it, especially if the pattern becomes stronger over time or during stressful periods.`;
        }

        return `Your answers suggest that ${topicName} is not strongly present at the moment. That does not mean the theme is irrelevant, only that it is not standing out as a major pattern in this test right now. If anything changes later, the questions in this test can help you spot whether the pattern becomes more visible.`;
    }

    function groupTopics() {
        return topics.reduce((groups, topic) => {
            if (!groups[topic.category]) groups[topic.category] = [];
            groups[topic.category].push(topic);
            return groups;
        }, {});
    }

    function renderLanding() {
        const app = getAppRoot();
        if (!app) return;

        const groups = groupTopics();
        app.innerHTML = `
            <section class="quiz-hero">
                <div class="quiz-hero-copy">
                    <p class="quiz-kicker">${t('quiz.kicker', '10-question tests per topic')}</p>
                    <h1>${t('quiz.title', 'Explore each topic one by one')}</h1>
                    <p class="quiz-hero-text">${t('quiz.lead', 'Choose a topic, answer 10 questions, and see whether you show low, some, or strong signs. Results can be saved to your profile.')}</p>
                </div>
                <div class="quiz-hero-card">
                    <div class="quiz-hero-stat"><strong>20</strong><span>${t('quiz.topicsAvailable', 'topics available')}</span></div>
                    <div class="quiz-hero-stat"><strong>10</strong><span>${t('quiz.questionsPerTest', 'questions per test')}</span></div>
                    <div class="quiz-hero-stat"><strong>1</strong><span>${t('quiz.resultSaved', 'result saved to profile')}</span></div>
                </div>
            </section>
            <section class="quiz-shell">
                <div id="quizHomeView">
                    ${Object.keys(groups).map((category) => `
                        <section class="quiz-category-block" id="${category}">
                            <div class="quiz-category-header">
                                <h2>${getCategoryLabel(category)}</h2>
                                <p>${t('quiz.testsAvailable', '{count} tests available', { count: groups[category].length })}</p>
                            </div>
                            <div class="quiz-grid">
                                ${groups[category].map((topic) => {
                                    const topicCopy = getTopicCopy(topic);
                                    return `
                                    <article class="quiz-card">
                                        <span class="quiz-card-badge">${t('quiz.questionsBadge', '10 questions')}</span>
                                        <h3>${topicCopy.title}</h3>
                                        <p>${topicCopy.summary}</p>
                                        <div class="quiz-card-meta">${t('quiz.alertThreshold', 'Alert threshold: {percent}%', { percent: passingThreshold })}</div>
                                        <button class="quiz-card-btn" data-topic-id="${topic.id}">${t('quiz.start', 'Start')}</button>
                                    </article>
                                `; }).join('')}
                            </div>
                        </section>
                    `).join('')}
                </div>
                <div id="quizPlayView" hidden></div>
                <div id="quizResultView" hidden></div>
            </section>
        `;

        app.querySelectorAll('[data-topic-id]').forEach((button) => {
            button.addEventListener('click', function() {
                startQuiz(this.getAttribute('data-topic-id'));
            });
        });
    }

    function renderResultView({ persistScore = true } = {}) {
        const app = getAppRoot();
        if (!app || !activeTopicId) return;

        const topic = topics.find((item) => item.id === activeTopicId);
        const topicCopy = getTopicCopy(topic);
        const homeView = app.querySelector('#quizHomeView');
        const playView = app.querySelector('#quizPlayView');
        const resultView = app.querySelector('#quizResultView');
        if (!homeView || !playView || !resultView) return;

        const score = answers.reduce((sum, value) => sum + value, 0);
        const percentage = Math.round((score / (10 * maxPerQuestion)) * 100);
        const affected = percentage >= passingThreshold;
        const user = getCurrentUser();
        const label = percentage >= 75 ? t('quiz.highSignals', 'High signals') : percentage >= 55 ? t('quiz.moderateSignals', 'Moderate signals') : percentage >= 30 ? t('quiz.someSigns', 'Some signs') : t('quiz.lowSigns', 'Low signs');
        const interpretation = buildResultInterpretation({ ...topic, title: topicCopy.title }, percentage);
        const result = {
            testId: activeTopicId,
            title: topicCopy.title,
            category: topic.category,
            percentage,
            score,
            maxScore: 30,
            affected,
            label,
            date: new Date().toISOString()
        };

        if (persistScore) {
            if (user && user.email && typeof window.appendProfileScore === 'function') {
                const profile = window.appendProfileScore(result);
                if (profile) {
                    try { window.dispatchEvent(new CustomEvent('simba-profile-updated', { detail: profile })); } catch (e) {}
                }
            } else {
                queueScore(result);
            }
        }

        homeView.hidden = true;
        playView.hidden = true;
        resultView.hidden = false;

        resultView.innerHTML = `
            <div class="quiz-result-card ${affected ? 'quiz-result-alert' : 'quiz-result-calm'}">
                <div class="quiz-result-header">
                    <div>
                        <span class="quiz-active-label">${t('quiz.result', 'Result')}</span>
                        <h2>${topicCopy.title}</h2>
                    </div>
                    <div class="quiz-result-score">${percentage}%</div>
                </div>
                <p class="quiz-result-text">${affected ? t('quiz.affected', 'You show several signs consistent with {topic}.', { topic: topicCopy.title }) : t('quiz.calm', 'You show few signs of {topic} for now.', { topic: topicCopy.title })}</p>
                <p class="quiz-result-interpretation">${interpretation}</p>
                <div class="quiz-result-bar"><span style="width:${percentage}%"></span></div>
                <div class="quiz-result-meta">
                    <div><strong>${label}</strong><span>${t('quiz.scoreReading', 'Score reading')}</span></div>
                    <div><strong>10/10</strong><span>${t('quiz.questionsCompleted', 'Questions completed')}</span></div>
                    <div><strong>${user && user.email ? t('quiz.saved', 'Saved') : t('quiz.notLoggedIn', 'Not logged in')}</strong><span>${t('quiz.inProfile', 'In profile')}</span></div>
                </div>
                <p class="quiz-result-note">${user && user.email ? t('quiz.scoreSaved', 'The score has been added to your profile.') : t('quiz.scoreQueued', 'Log in now or later to save this score to your profile.')}</p>
                <div class="quiz-result-actions">
                    <button class="quiz-primary-btn" id="quizRetryBtn">${t('quiz.retake', 'Retake')}</button>
                    <button class="quiz-secondary-btn" id="quizBackHomeBtn">${t('quiz.backToTopics', 'Back to topics')}</button>
                    <a class="quiz-secondary-btn" href="${topicPages[activeTopicId] || 'index.html'}">${t('quiz.goToTopicPage', 'Go to topic page')}</a>
                    ${user && user.email ? '' : `<button class="quiz-secondary-btn" id="quizLoginBtn">${t('quiz.loginToSave', 'Log in to save score')}</button>`}
                </div>
            </div>
        `;

        resultView.querySelector('#quizRetryBtn').addEventListener('click', () => startQuiz(activeTopicId));
        resultView.querySelector('#quizBackHomeBtn').addEventListener('click', () => renderLanding());
        const loginBtn = resultView.querySelector('#quizLoginBtn');
        if (loginBtn) loginBtn.addEventListener('click', openLogin);
    }

    function startQuiz(topicId) {
        if (!getQuestions(topicId).length) return;
        activeTopicId = topicId;
        answers = [];
        showQuestion();
    }

    function showQuestion() {
        const app = getAppRoot();
        if (!app || !activeTopicId) return;

        const homeView = app.querySelector('#quizHomeView');
        const playView = app.querySelector('#quizPlayView');
        const resultView = app.querySelector('#quizResultView');
        if (!homeView || !playView || !resultView) return;

        homeView.hidden = true;
        resultView.hidden = true;
        playView.hidden = false;

        const topic = topics.find((item) => item.id === activeTopicId);
        const topicCopy = getTopicCopy(topic);
        const questionIndex = answers.length;
        const questions = getQuestions(activeTopicId);
        const question = questions[questionIndex];
        const progress = Math.round((questionIndex / 10) * 100);

        playView.innerHTML = `
            <div class="quiz-panel">
                <div class="quiz-panel-top">
                    <div>
                        <span class="quiz-active-label">${topicCopy.title}</span>
                        <h2>${t('quiz.question', 'Question {current} / 10', { current: questionIndex + 1 })}</h2>
                    </div>
                    <div class="quiz-progress-wrap">
                        <div class="quiz-progress-bar"><span style="width:${progress}%"></span></div>
                        <small>${progress}%</small>
                    </div>
                </div>
                <p class="quiz-question">${question}</p>
                <div class="quiz-scale">
                    ${getScale().map((choice) => `<button class="quiz-option" data-value="${choice.value}"><span>${choice.label}</span></button>`).join('')}
                </div>
                <div class="quiz-panel-footer">
                    <button class="quiz-secondary-btn" id="quizBackBtn" ${questionIndex === 0 ? 'disabled' : ''}>${t('quiz.back', 'Back')}</button>
                    <span>${t('quiz.chooseAnswer', 'Choose an answer to continue')}</span>
                </div>
            </div>
        `;

        playView.querySelectorAll('.quiz-option').forEach((button) => {
            button.addEventListener('click', function() {
                answers.push(Number(this.getAttribute('data-value')));
                if (answers.length >= 10) {
                    finishQuiz();
                } else {
                    showQuestion();
                }
            });
        });

        const backBtn = playView.querySelector('#quizBackBtn');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (answers.length) {
                    answers.pop();
                    showQuestion();
                }
            });
        }
    }

    function finishQuiz() {
        renderResultView({ persistScore: true });
    }

    function initQuizPage() {
        if (!getAppRoot()) return;
        renderLanding();
        flushPendingScores();
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', initQuizPage);
    if (document.readyState !== 'loading') initQuizPage();

    window.addEventListener('simba-language-changed', function() {
        if (!activeTopicId) {
            renderLanding();
            return;
        }

        if (answers.length >= 10) {
            renderResultView({ persistScore: false });
            return;
        }

        showQuestion();
    });

    try {
        window.flushPendingQuizScores = flushPendingScores;
    } catch (e) {}
})();
