// ============================================
// EFECTOS Y UTILIDADES ADICIONALES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // SMOOTH SCROLL PARA LINKS DE NAVEGACIÓN
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste por navbar fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ANIMACIÓN DE ENTRADA AL SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    document.querySelectorAll('.info-card, .section-title, .section-desc').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // ============================================
    // CONTADOR ANIMADO PARA EJEMPLOS
    // ============================================
    function animarContador(elemento, valorFinal, prefijo = '') {
        let inicio = 0;
        const duracion = 1500;
        const incremento = valorFinal / (duracion / 16);
        
        function actualizar() {
            inicio += incremento;
            if (inicio < valorFinal) {
                elemento.textContent = prefijo + Math.floor(inicio);
                requestAnimationFrame(actualizar);
            } else {
                elemento.textContent = prefijo + valorFinal;
            }
        }
        
        actualizar();
    }
    
    // Animar números cuando son visibles
    const numerosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animado')) {
                entry.target.classList.add('animado');
                
                // Aquí podrías animar los valores de los ejemplos si los tuvieras en spans
            }
        });
    }, { threshold: 0.5 });
    
    // ============================================
    // EFECTO PARALLAX EN HERO
    // ============================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });
    
    // ============================================
    // TOOLTIPS PARA INPUTS
    // ============================================
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur',scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // SMOOTH SCROLL PARA LINKS DE NAVEGACIÓN
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste por navbar fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ANIMACIÓN DE ENTRADA AL SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    document.querySelectorAll('.info-card, .section-title, .section-desc').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // ============================================
    // CONTADOR ANIMADO PARA EJEMPLOS
    // ============================================
    function animarContador(elemento, valorFinal, prefijo = '') {
        let inicio = 0;
        const duracion = 1500;
        const incremento = valorFinal / (duracion / 16);
        
        function actualizar() {
            inicio += incremento;
            if (inicio < valorFinal) {
                elemento.textContent = prefijo + Math.floor(inicio);
                requestAnimationFrame(actualizar);
            } else {
                elemento.textContent = prefijo + valorFinal;
            }
        }
        
        actualizar();
    }
    
    // Animar números cuando son visibles
    const numerosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animado')) {
                entry.target.classList.add('animado');
                
                // Aquí podrías animar los valores de los ejemplos si los tuvieras en spans
            }
        });
    }, { threshold: 0.5 });
    
    // ============================================
    // EFECTO PARALLAX EN HERO
    // ============================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });
    
    // ============================================
    // TOOLTIPS PARA INPUTS
    // ============================================
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.parentElement.classList.remove('focused');
        });
    });
    
    // ============================================
    // CONFETTI AL CALCULAR (efecto sutil)
    // ============================================
    function crearConfetti() {
        const colors = ['#722F37', '#D4AF37', '#ffffff', '#8B3A44'];
        const confettiCount = 30;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }
    
    // Agregar animación de confetti al CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Lanzar confetti al calcular
    const btnCalcular = document.getElementById('btn-calcular');
    if (btnCalcular) {
        btnCalcular.addEventListener('click', function() {
            const monto = document.getElementById('monto').value;
            const semanas = document.getElementById('semanas').value;
            if (monto && semanas) {
                setTimeout(crearConfetti, 300);
            }
        });
    }
    
    // ============================================
    // RELOJ EN TIEMPO REAL (opcional, en footer)
    // ============================================
    function actualizarReloj() {
        const ahora = new Date();
        const hora = ahora.toLocaleTimeString('es-EC', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Si quieres mostrar la hora, descomenta esto y agrega un elemento con id="reloj"
        // const relojEl = document.getElementById('reloj');
        // if (relojEl) relojEl.textContent = hora;
    }
    
    setInterval(actualizarReloj, 1000);
    
    // ============================================
    // VALIDACIÓN EN TIEMPO REAL
    // ============================================
    const montoInput = document.getElementById('monto');
    const semanasInput = document.getElementById('semanas');
    
    if (montoInput) {
        montoInput.addEventListener('input', function() {
            const val = parseFloat(this.value);
            if (val < 50) {
                this.style.borderColor = '#e74c3c';
            } else if (val > 300) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
    }
    
    if (semanasInput) {
        semanasInput.addEventListener('input', function() {
            const val = parseInt(this.value);
            if (val < 1 || val > 15) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
    }
    
    // ============================================
    // MENSAJE DE BIENVENIDA CONSOLE
    // ============================================
    console.log('%c🍷 Black Financial', 'color: #722F37; font-size: 24px; font-weight: bold;');
    console.log('%cCalculadora de Préstamos - Interés Simple 1% semanal', 'color: #D4AF37; font-size: 14px;');
    console.log('%cDesarrollado por Billy Michael - Estudiante de Finanzas U. de Guayaquil', 'color: #666; font-size: 12px;');
});


