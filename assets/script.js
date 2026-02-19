/* ============================================================
   CONFIGURAÇÕES GLOBAIS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initDragScroll();
    initServiceCardsMobile();
});

/* ============================================================
   1. DRAG-TO-SCROLL (DEPOIMENTOS)
   ============================================================ */
function initDragScroll() {
    const slider = document.querySelector('.lista-depoimentos');
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; 
        slider.scrollLeft = scrollLeft - walk;
    });
}

/* ============================================================
   2. EXPANSÃO DE CARDS DE SERVIÇO (MOBILE)
   ============================================================ */
function initServiceCardsMobile() {
    const botoesSaibaMais = document.querySelectorAll('.saiba-mais');

    botoesSaibaMais.forEach(botao => {
        botao.onclick = function(e) { // Usando onclick para evitar múltiplos eventos
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const card = this.closest('[class^="servico-card"]');
                
                if (card) {
                    card.classList.toggle('expandido');
                    this.innerHTML = card.classList.contains('expandido') ? "Ler menos ↑" : "Saiba mais →";
                }
            }
        };
    });
}

/* Adicione initScrollReveal() dentro do document.addEventListener('DOMContentLoaded', ... */

function initScrollReveal() {
    // Selecionamos as seções que queremos que apareçam
    const sections = document.querySelectorAll('.hero, .servicos, .sobre-profissional, .depoimentos, .CTA-final, .faq-container');
    
    const options = {
        root: null, // usa o viewport como referência
        threshold: 0.15, // 15% do elemento deve estar visível para disparar
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // Opcional: parar de observar após aparecer uma vez
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('section-hidden'); // Começa escondido
        observer.observe(section);
    });
}