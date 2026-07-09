// THEMES DATA
const themesData = {
    'relationships': [
        {
            name: 'Attachment',
            description: 'Understanding the bonds we form and how they shape our emotional well-being.',
            link: 'attachment.html'
        },
        {
            name: 'Family Conflict',
            description: 'Navigate complex family dynamics and improve communication with loved ones.',
            link: 'family-conflict.html'
        },
        {
            name: '"Unfairness" in Relationships',
            description: 'Recognizing and addressing imbalances in your relationships.',
            link: 'unfairness-relationships.html'
        },
        {
            name: 'Social Anxiety',
            description: 'Overcome the fear and worry that comes with social interactions.',
            link: 'social-anxiety.html'
        },
        {
            name: 'FOMO',
            description: 'Break free from the fear of missing out and find contentment in the present.',
            link: 'fomo.html'
        }
    ],
    'mental-health': [
        {
            name: 'OCD',
            description: 'Understanding obsessive-compulsive disorder and breaking the cycle of anxiety.',
            link: 'ocd.html'
        },
        {
            name: 'PTSD',
            description: 'Healing from trauma and reclaiming your sense of safety.',
            link: 'ptsd.html'
        },
        {
            name: 'Burnout',
            description: 'Recognize exhaustion and restore balance to your life.',
            link: 'burnout.html'
        },
        {
            name: 'Dissociation',
            description: 'Understanding detachment from reality and grounding techniques.',
            link: 'dissociation.html'
        },
        {
            name: 'Binge Eating Disorder',
            description: 'Address unhealthy eating patterns and develop a healthier relationship with food.',
            link: 'binge-eating-disorder.html'
        },
        {
            name: 'Insomnia',
            description: 'Improve your sleep quality and establish better sleep habits.',
            link: 'insomnia.html'
        }
    ],
    'personal-growth': [
        {
            name: 'Resilience',
            description: 'Build inner strength and bounce back from life\'s challenges.',
            link: 'resilience.html'
        },
        {
            name: 'Imposter Syndrome',
            description: 'Overcome self-doubt and recognize your true worth and achievements.',
            link: 'imposter-syndrome.html'
        },
        {
            name: 'Procrastination',
            description: 'Understand why you delay and develop productive habits.',
            link: 'procrastination.html'
        },
        {
            name: 'Helplessness',
            description: 'Regain agency and control over your life circumstances.',
            link: 'helplessness.html'
        },
        {
            name: 'The Feedback Circuit',
            description: 'Learn to give and receive feedback for continuous personal growth.',
            link: 'feedback-circuit.html'
        }
    ],
    'neurodiversity': [
        {
            name: 'ADHD',
            description: 'Understand attention and executive function challenges and find strategies that work for you.',
            link: 'adhd.html'
        }
    ],
    'mind-body': [
        {
            name: 'Dreams',
            description: 'Explore the meaning and significance of your dreams.',
            link: 'dreams.html'
        },
        {
            name: 'PMS',
            description: 'Manage premenstrual symptoms and understand hormonal changes.',
            link: 'pms.html'
        },
        {
            name: 'Mental Load',
            description: 'Reduce cognitive overwhelm and manage your mental energy effectively.',
            link: 'mental-load.html'
        }
    ]
};

// RENDER THEMES
function renderThemes(category) {
    const grid = document.getElementById('themesGrid');
    if (!grid) return;
    const themes = themesData[category] || [];
    const getThemeCopy = (theme) => (window.SimbaI18n && typeof window.SimbaI18n.getThemeCard === 'function') ? window.SimbaI18n.getThemeCard(theme) : theme;
    const learnMoreLabel = simbaT('theme.learnMore', 'Learn more about it');
    
    grid.innerHTML = themes.map(theme => `
        <div class="theme-card">
            <h3>${getThemeCopy(theme).name}</h3>
            <p>${getThemeCopy(theme).description}</p>
            <a href="${theme.link}" class="learn-more-btn">
                ${learnMoreLabel} <span class="arrow">→</span>
            </a>
        </div>
    `).join('');
}

function getDefaultProfileAvatar() {
    return '../content/img/profil.png';
}

function simbaT(key, fallback = '') {
    if (window.SimbaI18n && typeof window.SimbaI18n.getTranslation === 'function') {
        return window.SimbaI18n.getTranslation(key, fallback);
    }
    return fallback;
}

