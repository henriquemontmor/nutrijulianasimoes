// JavaScript do site da Nutricionista Juliana Simões

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
    const WHATSAPP = '5521977591306';

    // Menu Mobile
    const nav = document.getElementById('nav');
    const btnMobile = document.getElementById('btn-mobile');

    function setMenu(open) {
        nav.classList.toggle('active', open);
        btnMobile.setAttribute('aria-expanded', open);
        btnMobile.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    btnMobile.addEventListener('click', () => setMenu(!nav.classList.contains('active')));

    document.querySelectorAll('#menu a').forEach(item => {
        item.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('active')) {
            setMenu(false);
            btnMobile.focus();
        }
    });

    // Sombra no header ao rolar
    const header = document.getElementById('header');

    function updateHeader() {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // Animação de elementos ao entrar na tela
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add('visible'));
    }

    // Formulário: monta a mensagem e abre o WhatsApp
    const form = document.getElementById('contactForm');
    const fields = form.elements;
    const formError = document.getElementById('form-error');
    const planHint = document.getElementById('plan-hint');
    const locationSelect = document.getElementById('location');

    // Plano de saúde só é aceito em Madureira
    form.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const isPlan = fields.payment.value === 'Plano de saúde';
            planHint.hidden = !isPlan;
            if (isPlan) locationSelect.value = 'Madureira';
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const required = [fields.name, fields.goal, fields.location];
        let valid = true;

        required.forEach(field => {
            const ok = field.value.trim() !== '';
            field.classList.toggle('invalid', !ok);
            field.setAttribute('aria-invalid', !ok);
            if (!ok && valid) {
                field.focus();
                valid = false;
            }
        });

        formError.hidden = valid;
        if (!valid) return;

        let mensagem = `Olá, Juliana! Vim pelo site.\n\n`;
        mensagem += `*Nome:* ${fields.name.value.trim()}\n`;
        mensagem += `*Objetivo:* ${fields.goal.value}\n`;
        mensagem += `*Local:* ${fields.location.value}\n`;
        mensagem += `*Atendimento:* ${fields.payment.value}`;

        const extra = fields.message.value.trim();
        if (extra) mensagem += `\n*Mensagem:* ${extra}`;

        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener');
    });

    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('change', () => {
            if (field.value.trim() !== '') {
                field.classList.remove('invalid');
                field.removeAttribute('aria-invalid');
            }
        });
    });

    // Ano atual no rodapé
    document.getElementById('year').textContent = new Date().getFullYear();
});
