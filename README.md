# SIMBA Project — Website Documentation & Handover Guide

## 1. Introduction — What is SIMBA?

SIMBA is a digital platform developed as part of the **SIMBA Project**, an initiative created by **Jürgen Muthmann** within the **Anna und Ferdinand Tillmann-Stiftung**, located in Sundern, Germany.

The objective of the project is to create an accessible digital space focused on **psychological well-being, personal development and self-reflection**.

The platform provides educational resources about different psychological topics and offers users tools to better understand themselves, their emotions and their behaviours.

The website is not intended to replace professional psychological support or provide medical diagnoses. Its purpose is to offer accessible information, encourage self-reflection and help users better understand certain psychological mechanisms.

The name **SIMBA** refers to the main character of *The Lion King*. Simba's journey represents personal growth, overcoming difficulties and learning to understand oneself, which reflects the philosophy behind the project.

---

# 2. Project Objectives

The SIMBA project has two main objectives.

## 2.1 Create a digital psychological resource platform

The main goal is to create a website gathering accessible resources about psychology and personal development.

The platform covers different topics related to mental health and personal growth.

Each topic aims to provide:

- educational explanations;
- psychological concepts made accessible to everyone;
- reflection exercises;
- tools to better understand emotions and behaviours.

The current topics available on the platform are:

- Attachment
- Family Conflict
- Unfairness in Relationships
- Social Anxiety
- FOMO (Fear Of Missing Out)
- OCD (Obsessive Compulsive Disorder)
- PTSD (Post-Traumatic Stress Disorder)
- Burnout
- Dissociation
- Binge Eating Disorder
- Insomnia
- Resilience
- Imposter Syndrome
- Procrastination
- Helplessness
- ADHD
- Dreams
- PMS
- Mental Load
- The Feedback Circuit

---

## 2.2 Create an international support community

Beyond the website, SIMBA aims to create a community where people can:

- share experiences;
- discuss personal challenges;
- ask questions;
- support each other.

The project itself follows this philosophy, with international volunteers collaborating on different aspects of the platform:

- psychological research;
- content creation;
- website development;
- social media content;
- community building;
- gardening and permaculture activities.

---

# 3. Website Overview

The website is divided into several main sections.

## Homepage

The homepage introduces the SIMBA project and explains its purpose.

It provides access to:

- psychological topics;
- community features;
- user accounts;
- interactive tools.

---

# Psychological Themes

The main content of the website is organized around psychological themes.

Each theme page can contain:

- explanations;
- educational content;
- reflection exercises;
- interactive elements;
- quizzes.

The goal is to make psychological concepts understandable and accessible to everyone.

---

# User Accounts

Users can create an account and access personal features.

Users can:

- create a profile;
- customize their information;
- save personal data;
- interact with the community.

Authentication uses:

- email/password accounts;
- JWT authentication;
- user sessions.

---

# Community Forum

The forum allows users to:

- create discussions;
- answer other users;
- share experiences;
- interact around psychological topics.

Forum data is synchronized with the backend.

---

# Private Messages

Users can communicate privately through the messaging system.

The feature allows:

- sending messages;
- receiving messages;
- communication between users and administrators.

---

# Quizzes

Each psychological topic can include quizzes.

Quizzes:

- contain multiple questions;
- encourage self-reflection;
- provide users with personal insights.

---

# Online Meetings (Visios)

The platform includes a section dedicated to online meetings.

Users can:

- request participation in a session;
- view available meetings.

Administrators can:

- approve requests;
- reject requests with an explanation.

The workflow is:

```
User request
      ↓
Pending approval
      ↓
Administrator decision
      ↓
Approved / Rejected
      ↓
Access to meeting room
```

---

# 4. Technical Architecture

The project uses a simple frontend/backend architecture.

---

# Frontend

The frontend is built using:

- HTML
- CSS
- JavaScript Vanilla

No frontend framework is used.

## Main folders

```
html/
    Website pages

css/
    Global styling files

js/
    JavaScript logic files
```

---

## Important frontend files

### `js/script.js`

Main application script.

Handles:

- authentication interface;
- navigation;
- theme management;
- general website behaviour.

---

### `js/i18n.js`

Internationalization system.

The website supports:

- English;
- German;
- French;
- Spanish;
- Italian.

All translations are centralized in this file.

---

### `js/quiz.js`

Handles quiz functionality.

---

### `js/forum.js`

Handles forum interactions.

---

### `js/visios.js`

Handles online meeting features.

---

# Backend

The backend is built with:

- Node.js
- Express.js

Main file:

```
server/index.js
```

The backend manages:

