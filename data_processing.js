// data_processing.js - Helper functions for data processing - STEP 2 ENHANCED

// Helper function to get data by type and category
function AN_getDataByType(type, category = 'all') {
    if (category === 'all') {
        return AN_data.filter(item => item.type === type);
    }
    return AN_data.filter(item => item.type === type && item.category === category);
}

// Helper function to get data by ID
function AN_getDataById(id) {
    return AN_data.find(item => item.id === id);
}

// Helper function to get interaction statistics for an item
function AN_getInteractionStats(itemId, itemType) {
    if (window.AN_app && window.AN_app.state) {
        return window.AN_app.getInteractionStats(itemId, itemType);
    }
    
    // Fallback to localStorage
    const savedStats = localStorage.getItem('AN_interaction_stats');
    if (savedStats) {
        try {
            const stats = JSON.parse(savedStats);
            const key = `${itemType}_${itemId}`;
            return stats[key] || { likes: 0, dislikes: 0, comments: 0, userReaction: null };
        } catch (e) {
            console.error('Error parsing interaction stats:', e);
        }
    }
    
    return { likes: 0, dislikes: 0, comments: 0, userReaction: null };
}

// Helper function to format date in Tunisian format (DD/MM/YYYY)
function AN_formatDate(dateString, language = 'en') {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
        return dateString;
    }
    
    // Different date formats for different languages
    if (language === 'ar') {
        // Arabic: Use Islamic calendar or Gregorian with Tunisian format
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } else if (language === 'fr') {
        // French: Use European format
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } else {
        // English: Use Tunisian format (DD/MM/YYYY)
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
}

// Function to get month name from date (updated for Tunisian context)
function AN_getMonthName(dateString, language = 'en') {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
        return '';
    }
    
    const month = date.getMonth();
    
    const monthNames = {
        en: ['January', 'February', 'March', 'April', 'May', 'June', 
             'July', 'August', 'September', 'October', 'November', 'December'],
        fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
             'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        ar: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 
             'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    };
    
    return monthNames[language] ? monthNames[language][month] : monthNames.en[month];
}

// Function to get day from date
function AN_getDay(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
        return '';
    }
    
    return date.getDate().toString().padStart(2, '0');
}

// Function to render news cards with interaction buttons
function AN_renderNews(language = 'en', category = 'all') {
    const container = document.getElementById('AN-news-container');
    if (!container) return;
    
    // Get news data
    const newsItems = AN_getDataByType('news', category);
    
    // Clear container
    container.innerHTML = '';
    
    if (newsItems.length === 0) {
        container.innerHTML = '<div class="AN-no-data">No news found for this category.</div>';
        return;
    }
    
    // Render each news item
    newsItems.forEach(item => {
        const stats = AN_getInteractionStats(item.id, 'news');
        
        const newsCard = document.createElement('div');
        newsCard.className = 'AN-news-card';
        newsCard.innerHTML = `
            <div class="AN-news-image">
                <div class="AN-image-placeholder" style="background-image: url('${item.image || 'assets2/images/news/default.jpg'}');"></div>
                <span class="AN-news-badge ${item.category === 'local' ? 'AN-local-badge' : 'AN-global-badge'}">
                    ${item.category === 'local' ? 'Tunisia' : 'Global'}
                </span>
            </div>
            <div class="AN-news-content">
                <h3 class="AN-news-title">${item[language]?.title || item.en.title}</h3>
                <p class="AN-news-excerpt">${(item[language]?.subtitle || item.en.subtitle).substring(0, 150)}...</p>
                <div class="AN-news-meta">
                    <span class="AN-news-date">${AN_formatDate(item.date, language)}</span>
                    <a href="#" class="AN-read-more" data-i18n="An.index.readMore" data-item-id="${item.id}">Read More</a>
                </div>
            </div>
            <div class="AN-reaction-buttons">
                <button class="AN-reaction-btn AN-like-btn ${stats.userReaction === 'like' ? 'active' : ''}" 
                        data-item-id="${item.id}" data-item-type="news">
                    <i class="fas fa-thumbs-up"></i>
                    <span class="AN-reaction-count">${stats.likes}</span>
                    <span class="AN-reaction-label">Like</span>
                </button>
                
                <button class="AN-reaction-btn AN-dislike-btn ${stats.userReaction === 'dislike' ? 'active' : ''}" 
                        data-item-id="${item.id}" data-item-type="news">
                    <i class="fas fa-thumbs-down"></i>
                    <span class="AN-reaction-count">${stats.dislikes}</span>
                    <span class="AN-reaction-label">Dislike</span>
                </button>
                
                <button class="AN-reaction-btn AN-comment-btn" 
                        data-item-id="${item.id}" data-item-type="news">
                    <i class="fas fa-comment"></i>
                    <span class="AN-reaction-count">${stats.comments}</span>
                    <span class="AN-reaction-label">Comment</span>
                </button>
                
                <div class="AN-share-btn" data-item-id="${item.id}" data-item-type="news">
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
        `;
        
        container.appendChild(newsCard);
        
        // Add click event for read more
        const readMoreLink = newsCard.querySelector('.AN-read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.AN_app && window.AN_app.navigateTo) {
                    window.AN_app.navigateTo(`/?id=${item.id}`);
                } else {
                    window.location.href = `/?id=${item.id}`;
                }
            });
        }
    });
}

