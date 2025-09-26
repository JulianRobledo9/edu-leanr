// Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initScrollEffects();
    initAnimations();
    initCounters();
    initParallax();
    initTypingEffect();
    initParticleEffect();
    initCourseCards();
    initTestimonialSlider();
    initFormValidation();
});

// Navegación móvil
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Efectos de scroll
function initScrollEffects() {
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.curso-card, .caracteristica-card, .testimonio-card').forEach(el => {
        observer.observe(el);
    });
}

// Animaciones avanzadas
function initAnimations() {
    // Efecto de escritura en el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Animación de las cards flotantes
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
        
        // Efecto hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto de ondas en los botones
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Contadores animados
function initCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / speed;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current).toLocaleString() + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + '+';
            }
        };

        updateCounter();
    };

    // Observar cuando los contadores son visibles
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Efecto parallax
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Efecto de escritura
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #667eea';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                element.style.borderRight = 'none';
            }
        };
        
        // Iniciar cuando el elemento sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Efecto de partículas
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
        particles.push(particle);
    }

    // Mover partículas con el mouse
    hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const newX = x * 100 + (Math.random() - 0.5) * 20;
            const newY = y * 100 + (Math.random() - 0.5) * 20;
            
            particle.style.left = newX + '%';
            particle.style.top = newY + '%';
            particle.style.transition = `all ${speed}s ease`;
        });
    });
}

// Efectos en las cards de cursos
function initCourseCards() {
    const courseCards = document.querySelectorAll('.curso-card');
    
    courseCards.forEach(card => {
        // Efecto de inclinación con el mouse
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // Efecto de progreso en las barras
        const progressBars = card.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 2s ease-in-out';
            }, 500);
        });
    });
}

// Slider de testimonios
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonio-card');
    let currentIndex = 0;
    
    if (testimonialCards.length === 0) return;
    
    // Agregar indicadores
    const sliderContainer = document.querySelector('.testimonios-grid');
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'testimonial-indicators';
    indicatorsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 2rem;
    `;
    
    testimonialCards.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        indicator.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: #ccc;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        if (index === 0) {
            indicator.style.background = '#667eea';
        }
        
        indicator.addEventListener('click', () => {
            showTestimonial(index);
        });
        
        indicatorsContainer.appendChild(indicator);
    });
    
    sliderContainer.parentNode.appendChild(indicatorsContainer);
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
            card.style.opacity = i === index ? '1' : '0';
            card.style.transform = i === index ? 'translateY(0)' : 'translateY(20px)';
        });
        
        // Actualizar indicadores
        indicatorsContainer.querySelectorAll('.indicator').forEach((indicator, i) => {
            indicator.style.background = i === index ? '#667eea' : '#ccc';
        });
        
        currentIndex = index;
    }
    
    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Inicializar
    showTestimonial(0);
}

// Validación de formularios
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    showError(input, 'Este campo es requerido');
                    isValid = false;
                } else if (input.type === 'email' && !isValidEmail(input.value)) {
                    showError(input, 'Por favor ingresa un email válido');
                    isValid = false;
                } else {
                    clearError(input);
                }
            });
            
            if (isValid) {
                showSuccess('¡Formulario enviado correctamente!');
                form.reset();
            }
        });
    });
    
    function showError(input, message) {
        clearError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ff6b6b;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#ff6b6b';
    }
    
    function clearError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '';
    }
    
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4ecdc4;
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Efectos de carga
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    loader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 2000);
}

// Utilidades adicionales
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimización de rendimiento
const optimizedScrollHandler = debounce(function() {
    // Código de scroll optimizado
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Efectos de sonido (opcional)
function playSound(soundType) {
    if (typeof Audio !== 'undefined') {
        const audio = new Audio();
        audio.volume = 0.1;
        
        switch(soundType) {
            case 'click':
                audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2+P...';
                break;
            case 'hover':
                audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2+P...';
                break;
        }
        
        audio.play().catch(() => {
            // Silenciar errores de audio
        });
    }
}

// Agregar efectos de sonido a los botones
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => playSound('hover'));
    button.addEventListener('click', () => playSound('click'));
});

// CSS adicional para animaciones
const additionalCSS = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
`;

// Inyectar CSS adicional
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
