// app.js - Main application logic for Astronomy News
const AN_app = {
    // Configuration
    config: {
        supabaseUrl: 'https://cmicjfgettavzilduqgq.supabase.co',
        supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaWNqZmdldHRhdnppbGR1cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTAxMTIsImV4cCI6MjA4MTkyNjExMn0.7eGpPAfDPKGIhYRR17yCxxMi1pRkKSTf7qxICZGcw0c',
        apiBase: '/api',
        version: '1.0.0'
    },
    
    // State
    state: {
        user: null,
        currentLanguage: 'en',
        currentTheme: 'light',
        notifications: [],
        offlineQueue: [],
        isOnline: navigator.onLine
    },
    
    // Initialize app
    initialize: function() {
        console.log('Initializing Astronomy News App...');
        
        // Load user state
        this.loadUserState();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Check for service worker updates
        this.checkForUpdates();
        
        // Initialize offline sync
        this.initializeOfflineSync();
        
        // Load initial data
        this.loadInitialData();
        
        console.log('App initialized successfully');
    },
    
    // Load user state from localStorage
    loadUserState: function() {
        const savedUser = localStorage.getItem('AN_user');
        const savedLanguage = localStorage.getItem('AN-language-preference') || 'en';
        const savedTheme = localStorage.getItem('AN-theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        if (savedUser) {
            try {
                this.state.user = JSON.parse(savedUser);
            } catch (e) {
                console.error('Error parsing saved user:', e);
                localStorage.removeItem('AN_user');
            }
        }
        
        this.state.currentLanguage = savedLanguage;
        this.state.currentTheme = savedTheme;
        
        // Update UI based on state
        this.updateUIState();
    },
    
    // Set up event listeners
    setupEventListeners: function() {
        // Online/offline detection
        window.addEventListener('online', () => {
            this.state.isOnline = true;
            this.syncOfflineQueue();
        });
        
        window.addEventListener('offline', () => {
            this.state.isOnline = false;
            this.showOfflineMessage();
        });
        
        // Before unload - save state
        window.addEventListener('beforeunload', () => {
            this.saveUserState();
        });
        
        // Visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.state.isOnline) {
                this.checkForNewContent();
            }
        });
    },
    
    // Update UI based on app state
    updateUIState: function() {
        // Update language
        if (typeof AN_applyTranslations === 'function') {
            AN_applyTranslations(this.state.currentLanguage);
        }
        
        // Update theme
        document.body.classList.toggle('AN-dark-mode', this.state.currentTheme === 'dark');
        const themeSwitch = document.getElementById('AN-theme-switch');
        if (themeSwitch) {
            themeSwitch.checked = this.state.currentTheme === 'dark';
        }
        
        // Update user UI
        this.updateUserUI();
    },
    
    // Update user-related UI
    updateUserUI: function() {
        const loginBtn = document.getElementById('AN-login-btn');
        const userMenu = document.getElementById('AN-user-menu');
        
        if (this.state.user) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'flex';
                const userName = userMenu.querySelector('.AN-user-name');
                if (userName) {
                    userName.textContent = this.state.user.name || this.state.user.user_name;
                }
            }
        } else {
            // User is not logged in
            if (loginBtn) loginBtn.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
        }
    },
    
    // Authentication methods
    login: async function(email, password) {
        try {
            // In a real app, this would call Supabase Auth
            // For now, we'll simulate authentication
            
            const response = await fetch(`${this.config.supabaseUrl}/auth/v1/token?grant_type=password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.config.supabaseKey
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                throw new Error('Login failed');
            }
            
            const data = await response.json();
            
            // Get user profile
            const userResponse = await fetch(`${this.config.supabaseUrl}/rest/v1/users?email=eq.${email}`, {
                headers: {
                    'apikey': this.config.supabaseKey,
                    'Authorization': `Bearer ${data.access_token}`
                }
            });
            
            const userData = await userResponse.json();
            
            if (userData && userData.length > 0) {
                this.state.user = {
                    ...userData[0],
                    token: data.access_token
                };
                
                this.saveUserState();
                this.updateUserUI();
                this.showMessage('An.message.loginSuccess');
                
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('An.message.error');
            return false;
        }
    },
    
    register: async function(userData) {
        try {
            // First, create auth user
            const authResponse = await fetch(`${this.config.supabaseUrl}/auth/v1/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.config.supabaseKey
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password
                })
            });
            
            if (!authResponse.ok) {
                throw new Error('Registration failed');
            }
            
            // Then create user profile
            const profileResponse = await fetch(`${this.config.supabaseUrl}/rest/v1/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.config.supabaseKey,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    name: userData.name,
                    user_name: userData.username,
                    email: userData.email,
                    preferences: {
                        language: this.state.currentLanguage,
                        theme: this.state.currentTheme,
                        notifications: true,
                        email_updates: false
                    }
                })
            });
            
            const profileData = await profileResponse.json();
            
            if (profileData && profileData.length > 0) {
                this.showMessage('An.message.registerSuccess');
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Registration error:', error);
            this.showMessage('An.message.error');
            return false;
        }
    },
    
    logout: function() {
        this.state.user = null;
        localStorage.removeItem('AN_user');
        this.updateUserUI();
        this.showMessage('An.message.logoutSuccess');
    },
    
    // Reaction methods
    addReaction: async function(itemId, itemType, reactionType) {
        if (!this.state.user) {
            this.showLoginPrompt();
            return false;
        }
        
        const reaction = {
            user_id: this.state.user.user_id,
            item_id: itemId,
            item_type: itemType,
            reaction_type: reactionType,
            created_at: new Date().toISOString()
        };
        
        if (!this.state.isOnline) {
            // Queue for offline sync
            this.addToOfflineQueue('reaction', reaction);
            this.showMessage('An.message.offline');
            return true;
        }
        
        try {
            const response = await fetch(`${this.config.supabaseUrl}/rest/v1/reactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.config.supabaseKey,
                    'Authorization': `Bearer ${this.state.user?.token || this.config.supabaseKey}`
                },
                body: JSON.stringify(reaction)
            });
            
            if (response.ok) {
                this.showMessage('An.message.reactionAdded');
                this.updateReactionUI(itemId, itemType, reactionType);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Reaction error:', error);
            this.addToOfflineQueue('reaction', reaction);
            return false;
        }
    },
    
    // Comment methods
    addComment: async function(itemId, itemType, content) {
        if (!this.state.user) {
            this.showLoginPrompt();
            return false;
        }
        
        const comment = {
            user_id: this.state.user.user_id,
            item_id: itemId,
            item_type: itemType,
            content: content,
            created_at: new Date().toISOString()
        };
        
        if (!this.state.isOnline) {
            this.addToOfflineQueue('comment', comment);
            this.showMessage('An.message.offline');
            return true;
        }
        
        try {
            const response = await fetch(`${this.config.supabaseUrl}/rest/v1/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.config.supabaseKey,
                    'Authorization': `Bearer ${this.state.user?.token || this.config.supabaseKey}`
                },
                body: JSON.stringify(comment)
            });
            
            if (response.ok) {
                this.showMessage('An.message.commentAdded');
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Comment error:', error);
            this.addToOfflineQueue('comment', comment);
            return false;
        }
    },
    
    // Share methods
    shareItem: function(itemId, itemType, platform) {
        const url = `${window.location.origin}/${itemType === 'news' ? 'AN_news.html' : 'index.html'}?id=${itemId}`;
        const title = document.title;
        
        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    this.showMessage('An.message.shareSuccess');
                });
                break;
        }
    },
    
    // UI update methods
    updateReactionUI: function(itemId, itemType, reactionType) {
        // Find the reaction buttons for this item
        const buttons = document.querySelectorAll(`[data-item-id="${itemId}"][data-item-type="${itemType}"]`);
        
        buttons.forEach(button => {
            if (button.dataset.reactionType === reactionType) {
                button.classList.add('active');
                
                // Update count
                const countSpan = button.querySelector('.AN-reaction-count');
                if (countSpan) {
                    let count = parseInt(countSpan.textContent) || 0;
                    countSpan.textContent = count + 1;
                }
            } else {
                button.classList.remove('active');
            }
        });
    },
    
    // Offline handling
    initializeOfflineSync: function() {
        // Load offline queue from localStorage
        const savedQueue = localStorage.getItem('AN_offline_queue');
        if (savedQueue) {
            try {
                this.state.offlineQueue = JSON.parse(savedQueue);
            } catch (e) {
                console.error('Error parsing offline queue:', e);
                localStorage.removeItem('AN_offline_queue');
            }
        }
        
        // Set up periodic sync
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            navigator.serviceWorker.ready.then(registration => {
                registration.sync.register('sync-reactions');
                registration.sync.register('sync-comments');
            });
        }
    },
    
    addToOfflineQueue: function(type, data) {
        this.state.offlineQueue.push({ type, data, timestamp: Date.now() });
        localStorage.setItem('AN_offline_queue', JSON.stringify(this.state.offlineQueue));
        
        // Trigger background sync if available
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            navigator.serviceWorker.ready.then(registration => {
                if (type === 'reaction') {
                    registration.sync.register('sync-reactions');
                } else if (type === 'comment') {
                    registration.sync.register('sync-comments');
                }
            });
        }
    },
    
    syncOfflineQueue: async function() {
        if (this.state.offlineQueue.length === 0 || !this.state.isOnline) {
            return;
        }
        
        const queue = [...this.state.offlineQueue];
        this.state.offlineQueue = [];
        
        for (const item of queue) {
            try {
                if (item.type === 'reaction') {
                    await this.addReaction(
                        item.data.item_id,
                        item.data.item_type,
                        item.data.reaction_type
                    );
                } else if (item.type === 'comment') {
                    await this.addComment(
                        item.data.item_id,
                        item.data.item_type,
                        item.data.content
                    );
                }
            } catch (error) {
                console.error('Failed to sync item:', error);
                this.state.offlineQueue.push(item);
            }
        }
        
        localStorage.setItem('AN_offline_queue', JSON.stringify(this.state.offlineQueue));
    },
    
    // Utility methods
    showMessage: function(messageKey) {
        const message = AN_translations[this.state.currentLanguage][messageKey] || messageKey;
        
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'AN-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--AN-primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: var(--AN-radius);
            box-shadow: var(--AN-shadow);
            z-index: 9999;
            animation: AN-toast-slide-in 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'AN-toast-slide-out 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    },
    
    showOfflineMessage: function() {
        this.showMessage('An.message.offline');
    },
    
    showLoginPrompt: function() {
        // Show login modal or redirect to login
        const loginModal = document.getElementById('AN-login-modal');
        if (loginModal) {
            loginModal.classList.add('AN-active');
        } else {
            this.showMessage('An.auth.loginRequired');
        }
    },
    
    saveUserState: function() {
        if (this.state.user) {
            localStorage.setItem('AN_user', JSON.stringify(this.state.user));
        }
        localStorage.setItem('AN-language-preference', this.state.currentLanguage);
        localStorage.setItem('AN-theme', this.state.currentTheme);
    },
    
    checkForUpdates: function() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then(registration => {
                if (registration) {
                    registration.update();
                }
            });
        }
    },
    
    checkForNewContent: function() {
        // Check for new news/events
        // This would be implemented with real API calls
        console.log('Checking for new content...');
    },
    
    loadInitialData: function() {
        // Load initial news and events
        if (typeof AN_renderNews === 'function') {
            AN_renderNews(this.state.currentLanguage, 'all');
        }
        
        if (typeof AN_renderEvents === 'function') {
            AN_renderEvents(this.state.currentLanguage);
        }
        
        if (typeof AN_renderNotifications === 'function') {
            AN_renderNotifications(this.state.currentLanguage);
        }
    }
};

// Initialize app when DOM is loaded
function AN_initializeApp() {
    AN_app.initialize();
    
    // Set up reaction button handlers
    document.addEventListener('click', function(e) {
        // Like button
        if (e.target.closest('.AN-like-btn')) {
            const button = e.target.closest('.AN-like-btn');
            const itemId = button.dataset.itemId;
            const itemType = button.dataset.itemType;
            AN_app.addReaction(itemId, itemType, 'like');
        }
        
        // Dislike button
        if (e.target.closest('.AN-dislike-btn')) {
            const button = e.target.closest('.AN-dislike-btn');
            const itemId = button.dataset.itemId;
            const itemType = button.dataset.itemType;
            AN_app.addReaction(itemId, itemType, 'dislike');
        }
        
        // Comment button
        if (e.target.closest('.AN-comment-btn')) {
            const button = e.target.closest('.AN-comment-btn');
            const itemId = button.dataset.itemId;
            const itemType = button.dataset.itemType;
            AN_app.openCommentModal(itemId, itemType);
        }
        
        // Share button
        if (e.target.closest('.AN-share-option')) {
            const option = e.target.closest('.AN-share-option');
            const platform = option.dataset.platform;
            const itemId = option.closest('.AN-share-btn').dataset.itemId;
            const itemType = option.closest('.AN-share-btn').dataset.itemType;
            AN_app.shareItem(itemId, itemType, platform);
        }
    });
}

// Add toast animation styles
const toastStyles = `
@keyframes AN-toast-slide-in {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes AN-toast-slide-out {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Add styles to document
if (document.head) {
    const style = document.createElement('style');
    style.textContent = toastStyles;
    document.head.appendChild(style);
}

// Export for modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AN_app, AN_initializeApp };
}