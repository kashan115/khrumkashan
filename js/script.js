$(document).ready(function() {
  "use strict";
  
  // Set copyright year
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.getElementById("copyrightYear");
  if (copyrightElement) {
    copyrightElement.innerHTML = currentYear;
  }
  
  // Slider configuration
  $(".widget-slider").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  // Navbar scroll effect
  $(window).on("scroll", function() {
    if ($(window).scrollTop()) {
      $("nav").addClass("nav-bg");
    } else {
      $("nav").removeClass("nav-bg");
    }
  });
  
  // Smooth scrolling for anchor links
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 100
      }, 1000);
    }
  });
  
  // Add loading animation
  $(window).on('load', function() {
    $('.loading').fadeOut();
    $('body').removeClass('loading');
  });
  
  // Form validation and enhancement
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Create mailto link
      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
      const mailtoLink = `mailto:khrum.kashan@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      showNotification('Thank you for your message! Your email client should open with the message ready to send.', 'success');
      
      // Reset form
      this.reset();
    });
  }
  
  // Newsletter subscription
  const newsletterForm = document.querySelector('.newsletter form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showNotification('Thank you for subscribing! You\'ll be notified about new content.', 'success');
      this.reset();
    });
  }
  
  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(el => el.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      max-width: 400px;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      color: white;
      font-weight: 500;
      animation: slideInRight 0.3s ease;
      background: ${type === 'success' ? 'linear-gradient(45deg, #28a745, #20c997)' : 
                  type === 'error' ? 'linear-gradient(45deg, #dc3545, #e83e8c)' : 
                  'linear-gradient(45deg, #007bff, #0056b3)'};
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      margin-left: 1rem;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
  
  // Add CSS animation keyframes
  if (!document.querySelector('#dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .loading {
        overflow: hidden;
      }
      
      .loading::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Back to top button */
      .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #007bff, #0056b3);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 1000;
      }
      
      .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
      }
      
      .back-to-top.show {
        display: flex;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '<i class="fa fa-arrow-up"></i>';
  backToTopButton.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  document.body.appendChild(backToTopButton);
  
  // Show/hide back to top button
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) {
      $('.back-to-top').addClass('show');
    } else {
      $('.back-to-top').removeClass('show');
    }
  });
  
  // Add fade-in animation to cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all cards
  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
  
  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  
  // Navbar mobile menu enhancement
  $('.navbar-toggler').on('click', function() {
    $(this).toggleClass('active');
  });
  
  // Close mobile menu when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.navbar').length) {
      $('.navbar-collapse').removeClass('show');
      $('.navbar-toggler').removeClass('active');
    }
  });
  
});