// Esegui lo script solo quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Gestisce l'effetto di "scrolled" sulla navbar.
     * Aggiunge una classe quando l'utente scorre la pagina verso il basso.
     */
    const handleNavbarScroll = () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    };

    /**
     * Gestisce lo scrolling fluido per i link ancora (anchor links).
     * Intercetta il click e scorre dolcemente alla sezione di destinazione.
     */
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId.length > 1) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const navbar = document.getElementById('navbar');
                        const navbarHeight = navbar ? navbar.offsetHeight : 80;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };


    /**
     * Inizializza l'Intersection Observer per animare gli elementi
     * quando entrano nel viewport.
     */
    const setupScrollAnimations = () => {
        const elementsToAnimate = document.querySelectorAll('.hero-badge, .hero-title, .hero-cta');

        if (elementsToAnimate.length === 0) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Opzionale: smetti di osservare l'elemento dopo che è stato animato
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    };

    /**
     * Gestisce l'effetto di transizione da bianco a nero per tutto il sito
     * quando si entra nella sezione problema
     */
    const setupDarkTransition = () => {
        const problemSection = document.querySelector('.problem-section');
        const body = document.body;

        if (!problemSection) return;

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        // variabile per gestire il timeout
        let darkModeTimeout = null;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // elimina eventuali timeout pendenti
                    if (darkModeTimeout) {
                        clearTimeout(darkModeTimeout);
                        darkModeTimeout = null;
                    }
                    // ritarda l’attivazione di 200 ms
                    darkModeTimeout = setTimeout(() => {
                        body.classList.add('dark-mode');
                        entry.target.classList.add('dark-mode');
                    }, 200);
                } else {
                    // se esci rapidamente dalla sezione, annulla il timeout e rimuovi subito la dark‑mode
                    if (darkModeTimeout) {
                        clearTimeout(darkModeTimeout);
                        darkModeTimeout = null;
                    }
                    body.classList.remove('dark-mode');
                    entry.target.classList.remove('dark-mode');
                }
            });
        }, observerOptions);

        observer.observe(problemSection);
    };



    // Inizializza un Intersection Observer per avviare le animazioni
    // nelle sezioni "Nessuna sorpresa" e "AI" solo quando i relativi
    // elementi entrano nel viewport.
    const setupSectionAnimations = () => {
        const animatableElements = document.querySelectorAll(
            '.nessuna-sorpresa-section .animated-path,' +
            ' .nessuna-sorpresa-section .process-card,' +
            ' .nessuna-sorpresa-section .float-element,' +
            ' .ai-section .ai-typing,' +
            ' .ai-section .ai-process-flow,' +
            ' .ai-section .ai-final-statement,' +
            ' .ai-section .user-message,' +
            ' .ai-section .ai-message'
        );



        if (!animatableElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // aggiunge la classe che riattiva l’animazione
                    entry.target.classList.add('play-animation');
                    // smette di osservare l’elemento per evitare che l’animazione riparta più volte
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatableElements.forEach(el => {
            observer.observe(el);
        });
    };



    // Aggiungi gli event listener
    window.addEventListener('scroll', handleNavbarScroll);
    setupSmoothScrolling();
    setupScrollAnimations();
    setupDarkTransition();
    setupSectionAnimations();

});



