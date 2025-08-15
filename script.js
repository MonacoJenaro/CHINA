let celebrationActive = false;
let audioContext = null;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeCelebrationButton();
    initializeNavigationHighlight();
    initializeParallaxEffect();
    
    console.log('🇨🇳 Página China-ONU cargada correctamente');
});

// Animaciones de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos animables
    const animatableElements = document.querySelectorAll(
        '.cooperation-card, .achievement-item, .timeline-card, .vision-card'
    );
    
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // CSS para animación
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Resaltar navegación activa
function initializeNavigationHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remover clase activa de todos los enlaces
                navLinks.forEach(link => link.classList.remove('nav-active'));
                
                // Agregar clase activa al enlace correspondiente
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav-active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // CSS para navegación activa
    const style = document.createElement('style');
    style.textContent = `
        .nav-active {
            background: rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
            transform: translateY(-2px) !important;
        }
    `;
    document.head.appendChild(style);
}

// Efecto parallax sutil
function initializeParallaxEffect() {
    const decorations = document.querySelectorAll('.background-decoration');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        decorations.forEach((decoration, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            decoration.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Inicializar botón de celebración
function initializeCelebrationButton() {
    const celebrationBtn = document.getElementById('celebration-btn');
    
    if (celebrationBtn) {
        celebrationBtn.addEventListener('click', function() {
            if (!celebrationActive) {
                startCelebration();
            }
        });
    }
}

// Función de celebración
function startCelebration() {
    celebrationActive = true;
    
    createConfetti();
    playSuccessSound();
    showCelebrationMessage();
    
    setTimeout(() => {
        celebrationActive = false;
    }, 3000);
}

// Crear efecto de confeti
function createConfetti() {
    const colors = ['#ff0000', '#ffd700', '#ff1493', '#00ff00', '#1e90ff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * window.innerWidth}px;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 10000;
                pointer-events: none;
                transform: rotate(${Math.random() * 360}deg);
                transition: transform 3s linear, opacity 3s linear;
            `;
            
            document.body.appendChild(confetti);
            
            // Animar caída
            setTimeout(() => {
                confetti.style.transform = `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 720}deg)`;
                confetti.style.opacity = '0';
            }, 10);
            
            // Remover después de la animación
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 20);
    }
}

// Reproducir sonido de éxito
function playSuccessSound() {
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('No se pudo reproducir el sonido:', error);
    }
}

// Mostrar mensaje de celebración
function showCelebrationMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.5);
        background: linear-gradient(135deg, #dc143c, #ffd700);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        z-index: 10001;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: all 0.6s ease-out;
    `;
    
    message.innerHTML = '🇨🇳 ¡Celebrando la Amistad China-ONU! 🌟';
    document.body.appendChild(message);
    
    // Animar entrada
    setTimeout(() => {
        message.style.transform = 'translate(-50%, -50%) scale(1)';
        message.style.opacity = '1';
    }, 10);
    
    // Remover mensaje después de 2.5 segundos
    setTimeout(() => {
        message.style.transform = 'translate(-50%, -50%) scale(0.8)';
        message.style.opacity = '0';
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 600);
    }, 2500);
}

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en el script:', e.error);
});

// Optimización de rendimiento para scroll
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            const decorations = document.querySelectorAll('.background-decoration');
            const scrolled = window.pageYOffset;
            
            decorations.forEach((decoration, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                decoration.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });