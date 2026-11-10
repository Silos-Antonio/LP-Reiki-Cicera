/**
 * ==========================================================================
 * TERAPIAS INTEGRATIVAS - CICERA BEZERRA (VERSÃO 2.0)
 * JavaScript Otimizado, Modular e Focado em UX de Alta Performance
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initDragScroll();
    initServiceCardsInteraction();
    initFaqAccordion();
});

/**
 * 1. SCROLL REVEAL (INTERSECTION OBSERVER)
 * Aplica animações de entrada suaves às seções conforme o usuário navega.
 */
function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.hero, .servicos, .sobre-profissional, .depoimentos, .CTA-final, .faq-container, .card-cta, .card-depoimento'
    );

    if (!targets.length) return;

    targets.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    targets.forEach(el => revealObserver.observe(el));
}

/**
 * 2. DRAG-TO-SCROLL (CARROSSEL DE DEPOIMENTOS)
 * Proporciona uma experiência tátil fluida para desktop através do arrastar do mouse.
 */
function initDragScroll() {
    const slider = document.querySelector('.lista-depoimentos');
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasDragged = false;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        hasDragged = false;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        hasDragged = true;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.6;
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('click', (e) => {
        if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
}

/**
 * 3. INTERAÇÃO DOS CARDS DE SERVIÇO (TOUCH & ACESSIBILIDADE)
 * No desktop, o efeito é disparado naturalmente via CSS :hover.
 * Em dispositivos móveis ou toque, o clique no card alterna a expansão do serviço.
 */
function initServiceCardsInteraction() {
    const cards = document.querySelectorAll('.servico-card');
    if (!cards.length) return;

    cards.forEach(card => {
        // Suporte para ativação via toque em dispositivos mobile/touch
        card.addEventListener('click', function(e) {
            // Se o clique foi no link do WhatsApp ou dentro dele, deixa navegar
            if (e.target.closest('.saiba-mais')) return;

            // Se estiver em dispositivo móvel/touch, alterna a classe expandido
            const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth <= 768;
            if (isTouch) {
                const wasExpanded = this.classList.contains('expandido');
                // Fecha outros cards abertos para manter a tela limpa
                cards.forEach(c => c.classList.remove('expandido'));
                if (!wasExpanded) {
                    this.classList.add('expandido');
                }
            }
        });

        // Suporte a acessibilidade via teclado (Enter ou Barra de Espaço)
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.closest('.saiba-mais')) return;
                e.preventDefault();
                this.classList.toggle('expandido');
            }
        });
    });
}

/**
 * 4. FAQ ACCORDION INTERATIVO
 * Fecha suavemente outros itens ao abrir um novo.
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });
}