// Function to render events with interaction buttons
function AN_renderEvents(language = 'en') {
    const container = document.getElementById('AN-events-container');
    if (!container) return;
    
    // Get event data
    const eventItems = AN_getDataByType('event');
    
    // Sort by date (closest first)
    eventItems.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Clear container
    container.innerHTML = '';
    
    if (eventItems.length === 0) {
        container.innerHTML = '<div class="AN-no-data">No upcoming events found.</div>';
        return;
    }
    
    // Render each event item
    eventItems.forEach(item => {
        const stats = AN_getInteractionStats(item.id, 'event');
        
        const eventCard = document.createElement('div');
        eventCard.className = 'AN-event-item';
        eventCard.innerHTML = `
            <div class="AN-event-date">
                <span class="AN-event-day">${AN_getDay(item.date)}</span>
                <span class="AN-event-month">${AN_getMonthName(item.date, language)}</span>
            </div>
            <div class="AN-event-details">
                <h3 class="AN-event-title">${item[language]?.title || item.en.title}</h3>
                <p class="AN-event-description">${(item[language]?.subtitle || item.en.subtitle).substring(0, 200)}...</p>
                <div class="AN-reaction-buttons">
                    <button class="AN-reaction-btn AN-like-btn ${stats.userReaction === 'like' ? 'active' : ''}" 
                            data-item-id="${item.id}" data-item-type="event">
                        <i class="fas fa-thumbs-up"></i>
                        <span class="AN-reaction-count">${stats.likes}</span>
                        <span class="AN-reaction-label">Like</span>
                    </button>
                    
                    <button class="AN-reaction-btn AN-dislike-btn ${stats.userReaction === 'dislike' ? 'active' : ''}" 
                            data-item-id="${item.id}" data-item-type="event">
                        <i class="fas fa-thumbs-down"></i>
                        <span class="AN-reaction-count">${stats.dislikes}</span>
                        <span class="AN-reaction-label">Dislike</span>
                    </button>
                    
                    <button class="AN-reaction-btn AN-comment-btn" 
                            data-item-id="${item.id}" data-item-type="event">
                        <i class="fas fa-comment"></i>
                        <span class="AN-reaction-count">${stats.comments}</span>
                        <span class="AN-reaction-label">Comment</span>
                    </button>
                    
                    <div class="AN-share-btn" data-item-id="${item.id}" data-item-type="event">
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
        `;
        
        container.appendChild(eventCard);
        
        // Add click event for event details
        eventCard.addEventListener('click', (e) => {
            if (!e.target.closest('.AN-reaction-buttons')) {
                if (window.AN_app && window.AN_app.navigateTo) {
                    window.AN_app.navigateTo(`/?id=${item.id}`);
                } else {
                    window.location.href = `/?id=${item.id}`;
                }
            }
        });
    });
}

