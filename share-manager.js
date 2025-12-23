// share-manager.js - Social sharing functionality for Astronomy News

const AN_shareManager = {
    // Configuration
    config: {
        appName: 'Astronomy News',
        appUrl: window.location.origin,
        twitterHandle: '@AstronomyNews',
        hashtags: ['Astronomy', 'Space', 'Science']
    },
    
    // Initialize share manager
    init: function() {
        console.log('Initializing share manager...');
        
        // Add meta tags for social sharing
        this.addSocialMetaTags();
        
        // Set up Web Share API if available
        this.setupWebShareAPI();
        
        // Initialize share buttons
        this.initShareButtons();
    },
    
    // Add social meta tags to document head
    addSocialMetaTags: function() {
        const metaTags = [
            // Open Graph tags for Facebook
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: this.config.appName },
            { property: 'og:url', content: window.location.href },
            
            // Twitter Card tags
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: this.config.twitterHandle },
            { name: 'twitter:creator', content: this.config.twitterHandle },
            
            // Additional tags
            { name: 'description', content: 'Latest astronomy news, space missions, and cosmic discoveries from around the world and Tunisia.' }
        ];
        
        metaTags.forEach(tag => {
            if (!document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`)) {
                const meta = document.createElement('meta');
                if (tag.property) {
                    meta.setAttribute('property', tag.property);
                } else {
                    meta.setAttribute('name', tag.name);
                }
                meta.content = tag.content;
                document.head.appendChild(meta);
            }
        });
    },
    
    // Update social meta tags for specific content
    updateSocialMetaTags: function(data) {
        const tags = {
            'og:title': data.title || document.title,
            'twitter:title': data.title || document.title,
            'og:description': data.description || 'Latest astronomy news and discoveries',
            'twitter:description': data.description || 'Latest astronomy news and discoveries',
            'og:image': data.image || `${this.config.appUrl}/assets/icons/icon-512x512.png`,
            'twitter:image': data.image || `${this.config.appUrl}/assets/icons/icon-512x512.png`,
            'og:url': data.url || window.location.href
        };
        
        Object.entries(tags).forEach(([key, value]) => {
            let meta = document.querySelector(`meta[property="${key}"]`) || 
                      document.querySelector(`meta[name="${key}"]`);
            
            if (!meta) {
                meta = document.createElement('meta');
                if (key.startsWith('og:')) {
                    meta.setAttribute('property', key);
                } else {
                    meta.setAttribute('name', key);
                }
                document.head.appendChild(meta);
            }
            
            meta.content = value;
        });
    },
    
    // Setup Web Share API
    setupWebShareAPI: function() {
        if (navigator.share) {
            // Add Web Share API button to share dropdowns
            document.querySelectorAll('.AN-share-dropdown').forEach(dropdown => {
                const webShareBtn = document.createElement('button');
                webShareBtn.className = 'AN-share-option';
                webShareBtn.innerHTML = '<i class="fas fa-share-alt"></i> <span>Share via...</span>';
                webShareBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.shareViaWeb();
                });
                dropdown.appendChild(webShareBtn);
            });
        }
    },
    
    // Initialize share buttons
    initShareButtons: function() {
        // Delegate share button clicks
        document.addEventListener('click', (e) => {
            const shareOption = e.target.closest('.AN-share-option');
            if (shareOption) {
                const platform = shareOption.dataset.platform;
                const shareBtn = shareOption.closest('.AN-share-btn');
                
                if (shareBtn) {
                    const itemId = shareBtn.dataset.itemId;
                    const itemType = shareBtn.dataset.itemType;
                    
                    if (platform === 'web' && navigator.share) {
                        this.shareViaWeb(itemId, itemType);
                    } else if (platform) {
                        this.shareToPlatform(platform, itemId, itemType);
                    }
                    
                    // Close dropdown
                    const dropdown = shareBtn.querySelector('.AN-share-dropdown');
                    if (dropdown) {
                        dropdown.style.display = 'none';
                    }
                }
            }
        });
    },
    
    // Share via Web Share API
    shareViaWeb: function(itemId, itemType) {
        let shareData = {
            title: document.title,
            text: 'Check out this astronomy news!',
            url: window.location.href
        };
        
        // If sharing specific item, get item data
        if (itemId && itemType) {
            const item = AN_getDataById(itemId);
            if (item) {
                const language = window.AN_app?.state.currentLanguage || 'en';
                shareData = {
                    title: item[language]?.title || item.en.title,
                    text: item[language]?.subtitle || item.en.subtitle,
                    url: `${this.config.appUrl}${window.location.pathname}?id=${itemId}`
                };
            }
        }
        
        navigator.share(shareData)
            .then(() => console.log('Successfully shared'))
            .catch(error => console.log('Error sharing:', error));
    },
    
    // Share to specific platform
    shareToPlatform: function(platform, itemId, itemType) {
        const item = itemId ? AN_getDataById(itemId) : null;
        const language = window.AN_app?.state.currentLanguage || 'en';
        
        let url, title, text, image;
        
        if (item) {
            title = item[language]?.title || item.en.title;
            text = item[language]?.subtitle || item.en.subtitle;
            image = item.image ? `${this.config.appUrl}/${item.image}` : '';
            url = `${this.config.appUrl}${window.location.pathname}?id=${itemId}`;
        } else {
            title = document.title;
            text = 'Latest astronomy news and discoveries';
            image = `${this.config.appUrl}/assets/icons/icon-512x512.png`;
            url = window.location.href;
        }
        
        // Encode parameters
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        const encodedText = encodeURIComponent(text);
        const encodedHashtags = encodeURIComponent(this.config.hashtags.join(','));
        
        let shareUrl;
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
                break;
                
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=${this.config.twitterHandle.replace('@', '')}&hashtags=${encodedHashtags}`;
                break;
                
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`;
                break;
                
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
                break;
                
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
                break;
                
            case 'email':
                shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`;
                break;
                
            case 'copy':
                this.copyToClipboard(url);
                return; // Don't open new window for copy
                
            default:
                console.warn('Unknown platform:', platform);
                return;
        }
        
        // Open share window
        this.openShareWindow(shareUrl);
    },
    
    // Open share window
    openShareWindow: function(url) {
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        window.open(url, 'share', `
            width=${width},
            height=${height},
            left=${left},
            top=${top},
            toolbar=0,
            status=0,
            location=0,
            menubar=0,
            scrollbars=1,
            resizable=1
        `);
    },
    
    // Copy to clipboard
    copyToClipboard: function(text) {
        // Try using modern clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    this.showCopySuccess();
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                    this.fallbackCopy(text);
                });
        } else {
            // Fallback for older browsers
            this.fallbackCopy(text);
        }
    },
    
    // Fallback copy method
    fallbackCopy: function(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (err) {
            console.error('Fallback copy failed:', err);
            this.showCopyError();
        }
        
        document.body.removeChild(textArea);
    },
    
    // Show copy success message
    showCopySuccess: function() {
        if (window.AN_app && window.AN_app.showMessage) {
            window.AN_app.showMessage('An.message.shareSuccess', 'success');
        } else {
            alert('Link copied to clipboard!');
        }
    },
    
    // Show copy error message
    showCopyError: function() {
        if (window.AN_app && window.AN_app.showMessage) {
            window.AN_app.showMessage('An.message.error', 'error');
        } else {
            alert('Failed to copy link. Please try again.');
        }
    },
    
    // Generate shareable URL for item
    generateShareUrl: function(itemId, itemType) {
        const baseUrl = window.location.origin;
        const path = itemType === 'news' ? '/AN_news.html' : '/index.html';
        return `${baseUrl}${path}?id=${itemId}`;
    },
    
    // Generate shareable image URL
    generateImageUrl: function(imagePath) {
        if (!imagePath) return `${this.config.appUrl}/assets/icons/icon-512x512.png`;
        
        if (imagePath.startsWith('http')) {
            return imagePath;
        } else if (imagePath.startsWith('/')) {
            return `${this.config.appUrl}${imagePath}`;
        } else {
            return `${this.config.appUrl}/${imagePath}`;
        }
    },
    
    // Get share data for item
    getShareData: function(itemId, itemType) {
        const item = AN_getDataById(itemId);
        if (!item) return null;
        
        const language = window.AN_app?.state.currentLanguage || 'en';
        
        return {
            title: item[language]?.title || item.en.title,
            description: item[language]?.subtitle || item.en.subtitle,
            image: this.generateImageUrl(item.image),
            url: this.generateShareUrl(itemId, itemType),
            type: itemType,
            category: item.category
        };
    },
    
    // Create share buttons for an item
    createShareButtons: function(itemId, itemType) {
        const shareData = this.getShareData(itemId, itemType);
        if (!shareData) return '';
        
        return `
            <div class="AN-share-buttons">
                <button class="AN-share-btn AN-share-facebook" data-platform="facebook" title="Share on Facebook">
                    <i class="fab fa-facebook-f"></i>
                </button>
                <button class="AN-share-btn AN-share-twitter" data-platform="twitter" title="Share on Twitter">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="AN-share-btn AN-share-linkedin" data-platform="linkedin" title="Share on LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                </button>
                <button class="AN-share-btn AN-share-whatsapp" data-platform="whatsapp" title="Share on WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </button>
                <button class="AN-share-btn AN-share-copy" data-platform="copy" title="Copy link">
                    <i class="fas fa-link"></i>
                </button>
                ${navigator.share ? `
                    <button class="AN-share-btn AN-share-web" data-platform="web" title="Share via...">
                        <i class="fas fa-share-alt"></i>
                    </button>
                ` : ''}
            </div>
        `;
    },
    
    // Track share event
    trackShare: function(platform, itemId, itemType) {
        // In a real app, this would send analytics data
        console.log(`Shared ${itemType} ${itemId} on ${platform}`);
        
        // Store in localStorage for offline tracking
        const shares = JSON.parse(localStorage.getItem('AN_share_events') || '[]');
        shares.push({
            platform,
            itemId,
            itemType,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('AN_share_events', JSON.stringify(shares.slice(-100))); // Keep last 100
    }
};

// Initialize share manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AN_shareManager.init();
});

// Export for modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AN_shareManager;
}