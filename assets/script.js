document.addEventListener('DOMContentLoaded', () => {
    initDragScroll();
    initServiceCardsMobile();
});

/* DRAG-TO-SCROLL (DEPOIMENTOS) */
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

/* EXPANSÃO DE CARDS DE SERVIÇO (MOBILE) */
function initServiceCardsMobile() {
    const botoesSaibaMais = document.querySelectorAll('.saiba-mais');

    botoesSaibaMais.forEach(botao => {
        botao.onclick = function(e) { 
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
