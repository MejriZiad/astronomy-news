/**
 * PWA Installation & Update Manager
 * Handles PWA installation prompts, updates, and push notifications
 */

class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.updateAvailable = false;
        this.registration = null;
        this.notificationPermission = 'default';
        
        this.init();
    }
    
    async init() {
        this.setupInstallPrompt();
        this.checkUpdateAvailable();
        this.registerServiceWorker();
        this.setupNotifications();
        this.setupUpdateUI();
    }
    
    /**
     * Setup PWA installation prompt
     */
    setupInstallPrompt() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA: Install prompt available');
            
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            
            // Stash the event so it can be triggered later
            this.deferredPrompt = e;
            
            // Show install button or update UI
            this.showInstallPromotion();
        });
        
        // Listen for app installed event
        window.addEventListener('appinstalled', (e) => {
            console.log('PWA: App installed successfully');
            this.deferredPrompt = null;
            this.hideInstallPromotion();
            
            // Track installation
            this.trackInstallation();
        });
        
        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('PWA: Running in standalone mode');
            this.hideInstallPromotion();
        }
    }
    
    /**
     * Show install promotion UI
     */
    showInstallPromotion() {
        // Check if we're already in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        }
        
        // Create or show install button
        let installBtn = document.getElementById('AN-pwa-install-btn');
        
        if (!installBtn) {
            installBtn = document.createElement('button');
            installBtn.id = 'AN-pwa-install-btn';
            installBtn.className = 'AN-pwa-install-btn';
            installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
            installBtn.title = 'Install Astronomy News as an app';
            installBtn.setAttribute('aria-label', 'Install Astronomy News app');
            
            // Style the button
            installBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                background: linear-gradient(135deg, var(--AN-primary-color), var(--AN-secondary-color));
                color: white;
                border: none;
                border-radius: 50px;
                padding: 12px 24px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(installBtn);
            
            // Add hover effects
            installBtn.addEventListener('mouseenter', () => {
                installBtn.style.transform = 'translateY(-2px)';
                installBtn.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            });
            
            installBtn.addEventListener('mouseleave', () => {
                installBtn.style.transform = 'translateY(0)';
                installBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            });
            
            // Add click handler
            installBtn.addEventListener('click', () => this.promptInstall());
        }
        
        installBtn.style.display = 'flex';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (installBtn && !installBtn.dataset.clicked) {
                installBtn.style.opacity = '0.5';
            }
        }, 10000);
    }
    
    /**
     * Hide install promotion
     */
    hideInstallPromotion() {
        const installBtn = document.getElementById('AN-pwa-install-btn');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    }
    
    /**
     * Trigger install prompt
     */
    async promptInstall() {
        if (!this.deferredPrompt) {
            console.log('PWA: No install prompt available');
            return;
        }
        
        const installBtn = document.getElementById('AN-pwa-install-btn');
        if (installBtn) {
            installBtn.dataset.clicked = 'true';
            installBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Installing...';
            installBtn.disabled = true;
        }
        
        try {
            // Show the install prompt
            this.deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            const choiceResult = await this.deferredPrompt.userChoice;
            
            console.log('PWA: User choice:', choiceResult.outcome);
            
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA: User accepted install');
                this.trackEvent('pwa_install_accepted');
            } else {
                console.log('PWA: User dismissed install');
                this.trackEvent('pwa_install_declined');
            }
            
            // Clear the saved prompt since it can't be used again
            this.deferredPrompt = null;
            
            // Reset button
            if (installBtn) {
                installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
                installBtn.disabled = false;
                this.hideInstallPromotion();
            }
            
        } catch (error) {
            console.error('PWA: Install prompt error:', error);
            
            if (installBtn) {
                installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
                installBtn.disabled = false;
            }
        }
    }
    
    /**
     * Register Service Worker
     */
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                this.registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                });
                
                console.log('PWA: Service Worker registered:', this.registration);
                
                // Listen for updates
                this.registration.addEventListener('updatefound', () => {
                    const newWorker = this.registration.installing;
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New update available
                            this.updateAvailable = true;
                            this.showUpdateNotification();
                        }
                    });
                });
                
                // Check for updates periodically
                setInterval(() => {
                    if (this.registration) {
                        this.registration.update();
                    }
                }, 60 * 60 * 1000); // Check every hour
                
            } catch (error) {
                console.error('PWA: Service Worker registration failed:', error);
            }
        }
    }
    
    /**
     * Check for updates
     */
    checkUpdateAvailable() {
        // Listen for controllerchange to detect new Service Worker
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('PWA: New Service Worker controlling the page');
            this.updateAvailable = true;
            this.showUpdateNotification();
        });
    }
    
    /**
     * Show update notification
     */
    showUpdateNotification() {
        if (!this.updateAvailable) return;
        
        // Create update notification
        let updateNotification = document.getElementById('AN-pwa-update-notification');
        
        if (!updateNotification) {
            updateNotification = document.createElement('div');
            updateNotification.id = 'AN-pwa-update-notification';
            updateNotification.className = 'AN-pwa-update-notification';
            updateNotification.innerHTML = `
                <div class="AN-pwa-update-content">
                    <i class="fas fa-sync-alt AN-pwa-update-icon"></i>
                    <div class="AN-pwa-update-text">
                        <strong>New Update Available!</strong>
                        <span>A new version of Astronomy News is available.</span>
                    </div>
                    <div class="AN-pwa-update-actions">
                        <button id="AN-pwa-update-now" class="AN-pwa-update-btn AN-pwa-update-primary">
                            Update Now
                        </button>
                        <button id="AN-pwa-update-later" class="AN-pwa-update-btn AN-pwa-update-secondary">
                            Later
                        </button>
                    </div>
                </div>
            `;
            
            // Add styles
            updateNotification.style.cssText = `
                position: fixed;
                bottom: 80px;
                right: 20px;
                z-index: 9998;
                background: var(--AN-card-bg);
                border: 1px solid var(--AN-border-color);
                border-radius: var(--AN-radius);
                padding: 16px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                max-width: 350px;
                animation: AN-slideUp 0.3s ease;
            `;
            
            const updateContent = updateNotification.querySelector('.AN-pwa-update-content');
            updateContent.style.cssText = `
                display: flex;
                flex-direction: column;
                gap: 12px;
            `;
            
            const updateIcon = updateNotification.querySelector('.AN-pwa-update-icon');
            updateIcon.style.cssText = `
                font-size: 24px;
                color: var(--AN-primary-color);
                text-align: center;
            `;
            
            const updateText = updateNotification.querySelector('.AN-pwa-update-text');
            updateText.style.cssText = `
                display: flex;
                flex-direction: column;
                gap: 4px;
            `;
            
            updateText.querySelector('strong').style.cssText = `
                font-size: 16px;
                color: var(--AN-primary-color);
            `;
            
            updateText.querySelector('span').style.cssText = `
                font-size: 14px;
                color: var(--AN-text-color);
                opacity: 0.8;
            `;
            
            const updateActions = updateNotification.querySelector('.AN-pwa-update-actions');
            updateActions.style.cssText = `
                display: flex;
                gap: 8px;
                margin-top: 8px;
            `;
            
            const updateButtons = updateNotification.querySelectorAll('.AN-pwa-update-btn');
            updateButtons.forEach(btn => {
                btn.style.cssText = `
                    flex: 1;
                    padding: 8px 16px;
                    border-radius: var(--AN-radius);
                    border: none;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                `;
            });
            
            const updateNow = updateNotification.querySelector('.AN-pwa-update-primary');
            updateNow.style.cssText += `
                background-color: var(--AN-primary-color);
                color: white;
            `;
            
            const updateLater = updateNotification.querySelector('.AN-pwa-update-secondary');
            updateLater.style.cssText += `
                background-color: transparent;
                border: 1px solid var(--AN-border-color);
                color: var(--AN-text-color);
            `;
            
            document.body.appendChild(updateNotification);
            
            // Add event listeners
            updateNow.addEventListener('click', () => this.applyUpdate());
            updateLater.addEventListener('click', () => {
                updateNotification.style.display = 'none';
                // Show again in 1 hour
                setTimeout(() => {
                    if (this.updateAvailable) {
                        updateNotification.style.display = 'block';
                    }
                }, 60 * 60 * 1000);
            });
            
            // Auto-hide after 30 seconds
            setTimeout(() => {
                if (updateNotification.style.display !== 'none') {
                    updateNotification.style.opacity = '0.7';
                }
            }, 30000);
        }
        
        updateNotification.style.display = 'block';
    }
    
    /**
     * Apply update
     */
    async applyUpdate() {
        if (!this.registration || !this.updateAvailable) return;
        
        console.log('PWA: Applying update...');
        
        // Skip waiting for new Service Worker
        if (this.registration.waiting) {
            this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        
        // Reload page to activate new Service Worker
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }
    
    /**
     * Setup notifications
     */
    async setupNotifications() {
        // Check permission
        this.notificationPermission = Notification.permission;
        
        if (this.notificationPermission === 'default') {
            // Show notification permission prompt after delay
            setTimeout(() => {
                this.showNotificationPermissionPrompt();
            }, 5000);
        } else if (this.notificationPermission === 'granted') {
            this.setupNotificationSubscription();
        }
    }
    
    /**
     * Show notification permission prompt
     */
    showNotificationPermissionPrompt() {
        // Don't show if already asked or in standalone mode
        if (this.notificationPermission !== 'default' || 
            window.matchMedia('(display-mode: standalone)').matches) {
            return;
        }
        
        // Check if we should show based on user engagement
        if (this.shouldShowNotificationPrompt()) {
            const permissionPrompt = document.createElement('div');
            permissionPrompt.id = 'AN-notification-permission-prompt';
            permissionPrompt.className = 'AN-notification-permission-prompt';
            permissionPrompt.innerHTML = `
                <div class="AN-notification-permission-content">
                    <i class="fas fa-bell AN-notification-permission-icon"></i>
                    <div class="AN-notification-permission-text">
                        <strong>Get Breaking News!</strong>
                        <span>Enable notifications to receive updates about space discoveries and events.</span>
                    </div>
                    <div class="AN-notification-permission-actions">
                        <button id="AN-enable-notifications" class="AN-notification-permission-btn AN-notification-permission-enable">
                            Enable Notifications
                        </button>
                        <button id="AN-dismiss-notifications" class="AN-notification-permission-btn AN-notification-permission-dismiss">
                            Not Now
                        </button>
                    </div>
                </div>
            `;
            
            // Style the prompt
            permissionPrompt.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                z-index: 9997;
                background: var(--AN-card-bg);
                border: 1px solid var(--AN-border-color);
                border-radius: var(--AN-radius);
                padding: 16px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                animation: AN-slideUp 0.3s ease;
            `;
            
            document.body.appendChild(permissionPrompt);
            
            // Add event listeners
            document.getElementById('AN-enable-notifications').addEventListener('click', async () => {
                await this.requestNotificationPermission();
                permissionPrompt.remove();
            });
            
            document.getElementById('AN-dismiss-notifications').addEventListener('click', () => {
                permissionPrompt.remove();
                // Store dismissal
                localStorage.setItem('AN_notification_prompt_dismissed', Date.now().toString());
            });
            
            // Auto-dismiss after 15 seconds
            setTimeout(() => {
                if (permissionPrompt.parentNode) {
                    permissionPrompt.remove();
                }
            }, 15000);
        }
    }
    
    /**
     * Check if we should show notification prompt
     */
    shouldShowNotificationPrompt() {
        const lastDismissed = localStorage.getItem('AN_notification_prompt_dismissed');
        if (lastDismissed) {
            const daysSinceDismissal = (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60 * 24);
            return daysSinceDismissal > 7; // Show again after 7 days
        }
        return true;
    }
    
    /**
     * Request notification permission
     */
    async requestNotificationPermission() {
        try {
            const permission = await Notification.requestPermission();
            this.notificationPermission = permission;
            
            if (permission === 'granted') {
                console.log('PWA: Notification permission granted');
                this.setupNotificationSubscription();
                this.trackEvent('notifications_enabled');
                
                // Show welcome notification
                this.showWelcomeNotification();
            }
        } catch (error) {
            console.error('PWA: Error requesting notification permission:', error);
        }
    }
    
    /**
     * Setup notification subscription
     */
    async setupNotificationSubscription() {
        if ('PushManager' in window && this.registration) {
            try {
                // This would connect to your push notification service
                // For now, we'll just log that we would subscribe
                console.log('PWA: Ready to subscribe to push notifications');
                
                // In a real implementation, you would:
                // 1. Get VAPID keys from your server
                // 2. Subscribe to push notifications
                // 3. Send subscription to your server
                
            } catch (error) {
                console.error('PWA: Push subscription error:', error);
            }
        }
    }
    
    /**
     * Show welcome notification
     */
    showWelcomeNotification() {
        if (this.notificationPermission === 'granted' && this.registration) {
            this.registration.showNotification('Astronomy News', {
                body: 'Welcome to Astronomy News! You\'ll now receive updates about space discoveries.',
                icon: 'assets/icons/icon-96x96.png',
                badge: 'assets/icons/icon-96x96.png',
                tag: 'welcome-notification',
                requireInteraction: true,
                actions: [
                    { action: 'explore', title: 'Explore' },
                    { action: 'dismiss', title: 'Dismiss' }
                ]
            });
        }
    }
    
    /**
     * Setup update UI
     */
    setupUpdateUI() {
        // Add CSS for animations
        if (!document.getElementById('AN-pwa-styles')) {
            const style = document.createElement('style');
            style.id = 'AN-pwa-styles';
            style.textContent = `
                @keyframes AN-slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes AN-pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                .AN-pwa-update-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                
                .AN-pwa-update-primary:hover {
                    background-color: var(--AN-secondary-color) !important;
                }
                
                .AN-pwa-update-secondary:hover {
                    background-color: var(--AN-border-color) !important;
                }
                
                .AN-notification-permission-btn:hover {
                    transform: translateY(-2px);
                }
                
                .AN-notification-permission-enable:hover {
                    background-color: var(--AN-secondary-color) !important;
                }
                
                .AN-notification-permission-dismiss:hover {
                    background-color: var(--AN-border-color) !important;
                }
                
                .AN-pwa-install-btn:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 6px 16px rgba(0,0,0,0.2) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * Track installation
     */
    trackInstallation() {
        // Track installation in localStorage
        localStorage.setItem('AN_app_installed', Date.now().toString());
        
        // Send to analytics if configured
        this.trackEvent('app_installed');
    }
    
    /**
     * Track event
     */
    trackEvent(eventName, data = {}) {
        // Simple event tracking
        const events = JSON.parse(localStorage.getItem('AN_events') || '[]');
        events.push({
            event: eventName,
            timestamp: Date.now(),
            data: data,
            userAgent: navigator.userAgent,
            platform: navigator.platform
        });
        
        localStorage.setItem('AN_events', JSON.stringify(events.slice(-100))); // Keep last 100 events
        
        console.log(`PWA: Event tracked: ${eventName}`, data);
        
        // Send to server if configured
        // this.sendAnalytics(eventName, data);
    }
    
    /**
     * Check if app is installed
     */
    isAppInstalled() {
        return localStorage.getItem('AN_app_installed') !== null ||
               window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone === true;
    }
    
    /**
     * Get PWA status
     */
    getStatus() {
        return {
            installed: this.isAppInstalled(),
            updateAvailable: this.updateAvailable,
            notificationPermission: this.notificationPermission,
            serviceWorker: !!this.registration,
            displayMode: this.getDisplayMode()
        };
    }
    
    /**
     * Get display mode
     */
    getDisplayMode() {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return 'standalone';
        } else if (window.matchMedia('(display-mode: fullscreen)').matches) {
            return 'fullscreen';
        } else if (window.matchMedia('(display-mode: minimal-ui)').matches) {
            return 'minimal-ui';
        } else {
            return 'browser';
        }
    }
}

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if not already initialized
    if (!window.AN_PWA) {
        window.AN_PWA = new PWAInstaller();
        
        // Make available globally
        console.log('PWA: Initialized');
        
        // Check for updates on page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && window.AN_PWA.registration) {
                window.AN_PWA.registration.update();
            }
        });
    }
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PWAInstaller;
}