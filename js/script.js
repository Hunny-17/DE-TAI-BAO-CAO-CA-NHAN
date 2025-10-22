document.addEventListener('DOMContentLoaded', function() {

	// Hàm toggle menu hamburger
    window.toggleMenu = function() {
        const menu = document.querySelector('.menu');
        const hamburger = document.querySelector('.hamburger');
        console.log('Đang toggle menu', menu, hamburger);
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    };

    // Gắn sự kiện click cho hamburger
    document.querySelector('.hamburger')?.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Đóng menu khi click link
    document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.menu').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });

    // Reset menu khi thay đổi kích thước màn hình
    window.addEventListener('resize', function() {
        const width = window.innerWidth;
        const menu = document.querySelector('.menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (width <= 768) {
            // Khi chuyển sang mobile, ẩn menu nếu không active
            if (!menu.classList.contains('active')) {
                menu.style.display = 'none';
            }
            hamburger.style.display = 'flex'; // Đảm bảo hamburger hiện
        } else {
            // Khi chuyển sang desktop, ẩn menu và hamburger active
            menu.classList.remove('active');
            hamburger.classList.remove('active');
            menu.style.display = 'flex'; // Hiển thị menu ngang
            hamburger.style.display = 'none'; // Ẩn hamburger
        }
    });

    // Khởi tạo trạng thái ban đầu
    const initialWidth = window.innerWidth;
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    if (initialWidth <= 768) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        menu.style.display = 'none';
        hamburger.style.display = 'flex';
    } else {
        menu.style.display = 'flex';
        hamburger.style.display = 'none';
    }
    
    // HEADER STICKY 
	window.addEventListener('scroll', function() {
    const topBar = document.querySelector('.top-bar');
    if (!topBar) {
        console.error('Không tìm thấy .top-bar');
        return;
    }
    console.log('Scroll Y:', window.scrollY, ' - Sticky class:', topBar.classList.contains('sticky'));
    if (window.scrollY > 50) {
        if (!topBar.classList.contains('sticky')) {
            topBar.classList.add('sticky');
            console.log('Đã thêm class sticky');
        }
    } else {
        if (topBar.classList.contains('sticky')) {
            topBar.classList.remove('sticky');
            console.log('Đã xóa class sticky');
        }
    }
});

    // Modal data
    const modalData = {
       news1: { image: "images/Lineup.jpg", title: "MU VS LIV", description: "CUNHA TRỞ LẠI" },
	   news2: { image: "images/Lineup2.jpg", title: "MU VS SUN", description: "LAMMENS XUẤT PHÁT" }
    };

    // Modal handling
    const modal = document.getElementById('modal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.grid-item[data-modal]').forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            const data = modalData[modalId];
            if (data) {
                modalImage.src = data.image;
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;
                modal.style.display = 'flex';
            }
        });
    });

    // Video items
    document.querySelectorAll('.video-item').forEach(item => {
        const link = item.getAttribute('data-link');
        if (link && link.includes('youtube.com')) {
            const videoId = link.split('v=')[1]?.split('&')[0] || link.split('/embed/')[1];
            if (videoId) {
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
                iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                iframe.frameBorder = '0';
                const img = item.querySelector('img');
                if (img) img.replaceWith(iframe);
                iframe.addEventListener('click', () => window.open(link, '_blank'));
            }
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Scroll to top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 100);
    });
    scrollToTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Close modal
    closeBtn?.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => e.target === modal && (modal.style.display = 'none'));

    // Carousel
    window.currentSlide = 0;
    const fixtureGrid = document.querySelector('.fixture-grid');
    const slides = document.querySelectorAll('.fixture-item');
    const totalSlides = slides.length;
    const slideWidth = 270;
    const visibleSlides = 4;
    const maxSlides = totalSlides - visibleSlides;

    window.moveCarousel = function(direction) {
        window.currentSlide += direction;
        if (window.currentSlide < 0) window.currentSlide = 0;
        else if (window.currentSlide > maxSlides) window.currentSlide = maxSlides;
        fixtureGrid.style.transform = `translateX(${-window.currentSlide * slideWidth}px)`;
		console.log(`Slide: ${window.currentSlide}/${maxSlides}`);
	};
	
	document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('.top-bar').offsetHeight;
      const offset = target.offsetTop - headerHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
	// MOBILE RESPONSIVE
    function updateCarousel() {
        const width = window.innerWidth;
        let newVisibleSlides = 4;
        let newSlideWidth = 270;
        
        if (width <= 768) {
            newVisibleSlides = 1;
            newSlideWidth = 215;
        } else if (width <= 1024) {
            newVisibleSlides = 3;
            newSlideWidth = 270;
        }
        
        const newMaxSlides = totalSlides - newVisibleSlides;
        window.currentSlide = Math.min(window.currentSlide, newMaxSlides);
        
        fixtureGrid.style.transform = `translateX(${-window.currentSlide * newSlideWidth}px)`;
    }

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
	
	// SEARCH FUNCTIONALITY 
		const searchInput = document.getElementById('searchInput');
		const searchResults = document.getElementById('searchResults');

	// DỮ LIỆU TÌM KIẾM
	const searchData = [
    // FIXTURES
    { text: "United vs Sunderland", type: "fixture", section: "#lich-thi-dau" },
    { text: "United vs Liverpool", type: "fixture", section: "#lich-thi-dau" },
    { text: "United vs Brighton", type: "fixture", section: "#lich-thi-dau" },
    { text: "Forest vs United", type: "fixture", section: "#lich-thi-dau" },
    { text: "Tottenham vs United", type: "fixture", section: "#lich-thi-dau" },
    { text: "United vs Everton", type: "fixture", section: "#lich-thi-dau" },
    { text: "Crystal Palace vs United", type: "fixture", section: "#lich-thi-dau" },
    { text: "United vs West Ham", type: "fixture", section: "#lich-thi-dau" },
    { text: "Wolves vs United", type: "fixture", section: "#lich-thi-dau" },
    
    // TIN TỨC
    { text: "Ruben Amorim", type: "news", section: "#tin-tuc" },
    { text: "CHIẾN THẮNG DÀNH CHO NGƯỜI HÂM MỘ", type: "news", section: "#tin-tuc" },
    { text: "Harry Maguire", type: "news", section: "#tin-tuc" },
    { text: "ĐỘNG LỰC CỦA CHÚNG TÔI", type: "news", section: "#tin-tuc" },
    
    // ĐỘI HÌNH
    { text: "MU VS LIV", type: "lineup", section: "#doi-hinh" },
    { text: "MU VS SUN", type: "lineup", section: "#doi-hinh" },
    
    // HIGHLIGHTS
    { text: "Highlight vs Sunderland", type: "highlight", section: "#highlights" },
    { text: "Highlight vs Liverpool", type: "highlight", section: "#highlights" }
];

	// SEARCH INPUT EVENT
	searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const results = searchResults;
    
    if (query.length < 2) {
        results.style.display = 'none';
        return;
    }
    
    // LỌC KẾT QUẢ
    const filtered = searchData.filter(item => 
        item.text.toLowerCase().includes(query)
    ).slice(0, 6);  // TỐI ĐA 6 KQ
    
    if (filtered.length === 0) {
        results.innerHTML = '<div class="no-results">Không tìm thấy kết quả</div>';
    } else 
		{
        results.innerHTML = filtered.map(item => `
            <div class="search-result-item" onclick="goToResult('${item.section}', '${item.text}')">
                <strong>${item.text}</strong><br>
                <small>${item.type === 'fixture' ? 'Lịch thi đấu' : 
                      item.type === 'news' ? 'Tin tức' : 
                      item.type === 'lineup' ? 'Đội hình' : 'Highlight'}</small>
            </div>
			`).join('');
		}
    
    results.style.display = filtered.length > 0 || query.length >= 2 ? 'block' : 'none';
});

	// CLICK NGOÀI → ẨN RESULTS
	document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

	// ICON CLICK
	function toggleSearch() {
    searchInput.focus();
    searchInput.value = '';
    searchResults.style.display = 'none';
}

	// ĐI ĐẾN KẾT QUẢ
	function goToResult(section, text) {
    // SCROLL MỚT
    document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
    
    // HIGHLIGHT KẾT QUẢ (TÙY CHỌN)
    setTimeout(() => {
        const items = document.querySelectorAll('.fixture-item h3, .news-content h3, .grid-item h3');
        items.forEach(item => {
            if (item.textContent.includes(text)) {
                item.style.background = '#D00';
                item.style.color = '#FFF';
                item.style.padding = '2px 5px';
                setTimeout(() => {
                    item.style.background = '';
                    item.style.color = '';
                    item.style.padding = '';
                }, 2000);
            }
        });
    }, 500);
    
    // ẨN RESULTS
    searchResults.style.display = 'none';
    searchInput.value = '';
}
	
	
    // Form submit
    document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('✅ CẢM ƠN! Tin nhắn đã được gửi!');
        this.reset();
    });
});