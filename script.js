// =============================================
// main.js — jQuery Interactions & Animations
// =============================================

$(document).ready(function () {

  // ---- CUSTOM CURSOR ----
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  $(document).mousemove(function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    $('.cursor').css({ left: mouseX, top: mouseY });
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    $('.cursor-follower').css({ left: followerX, top: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  $('a, button, .tag, .stat-card, .project-card, .timeline-header').hover(
    function () {
      $('.cursor').css({ width: '16px', height: '16px', background: 'transparent', border: '2px solid var(--accent)' });
      $('.cursor-follower').css({ width: '48px', height: '48px' });
    },
    function () {
      $('.cursor').css({ width: '8px', height: '8px', background: 'var(--accent)', border: 'none' });
      $('.cursor-follower').css({ width: '32px', height: '32px' });
    }
  );

  // ---- NAVBAR SCROLL EFFECT ----
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }
  });

  // ---- MOBILE NAV TOGGLE ----
  $('.nav-toggle').click(function () {
    $('.nav-links').toggleClass('open');
  });

  $('.nav-links a').click(function () {
    $('.nav-links').removeClass('open');
  });

  // ---- SMOOTH SCROLL ----
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate({ scrollTop: target.offset().top - 70 }, 700, 'swing');
    }
  });

  // ---- SKILL BARS ANIMATION (jQuery scroll trigger) ----
  function animateSkills() {
    const windowBottom = $(window).scrollTop() + $(window).height();
    if ($('#skills').length && windowBottom > $('#skills').offset().top + 100) {
      $('.skill-fill').each(function () {
        const width = $(this).data('width') + '%';
        if ($(this).css('width') === '0px') {
          $(this).css('width', width);
        }
      });
    }
  }

  $(window).scroll(animateSkills);
  animateSkills();

  // ---- STAT COUNTER ANIMATION ----
  function animateStats() {
    const windowBottom = $(window).scrollTop() + $(window).height();
    if ($('#about').length && windowBottom > $('#about').offset().top + 200) {
      $('.stat-num').each(function () {
        const $this = $(this);
        const target = parseInt($this.data('val'));
        if ($this.text() === '0') {
          $({ count: 0 }).animate({ count: target }, {
            duration: 1200,
            step: function () {
              $this.text(Math.floor(this.count));
            },
            complete: function () {
              $this.text(target);
            }
          });
        }
      });
    }
  }

  $(window).scroll(animateStats);
  animateStats();

  // ---- TIMELINE ACCORDION (jQuery) ----
  $('.timeline-header').on('click', function () {
    const $content = $(this).closest('.timeline-content');
    const $body = $content.find('.timeline-body');

    if ($content.hasClass('open')) {
      $body.slideUp(300);
      $content.removeClass('open');
    } else {
      $('.timeline-content.open .timeline-body').slideUp(300);
      $('.timeline-content').removeClass('open');
      $body.slideDown(300);
      $content.addClass('open');
    }
  });

  // Open first accordion by default
  $('.timeline-content:first-child .timeline-header').trigger('click');

  // ---- CONTACT FORM VALIDATION (jQuery) ----
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Reset
    $('#f-name, #f-email, #f-msg').removeClass('error');
    $('.form-error').text('');

    const name = $('#f-name').val().trim();
    const email = $('#f-email').val().trim();
    const msg = $('#f-msg').val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      $('#f-name').addClass('error');
      $('#err-name').text('Le nom est requis.');
      valid = false;
    }
    if (!email) {
      $('#f-email').addClass('error');
      $('#err-email').text("L'email est requis.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      $('#f-email').addClass('error');
      $('#err-email').text("Format d'email invalide.");
      valid = false;
    }
    if (!msg) {
      $('#f-msg').addClass('error');
      $('#err-msg').text('Le message est requis.');
      valid = false;
    }

    if (valid) {
      $('#contact-form input, #contact-form textarea').val('');
      $('#form-success').fadeIn(400);
      setTimeout(() => $('#form-success').fadeOut(400), 4000);
    }
  });

  // ---- SCROLL REVEAL ANIMATION ----
  function revealOnScroll() {
    const windowBottom = $(window).scrollTop() + $(window).height() - 80;
    $('.timeline-item, .stat-card, .project-card, .skill-item').each(function () {
      if ($(this).offset().top < windowBottom) {
        $(this).addClass('revealed');
      }
    });
  }

  // Add base styles for reveal
  $('<style>')
    .text(`
      .timeline-item, .stat-card, .project-card, .skill-item {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .timeline-item.revealed, .stat-card.revealed, .project-card.revealed, .skill-item.revealed {
        opacity: 1;
        transform: none;
      }
      .project-filters {
        display: flex;
        gap: 0.7rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }
      .filter-btn {
        padding: 0.45rem 1.2rem;
        background: transparent;
        border: 1px solid rgba(192, 132, 252, 0.15);
        color: #94a3b8;
        font-family: 'DM Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s;
      }
      .filter-btn:hover, .filter-btn.active {
        border-color: #c084fc;
        color: #c084fc;
        background: rgba(192, 132, 252, 0.07);
      }
    `)
    .appendTo('head');

  $(window).scroll(revealOnScroll);
  setTimeout(revealOnScroll, 100);

  // Re-run reveal after React renders
  setTimeout(revealOnScroll, 800);
  setTimeout(revealOnScroll, 1500);

  // ---- HOVER GLOW ON TAGS ----
  $(document).on('mouseenter', '.tag', function () {
    $(this).css('box-shadow', '0 0 15px rgba(192,132,252,0.3)');
  }).on('mouseleave', '.tag', function () {
    $(this).css('box-shadow', 'none');
  });

});