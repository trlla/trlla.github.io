const root = document.documentElement;
root.classList.add('js');

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');

function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', open);
    header.classList.toggle('is-open', open);
    root.classList.toggle('menu-open', open);
}

menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus();
    }
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -10% 0px' });

    // Only hide elements below the fold so the first paint never flashes
    document.querySelectorAll('.reveal').forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add('is-hidden');
        observer.observe(element);
    });
}
