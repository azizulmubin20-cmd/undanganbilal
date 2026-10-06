document.addEventListener("DOMContentLoaded", () => {

    const openingScreen =
        document.getElementById("openingScreen");

    const openingCard =
        document.getElementById("openingCard");

    const openInvitation =
        document.getElementById("openInvitation");

    const mainContent =
        document.getElementById("mainContent");

    const music =
        document.getElementById("backgroundMusic");

    const musicButton =
        document.getElementById("musicButton");

    const hero =
        document.querySelector(".hero");

    const heroBg =
        document.querySelector(".hero-bg");

    const heroContent =
        document.querySelector(".hero-content");

    const heroTitle =
        document.getElementById("heroTitle");

    const photoWrapper =
        document.getElementById("photoWrapper");


    /* =====================================================
       INITIAL
    ===================================================== */

    document.body.classList.add("locked");


    /* =====================================================
       OPEN INVITATION
    ===================================================== */

    openInvitation.addEventListener("click", async () => {

        openingScreen.classList.add("hide");

        mainContent.classList.add("show");

        document.body.classList.remove("locked");

        if (music) {

            music.volume = 0.35;

            try {

                await music.play();

                musicButton.classList.add("playing");

            } catch (error) {

                console.log(
                    "Browser memblokir autoplay:",
                    error
                );

            }

        }

    });


    /* =====================================================
       MUSIC CONTROL
    ===================================================== */

    musicButton.addEventListener("click", async () => {

        if (!music) return;

        if (music.paused) {

            try {

                await music.play();

                musicButton.classList.add("playing");

            } catch (error) {

                console.log(error);

            }

        } else {

            music.pause();

            musicButton.classList.remove("playing");

        }

    });


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    const targetDate =
        new Date(
            "2026-10-11T09:00:00+07:00"
        ).getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        let distance =
            targetDate - now;


        if (distance <= 0) {

            distance = 0;

        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        document.getElementById("days")
            .textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours")
            .textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes")
            .textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds")
            .textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-3d"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    let ticking = false;


    function updateParallax() {

        const scrollY =
            window.scrollY;

        if (hero && heroBg) {

            const heroRect =
                hero.getBoundingClientRect();

            const progress =
                heroRect.top / window.innerHeight;


            if (
                heroRect.bottom > 0 &&
                heroRect.top < window.innerHeight
            ) {

                const movement =
                    scrollY * 0.18;

                heroBg.style.transform =
                    `scale(1.08) translate3d(0, ${movement}px, 0)`;

                if (heroContent) {

                    heroContent.style.transform =
                        `translate3d(0, ${scrollY * 0.08}px, 0)`;

                }

                if (photoWrapper) {

                    photoWrapper.style.setProperty(
                        "--scroll-progress",
                        progress
                    );

                }

            }

        }

        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       PHOTO 3D TILT
    ===================================================== */

    if (
        photoWrapper &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        photoWrapper.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    photoWrapper.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 8;

                const rotateX =
                    ((centerY - y) /
                        centerY) * 8;


                photoWrapper.querySelector(
                    ".photo-frame"
                ).style.transform =
                    `
                    translateZ(30px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.02)
                    `;

            }
        );


        photoWrapper.addEventListener(
            "mouseleave",
            () => {

                photoWrapper.querySelector(
                    ".photo-frame"
                ).style.transform =
                    `
                    translateZ(30px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale(1)
                    `;

            }
        );

    }


    /* =====================================================
       OPENING CARD TILT
    ===================================================== */

    if (
        openingCard &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        openingCard.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    openingCard.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    ((x - rect.width / 2) /
                        (rect.width / 2)) * 5;

                const rotateX =
                    ((rect.height / 2 - y) /
                        (rect.height / 2)) * 5;


                openingCard.style.animation =
                    "none";

                openingCard.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(50px)
                    `;

            }
        );


        openingCard.addEventListener(
            "mouseleave",
            () => {

                openingCard.style.animation =
                    "";

                openingCard.style.transform =
                    `
                    perspective(1200px)
                    rotateX(3deg)
                    translateZ(40px)
                    `;

            }
        );

    }


    /* =====================================================
       HERO TITLE TILT
    ===================================================== */

    if (
        hero &&
        heroTitle &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    ((x - rect.width / 2) /
                        (rect.width / 2)) * 3;

                const rotateX =
                    ((rect.height / 2 - y) /
                        (rect.height / 2)) * 3;


                heroTitle.style.transform =
                    `
                    translateZ(40px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroTitle.style.transform =
                    "translateZ(0)";

            }
        );

    }


    /* =====================================================
       COPY ACCOUNT
    ===================================================== */

    const copyButtons =
        document.querySelectorAll(
            ".copy-button"
        );


    copyButtons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const value =
                    button.dataset.copy;

                if (!value) return;


                try {

                    await navigator.clipboard.writeText(
                        value
                    );

                    const oldText =
                        button.textContent;

                    button.textContent =
                        "COPIED";

                    button.style.background =
                        "var(--gold-light)";

                    button.style.color =
                        "#000";


                    setTimeout(() => {

                        button.textContent =
                            oldText;

                        button.style.background =
                            "";

                        button.style.color =
                            "";

                    }, 1500);


                } catch (error) {

                    const input =
                        document.createElement(
                            "input"
                        );

                    input.value = value;

                    document.body.appendChild(
                        input
                    );

                    input.select();

                    document.execCommand(
                        "copy"
                    );

                    input.remove();

                    button.textContent =
                        "COPIED";

                    setTimeout(() => {

                        button.textContent =
                            "COPY";

                    }, 1500);

                }

            }
        );

    });


    /* =====================================================
       IMAGE LOAD
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener(
            "load",
            () => {

                image.classList.add(
                    "loaded"
                );

            }
        );

    });


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                updateParallax();

            }, 100);

        }
    );

});
