// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       ELEMENTS
    ========================= */

    const opening = document.getElementById('opening');
    const openButton = document.getElementById('openInvitation');
    const music = document.getElementById('backgroundMusic');

    /* =========================
       OPEN INVITATION
    ========================= */

    if (openButton && opening) {

        openButton.addEventListener('click', () => {

            openButton.disabled = true;
            opening.classList.add('hide');

            document.documentElement.style.scrollBehavior = 'auto';

            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });

            setTimeout(() => {
                opening.style.display = 'none';
                document.documentElement.style.scrollBehavior = '';
            }, 1300);

            if (music) {
                music.volume = 0.35;

                const playPromise = music.play();

                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
            }
        });
    }

    /* =========================
       CINEMATIC REVEAL
    ========================= */

    const revealElements = document.querySelectorAll('.reveal');

    revealElements.forEach((element, index) => {

        const parent = element.parentElement;

        if (!parent) return;

        const siblings = [...parent.children]
            .filter(child => child.classList.contains('reveal'));

        const siblingIndex = siblings.indexOf(element);

        const delay = Math.min(
            Math.max(siblingIndex, 0) * 90,
            340
        );

        element.style.setProperty(
            '--reveal-delay',
            `${delay}ms`
        );
    });

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add('visible');

                revealObserver.unobserve(entry.target);
            });

        },
        {
            threshold: 0.08,
            rootMargin: '0px 0px -70px 0px'
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* =========================
       COUNTDOWN
    ========================= */

    const targetDate = new Date(
        'October 11, 2026 09:00:00 GMT+0700'
    ).getTime();

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {

        const now = Date.now();
        const distance = targetDate - now;

        if (distance <= 0) {

            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';

            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (distance / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (distance / 1000) % 60
        );

        if (daysElement) {
            daysElement.textContent =
                String(days).padStart(2, '0');
        }

        if (hoursElement) {
            hoursElement.textContent =
                String(hours).padStart(2, '0');
        }

        if (minutesElement) {
            minutesElement.textContent =
                String(minutes).padStart(2, '0');
        }

        if (secondsElement) {
            secondsElement.textContent =
                String(seconds).padStart(2, '0');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* =========================
       COPY ACCOUNT
    ========================= */

    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');

    copyButtons.forEach(button => {

        button.addEventListener('click', async () => {

            const value = button.dataset.copy;

            if (!value) return;

            try {

                await navigator.clipboard.writeText(value);

                showToast('Berhasil disalin');

            } catch (error) {

                const textarea =
                    document.createElement('textarea');

                textarea.value = value;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';

                document.body.appendChild(textarea);

                textarea.select();
                document.execCommand('copy');

                textarea.remove();

                showToast('Berhasil disalin');
            }
        });
    });

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    /* =========================
   SUBTLE PARALLAX
========================= */

const heroBackground =
    document.querySelector('.hero-background');

const photoContainers =
    document.querySelectorAll('.photo-container');

let ticking = false;


function updateParallax() {

    const scrollY =
        window.scrollY;


    /* HERO - TETAP SEPERTI ASLI */

    if (heroBackground) {

        const heroMove =
            scrollY * 0.08;

        heroBackground.style.transform =
            `translate3d(0, ${heroMove}px, 0) scale(1.045)`;

    }


    /* SEMUA FOTO */

    if (window.innerWidth > 600) {

        photoContainers.forEach(
            (photo, index) => {

                const rect =
                    photo.getBoundingClientRect();

                if (
                    rect.top < window.innerHeight &&
                    rect.bottom > 0
                ) {

                    const distance =
                        rect.top -
                        window.innerHeight / 2;

                    const speed =
                        index === 0
                            ? 0.035
                            : 0.02;

                    const photoMove =
                        distance * speed;

                    photo.style.transform =
                        `translate3d(0, ${photoMove}px, 0)`;

                }

            }
        );

    } else {

        photoContainers.forEach(
            photo => {

                photo.style.transform =
                    'translate3d(0,0,0)';

            }
        );

    }


    ticking = false;

}


function requestParallax() {

    if (!ticking) {

        window.requestAnimationFrame(
            updateParallax
        );

        ticking = true;

    }

}


window.addEventListener(
    'scroll',
    requestParallax,
    {
        passive: true
    }
);


updateParallax();
    /* =========================
       RESIZE
    ========================= */

    window.addEventListener(
        'resize',
        () => {
            updateParallax();
        },
        { passive: true }
    );

});