function ensureLanguageSwitcher(authSection) {
    const section = authSection || document.querySelector('.auth-section');
    if (!section) return;

    let switcher = section.querySelector('.language-switcher');
    if (!switcher) {
        switcher = document.createElement('label');
        switcher.className = 'language-switcher';
        switcher.innerHTML = '<span class="language-switcher__label">Language</span><select id="simba-language-select"></select>';
        section.appendChild(switcher);
    }

    const label = switcher.querySelector('.language-switcher__label');
    const select = switcher.querySelector('select');
    const languageOptions = (window.SimbaI18n && window.SimbaI18n.languages)
        ? window.SimbaI18n.languages
        : { en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano' };

    if (label) label.textContent = simbaT('language.label', 'Language');
    if (select) {
        select.innerHTML = Object.entries(languageOptions).map(([code, name]) => `<option value="${code}">${name}</option>`).join('');
        select.value = (window.SimbaI18n && typeof window.SimbaI18n.getCurrentLanguage === 'function') ? window.SimbaI18n.getCurrentLanguage() : (localStorage.getItem('simba_language') || 'en');
        select.setAttribute('aria-label', simbaT('language.aria', 'Choose website language'));
        if (!select.dataset.languageBound) {
            select.addEventListener('change', (event) => {
                if (window.SimbaI18n && typeof window.SimbaI18n.setCurrentLanguage === 'function') {
                    window.SimbaI18n.setCurrentLanguage(event.target.value);
                } else {
                    localStorage.setItem('simba_language', event.target.value);
                    window.location.reload();
                }
            });
            select.dataset.languageBound = 'true';
        }
    }
}

function refreshNavbarDropdownLabels() {
    document.querySelectorAll('.nav-dropdown-link strong[data-theme-key]').forEach((node) => {
        const themeKey = node.getAttribute('data-theme-key');
        if (!themeKey) return;
        if (window.SimbaI18n && typeof window.SimbaI18n.getThemeCard === 'function') {
            const localized = window.SimbaI18n.getThemeCard({ link: `${themeKey}.html` });
            node.textContent = localized.name || node.textContent;
        }
    });
}

if (typeof window !== 'undefined' && !window.SimbaI18n) {
    const i18nScript = document.createElement('script');
    i18nScript.src = '../js/i18n.js';
    i18nScript.addEventListener('load', () => {
        if (typeof window.updateAuthUI === 'function') {
            window.updateAuthUI();
        }
        if (window.SimbaI18n && typeof window.SimbaI18n.applyLanguage === 'function') {
            window.SimbaI18n.applyLanguage();
        }
    });
    document.head.appendChild(i18nScript);
}

function getStoredProfile(email) {
    if (!email) return {};
    try {
        return JSON.parse(localStorage.getItem('simba_profile_' + email) || '{}');
    } catch (e) {
        return {};
    }
}

function setStoredProfile(email, profile) {
    if (!email) return profile || {};
    const nextProfile = profile || {};
    if (!Array.isArray(nextProfile.scores)) {
        nextProfile.scores = [];
    }
    localStorage.setItem('simba_profile_' + email, JSON.stringify(nextProfile));
    return nextProfile;
}

function mergeStoredProfile(email, patch) {
    const currentProfile = getStoredProfile(email);
    const nextProfile = { ...currentProfile, ...(patch || {}) };
    if (!Array.isArray(nextProfile.scores)) {
        nextProfile.scores = Array.isArray(currentProfile.scores) ? currentProfile.scores : [];
    }
    return setStoredProfile(email, nextProfile);
}

function appendProfileScore(scoreEntry) {
    const currentUser = (() => {
        try { return JSON.parse(localStorage.getItem('simba_user') || 'null'); } catch (e) { return null; }
    })();
    if (!currentUser || !currentUser.email) return null;

    const currentProfile = getStoredProfile(currentUser.email);
    const nextScores = Array.isArray(currentProfile.scores) ? currentProfile.scores.slice() : [];
    nextScores.unshift(scoreEntry);

    const nextProfile = {
        ...currentProfile,
        scores: nextScores.slice(0, 50)
    };

    setStoredProfile(currentUser.email, nextProfile);
    return nextProfile;
}

function bindLogoToHome() {
    const logo = document.querySelector('.logo-section img.logo');
    if (!logo || logo.dataset.homeLinkBound === 'true') return;

    const goHome = () => {
        window.location.href = 'index.html';
    };

    logo.style.cursor = 'pointer';
    logo.setAttribute('role', 'link');
    logo.setAttribute('tabindex', '0');
    logo.setAttribute('aria-label', 'Go to homepage');
    logo.addEventListener('click', goHome);
    logo.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            goHome();
        }
    });
    logo.dataset.homeLinkBound = 'true';
}

