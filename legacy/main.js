document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    // Simple Form Submission (Mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log('Form Submitted:', Object.fromEntries(formData));
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Component Finder Mock Logic
    const finderBtn = document.querySelector('.finder-container .btn');
    const finderInput = document.querySelector('.finder-container input');

    if (finderBtn) {
        finderBtn.addEventListener('click', () => {
            const query = finderInput.value.trim();
            if (query) {
                alert(`Searching global inventory for: ${query}\n(Note: This is a prototype interface)`);
            } else {
                alert('Please enter a part number or category to search.');
            }
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
