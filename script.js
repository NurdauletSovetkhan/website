const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.addEventListener('mouseenter', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a') || e.target.classList.contains('project-card')) {
        cursor.classList.add('active');
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a') || e.target.classList.contains('project-card')) {
        cursor.classList.remove('active');
    }
}, true);

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInSection 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
});

const bubbles = document.querySelector('.bubbles');

window.addEventListener('scroll', () => {
    if (bubbles) {
        const scrolled = window.pageYOffset;
        bubbles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

function animateTitles() {
    document.querySelectorAll('.animated-title').forEach(title => {
        const text = title.innerText;
        const letters = text.split('').map((char, index) => {
            if (char === ' ') return '<span style="margin: 0 0.2em;"> </span>';
            return `<span style="
                display: inline-block;
                animation: letterPop 0.6s ease-out backwards;
                animation-delay: ${index * 0.05}s;
            ">${char}</span>`;
        }).join('');
        
        title.innerHTML = letters;
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes letterPop {
        0% {
            opacity: 0;
            transform: scale(0) rotateY(-90deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
        }
    }
`;
document.head.appendChild(style);

animateTitles();

function staggerSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, { threshold: 0.1 });

    skillCards.forEach(card => cardObserver.observe(card));
}

staggerSkillCards();

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

const createGlow = (e) => {
    if (e.clientX < window.innerWidth / 2) {
        document.documentElement.style.setProperty(
            '--mouse-x',
            `${e.clientX}px`
        );
    }
    if (e.clientY < window.innerHeight / 2) {
        document.documentElement.style.setProperty(
            '--mouse-y',
            `${e.clientY}px`
        );
    }
};

document.addEventListener('mousemove', createGlow);

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('fade-in-text')) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-text').forEach(text => {
    textObserver.observe(text);
});