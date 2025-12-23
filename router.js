// router.js - Client-side routing for Astronomy News

const AN_router = {
    routes: {
        '/': 'home',
        '/index.html': 'home',
        '/AN_news.html': 'news',
        '/AN_gallery.html': 'gallery',
        '/AN_missions.html': 'missions',
        '/AN_explore.html': 'explore',
        '/AN_about.html': 'about'
    },
    
    // Initialize router
    init: function() {
        console.log('Initializing router...');
        
        // Handle initial route
        this.handleRoute();
        
        // Listen for popstate events (back/forward buttons)
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Intercept link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href.startsWith(window.location.origin)) {
                e.preventDefault();
                const path = link.getAttribute('href');
                this.navigate(path);
            }
        });
    },
    
    // Handle current route
    handleRoute: function() {
        const path = window.location.pathname;
        const query = window.location.search;
        const params = new URLSearchParams(query);
        
        console.log('Route changed to:', path);
        
        // Update active navigation
        this.updateActiveNav(path);
        
        // Handle page-specific content
        this.loadPageContent(path, params);
        
        // Scroll to top
        window.scrollTo(0, 0);
    },
    
    // Navigate to path
    navigate: function(path) {
        if (path.startsWith('http')) {
            // External link, open normally
            window.location.href = path;
            return;
        }
        
        // Push to history
        history.pushState({}, '', path);
        
        // Handle route
        this.handleRoute();
    },
    
    // Update active navigation link
    updateActiveNav: function(currentPath) {
        const navLinks = document.querySelectorAll('.AN-nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPath = link.getAttribute('href');
            
            // Handle home page special case
            if ((currentPath === '/' || currentPath === '/index.html') && 
                (linkPath === '/' || linkPath === '/index.html')) {
                link.classList.add('active');
            } 
            // Handle other pages
            else if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    },
    
    // Load page-specific content
    loadPageContent: function(path, params) {
        // Clear any existing modals
        this.closeAllModals();
        
        // Handle item detail view
        const itemId = params.get('id');
        if (itemId) {
            this.showItemDetail(itemId, path);
            return;
        }
        
        // Load page based on route
        const page = this.getPageFromPath(path);
        
        switch (page) {
            case 'home':
                this.loadHomePage();
                break;
            case 'news':
                this.loadNewsPage();
                break;
            case 'gallery':
                this.loadGalleryPage();
                break;
            case 'missions':
                this.loadMissionsPage();
                break;
            case 'explore':
                this.loadExplorePage();
                break;
            case 'about':
                this.loadAboutPage();
                break;
            default:
                this.load404Page();
        }
    },
    
    // Get page name from path
    getPageFromPath: function(path) {
        for (const [route, page] of Object.entries(this.routes)) {
            if (path === route || path === route + '.html') {
                return page;
            }
        }
        return 'home'; // Default to home
    },
    
    // Load home page content
    loadHomePage: function() {
        console.log('Loading home page...');
        
        // Check if we're already on home page
        const mainContent = document.querySelector('.AN-main');
        if (mainContent && mainContent.querySelector('.AN-hero')) {
            // Already have home content
            return;
        }
        
        // Load home page template
        this.loadTemplate('home')
            .then(html => {
                if (html) {
                    this.updateMainContent(html);
                    this.initHomePage();
                }
            })
            .catch(error => {
                console.error('Error loading home page:', error);
            });
    },
    
    // Initialize home page components
    initHomePage: function() {
        // Initialize category buttons
        if (typeof AN_initCategoryButtons === 'function') {
            AN_initCategoryButtons();
        }
        
        // Load news and events
        const language = window.AN_app?.state.currentLanguage || 'en';
        if (typeof AN_renderNews === 'function') {
            AN_renderNews(language, 'all');
        }
        if (typeof AN_renderEvents === 'function') {
            AN_renderEvents(language);
        }
    },
    
    // Load news page
    loadNewsPage: function() {
        console.log('Loading news page...');
        
        this.loadTemplate('news')
            .then(html => {
                if (html) {
                    this.updateMainContent(html);
                    this.initNewsPage();
                }
            })
            .catch(error => {
                console.error('Error loading news page:', error);
            });
    },
    
    // Initialize news page
    initNewsPage: function() {
        const language = window.AN_app?.state.currentLanguage || 'en';
        if (typeof AN_renderAllNews === 'function') {
            AN_renderAllNews(language);
        }
    },
    
    // Load gallery page
    loadGalleryPage: function() {
        console.log('Loading gallery page...');
        
        this.loadTemplate('gallery')
            .then(html => {
                if (html) {
                    this.updateMainContent(html);
                    this.initGalleryPage();
                }
            })
            .catch(error => {
                console.error('Error loading gallery page:', error);
            });
    },
    
    // Initialize gallery page
    initGalleryPage: function() {
        // Gallery page specific initialization
        console.log('Initializing gallery page...');
        // This will be implemented in data_gallery.js
    },
    
    // Load missions page
    loadMissionsPage: function() {
        console.log('Loading missions page...');
        
        this.loadTemplate('missions')
            .then(html => {
                if (html) {
                    this.updateMainContent(html);
                    this.initMissionsPage();
                }
            })
            .catch(error => {
                console.error('Error loading missions page:', error);
            });
    },
    
    // Initialize missions page
    initMissionsPage: function() {
        // Missions page specific initialization
        console.log('Initializing missions page...');
        // This will be implemented in data_missions.js
    },
    
    // Load explore page
    loadExplorePage: function() {
        console.log('Loading explore page...');
        
        this.loadTemplate('explore')
            .then(html => {
                if (html) {
                    this.updateMainContent(html);
                    this.initExplorePage();
                }
            })
            .catch(error => {
                console.error('Error loading explore page:', error);
            });
    },
    
    // Initialize explore page
    initExplorePage: function() {
        // Explore page specific initialization
        console.log('Initializing explore page...');
        // This will be implemented in data_explore.js
    },
    
    // Load about page
    loadAboutPage: function() {
        console.log('Loading about page...');
        
        this.loadTemplate('about')
            .then(html => {
                if (html) {
                    this.updateMainContent(html);
                    this.initAboutPage();
                }
            })
            .catch(error => {
                console.error('Error loading about page:', error);
            });
    },
    
    // Initialize about page
    initAboutPage: function() {
        // About page specific initialization
        console.log('Initializing about page...');
        // This will be implemented in data_about.js
    },
    
    // Load 404 page
    load404Page: function() {
        console.log('Loading 404 page...');
        
        const html = `
            <div class="AN-404-container">
                <div class="AN-404-content">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>The page you are looking for doesn't exist or has been moved.</p>
                    <a href="/" class="AN-btn AN-btn-primary">Go Home</a>
                </div>
            </div>
        `;
        
        this.updateMainContent(html);
    },
    
    // Show item detail
    showItemDetail: function(itemId, returnPath = '/') {
        const item = AN_getDataById(itemId);
        if (!item) {
            console.error('Item not found:', itemId);
            return;
        }
        
        const language = window.AN_app?.state.currentLanguage || 'en';
        const stats = AN_getInteractionStats(itemId, item.type);
        
        const html = `
            <div class="AN-item-detail">
                <button class="AN-back-btn" onclick="AN_router.navigate('${returnPath}')">
                    <i class="fas fa-arrow-left"></i> Back
                </button>
                
                <div class="AN-item-detail-header">
                    <span class="AN-item-badge ${item.category === 'local' ? 'AN-local-badge' : 'AN-global-badge'}">
                        ${item.category === 'local' ? 'Tunisia' : 'Global'}
                    </span>
                    <span class="AN-item-date">${AN_formatDate(item.date, language)}</span>
                </div>
                
                <h1 class="AN-item-title">${item[language]?.title || item.en.title}</h1>
                <h2 class="AN-item-subtitle">${item[language]?.subtitle || item.en.subtitle}</h2>
                
                ${item.image ? `
                    <div class="AN-item-image">
                        <img src="${item.image}" alt="${item[language]?.title || item.en.title}">
                    </div>
                ` : ''}
                
                <div class="AN-item-content">
                    ${(item[language]?.body || item.en.body).replace(/\n/g, '<br>')}
                </div>
                
                <div class="AN-item-reactions">
                    <div class="AN-reaction-buttons">
                        <button class="AN-reaction-btn AN-like-btn ${stats.userReaction === 'like' ? 'active' : ''}" 
                                data-item-id="${itemId}" data-item-type="${item.type}">
                            <i class="fas fa-thumbs-up"></i>
                            <span class="AN-reaction-count">${stats.likes}</span>
                            <span class="AN-reaction-label">Like</span>
                        </button>
                        
                        <button class="AN-reaction-btn AN-dislike-btn ${stats.userReaction === 'dislike' ? 'active' : ''}" 
                                data-item-id="${itemId}" data-item-type="${item.type}">
                            <i class="fas fa-thumbs-down"></i>
                            <span class="AN-reaction-count">${stats.dislikes}</span>
                            <span class="AN-reaction-label">Dislike</span>
                        </button>
                        
                        <button class="AN-reaction-btn AN-comment-btn" 
                                data-item-id="${itemId}" data-item-type="${item.type}">
                            <i class="fas fa-comment"></i>
                            <span class="AN-reaction-count">${stats.comments}</span>
                            <span class="AN-reaction-label">Comment</span>
                        </button>
                        
                        <div class="AN-share-btn" data-item-id="${itemId}" data-item-type="${item.type}">
                            <button class="AN-reaction-btn">
                                <i class="fas fa-share-alt"></i>
                                <span class="AN-reaction-label">Share</span>
                            </button>
                            <div class="AN-share-dropdown">
                                <button class="AN-share-option" data-platform="facebook">
                                    <i class="fab fa-facebook"></i>
                                    <span>Facebook</span>
                                </button>
                                <button class="AN-share-option" data-platform="twitter">
                                    <i class="fab fa-twitter"></i>
                                    <span>Twitter</span>
                                </button>
                                <button class="AN-share-option" data-platform="linkedin">
                                    <i class="fab fa-linkedin"></i>
                                    <span>LinkedIn</span>
                                </button>
                                <button class="AN-share-option" data-platform="whatsapp">
                                    <i class="fab fa-whatsapp"></i>
                                    <span>WhatsApp</span>
                                </button>
                                <button class="AN-share-option" data-platform="copy">
                                    <i class="fas fa-link"></i>
                                    <span>Copy Link</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.updateMainContent(html);
        
        // Add styles for item detail
        this.addItemDetailStyles();
    },
    
    // Add item detail styles
    addItemDetailStyles: function() {
        const styleId = 'AN-item-detail-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .AN-item-detail {
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .AN-back-btn {
                    background: none;
                    border: none;
                    color: var(--AN-primary-color);
                    cursor: pointer;
                    padding: 10px 0;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 500;
                    transition: var(--AN-transition);
                }
                
                .AN-back-btn:hover {
                    color: var(--AN-secondary-color);
                }
                
                .AN-item-detail-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                
                .AN-item-title {
                    font-size: 32px;
                    margin-bottom: 10px;
                    color: var(--AN-text-color);
                    line-height: 1.2;
                }
                
                .AN-item-subtitle {
                    font-size: 20px;
                    color: var(--AN-text-color);
                    opacity: 0.8;
                    margin-bottom: 30px;
                    line-height: 1.4;
                }
                
                .AN-item-image {
                    margin-bottom: 30px;
                }
                
                .AN-item-image img {
                    width: 100%;
                    max-height: 400px;
                    object-fit: cover;
                    border-radius: var(--AN-radius);
                }
                
                .AN-item-content {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 40px;
                    color: var(--AN-text-color);
                }
                
                .AN-item-content br {
                    margin-bottom: 10px;
                    display: block;
                    content: "";
                }
                
                .AN-item-reactions {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid var(--AN-border-color);
                }
                
                @media (max-width: 768px) {
                    .AN-item-title {
                        font-size: 24px;
                    }
                    
                    .AN-item-subtitle {
                        font-size: 18px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    // Load template from file
    loadTemplate: function(templateName) {
        return new Promise((resolve, reject) => {
            // For now, return a placeholder
            // In a real implementation, this would load HTML files
            let html = '';
            
            switch (templateName) {
                case 'home':
                    html = `
                        <section class="AN-hero">
                            <div class="AN-hero-content">
                                <h2 class="AN-hero-title" data-i18n="An.index.heroTitle">Exploring the Universe</h2>
                                <p class="AN-hero-text" data-i18n="An.index.heroText">Latest discoveries, missions, and cosmic events from across the universe</p>
                                <a href="/AN_explore.html" class="AN-btn AN-btn-primary" data-i18n="An.index.exploreBtn">Explore News</a>
                            </div>
                            <div class="AN-hero-image">
                                <div class="AN-planet AN-planet-1"></div>
                                <div class="AN-planet AN-planet-2"></div>
                                <div class="AN-planet AN-planet-3"></div>
                                <div class="AN-stars"></div>
                            </div>
                        </section>
                        
                        <section class="AN-section">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                                <h2 class="AN-section-title" data-i18n="An.index.featuredNews">Featured News</h2>
                                <div class="AN-news-categories">
                                    <button class="AN-category-btn AN-category-active" data-category="all" data-i18n="An.index.allNews">All News</button>
                                    <button class="AN-category-btn" data-category="global" data-i18n="An.index.globalNews">Global</button>
                                    <button class="AN-category-btn" data-category="local" data-i18n="An.index.localNews">Tunisia</button>
                                </div>
                            </div>
                            <div class="AN-news-grid" id="AN-news-container">
                                <!-- News cards will be dynamically generated here -->
                            </div>
                        </section>
                        
                        <section class="AN-section">
                            <h2 class="AN-section-title" data-i18n="An.index.upcomingEvents">Upcoming Events</h2>
                            <div class="AN-events-list" id="AN-events-container">
                                <!-- Event items will be dynamically generated here -->
                            </div>
                        </section>
                    `;
                    break;
                    
                case 'news':
                    html = `
                        <section class="AN-section">
                            <div class="AN-page-header">
                                <h1 class="AN-page-title" data-i18n="An.index.news">News</h1>
                                <p class="AN-page-subtitle">Latest astronomy news from around the world and Tunisia</p>
                            </div>
                            <div class="AN-news-grid" id="AN-all-news-container">
                                <!-- All news cards will be dynamically generated here -->
                            </div>
                        </section>
                    `;
                    break;
                    
                case 'gallery':
                    html = `
                        <section class="AN-section">
                            <div class="AN-page-header">
                                <h1 class="AN-page-title" data-i18n="An.index.gallery">Gallery</h1>
                                <p class="AN-page-subtitle">Stunning images from space and astronomy</p>
                            </div>
                            <div class="AN-gallery-container" id="AN-gallery-container">
                                <!-- Gallery will be loaded here -->
                            </div>
                        </section>
                    `;
                    break;
                    
                case 'missions':
                    html = `
                        <section class="AN-section">
                            <div class="AN-page-header">
                                <h1 class="AN-page-title" data-i18n="An.index.missions">Space Missions</h1>
                                <p class="AN-page-subtitle">Current and upcoming space exploration missions</p>
                            </div>
                            <div class="AN-missions-container" id="AN-missions-container">
                                <!-- Missions will be loaded here -->
                            </div>
                        </section>
                    `;
                    break;
                    
                case 'explore':
                    html = `
                        <section class="AN-section">
                            <div class="AN-page-header">
                                <h1 class="AN-page-title" data-i18n="An.index.explore">Explore Astronomy</h1>
                                <p class="AN-page-subtitle">Learn about astronomy concepts and discoveries</p>
                            </div>
                            <div class="AN-explore-container" id="AN-explore-container">
                                <!-- Explore content will be loaded here -->
                            </div>
                        </section>
                    `;
                    break;
                    
                case 'about':
                    html = `
                        <section class="AN-section">
                            <div class="AN-page-header">
                                <h1 class="AN-page-title" data-i18n="An.index.about">About</h1>
                                <p class="AN-page-subtitle">Learn about Astronomy News and its developer</p>
                            </div>
                            <div class="AN-about-container" id="AN-about-container">
                                <!-- About content will be loaded here -->
                            </div>
                        </section>
                    `;
                    break;
            }
            
            resolve(html);
        });
    },
    
    // Update main content area
    updateMainContent: function(html) {
        const main = document.querySelector('.AN-main .AN-container');
        if (main) {
            main.innerHTML = html;
        } else {
            // Create main content if it doesn't exist
            const mainElement = document.querySelector('.AN-main');
            if (mainElement) {
                mainElement.innerHTML = `<div class="AN-container">${html}</div>`;
            }
        }
    },
    
    // Close all modals
    closeAllModals: function() {
        document.querySelectorAll('.AN-registration-modal, .AN-reaction-modal, .AN-event-modal').forEach(modal => {
            modal.classList.remove('AN-active');
        });
    },
    
    // Go back to previous page
    goBack: function() {
        window.history.back();
    },
    
    // Refresh current page
    refresh: function() {
        this.handleRoute();
    }
};

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AN_router.init();
});

// Export for modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AN_router;
}