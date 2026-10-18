/**
 * GreenCorner - JavaScript tương tác
 * Hỗ trợ chuyển tab Đăng nhập/Đăng ký, lọc sản phẩm, xử lý form và mobile menu
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-navigation');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function () {
      if (mainNav.style.display === 'flex') {
        mainNav.style.display = 'none';
      } else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '80px';
        mainNav.style.left = '0';
        mainNav.style.width = '100%';
        mainNav.style.backgroundColor = '#ffffff';
        mainNav.style.padding = '20px';
        mainNav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
      }
    });
  }

  // 2. Chuyển Tab Đăng Nhập / Đăng Ký (auth.html)
  const tabButtons = document.querySelectorAll('.auth-tab-btn');
  const formPanels = document.querySelectorAll('.auth-form-panel');

  if (tabButtons.length > 0 && formPanels.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetTab = this.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        formPanels.forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const activePanel = document.getElementById(targetTab);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  }

  // 3. Xử lý Lọc sản phẩm ở trang products.html
  const categoryFilters = document.querySelectorAll('input[name="category-filter"]');
  const productCards = document.querySelectorAll('.catalog-products .product-card');

  if (categoryFilters.length > 0 && productCards.length > 0) {
    categoryFilters.forEach(filter => {
      filter.addEventListener('change', function () {
        const selectedCategory = this.value;

        productCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (selectedCategory === 'all' || cardCat === selectedCategory) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });

        // Cập nhật số lượng hiển thị
        const visibleCards = document.querySelectorAll('.catalog-products .product-card[style="display: flex;"], .catalog-products .product-card:not([style*="display: none"])');
        const countSpan = document.querySelector('.catalog-count strong');
        if (countSpan) {
          countSpan.textContent = visibleCards.length;
        }
      });
    });
  }

  // 4. Xử lý Form Góp Ý (feedback.html)
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('fbName').value.trim();
      alert(`Cảm ơn bạn ${name || 'quý khách'} đã gửi ý kiến đóng góp! GreenCorner sẽ ghi nhận và cải thiện dịch vụ.`);
      feedbackForm.reset();
    });
  }

  // 5. Xử lý Form Liên Hệ (contact.html)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('ctName').value.trim();
      alert(`Cảm ơn bạn ${name || 'quý khách'} đã liên hệ! GreenCorner sẽ phản hồi trong vòng 24h.`);
      contactForm.reset();
    });
  }

  // 6. Xử lý Form Đăng Nhập & Đăng Ký (auth.html)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Đăng nhập thành công! Chào mừng bạn quay trở lại GreenCorner.');
      window.location.href = 'index.html';
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const pass = document.getElementById('regPass').value;
      const confirmPass = document.getElementById('regConfirmPass').value;

      if (pass !== confirmPass) {
        alert('Mật khẩu nhập lại không khớp. Vui lòng kiểm tra lại!');
        return;
      }

      alert('Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.');
      // Chuyển sang tab đăng nhập
      const loginTabBtn = document.querySelector('.auth-tab-btn[data-tab="loginPanel"]');
      if (loginTabBtn) loginTabBtn.click();
    });
  }

  // 7. Form tìm kiếm nhanh trên Trang chủ
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = this.querySelector('.search-input').value.trim();
      if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
});
