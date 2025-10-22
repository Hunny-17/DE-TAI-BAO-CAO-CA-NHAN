document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 JS LOADED - Starting...');
    
    // =========================================================================
    // 1. HAMBURGER MENU - EVENT LISTENER CHÍNH
    // =========================================================================
    function initHamburger() {
        const hamburger = document.querySelector('.hamburger');
        const menu = document.querySelector('.menu');
        
        console.log('🔍 Hamburger:', hamburger);
        console.log('🔍 Menu:', menu);
        
        if (!hamburger || !menu) {
            console.error('❌ Hamburger or Menu NOT FOUND!');
            return;
        }
        
        // TOGGLE FUNCTION
        function toggleMenu() {
            console.log('☰ CLICKED!');
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }
        
        // GẮN EVENT CHO HAMBURGER
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('☰ EVENT FIRED!');
            toggleMenu();
        });
        
        // ĐÓNG MENU KHI CLICK LINK
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        console.log('✅ HAMBURGER EVENT ATTACHED!');
    }
    
    // CHẠY NGAY KHI LOAD
    initHamburger();
    
    // RE-ATTACH KHI RESIZE (SAFE)
    window.addEventListener('resize', function() {
        setTimeout(initHamburger, 100);
    });
    
    // =========================================================================
    // 2. STICKY HEADER
    // =========================================================================
    window.addEventListener('scroll', function() {
        const topBar = document.querySelector('.top-bar');
        if (topBar) {
            topBar.classList.toggle('sticky', window.scrollY > 50);
        }
    });
    
    // =========================================================================
    // 3. MODAL
    // =========================================================================
    const modalData = {
        news1: { image: "images/Lineup.jpg", title: "MU VS LIV", description: "CUNHA TRỞ LẠI" },
        news2: { image: "images/Lineup2.jpg", title: "MU VS SUN", description: "LAMMENS XUẤT PHÁT" }
    };
    
    const modal = document.getElementById('modal');
    if (modal) {
        document.querySelectorAll('.grid-item[data-modal]').forEach(item => {
            item.addEventListener('click', () => {
                const modalId = item.getAttribute('data-modal');
                const data = modalData[modalId];
                if (data) {
                    document.querySelector('.modal-image').src = data.image;
                    document.querySelector('.modal-title').textContent = data.title;
                    document.querySelector('.modal-description').textContent = data.description;
                    modal.style.display = 'flex';
                }
            });
        });
        
        document.querySelector('.close')?.addEventListener('click', () => modal.style.display = 'none');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
    
    // =========================================================================
    // 4. SEARCH - 30+ ITEMS SIÊU MẠNH
    // =========================================================================
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
   
    if (searchInput && searchResults) {
        //  30+ ITEMS ĐẦY ĐỦ
        const searchData = [
            // LỊCH THI ĐẤU
            { text: "MU vs Liverpool", type: "fixture", section: "#lich-thi-dau" },
            { text: "MU vs Sunderland", type: "fixture", section: "#lich-thi-dau" },
            { text: "MU vs Everton", type: "fixture", section: "#lich-thi-dau" },
            { text: "MU vs West Ham", type: "fixture", section: "#lich-thi-dau" },
            { text: "MU vs Tottenham", type: "fixture", section: "#lich-thi-dau" },
            { text: "MU vs Arsenal", type: "fixture", section: "#lich-thi-dau" },
            { text: "MU vs Chelsea", type: "fixture", section: "#lich-thi-dau" },
            { text: "MU vs Man City", type: "fixture", section: "#lich-thi-dau" },
            { text: "MU vs Newcastle", type: "fixture", section: "#lich-thi-dau" },
            
            // TIN TỨC
            { text: "MU thắng Liverpool", type: "news", section: "#tin-tuc" },
            { text: "Rashford cú đúp", type: "news", section: "#tin-tuc" },
            { text: "Ten Hag phát biểu", type: "news", section: "#tin-tuc" },
            { text: "MU ký Bruno", type: "news", section: "#tin-tuc" },
            
            // ĐỘI HÌNH + CẦU THỦ
            { text: "MU VS LIV", type: "lineup", section: "#doi-hinh" },
            { text: "MU VS SUN", type: "lineup", section: "#doi-hinh" },
            { text: "Bruno Fernandes", type: "player", section: "#doi-hinh" },
            { text: "Marcus Rashford", type: "player", section: "#doi-hinh" },
            { text: "Andre Onana", type: "player", section: "#doi-hinh" },
            { text: "Lisandro Martinez", type: "player", section: "#doi-hinh" },
            { text: "Casemiro", type: "player", section: "#doi-hinh" },
            { text: "Alejandro Garnacho", type: "player", section: "#doi-hinh" },
            
            // HIGHLIGHTS
            { text: "Highlight Sunderland", type: "video", section: "#highlights" },
            { text: "Highlight Liverpool", type: "video", section: "#highlights" },
            
            // LIÊN HỆ
            { text: "Liên hệ fan MU", type: "contact", section: "#lien-he" }
        ];
       
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
           
            const filtered = searchData.filter(item =>
                item.text.toLowerCase().includes(query)
            );
           
            // MAX 8 KẾT QUẢ
            const displayResults = filtered.slice(0, 8);
           
            searchResults.innerHTML = displayResults.map(item => `
                <div class="search-result-item" onclick="goToResult('${item.section}', '${item.text}')">
                    <strong>${item.text}</strong><br>
                    <small>📍 ${item.type === 'fixture' ? 'Lịch thi đấu' : 
                          item.type === 'news' ? 'Tin tức' : 
                          item.type === 'lineup' ? 'Đội hình' : 
                          item.type === 'player' ? 'Cầu thủ' : 
                          item.type === 'video' ? 'Highlight' : 'Liên hệ'}</small>
                </div>
            `).join('') || `<div class="no-results">Không tìm thấy "<strong>${query}</strong>"</div>`;
           
            searchResults.style.display = displayResults.length > 0 ? 'block' : 'none';
        });
       
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    // =========================================================================
    // 5. SMOOTH SCROLL
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.top-bar')?.offsetHeight || 0;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========================================================================
    // 6. SCROLL TO TOP
    // =========================================================================
    const scrollToTop = document.getElementById('scrollToTop');
    if (scrollToTop) {
        window.addEventListener('scroll', () => {
            scrollToTop.classList.toggle('visible', window.scrollY > 100);
        });
        scrollToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // =========================================================================
    // 7. CAROUSEL
    // =========================================================================
    const fixtureGrid = document.querySelector('.fixture-grid');
    if (fixtureGrid) {
        let currentSlide = 0;
        window.moveCarousel = function(direction) {
            const slideWidth = window.innerWidth <= 768 ? 215 : 270;
            const totalSlides = document.querySelectorAll('.fixture-item').length;
            const visibleSlides = window.innerWidth <= 768 ? 1 : 4;
            const maxSlides = totalSlides - visibleSlides;
            
            currentSlide += direction;
            if (currentSlide < 0) currentSlide = 0;
            if (currentSlide > maxSlides) currentSlide = maxSlides;
            
            fixtureGrid.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
        };
    }
    
    // =========================================================================
    // 8. FORM
    // =========================================================================
    document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('✅ Tin nhắn đã gửi!');
        this.reset();
    });
    
	
    // GLOBAL FUNCTIONS
    window.goToResult = function(section, text) {
    const targetSection = document.querySelector(section);
    if (targetSection) {
        const headerHeight = document.querySelector('.top-bar')?.offsetHeight || 0;
        window.scrollTo({
            top: targetSection.offsetTop - headerHeight - 20,
            behavior: 'smooth'
        });
    }
    
    if (searchResults) searchResults.style.display = 'none';
    if (searchInput) searchInput.value = '';
    
    setTimeout(() => highlightSearchText(text), 500);
};

	function highlightSearchText(query) {
    const section = document.querySelector('.content-section');
    if (!section || !query) return;
    
    const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT);
    let node;
    while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
            const parent = node.parentElement;
            const regex = new RegExp(`(${query})`, 'gi');
            parent.innerHTML = parent.innerHTML.replace(regex, '<mark>$1</mark>');
        }
    }
}
    
    console.log('✅ ALL FEATURES LOADED!');
	
	    // =========================================================================
    // 9. YOUTUBE HIGHLIGHTS - KHÔNG XUNG ĐỘT
    // =========================================================================
    function initYouTubeVideos() {
        document.querySelectorAll('.video-item[data-link]').forEach(item => {
            // CHECK ĐÃ LOAD CHƯA
            if (item.querySelector('iframe')) return;
            
            const link = item.getAttribute('data-link');
            let videoId = '';
            
            // LẤY VIDEO ID
            if (link.includes('v=')) {
                videoId = link.split('v=')[1]?.split('&')[0];
            } else if (link.includes('youtu.be/')) {
                videoId = link.split('youtu.be/')[1]?.split('?')[0];
            }
            
            if (videoId) {
                // TẠO IFRAME
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.width = '100%';
                iframe.height = '350';
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                
                // THAY IMG BẰNG IFRAME
                const img = item.querySelector('img');
                if (img) img.replaceWith(iframe);
                
                // CLICK MỞ TAB
                item.addEventListener('click', function(e) {
                    e.stopPropagation();
                    window.open(link, '_blank');
                    console.log('🎥 YouTube opened:', link);
                });
                
                console.log('✅ YouTube loaded:', videoId);
            }
        });
    }
    
    // CHẠY SAU KHI LOAD
    setTimeout(initYouTubeVideos, 200);
});