(function() {
    const STORAGE_KEY = 'simba_forum_threads';
    const MAX_THREADS = 100;
    const t = (key, fallback = '') => (window.SimbaI18n && typeof window.SimbaI18n.getTranslation === 'function') ? window.SimbaI18n.getTranslation(key, fallback) : fallback;
    const getLocale = () => (window.SimbaI18n && typeof window.SimbaI18n.getLocale === 'function') ? window.SimbaI18n.getLocale(window.SimbaI18n.getCurrentLanguage()) : 'en-US';

    function getCurrentUser() {
        try { return JSON.parse(localStorage.getItem('simba_user') || 'null'); } catch (e) { return null; }
    }

    function getStoredProfile(email) {
        if (!email) return {};
        if (typeof window.getStoredProfile === 'function') {
            return window.getStoredProfile(email) || {};
        }
        try { return JSON.parse(localStorage.getItem('simba_profile_' + email) || '{}'); } catch (e) { return {}; }
    }

    function getPostingIdentity() {
        const user = getCurrentUser();
        if (!user || !user.email) {
            return {
                isAnonymous: true,
                name: 'Anonymous',
                avatar: '../content/img/profil.png',
                email: ''
            };
        }

        const profile = getStoredProfile(user.email);
        return {
            isAnonymous: false,
            name: profile.name || user.email,
            avatar: profile.avatar || '../content/img/profil.png',
            email: user.email
        };
    }

    function loadThreads() {
        try {
            const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            return Array.isArray(items) ? items : [];
        } catch (e) {
            return [];
        }
    }

    function saveThreads(threads) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify((threads || []).slice(0, MAX_THREADS)));
    }

    function createId() {
        return 'forum_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    }

    function formatDate(value) {
        try {
            return new Date(value).toLocaleString(getLocale(), {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return '';
        }
    }

    function escapeHtml(value) {
        return String(value || '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }

    function renderForum() {
        const app = document.getElementById('forumApp');
        if (!app) return;

        const identity = getPostingIdentity();
        const threads = loadThreads().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        app.innerHTML = `
            <section class="forum-layout">
                <div class="forum-panel forum-composer">
                    <div class="forum-panel-heading">
                        <div>
                            <p class="forum-panel-kicker">${t('forum.startTopic', 'Start a topic')}</p>
                            <h2>${t('forum.postTitle', 'Post a question or start a discussion')}</h2>
                        </div>
                        <span class="forum-panel-chip">${t('forum.publicBoard', 'Public board')}</span>
                    </div>
                    <div class="forum-identity-box">
                        <img src="${escapeHtml(identity.avatar)}" alt="identity avatar" />
                        <div>
                            <strong>${escapeHtml(identity.name)}</strong>
                            ${identity.isAnonymous ? `<small>${t('forum.anonymousMessage', 'Anonymous message')}</small>` : ''}
                        </div>
                    </div>
                    <form id="forumPostForm" class="forum-form">
                        <div class="forum-form-grid">
                            <label>
                                ${t('forum.postingAs', 'Posting as')}
                                <input id="forumName" type="text" maxlength="60" readonly value="${escapeHtml(identity.name)}" />
                            </label>
                            <label>
                                ${t('forum.topicType', 'Topic type')}
                                <select id="forumCategory">
                                    <option value="question">${t('forum.question', 'Question')}</option>
                                    <option value="discussion">${t('forum.discussion', 'Discussion')}</option>
                                    <option value="support">${t('forum.support', 'Support')}</option>
                                    <option value="feedback">${t('forum.feedback', 'Feedback')}</option>
                                </select>
                            </label>
                        </div>
                        <label>
                            ${t('forum.titleLabel', 'Title')}
                            <input id="forumTitle" type="text" maxlength="120" placeholder="${t('forum.titlePlaceholder', 'What do you want to ask?')}" />
                        </label>
                        <label>
                            ${t('forum.messageLabel', 'Message')}
                            <textarea id="forumMessage" rows="6" maxlength="2500" placeholder="${t('forum.messagePlaceholder', 'Describe your question or share your point of view...')}"></textarea>
                        </label>
                        <div class="forum-form-footer">
                            <span id="forumFormNote">${t('forum.note', 'Keep it respectful and specific.')}</span>
                            <button class="forum-submit-btn" type="submit">${t('forum.postMessage', 'Post message')}</button>
                        </div>
                    </form>
                </div>

                <div class="forum-panel forum-board">
                    <div class="forum-panel-heading">
                        <div>
                            <p class="forum-panel-kicker">${t('forum.communityThreads', 'Community threads')}</p>
                            <h2>${t('forum.latestMessages', 'Latest messages')}</h2>
                        </div>
                        <span class="forum-panel-chip">${threads.length} posts</span>
                    </div>
                    <div id="forumThreads" class="forum-threads">
                        ${threads.length ? threads.map(renderThread).join('') : `<div class="forum-empty">${t('forum.noPosts', 'No posts yet. Be the first one to start the conversation.')}</div>`}
                    </div>
                </div>
            </section>
        `;

        const form = document.getElementById('forumPostForm');
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const name = document.getElementById('forumName').value.trim() || identity.name;
                const category = document.getElementById('forumCategory').value;
                const title = document.getElementById('forumTitle').value.trim();
                const message = document.getElementById('forumMessage').value.trim();
                const note = document.getElementById('forumFormNote');

                    if (!title || !message) {
                    if (note) note.textContent = t('forum.note', 'Please write both a title and a message.');
                    return;
                }

                const nextThreads = loadThreads();
                nextThreads.unshift({
                    id: createId(),
                    title,
                    category,
                    body: message,
                    author: identity.isAnonymous ? 'Anonymous' : name,
                    avatar: identity.avatar,
                    email: identity.isAnonymous ? '' : identity.email,
                    isAnonymous: identity.isAnonymous,
                    createdAt: new Date().toISOString(),
                    replies: []
                });
                saveThreads(nextThreads);
                if (note) note.textContent = t('forum.posted', 'Your message has been posted.');
                form.reset();
                document.getElementById('forumName').value = identity.name;
                renderForum();
            });
        }

        document.querySelectorAll('[data-reply-toggle]').forEach((button) => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-reply-toggle');
                const replyBox = document.querySelector(`[data-reply-box="${targetId}"]`);
                if (replyBox) {
                    const isHidden = replyBox.hasAttribute('hidden');
                    if (isHidden) {
                        replyBox.removeAttribute('hidden');
                        this.setAttribute('aria-expanded', 'true');
                    } else {
                        replyBox.setAttribute('hidden', '');
                        this.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });

        document.querySelectorAll('[data-reply-form]').forEach((formEl) => {
            formEl.addEventListener('submit', function(event) {
                event.preventDefault();
                const threadId = this.getAttribute('data-reply-form');
                const messageInput = this.querySelector('textarea');
                const message = messageInput.value.trim();
                const replyIdentity = getPostingIdentity();
                if (!message) return;

                const threads = loadThreads();
                const thread = threads.find((item) => item.id === threadId);
                if (!thread) return;

                thread.replies = Array.isArray(thread.replies) ? thread.replies : [];
                thread.replies.push({
                    id: createId(),
                    body: message,
                    author: replyIdentity.isAnonymous ? 'Anonymous' : replyIdentity.name,
                    avatar: replyIdentity.avatar,
                    email: replyIdentity.isAnonymous ? '' : replyIdentity.email,
                    isAnonymous: replyIdentity.isAnonymous,
                    createdAt: new Date().toISOString()
                });
                saveThreads(threads);
                renderForum();
            });
        });
    }

    function renderThread(thread) {
        const replies = Array.isArray(thread.replies) ? thread.replies : [];
        const replyBoxId = thread.id + '_reply';
        const categoryLabel = {
            question: 'Question',
            discussion: 'Discussion',
            support: 'Support',
            feedback: 'Feedback'
        }[thread.category] || 'Post';

        return `
            <article class="forum-thread">
                <div class="forum-thread-top">
                    <div class="forum-thread-meta">
                        <span class="forum-thread-category">${categoryLabel}</span>
                        <h3>${escapeHtml(thread.title)}</h3>
                    </div>
                    <div class="forum-thread-author">
                        <img src="${escapeHtml(thread.avatar || '../content/img/profil.png')}" alt="avatar" />
                        <div>
                            <strong>${escapeHtml(thread.author || 'Guest')}</strong>
                            <small>${formatDate(thread.createdAt)}</small>
                            ${thread.isAnonymous ? '<span class="forum-thread-badge">Anonymous</span>' : ''}
                        </div>
                    </div>
                </div>
                <p class="forum-thread-body">${escapeHtml(thread.body)}</p>
                <div class="forum-thread-actions">
                    <button type="button" class="forum-reply-toggle" data-reply-toggle="${replyBoxId}" aria-expanded="false">Reply</button>
                    <span>${replies.length} ${replies.length === 1 ? t('forum.reply', 'reply') : t('forum.replies', 'replies')}</span>
                </div>
                <div class="forum-replies">
                    ${replies.length ? replies.map((reply) => `
                        <div class="forum-reply">
                            <img src="${escapeHtml(reply.avatar || '../content/img/profil.png')}" alt="avatar" />
                            <div>
                                <div class="forum-reply-header">
                                    <strong>${escapeHtml(reply.author || 'Guest')}</strong>
                                    <small>${formatDate(reply.createdAt)}</small>
                                    ${reply.isAnonymous ? `<span class="forum-thread-badge">${t('forum.anonymous', 'Anonymous')}</span>` : ''}
                                </div>
                                <p>${escapeHtml(reply.body)}</p>
                            </div>
                        </div>
                    `).join('') : `<div class="forum-empty forum-empty--small">${t('forum.noReplies', 'No replies yet. Start the conversation.')}</div>`}
                </div>
                <form class="forum-reply-form" data-reply-form="${thread.id}" data-reply-box="${replyBoxId}" hidden>
                    <textarea rows="3" maxlength="1200" placeholder="${t('forum.replyPlaceholder', 'Write a reply...')}"></textarea>
                    <div class="forum-reply-form-footer">
                        <button type="submit" class="forum-submit-btn forum-submit-btn--small">${t('forum.sendReply', 'Send reply')}</button>
                    </div>
                </form>
            </article>
        `;
    }

    document.addEventListener('DOMContentLoaded', renderForum);
    window.addEventListener('simba-language-changed', renderForum);
    if (document.readyState !== 'loading') {
        renderForum();
    }
})();
