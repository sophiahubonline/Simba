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
    const themes = themesData[category] || [];
    
    grid.innerHTML = themes.map(theme => `
        <div class="theme-card">
            <h3>${theme.name}</h3>
            <p>${theme.description}</p>
            <a href="${theme.link}" class="learn-more-btn">
                Learn more about it <span class="arrow">→</span>
            </a>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    // CATEGORY TABS
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
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

    // NAV LINK ACTIVE STATE
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // SIGN UP BUTTON
    const signUpBtn = document.querySelector('.sign-up-btn');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function() {
            alert('Sign Up functionality coming soon!');
        });
    }

    // LOGIN BUTTON
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('Login functionality coming soon!');
        });
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
});

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