- authentication;
- user profiles;
- forum data;
- private messages;
- theme visibility.

---

# 5. Project Structure

```
SIMBA/

│
├── html/
│   ├── index.html
│   ├── theme pages
│   ├── forum.html
│   ├── profile.html
│   ├── messages.html
│   └── visios.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── script.js
│   ├── i18n.js
│   ├── quiz.js
│   ├── forum.js
│   └── visios.js
│
└── server/
    ├── index.js
    ├── package.json
    └── data files
```

---

# 6. How to Run the Project

## Requirements

You need:

- Node.js version 18 or higher.

---

## Start the backend

Open a terminal in the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The backend runs by default on:

```
http://localhost:3000
```

The website can then be accessed through:

```
http://localhost:3000/index.html
```

---

# 7. Data Storage

The project currently uses a hybrid storage system.

---

## Backend Storage

The backend stores data in JSON files:

```
server/

├── users.json
├── forum-threads.json
├── private-messages.json
└── theme-visibility.json
```

---

## Frontend Storage

Some features use browser localStorage.

Main keys:

```
simba_user

simba_profile_<email>

simba_forum_threads

simba_private_messages

simba_visio_meetings

simba_notifications_<email>
```

---

# 8. Administration System

The website contains administrator features.

Administrators can:

- manage theme visibility;
- moderate forum content;
- manage online meetings;
- communicate with users.

## Current Administrator Account

The main administrator account currently used for development is: createwithus@simbajourney.com
Password: Bruno!Momo_Antonella

 
This account has access to administrator features such as:

- managing psychological themes visibility;
- validating or rejecting online meeting requests;
- managing community features.

## Important note

This administrator system is currently implemented as a prototype.

The administrator role is currently identified mainly through email verification.

For a future production version, the recommended improvements are:

- store roles in the backend;
- create a proper permission system;
- remove credentials from frontend files;
- use environment variables for sensitive information.

# 9. Backend API Overview

## Authentication

```
POST /api/signup
POST /api/login
POST /api/logout
GET  /api/me
```

---

## Password and Email

```
GET  /api/confirm-email

POST /api/request-password-reset

POST /api/reset-password
```

---

## Profile

```
GET  /api/profile

POST /api/profile

GET /api/profiles/search
```

---

## Forum

```
GET  /api/forum/threads

POST /api/forum/threads
```

---

## Private Messages

```
GET  /api/private-messages

POST /api/private-messages
```

---

## Themes

```
GET  /api/theme-visibility

POST /api/theme-visibility
```

---

## Current Security Limitations

The project was developed as a prototype during the SIMBA Workaway project.

Some security aspects still need improvement before a public deployment:

- administrator credentials should not be stored in frontend files;
- passwords should never be stored in plain text;
- administrator permissions should use a role-based system;
- sensitive configuration should use environment variables;
- authentication should rely only on the backend.

---

## Authentication Improvements

Current issues:

- administrator credentials exist in frontend code;
- local authentication stores passwords insecurely;
- permissions rely mainly on email comparison.

Recommended improvements:

- move all permissions to the backend;
- implement a complete role system;
- remove insecure local authentication.

---

## Database Improvements

Current situation:

- JSON files are used for data storage.

Recommended:

Move to a real database system:

- PostgreSQL;
- MySQL;
- MongoDB.

Benefits:

- better scalability;
- better security;
- easier backups;
- easier data management.

---

## Security Improvements

Recommended:

- protect environment variables;
- improve cookie security;
- add login protection;
- restrict CORS permissions;
- validate user inputs;
- add automated security checks.

---

# 11. Future Development Ideas

Possible improvements:

## Technical improvements

- migrate from JSON storage to a database;
- improve authentication;
- add automated tests;
- improve backend organization;
- deploy the website online.

---

## User Experience improvements

- improve accessibility;
- optimize mobile experience;
- add notifications;
- create more interactive exercises.

---

## Community improvements

- improve forum moderation;
- add user groups;
- add real-time discussions.

---

# 12. Developer Notes

## Before modifying translations

Check:

```
js/i18n.js
```

All translations are centralized there.

---

## Before modifying authentication

Check:

```
server/index.js

js/script.js
```

Authentication logic exists on both frontend and backend.

---

## Before modifying forum features

Check:

```
js/forum.js

server/index.js
```

---

# 13. Conclusion

The SIMBA website is the first version of a larger platform combining:

- psychology education;
- personal development;
- digital tools;
- international community building.

The current version provides a strong foundation for future development.

The main priorities for future developers are:

1. improving security;
2. improving data management;
3. creating a more scalable architecture;
4. continuing to enrich the psychological content and community features.
