// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.5
});

// Observe all sections
document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// Enhanced smooth scroll navigation
document.querySelectorAll('.nav-content a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Skip if it's just a "#" link
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate offset to account for fixed navbar
            const navbarHeight = document.querySelector('.topbar').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced section background transitions
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentSection = entry.target;
            
            // Update nav items active state
            document.querySelectorAll('.nav-content a').forEach(navItem => {
                const sectionId = navItem.getAttribute('href');
                if (sectionId === `#${currentSection.id}`) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            });
            
            // Define section colors with updated hex values
            const sectionColors = {
                'hero': '#20B2AA', // teal
                'login-section': '#050505', // black
                'tutorial-section': '#ffffff', // white
                'history-section': '#050505', // white
                'about-section': '#FFA500' // orange
            };
            
            // Apply smooth transition
            document.body.style.transition = 'background-color 1.2s ease-in-out';
            document.body.style.backgroundColor = sectionColors[currentSection.id] || '#050505';
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '-100px 0px -100px 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// Add scroll progress indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-progress';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = `${scrolled}%`;
});