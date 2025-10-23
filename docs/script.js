// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open current item if it was closed
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Service Form Handling
document.getElementById('serviceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.name.value,
        phone: this.phone.value,
        service: this.service.value,
        message: this.message.value,
        date: new Date().toLocaleString('ru-RU'),
        source: 'Сайт ПрофиСервис'
    };
    
    // Simulate form submission
    console.log('Заявка с сайта:', formData);
    
    // Show success message
    this.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    
    // Clear form
    this.reset();
    
    // In a real project, you would send this data to your server
    // sendToTelegram(formData);
    // or
    // sendToEmail(formData);
});

// Service buttons in cards
document.querySelectorAll('.btn-outline').forEach(button => {
    button.addEventListener('click', function() {
        const service = this.dataset.service;
        document.querySelector('select[name="service"]').value = service;
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation on Scroll
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

// Observe elements for animation
document.querySelectorAll('.service-card, .advantage-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Phone number formatting (optional)
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 768 && 
            navLinks.style.display === 'flex' && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn')) {
            navLinks.style.display = 'none';
        }
    });
});

// Telegram notification function (for future use)
function sendToTelegram(formData) {
    const botToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    
    const message = `📨 Новая заявка с сайта ПрофиСервис:
    
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
🔧 Услуга: ${formData.service}
📝 Сообщение: ${formData.message}
⏰ Время: ${formData.date}`;

    // Uncomment and configure when you have a Telegram bot
    /*
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    });
    */
}

// Email notification function (for future use)
function sendToEmail(formData) {
    // This would typically be handled by a backend service
    // You can use services like EmailJS, Formspree, or your own backend
    console.log('Sending email with data:', formData);
}