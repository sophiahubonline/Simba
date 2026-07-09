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
        const headings = {
            relationships: 'Relationships',
            'mental-health': 'Mental Health',
            'personal-growth': 'Personal Growth',
            neurodiversity: 'Neurodiversity',
            'mind-body': 'Mind & Body'
        };

        app.innerHTML = `
            <section class="quiz-hero">
                <div class="quiz-hero-copy">
                    <p class="quiz-kicker">10-question tests per topic</p>
                    <h1>Explore each topic one by one</h1>
                    <p class="quiz-hero-text">Choose a topic, answer 10 questions, and see whether you show low, some, or strong signs. Results can be saved to your profile.</p>
                </div>
                <div class="quiz-hero-card">
                    <div class="quiz-hero-stat"><strong>20</strong><span>topics available</span></div>
                    <div class="quiz-hero-stat"><strong>10</strong><span>questions per test</span></div>
                    <div class="quiz-hero-stat"><strong>1</strong><span>result saved to profile</span></div>
                </div>
            </section>
            <section class="quiz-shell">
                <div id="quizHomeView">
                    ${Object.keys(groups).map((category) => `
                        <section class="quiz-category-block" id="${category}">
                            <div class="quiz-category-header">
                                <h2>${headings[category] || category}</h2>
                                <p>${groups[category].length} tests available</p>
                            </div>
                            <div class="quiz-grid">
                                ${groups[category].map((topic) => `
                                    <article class="quiz-card">
                                        <span class="quiz-card-badge">10 questions</span>
                                        <h3>${topic.title}</h3>
                                        <p>${topic.summary}</p>
                                        <div class="quiz-card-meta">Alert threshold: ${passingThreshold}%</div>
                                        <button class="quiz-card-btn" data-topic-id="${topic.id}">Start</button>
                                    </article>
                                `).join('')}
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

    function startQuiz(topicId) {
        if (!questionTemplates[topicId]) return;
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
        const questionIndex = answers.length;
        const question = questionTemplates[activeTopicId][questionIndex];
        const progress = Math.round((questionIndex / 10) * 100);

        playView.innerHTML = `
            <div class="quiz-panel">
                <div class="quiz-panel-top">
                    <div>
                        <span class="quiz-active-label">${topic.title}</span>
                        <h2>Question ${questionIndex + 1} / 10</h2>
                    </div>
                    <div class="quiz-progress-wrap">
                        <div class="quiz-progress-bar"><span style="width:${progress}%"></span></div>
                        <small>${progress}%</small>
                    </div>
                </div>
                <p class="quiz-question">${question}</p>
                <div class="quiz-scale">
                    ${scale.map((choice) => `<button class="quiz-option" data-value="${choice.value}"><span>${choice.label}</span></button>`).join('')}
                </div>
                <div class="quiz-panel-footer">
                    <button class="quiz-secondary-btn" id="quizBackBtn" ${questionIndex === 0 ? 'disabled' : ''}>Back</button>
                    <span>Choose an answer to continue</span>
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
        const app = getAppRoot();
        if (!app || !activeTopicId) return;

        const topic = topics.find((item) => item.id === activeTopicId);
        const homeView = app.querySelector('#quizHomeView');
        const playView = app.querySelector('#quizPlayView');
        const resultView = app.querySelector('#quizResultView');
        if (!homeView || !playView || !resultView) return;

        const score = answers.reduce((sum, value) => sum + value, 0);
        const percentage = Math.round((score / (10 * maxPerQuestion)) * 100);
        const affected = percentage >= passingThreshold;
        const user = getCurrentUser();
        const label = percentage >= 75 ? 'High signals' : percentage >= 55 ? 'Moderate signals' : percentage >= 30 ? 'Some signs' : 'Low signs';
        const interpretation = buildResultInterpretation(topic, percentage);
        const result = {
            testId: activeTopicId,
            title: topic.title,
            category: topic.category,
            percentage,
            score,
            maxScore: 30,
            affected,
            label,
            date: new Date().toISOString()
        };

        if (user && user.email && typeof window.appendProfileScore === 'function') {
            const profile = window.appendProfileScore(result);
            if (profile) {
                try { window.dispatchEvent(new CustomEvent('simba-profile-updated', { detail: profile })); } catch (e) {}
            }
        } else {
            queueScore(result);
        }

        homeView.hidden = true;
        playView.hidden = true;
        resultView.hidden = false;

        resultView.innerHTML = `
            <div class="quiz-result-card ${affected ? 'quiz-result-alert' : 'quiz-result-calm'}">
                <div class="quiz-result-header">
                    <div>
                        <span class="quiz-active-label">Result</span>
                        <h2>${topic.title}</h2>
                    </div>
                    <div class="quiz-result-score">${percentage}%</div>
                </div>
                <p class="quiz-result-text">${affected ? `You show several signs consistent with ${topic.title}.` : `You show few signs of ${topic.title} for now.`}</p>
                <p class="quiz-result-interpretation">${interpretation}</p>
                <div class="quiz-result-bar"><span style="width:${percentage}%"></span></div>
                <div class="quiz-result-meta">
                    <div><strong>${label}</strong><span>Score reading</span></div>
                    <div><strong>10/10</strong><span>Questions completed</span></div>
                    <div><strong>${user && user.email ? 'Saved' : 'Not logged in'}</strong><span>In profile</span></div>
                </div>
                ${user && user.email ? '<p class="quiz-result-note">The score has been added to your profile.</p>' : '<p class="quiz-result-note">Log in now or later to save this score to your profile.</p>'}
                <div class="quiz-result-actions">
                    <button class="quiz-primary-btn" id="quizRetryBtn">Retake</button>
                    <button class="quiz-secondary-btn" id="quizBackHomeBtn">Back to topics</button>
                    <a class="quiz-secondary-btn" href="${topicPages[activeTopicId] || 'index.html'}">Go to topic page</a>
                    ${user && user.email ? '' : '<button class="quiz-secondary-btn" id="quizLoginBtn">Log in to save score</button>'}
                </div>
            </div>
        `;

        resultView.querySelector('#quizRetryBtn').addEventListener('click', () => startQuiz(activeTopicId));
        resultView.querySelector('#quizBackHomeBtn').addEventListener('click', () => renderLanding());
        const loginBtn = resultView.querySelector('#quizLoginBtn');
        if (loginBtn) loginBtn.addEventListener('click', openLogin);
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

    try {
        window.flushPendingQuizScores = flushPendingScores;
    } catch (e) {}
})();