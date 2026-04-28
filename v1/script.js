/* ============================================
   新流舎 LP - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // モバイル固定CTA
  var stickyCta = document.getElementById('stickyCta');
  function handleScroll() {
    var scrollY = window.scrollY;
    if (stickyCta) {
      var contactSection = document.getElementById('contact');
      var contactTop = contactSection ? contactSection.getBoundingClientRect().top : 9999;
      if (scrollY > window.innerHeight * 0.8 && contactTop > 200) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var offset = 16;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // スクロールアニメーション（Intersection Observer）
  var fadeElements = document.querySelectorAll(
    '.problem-card, .problem-insight, .what-text, .what-comparison, ' +
    '.future-card, .proof-card, .how-step.has-image, .who-content, ' +
    '.contact-form-wrap, .section-label, .section-title'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // 少しだけ遅延をつけてカード系は順番にアニメーション
        var parent = entry.target.parentElement;
        if (parent) {
          var siblings = Array.from(parent.children).filter(function (c) {
            return c.classList.contains('fade-in');
          });
          var index = siblings.indexOf(entry.target);
          var delay = index >= 0 ? index * 100 : 0;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
        } else {
          entry.target.classList.add('visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // フォーム送信（Formspree対応）
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = '送信中...';
      btn.disabled = true;

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          btn.textContent = '送信完了';
          btn.style.background = '#2d8a4e';
          btn.style.color = '#fff';

          var msg = document.createElement('div');
          msg.style.cssText = 'background: #f0fdf4; border: 1px solid #86efac; padding: 20px; border-radius: 8px; margin-bottom: 24px; text-align: center; color: #166534; font-weight: 700;';
          msg.textContent = 'お問い合わせありがとうございます。3営業日以内にご連絡いたします。';
          form.insertBefore(msg, form.firstChild);
          form.reset();

          setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
          }, 4000);
        } else {
          throw new Error('送信に失敗しました');
        }
      }).catch(function () {
        btn.textContent = '送信に失敗しました';
        btn.style.background = '#e53e3e';
        btn.style.color = '#fff';
        btn.disabled = false;

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 3000);
      });
    });
  }

});
