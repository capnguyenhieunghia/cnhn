  // Loading screen
  window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 500);
    }, 2000);
});

// Custom cursor
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.9)';
    }
});

// Fade in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Skill progress animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 500);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Typing animation
const texts = ['Full-Stack Developer', 'Web Designer', 'Mobile Developer', 'UI/UX Designer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 3000);

// Particles animation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = Math.random() * 15 + 's';
    
    document.getElementById('particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 25000);
}

setInterval(createParticle, 300);

// Theme toggle
let isDarkTheme = true;

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    if (isDarkTheme) {
        body.classList.add('light-theme');
        themeIcon.className = 'fas fa-moon';
    } else {
        body.classList.remove('light-theme');
        themeIcon.className = 'fas fa-sun';
    }
    
    isDarkTheme = !isDarkTheme;
}

// Modal functions
function openModal(projectTitle) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('modalTitle');
    const description = document.getElementById('modalDescription');
    
    const projectDetails = {
        'E-commerce Platform': 'Nền tảng thương mại điện tử được xây dựng với React.js và Node.js, tích hợp thanh toán trực tuyến, quản lý kho hàng và hệ thống đánh giá sản phẩm.',
        'Mobile Banking App': 'Ứng dụng ngân hàng di động với React Native, hỗ trợ chuyển tiền, thanh toán hóa đơn và quản lý tài chính cá nhân với bảo mật cao.',
        'AI Dashboard': 'Dashboard phân tích dữ liệu thông minh sử dụng Machine Learning để dự đoán xu hướng và tạo báo cáo tự động.'
    };
    
    title.textContent = projectTitle;
    description.textContent = projectDetails[projectTitle] || 'Mô tả dự án sẽ được cập nhật sớm...';
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Contact form
function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Đã gửi!';
        submitBtn.style.background = '#28a745';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            e.target.reset();
        }, 2000);
    }, 2000);
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add mobile menu styles
const mobileStyles = `
    .nav-links.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        flex-direction: column;
        background: rgba(26, 26, 46, 0.98);
        backdrop-filter: blur(20px);
        padding: 20px 0;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid rgba(0, 212, 255, 0.3);
    }

    .nav-links.active a {
        padding: 15px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }

    .nav-links.active a:hover {
        background: rgba(0, 212, 255, 0.1);
        padding-left: 30px;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);

// Add hover effects to interactive elements
document.querySelectorAll('.btn, .skill-card, .portfolio-item, .social-link').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'scale(1.5)';
        cursorDot.style.transform = 'scale(2)';
    });

    element.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'scale(1)';
        cursorDot.style.transform = 'scale(1)';
    });
});

// Add parallax effect to hero section (modified to prevent overlap)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    // Only apply parallax when hero is visible
    if (scrolled < heroHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add glowing effect to profile image
const profileImage = document.querySelector('.profile-image');
let glowInterval;

profileImage.addEventListener('mouseenter', () => {
    let intensity = 0.3;
    glowInterval = setInterval(() => {
        intensity += 0.1;
        if (intensity > 1) intensity = 0.3;
        profileImage.style.boxShadow = `0 0 ${intensity * 50}px rgba(0, 212, 255, ${intensity})`;
    }, 100);
});

profileImage.addEventListener('mouseleave', () => {
    clearInterval(glowInterval);
    profileImage.style.boxShadow = '';
});

// Add floating animation to skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite alternate`;
});

// Add dynamic floating keyframes
const floatingKeyframes = `
    @keyframes float {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-10px); }
    }
`;

const floatingStyle = document.createElement('style');
floatingStyle.textContent = floatingKeyframes;
document.head.appendChild(floatingStyle);

// Add sound effects (optional - commented out for now)
function playSound(frequency, duration) {
    // Uncomment to enable sound effects
    /*
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
    */
}

// Add click sound to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        playSound(800, 0.1);
    });
});

// Animated counters for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Timeline scroll animation
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe stats section
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });

    // Add floating animation to value cards
    document.querySelectorAll('.value-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('floating');
    });

    // Add hover sound effects to hobby cards
    document.querySelectorAll('.hobby-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            playSound(600, 0.1);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});