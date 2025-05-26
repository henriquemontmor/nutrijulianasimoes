// JavaScript para o site de portfólio da Nutricionista Clínica

document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const btnMobile = document.getElementById('btn-mobile');
    
    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
        const active = nav.classList.contains('active');
        event.currentTarget.setAttribute('aria-expanded', active);
        if (active) {
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
        } else {
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
        }
    }
    
    if (btnMobile) {
        btnMobile.addEventListener('click', toggleMenu);
        btnMobile.addEventListener('touchstart', toggleMenu);
    }
    
    // Fechar menu ao clicar em um item
    const menuItems = document.querySelectorAll('#menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const nav = document.getElementById('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                btnMobile.setAttribute('aria-expanded', false);
                btnMobile.setAttribute('aria-label', 'Abrir Menu');
            }
        });
    });
    
    // Slider de Depoimentos
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    function showSlide(n) {
        // Oculta todos os slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove a classe active de todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostra o slide atual e ativa o dot correspondente
        if (slides.length > 0) {
            slides[n].style.display = 'block';
            dots[n].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    }
    
    // Inicializa o slider
    if (slides.length > 0) {
        showSlide(currentSlide);
        
        // Adiciona event listeners para os botões
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Adiciona event listeners para os dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-play do slider (a cada 5 segundos)
        setInterval(nextSlide, 5000);
    }
    
    // Animação de scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header fixo com mudança de estilo ao rolar
    const header = document.getElementById('header');
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Inicializa o estado do header
    
   
    // Animação de elementos ao scroll
    const animateElements = document.querySelectorAll('.service-card, .blog-card, .about-content, .testimonial');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializa os elementos com opacidade 0
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verifica elementos visíveis no carregamento inicial

    // Make sendWhatsApp function global
    window.sendWhatsApp = function(event) {
        event.preventDefault();

        // Número do WhatsApp da nutricionista
        const numeroWhatsApp = "5521977591306";

        // Coletando os dados do formulário
        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('phone').value;
        const assunto = document.getElementById('subject').value;
        const mensagem = document.getElementById('message').value;

        // Formatando o assunto
        const assuntoFormatado = {
            'consulta': 'Agendamento de Consulta',
            'duvida': 'Dúvidas',
            'parceria': 'Proposta de Parceria',
            'outro': 'Outro Assunto'
        }[assunto];

        // Criando a mensagem formatada
        let mensagemWhatsApp = `*Contato via Website*\n\n`;
        mensagemWhatsApp += `*Nome:* ${nome}\n`;
        mensagemWhatsApp += `*E-mail:* ${email}\n`;
        mensagemWhatsApp += `*Telefone:* ${telefone}\n`;
        mensagemWhatsApp += `*Assunto:* ${assuntoFormatado}\n`;
        mensagemWhatsApp += `*Mensagem:* ${mensagem}`;

        // Criando o link do WhatsApp
        const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`;

        // Abrindo o link em uma nova aba
        window.open(whatsappUrl, '_blank');

        // Limpando o formulário
        document.getElementById('contactForm').reset();

        return false;
    }

    // Atualiza o estado do botão de envio
    function atualizarBotaoEnvio() {
        const form = document.getElementById('contactForm');
        const submitButton = form.querySelector('.whatsapp-button');
        
        // Verifica se todos os campos obrigatórios estão preenchidos
        const isFormValid = form.checkValidity();
        
        if (isFormValid) {
            submitButton.classList.remove('disabled');
        } else {
            submitButton.classList.add('disabled');
        }
    }

    // Adiciona listeners para os campos do formulário
    document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select')
        .forEach(element => {
            element.addEventListener('input', atualizarBotaoEnvio);
        });
});
