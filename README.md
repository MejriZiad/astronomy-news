# Astronomy News - Astronomy News PWA

Astronomy News is a Progressive Web Application (PWA) that delivers the latest astronomy news, missions, gallery images, and educational content in a multi-language, multi-page format.

## 🌟 Features

### Core Features
- **Multi-Page Application (MPA)** with 6 main sections
  - Homepage with featured content
  - News section with global/local filtering
  - Space missions database
  - Astronomy gallery with modal view
  - Educational articles
  - About page with team info

### PWA Capabilities
- 📱 **Installable** on mobile/desktop devices
- 🔄 **Offline functionality** with Service Worker
- 🔔 **Push notifications** for breaking news
- ⚡ **Fast loading** with intelligent caching
- 📲 **Responsive design** across all devices

### Technical Features
- 🌐 **Multi-language support** (English, French, Arabic)
- 🌗 **Dark/Light theme** with OS preference detection
- 📊 **Real-time data processing** from multiple sources
- 🔍 **Search & filter capabilities**
- 📈 **Performance optimized** for astronomy images

## 📁 Project Structure

```
astronomy-news/
├── index.html                    # Homepage
├── AN_news.html                 # News page
├── AN_missions.html             # Missions page
├── AN_gallery.html              # Gallery page
├── AN_explore.html              # Explore page
├── AN_about.html                # About page
├── main.css                     # Main stylesheet
├── manifest.json                # PWA manifest
├── sw.js                        # Service Worker
├── pwa-main.js                  # PWA installation & updates
├── netlify.toml                 # Netlify configuration
├── .gitignore                   # Git ignore file
├── data.js                      # Main data file
├── data_processing.js           # Data processing utilities
├── data_explore.js              # Explore section data
├── data_gallery.js              # Gallery data
├── data_about.js                # About section data
├── translation.js               # Translation system
├── assets/
│   ├── icons/                   # PWA icons (72x72, 96x96, etc.)
│   ├── images/                  # Content images
│   └── screenshots/             # PWA screenshots
└── README.md                    # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (for local development)
- Git
- Netlify CLI (optional)

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/nadhem000/astronomy-news.git
   cd astronomy-news
   ```

2. Serve locally using any static server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. Open `http://localhost:8000` in your browser

### Netlify Deployment
1. Push to GitHub repository
2. Connect repository to Netlify
3. Netlify will auto-deploy from the `main` branch
4. Configure custom domain (optional)

## ⚙️ Configuration

### Environment Variables
No environment variables required for basic deployment.

### Service Worker Configuration
- Caching strategy: Network First for HTML, Cache First for assets
- Cache version: Auto-updates when files change
- Offline fallback: Custom offline page

### PWA Settings
- App name: Astronomy News
- Short name: AstronomyNews
- Theme color: #4a6fa5 (light) / #64b5f6 (dark)
- Background color: #f8f9fa (light) / #121212 (dark)

## 🔧 Development

### Adding New Content
1. **News Articles**: Add to `data.js` in the `news` array
2. **Gallery Images**: Add to `data_gallery.js`
3. **Educational Content**: Add to `data_explore.js`
4. **Team Members**: Add to `data_about.js`

### Adding Translations
1. Edit `translation.js` to add new translation keys
2. Update HTML with `data-i18n` attributes
3. Add language in dropdown in header

### Testing PWA Features
1. Open Chrome DevTools → Application → Service Workers
2. Test offline mode by checking "Offline" in Network tab
3. Test install prompt by meeting PWA criteria

## 📱 PWA Installation

### Desktop
1. Click the install button (appears when criteria met)
2. Or use Chrome menu → "Install Astronomy News"

### Mobile
1. Open in Chrome/Safari
2. Tap "Add to Home Screen"
3. Follow prompts to install

## 🔔 Push Notifications

### Setup
1. Enable notifications when prompted
2. Subscribe to news categories
3. Receive breaking astronomy news

### Configuration
- News alerts: Every 6 hours
- Breaking news: Real-time
- Local events: Tunisia astronomy news

## 🎨 Customization

### Colors
Edit CSS variables in `main.css`:
```css
:root {
    --AN-primary-color: #4a6fa5;
    --AN-secondary-color: #166088;
    /* ... */
}
```

### Images
Replace icon files in `assets/icons/` with your own:
- 72x72, 96x96, 128x128, 152x152, 192x192, 384x384, 512x512

### Content
Edit data files for:
- News articles
- Gallery images
- Team information
- Educational content

## 📊 Performance

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- PWA: 100
- SEO: 100

### Optimization Features
- Image lazy loading
- CSS/JS minification (via Netlify)
- Service Worker caching
- Font optimization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Astronomy data sources: NASA, ESA, Space.com
- Icons: Font Awesome
- Fonts: Google Fonts
- PWA guidance: MDN Web Docs

## 📞 Support

For issues or questions:
1. Check [Issues](https://github.com/nadhem000/astronomy-news/issues)
2. Email: developer@astronomy-news.com
3. Twitter: @AstronomyNews

---

**Made with ❤️ by Mejri Ziad & the AstroMed Club**

*Exploring the universe, one pixel at a time.*