function buildNavbarDropdowns() {
    const navList = document.querySelector('.nav-list');
    if (!navList || navList.dataset.dropdownReady === 'true') return;

    const t = (key, fallback) => simbaT(key, fallback);

    const thematicsItems = Object.values(themesData).flat().map((theme) => ({
        label: window.SimbaI18n && typeof window.SimbaI18n.getThemeCard === 'function' ? window.SimbaI18n.getThemeCard(theme).name : theme.name,
        themeKey: String(theme.link || '').replace(/\.html$/i, ''),
        href: theme.link
    }));

    const testItems = [
        { label: t('dropdown.allTests', 'All tests'), labelKey: 'dropdown.allTests', href: 'test.html' },
        { label: t('dropdown.relationships', 'Relationships'), labelKey: 'dropdown.relationships', href: 'test.html#relationships' },
        { label: t('dropdown.mentalHealth', 'Mental Health'), labelKey: 'dropdown.mentalHealth', href: 'test.html#mental-health' },
        { label: t('dropdown.personalGrowth', 'Personal Growth'), labelKey: 'dropdown.personalGrowth', href: 'test.html#personal-growth' },
        { label: t('dropdown.neurodiversity', 'Neurodiversity'), labelKey: 'dropdown.neurodiversity', href: 'test.html#neurodiversity' },
        { label: t('dropdown.mindBody', 'Mind & Body'), labelKey: 'dropdown.mindBody', href: 'test.html#mind-body' }
    ];

    const buildSimpleLinks = (links) => `
        <div class="nav-dropdown-links nav-dropdown-links--plain">
            ${links.map((link) => `
                <a href="${link.href}" class="nav-dropdown-link">
                    <strong${link.labelKey ? ` data-i18n="${link.labelKey}"` : ''}${link.themeKey ? ` data-theme-key="${link.themeKey}"` : ''}>${link.label}</strong>
                </a>
            `).join('')}
        </div>
    `;

    const thematicsLink = navList.querySelector('a[href="index.html"]');
    if (thematicsLink) {
        thematicsLink.classList.add('nav-link--dropdown');
        const thematicsItem = thematicsLink.closest('li');
        if (thematicsItem && !thematicsItem.querySelector('.nav-dropdown')) {
            thematicsItem.classList.add('nav-menu-item', 'has-dropdown');
            thematicsItem.insertAdjacentHTML('beforeend', `
                <div class="nav-dropdown nav-dropdown--thematics">
                    ${buildSimpleLinks(thematicsItems)}
                </div>
            `);
        }
    }

    const testLink = navList.querySelector('a[href="test.html"]');
    if (testLink) {
        testLink.classList.add('nav-link--dropdown');
        const testItem = testLink.closest('li');
        if (testItem && !testItem.querySelector('.nav-dropdown')) {
            testItem.classList.add('nav-menu-item', 'has-dropdown');
            testItem.insertAdjacentHTML('beforeend', `
                <div class="nav-dropdown nav-dropdown--test">
                    ${buildSimpleLinks(testItems)}
                </div>
            `);
        }
    }

    if (!navList.querySelector('a[href="forum.html"]')) {
        const forumItem = document.createElement('li');
        forumItem.innerHTML = `<a href="forum.html" class="nav-link">${t('nav.forum', 'Forum')}</a>`;

        const contactItem = navList.querySelector('a[href="contact.html"]')?.closest('li');
        if (contactItem && contactItem.parentNode === navList) {
            navList.insertBefore(forumItem, contactItem);
        } else {
            navList.appendChild(forumItem);
        }
    }

    navList.querySelectorAll('.nav-menu-item.has-dropdown').forEach((item) => {
        let closeTimer = null;

        const openMenu = () => {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            item.classList.add('is-open');
        };

        const closeMenu = () => {
            if (closeTimer) clearTimeout(closeTimer);
            closeTimer = window.setTimeout(() => {
                item.classList.remove('is-open');
            }, 140);
        };

        item.addEventListener('mouseenter', openMenu);
        item.addEventListener('mouseleave', closeMenu);
        item.addEventListener('focusin', openMenu);
        item.addEventListener('focusout', closeMenu);
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeNav = navList.querySelector(`a[href="${currentPage}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    navList.dataset.dropdownReady = 'true';
}

// Global auth header sync for every page.
// This is intentionally outside DOMContentLoaded so it exists in the console
// and can update the header even when called manually.
function updateAuthUI() {
    const authSection = document.querySelector('.auth-section');
    if (!authSection) return;

    const local = (() => {
        try {
            return JSON.parse(localStorage.getItem('simba_user') || 'null');
        } catch (e) {
            return null;
        }
    })();

    if (local && local.email) {
        authSection.innerHTML = `<span class="user-greeting">${local.email}</span><button class="logout-btn">${simbaT('auth.signout', 'Sign out')}</button><button class="profile-btn"><img class="profile-thumb" src="${getDefaultProfileAvatar()}" alt="profile"/></button>`;
    } else {
        authSection.innerHTML = `<button class="sign-up-btn">${simbaT('auth.signup', 'Sign Up')}</button><button class="login-btn">${simbaT('auth.login', 'Login')}</button>`;
    }

    ensureLanguageSwitcher(authSection);

    if (local && local.email && typeof window.flushPendingQuizScores === 'function') {
        window.flushPendingQuizScores();
    }

    const profileBtn = authSection.querySelector('.profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }

    const logoutBtn = authSection.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('simba_user');
            updateAuthUI();
        });
    }

    const signUpBtn = authSection.querySelector('.sign-up-btn');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof window.showAuthModal === 'function') window.showAuthModal('signup');
        });
    }

    const loginBtn = authSection.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof window.showAuthModal === 'function') window.showAuthModal('login');
        });
    }

    // Keep the avatar preview in sync when a profile is saved elsewhere.
    if (typeof window.refreshProfileButton === 'function') {
        window.refreshProfileButton();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // CATEGORY TABS
    const categoryTabs = document.querySelectorAll('.category-tab');
    let activeCategory = 'relationships';
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            activeCategory = category;
            
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Render themes for selected category
            renderThemes(category);
        });
    });

    // Initialize with first category
    renderThemes('relationships');
    activeCategory = 'relationships';

    window.addEventListener('simba-language-changed', function() {
        renderThemes(activeCategory);
    });

    // NAV LINK ACTIVE STATE
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // AUTH UI
    // helper: fetch with timeout to avoid long hangs when server is offline
    async function fetchWithTimeout(resource, opts = {}) {
        const timeout = typeof opts.timeout === 'number' ? opts.timeout : 3000;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const merged = { ...opts, signal: controller.signal };
            const res = await fetch(resource, merged);
            clearTimeout(id);
            return res;
        } catch (e) {
            clearTimeout(id);
            throw e;
        }
    }

    // If set to true, the app will not attempt any network/API calls and will use localStorage only.
    const SIMBA_FORCE_LOCAL = true;

    function attachAuthHandlers() {

           const signUpBtn = document.querySelector('.sign-up-btn');
           if (signUpBtn) signUpBtn.addEventListener('click', (e) => { e.preventDefault(); showAuthModal('signup'); });

           const loginBtn = document.querySelector('.login-btn');
           if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); showAuthModal('login'); });

               const logoutBtn = document.querySelector('.logout-btn');
            if (logoutBtn) logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                    try { await fetchWithTimeout('/api/logout', { method: 'POST', credentials: 'include', timeout: 3000 }); } catch (err) { }
                localStorage.removeItem('simba_user');
                updateAuthUI();
                window.location.href = 'index.html';
            });
            const profileBtn = document.querySelector('.profile-btn');
            if (profileBtn) profileBtn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'profile.html'; });
        }

        // ---------- Simple local fallback store for prototype ----------
        function loadLocalUsers() {
                try { return JSON.parse(localStorage.getItem('simba_local_users')||'[]'); } catch { return []; }
        }
        function saveLocalUsers(list) { localStorage.setItem('simba_local_users', JSON.stringify(list)); }
        function findLocalUserByEmail(email){ return loadLocalUsers().find(u=>u.email===email); }

        // ---------- Modal UI ----------
        function showAuthModal(tab){
                // remove existing
                const existing = document.getElementById('simbaAuthModal');
                if (existing) existing.remove();
                const div = document.createElement('div');
                div.id = 'simbaAuthModal';
                div.innerHTML = `
                <div class="simba-modal-backdrop">
                    <div class="simba-modal">
                        <button class="simba-modal-close">×</button>
                        <div class="simba-modal-tabs">
                            <button data-tab="login" class="tab-btn">${simbaT('modal.loginTitle', 'Login')}</button>
                            <button data-tab="signup" class="tab-btn">${simbaT('modal.signupTitle', 'Sign Up')}</button>
                            <button data-tab="profile" class="tab-btn" style="display:none;">${simbaT('modal.profileTitle', 'Profile')}</button>
                        </div>
                        <div class="simba-modal-body">
                            <div class="tab-content" data-tab="login">
                                <h3>${simbaT('modal.loginTitle', 'Login')}</h3>
                                <input id="simba_email" placeholder="${simbaT('modal.email', 'Email')}" />
                                <input id="simba_password" type="password" placeholder="${simbaT('modal.password', 'Password')}" />
                                <div style="margin-top:0.7rem"><button id="simba_login_btn" class="btn">${simbaT('modal.loginButton', 'Login')}</button></div>
                                <div id="simba_msg" style="margin-top:0.8rem;color:red"></div>
                            </div>
                            <div class="tab-content" data-tab="signup" style="display:none;">
                                <h3>${simbaT('modal.signupTitle', 'Sign Up')}</h3>
                                <input id="simba_s_email" placeholder="${simbaT('modal.email', 'Email')}" />
                                <input id="simba_s_password" type="password" placeholder="${simbaT('modal.password', 'Password')}" />
                                <div style="margin-top:0.7rem"><button id="simba_signup_btn" class="btn">${simbaT('modal.signupButton', 'Sign Up')}</button></div>
                                <div id="simba_s_msg" style="margin-top:0.8rem;color:red"></div>
                            </div>
                            <div class="tab-content" data-tab="profile" style="display:none;">
                                <h3>${simbaT('modal.profileTitle', 'Your Profile')}</h3>
                                <div id="simba_profile_area"></div>
                                <div style="margin-top:0.7rem"><button id="simba_logout_btn" class="btn">${simbaT('auth.signout', 'Log out')}</button></div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                document.body.appendChild(div);

                // styles
                const style = document.createElement('style');
                style.innerHTML = `
                    .simba-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:20000}
                    .simba-modal{background:white;border-radius:12px;padding:1rem;width:360px;max-width:95%}
                    .simba-modal-close{position:absolute;right:12px;top:8px;background:none;border:none;font-size:20px}
                    .simba-modal-tabs{display:flex;gap:8px;margin-bottom:8px}
                    .tab-btn{flex:1;padding:0.5rem;border-radius:8px;border:1px solid #eee;background:#f7f7f7}
                    .tab-content input{width:100%;padding:0.6rem;border-radius:8px;border:1px solid #ddd;margin-top:0.5rem}
                `;
                div.appendChild(style);

                const closeBtn = div.querySelector('.simba-modal-close');
                closeBtn.addEventListener('click', ()=>div.remove());
                // close modal on backdrop click
                const backdropEl = div.querySelector('.simba-modal-backdrop');
                if (backdropEl) backdropEl.addEventListener('click', (ev) => { if (ev.target === backdropEl) div.remove(); });
                const tabBtns = div.querySelectorAll('.tab-btn');
                tabBtns.forEach(b=>b.addEventListener('click', ()=>{
                    const t=b.getAttribute('data-tab');
                    switchTab(t,div);
                }));

                function switchTab(t,container){
                    container.querySelectorAll('.tab-content').forEach(tc=>tc.style.display = tc.getAttribute('data-tab')===t?'block':'none');
                    container.querySelectorAll('.tab-btn').forEach(b=>b.style.background = b.getAttribute('data-tab')===t? '#fff':'#f7f7f7');
                    if (t==='profile') populateProfile(container);
                }

                function populateProfile(container){
                    const area = container.querySelector('#simba_profile_area');
                    if (!area) return;
                    area.innerHTML = '';
                    let current = null;
                    try { current = JSON.parse(localStorage.getItem('simba_user')); } catch {}
                    const email = current && current.email;
                    if (!email){ area.innerHTML = `<p>${simbaT('modal.pleaseLogin', 'Please login first.')}</p>`; return; }
                    // load profile from localStorage
                    const key = 'simba_profile_'+email;
                    let profile = {};
                    try { profile = JSON.parse(localStorage.getItem(key)||'{}'); } catch {}
                                        const img = profile.avatar ? `<img id="simba_profile_preview" src="${profile.avatar}" style="width:80px;height:80px;border-radius:50%"/>` : `<img id="simba_profile_preview" src="${getDefaultProfileAvatar()}" style="width:80px;height:80px;border-radius:50%"/>`;
                                        // add preset avatar choices (profil1.png..profil6.png)
                                        let choicesHtml = '<div style="display:flex;gap:8px;margin-top:0.6rem">';
                                        for (let i=1;i<=6;i++) {
                                                choicesHtml += `<img class="simba-avatar-choice" data-src="../content/img/profil${i}.png" src="../content/img/profil${i}.png" style="width:48px;height:48px;border-radius:8px;cursor:pointer;border:2px solid transparent"/>`;
                                        }
                                        choicesHtml += '</div>';
                                        area.innerHTML = `
                                            <div>${img}</div>
                                            <div style="margin-top:0.6rem">${choicesHtml}</div>
                                            <div style="margin-top:0.6rem"><label>${simbaT('modal.displayName', 'Display name')}</label><input id="simba_dispname" value="${profile.name||''}" /></div>
                                            <div style="margin-top:0.6rem"><label>${simbaT('modal.bio', 'Bio')}</label><textarea id="simba_bio">${profile.bio||''}</textarea></div>
                                            <div style="margin-top:0.6rem"><label>${simbaT('modal.uploadAvatar', 'Custom Avatar (upload)')}</label><input id="simba_avatar_file" type="file" accept="image/*" /></div>
                                            <div style="margin-top:0.6rem"><button id="simba_save_profile" class="btn">${simbaT('modal.saveProfile', 'Save profile')}</button></div>
                                        `;
                                        // mark selected if preset matches
                                        area.querySelectorAll('.simba-avatar-choice').forEach(imgEl=>{
                                                if (profile.avatar && profile.avatar.indexOf(imgEl.dataset.src)!==-1) imgEl.style.borderColor = '#007bff';
                                                imgEl.addEventListener('click', ()=>{
                                                        // select this choice
                                                        area.querySelectorAll('.simba-avatar-choice').forEach(x=>x.style.borderColor='transparent');
                                                        imgEl.style.borderColor = '#007bff';
                                                        area.querySelector('#simba_profile_preview').src = imgEl.dataset.src;
                                                        area.dataset.pendingAvatar = imgEl.dataset.src;
                                                });
                                        });
                    container.querySelector('#simba_avatar_file').addEventListener('change', function(e){
                        const f = e.target.files && e.target.files[0];
                        if (!f) return;
                        const reader = new FileReader();
                        reader.onload = function(){
                            const data = reader.result;
                            // preview
                            const preview = area.querySelector('#simba_profile_preview');
                            if (preview) preview.setAttribute('src', data);
                            // store temporarily in dataset (custom uploaded avatar)
                            area.dataset.pendingAvatar = data;
                        };
                        reader.readAsDataURL(f);
                    });
                    container.querySelector('#simba_save_profile').addEventListener('click', async ()=>{
                        const name = container.querySelector('#simba_dispname').value;
                        const bio = container.querySelector('#simba_bio').value;
                        const avatar = area.dataset.pendingAvatar || profile.avatar || '';
                        const newProfile = { name, bio, avatar };
                            // try to save to server (with timeout) unless forced local-only
                            let saved = false;
                            if (!SIMBA_FORCE_LOCAL) {
                                try {
                                    const ping = await fetchWithTimeout('/api/ping', { timeout: 3000 });
                                    if (ping && ping.ok) {
                                        const res = await fetchWithTimeout('/api/profile', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(newProfile), credentials: 'include', timeout: 5000 });
                                        if (res && res.ok) saved = true;
                                    }
                                } catch(e){}
                            }
                        // always save locally as fallback
                        localStorage.setItem(key, JSON.stringify(newProfile));
                        alert(saved ? simbaT('modal.profileSavedServer', 'Profile saved (server)') : simbaT('modal.profileSavedLocal', 'Profile saved (local)'));
                        // update header avatar
                        refreshProfileButton();
                        // notify other parts of the app (profile page) to update
                        try { window.dispatchEvent(new CustomEvent('simba-profile-updated', { detail: newProfile })); } catch(e){}
                    });
                }

                switchTab(tab,div);

                // wire buttons
                div.querySelector('#simba_login_btn').addEventListener('click', async ()=>{
                    const email = div.querySelector('#simba_email').value.trim();
                    const pw = div.querySelector('#simba_password').value;
                    const msg = div.querySelector('#simba_msg'); msg.innerText='';
                    if (!email || !pw){ msg.innerText=simbaT('modal.enterCredentials', 'Enter email and password'); return; }
                    // try server (skip if forced local-only)
                    if (!SIMBA_FORCE_LOCAL) {
                        try {
                            const ping = await fetchWithTimeout('/api/ping', { timeout: 3000 });
                            if (ping && ping.ok){
                                const res = await fetchWithTimeout('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:pw}),credentials:'include', timeout: 5000});
                                const data = await res.json();
                                if (!res.ok) { msg.innerText = data.error || simbaT('modal.invalidCredentials', 'Login failed'); return; }
                                localStorage.setItem('simba_user', JSON.stringify({email}));
                                updateAuthUI();
                                if (typeof window.flushPendingQuizScores === 'function') window.flushPendingQuizScores();
                                div.remove();
                                return;
                            }
                        } catch(e){ /* fallback */ }
                    }
                    // fallback to local store
                    let u = findLocalUserByEmail(email);
                    if (!u) { msg.innerText=simbaT('modal.noSuchUser', 'No such user (server offline)'); return; }
                    if (u.password !== pw) { msg.innerText=simbaT('modal.invalidCredentials', 'Invalid credentials'); return; }
                    localStorage.setItem('simba_user', JSON.stringify({email}));
                    updateAuthUI();
                    if (typeof window.flushPendingQuizScores === 'function') window.flushPendingQuizScores();
                    div.remove();
                });

                div.querySelector('#simba_signup_btn').addEventListener('click', async ()=>{
                    const email = div.querySelector('#simba_s_email').value.trim();
                    const pw = div.querySelector('#simba_s_password').value;
                    const msg = div.querySelector('#simba_s_msg'); msg.innerText='';
                    if (!email || !pw){ msg.innerText=simbaT('modal.enterCredentials', 'Enter email and password'); return; }
                    if (!SIMBA_FORCE_LOCAL) {
                        try {
                            const ping = await fetchWithTimeout('/api/ping', { timeout: 3000 });
                            if (ping && ping.ok){
                                const res = await fetchWithTimeout('/api/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:pw}),credentials:'include', timeout: 5000});
                                const data = await res.json();
                                if (!res.ok) { msg.innerText = data.error || 'Signup failed'; return; }
                                localStorage.setItem('simba_user', JSON.stringify({email}));
                                updateAuthUI();
                                if (typeof window.flushPendingQuizScores === 'function') window.flushPendingQuizScores();
                                div.remove();
                                return;
                            }
                        } catch(e){ /* fallback */ }
                    }
                    // fallback local store
                    if (findLocalUserByEmail(email)){ msg.innerText=simbaT('modal.emailExists', 'Email already exists (local)'); return; }
                    const users = loadLocalUsers(); users.push({ email, password: pw, profile: {} }); saveLocalUsers(users);
                    localStorage.setItem('simba_user', JSON.stringify({email}));
                    updateAuthUI();
                    if (typeof window.flushPendingQuizScores === 'function') window.flushPendingQuizScores();
                    div.remove();
                });

                // profile logout
                div.querySelector('#simba_logout_btn')?.addEventListener('click', async ()=>{ try { if (!SIMBA_FORCE_LOCAL) await fetchWithTimeout('/api/logout', { method: 'POST', credentials: 'include', timeout: 3000 }); } catch(e){} localStorage.removeItem('simba_user'); updateAuthUI(); div.remove(); });
            }

    function updateAuthUI() {
        const authSection = document.querySelector('.auth-section');
        console.debug('updateAuthUI called on', window.location.pathname, 'authSection?', !!authSection);
        if (!authSection) return;
        // ask server for current user (with timeout) unless forced local-only
        if (SIMBA_FORCE_LOCAL) {
            const local = (()=>{ try { return JSON.parse(localStorage.getItem('simba_user')||'null'); } catch(e){ return null; } })();
            console.debug('SIMBA_FORCE_LOCAL local user:', local);
            if (local && local.email) {
                authSection.innerHTML = `<span class="user-greeting">${local.email}</span><button class="logout-btn">${simbaT('auth.signout', 'Sign out')}</button><button class="profile-btn"><img class="profile-thumb" src="${getDefaultProfileAvatar()}" alt="profile"/></button>`;
            } else {
                authSection.innerHTML = `<button class="sign-up-btn">${simbaT('auth.signup', 'Sign Up')}</button><button class="login-btn">${simbaT('auth.login', 'Login')}</button>`;
            }
            attachAuthHandlers();
            ensureLanguageSwitcher(authSection);
            refreshProfileButton();
        } else {
            fetchWithTimeout('/api/me', { credentials: 'include', timeout: 3000 }).then(r => r.json()).then(data => {
                const user = data && data.user ? data.user : null;
                if (user && user.email) {
                    // render profile button with avatar placeholder, refreshProfileButton() will update the image
                    authSection.innerHTML = `<span class="user-greeting">${user.email}</span><button class="logout-btn">${simbaT('auth.signout', 'Sign out')}</button><button class="profile-btn"><img class="profile-thumb" src="${getDefaultProfileAvatar()}" alt="profile"/></button>`;
                } else {
                    // fallback to localStorage user if present
                    const local = (()=>{ try { return JSON.parse(localStorage.getItem('simba_user')||'null'); } catch(e){ return null; } })();
                        if (local && local.email) {
                        authSection.innerHTML = `<span class="user-greeting">${local.email}</span><button class="logout-btn">${simbaT('auth.signout', 'Sign out')}</button><button class="profile-btn"><img class="profile-thumb" src="${getDefaultProfileAvatar()}" alt="profile"/></button>`;
                    } else {
                        authSection.innerHTML = `<button class="sign-up-btn">${simbaT('auth.signup', 'Sign Up')}</button><button class="login-btn">${simbaT('auth.login', 'Login')}</button>`;
                    }
                }
                attachAuthHandlers();
                ensureLanguageSwitcher(authSection);
                // refresh header avatar if present
                refreshProfileButton();
            }).catch(() => {
                // API unreachable — use localStorage fallback
                const local = (()=>{ try { return JSON.parse(localStorage.getItem('simba_user')||'null'); } catch(e){ return null; } })();
                if (local && local.email) {
                    authSection.innerHTML = `<span class="user-greeting">${local.email}</span><button class="logout-btn">${simbaT('auth.signout', 'Sign out')}</button><button class="profile-btn"><img class="profile-thumb" src="${getDefaultProfileAvatar()}" alt="profile"/></button>`;
                } else {
                    authSection.innerHTML = `<button class="sign-up-btn">${simbaT('auth.signup', 'Sign Up')}</button><button class="login-btn">${simbaT('auth.login', 'Login')}</button>`;
                }
                attachAuthHandlers();
                ensureLanguageSwitcher(authSection);
                refreshProfileButton();
            });
        }
    }

    // load profile either from API (if authenticated) or localStorage
    async function loadProfileForCurrentUser() {
        let current = null;
        try { current = JSON.parse(localStorage.getItem('simba_user')||'null'); } catch(e){}
        // try API first (skip if forced local-only)
        if (!SIMBA_FORCE_LOCAL) {
            try {
                const ping = await fetchWithTimeout('/api/ping', { timeout: 3000 });
                if (ping && ping.ok) {
                    const res = await fetchWithTimeout('/api/profile', { credentials: 'include', timeout: 5000 });
                    if (res && res.ok) {
                        const data = await res.json();
                        return data.profile || {};
                    }
                }
            } catch(e) { /* ignore */ }
        }
        // fallback to local
        if (current && current.email) {
            try { return JSON.parse(localStorage.getItem('simba_profile_'+current.email)||'{}'); } catch(e){}
        }
        return {};
    }

    async function refreshProfileButton() {
        const btn = document.querySelector('.profile-btn');
        if (!btn) return;
        const img = btn.querySelector('img.profile-thumb');
        if (!img) return;
        const profile = await loadProfileForCurrentUser();
        if (profile && profile.avatar) {
            // avatar may be a data URL or a relative path
            img.src = profile.avatar;
        } else {
            img.src = getDefaultProfileAvatar();
        }
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ADD ACTIVE CLASS TO CURRENT NAV ITEM
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentNav = document.querySelector(`a[href="${currentPage}"]`);
    if (currentNav) {
        currentNav.classList.add('active');
    }

    buildNavbarDropdowns();

    // Initialize auth UI
    // expose functions to window so pages loaded later can call them
    try {
        if (typeof window !== 'undefined') {
            window.updateAuthUI = updateAuthUI;
            window.showAuthModal = showAuthModal;
            window.refreshProfileButton = refreshProfileButton;
            window.getStoredProfile = getStoredProfile;
            window.setStoredProfile = setStoredProfile;
            window.mergeStoredProfile = mergeStoredProfile;
            window.appendProfileScore = appendProfileScore;
            window.flushPendingQuizScores = flushPendingQuizScores;
            window.openProfileEditor = function() {
                if (typeof window.showAuthModal === 'function') {
                    window.showAuthModal('profile');
                }
            };
        }
    } catch (e) {}
    bindLogoToHome();
    updateAuthUI();
});

// (global exposure handled inside DOMContentLoaded)

// SMOOTH HOVER ANIMATIONS
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.theme-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// COOKIE CONSENT
function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    const consent = localStorage.getItem('simba_cookie_consent');
    if (!consent) {
        banner.hidden = false;
    }

    const accept = document.getElementById('acceptCookies');
    const reject = document.getElementById('rejectCookies');
    const manage = document.getElementById('manageCookies');

    if (accept) accept.textContent = simbaT('cookie.accept', 'Accept all');
    if (reject) reject.textContent = simbaT('cookie.reject', 'Reject');
    if (manage) manage.textContent = simbaT('cookie.manage', 'Manage settings');

    if (accept) accept.addEventListener('click', function() {
        localStorage.setItem('simba_cookie_consent', 'all');
        banner.hidden = true;
    });

    if (reject) reject.addEventListener('click', function() {
        localStorage.setItem('simba_cookie_consent', 'essential');
        banner.hidden = true;
    });

    if (manage) manage.addEventListener('click', function() {
        window.location.href = 'datenschutz.html#cookie-settings';
    });
}

document.addEventListener('DOMContentLoaded', initCookieBanner);

// If the script was loaded after DOMContentLoaded, ensure header is updated now
try {
    if (typeof updateAuthUI === 'function' && document.readyState !== 'loading') {
        updateAuthUI();
    }
} catch (e) {}

// Keep the header in sync when navigating with the browser back/forward cache
// or when the localStorage session changes in another tab.
try {
    window.addEventListener('pageshow', function() {
        if (typeof updateAuthUI === 'function') updateAuthUI();
    });
    window.addEventListener('storage', function(event) {
        if (event && event.key === 'simba_user' && typeof updateAuthUI === 'function') {
            updateAuthUI();
        }
    });
} catch (e) {}
