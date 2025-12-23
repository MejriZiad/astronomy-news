// app.js - Main application logic for Astronomy News - STEP 2 ENHANCED
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
        isOnline: navigator.onLine,
        currentPage: 'home',
        interactionStats: {} // Stores like/dislike/comment counts
    },
    
    // Initialize app
    initialize: async function() {
    console.log('Initializing Astronomy News App...');
    
    // TEST: Add a test user for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        localStorage.setItem('AN_test_mode', 'true');
        
        // Create a test user if none exists
        if (!localStorage.getItem('AN_user')) {
            const testUser = {
                user_id: 'test-user-123',
                name: 'Test User',
                user_name: 'testuser',
                email: 'test@example.com',
                token: 'test-token-123',
                preferences: {
                    language: 'en',
                    theme: 'light',
                    notifications: true,
                    email_updates: false,
                    default_category: 'all'
                }
            };
            localStorage.setItem('AN_user', JSON.stringify(testUser));
            console.log('Test user created for development');
        }
    }
        
        // Load user state
        await this.loadUserState();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Check for service worker updates
        this.checkForUpdates();
        
        // Initialize offline sync
        this.initializeOfflineSync();
        
        // Initialize router
        this.initializeRouter();
        
        // Load interaction statistics
        await this.loadInteractionStats();
        
        // Load initial data
        this.loadInitialData();
        
        console.log('App initialized successfully');
    },
    
    // Load user state from localStorage
    loadUserState: async function() {
        const savedUser = localStorage.getItem('AN_user');
        const savedLanguage = localStorage.getItem('AN-language-preference') || 'en';
        const savedTheme = localStorage.getItem('AN-theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        if (savedUser) {
            try {
                this.state.user = JSON.parse(savedUser);
                // Validate token if exists
                await this.validateUserToken();
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
    
    // Validate user token with Supabase
    validateUserToken: async function() {
        if (!this.state.user?.token) return false;
        
        try {
            const response = await fetch(`${this.config.supabaseUrl}/auth/v1/user`, {
                headers: {
                    'Authorization': `Bearer ${this.state.user.token}`,
                    'apikey': this.config.supabaseKey
                }
            });
            
            if (!response.ok) {
                // Token invalid, clear user
                this.state.user = null;
                localStorage.removeItem('AN_user');
                return false;
            }
            
            const userData = await response.json();
            // Update user data if needed
            this.state.user = { ...this.state.user, ...userData };
            localStorage.setItem('AN_user', JSON.stringify(this.state.user));
            return true;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    },
    
    // Set up event listeners
    setupEventListeners: function() {
        // Online/offline detection
        window.addEventListener('online', () => {
            this.state.isOnline = true;
            this.showMessage('An.message.online');
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
        
        // Language change
        const languageSelect = document.getElementById('AN-language-select');
        if (languageSelect) {
            languageSelect.value = this.state.currentLanguage;
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
        
        // Theme toggle
        const themeSwitch = document.getElementById('AN-theme-switch');
        if (themeSwitch) {
            themeSwitch.checked = this.state.currentTheme === 'dark';
            themeSwitch.addEventListener('change', (e) => {
                this.setTheme(e.target.checked ? 'dark' : 'light');
            });
        }
        
        // Register modal handlers
        this.setupRegistrationModals();
        
        // Reaction button handlers
        this.setupReactionHandlers();
        
        // Share button handlers
        this.setupShareHandlers();
    },
    
    // Setup registration modals
    setupRegistrationModals: function() {
        // Login button
        const loginBtn = document.getElementById('AN-login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showRegistrationModal('login'));
        }
        
        // Register button
        const registerBtn = document.getElementById('AN-register-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => this.showRegistrationModal('register'));
        }
        
        // Logout button
        const logoutBtn = document.getElementById('AN-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
        
        // Close modal buttons
        const closeButtons = document.querySelectorAll('.AN-registration-modal-close, .AN-reaction-modal-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.AN-registration-modal, .AN-reaction-modal').forEach(modal => {
                    modal.classList.remove('AN-active');
                });
            });
        });
        
        // Modal background click
        const modals = document.querySelectorAll('.AN-registration-modal, .AN-reaction-modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('AN-active');
                }
            });
        });
        
        // Tab switching
        const tabs = document.querySelectorAll('.AN-registration-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const formType = tab.dataset.form;
                this.switchRegistrationForm(formType);
            });
        });
        
        // Form submission
        const loginForm = document.getElementById('AN-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        const registerForm = document.getElementById('AN-register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegistration();
            });
        }
    },
    
    // Setup reaction handlers
    setupReactionHandlers: function() {
        document.addEventListener('click', async (e) => {
            // Like button
            if (e.target.closest('.AN-like-btn')) {
                const button = e.target.closest('.AN-like-btn');
                const itemId = button.dataset.itemId;
                const itemType = button.dataset.itemType;
                await this.addReaction(itemId, itemType, 'like');
            }
            
            // Dislike button
            if (e.target.closest('.AN-dislike-btn')) {
                const button = e.target.closest('.AN-dislike-btn');
                const itemId = button.dataset.itemId;
                const itemType = button.dataset.itemType;
                await this.addReaction(itemId, itemType, 'dislike');
            }
            
            // Comment button
            if (e.target.closest('.AN-comment-btn')) {
                const button = e.target.closest('.AN-comment-btn');
                const itemId = button.dataset.itemId;
                const itemType = button.dataset.itemType;
                await this.openCommentModal(itemId, itemType);
            }
        });
        
        // Comment submission
        const commentSubmit = document.getElementById('AN-submit-comment');
        if (commentSubmit) {
            commentSubmit.addEventListener('click', async () => {
                await this.submitComment();
            });
        }
    },
    
    // Setup share handlers
    setupShareHandlers: function() {
        document.addEventListener('click', (e) => {
            // Share button
            if (e.target.closest('.AN-share-btn')) {
                const button = e.target.closest('.AN-share-btn');
                const dropdown = button.querySelector('.AN-share-dropdown');
                if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            }
            
            // Share options
            if (e.target.closest('.AN-share-option')) {
                const option = e.target.closest('.AN-share-option');
                const platform = option.dataset.platform;
                const itemId = option.closest('.AN-share-btn').dataset.itemId;
                const itemType = option.closest('.AN-share-btn').dataset.itemType;
                this.shareItem(itemId, itemType, platform);
                
                // Hide dropdown
                const dropdown = option.closest('.AN-share-dropdown');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.AN-share-btn')) {
                document.querySelectorAll('.AN-share-dropdown').forEach(dropdown => {
                    dropdown.style.display = 'none';
                });
            }
        });
    },
    
    // Initialize router
    initializeRouter: function() {
        // Handle back/forward navigation
        window.addEventListener('popstate', (e) => {
            this.handleRouteChange();
        });
        
        // Initial route
        this.handleRouteChange();
        
        // Intercept link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link && !link.hasAttribute('target')) {
                e.preventDefault();
                const path = link.getAttribute('href');
                this.navigateTo(path);
            }
        });
    },
    
    // Handle route changes
    handleRouteChange: function() {
        const path = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        
        // Update current page state
        if (path.includes('AN_news.html')) {
            this.state.currentPage = 'news';
            this.loadNewsPage();
        } else if (path.includes('AN_gallery.html')) {
            this.state.currentPage = 'gallery';
            this.loadGalleryPage();
        } else if (path.includes('AN_missions.html')) {
            this.state.currentPage = 'missions';
            this.loadMissionsPage();
        } else if (path.includes('AN_explore.html')) {
            this.state.currentPage = 'explore';
            this.loadExplorePage();
        } else if (path.includes('AN_about.html')) {
            this.state.currentPage = 'about';
            this.loadAboutPage();
        } else {
            this.state.currentPage = 'home';
            this.loadHomePage();
        }
        
        // Handle item detail view
        const itemId = params.get('id');
        if (itemId) {
            this.showItemDetail(itemId);
        }
        
        // Update active nav link
        this.updateActiveNavLink();
    },
    
    // Navigate to path
    navigateTo: function(path) {
        history.pushState({}, '', path);
        this.handleRouteChange();
        
        // Scroll to top
        window.scrollTo(0, 0);
    },
    
    // Update active navigation link
    updateActiveNavLink: function() {
        const navLinks = document.querySelectorAll('.AN-nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === window.location.pathname || 
                (href === '/index.html' && window.location.pathname === '/')) {
                link.classList.add('active');
            }
        });
    },
    
    // Load page-specific content
    loadHomePage: function() {
        if (typeof AN_renderNews === 'function') {
            AN_renderNews(this.state.currentLanguage, 'all');
        }
        if (typeof AN_renderEvents === 'function') {
            AN_renderEvents(this.state.currentLanguage);
        }
    },
    
    loadNewsPage: function() {
        if (typeof AN_renderAllNews === 'function') {
            AN_renderAllNews(this.state.currentLanguage);
        }
    },
    
    loadGalleryPage: function() {
        if (typeof AN_renderGallery === 'function') {
            AN_renderGallery(this.state.currentLanguage);
        }
    },
    
    loadMissionsPage: function() {
        if (typeof AN_renderMissions === 'function') {
            AN_renderMissions(this.state.currentLanguage);
        }
    },
    
    loadExplorePage: function() {
        if (typeof AN_renderExplore === 'function') {
            AN_renderExplore(this.state.currentLanguage);
        }
    },
    
    loadAboutPage: function() {
        if (typeof AN_renderAbout === 'function') {
            AN_renderAbout(this.state.currentLanguage);
        }
    },
    
    // Show item detail
    showItemDetail: function(itemId) {
        const item = AN_getDataById(itemId);
        if (!item) return;
        
        // Create detail view
        const modal = document.createElement('div');
        modal.className = 'AN-item-detail-modal AN-active';
        modal.innerHTML = `
            <div class="AN-item-detail-content">
                <div class="AN-item-detail-header">
                    <h2>${item[this.state.currentLanguage]?.title || item.en.title}</h2>
                    <button class="AN-item-detail-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="AN-item-detail-body">
                    ${item.image ? `<img src="${item.image}" alt="${item[this.state.currentLanguage]?.title || item.en.title}" class="AN-item-detail-image">` : ''}
                    <div class="AN-item-detail-text">
                        <h3>${item[this.state.currentLanguage]?.subtitle || item.en.subtitle}</h3>
                        <p>${item[this.state.currentLanguage]?.body || item.en.body}</p>
                    </div>
                    <div class="AN-item-detail-reactions">
                        <!-- Reaction buttons will be added here -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add close handler
        modal.querySelector('.AN-item-detail-close').addEventListener('click', () => {
            modal.remove();
            // Remove item ID from URL
            const url = new URL(window.location);
            url.searchParams.delete('id');
            history.replaceState({}, '', url);
        });
        
        // Add reaction buttons
        this.renderReactionButtons(modal.querySelector('.AN-item-detail-reactions'), itemId, item.type);
    },
    
    // Update UI based on app state
    updateUIState: function() {
        // Update language
        if (typeof AN_applyTranslations === 'function') {
            AN_applyTranslations(this.state.currentLanguage);
        }
        
        // Update theme
        document.body.classList.toggle('AN-dark-mode', this.state.currentTheme === 'dark');
        
        // Update user UI
        this.updateUserUI();
        
        // Update RTL for Arabic
        if (this.state.currentLanguage === 'ar') {
            document.body.classList.add('AN-rtl');
            document.dir = 'rtl';
        } else {
            document.body.classList.remove('AN-rtl');
            document.dir = 'ltr';
        }
    },
    
    // Update user-related UI
    updateUserUI: function() {
        const loginBtn = document.getElementById('AN-login-btn');
        const registerBtn = document.getElementById('AN-register-btn');
        const userMenu = document.getElementById('AN-user-menu');
        const userNameSpan = document.getElementById('AN-user-name');
        
        if (this.state.user) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userNameSpan) {
                userNameSpan.textContent = this.state.user.name || this.state.user.user_name;
            }
        } else {
            // User is not logged in
            if (loginBtn) loginBtn.style.display = 'block';
            if (registerBtn) registerBtn.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
        }
    },
    
    // Set language
    setLanguage: function(language) {
        this.state.currentLanguage = language;
        localStorage.setItem('AN-language-preference', language);
        this.updateUIState();
        
        // Reload content with new language
        if (typeof AN_renderNews === 'function') {
            AN_renderNews(language, 'all');
        }
        if (typeof AN_renderEvents === 'function') {
            AN_renderEvents(language);
        }
    },
    
    // Set theme
    setTheme: function(theme) {
        this.state.currentTheme = theme;
        localStorage.setItem('AN-theme', theme);
        document.body.classList.toggle('AN-dark-mode', theme === 'dark');
    },
    
    // Registration methods
    showRegistrationModal: function(formType = 'login') {
        const modal = document.getElementById('AN-registration-modal');
        if (modal) {
            modal.classList.add('AN-active');
            this.switchRegistrationForm(formType);
        }
    },
    
    switchRegistrationForm: function(formType) {
        // Update tabs
        document.querySelectorAll('.AN-registration-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.form === formType);
        });
        
        // Update forms
        document.querySelectorAll('.AN-registration-form').forEach(form => {
            form.classList.toggle('active', form.id === `AN-${formType}-form`);
        });
    },
    
    handleLogin: async function() {
        const email = document.getElementById('AN-login-email').value;
        const password = document.getElementById('AN-login-password').value;
        const rememberMe = document.getElementById('AN-remember-me').checked;
        
        // Simple validation
        if (!email || !password) {
            this.showMessage('An.validation.required');
            return;
        }
        
        const success = await this.login(email, password);
        if (success) {
            document.getElementById('AN-registration-modal').classList.remove('AN-active');
            this.showMessage('An.message.loginSuccess');
        }
    },
    
    handleRegistration: async function() {
        const name = document.getElementById('AN-register-name').value;
        const username = document.getElementById('AN-register-username').value;
        const email = document.getElementById('AN-register-email').value;
        const password = document.getElementById('AN-register-password').value;
        const confirmPassword = document.getElementById('AN-register-confirm-password').value;
        const agreeTerms = document.getElementById('AN-agree-terms').checked;
        
        // Validation
        if (!name || !username || !email || !password || !confirmPassword) {
            this.showMessage('An.validation.required');
            return;
        }
        
        if (password.length < 6) {
            this.showMessage('An.validation.passwordLength');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showMessage('An.validation.passwordMatch');
            return;
        }
        
        if (!agreeTerms) {
            this.showMessage('An.validation.agreeTerms');
            return;
        }
        
        const userData = {
            name,
            username,
            email,
            password
        };
        
        const success = await this.register(userData);
        if (success) {
            document.getElementById('AN-registration-modal').classList.remove('AN-active');
            this.showMessage('An.message.registerSuccess');
        }
    },
    
    // Authentication methods
    	login: async function(email, password) {
		try {
			// Using Supabase Auth REST API
			const response = await fetch(`${this.config.supabaseUrl}/auth/v1/token?grant_type=password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'apikey': this.config.supabaseKey
				},
				body: JSON.stringify({ email, password })
			});
			
			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error_description || 'Login failed');
			}
			
			const data = await response.json();
			
			// Get user profile from users table
			const userResponse = await fetch(
				`${this.config.supabaseUrl}/rest/v1/users?user_id=eq.${data.user.id}&select=*`,
				{
					headers: {
						'apikey': this.config.supabaseKey,
						'Authorization': `Bearer ${data.access_token}`
					}
				}
			);
			
			let userData;
			if (userResponse.ok) {
				const userProfile = await userResponse.json();
				userData = userProfile.length > 0 ? userProfile[0] : null;
			}
			
			// If user profile doesn't exist, create it
			if (!userData) {
				const createProfileResponse = await fetch(`${this.config.supabaseUrl}/rest/v1/users`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'apikey': this.config.supabaseKey,
						'Prefer': 'return=representation',
						'Authorization': `Bearer ${data.access_token}`
					},
					body: JSON.stringify({
						user_id: data.user.id,
						name: data.user.user_metadata?.name || 'New User',
						user_name: data.user.email.split('@')[0],
						email: data.user.email,
						preferences: {
							language: this.state.currentLanguage,
							theme: this.state.currentTheme,
							notifications: true,
							email_updates: false,
							default_category: 'all'
						}
					})
				});
				
				if (createProfileResponse.ok) {
					const createdProfile = await createProfileResponse.json();
					userData = createdProfile[0];
				}
			}
			
			if (userData) {
				this.state.user = {
					...userData,
					token: data.access_token,
					refresh_token: data.refresh_token
				};
				this.saveUserState();
				this.updateUserUI();
				// Load user interactions
				await this.loadUserInteractions();
				return true;
			}
			
			throw new Error('User profile not found');
		} catch (error) {
			console.error('Login error:', error);
			this.showMessage(error.message || 'An.message.error', 'error');
			return false;
		}
	},

    
    	register: async function(userData) {
		try {
			// First, create auth user with Supabase
			const authResponse = await fetch(`${this.config.supabaseUrl}/auth/v1/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'apikey': this.config.supabaseKey
				},
				body: JSON.stringify({
					email: userData.email,
					password: userData.password,
					options: {
						data: {
							name: userData.name,
							user_name: userData.username
						}
					}
				})
			});

			if (!authResponse.ok) {
				const error = await authResponse.json();
				console.error('Auth signup error:', error);
				throw new Error(error.message || 'Registration failed');
			}

			const authData = await authResponse.json();
			
			// Log the auth response to debug
			console.log('Auth response:', authData);
			
			// Login immediately after registration to get access token
			const loginResponse = await fetch(`${this.config.supabaseUrl}/auth/v1/token?grant_type=password`, {
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

			if (!loginResponse.ok) {
				const error = await loginResponse.json();
				console.error('Login after registration error:', error);
				throw new Error('Failed to login after registration');
			}

			const loginData = await loginResponse.json();
			
			// Then create user profile in users table
			const profileResponse = await fetch(`${this.config.supabaseUrl}/rest/v1/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'apikey': this.config.supabaseKey,
					'Prefer': 'return=representation',
					'Authorization': `Bearer ${loginData.access_token}`
				},
				body: JSON.stringify({
					user_id: loginData.user.id,
					name: userData.name,
					user_name: userData.username,
					email: userData.email,
					preferences: {
						language: this.state.currentLanguage,
						theme: this.state.currentTheme,
						notifications: true,
						email_updates: false,
						default_category: 'all'
					}
				})
			});

			if (!profileResponse.ok) {
				const errorText = await profileResponse.text();
				console.error('Profile creation failed:', errorText);
				throw new Error('Profile creation failed');
			}

			const profileData = await profileResponse.json();
			
			// Auto-login after registration
			this.state.user = {
				...profileData[0],
				token: loginData.access_token,
				refresh_token: loginData.refresh_token
			};
			
			this.saveUserState();
			this.updateUserUI();
			
			// Show success message
			this.showMessage('An.message.registerSuccess', 'success');
			return true;
		} catch (error) {
			console.error('Registration error:', error);
			this.showMessage(error.message || 'An.message.error', 'error');
			return false;
		}
	},

    
    logout: function() {
        this.state.user = null;
        localStorage.removeItem('AN_user');
        localStorage.removeItem('AN_user_interactions');
        this.updateUserUI();
        this.showMessage('An.message.logoutSuccess');
    },
    
    // Load user interactions from Supabase
    loadUserInteractions: async function() {
        if (!this.state.user?.user_id) return;
        
        try {
            // Load reactions
            const reactionsResponse = await fetch(
                `${this.config.supabaseUrl}/rest/v1/reactions?user_id=eq.${this.state.user.user_id}&select=*`,
                {
                    headers: {
                        'apikey': this.config.supabaseKey,
                        'Authorization': `Bearer ${this.state.user?.token || this.config.supabaseKey}`
                    }
                }
            );
            
            if (reactionsResponse.ok) {
                const reactions = await reactionsResponse.json();
                localStorage.setItem('AN_user_reactions', JSON.stringify(reactions));
            }
            
            // Load comments
            const commentsResponse = await fetch(
                `${this.config.supabaseUrl}/rest/v1/comments?user_id=eq.${this.state.user.user_id}&select=*`,
                {
                    headers: {
                        'apikey': this.config.supabaseKey,
                        'Authorization': `Bearer ${this.state.user?.token || this.config.supabaseKey}`
                    }
                }
            );
            
            if (commentsResponse.ok) {
                const comments = await commentsResponse.json();
                localStorage.setItem('AN_user_comments', JSON.stringify(comments));
            }
            
        } catch (error) {
            console.error('Error loading user interactions:', error);
        }
    },
    
    // Load interaction statistics
    loadInteractionStats: async function() {
        try {
            // Load reaction counts
            const reactionsResponse = await fetch(
                `${this.config.supabaseUrl}/rest/v1/reactions?select=item_id,item_type,reaction_type`,
                {
                    headers: {
                        'apikey': this.config.supabaseKey
                    }
                }
            );
            
            if (reactionsResponse.ok) {
                const reactions = await reactionsResponse.json();
                this.processInteractionStats(reactions);
            }
            
            // Load comment counts
            const commentsResponse = await fetch(
                `${this.config.supabaseUrl}/rest/v1/comments?select=item_id,item_type`,
                {
                    headers: {
                        'apikey': this.config.supabaseKey
                    }
                }
            );
            
            if (commentsResponse.ok) {
                const comments = await commentsResponse.json();
                this.processCommentStats(comments);
            }
            
        } catch (error) {
            console.error('Error loading interaction stats:', error);
            // Fallback to localStorage
            this.loadLocalInteractionStats();
        }
    },
    
    // Process interaction statistics
    processInteractionStats: function(reactions) {
        this.state.interactionStats = {};
        
        reactions.forEach(reaction => {
            const key = `${reaction.item_type}_${reaction.item_id}`;
            
            if (!this.state.interactionStats[key]) {
                this.state.interactionStats[key] = {
                    likes: 0,
                    dislikes: 0,
                    comments: 0,
                    userReaction: null
                };
            }
            
            if (reaction.reaction_type === 'like') {
                this.state.interactionStats[key].likes++;
            } else if (reaction.reaction_type === 'dislike') {
                this.state.interactionStats[key].dislikes++;
            }
            
            // Check if this is the current user's reaction
            if (this.state.user && reaction.user_id === this.state.user.user_id) {
                this.state.interactionStats[key].userReaction = reaction.reaction_type;
            }
        });
        
        // Save to localStorage for offline use
        localStorage.setItem('AN_interaction_stats', JSON.stringify(this.state.interactionStats));
    },
    
    // Process comment statistics
    processCommentStats: function(comments) {
        comments.forEach(comment => {
            const key = `${comment.item_type}_${comment.item_id}`;
            
            if (!this.state.interactionStats[key]) {
                this.state.interactionStats[key] = {
                    likes: 0,
                    dislikes: 0,
                    comments: 0,
                    userReaction: null
                };
            }
            
            this.state.interactionStats[key].comments++;
        });
        
        localStorage.setItem('AN_interaction_stats', JSON.stringify(this.state.interactionStats));
    },
    
    // Load local interaction stats
    loadLocalInteractionStats: function() {
        const savedStats = localStorage.getItem('AN_interaction_stats');
        if (savedStats) {
            try {
                this.state.interactionStats = JSON.parse(savedStats);
            } catch (e) {
                console.error('Error parsing saved stats:', e);
            }
        }
        
        // Load user reactions
        const savedReactions = localStorage.getItem('AN_user_reactions');
        if (savedReactions && this.state.user) {
            try {
                const reactions = JSON.parse(savedReactions);
                reactions.forEach(reaction => {
                    const key = `${reaction.item_type}_${reaction.item_id}`;
                    if (this.state.interactionStats[key]) {
                        this.state.interactionStats[key].userReaction = reaction.reaction_type;
                    }
                });
            } catch (e) {
                console.error('Error parsing user reactions:', e);
            }
        }
    },
    
    // Get interaction stats for an item
    getInteractionStats: function(itemId, itemType) {
        const key = `${itemType}_${itemId}`;
        return this.state.interactionStats[key] || {
            likes: 0,
            dislikes: 0,
            comments: 0,
            userReaction: null
        };
    },
    
    // Reaction methods
    addReaction: async function(itemId, itemType, reactionType) {
        if (!this.state.user) {
            this.showRegistrationModal('login');
            return false;
        }
        
        const reaction = {
            user_id: this.state.user.user_id,
            item_id: itemId,
            item_type: itemType,
            reaction_type: reactionType
        };
        
        // Check if user already reacted
        const stats = this.getInteractionStats(itemId, itemType);
        const previousReaction = stats.userReaction;
        
        // Update local state immediately for better UX
        this.updateLocalReactionState(itemId, itemType, reactionType, previousReaction);
        
        if (!this.state.isOnline) {
            // Queue for offline sync
            this.addToOfflineQueue('reaction', reaction);
            this.showMessage('An.message.offline');
            return true;
        }
        
        try {
            // Check if reaction exists
            const checkResponse = await fetch(
                `${this.config.supabaseUrl}/rest/v1/reactions?user_id=eq.${this.state.user.user_id}&item_id=eq.${itemId}&item_type=eq.${itemType}`,
                {
                    headers: {
                        'apikey': this.config.supabaseKey,
                        'Authorization': `Bearer ${this.state.user?.token || this.config.supabaseKey}`
                    }
                }
            );
            
            let response;
            
            if (checkResponse.ok) {
                const existingReactions = await checkResponse.json();
                
                if (existingReactions.length > 0) {
                    // Update existing reaction
                    response = await fetch(
                        `${this.config.supabaseUrl}/rest/v1/reactions?user_id=eq.${this.state.user.user_id}&item_id=eq.${itemId}&item_type=eq.${itemType}`,
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'apikey': this.config.supabaseKey,
                                'Authorization': `Bearer ${this.state.user?.token || this.config.supabaseKey}`
                            },
                            body: JSON.stringify({ reaction_type: reactionType })
                        }
                    );
                } else {
                    // Create new reaction
                    response = await fetch(`${this.config.supabaseUrl}/rest/v1/reactions`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': this.config.supabaseKey,
                            'Authorization': `Bearer ${this.state.user?.token || this.config.supabaseKey}`,
                            'Prefer': 'return=representation'
                        },
                        body: JSON.stringify(reaction)
                    });
                }
                
                if (response.ok) {
                    this.showMessage('An.message.reactionAdded');
                    
                    // Update interaction stats
                    await this.loadInteractionStats();
                    
                    return true;
                }
            }
            
            return false;
            
        } catch (error) {
            console.error('Reaction error:', error);
            this.addToOfflineQueue('reaction', reaction);
            return false;
        }
    },
    
    // Update local reaction state
    updateLocalReactionState: function(itemId, itemType, newReaction, previousReaction) {
        const key = `${itemType}_${itemId}`;
        
        if (!this.state.interactionStats[key]) {
            this.state.interactionStats[key] = {
                likes: 0,
                dislikes: 0,
                comments: 0,
                userReaction: null
            };
        }
        
        // Remove previous reaction
        if (previousReaction === 'like') {
            this.state.interactionStats[key].likes = Math.max(0, this.state.interactionStats[key].likes - 1);
        } else if (previousReaction === 'dislike') {
            this.state.interactionStats[key].dislikes = Math.max(0, this.state.interactionStats[key].dislikes - 1);
        }
        
        // Add new reaction
        if (newReaction === 'like') {
            this.state.interactionStats[key].likes++;
        } else if (newReaction === 'dislike') {
            this.state.interactionStats[key].dislikes++;
        }
        
        this.state.interactionStats[key].userReaction = newReaction;
        
        // Update UI
        this.updateReactionUI(itemId, itemType);
        
        // Save to localStorage
        localStorage.setItem('AN_interaction_stats', JSON.stringify(this.state.interactionStats));
    },
    
    // Comment methods
    openCommentModal: async function(itemId, itemType) {
        if (!this.state.user) {
            this.showRegistrationModal('login');
            return;
        }
        
        const modal = document.getElementById('AN-reaction-modal');
        if (!modal) return;
        
        // Set modal title
        const title = modal.querySelector('#AN-reaction-modal-title');
        const item = AN_getDataById(itemId);
        
        if (title && item) {
            title.textContent = item[this.state.currentLanguage]?.title || item.en.title;
        }
        
        // Set item ID for comment submission
        modal.dataset.itemId = itemId;
        modal.dataset.itemType = itemType;
        
        // Load comments
        await this.loadComments(itemId, itemType);
        
        // Show modal
        modal.classList.add('AN-active');
        
        // Focus on comment input
        const commentInput = document.getElementById('AN-comment-input');
        if (commentInput) {
            setTimeout(() => commentInput.focus(), 100);
        }
    },
    
    submitComment: async function() {
        const modal = document.getElementById('AN-reaction-modal');
        if (!modal) return;
        
        const itemId = modal.dataset.itemId;
        const itemType = modal.dataset.itemType;
        const commentInput = document.getElementById('AN-comment-input');
        
        if (!commentInput || !commentInput.value.trim()) {
            this.showMessage('An.validation.required');
            return;
        }
        
        if (!this.state.user) {
            this.showRegistrationModal('login');
            return;
        }
        
        const comment = {
            user_id: this.state.user.user_id,
            item_id: itemId,
            item_type: itemType,
            content: commentInput.value.trim()
        };
        
        // Update local state immediately
        const key = `${itemType}_${itemId}`;
        if (this.state.interactionStats[key]) {
            this.state.interactionStats[key].comments++;
        }
        
        commentInput.value = '';
        
        if (!this.state.isOnline) {
            this.addToOfflineQueue('comment', comment);
            this.showMessage('An.message.offline');
            return;
        }
        
        try {
            const response = await fetch(`${this.config.supabaseUrl}/rest/v1/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.config.supabaseKey,
                    'Authorization': `Bearer ${this.state.user?.token || this.config.supabaseKey}`,
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(comment)
            });
            
            if (response.ok) {
                this.showMessage('An.message.commentAdded');
                
                // Reload comments
                await this.loadComments(itemId, itemType);
                
                // Update interaction stats
                await this.loadInteractionStats();
            }
        } catch (error) {
            console.error('Comment error:', error);
            this.addToOfflineQueue('comment', comment);
        }
    },
    
    loadComments: async function(itemId, itemType) {
        const commentsList = document.getElementById('AN-comments-list');
        if (!commentsList) return;
        
        // Show loading
        commentsList.innerHTML = '<div class="AN-loading-comments">' + 
            AN_translations[this.state.currentLanguage]['An.reaction.loadingComments'] + 
            '</div>';
        
        try {
            const response = await fetch(
                `${this.config.supabaseUrl}/rest/v1/comments?item_id=eq.${itemId}&item_type=eq.${itemType}&select=*,users(name,user_name)&order=created_at.desc`,
                {
                    headers: {
                        'apikey': this.config.supabaseKey
                    }
                }
            );
            
            if (response.ok) {
                const comments = await response.json();
                this.renderComments(comments);
            }
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsList.innerHTML = '<div class="AN-comments-error">' + 
                AN_translations[this.state.currentLanguage]['An.message.error'] + 
                '</div>';
        }
    },
    
    renderComments: function(comments) {
        const commentsList = document.getElementById('AN-comments-list');
        if (!commentsList) return;
        
        if (!comments || comments.length === 0) {
            commentsList.innerHTML = '<div class="AN-no-comments">' + 
                AN_translations[this.state.currentLanguage]['An.reaction.noComments'] + 
                '</div>';
            return;
        }
        
        const html = comments.map(comment => `
            <div class="AN-comment-item">
                <div class="AN-comment-header">
                    <span class="AN-comment-author">
                        ${comment.users?.name || comment.users?.user_name || 'Anonymous'}
                    </span>
                    <span class="AN-comment-date">
                        ${AN_formatDate(comment.created_at, this.state.currentLanguage)}
                    </span>
                </div>
                <div class="AN-comment-content">
                    ${this.escapeHtml(comment.content)}
                </div>
            </div>
        `).join('');
        
        commentsList.innerHTML = html;
    },
    
    // Share methods
    shareItem: function(itemId, itemType, platform) {
        const item = AN_getDataById(itemId);
        if (!item) return;
        
        const url = `${window.location.origin}${window.location.pathname}?id=${itemId}`;
        const title = item[this.state.currentLanguage]?.title || item.en.title;
        const text = item[this.state.currentLanguage]?.subtitle || item.en.subtitle;
        const image = item.image ? `${window.location.origin}/${item.image}` : '';
        
        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' - ' + text)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    this.showMessage('An.message.shareSuccess');
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    this.showMessage('An.message.shareSuccess');
                });
                break;
        }
    },
    
    // Render reaction buttons for an item
    renderReactionButtons: function(container, itemId, itemType) {
        if (!container) return;
        
        const stats = this.getInteractionStats(itemId, itemType);
        const userReaction = stats.userReaction;
        
        const html = `
            <div class="AN-reaction-buttons">
                <button class="AN-reaction-btn AN-like-btn ${userReaction === 'like' ? 'active' : ''}" 
                        data-item-id="${itemId}" data-item-type="${itemType}">
                    <i class="fas fa-thumbs-up"></i>
                    <span class="AN-reaction-count">${stats.likes}</span>
                    <span class="AN-reaction-label">${AN_translations[this.state.currentLanguage]['An.reaction.like']}</span>
                </button>
                
                <button class="AN-reaction-btn AN-dislike-btn ${userReaction === 'dislike' ? 'active' : ''}" 
                        data-item-id="${itemId}" data-item-type="${itemType}">
                    <i class="fas fa-thumbs-down"></i>
                    <span class="AN-reaction-count">${stats.dislikes}</span>
                    <span class="AN-reaction-label">${AN_translations[this.state.currentLanguage]['An.reaction.dislike']}</span>
                </button>
                
                <button class="AN-reaction-btn AN-comment-btn" 
                        data-item-id="${itemId}" data-item-type="${itemType}">
                    <i class="fas fa-comment"></i>
                    <span class="AN-reaction-count">${stats.comments}</span>
                    <span class="AN-reaction-label">${AN_translations[this.state.currentLanguage]['An.reaction.comment']}</span>
                </button>
                
                <div class="AN-share-btn" data-item-id="${itemId}" data-item-type="${itemType}">
                    <button class="AN-reaction-btn">
                        <i class="fas fa-share-alt"></i>
                        <span class="AN-reaction-label">${AN_translations[this.state.currentLanguage]['An.reaction.share']}</span>
                    </button>
                    <div class="AN-share-dropdown">
                        <button class="AN-share-option" data-platform="facebook">
                            <i class="fab fa-facebook"></i>
                            <span>${AN_translations[this.state.currentLanguage]['An.reaction.shareFacebook']}</span>
                        </button>
                        <button class="AN-share-option" data-platform="twitter">
                            <i class="fab fa-twitter"></i>
                            <span>${AN_translations[this.state.currentLanguage]['An.reaction.shareTwitter']}</span>
                        </button>
                        <button class="AN-share-option" data-platform="linkedin">
                            <i class="fab fa-linkedin"></i>
                            <span>${AN_translations[this.state.currentLanguage]['An.reaction.shareLinkedIn']}</span>
                        </button>
                        <button class="AN-share-option" data-platform="whatsapp">
                            <i class="fab fa-whatsapp"></i>
                            <span>${AN_translations[this.state.currentLanguage]['An.reaction.shareWhatsApp']}</span>
                        </button>
                        <button class="AN-share-option" data-platform="copy">
                            <i class="fas fa-link"></i>
                            <span>${AN_translations[this.state.currentLanguage]['An.reaction.copyLink']}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    },
    
    // Update reaction UI
    updateReactionUI: function(itemId, itemType) {
        const stats = this.getInteractionStats(itemId, itemType);
        
        // Update all instances of this item's reaction buttons
        const likeButtons = document.querySelectorAll(`.AN-like-btn[data-item-id="${itemId}"][data-item-type="${itemType}"]`);
        const dislikeButtons = document.querySelectorAll(`.AN-dislike-btn[data-item-id="${itemId}"][data-item-type="${itemType}"]`);
        const commentButtons = document.querySelectorAll(`.AN-comment-btn[data-item-id="${itemId}"][data-item-type="${itemType}"]`);
        
        likeButtons.forEach(button => {
            const countSpan = button.querySelector('.AN-reaction-count');
            if (countSpan) countSpan.textContent = stats.likes;
            button.classList.toggle('active', stats.userReaction === 'like');
        });
        
        dislikeButtons.forEach(button => {
            const countSpan = button.querySelector('.AN-reaction-count');
            if (countSpan) countSpan.textContent = stats.dislikes;
            button.classList.toggle('active', stats.userReaction === 'dislike');
        });
        
        commentButtons.forEach(button => {
            const countSpan = button.querySelector('.AN-reaction-count');
            if (countSpan) countSpan.textContent = stats.comments;
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
        this.state.offlineQueue.push({
            type,
            data,
            timestamp: Date.now(),
            id: Math.random().toString(36).substr(2, 9)
        });
        
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
        const failedItems = [];
        
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
                
                // Remove from queue if successful
                this.state.offlineQueue = this.state.offlineQueue.filter(i => i.id !== item.id);
                
            } catch (error) {
                console.error('Failed to sync item:', error);
                failedItems.push(item);
            }
        }
        
        // Keep failed items in queue
        this.state.offlineQueue = failedItems;
        localStorage.setItem('AN_offline_queue', JSON.stringify(this.state.offlineQueue));
        
        if (failedItems.length === 0) {
            this.showMessage('An.message.syncComplete');
        }
    },
    
    // Utility methods
    showMessage: function(messageKey, type = 'info') {
        const message = AN_translations[this.state.currentLanguage][messageKey] || messageKey;
        
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `AN-toast AN-toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            ${this.state.currentLanguage === 'ar' ? 'left: 20px' : 'right: 20px'};
            background-color: ${type === 'error' ? 'var(--AN-danger-color)' : 
                              type === 'success' ? 'var(--AN-success-color)' : 
                              'var(--AN-primary-color)'};
            color: white;
            padding: 12px 24px;
            border-radius: var(--AN-radius);
            box-shadow: var(--AN-shadow);
            z-index: 9999;
            animation: AN-toast-slide-in 0.3s ease;
            max-width: 400px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'AN-toast-slide-out 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    },
    
    showOfflineMessage: function() {
        this.showMessage('An.message.offline', 'warning');
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
        console.log('Checking for new content...');
        // This would be implemented with real API calls
    },
    
    loadInitialData: function() {
        // Load initial news and events
        if (typeof AN_renderNews === 'function') {
            AN_renderNews(this.state.currentLanguage, 'all');
        }
        if (typeof AN_renderEvents === 'function') {
            AN_renderEvents(this.state.currentLanguage);
        }
    },
    
    // Helper function to escape HTML
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize app when DOM is loaded
function AN_initializeApp() {
    AN_app.initialize();
    
    // Add toast animation styles
    if (!document.querySelector('#AN-toast-styles')) {
        const style = document.createElement('style');
        style.id = 'AN-toast-styles';
        style.textContent = `
            @keyframes AN-toast-slide-in {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            @keyframes AN-toast-slide-out {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100%);
                    opacity: 0;
                }
            }
            .AN-toast-error {
                background-color: var(--AN-danger-color) !important;
            }
            .AN-toast-success {
                background-color: var(--AN-success-color) !important;
            }
            .AN-toast-warning {
                background-color: var(--AN-warning-color) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Export for modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AN_app, AN_initializeApp };
}