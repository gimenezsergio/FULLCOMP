const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = Array.from(navLinks)
    .map(link => document.getElementById(link.getAttribute('href').substring(1)))
    .filter(Boolean);

const activeClasses = [
    'text-slate-900',
    'dark:text-white',
    'border-b-2',
    'border-slate-900',
    'dark:border-white',
    'pb-1'
];
const inactiveClasses = ['text-slate-500', 'dark:text-slate-400'];

function setActiveLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove(...activeClasses);
        link.classList.add(...inactiveClasses);
    });

    if (activeLink) {
        activeLink.classList.add(...activeClasses);
        activeLink.classList.remove(...inactiveClasses);
    }
}

function scrollToSection(targetElement) {
    if (!targetElement) return;
    targetElement.scrollIntoView({
        behavior: 'smooth'
    });
}

navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        setActiveLink(this);
        scrollToSection(targetElement);
    });
});

document.querySelectorAll('footer a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        scrollToSection(targetElement);
        const navAnchor = document.querySelector(`nav a[href="#${targetId}"]`);
        setActiveLink(navAnchor);
    });
});

if (sections.length > 0) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const navAnchor = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                    setActiveLink(navAnchor);
                }
            });
        },
        {
            rootMargin: '-33% 0px -66% 0px',
            threshold: 0
        }
    );

    sections.forEach(section => observer.observe(section));
}
