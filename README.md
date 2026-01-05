# Trend Clone Landing Page

A modern, responsive landing page for the Trend Clone mobile app. Built with vanilla HTML, CSS, and JavaScript, optimized for static hosting.

## Overview

Trend Clone is an AI-powered app that lets users put themselves into the internet's trendiest videos. This landing page showcases the app's features, screenshots, and provides download links for iOS and Android.

## Features

- **Modern Dark Theme**: Dark background with neon green accents matching the app's design
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Interactive Lightbox**: Full-screen screenshot viewer with keyboard navigation
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Accessible**: ARIA labels and proper heading hierarchy

## File Structure

```
TrendClone-lending/
├── index.html              # Main landing page
├── css/
│   └── style.css           # All styles (responsive, animations)
├── js/
│   └── main.js             # Interactive features
├── images/
│   ├── screenshots/        # App screenshots
│   ├── icons/              # App icons, badges
│   └── logo/               # App logo
└── README.md               # This file
```

## Setup

1. Clone or download this repository
2. Open `index.html` in a web browser
3. For local development, you can use a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Adding Screenshots

Place your app screenshots in the `images/screenshots/` directory with the following names:

- `history.jpg` - History screen showing generated video clones
- `motion-library.jpg` - Motion Library with trending videos
- `create-clone.jpg` - Create Clone interface
- `result.jpg` - Generated video result

The images should be optimized for web (recommended: WebP format with JPG fallback, max width 1200px).

## Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --bg-primary: #0a0a0a;
    --bg-secondary: #1a1a1a;
    --accent-primary: #00ff88;
    --accent-secondary: #00cc6a;
    --text-primary: #ffffff;
    --star-color: #ffd700;
}
```

### App Store Links

Update the download badge links in `index.html`:

```html
<a href="YOUR_APP_STORE_URL" class="download-badge">
<a href="YOUR_GOOGLE_PLAY_URL" class="download-badge">
```

### Social Media Links

Update social media links in the footer section of `index.html`.

## Deployment

### Netlify

1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your Git repository to Netlify

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### GitHub Pages

1. Push the project to a GitHub repository
2. Go to Settings > Pages
3. Select the main branch and `/root` directory
4. Save and wait for deployment

### Other Static Hosts

Any static hosting service will work:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Cloudflare Pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Images are lazy-loaded for better performance
- CSS and JavaScript are optimized
- Uses modern CSS features with fallbacks
- Minimal dependencies (only Google Fonts)

## License

This project is created for Trend Clone app. All rights reserved.

## Contact

For questions or issues, please contact the Trend Clone team.

