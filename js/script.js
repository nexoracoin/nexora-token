// === NEXORA Website JavaScript ===

// Mobile menu toggle
document.getElementById('hamburger')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Copy contract address
function copyAddress() {
    const address = document.getElementById('contractAddress')?.querySelector('span')?.textContent;
    if (address && address !== 'Will be updated after deployment') {
        navigator.clipboard.writeText(address).then(() => {
            const btn = document.querySelector('.copy-btn');
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = 'Copy', 2000);
        });
    }
}

// Particle animation
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        container.appendChild(particle);
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 26, 0.98)';
    } else {
        nav.style.background = 'rgba(10, 10, 26, 0.9)';
    }
});

// Counter animation
function animateCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const value = el.getAttribute('data-count');
                if (value) {
                    animateValue(el, 0, parseInt(value), 2000);
                    observer.unobserve(el);
                }
            }
        });
    });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

function animateValue(el, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Roadmap animation
function animateRoadmap() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.roadmap-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.6s ease ${i * 0.2}s`;
        observer.observe(item);
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateCounters();
    animateRoadmap();
});
