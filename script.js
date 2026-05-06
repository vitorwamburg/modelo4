document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // CARROSSEL HERO
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselContainer = document.querySelector('.carousel-container');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval;
    const intervalTime = 6000; // Tempo de transição automática (6 segundos)

    const goToSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let newIndex = (currentSlide + 1) % slideCount;
        goToSlide(newIndex);
    };

    const prevSlide = () => {
        let newIndex = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(newIndex);
    };

    const startAutoPlay = () => { 
        autoPlayInterval = setInterval(nextSlide, intervalTime); 
    };
    
    const stopAutoPlay = () => { 
        clearInterval(autoPlayInterval); 
    };

    // Cliques nas setas
    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { 
            nextSlide(); 
            resetAutoPlay(); 
        });
        prevBtn.addEventListener('click', () => { 
            prevSlide(); 
            resetAutoPlay(); 
        });
    }

    // Cliques nos pontinhos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { 
            goToSlide(index); 
            resetAutoPlay(); 
        });
    });

    // Pausar ao passar o mouse por cima
    if(carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    const resetAutoPlay = () => { 
        stopAutoPlay(); 
        startAutoPlay(); 
    };
    
    // Inicia o carrossel automático
    startAutoPlay();


    // ==========================================
    // FAQ (DÚVIDAS FREQUENTES) - ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Se não estava ativo, abre este
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // ==========================================
    // NAVEGAÇÃO SUAVE (SMOOTH SCROLL)
    // ==========================================
    const menuLinks = document.querySelectorAll('.desktop-menu a, .logo a, .slide-content a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Só aplica se for um link interno (começa com #)
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({ 
                        top: targetPosition, 
                        behavior: 'smooth' 
                    });
                }
            }
        });
    });
});