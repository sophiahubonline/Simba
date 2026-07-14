(function() {
    const STORAGE_KEY = 'simba_forum_threads';
    const MAX_THREADS = 100;
    const MODERATION_REASONS = [
        { key: 'inappropriate', label: 'Inappropriate' },
        { key: 'harassment', label: 'Harassment' },
        { key: 'spam', label: 'Spam' },
        { key: 'hate', label: 'Hate speech' },
        { key: 'other', label: 'Other' }
    ];
    const REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '😢'];
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
                email: '',
                role: 'user'
            };
        }

        const profile = getStoredProfile(user.email);
        const role = user.role || profile.role || (typeof window.getUserRoleByEmail === 'function' ? window.getUserRoleByEmail(user.email) : 'user');
        return {
            isAnonymous: false,
            name: profile.name || user.email,
            avatar: profile.avatar || '../content/img/profil.png',
            email: user.email,
            role,
            canManageAdminAccess: typeof window.canManageAdminAccess === 'function' ? window.canManageAdminAccess(user.email) : false
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

    async function saveThreads(threads) {
        const nextThreads = Array.isArray(threads) ? threads.slice(0, MAX_THREADS) : [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextThreads));
        if (typeof window.saveForumThreads === 'function') {
            await window.saveForumThreads(nextThreads);
            return nextThreads;
        }
        try {
            await fetch('/api/forum/threads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ threads: nextThreads })
            });
        } catch (error) {}
        return nextThreads;
    }

    async function syncForumThreadsFromServer() {
        try {
            const ping = await fetch('/api/ping');
            if (!ping.ok) return loadThreads();
            const res = await fetch('/api/forum/threads', { credentials: 'include' });
            if (!res.ok) return loadThreads();
            const data = await res.json();
            const items = Array.isArray(data.threads) ? data.threads.slice(0, MAX_THREADS) : [];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            return items;
        } catch (error) {
            return loadThreads();
        }
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

    function getReactionActor() {
        const user = getCurrentUser();
        if (user && user.email) {
            return {
                key: 'user:' + String(user.email).trim().toLowerCase(),
                email: user.email,
                isAnonymous: false
            };
        }

        try {
            let guestId = localStorage.getItem('simba_guest_id');
            if (!guestId) {
                guestId = 'guest_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
                localStorage.setItem('simba_guest_id', guestId);
            }
            return {
                key: 'guest:' + guestId,
                email: '',
                isAnonymous: true
            };
        } catch (error) {
            return {
                key: 'guest:anonymous',
                email: '',
                isAnonymous: true
            };
        }
    }

    function normalizeReactions(item) {
        if (!item.reactions || typeof item.reactions !== 'object' || Array.isArray(item.reactions)) {
            item.reactions = {};
        }
        if (!item.reactionUsers || typeof item.reactionUsers !== 'object' || Array.isArray(item.reactionUsers)) {
            item.reactionUsers = {};
        }
        REACTION_EMOJIS.forEach((emoji) => {
            if (typeof item.reactions[emoji] !== 'number') {
                item.reactions[emoji] = 0;
            }
        });
        return item;
    }

    function readAttachmentFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                dataUrl: reader.result
            });
            reader.onerror = () => reject(new Error('Unable to read file'));
            reader.readAsDataURL(file);
        });
    }

    function renderAttachment(attachment) {
        if (!attachment || !attachment.dataUrl) return '';
        const fileName = escapeHtml(attachment.name || 'file');
        const fileType = String(attachment.type || '');
        const isImage = fileType.startsWith('image/');

        if (isImage) {
            return `
                <figure class="forum-attachment forum-attachment--image">
                    <img src="${escapeHtml(attachment.dataUrl)}" alt="${fileName}" />
                    <figcaption>${fileName}</figcaption>
                </figure>
            `;
        }

        return `
            <a class="forum-attachment forum-attachment--file" href="${escapeHtml(attachment.dataUrl)}" download="${fileName}">
                <span>📎</span>
                <span>${fileName}</span>
            </a>
        `;
    }

    function renderReactionBar(targetType, targetId, item, actorKey) {
        const reactions = normalizeReactions(item).reactions;
        const userReaction = item.reactionUsers[actorKey] || '';
        return `
            <div class="forum-reactions" data-reaction-target="${targetType}" data-reaction-id="${targetId}">
                ${REACTION_EMOJIS.map((emoji) => `
                    <button type="button" class="forum-reaction${userReaction === emoji ? ' is-active' : ''}" data-react-emoji="${emoji}" data-react-target="${targetType}" data-react-id="${targetId}">
                        <span class="forum-reaction__emoji">${emoji}</span>
                        <span class="forum-reaction__count">${reactions[emoji] || 0}</span>
                    </button>
                `).join('')}
            </div>
        `;
    }

    function toggleReaction(targetType, targetId, emoji) {
        const actor = getReactionActor();
        if (actor.isAnonymous) {
            return { ok: false, reason: 'not-logged-in' };
        }
        const threads = loadThreads();
        let targetItem = null;

        if (targetType === 'thread') {
            targetItem = threads.find((thread) => thread.id === targetId) || null;
        } else if (targetType === 'reply') {
            threads.forEach((thread) => {
                if (targetItem) return;
                const reply = Array.isArray(thread.replies) ? thread.replies.find((item) => item.id === targetId) : null;
                if (reply) targetItem = reply;
            });
        }

        if (!targetItem) return { ok: false, reason: 'not-found' };

        normalizeReactions(targetItem);
        const currentReaction = targetItem.reactionUsers[actor.key] || '';
        if (currentReaction === emoji) {
            targetItem.reactionUsers[actor.key] = '';
            targetItem.reactions[emoji] = Math.max(0, (targetItem.reactions[emoji] || 0) - 1);
        } else {
            if (currentReaction) {
                targetItem.reactions[currentReaction] = Math.max(0, (targetItem.reactions[currentReaction] || 0) - 1);
            }
            targetItem.reactionUsers[actor.key] = emoji;
            targetItem.reactions[emoji] = (targetItem.reactions[emoji] || 0) + 1;
        }

        saveThreads(threads);
        return { ok: true };
    }

    function deleteOwnForumItem(targetType, targetId) {
        const current = getCurrentUser();
        if (!current || !current.email) return { ok: false, reason: 'not-logged-in' };

        const currentEmail = String(current.email).trim().toLowerCase();
        const threads = loadThreads();

        if (targetType === 'thread') {
            const index = threads.findIndex((thread) => String(thread.email || '').trim().toLowerCase() === currentEmail && thread.id === targetId);
            if (index === -1) return { ok: false, reason: 'not-found' };
            threads.splice(index, 1);
            saveThreads(threads);
            return { ok: true };
        }

        if (targetType === 'reply') {
            let removed = false;
            threads.forEach((thread) => {
                if (removed || !Array.isArray(thread.replies)) return;
                const replyIndex = thread.replies.findIndex((reply) => String(reply.email || '').trim().toLowerCase() === currentEmail && reply.id === targetId);
                if (replyIndex !== -1) {
                    thread.replies.splice(replyIndex, 1);
                    removed = true;
                }
            });
            if (!removed) return { ok: false, reason: 'not-found' };
            saveThreads(threads);
            return { ok: true };
        }

        return { ok: false, reason: 'invalid-type' };
    }

    function buildReasonButtons(panelId) {
        return MODERATION_REASONS.map((reason) => `
            <button type="button" class="forum-moderation-reason" data-moderation-reason="${reason.key}" data-moderation-panel="${panelId}">${t('forum.' + reason.key, reason.label)}</button>
        `).join('');
    }

    function buildModerationPanel(panelId, targetType) {
        return `
            <div class="forum-moderation-panel" data-moderation-panel="${panelId}" data-target-type="${targetType}" hidden>
                <div class="forum-moderation-panel__header">
                    <strong>${t('forum.deleteDialogTitle', 'Delete post')}</strong>
                    <button type="button" class="forum-moderation-close" data-moderation-close="${panelId}">×</button>
                </div>
                <p class="forum-moderation-panel__help">${t('forum.deleteDialogHelp', 'Choose a reason before deleting this post.')}</p>
                <div class="forum-moderation-reason-grid">
                    ${buildReasonButtons(panelId)}
                </div>
                <input type="text" class="forum-moderation-other" data-moderation-other="${panelId}" placeholder="${t('forum.otherReason', 'Other reason')}" hidden />
                <div class="forum-moderation-panel__footer">
                    <button type="button" class="forum-submit-btn forum-submit-btn--small forum-moderation-confirm" data-moderation-confirm="${panelId}" disabled>${t('forum.deleteConfirm', 'Delete')}</button>
                </div>
            </div>
        `;
    }

    function getReasonLabel(reasonKey) {
        return (MODERATION_REASONS.find((reason) => reason.key === reasonKey) || {}).label || reasonKey || 'Other';
    }

    function deleteForumItem(targetType, targetId, reasonKey, otherReason) {
        const threads = loadThreads();
        const targetReason = reasonKey === 'other' ? String(otherReason || '').trim() : getReasonLabel(reasonKey);
        if (!targetReason) return { ok: false, reason: 'missing-reason' };

        let targetRecord = null;

        if (targetType === 'thread') {
            targetRecord = threads.find((thread) => thread.id === targetId) || null;
            if (!targetRecord) return { ok: false, reason: 'not-found' };
            targetRecord.deleted = true;
            targetRecord.deletionReason = targetReason;
            targetRecord.deletedAt = new Date().toISOString();
            targetRecord.deletedBy = getPostingIdentity().email;
        } else if (targetType === 'reply') {
            threads.forEach((thread) => {
                const reply = Array.isArray(thread.replies) ? thread.replies.find((item) => item.id === targetId) : null;
                if (reply && !targetRecord) {
                    targetRecord = reply;
                    reply.deleted = true;
                    reply.deletionReason = targetReason;
                    reply.deletedAt = new Date().toISOString();
                    reply.deletedBy = getPostingIdentity().email;
                }
            });
            if (!targetRecord) return { ok: false, reason: 'not-found' };
        }

        if (targetRecord && targetRecord.email && !targetRecord.isAnonymous && typeof window.addUserNotification === 'function') {
            const localizedType = targetType === 'reply' ? t('forum.reply', 'reply') : t('forum.postLabel', 'post');
            window.addUserNotification(targetRecord.email, {
                type: 'forum-post-deleted',
                title: t('forum.postDeletedNotificationTitle', 'Your forum post was deleted'),
                body: t('forum.postDeletedNotificationBody', 'A moderator removed your {type}. Reason: {reason}')
                    .replace('{type}', localizedType)
                    .replace('{reason}', targetReason),
                threadId: targetType === 'thread' ? targetId : (threads.find((thread) => Array.isArray(thread.replies) && thread.replies.some((reply) => reply.id === targetId)) || {}).id || '',
                targetType,
                reason: targetReason,
                deletedBy: getPostingIdentity().email,
                deletedByName: getPostingIdentity().name
            });
        }

        saveThreads(threads);
        return { ok: true };
    }

    async function renderForum() {
        const app = document.getElementById('forumApp');
        if (!app) return;

        await syncForumThreadsFromServer();

        const currentSession = (() => { try { return JSON.parse(localStorage.getItem('simba_user') || 'null'); } catch (error) { return null; } })();
        if (!currentSession || !currentSession.email) {
            try {
                const meRes = await fetch('/api/me', { credentials: 'include' });
                if (meRes.ok) {
                    const meData = await meRes.json();
                    if (meData && meData.user && meData.user.email) {
                        localStorage.setItem('simba_user', JSON.stringify(meData.user));
                    }
                }
            } catch (error) {}
        }

        const identity = getPostingIdentity();
        const threads = loadThreads().filter((thread) => !thread.deleted).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const canModerate = identity.role === 'admin';

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
                            ${identity.role === 'admin' ? '<span class="forum-thread-badge forum-thread-badge--admin">Admin</span>' : ''}
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
                        <label class="forum-form-attachment-field">
                            Attachment
                            <input id="forumAttachment" type="file" />
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

        wireModerationControls(app);

        const form = document.getElementById('forumPostForm');
        if (form) {
            form.addEventListener('submit', async function(event) {
                event.preventDefault();
                const name = document.getElementById('forumName').value.trim() || identity.name;
                const category = document.getElementById('forumCategory').value;
                const title = document.getElementById('forumTitle').value.trim();
                const message = document.getElementById('forumMessage').value.trim();
                const note = document.getElementById('forumFormNote');
                const attachmentInput = document.getElementById('forumAttachment');
                const attachmentFile = attachmentInput && attachmentInput.files && attachmentInput.files[0] ? attachmentInput.files[0] : null;

                    if (!title || !message) {
                    if (note) note.textContent = t('forum.note', 'Please write both a title and a message.');
                    return;
                }

                let attachment = null;
                if (attachmentFile) {
                    try {
                        attachment = await readAttachmentFile(attachmentFile);
                    } catch (error) {
                        if (note) note.textContent = 'Could not read the attachment.';
                        return;
                    }
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
                    role: identity.role || 'user',
                    isAnonymous: identity.isAnonymous,
                    createdAt: new Date().toISOString(),
                    replies: [],
                    attachment,
                    reactions: {},
                    reactionUsers: {}
                });
                await saveThreads(nextThreads);
                if (note) note.textContent = t('forum.posted', 'Your message has been posted.');
                form.reset();
                document.getElementById('forumName').value = identity.name;
                await renderForum();
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
                    role: replyIdentity.role || 'user',
                    isAnonymous: replyIdentity.isAnonymous,
                    createdAt: new Date().toISOString(),
                    reactions: {},
                    reactionUsers: {}
                });
                saveThreads(threads);
                void renderForum();
            });
        });

    }

    function wireModerationControls(root) {
        const scope = root || document;

        scope.querySelectorAll('[data-delete-toggle]').forEach((button) => {
            button.addEventListener('click', function() {
                const panelId = this.getAttribute('data-delete-toggle');
                const panel = scope.querySelector(`[data-moderation-panel="${panelId}"]`);
                if (panel) {
                    panel.hidden = false;
                    panel.dataset.selectedReason = '';
                    const confirmBtn = panel.querySelector('[data-moderation-confirm]');
                    if (confirmBtn) confirmBtn.disabled = true;
                    const otherInput = panel.querySelector('[data-moderation-other]');
                    if (otherInput) otherInput.hidden = true;
                }
            });
        });

        scope.querySelectorAll('[data-moderation-close]').forEach((button) => {
            button.addEventListener('click', function() {
                const panelId = this.getAttribute('data-moderation-close');
                const panel = scope.querySelector(`[data-moderation-panel="${panelId}"]`);
                if (panel) panel.hidden = true;
            });
        });

        scope.querySelectorAll('[data-moderation-reason]').forEach((button) => {
            button.addEventListener('click', function() {
                const panelId = this.getAttribute('data-moderation-panel');
                const panel = scope.querySelector(`[data-moderation-panel="${panelId}"]`);
                if (!panel) return;
                panel.dataset.selectedReason = this.getAttribute('data-moderation-reason') || '';
                const confirmBtn = panel.querySelector('[data-moderation-confirm]');
                const otherInput = panel.querySelector('[data-moderation-other]');
                const isOther = panel.dataset.selectedReason === 'other';
                if (otherInput) otherInput.hidden = !isOther;
                if (confirmBtn) confirmBtn.disabled = isOther ? !String(otherInput && otherInput.value || '').trim() : false;
                panel.querySelectorAll('[data-moderation-reason]').forEach((item) => item.classList.toggle('is-selected', item === this));
            });
        });

        scope.querySelectorAll('[data-moderation-other]').forEach((input) => {
            input.addEventListener('input', function() {
                const panelId = this.getAttribute('data-moderation-other');
                const panel = scope.querySelector(`[data-moderation-panel="${panelId}"]`);
                const confirmBtn = panel ? panel.querySelector('[data-moderation-confirm]') : null;
                if (confirmBtn) confirmBtn.disabled = !String(this.value || '').trim();
            });
        });

        scope.querySelectorAll('[data-moderation-confirm]').forEach((button) => {
            button.addEventListener('click', function() {
                const panelId = this.getAttribute('data-moderation-confirm');
                const panel = scope.querySelector(`[data-moderation-panel="${panelId}"]`);
                if (!panel) return;
                const targetType = panel.getAttribute('data-target-type') || 'thread';
                const selectedReason = panel.dataset.selectedReason || '';
                const otherInput = panel.querySelector('[data-moderation-other]');
                const otherReason = otherInput ? otherInput.value.trim() : '';
                const result = deleteForumItem(targetType, panelId, selectedReason, otherReason);
                if (!result.ok) {
                    panel.querySelector('.forum-moderation-panel__help').textContent = selectedReason === 'other' ? t('forum.provideReason', 'Please provide a reason.') : t('forum.couldNotDelete', 'Could not delete this post.');
                    return;
                }
                void renderForum();
            });
        });

        scope.querySelectorAll('[data-delete-own]').forEach((button) => {
            button.addEventListener('click', function() {
                const targetType = this.getAttribute('data-delete-own');
                const targetId = this.getAttribute('data-delete-id');
                if (!targetId) return;
                if (!window.confirm(t('forum.deletePermanentlyConfirm', 'Delete this post permanently?'))) return;
                const result = deleteOwnForumItem(targetType, targetId);
                if (!result.ok) return;
                void renderForum();
            });
        });

        scope.querySelectorAll('[data-react-emoji]').forEach((button) => {
            button.addEventListener('click', function() {
                const emoji = this.getAttribute('data-react-emoji');
                const targetType = this.getAttribute('data-react-target');
                const targetId = this.getAttribute('data-react-id');
                if (!emoji || !targetType || !targetId) return;
                const result = toggleReaction(targetType, targetId, emoji);
                if (!result.ok) {
                    if (result.reason === 'not-logged-in') {
                        window.alert(t('forum.reactionLoginPrompt', 'Please log in or sign up to react to posts.'));
                    }
                    return;
                }
                void renderForum();
            });
        });
    }

    function renderThread(thread) {
        const normalizedThread = normalizeReactions(thread);
        const replies = (Array.isArray(thread.replies) ? thread.replies : []).filter((reply) => !reply.deleted);
        const replyBoxId = thread.id + '_reply';
        const currentUser = getCurrentUser();
        const currentEmail = currentUser && currentUser.email ? String(currentUser.email).trim().toLowerCase() : '';
        const threadOwnerEmail = String(thread.email || '').trim().toLowerCase();
        const isAdmin = getPostingIdentity().role === 'admin';
        const canShowReplies = true;
        const actor = getReactionActor();
        const deleteButtonLabel = t('forum.deleteOwnPost', 'Delete my post');
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
                            ${thread.role === 'admin' ? '<span class="forum-thread-badge forum-thread-badge--admin">Admin</span>' : ''}
                            ${thread.isAnonymous ? '<span class="forum-thread-badge">Anonymous</span>' : ''}
                            ${thread.email && isAdmin ? `<a class="forum-profile-link" href="profile.html?user=${encodeURIComponent(thread.email)}">${t('profile.openProfile', 'View profile')}</a>` : ''}
                        </div>
                    </div>
                </div>
                <p class="forum-thread-body">${escapeHtml(thread.body)}</p>
                ${thread.attachment ? renderAttachment(thread.attachment) : ''}
                ${renderReactionBar('thread', thread.id, normalizedThread, actor.key)}
                <div class="forum-thread-actions">
                    ${canShowReplies ? `<button type="button" class="forum-reply-toggle" data-reply-toggle="${replyBoxId}" aria-expanded="false">Reply</button>` : ''}
                    <span>${replies.length} ${replies.length === 1 ? t('forum.reply', 'reply') : t('forum.replies', 'replies')}</span>
                    ${thread.email && !thread.isAnonymous && threadOwnerEmail && threadOwnerEmail === currentEmail ? `<button type="button" class="forum-reply-toggle forum-delete-own" data-delete-own="thread" data-delete-id="${thread.id}">${deleteButtonLabel}</button>` : ''}
                    ${isAdmin && !(thread.email && !thread.isAnonymous && threadOwnerEmail && threadOwnerEmail === currentEmail) ? `<button type="button" class="forum-reply-toggle forum-delete-toggle" data-delete-toggle="${thread.id}">Delete</button>` : ''}
                </div>
                ${isAdmin ? buildModerationPanel(thread.id, 'thread') : ''}
                <div class="forum-replies">
                    ${replies.length ? replies.map((reply) => {
                        const normalizedReply = normalizeReactions(reply);
                        const replyOwnerEmail = String(reply.email || '').trim().toLowerCase();
                        const isOwnerReply = reply.email && !reply.isAnonymous && replyOwnerEmail === currentEmail;
                        return `
                        <div class="forum-reply">
                            <img src="${escapeHtml(reply.avatar || '../content/img/profil.png')}" alt="avatar" />
                            <div>
                                <div class="forum-reply-header">
                                    <strong>${escapeHtml(reply.author || 'Guest')}</strong>
                                    <small>${formatDate(reply.createdAt)}</small>
                                    ${reply.role === 'admin' ? `<span class="forum-thread-badge forum-thread-badge--admin">Admin</span>` : ''}
                                    ${reply.isAnonymous ? `<span class="forum-thread-badge">${t('forum.anonymous', 'Anonymous')}</span>` : ''}
                                    ${reply.email && isAdmin ? `<a class="forum-profile-link" href="profile.html?user=${encodeURIComponent(reply.email)}">View profile</a>` : ''}
                                </div>
                                <p>${escapeHtml(reply.body)}</p>
                                ${renderReactionBar('reply', reply.id, normalizedReply, actor.key)}
                                ${isOwnerReply ? `<button type="button" class="forum-reply-toggle forum-delete-own" data-delete-own="reply" data-delete-id="${reply.id}">${t('forum.deleteOwnReply', 'Delete my reply')}</button>` : ''}
                                ${isAdmin && !isOwnerReply ? `<button type="button" class="forum-reply-toggle forum-delete-toggle" data-delete-toggle="${reply.id}">${t('forum.deleteReply', 'Delete reply')}</button>` : ''}
                            </div>
                        </div>
                        ${isAdmin && !isOwnerReply ? buildModerationPanel(reply.id, 'reply') : ''}
                    `; }).join('') : `<div class="forum-empty forum-empty--small">${t('forum.noReplies', 'No replies yet. Start the conversation.')}</div>`}
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

    document.addEventListener('DOMContentLoaded', () => { void renderForum(); });
    window.addEventListener('simba-language-changed', () => { void renderForum(); });
    if (document.readyState !== 'loading') {
        void renderForum();
    }

    document.addEventListener('forum-render-complete', function(event) {
        wireModerationControls(event && event.detail && event.detail.root ? event.detail.root : document);
    });

    window.addEventListener('simba-admin-role-changed', () => { void renderForum(); });
})();
