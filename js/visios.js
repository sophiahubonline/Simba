(function() {
    const STORAGE_KEY = 'simba_visio_meetings';
    const t = (key, fallback = '') => (window.SimbaI18n && typeof window.SimbaI18n.getTranslation === 'function') ? window.SimbaI18n.getTranslation(key, fallback) : fallback;
    const getLocale = () => (window.SimbaI18n && typeof window.SimbaI18n.getLocale === 'function') ? window.SimbaI18n.getLocale(window.SimbaI18n.getCurrentLanguage()) : 'en-US';

    function normalizeEmail(value) {
        return String(value || '').trim().toLowerCase();
    }

    function getCurrentSessionUser() {
        try {
            const current = JSON.parse(localStorage.getItem('simba_user') || 'null');
            if (!current || !current.email) return null;
            return current;
        } catch (error) {
            return null;
        }
    }

    function getCurrentUserEmail() {
        const current = getCurrentSessionUser();
        return current && current.email ? normalizeEmail(current.email) : '';
    }

    function getCurrentUserRole() {
        const current = getCurrentSessionUser();
        if (!current || !current.email) return 'user';
        return current.role || (typeof window.getUserRoleByEmail === 'function' ? window.getUserRoleByEmail(current.email) : 'user');
    }

    function canManageVisios() {
        const current = getCurrentSessionUser();
        return !!(current && current.email && typeof window.canManageAdminAccess === 'function' && window.canManageAdminAccess(current.email));
    }

    function loadMeetings() {
        try {
            const meetings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            return Array.isArray(meetings) ? meetings : [];
        } catch (error) {
            return [];
        }
    }

    function saveMeetings(meetings) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.isArray(meetings) ? meetings : []));
    }

    function normalizeMeeting(meeting) {
        const nextMeeting = { ...(meeting || {}) };
        nextMeeting.id = nextMeeting.id || 'visio_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
        nextMeeting.title = String(nextMeeting.title || '').trim();
        nextMeeting.description = String(nextMeeting.description || '').trim();
        nextMeeting.visibility = nextMeeting.visibility === 'private' ? 'private' : 'public';
        nextMeeting.invitees = Array.isArray(nextMeeting.invitees) ? nextMeeting.invitees.map(normalizeEmail).filter(Boolean) : [];
        nextMeeting.createdBy = normalizeEmail(nextMeeting.createdBy || getCurrentUserEmail());
        nextMeeting.createdByRole = nextMeeting.createdByRole || getCurrentUserRole();
        nextMeeting.durationMinutes = Math.max(15, Number(nextMeeting.durationMinutes) || 45);
        nextMeeting.startsAt = nextMeeting.startsAt || new Date().toISOString();
        nextMeeting.createdAt = nextMeeting.createdAt || new Date().toISOString();
        nextMeeting.updatedAt = nextMeeting.updatedAt || nextMeeting.createdAt;
        return nextMeeting;
    }

    function getMeetings() {
        return loadMeetings().map(normalizeMeeting);
    }

    function isMeetingVisibleToUser(meeting, email, role) {
        const normalizedEmail = normalizeEmail(email);
        const normalizedMeeting = normalizeMeeting(meeting);
        if (role === 'admin') return true;
        if (normalizedMeeting.visibility !== 'private') return true;
        return normalizedEmail && (
            normalizedMeeting.createdBy === normalizedEmail ||
            normalizedMeeting.invitees.includes(normalizedEmail)
        );
    }

    function getVisibleMeetings(user) {
        const email = normalizeEmail(user && user.email);
        const role = user && user.role ? user.role : 'user';
        return getMeetings()
            .filter((meeting) => isMeetingVisibleToUser(meeting, email, role))
            .sort((left, right) => new Date(left.startsAt) - new Date(right.startsAt));
    }

    function getMeetingState(meeting) {
        const now = Date.now();
        const start = new Date(meeting.startsAt).getTime();
        const end = start + (Number(meeting.durationMinutes) || 45) * 60000;
        if (Number.isNaN(start)) return { state: 'upcoming', start, end };
        if (now < start) return { state: 'upcoming', start, end };
        if (now <= end) return { state: 'live', start, end };
        return { state: 'ended', start, end };
    }

    function formatDateTime(value) {
        try {
            return new Date(value).toLocaleString(getLocale(), {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return '';
        }
    }

    function formatDayLabel(value) {
        try {
            return new Date(value).toLocaleDateString(getLocale(), {
                weekday: 'short',
                day: '2-digit',
                month: 'short'
            });
        } catch (error) {
            return '';
        }
    }

    function formatRelativeTime(milliseconds) {
        const absolute = Math.max(0, milliseconds);
        const totalMinutes = Math.max(1, Math.round(absolute / 60000));
        if (totalMinutes < 60) {
            return totalMinutes + 'm';
        }
        const hours = Math.round(totalMinutes / 60);
        if (hours < 24) {
            return hours + 'h';
        }
        const days = Math.round(hours / 24);
        return days + 'd';
    }

    function toDateKey(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
    }

    function createMeetingFromForm(form) {
        const title = String(form.querySelector('#visioTitle')?.value || '').trim();
        const description = String(form.querySelector('#visioDescription')?.value || '').trim();
        const date = String(form.querySelector('#visioDate')?.value || '').trim();
        const time = String(form.querySelector('#visioTime')?.value || '').trim();
        const durationMinutes = Number(form.querySelector('#visioDuration')?.value || 45);
        const visibility = String(form.querySelector('#visioVisibility')?.value || 'public');
        const inviteesRaw = String(form.querySelector('#visioInvitees')?.value || '').trim();
        const invitees = inviteesRaw ? inviteesRaw.split(',').map(normalizeEmail).filter(Boolean) : [];

        if (!title || !date || !time) {
            return { ok: false, reason: 'missing-fields' };
        }

        const startsAt = new Date(`${date}T${time}:00`);
        if (Number.isNaN(startsAt.getTime())) {
            return { ok: false, reason: 'invalid-date' };
        }

        const current = getCurrentSessionUser();
        const meeting = normalizeMeeting({
            title,
            description,
            startsAt: startsAt.toISOString(),
            durationMinutes,
            visibility,
            invitees,
            createdBy: current ? current.email : '',
            createdByRole: current ? current.role || 'user' : 'user'
        });

        const meetings = loadMeetings();
        meetings.unshift(meeting);
        saveMeetings(meetings.slice(0, 120));
        return { ok: true, meeting };
    }

    function deleteMeeting(meetingId) {
        const current = getCurrentSessionUser();
        if (!current || !current.email || !canManageVisios()) {
            return { ok: false, reason: 'forbidden' };
        }

        const meetings = loadMeetings();
        const index = meetings.findIndex((meeting) => meeting.id === meetingId);
        if (index === -1) return { ok: false, reason: 'not-found' };
        meetings.splice(index, 1);
        saveMeetings(meetings);
        return { ok: true };
    }

    function joinMeeting(meetingId) {
        window.location.href = `visio-room.html?id=${encodeURIComponent(meetingId)}`;
    }

    function renderCalendarGrid(container, meetings) {
        if (!container) return;
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const gridStart = new Date(firstDay);
        const startOffset = (gridStart.getDay() + 6) % 7;
        gridStart.setDate(gridStart.getDate() - startOffset);

        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const weeks = [];
        let cursor = new Date(gridStart);

        for (let week = 0; week < 6; week += 1) {
            const days = [];
            for (let day = 0; day < 7; day += 1) {
                const key = toDateKey(cursor);
                const dayMeetings = meetings.filter((meeting) => toDateKey(meeting.startsAt) === key);
                days.push({
                    date: new Date(cursor),
                    currentMonth: cursor.getMonth() === now.getMonth(),
                    meetings: dayMeetings
                });
                cursor.setDate(cursor.getDate() + 1);
            }
            weeks.push(days);
        }

        container.innerHTML = `
            <div class="visio-calendar__header">
                ${dayNames.map((day) => `<span>${day}</span>`).join('')}
            </div>
            <div class="visio-calendar__grid">
                ${weeks.map((week) => `
                    ${week.map((day) => `
                        <div class="visio-day${day.currentMonth ? '' : ' is-muted'}">
                            <div class="visio-day__number">${day.date.getDate()}</div>
                            <div class="visio-day__meetings">
                                ${day.meetings.slice(0, 3).map((meeting) => {
                                    const state = getMeetingState(meeting).state;
                                    const badge = meeting.visibility === 'private' ? t('visios.privateMeeting', 'Private meeting') : t('visios.publicMeeting', 'Public meeting');
                                    return `<button type="button" class="visio-day__meeting is-${state}" data-open-visio="${meeting.id}"><strong>${meeting.title}</strong><small>${badge}</small></button>`;
                                }).join('')}
                                ${day.meetings.length > 3 ? `<span class="visio-day__more">+${day.meetings.length - 3}</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                `).join('')}
            </div>
        `;
    }

    function renderMeetingCards(container, meetings, currentUser) {
        if (!container) return;
        if (!meetings.length) {
            container.innerHTML = `<div class="visio-empty">${t('visios.noMeetings', 'No visio slots yet.')}</div>`;
            return;
        }

        const canAdmin = canManageVisios();
        const currentEmail = normalizeEmail(currentUser && currentUser.email);

        container.innerHTML = meetings.map((meeting) => {
            const state = getMeetingState(meeting);
            const stateLabel = state.state === 'live'
                ? t('visios.joinNow', 'Join now')
                : state.state === 'ended'
                    ? t('visios.ended', 'Ended')
                    : t('visios.waitForStart', 'Starts in {time}').replace('{time}', formatRelativeTime(state.start - Date.now()));
            const canJoin = state.state === 'live';
            const visibilityLabel = meeting.visibility === 'private'
                ? t('visios.privateMeeting', 'Private meeting')
                : t('visios.publicMeeting', 'Public meeting');
            const privateNote = meeting.visibility === 'private' ? `<p class="visio-card__note">${t('visios.onlyGuests', 'Private slot. Only invited people can see it.')}</p>` : '';
            const invitedLabel = meeting.visibility === 'private' && meeting.invitees.length
                ? `<p class="visio-card__invitees"><strong>${t('visios.inviteesLabel', 'Invited emails')}:</strong> ${meeting.invitees.map((email) => `<span>${email}</span>`).join(', ')}</p>`
                : '';
            const deleteButton = canAdmin ? `<button type="button" class="visio-card__delete" data-delete-visio="${meeting.id}">×</button>` : '';

            return `
                <article class="visio-card">
                    <div class="visio-card__top">
                        <div>
                            <span class="visio-chip">${visibilityLabel}</span>
                            <h3>${meeting.title}</h3>
                        </div>
                        ${deleteButton}
                    </div>
                    <p class="visio-card__description">${meeting.description || ''}</p>
                    <div class="visio-card__meta">
                        <span>${t('visios.startsAt', 'Starts at')}: ${formatDateTime(meeting.startsAt)}</span>
                        <span>${t('visios.durationLabel', 'Duration')}: ${meeting.durationMinutes} min</span>
                        <span>${stateLabel}</span>
                    </div>
                    ${privateNote}
                    ${invitedLabel}
                    <div class="visio-card__actions">
                        <button type="button" class="btn-primary" data-join-visio="${meeting.id}" ${canJoin ? '' : 'disabled'}>${canJoin ? t('visios.joinCall', 'Join call') : stateLabel}</button>
                    </div>
                    ${meeting.createdBy === currentEmail ? `<small class="visio-card__owner">${t('visios.calendarTitle', 'Calendar')}</small>` : ''}
                </article>
            `;
        }).join('');
    }

    function renderAdminForm(container, currentUser) {
        if (!container) return;
        const canAdmin = canManageVisios();
        container.hidden = !canAdmin;
        if (!canAdmin) return;

        container.innerHTML = `
            <div class="visios-panel-heading">
                <div>
                    <p class="visios-kicker">${t('visios.adminTitle', 'Admin calendar')}</p>
                    <h2>${t('visios.adminTitle', 'Admin calendar')}</h2>
                </div>
                <span class="visio-chip">${t('visios.title', 'Visios')}</span>
            </div>
            <p class="visios-panel__lead">${t('visios.adminBody', 'Create public slots for everyone or private slots for selected people only.')}</p>
            <form id="visioCreateForm" class="visios-form">
                <div class="visios-form__grid">
                    <label>
                        ${t('visios.subjectLabel', 'Subject')}
                        <input id="visioTitle" type="text" maxlength="120" placeholder="${t('visios.subjectLabel', 'Subject')}" />
                    </label>
                    <label>
                        ${t('visios.visibilityLabel', 'Visibility')}
                        <select id="visioVisibility">
                            <option value="public">${t('visios.publicOption', 'Public')}</option>
                            <option value="private">${t('visios.privateOption', 'Private')}</option>
                        </select>
                    </label>
                    <label>
                        ${t('visios.dateLabel', 'Date')}
                        <input id="visioDate" type="date" />
                    </label>
                    <label>
                        ${t('visios.timeLabel', 'Time')}
                        <input id="visioTime" type="time" />
                    </label>
                    <label>
                        ${t('visios.durationLabel', 'Duration')}
                        <select id="visioDuration">
                            <option value="30">30 min</option>
                            <option value="45" selected>45 min</option>
                            <option value="60">60 min</option>
                            <option value="90">90 min</option>
                        </select>
                    </label>
                    <label class="visios-form__invitees" data-invitees-field>
                        ${t('visios.inviteesLabel', 'Invited emails')}
                        <input id="visioInvitees" type="text" placeholder="${t('visios.inviteesPlaceholder', 'friend@example.com, teammate@example.com')}" />
                    </label>
                </div>
                <label>
                    Description
                    <textarea id="visioDescription" rows="4" maxlength="800" placeholder="${t('visios.heroLead', 'Plan private or public video sessions, control who can see each slot, and join when the time comes.')}"></textarea>
                </label>
                <div class="visios-form__footer">
                    <span id="visioAdminMessage" class="visios-form__message"></span>
                    <button type="submit" class="btn-primary">${t('visios.createMeeting', 'Create slot')}</button>
                </div>
            </form>
        `;

        const form = container.querySelector('#visioCreateForm');
        const visibilitySelect = container.querySelector('#visioVisibility');
        const inviteesField = container.querySelector('[data-invitees-field]');
        const message = container.querySelector('#visioAdminMessage');
        const dateInput = container.querySelector('#visioDate');
        const timeInput = container.querySelector('#visioTime');
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        if (dateInput) dateInput.value = now.toISOString().slice(0, 10);
        if (timeInput) timeInput.value = now.toISOString().slice(11, 16);

        const syncInvitees = () => {
            if (!inviteesField || !visibilitySelect) return;
            inviteesField.hidden = visibilitySelect.value !== 'private';
        };
        syncInvitees();
        visibilitySelect?.addEventListener('change', syncInvitees);

        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            const result = createMeetingFromForm(form);
            if (!result.ok) {
                if (message) {
                    message.textContent = result.reason === 'invalid-date'
                        ? t('visios.accessDenied', 'You do not have access to this visio.')
                        : t('visios.noMeetings', 'No visio slots yet.');
                }
                return;
            }

            if (message) message.textContent = t('visios.createMeeting', 'Create slot');
            renderVisiosPage();
        });
    }

    function renderVisiosPage() {
        const root = document.getElementById('visiosApp');
        if (!root) return;

        document.title = t('visios.pageTitle', 'Visios - SIMBA PROJECT');

        const currentUser = getCurrentSessionUser();
        const currentRole = getCurrentUserRole();
        const visibleMeetings = getVisibleMeetings(currentUser);
        const monthLabel = document.getElementById('visioMonthLabel');
        const calendar = document.getElementById('visioCalendar');
        const upcoming = document.getElementById('visioUpcoming');
        const adminPanel = document.getElementById('visioAdminPanel');

        if (monthLabel) {
            monthLabel.textContent = new Date().toLocaleDateString(getLocale(), { month: 'long', year: 'numeric' });
        }

        renderCalendarGrid(calendar, visibleMeetings);
        renderMeetingCards(upcoming, visibleMeetings, currentUser);
        renderAdminForm(adminPanel, currentUser);

        root.querySelectorAll('[data-open-visio]').forEach((button) => {
            button.addEventListener('click', function() {
                joinMeeting(this.getAttribute('data-open-visio'));
            });
        });

        root.querySelectorAll('[data-join-visio]').forEach((button) => {
            button.addEventListener('click', function() {
                joinMeeting(this.getAttribute('data-join-visio'));
            });
        });

        root.querySelectorAll('[data-delete-visio]').forEach((button) => {
            button.addEventListener('click', function() {
                if (!window.confirm(t('visios.deleteConfirm', 'Delete'))) return;
                const result = deleteMeeting(this.getAttribute('data-delete-visio'));
                if (result.ok) {
                    renderVisiosPage();
                }
            });
        });

        if (currentRole !== 'admin' && adminPanel) {
            adminPanel.hidden = true;
        }
    }

    function renderRoom() {
        const root = document.getElementById('visioRoomApp');
        if (!root) return;

        const params = new URLSearchParams(window.location.search);
        const meetingId = params.get('id') || '';
        const meeting = getMeetings().find((item) => item.id === meetingId) || null;
        const currentUser = getCurrentSessionUser();
        const currentEmail = normalizeEmail(currentUser && currentUser.email);
        const currentRole = getCurrentUserRole();
        const canAccess = !!meeting && isMeetingVisibleToUser(meeting, currentEmail, currentRole);

        document.title = t('visios.pageTitle', 'Visios - SIMBA PROJECT');

        if (!meeting) {
            root.innerHTML = `<div class="visio-room__notice">${t('visios.noMeetings', 'No visio slots yet.')}</div>`;
            return;
        }

        if (!canAccess) {
            root.innerHTML = `
                <section class="visio-room visio-room--denied">
                    <h1>${t('visios.accessDenied', 'You do not have access to this visio.')}</h1>
                    <p>${meeting.visibility === 'private' ? t('visios.onlyGuests', 'Private slot. Only invited people can see it.') : ''}</p>
                    <a class="btn-primary" href="visios.html">${t('visios.backToCalendar', 'Back to calendar')}</a>
                </section>
            `;
            return;
        }

        const state = getMeetingState(meeting);
        const isLive = state.state === 'live';
        const isPrivate = meeting.visibility === 'private';
        const invitees = meeting.invitees || [];
        let localStream = null;

        root.innerHTML = `
            <section class="visio-room">
                <div class="visio-room__header">
                    <div>
                        <span class="visio-chip">${isPrivate ? t('visios.privateRoom', 'Private room') : t('visios.publicRoom', 'Public room')}</span>
                        <h1>${meeting.title}</h1>
                        <p>${meeting.description || ''}</p>
                    </div>
                    <div class="visio-room__time">
                        <strong>${t('visios.startsAt', 'Starts at')}: ${formatDateTime(meeting.startsAt)}</strong>
                        <small>${state.state === 'live' ? t('visios.joinNow', 'Join now') : state.state === 'ended' ? t('visios.ended', 'Ended') : t('visios.waitForStart', 'Starts in {time}').replace('{time}', formatRelativeTime(state.start - Date.now()))}</small>
                    </div>
                </div>
                <div class="visio-room__body">
                    <div class="visio-room__stage">
                        <video id="visioLocalVideo" class="visio-room__video" autoplay playsinline muted></video>
                        <div class="visio-room__video-hint">${t('visios.waitingMedia', 'Enable your camera or microphone to join the call.')}</div>
                    </div>
                    <aside class="visio-room__panel">
                        <div class="visio-room__panel-block">
                            <h2>${t('visios.roomTitle', 'Visio room')}</h2>
                            <p>${t('visios.roomLead', 'Camera and microphone controls for this meeting.')}</p>
                        </div>
                        <div class="visio-room__controls">
                            <button id="visioJoinBtn" class="btn-primary" type="button" ${isLive ? '' : 'disabled'}>${isLive ? t('visios.joinRoom', 'Join room') : t('visios.waitForStart', 'Starts in {time}').replace('{time}', formatRelativeTime(state.start - Date.now()))}</button>
                            <button id="visioCameraBtn" class="btn-edit" type="button" disabled>${t('visios.startCamera', 'Turn on camera')}</button>
                            <button id="visioMicBtn" class="btn-edit" type="button" disabled>${t('visios.startMic', 'Turn on microphone')}</button>
                            <button id="visioLeaveBtn" class="btn-edit" type="button" disabled>${t('visios.leaveCall', 'Leave call')}</button>
                            <a class="btn-link visio-room__back" href="visios.html">${t('visios.backToCalendar', 'Back to calendar')}</a>
                        </div>
                        <div class="visio-room__details">
                            <p><strong>${t('visios.visibilityLabel', 'Visibility')}:</strong> ${isPrivate ? t('visios.privateMeeting', 'Private meeting') : t('visios.publicMeeting', 'Public meeting')}</p>
                            ${invitees.length ? `<p><strong>${t('visios.inviteesLabel', 'Invited emails')}:</strong> ${invitees.join(', ')}</p>` : ''}
                        </div>
                    </aside>
                </div>
            </section>
        `;

        const video = root.querySelector('#visioLocalVideo');
        const joinBtn = root.querySelector('#visioJoinBtn');
        const cameraBtn = root.querySelector('#visioCameraBtn');
        const micBtn = root.querySelector('#visioMicBtn');
        const leaveBtn = root.querySelector('#visioLeaveBtn');
        const videoHint = root.querySelector('.visio-room__video-hint');
        let cameraEnabled = false;
        let micEnabled = false;

        async function startMedia() {
            if (localStream) return localStream;
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('media-unavailable');
            }
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (video) video.srcObject = localStream;
            cameraEnabled = true;
            micEnabled = true;
            if (cameraBtn) cameraBtn.textContent = t('visios.stopCamera', 'Turn off camera');
            if (micBtn) micBtn.textContent = t('visios.stopMic', 'Turn off microphone');
            if (cameraBtn) cameraBtn.disabled = false;
            if (micBtn) micBtn.disabled = false;
            if (leaveBtn) leaveBtn.disabled = false;
            if (videoHint) videoHint.hidden = true;
            return localStream;
        }

        function stopMedia() {
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
                localStream = null;
            }
            if (video) video.srcObject = null;
            cameraEnabled = false;
            micEnabled = false;
            if (cameraBtn) cameraBtn.textContent = t('visios.startCamera', 'Turn on camera');
            if (micBtn) micBtn.textContent = t('visios.startMic', 'Turn on microphone');
            if (cameraBtn) cameraBtn.disabled = true;
            if (micBtn) micBtn.disabled = true;
            if (leaveBtn) leaveBtn.disabled = true;
            if (videoHint) videoHint.hidden = false;
        }

        function toggleTrack(kind) {
            if (!localStream) return;
            const tracks = kind === 'video' ? localStream.getVideoTracks() : localStream.getAudioTracks();
            const enabled = tracks.some((track) => track.enabled);
            tracks.forEach((track) => {
                track.enabled = !enabled;
            });
            if (kind === 'video') {
                cameraEnabled = !enabled;
                if (cameraBtn) cameraBtn.textContent = cameraEnabled ? t('visios.stopCamera', 'Turn off camera') : t('visios.startCamera', 'Turn on camera');
            } else {
                micEnabled = !enabled;
                if (micBtn) micBtn.textContent = micEnabled ? t('visios.stopMic', 'Turn off microphone') : t('visios.startMic', 'Turn on microphone');
            }
        }

        joinBtn?.addEventListener('click', async () => {
            try {
                await startMedia();
                if (joinBtn) joinBtn.disabled = true;
            } catch (error) {
                window.alert(t('visios.waitingMedia', 'Enable your camera or microphone to join the call.'));
            }
        });

        cameraBtn?.addEventListener('click', () => toggleTrack('video'));
        micBtn?.addEventListener('click', () => toggleTrack('audio'));
        leaveBtn?.addEventListener('click', () => {
            stopMedia();
            if (joinBtn) joinBtn.disabled = !isLive;
        });

        if (!isLive) {
            if (joinBtn) joinBtn.disabled = true;
        }

        window.addEventListener('beforeunload', stopMedia);
    }

    document.addEventListener('DOMContentLoaded', function() {
        renderVisiosPage();
        renderRoom();
    });

    window.addEventListener('simba-language-changed', function() {
        renderVisiosPage();
        renderRoom();
    });
})();