// Function to render all news (for news page)
function AN_renderAllNews(language = 'en') {
    const container = document.getElementById('AN-all-news-container');
    if (!container) return;
    
    // Get all news data
    const newsItems = AN_getDataByType('news');
    
    // Sort by date (newest first)
    newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Clear container
    container.innerHTML = '';
    
    if (newsItems.length === 0) {
        container.innerHTML = '<div class="AN-no-data">No news found.</div>';
        return;
    }
    
    // Render each news item
    newsItems.forEach(item => {
        const stats = AN_getInteractionStats(item.id, 'news');
        
        const newsCard = document.createElement('div');
        newsCard.className = 'AN-news-card';
        newsCard.innerHTML = `
            <div class="AN-news-image">
                <div class="AN-image-placeholder" style="background-image: url('${item.image || 'assets2/images/news/default.jpg'}');"></div>
                <span class="AN-news-badge ${item.category === 'local' ? 'AN-local-badge' : 'AN-global-badge'}">
                    ${item.category === 'local' ? 'Tunisia' : 'Global'}
                </span>
            </div>
            <div class="AN-news-content">
                <h3 class="AN-news-title">${item[language]?.title || item.en.title}</h3>
                <p class="AN-news-excerpt">${(item[language]?.subtitle || item.en.subtitle).substring(0, 150)}...</p>
                <div class="AN-news-meta">
                    <span class="AN-news-date">${AN_formatDate(item.date, language)}</span>
                    <a href="#" class="AN-read-more" data-i18n="An.index.readMore" data-item-id="${item.id}">Read More</a>
                </div>
            </div>
            <div class="AN-reaction-buttons">
                <button class="AN-reaction-btn AN-like-btn ${stats.userReaction === 'like' ? 'active' : ''}" 
                        data-item-id="${item.id}" data-item-type="news">
                    <i class="fas fa-thumbs-up"></i>
                    <span class="AN-reaction-count">${stats.likes}</span>
                    <span class="AN-reaction-label">Like</span>
                </button>
                
                <button class="AN-reaction-btn AN-dislike-btn ${stats.userReaction === 'dislike' ? 'active' : ''}" 
                        data-item-id="${item.id}" data-item-type="news">
                    <i class="fas fa-thumbs-down"></i>
                    <span class="AN-reaction-count">${stats.dislikes}</span>
                    <span class="AN-reaction-label">Dislike</span>
                </button>
                
                <button class="AN-reaction-btn AN-comment-btn" 
                        data-item-id="${item.id}" data-item-type="news">
                    <i class="fas fa-comment"></i>
                    <span class="AN-reaction-count">${stats.comments}</span>
                    <span class="AN-reaction-label">Comment</span>
                </button>
                
                <div class="AN-share-btn" data-item-id="${item.id}" data-item-type="news">
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
        `;
        
        container.appendChild(newsCard);
        
        // Add click event for read more
        const readMoreLink = newsCard.querySelector('.AN-read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.AN_app && window.AN_app.navigateTo) {
                    window.AN_app.navigateTo(`/AN_news.html?id=${item.id}`);
                } else {
                    window.location.href = `AN_news.html?id=${item.id}`;
                }
            });
        }
    });
}

// Function to update interaction counts for all items
function AN_updateAllInteractionCounts() {
    // This would be called periodically to update counts from server
    if (window.AN_app && window.AN_app.loadInteractionStats) {
        window.AN_app.loadInteractionStats();
    }
}

// Initialize category buttons
function AN_initCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.AN-category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('AN-category-active'));
            
            // Add active class to clicked button
            button.classList.add('AN-category-active');
            
            // Get category
            const category = button.dataset.category;
            const language = window.AN_app?.state.currentLanguage || 'en';
            
            // Render news for this category
            AN_renderNews(language, category);
        });
    });
}

// Export for modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AN_getDataByType,
        AN_getDataById,
        AN_getInteractionStats,
        AN_formatDate,
        AN_getMonthName,
        AN_getDay,
        AN_renderNews,
        AN_renderEvents,
        AN_renderAllNews,
        AN_updateAllInteractionCounts,
        AN_initCategoryButtons
    };
}