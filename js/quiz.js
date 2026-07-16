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
        },
        de: {

            "attachment":  [

                               "Ich habe oft Angst, dass mir nahe Menschen wegdriften.",

                               "Ich brauche Rückversicherung darüber, welchen Platz ich im Leben anderer habe.",

                               "Ich binde mich schnell und intensiv an jemanden.",

                               "Ich tue mich schwer mit Schweigen oder verzögerten Antworten.",

                               "Ich finde es schwer zu vertrauen, ohne wiederholte Beweise.",

                               "Ich werde unruhig, wenn mir jemand Wichtiges Abstand gibt.",

                               "Ich prüfe oft, ob sich eine Beziehung noch sicher anfühlt.",

                               "Ich klammere mich manchmal an eine Beziehung, statt das Risiko einzugehen, den Kontakt zu verlieren.",

                               "Ich spüre Spannungen rund um Nähe oder Distanz sehr stark.",

                               "Ich erkenne wiederkehrende Muster von emotionaler Abhängigkeit oder Verlustangst."

                           ],

            "family_conflict":  [

                                    "Familiengespräche werden oft angespannt oder schwer.",

                                    "Ich meide bestimmte Themen, um Streit zu verhindern.",

                                    "Nach Familienkontakten fühle ich mich emotional ausgelaugt.",

                                    "Ich fühle mich in Familienkonflikten oft zwischen den Fronten.",

                                    "Familienkritik bleibt mir lange im Kopf.",

                                    "Ich fühle mich in der Familie oft dazu gedrängt, zu vermitteln.",

                                    "Familientreffen oder gemeinsame Essen machen mich angespannt.",

                                    "Ungeklärte Familienkonflikte trage ich lange mit mir herum.",

                                    "Ich spüre manchmal den Druck, loyal zu bleiben, auch wenn es mir schadet.",

                                    "Familiäre Spannungen wirken sich klar auf meine Stimmung oder meinen Schlaf aus."

                                ],

            "unfairness_relationships":  [

                                             "Ich habe oft das Gefühl, mehr zu geben als zu bekommen.",

                                             "Es frustriert mich, wenn meine Bemühungen nicht anerkannt werden.",

                                             "Ich ertrage ungleiche Situationen manchmal zu lange.",

                                             "Ich fühle mich in Beziehungen oft zu kurz gekommen.",

                                             "Es fällt mir schwer, Grenzen zu setzen, wenn ich Ungerechtigkeit spüre.",

                                             "Ich merke, dass sich gegenüber bestimmten Menschen Ärger aufstaut.",

                                             "Ich habe das Gefühl, dass meine Bedürfnisse hinter denen anderer zurückstehen.",

                                             "Ich bleibe manchmal aus Gewohnheit in einer Beziehung, obwohl sie unausgewogen wirkt.",

                                             "Ich achte sehr auf Gegenseitigkeit und gegenseitigen Respekt.",

                                             "Ungerechtigkeit in Beziehungen trifft mich tief und lange."

                                         ],

            "social_anxiety":  [

                                   "Ich habe oft Angst, dass andere mich beurteilen.",

                                   "Soziale Kontakte kosten mich viel mentale Energie.",

                                   "Ich gehe Gespräche lange danach immer wieder im Kopf durch.",

                                   "Ich meide Veranstaltungen, weil ich mich unwohl fühlen könnte.",

                                   "Ich beobachte mein Verhalten sehr genau, wenn ich mit anderen zusammen bin.",

                                   "Ich habe Angst, seltsam, nervig oder nicht gut genug zu wirken.",

                                   "Ich spüre vor oder während sozialer Situationen körperliche Stresssymptome.",

                                   "Ich fühle mich sicherer, wenn ich genau vorhersagen kann, was passiert.",

                                   "Vor Gruppen zu sprechen oder das Wort zu ergreifen kostet mich viel Kraft.",

                                   "Die Erwartung sozialer Situationen ist manchmal schwerer als die Situation selbst."

                               ],

            "fomo":  [

                         "Ich schaue oft, was andere machen, damit ich nichts verpasse.",

                         "Es macht mich unruhig, wenn ich Aktivitäten sehe, bei denen ich nicht dabei bin.",

                         "Ich sage zu schnell zu, aus Angst, eine Gelegenheit zu verpassen.",

                         "Soziale Medien verstärken bei mir Vergleich und Dringlichkeit.",

                         "Es fällt mir schwer, ruhig zu bleiben, wenn ich weiß, dass ohne mich etwas passiert.",

                         "Ich fühle mich manchmal ausgeschlossen, wenn ich nicht eingeladen bin.",

                         "Ich kann den Moment schwer genießen, wenn ich an das denke, was ich verpassen könnte.",

                         "Ich vergleiche mein Leben oft mit dem Leben anderer.",

                         "Ich habe ein schlechtes Gewissen, wenn ich eine Einladung absage.",

                         "Die Angst, etwas zu verpassen, beeinflusst meine Entscheidungen öfter, als mir lieb ist."

                     ],

            "ocd":  [

                        "Ich prüfe manchmal mehrmals dasselbe, um mich zu beruhigen.",

                        "Aufdringliche Gedanken belasten mich, auch wenn ich weiß, dass sie nicht logisch sind.",

                        "Ich kann eine Aufgabe nur schwer unvollständig oder unperfekt lassen.",

                        "Ich spüre den Drang, bestimmte Handlungen oder Gedanken zu wiederholen.",

                        "Unsicherheit ist für mich besonders schwer auszuhalten.",

                        "Ich kann viel Zeit damit verbringen, eine Sorge zu neutralisieren.",

                        "Ich suche oft Rückversicherung oder wiederholte Bestätigung.",

                        "Ich fühle mich gezwungen, sehr strenge persönliche Regeln zu befolgen.",

                        "Rituale dauern manchmal länger als erwartet.",

                        "Diese Gedanken oder Gewohnheiten stören meinen Alltag deutlich."

                    ],

            "ptsd":  [

                         "Bestimmte Erinnerungen oder Empfindungen lösen starken Stress aus.",

                         "Ich meide Orte, Menschen oder Themen, die mit einem schwierigen Erlebnis verbunden sind.",

                         "Ich bleibe manchmal ohne klaren Grund in Alarmbereitschaft.",

                         "Bilder oder Flashbacks können plötzlich aufdringlich zurückkommen.",

                         "Mein Schlaf ist manchmal durch Albträume oder Anspannung gestört.",

                         "Ich erschrecke schnell oder werde sofort sehr wachsam.",

                         "Manchmal habe ich das Gefühl, mein Körper bleibt im Überlebensmodus.",

                         "Ich fühle Schuld, Scham oder tiefe Traurigkeit wegen dieses Erlebnisses.",

                         "Wenn ich getriggert werde, fühle ich mich von Gefühlen oder meiner Umgebung abgeschnitten.",

                         "Diese Reaktionen haben einen echten Einfluss auf meinen Alltag."

                     ],

            "burnout":  [

                            "Ich fühle mich erschöpft, auch nach einer Pause.",

                            "Alltägliche Aufgaben kosten mich viel mehr Kraft als früher.",

                            "Ich spüre eine Distanz oder Müdigkeit gegenüber dem, was ich tue.",

                            "Ich bin oft mental oder körperlich müde.",

                            "Ich habe weniger Lust oder Motivation als sonst.",

                            "Ich reagiere schnell gereizt oder angespannt.",

                            "Ich kann mich selbst nach Schlaf oder Ruhe kaum erholen.",

                            "Ich merke deutlich, dass meine Konzentration nachlässt.",

                            "Ich habe das Gefühl, zu lange zu viel getragen zu haben.",

                            "Überlastung wirkt sich klar auf meine Lebensqualität aus."

                        ],

            "dissociation":  [

                                 "Ich fühle mich manchmal von mir selbst getrennt.",

                                 "Bestimmte Situationen geben mir das Gefühl, auf Autopilot zu laufen.",

                                 "Manchmal kann ich mich nicht klar daran erinnern, was gerade passiert ist.",

                                 "Die Welt kann verschwommen, unwirklich oder weit weg wirken.",

                                 "Wenn ich sehr gestresst bin, habe ich das Gefühl, mich mental abzukoppeln.",

                                 "Ich fühle mich manchmal von meinen Gefühlen oder meinem Körper abgeschnitten.",

                                 "Zeit kann sich für mich seltsam oder verwirrend anfühlen.",

                                 "Ich hatte schon das Gefühl, eine Szene von außen zu beobachten.",

                                 "In schwierigen Momenten kann ich mich taub oder abwesend fühlen.",

                                 "Diese Episoden beunruhigen mich oder stören meinen Tag."

                             ],

            "binge_eating_disorder":  [

                                          "Ich esse manchmal mehr als geplant und verliere die Kontrolle über die Menge.",

                                          "Ich esse schnell, wenn mich ein Gefühl überfordert.",

                                          "Ich esse manchmal weiter, obwohl ich schon satt bin.",

                                          "Ich esse manchmal allein, weil ich mich beschämt oder unwohl fühle.",

                                          "Nach manchen Episoden fühle ich mich schuldig oder abgestoßen.",

                                          "Ich nutze Essen manchmal, um Anspannung, Leere oder Stress zu beruhigen.",

                                          "Ich denke oft an Essen, auch außerhalb von Mahlzeiten.",

                                          "Ich habe Mühe aufzuhören, sobald eine Episode begonnen hat.",

                                          "Diese Episoden frustrieren mich und belasten mich emotional.",

                                          "Essen nimmt in meinem Leben zu viel Raum ein."

                                      ],

            "insomnia":  [

                             "Ich habe oft Schwierigkeiten, einzuschlafen.",

                             "Ich wache nachts mehrmals auf.",

                             "Wenn ich schlafen will, grüble ich oder erwarte zu viel.",

                             "Ich bin tagsüber müde, weil ich schlecht schlafe.",

                             "Manchmal fürchte ich mich sogar vor dem Zubettgehen.",

                             "Nach dem Aufwachen brauche ich lange, um wieder einzuschlafen.",

                             "Mein Schlaf ist unregelmäßig und schwer vorhersehbar.",

                             "Ich habe das Gefühl, dass Stress meine Erholung stört.",

                             "Manchmal gleiche ich das mit Nickerchen oder spätem Bildschirmgebrauch aus.",

                             "Schlafprobleme beeinflussen klar meine Stimmung oder Konzentration."

                         ],

            "resilience":  [

                               "Ich schaffe es meist, mich nach einer Schwierigkeit wieder zu fangen.",

                               "Ich kann aus Fehlern lernen, ohne daran hängen zu bleiben.",

                               "Ich suche nach Lösungen, statt mich festzufahren.",

                               "Ich stütze mich recht leicht auf hilfreiche Ressourcen oder vertraute Menschen.",

                               "Unerwartete Veränderungen verunsichern mich weniger als früher.",

                               "Ich behalte auch in schwierigen Zeiten oft etwas Hoffnung.",

                               "Ich kann mich anpassen, wenn Pläne sich ändern.",

                               "Ich spreche freundlich mit mir, wenn etwas schiefgeht.",

                               "Ich schaffe es, trotz Hindernissen weiterzumachen.",

                               "Ich merke, dass ich mich gut erholen und weitermachen kann."

                           ],

            "imposter_syndrome":  [

                                      "Ich denke manchmal, dass mein Erfolg vor allem Glück war.",

                                      "Ich fürchte, andere könnten merken, dass ich nicht so kompetent bin, wie sie denken.",

                                      "Ich spiele meine Stärken oder Erfolge leicht herunter.",

                                      "Ich vergleiche mich oft mit Menschen, die ich für besser halte.",

                                      "Komplimente machen mich manchmal unwohl.",

                                      "Ich neige dazu, zu viel zu machen, um Fehler zu vermeiden.",

                                      "Ich zweifle oft daran, ob ich wirklich dazupasse.",

                                      "Ich spüre starken Druck, perfekt zu sein.",

                                      "Ich habe Angst, verurteilt zu werden, wenn ich Schwäche zeige.",

                                      "Erfolg beruhigt meine Zweifel nicht immer."

                                  ],

            "procrastination":  [

                                    "Ich schiebe wichtige Aufgaben oft auf, selbst wenn sie mich stressen.",

                                    "Ich fange spät an, weil ich auf die richtige Stimmung oder den richtigen Moment warte.",

                                    "Aufgaben wirken manchmal schwerer, als sie wirklich sind.",

                                    "Ich lasse mich ablenken, wenn ich eigentlich vorankommen sollte.",

                                    "Ich warte oft bis zur letzten Minute, bevor ich wirklich anfange.",

                                    "Erleichterung spüre ich erst, wenn ich endlich beginne.",

                                    "Eine Aufgabe in kleine Schritte zu teilen hilft mir, oder ich vergesse es oft.",

                                    "Wenn ich zu lange aufschiebe, habe ich ein schlechtes Gewissen.",

                                    "Ich meide vage oder lange Aufgaben leichter.",

                                    "Prokrastination kostet mich Zeit, Energie oder innere Ruhe."

                                ],

            "helplessness":  [

                                 "Ich habe manchmal das Gefühl, dass mein Handeln wenig verändert.",

                                 "Wenn ein Problem zu lange dauert, verliere ich schnell den Mut.",

                                 "Es fällt mir schwer zu glauben, dass es eine Lösung gibt.",

                                 "Ich fühle mich manchmal passiv, wenn ich vor Schwierigkeiten stehe.",

                                 "Wenn ich überfordert bin, gebe ich eher auf.",

                                 "Ich habe manchmal das Gefühl, dass Anstrengung nicht viel bringt.",

                                 "Ich bin weniger motiviert, neue Wege auszuprobieren.",

                                 "Ich fühle mich verletzlich, wenn Dinge nicht in meiner Kontrolle sind.",

                                 "Ich merke, dass ich weniger Hilfe annehme, als ich könnte.",

                                 "Das Gefühl der Hilflosigkeit bremst mich deutlich aus."

                             ],

            "feedback_circuit":  [

                                     "Ich sehe Feedback meist als Chance, etwas zu lernen.",

                                     "Selbst konstruktive Kritik kann mich tief treffen.",

                                     "Ich versuche, Feedback klar und respektvoll zu geben.",

                                     "Ich gehe nach Gesprächen oft noch einmal durch, was mir gesagt wurde.",

                                     "Ich verstehe recht schnell, was ich verbessern kann.",

                                     "Ich kann defensiv werden, wenn Feedback mich überrascht.",

                                     "Ich mag Rückmeldungen, die mir helfen, konkret voranzukommen.",

                                     "Ich kann Kritik von meinem persönlichen Wert trennen.",

                                     "Ich sehe Feedback als gegenseitigen Lernprozess.",

                                     "Feedback hilft mir oft, mein Verhalten anzupassen."

                                 ],

            "adhd":  [

                         "Ich lasse mich leicht ablenken, auch wenn eine Aufgabe wichtig ist.",

                         "Ich vergesse manchmal einfache Dinge wie Termine oder Gegenstände.",

                         "Es fällt mir schwer, meine Aufgaben oder Prioritäten zu ordnen.",

                         "Ich fühle mich oft innerlich oder äußerlich unruhig.",

                         "Zeit wirkt für mich manchmal unklar oder schwer zu steuern.",

                         "Ich wechsle schnell zwischen Aufgaben, ohne die erste zu beenden.",

                         "Ich kann mich sehr stark auf etwas konzentrieren, das mir Spaß macht.",

                         "Routinen helfen mir, aber ich habe Mühe, sie beizubehalten.",

                         "Ich schiebe Aufgaben auf, wenn sie lang oder langweilig wirken.",

                         "Diese Schwierigkeiten beeinflussen meinen Alltag regelmäßig."

                     ],

            "dreams":  [

                           "Ich erinnere mich beim Aufwachen oft an meine Träume.",

                           "Meine Träume können sehr lebendig oder einprägsam sein.",

                           "Ich habe Träume, die meinen Stress oder meine Sorgen widerspiegeln.",

                           "Manchmal wache ich wegen eines Traums mit starken Gefühlen auf.",

                           "Ich bemerke wiederkehrende Themen in meinen Träumen.",

                           "Ich denke darüber nach, was ein Traum bedeuten könnte.",

                           "Träume stören manchmal meine Erholung oder meine Stimmung.",

                           "Ich habe manchmal Albträume oder unangenehme Träume.",

                           "Schlaf und Träume beeinflussen meinen Tag.",

                           "Ich interessiere mich sehr für das Traumleben und seine Botschaften."

                       ],

            "pms":  [

                        "Vor meiner Periode bemerke ich oft Stimmungsschwankungen.",

                        "Ich spüre manchmal körperliche Spannungen wie Blähungen oder Empfindlichkeit.",

                        "Ich werde in dieser Zeit oft reizbarer oder empfindlicher.",

                        "Vor meiner Periode fühle ich mich oft müder.",

                        "Ich habe manchmal mehr Mühe, mich zu konzentrieren.",

                        "Vor meiner Periode habe ich stärkere Gelüste.",

                        "Diese Symptome beeinflussen meine Beziehungen oder Aktivitäten.",

                        "Ich erlebe manchmal einen vorübergehenden Stimmungstiefpunkt.",

                        "Ich kann diese Veränderungen oft schon erwarten, weil sie regelmäßig wiederkehren.",

                        "Die Beschwerden vor der Periode haben einen echten Einfluss auf meinen Alltag."

                    ],

            "mental_load":  [

                                "Ich denke ständig daran, was noch zu tun ist, selbst wenn ich ruhe.",

                                "Ich muss oft mehrere Dinge gleichzeitig im Kopf behalten.",

                                "Ich habe das Gefühl, die mentale Organisation für alle zu tragen.",

                                "Ich vergesse selten etwas, weil ich ständig mental auf Achse bin.",

                                "Die Organisation des Alltags erschöpft mich mental.",

                                "Ich plane oft im Voraus, um nicht überfordert zu werden.",

                                "Ich muss an Details denken, die andere nicht immer bemerken.",

                                "Diese unsichtbare Last lässt mich nie ganz abschalten.",

                                "Es fällt mir schwer, Aufgaben wirklich abzugeben.",

                                "Die mentale Last nimmt in meinem Leben zu viel Raum ein."

                            ]

        },
        es: {

            "attachment":  [

                               "A menudo temo que las personas cercanas a mí se alejen.",

                               "Necesito que me confirmen cuál es mi lugar en la vida de los demás.",

                               "Me apego a alguien rápido y con intensidad.",

                               "Me cuesta soportar el silencio o las respuestas tardías.",

                               "Me cuesta confiar sin pruebas repetidas.",

                               "Puedo ponerme ansioso cuando alguien importante toma distancia.",

                               "A menudo compruebo si una relación sigue siendo segura.",

                               "A veces me aferro a una relación antes que arriesgarme a perder el vínculo.",

                               "Siento con mucha intensidad las tensiones entre cercanía y distancia.",

                               "Reconozco patrones repetidos de dependencia emocional o miedo al abandono."

                           ],

            "family_conflict":  [

                                    "Las conversaciones familiares a menudo se vuelven tensas o pesadas.",

                                    "Evito ciertos temas para prevenir conflictos.",

                                    "Me siento emocionalmente agotado después de interactuar con mi familia.",

                                    "Me siento atrapado en medio de los desacuerdos familiares.",

                                    "Las críticas familiares se me quedan mucho tiempo en la cabeza.",

                                    "Siento que me obligan a hacer de mediador en la familia.",

                                    "Las reuniones o comidas familiares me ponen tenso.",

                                    "Me guardo dentro conflictos familiares sin resolver.",

                                    "A veces siento presión por mantener la lealtad a costa de mi bienestar.",

                                    "La tensión familiar afecta claramente mi estado de ánimo o mi sueño."

                                ],

            "unfairness_relationships":  [

                                             "A menudo siento que doy más de lo que recibo.",

                                             "Me frustra que no reconozcan mis esfuerzos.",

                                             "A veces aguanto demasiado tiempo situaciones desiguales.",

                                             "A menudo siento que me quedo corto en mis relaciones.",

                                             "Me cuesta poner límites cuando noto falta de equidad.",

                                             "Noto que se acumula resentimiento hacia ciertas personas.",

                                             "Siento que mis necesidades van después de las de los demás.",

                                             "A veces sigo en una relación por costumbre aunque se sienta desequilibrada.",

                                             "Presto mucha atención a la reciprocidad y al respeto mutuo.",

                                             "La injusticia en las relaciones me afecta profundamente y durante mucho tiempo."

                                         ],

            "social_anxiety":  [

                                   "A menudo me preocupa que los demás me juzguen.",

                                   "Las interacciones sociales me gastan mucha energía mental.",

                                   "Repaso las conversaciones una y otra vez durante mucho tiempo después.",

                                   "Evito eventos porque temo sentirme incómodo.",

                                   "Vigilo mucho mi comportamiento cuando estoy con gente.",

                                   "Me preocupa parecer raro, molesto o no ser suficiente.",

                                   "Noto síntomas físicos de estrés antes o durante situaciones sociales.",

                                   "Me siento más seguro cuando puedo prever exactamente lo que va a pasar.",

                                   "Hablar en grupo o tomar la palabra me exige un esfuerzo real.",

                                   "La anticipación de las situaciones sociales a veces es más difícil que el propio evento."

                               ],

            "fomo":  [

                         "A menudo miro lo que hacen los demás para no perderme nada.",

                         "Me siento inquieto cuando veo actividades en las que no participo.",

                         "Digo que sí demasiado rápido por miedo a perder una oportunidad.",

                         "Las redes sociales aumentan en mí la comparación y la urgencia.",

                         "Me cuesta mantener la calma cuando sé que ocurre algo sin mí.",

                         "A veces me siento excluido si no me invitan.",

                         "Me cuesta disfrutar del presente cuando pienso en lo que podría perderme.",

                         "Comparo mi vida con la de otras personas con frecuencia.",

                         "Me siento culpable cuando rechazo una salida o una invitación.",

                         "El miedo a perderme algo influye en mis decisiones más de lo que quisiera."

                     ],

            "ocd":  [

                        "A veces compruebo la misma cosa varias veces para tranquilizarme.",

                        "Los pensamientos intrusivos me alteran aunque sé que no son lógicos.",

                        "Me cuesta dejar una tarea incompleta o imperfecta.",

                        "Siento la necesidad de repetir ciertas acciones o pensamientos.",

                        "La incertidumbre es especialmente difícil para mí.",

                        "Puedo pasar mucho tiempo intentando neutralizar una preocupación.",

                        "A menudo busco tranquilidad o validación repetida.",

                        "Siento que debo seguir reglas personales muy estrictas.",

                        "Los rituales a veces tardan más de lo esperado.",

                        "Estos pensamientos o hábitos interrumpen claramente mi día."

                    ],

            "ptsd":  [

                         "Ciertos recuerdos o sensaciones me provocan un malestar intenso.",

                         "Evito lugares, personas o temas ligados a un evento difícil.",

                         "Puedo permanecer en guardia sin una razón clara.",

                         "Las imágenes o flashbacks pueden volver de forma intrusiva.",

                         "A veces mi sueño se ve alterado por pesadillas o tensión.",

                         "Me sobresalto o me pongo alerta con mucha rapidez.",

                         "A veces siento que mi cuerpo sigue en modo supervivencia.",

                         "Siento culpa, vergüenza o tristeza profunda relacionada con esta experiencia.",

                         "Cuando me disparo, me siento desconectado de ciertas emociones o de mi entorno.",

                         "Estas reacciones tienen un impacto real en mi vida diaria."

                     ],

            "burnout":  [

                            "Me siento agotado incluso después de descansar.",

                            "Las tareas de rutina requieren mucho más esfuerzo que antes.",

                            "Siento distancia o cansancio hacia lo que hago.",

                            "A menudo estoy mental o físicamente cansado.",

                            "Tengo menos ganas o motivación de lo habitual.",

                            "Me irrito o me pongo a la defensiva con facilidad.",

                            "Me cuesta recuperarme aunque duerma o descanse.",

                            "Noto que mi concentración baja de forma clara.",

                            "Siento que he cargado con demasiado durante demasiado tiempo.",

                            "El exceso de trabajo afecta claramente mi calidad de vida."

                        ],

            "dissociation":  [

                                 "A veces me siento desconectado de mí mismo.",

                                 "Algunas situaciones me hacen sentir que funciono en piloto automático.",

                                 "A veces me cuesta recordar con claridad lo que acaba de pasar.",

                                 "El mundo puede parecer borroso, irreal o lejano.",

                                 "Cuando estoy muy estresado, siento que me desconecto mentalmente.",

                                 "A veces me siento separado de mis emociones o de mi cuerpo.",

                                 "El tiempo puede parecerme extraño o confuso.",

                                 "Alguna vez he sentido que observaba una escena desde fuera.",

                                 "Puedo sentirme entumecido o ausente en momentos difíciles.",

                                 "Estos episodios me preocupan o interfieren en mi día."

                             ],

            "binge_eating_disorder":  [

                                          "A veces como más de lo planeado y pierdo el control sobre la cantidad.",

                                          "Como rápido cuando una emoción me sobrepasa.",

                                          "A veces sigo comiendo aunque ya me siento lleno.",

                                          "A veces como solo porque me da vergüenza o me siento mal.",

                                          "Después de algunos episodios, siento culpa o asco.",

                                          "A veces uso la comida para calmar tensión, vacío o estrés.",

                                          "Pienso mucho en la comida incluso fuera de las comidas.",

                                          "Me cuesta parar una vez que empieza un episodio.",

                                          "Estos episodios me frustran y me pesan emocionalmente.",

                                          "La comida ocupa demasiado espacio en mi vida."

                                      ],

            "insomnia":  [

                             "A menudo tengo dificultades para quedarme dormido.",

                             "Me despierto varias veces durante la noche.",

                             "Cuando intento dormir, rumio o anticipo demasiado.",

                             "Durante el día me siento cansado por dormir mal.",

                             "A veces incluso me da miedo irme a la cama.",

                             "Tardo mucho en volver a dormirme después de despertarme.",

                             "Mi sueño es irregular y difícil de predecir.",

                             "Siento que el estrés altera mi descanso.",

                             "A veces lo compenso con siestas o pantallas hasta tarde.",

                             "Los problemas de sueño afectan claramente mi estado de ánimo o mi concentración."

                         ],

            "resilience":  [

                               "Por lo general consigo recuperarme después de una dificultad.",

                               "Puedo aprender de mis errores sin quedarme atascado en ellos.",

                               "Busco soluciones en vez de quedarme paralizado.",

                               "Me apoyo con bastante facilidad en recursos útiles o en personas de confianza.",

                               "Los cambios inesperados me descolocan menos que antes.",

                               "A menudo conservo algo de esperanza incluso en épocas difíciles.",

                               "Sé adaptarme cuando cambian los planes.",

                               "Me hablo con amabilidad cuando algo sale mal.",

                               "Consigo seguir adelante a pesar de los obstáculos.",

                               "Noto una verdadera capacidad para recuperarme y avanzar."

                           ],

            "imposter_syndrome":  [

                                      "A veces pienso que mis logros se deben sobre todo a la suerte.",

                                      "Temo que los demás descubran que no soy tan competente como creen.",

                                      "Minimizo fácilmente mis fortalezas o mis logros.",

                                      "Me comparo mucho con personas que considero mejores que yo.",

                                      "Los cumplidos pueden incomodarme.",

                                      "Tiendo a esforzarme de más para evitar errores.",

                                      "A menudo dudo de si realmente merezco estar donde estoy.",

                                      "Siento una fuerte presión por ser perfecto.",

                                      "Me preocupa ser juzgado si muestro debilidad.",

                                      "El éxito no siempre calma mis dudas."

                                  ],

            "procrastination":  [

                                    "A menudo aplazo tareas importantes aunque me generen estrés.",

                                    "Empiezo tarde porque espero el ánimo o el momento adecuados.",

                                    "A veces las tareas parecen más pesadas de lo que son en realidad.",

                                    "Me distraigo cuando debería estar avanzando con algo.",

                                    "Suelo esperar hasta el último minuto para ponerme en serio.",

                                    "Solo siento alivio cuando por fin empiezo.",

                                    "Dividir una tarea en pasos pequeños me ayuda, o es algo que a menudo olvido.",

                                    "Me siento culpable cuando lo retraso demasiado.",

                                    "Me cuesta más evitar tareas vagas o largas.",

                                    "La procrastinación me cuesta tiempo, energía o paz mental."

                                ],

            "helplessness":  [

                                 "A veces siento que lo que hago cambia muy poco.",

                                 "Me desanimo rápido cuando un problema dura demasiado.",

                                 "Me cuesta creer que exista una solución.",

                                 "A veces me siento pasivo ante las dificultades.",

                                 "Suelo rendirme más rápido cuando me siento sobrepasado.",

                                 "A veces siento que el esfuerzo no importa mucho.",

                                 "Estoy menos motivado para probar enfoques nuevos.",

                                 "Me siento vulnerable cuando las cosas se me escapan de las manos.",

                                 "Noto que pido menos ayuda de la que podría.",

                                 "La sensación de impotencia me frena claramente."

                             ],

            "feedback_circuit":  [

                                     "Por lo general veo la retroalimentación como una oportunidad para aprender.",

                                     "Incluso la crítica constructiva puede afectarme mucho.",

                                     "Intento dar una retroalimentación clara y respetuosa.",

                                     "A menudo vuelvo a pensar en lo que me dijeron después de una conversación.",

                                     "Entiendo bastante rápido qué puedo mejorar.",

                                     "Puedo ponerme a la defensiva cuando una opinión me sorprende.",

                                     "Me gustan los comentarios que me ayudan a avanzar de forma concreta.",

                                     "Puedo separar la crítica de mi valor personal.",

                                     "Veo el intercambio de feedback como un aprendizaje mutuo.",

                                     "La retroalimentación suele ayudarme a ajustar mi comportamiento."

                                 ],

            "adhd":  [

                         "Me distraigo con facilidad incluso cuando una tarea es importante.",

                         "A veces olvido cosas simples como citas u objetos.",

                         "Me cuesta organizar mis tareas o mis prioridades.",

                         "A menudo me siento inquieto por dentro o por fuera.",

                         "A veces el tiempo me resulta borroso o difícil de gestionar.",

                         "Cambio de tarea con facilidad sin terminar la primera.",

                         "Puedo entrar en un estado de hiperfoco con algo que me gusta.",

                         "Las rutinas me ayudan, pero me cuesta mantenerlas.",

                         "Procrastino cuando una tarea me parece larga o aburrida.",

                         "Estas dificultades afectan con regularidad mi vida diaria."

                     ],

            "dreams":  [

                           "A menudo recuerdo mis sueños al despertar.",

                           "Mis sueños pueden ser muy vívidos o memorables.",

                           "Tengo sueños que reflejan mi estrés o mis preocupaciones.",

                           "A veces me despierto con una emoción intensa por culpa de un sueño.",

                           "Noto temas recurrentes en mis sueños.",

                           "Paso tiempo pensando en lo que podría significar un sueño.",

                           "A veces los sueños alteran mi descanso o mi estado de ánimo.",

                           "A veces tengo pesadillas o sueños desagradables.",

                           "El sueño y los sueños influyen en mi día.",

                           "Me interesa mucho la vida onírica y sus mensajes."

                       ],

            "pms":  [

                        "Antes de mi período, a menudo noto cambios de humor.",

                        "A veces siento tensión física como hinchazón o sensibilidad.",

                        "En ese momento puedo estar más irritable o sensible.",

                        "Noto más cansancio antes de mi período.",

                        "A veces me cuesta más concentrarme.",

                        "Antes de mi período tengo más antojos.",

                        "Estos síntomas afectan mis relaciones o mis actividades.",

                        "A veces siento una bajada temporal del ánimo.",

                        "Puedo anticipar estos cambios porque se repiten con regularidad.",

                        "Los síntomas premenstruales tienen un impacto real en mi vida diaria."

                    ],

            "mental_load":  [

                                "Pienso constantemente en lo que hay que hacer, incluso cuando descanso.",

                                "A menudo tengo que mantener varias cosas en la cabeza al mismo tiempo.",

                                "Siento que cargo con la organización mental de todos.",

                                "Rara vez olvido cosas porque estoy siempre en alerta mental.",

                                "Me agota gestionar mentalmente la vida diaria.",

                                "A menudo planifico con antelación para no verme desbordado.",

                                "Tengo que pensar en detalles que otros no siempre notan.",

                                "Esta carga invisible hace que nunca llegue a desconectar del todo.",

                                "Me cuesta delegar tareas de verdad.",

                                "La carga mental ocupa demasiado espacio en mi vida."

                            ]

        },
        it: {

            "attachment":  [

                               "Ho spesso paura che le persone a me vicine si allontanino.",

                               "Ho bisogno di rassicurazioni sul posto che occupo nella vita degli altri.",

                               "Mi lego a qualcuno rapidamente e in modo intenso.",

                               "Fatico con il silenzio o con le risposte tardive.",

                               "Fatico a fidarmi senza prove ripetute.",

                               "Posso agitarmi quando una persona importante prende le distanze.",

                               "Controllo spesso se una relazione si sente ancora sicura.",

                               "A volte resto aggrappato a una relazione invece di rischiare di perdere il legame.",

                               "Sento molto forte le tensioni tra vicinanza e distanza.",

                               "Riconosco schemi ricorrenti di dipendenza emotiva o paura dell\u0027abbandono."

                           ],

            "family_conflict":  [

                                    "Le conversazioni in famiglia diventano spesso tese o pesanti.",

                                    "Evito certi argomenti per prevenire conflitti.",

                                    "Dopo gli incontri familiari mi sento emotivamente svuotato.",

                                    "Mi sento in mezzo ai litigi familiari.",

                                    "Le critiche familiari mi restano a lungo in testa.",

                                    "Mi sento costretto a fare da mediatore in famiglia.",

                                    "I pranzi o le riunioni di famiglia mi mettono in tensione.",

                                    "Tengo dentro di me conflitti familiari irrisolti.",

                                    "A volte sento la pressione di restare fedele agli altri a scapito del mio benessere.",

                                    "Le tensioni familiari influenzano chiaramente il mio umore o il mio sonno."

                                ],

            "unfairness_relationships":  [

                                             "Ho spesso la sensazione di dare più di quanto ricevo.",

                                             "Mi frustra quando i miei sforzi non vengono riconosciuti.",

                                             "A volte sopporto troppo a lungo situazioni sbilanciate.",

                                             "Nelle relazioni mi sento spesso penalizzato.",

                                             "Fatico a mettere limiti quando percepisco una mancanza di equità.",

                                             "Noto che dentro di me cresce risentimento verso certe persone.",

                                             "Ho la sensazione che i miei bisogni vengano dopo quelli di tutti gli altri.",

                                             "A volte resto in una relazione per abitudine anche quando mi sembra sbilanciata.",

                                             "Faccio molta attenzione alla reciprocità e al rispetto reciproco.",

                                             "L\u0027ingiustizia nelle relazioni mi colpisce in profondità e a lungo."

                                         ],

            "social_anxiety":  [

                                   "Mi preoccupo spesso che gli altri mi giudichino.",

                                   "Le interazioni sociali mi consumano molta energia mentale.",

                                   "Ripasso a lungo in testa le conversazioni dopo che sono finite.",

                                   "Evito eventi perché temo di sentirmi a disagio.",

                                   "Controllo molto il mio comportamento quando sono con gli altri.",

                                   "Temo di sembrare strano, fastidioso o non abbastanza bravo.",

                                   "Noto sintomi fisici di stress prima o durante le situazioni sociali.",

                                   "Mi sento più sicuro quando posso prevedere esattamente cosa succederà.",

                                   "Parlare in gruppo o prendere la parola mi richiede un vero sforzo.",

                                   "L\u0027anticipazione delle situazioni sociali a volte è più difficile dell\u0027evento stesso."

                               ],

            "fomo":  [

                         "Controllo spesso cosa fanno gli altri per non perdermi nulla.",

                         "Mi sento irrequieto quando vedo attività a cui non partecipo.",

                         "Dico subito di sì per paura di perdere un\u0027occasione.",

                         "I social media aumentano in me il confronto e il senso di urgenza.",

                         "Fatico a restare calmo quando so che sta succedendo qualcosa senza di me.",

                         "A volte mi sento escluso se non sono invitato.",

                         "Fatico a godermi il presente quando penso a ciò che potrei perdermi.",

                         "Confronto spesso la mia vita con quella degli altri.",

                         "Mi sento in colpa quando rifiuto un\u0027uscita o un invito.",

                         "La paura di perdere qualcosa influenza le mie scelte più spesso di quanto vorrei."

                     ],

            "ocd":  [

                        "A volte controllo più volte la stessa cosa per calmarmi.",

                        "I pensieri intrusivi mi turbano anche se so che non sono logici.",

                        "Fatico a lasciare un compito incompleto o imperfetto.",

                        "Sento il bisogno di ripetere certe azioni o certi pensieri.",

                        "L\u0027incertezza è particolarmente difficile per me.",

                        "Posso passare molto tempo a cercare di neutralizzare una preoccupazione.",

                        "Cerco spesso rassicurazioni o conferme ripetute.",

                        "Mi sento costretto a seguire regole personali molto rigide.",

                        "I rituali a volte richiedono più tempo del previsto.",

                        "Questi pensieri o abitudini disturbano chiaramente la mia giornata."

                    ],

            "ptsd":  [

                         "Certi ricordi o sensazioni scatenano in me un forte disagio.",

                         "Evito luoghi, persone o argomenti collegati a un evento difficile.",

                         "Posso restare in allerta senza un motivo evidente.",

                         "Immagini o flashback possono tornare in modo intrusivo.",

                         "A volte il mio sonno è disturbato da incubi o tensione.",

                         "Mi spavento facilmente o divento molto vigile in fretta.",

                         "A volte ho la sensazione che il mio corpo resti in modalità sopravvivenza.",

                         "Provo colpa, vergogna o una tristezza profonda legata a questa esperienza.",

                         "Quando vengo attivato, mi sento distaccato da certe emozioni o dall\u0027ambiente intorno a me.",

                         "Queste reazioni hanno un impatto reale sulla mia vita quotidiana."

                     ],

            "burnout":  [

                            "Mi sento svuotato anche dopo una pausa.",

                            "I compiti di routine richiedono molta più fatica di prima.",

                            "Provo distanza o stanchezza verso quello che faccio.",

                            "Sono spesso stanco mentalmente o fisicamente.",

                            "Ho meno voglia o motivazione del solito.",

                            "Mi irrito facilmente o sto spesso sul chi vive.",

                            "Fatico a recuperare anche quando dormo o mi riposo.",

                            "Mi accorgo che la concentrazione cala in modo evidente.",

                            "Sento di aver portato troppo peso per troppo tempo.",

                            "Il sovraccarico influisce chiaramente sulla mia qualità di vita."

                        ],

            "dissociation":  [

                                 "A volte mi sento distaccato da me stesso.",

                                 "Alcune situazioni mi fanno sentire come se fossi in pilota automatico.",

                                 "A volte faccio fatica a ricordare chiaramente quello che è appena successo.",

                                 "Il mondo può sembrarmi sfocato, irreale o lontano.",

                                 "Quando sono molto stressato, sento di scollegarmi mentalmente.",

                                 "A volte mi sento separato dalle mie emozioni o dal mio corpo.",

                                 "Il tempo può sembrarmi strano o confuso.",

                                 "Mi è capitato di sentirmi come se osservassi una scena da fuori.",

                                 "Nei momenti difficili posso sentirmi intorpidito o assente.",

                                 "Questi episodi mi preoccupano o disturbano la mia giornata."

                             ],

            "binge_eating_disorder":  [

                                          "A volte mangio più del previsto e perdo il controllo sulla quantità.",

                                          "Mangio velocemente quando un\u0027emozione mi travolge.",

                                          "A volte continuo a mangiare anche quando sono già sazio.",

                                          "A volte mangio da solo perché mi sento in imbarazzo o in colpa.",

                                          "Dopo alcuni episodi provo colpa o disgusto.",

                                          "A volte uso il cibo per calmare tensione, vuoto o stress.",

                                          "Penso spesso al cibo anche fuori dai pasti.",

                                          "Fatico a fermarmi una volta che un episodio è iniziato.",

                                          "Questi episodi mi frustrano e mi pesano emotivamente.",

                                          "Il cibo occupa troppo spazio nella mia vita."

                                      ],

            "insomnia":  [

                             "Ho spesso difficoltà ad addormentarmi.",

                             "Mi sveglio più volte durante la notte.",

                             "Quando provo a dormire, rimugino o anticipo troppo.",

                             "Durante il giorno mi sento stanco per via del sonno scarso.",

                             "A volte temo persino il momento di andare a letto.",

                             "Dopo un risveglio impiego molto tempo per riaddormentarmi.",

                             "Il mio sonno è irregolare e difficile da prevedere.",

                             "Sento che lo stress disturba il mio riposo.",

                             "A volte compenso con pisolini o con lo schermo fino a tardi.",

                             "I problemi di sonno influenzano chiaramente il mio umore o la mia concentrazione."

                         ],

            "resilience":  [

                               "Di solito riesco a riprendermi dopo una difficoltà.",

                               "Posso imparare dagli errori senza restarne bloccato.",

                               "Cerco soluzioni invece di restare fermo.",

                               "Mi appoggio abbastanza facilmente a risorse utili o a persone di fiducia.",

                               "I cambiamenti improvvisi mi destabilizzano meno di prima.",

                               "Mantengo spesso un po\u0027 di speranza anche nei periodi difficili.",

                               "So adattarmi quando i piani cambiano.",

                               "Mi parlo con gentilezza quando qualcosa va storto.",

                               "Riesco ad andare avanti nonostante gli ostacoli.",

                               "Riconosco una vera capacità di riprendermi e andare avanti."

                           ],

            "imposter_syndrome":  [

                                      "A volte penso che i miei successi siano dovuti soprattutto alla fortuna.",

                                      "Temo che gli altri scoprano che non sono competente come credono.",

                                      "Sminuisco facilmente i miei punti di forza o i miei risultati.",

                                      "Mi confronto molto con persone che considero migliori di me.",

                                      "I complimenti possono mettermi a disagio.",

                                      "Tendo a fare troppo per evitare errori.",

                                      "Dubito spesso di meritare davvero il posto in cui mi trovo.",

                                      "Sento una forte pressione a essere perfetto.",

                                      "Temo di essere giudicato se mostro debolezza.",

                                      "Il successo non calma sempre i miei dubbi."

                                  ],

            "procrastination":  [

                                    "Rimando spesso compiti importanti anche se mi stressano.",

                                    "Inizio tardi perché aspetto l\u0027umore o il momento giusto.",

                                    "A volte i compiti mi sembrano più pesanti di quanto siano davvero.",

                                    "Mi distraggo quando dovrei fare progressi su qualcosa.",

                                    "Aspetto spesso l\u0027ultimo minuto per mettermi davvero al lavoro.",

                                    "Provo sollievo solo quando finalmente comincio.",

                                    "Dividere un compito in piccoli passi mi aiuta, oppure è una cosa che spesso mi sfugge.",

                                    "Mi sento in colpa quando rimando troppo.",

                                    "Evito più facilmente i compiti vaghi o lunghi.",

                                    "La procrastinazione mi costa tempo, energia o serenità."

                                ],

            "helplessness":  [

                                 "A volte ho la sensazione che le mie azioni cambino ben poco.",

                                 "Mi demoralizzo in fretta quando un problema dura troppo a lungo.",

                                 "Fatico a credere che esista una soluzione.",

                                 "A volte mi sento passivo di fronte alle difficoltà.",

                                 "Tendo a mollare più in fretta quando mi sento sopraffatto.",

                                 "A volte ho l\u0027impressione che lo sforzo non conti molto.",

                                 "Mi sento meno motivato a provare approcci nuovi.",

                                 "Mi sento vulnerabile quando le cose sfuggono al mio controllo.",

                                 "Mi accorgo che chiedo meno aiuto di quanto potrei.",

                                 "La sensazione di impotenza mi blocca chiaramente."

                             ],

            "feedback_circuit":  [

                                     "Di solito vedo il feedback come un\u0027occasione per imparare.",

                                     "Anche una critica costruttiva può toccarmi profondamente.",

                                     "Cerco di dare feedback in modo chiaro e rispettoso.",

                                     "Dopo una conversazione, ripenso spesso a ciò che mi è stato detto.",

                                     "Capisco abbastanza in fretta cosa posso migliorare.",

                                     "Posso diventare difensivo quando un feedback mi sorprende.",

                                     "Mi piacciono i riscontri che mi aiutano a progredire concretamente.",

                                     "So separare la critica dal mio valore personale.",

                                     "Vedo gli scambi di feedback come un apprendimento reciproco.",

                                     "Il feedback mi aiuta spesso ad aggiustare il mio comportamento."

                                 ],

            "adhd":  [

                         "Mi distraggo facilmente anche quando un compito è importante.",

                         "A volte dimentico cose semplici come appuntamenti o oggetti.",

                         "Fatico a organizzare i miei compiti o le mie priorità.",

                         "Mi sento spesso irrequieto dentro o fuori.",

                         "A volte il tempo mi sembra confuso o difficile da gestire.",

                         "Passo facilmente da un compito all\u0027altro senza finire il primo.",

                         "Posso entrare in uno stato di iperfocus su qualcosa che mi piace.",

                         "Le routine mi aiutano, ma faccio fatica a mantenerle.",

                         "Procrastino quando un compito mi sembra lungo o noioso.",

                         "Queste difficoltà influenzano regolarmente la mia vita quotidiana."

                     ],

            "dreams":  [

                           "Spesso ricordo i miei sogni al risveglio.",

                           "I miei sogni possono essere molto vividi o memorabili.",

                           "Faccio sogni che riflettono il mio stress o le mie preoccupazioni.",

                           "A volte mi sveglio con un\u0027emozione forte a causa di un sogno.",

                           "Noto temi ricorrenti nei miei sogni.",

                           "Passo del tempo a pensare a cosa possa significare un sogno.",

                           "I sogni a volte disturbano il mio riposo o il mio umore.",

                           "A volte faccio incubi o sogni spiacevoli.",

                           "Il sonno e i sogni influenzano la mia giornata.",

                           "Mi interessa molto la vita dei sogni e i loro messaggi."

                       ],

            "pms":  [

                        "Prima del ciclo noto spesso cambiamenti dell\u0027umore.",

                        "A volte sento tensione fisica come gonfiore o sensibilità.",

                        "In quel periodo posso diventare più irritabile o sensibile.",

                        "Noto più stanchezza prima del ciclo.",

                        "A volte faccio più fatica a concentrarmi.",

                        "Prima del ciclo ho più voglia di certi cibi.",

                        "Questi sintomi influenzano le mie relazioni o le mie attività.",

                        "A volte sento un calo temporaneo dell\u0027umore.",

                        "Posso anticipare questi cambiamenti perché tornano regolarmente.",

                        "I sintomi premestruali hanno un impatto reale sulla mia vita quotidiana."

                    ],

            "mental_load":  [

                                "Penso continuamente a ciò che va fatto, anche quando riposo.",

                                "Devo spesso tenere a mente più cose contemporaneamente.",

                                "Mi sembra di portare io l\u0027organizzazione mentale per tutti.",

                                "Raramente dimentico le cose perché resto sempre mentalmente in allerta.",

                                "Mi sento esausto dalla gestione mentale della vita quotidiana.",

                                "Pianifico spesso in anticipo per evitare di sentirmi sopraffatto.",

                                "Devo pensare a dettagli che gli altri non sempre notano.",

                                "Questo carico invisibile mi fa sentire come se non potessi mai staccare del tutto.",

                                "Fatico a delegare davvero i compiti.",

                                "Il carico mentale occupa troppo spazio nella mia vita."

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

    function getTopicIdFromQuery() {
        try {
            const params = new URLSearchParams(window.location.search || '');
            const topic = String(params.get('topic') || '').trim();
            if (!topic) return '';
            const normalized = topic.replace(/-/g, '_');
            return topics.some((item) => item.id === normalized) ? normalized : '';
        } catch (error) {
            return '';
        }
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
        const messages = {
            fr: [
                `Tes réponses indiquent un schéma fort et récurrent autour de ${topicName}. Cela ne constitue pas un diagnostic en soi, mais cela suggère que ce thème a un impact clair sur ta façon de penser, de ressentir ou de réagir au quotidien. Si cela te parle, il peut être utile d’explorer ce schéma plus précisément, surtout les situations qui le renforcent et les moments où il s’apaise.`,
                `Tes réponses montrent un schéma notable autour de ${topicName}. Certains signes semblent présents assez souvent pour mériter ton attention, même s’ils ne dominent pas toutes les situations. Tu fais peut-être face à un mélange d’habitudes installées et de réactions déclenchées par le stress ; observer quand ce thème apparaît le plus et ce qui l’intensifie peut t’aider.`,
                `Tes réponses suggèrent quelques signes liés à ${topicName}, mais ils ne semblent pas particulièrement centraux pour le moment. Cela peut vouloir dire que le thème est présent de façon plus légère ou occasionnelle, ou qu’il apparaît surtout dans certains contextes. Il peut quand même être utile de le garder à l’œil, surtout si le schéma devient plus fort avec le temps ou pendant les périodes de stress.`,
                `Tes réponses suggèrent que ${topicName} n’est pas fortement présent pour le moment. Cela ne veut pas dire que ce thème est sans importance, seulement qu’il ne ressort pas comme un schéma majeur dans ce test actuellement. Si quelque chose change plus tard, les questions de ce test peuvent t’aider à repérer si ce schéma devient plus visible.`
            ],
            de: [
                `Deine Antworten deuten auf ein starkes und wiederkehrendes Muster rund um ${topicName} hin. Das ist für sich genommen keine Diagnose, aber es spricht dafür, dass dieses Thema deine Art zu denken, zu fühlen oder im Alltag zu reagieren deutlich beeinflusst. Wenn dir das vertraut vorkommt, kann es hilfreich sein, dieses Muster genauer anzuschauen, vor allem die Situationen, in denen es stärker wird, und die Momente, in denen es nachlässt.`,
                `Deine Antworten zeigen ein bemerkenswertes Muster rund um ${topicName}. Einige dieser Anzeichen scheinen oft genug vorhanden zu sein, um Beachtung zu verdienen, auch wenn sie nicht jede Situation bestimmen. Vielleicht hast du es mit einer Mischung aus gefestigten Gewohnheiten und stressausgelösten Reaktionen zu tun; es kann helfen zu beobachten, wann dieses Thema am häufigsten auftaucht und was es verstärkt.`,
                `Deine Antworten deuten auf einige Anzeichen im Zusammenhang mit ${topicName} hin, aber sie scheinen im Moment nicht besonders zentral zu sein. Das kann bedeuten, dass das Thema eher leicht oder gelegentlich vorhanden ist oder nur in bestimmten Kontexten auftaucht. Es kann trotzdem sinnvoll sein, ein Auge darauf zu behalten, besonders wenn das Muster mit der Zeit oder in stressigen Phasen stärker wird.`,
                `Deine Antworten deuten darauf hin, dass ${topicName} im Moment nicht stark ausgeprägt ist. Das heißt nicht, dass das Thema unwichtig ist, nur dass es in diesem Test gerade nicht als zentrales Muster hervortritt. Wenn sich später etwas verändert, können die Fragen in diesem Test helfen zu erkennen, ob das Muster deutlicher wird.`
            ],
            es: [
                `Tus respuestas apuntan a un patrón fuerte y recurrente en torno a ${topicName}. Esto no significa un diagnóstico por sí solo, pero sí sugiere que este tema está teniendo un impacto claro en cómo piensas, sientes o reaccionas en la vida diaria. Si te resulta familiar, puede valer la pena explorar el patrón más de cerca, sobre todo las situaciones que lo hacen más intenso y los momentos en que se alivia.`,
                `Tus respuestas muestran un patrón notable en torno a ${topicName}. Algunas de estas señales parecen estar presentes con suficiente frecuencia como para merecer atención, aunque no dominen todas las situaciones. Puede que estés lidiando con una mezcla de hábitos ya establecidos y reacciones activadas por el estrés; observar cuándo aparece más este tema y qué lo intensifica puede ayudar.`,
                `Tus respuestas sugieren algunas señales relacionadas con ${topicName}, pero por ahora no parecen especialmente centrales. Esto puede significar que el tema está presente de forma más leve u ocasional, o que solo aparece en ciertos contextos. Aun así, puede ser útil vigilarlo, sobre todo si el patrón se hace más fuerte con el tiempo o en periodos de estrés.`,
                `Tus respuestas sugieren que ${topicName} no está muy presente por el momento. Eso no significa que el tema sea irrelevante, solo que no destaca como un patrón principal en este test ahora mismo. Si algo cambia más adelante, las preguntas de este test pueden ayudarte a detectar si el patrón se vuelve más visible.`
            ],
            it: [
                `Le tue risposte indicano uno schema forte e ricorrente intorno a ${topicName}. Questo non è di per sé una diagnosi, ma suggerisce che questo tema stia influenzando in modo chiaro il tuo modo di pensare, sentire o reagire nella vita quotidiana. Se ti riconosci in queste parole, può essere utile esplorare lo schema più da vicino, soprattutto le situazioni che lo rendono più forte e i momenti in cui si attenua.`,
                `Le tue risposte mostrano uno schema notevole intorno a ${topicName}. Alcuni di questi segnali sembrano presenti abbastanza spesso da meritare attenzione, anche se non dominano ogni situazione. Potresti avere a che fare con un miscuglio di abitudini consolidate e reazioni innescate dallo stress; osservare quando questo tema emerge di più e cosa lo intensifica può essere utile.`,
                `Le tue risposte suggeriscono alcuni segnali legati a ${topicName}, ma per ora non sembrano particolarmente centrali. Questo può significare che il tema è presente in modo più lieve o occasionale, oppure che emerge solo in certi contesti. Può comunque essere utile tenerlo d'occhio, soprattutto se lo schema diventa più forte con il tempo o nei periodi di stress.`,
                `Le tue risposte suggeriscono che ${topicName} al momento non è molto presente. Questo non significa che il tema non sia importante, solo che in questo test non emerge come uno schema principale. Se in futuro qualcosa cambia, le domande di questo test possono aiutarti a capire se lo schema diventa più visibile.`
            ]
        };

        const bundle = messages[language] || messages.en || messages.fr;
        if (percentage >= 75) return bundle[0];
        if (percentage >= 55) return bundle[1];
        if (percentage >= 30) return bundle[2];
        return bundle[3];
    }

    function groupTopics() {
        const currentUser = typeof window.getCurrentSessionUser === 'function' ? window.getCurrentSessionUser() : null;
        const visibleTopics = topics.filter((topic) => {
            if (typeof window.isThemeVisible !== 'function') return true;
            return window.isThemeVisible(topicIdToPageKey(topic.id), currentUser && currentUser.email);
        });

        return visibleTopics.reduce((groups, topic) => {
            if (!groups[topic.category]) groups[topic.category] = [];
            groups[topic.category].push(topic);
            return groups;
        }, {});
    }

    function renderLanding() {
        const app = getAppRoot();
        if (!app) return;

        const groups = groupTopics();
        const visibleTopicCount = Object.values(groups).reduce((count, items) => count + items.length, 0);
        app.innerHTML = `
            <section class="quiz-hero">
                <div class="quiz-hero-copy">
                    <p class="quiz-kicker">${t('quiz.kicker', '10-question tests per topic')}</p>
                    <h1>${t('quiz.title', 'Explore each topic one by one')}</h1>
                    <p class="quiz-hero-text">${t('quiz.lead', 'Choose a topic, answer 10 questions, and see whether you show low, some, or strong signs. Results can be saved to your profile.')}</p>
                </div>
                <div class="quiz-hero-card">
                    <div class="quiz-hero-stat"><strong>${visibleTopicCount}</strong><span>${t('quiz.topicsAvailable', 'topics available')}</span></div>
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
                    <a class="quiz-secondary-btn" href="${typeof window.isThemeVisible === 'function' && !window.isThemeVisible(topicIdToPageKey(activeTopicId), user && user.email) ? 'index.html' : (topicPages[activeTopicId] || 'index.html')}">${t('quiz.goToTopicPage', 'Go to topic page')}</a>
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
        const currentUser = typeof window.getCurrentSessionUser === 'function' ? window.getCurrentSessionUser() : null;
        if (typeof window.isThemeVisible === 'function' && !window.isThemeVisible(topicIdToPageKey(topicId), currentUser && currentUser.email)) {
            renderLanding();
            return;
        }
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
        const requestedTopicId = getTopicIdFromQuery();
        if (requestedTopicId) {
            const currentUser = typeof window.getCurrentSessionUser === 'function' ? window.getCurrentSessionUser() : null;
            if (typeof window.isThemeVisible !== 'function' || window.isThemeVisible(topicIdToPageKey(requestedTopicId), currentUser && currentUser.email)) {
                startQuiz(requestedTopicId);
            }
        }
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

    window.addEventListener('simba-theme-visibility-changed', function() {
        if (!activeTopicId) {
            renderLanding();
            return;
        }

        const currentUser = typeof window.getCurrentSessionUser === 'function' ? window.getCurrentSessionUser() : null;
        if (typeof window.isThemeVisible === 'function' && !window.isThemeVisible(topicIdToPageKey(activeTopicId), currentUser && currentUser.email)) {
            activeTopicId = null;
            answers = [];
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
