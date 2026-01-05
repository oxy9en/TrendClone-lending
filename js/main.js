// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scroll
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinksList = document.querySelector('.nav-links');
                if (navLinksList) {
                    navLinksList.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.step, .feature-card, .screenshot-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Lightbox functionality with swipe support
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = document.getElementById('lightbox-container');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxIndicator = document.getElementById('lightbox-indicator');
    const screenshotCards = document.querySelectorAll('.screenshot-card');
    
    let currentImageIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let translateX = 0;
    
    const screenshots = Array.from(screenshotCards).map(card => {
        const img = card.querySelector('img');
        return img ? img.src : null;
    }).filter(src => src !== null);

    // Create indicator dots
    function createIndicators() {
        if (!lightboxIndicator) return;
        lightboxIndicator.innerHTML = '';
        screenshots.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'lightbox-dot';
            if (index === currentImageIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToImage(index);
            });
            lightboxIndicator.appendChild(dot);
        });
    }

    // Create lightbox images
    function createLightboxImages() {
        if (!lightboxContainer) return;
        lightboxContainer.innerHTML = '';
        screenshots.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'lightbox-image';
            img.alt = `Screenshot ${index + 1}`;
            lightboxContainer.appendChild(img);
        });
    }

    // Open lightbox
    screenshotCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            currentImageIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (!lightbox || !lightboxContainer) return;
        
        createLightboxImages();
        createIndicators();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set initial position
        translateX = -currentImageIndex * 100;
        updateLightboxPosition();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        isDragging = false;
    }

    function updateLightboxPosition() {
        if (!lightboxContainer) return;
        lightboxContainer.style.transform = `translateX(${translateX}%)`;
    }

    function goToImage(index) {
        if (index < 0) index = screenshots.length - 1;
        if (index >= screenshots.length) index = 0;
        
        currentImageIndex = index;
        translateX = -currentImageIndex * 100;
        updateLightboxPosition();
        updateIndicators();
    }

    function updateIndicators() {
        if (!lightboxIndicator) return;
        const dots = lightboxIndicator.querySelectorAll('.lightbox-dot');
        dots.forEach((dot, index) => {
            if (index === currentImageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === lightboxContainer) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                goToImage(currentImageIndex - 1);
                break;
            case 'ArrowRight':
                goToImage(currentImageIndex + 1);
                break;
        }
    });

    // Navigate lightbox
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            goToImage(currentImageIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            goToImage(currentImageIndex + 1);
        });
    }

    // Touch/Swipe support
    if (lightboxContainer) {
        // Touch events
        lightboxContainer.addEventListener('touchstart', function(e) {
            isDragging = true;
            startX = e.touches[0].clientX;
            currentX = startX;
        });

        lightboxContainer.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            const newTranslateX = translateX + (diff / window.innerWidth) * 100;
            
            // Limit dragging
            const minTranslate = -(screenshots.length - 1) * 100;
            const maxTranslate = 0;
            translateX = Math.max(minTranslate, Math.min(maxTranslate, newTranslateX));
            updateLightboxPosition();
        });

        lightboxContainer.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = currentX - startX;
            const threshold = window.innerWidth * 0.2; // 20% of screen width
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe right - go to previous
                    goToImage(currentImageIndex - 1);
                } else {
                    // Swipe left - go to next
                    goToImage(currentImageIndex + 1);
                }
            } else {
                // Snap back to current image
                goToImage(currentImageIndex);
            }
        });

        // Mouse drag support
        lightboxContainer.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            currentX = startX;
            lightboxContainer.style.cursor = 'grabbing';
        });

        lightboxContainer.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.clientX;
            const diff = currentX - startX;
            const newTranslateX = translateX + (diff / window.innerWidth) * 100;
            
            // Limit dragging
            const minTranslate = -(screenshots.length - 1) * 100;
            const maxTranslate = 0;
            translateX = Math.max(minTranslate, Math.min(maxTranslate, newTranslateX));
            updateLightboxPosition();
        });

        lightboxContainer.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            isDragging = false;
            lightboxContainer.style.cursor = 'grab';
            
            const diff = currentX - startX;
            const threshold = window.innerWidth * 0.2; // 20% of screen width
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Drag right - go to previous
                    goToImage(currentImageIndex - 1);
                } else {
                    // Drag left - go to next
                    goToImage(currentImageIndex + 1);
                }
            } else {
                // Snap back to current image
                goToImage(currentImageIndex);
            }
        });

        lightboxContainer.addEventListener('mouseleave', function() {
            if (isDragging) {
                isDragging = false;
                lightboxContainer.style.cursor = 'grab';
                goToImage(currentImageIndex);
            }
        });

        lightboxContainer.style.cursor = 'grab';
    }

    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });
    }

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // Prevent broken image errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '200px';
            placeholder.style.background = 'var(--bg-secondary)';
            placeholder.style.border = '2px solid var(--border-color)';
            placeholder.style.borderRadius = '10px';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = 'var(--text-tertiary)';
            placeholder.textContent = 'Image placeholder';
            this.parentNode.insertBefore(placeholder, this);
        });
    });
});

