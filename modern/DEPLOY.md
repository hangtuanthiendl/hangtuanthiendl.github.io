# Deployment Guide - Modern Portfolio

This guide will help you deploy your new modern portfolio website.

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Modern portfolio design"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select source: "Deploy from a branch"
   - Choose branch: "main"
   - Folder: "/ (root)" or specify `/modern` if you want to keep both versions

3. **Custom Domain (Optional)**
   - Add a `CNAME` file with your domain name
   - Update DNS settings with your domain provider

### Option 2: Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: (leave empty for static site)
   - Publish directory: `modern` (if using subdirectory)

3. **Deploy**
   - Site will auto-deploy on every push to main branch

### Option 3: Vercel

1. **Import Project**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository

2. **Configure**
   - Framework: "Other"
   - Root directory: `modern` (if using subdirectory)

3. **Deploy**
   - Automatic deployments on every push

## 📁 File Organization

### Current Structure
```
your-repo/
├── index.html          # Original portfolio
├── modern/            # New modern portfolio
│   ├── index.html
│   ├── css/modern.css
│   ├── js/modern.js
│   └── assets/
└── other-files...
```

### Recommended: Move Modern to Root
If you want the modern version as your main site:

1. **Backup Original**
   ```bash
   mkdir backup
   mv index.html backup/
   mv css/ backup/
   mv js/ backup/
   mv images/ backup/
   ```

2. **Move Modern to Root**
   ```bash
   mv modern/* .
   mv modern/.[^.]* . # Move hidden files
   rmdir modern
   ```

3. **Update Paths**
   - Update image paths in HTML if needed
   - Test all links and resources

## 🔧 Customization Before Deploy

### 1. Personal Information
Update in `index.html`:
- Name and title
- Contact information  
- Social media links
- Professional summary

### 2. Profile Images
Add your photos to `assets/images/`:
- `profile.jpg` - Main profile photo (400x400px recommended)
- Optimize images for web (use tools like TinyPNG)

### 3. Resume/CV
- Add your resume PDF to `assets/resume.pdf`
- Update download links in HTML

### 4. Contact Form
The contact form currently shows a success message without sending emails. To make it functional:

**Option A: Netlify Forms**
Add `netlify` attribute to form tag:
```html
<form id="contactForm" class="form" netlify>
```

**Option B: Formspree**
Update form action:
```html
<form id="contactForm" class="form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option C: EmailJS**
Add EmailJS integration in JavaScript.

### 5. Analytics
Add Google Analytics to `index.html` before closing `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎨 Design Customization

### Colors
Update CSS custom properties in `css/modern.css`:
```css
:root {
    --primary-color: #2563EB;     /* Your brand color */
    --secondary-color: #10B981;   /* Accent color */
    --text-primary: #111827;      /* Dark text */
    /* ... other colors */
}
```

### Fonts
Current fonts: Inter (primary) and JetBrains Mono (code)
To change fonts, update Google Fonts link and CSS variables.

### Layout
- Modify CSS Grid and Flexbox layouts
- Adjust spacing using CSS custom properties
- Update breakpoints for different responsive behavior

## 🔍 SEO Optimization

### Meta Tags
Update in `<head>` section:
```html
<title>Your Name | Your Title</title>
<meta name="description" content="Your professional description">
<meta name="keywords" content="your,keywords,here">
```

### Open Graph (Social Sharing)
Add these meta tags:
```html
<meta property="og:title" content="Your Name | Your Title">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://yoursite.com/assets/images/og-image.jpg">
<meta property="og:url" content="https://yoursite.com">
```

### Structured Data
Add JSON-LD structured data for better SEO:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "jobTitle": "Your Job Title",
  "url": "https://yoursite.com"
}
</script>
```

## 📈 Performance Optimization

### Images
- Compress all images
- Use WebP format for better compression
- Add proper alt text for accessibility

### CSS & JavaScript
- Files are already optimized
- Consider minification for production:
  ```bash
  # Install tools
  npm install -g csso-cli terser
  
  # Minify CSS
  csso css/modern.css --output css/modern.min.css
  
  # Minify JavaScript
  terser js/modern.js --compress --mangle --output js/modern.min.js
  ```

### CDN Resources
Current external resources:
- Google Fonts (optimized loading)
- Lucide Icons (lightweight)
- Chart.js (only if needed)

## 🧪 Testing Before Deploy

### Local Testing
```bash
# Option 1: Simple HTTP server
npx serve .

# Option 2: Live server with hot reload
npx live-server --port=3000

# Option 3: Python (if you have Python installed)
python -m http.server 8000
```

### Accessibility Testing
- Use WAVE browser extension
- Check color contrast ratios
- Test keyboard navigation
- Verify alt text on images

### Performance Testing
- Run Lighthouse in Chrome DevTools
- Test on mobile devices
- Check loading speed on slow connections

### Cross-Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security Considerations

### Content Security Policy
Add to `.htaccess` or server configuration:
```
Content-Security-Policy: default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com
```

### HTTPS
Ensure your site is served over HTTPS:
- GitHub Pages provides HTTPS automatically
- Netlify and Vercel provide HTTPS by default
- For custom hosting, use Let's Encrypt

## 📊 Monitoring & Analytics

### Google Analytics 4
Set up goals for:
- Contact form submissions
- CV downloads
- External link clicks
- Time spent on site

### Google Search Console
- Verify your domain
- Submit sitemap
- Monitor search performance

### Performance Monitoring
Consider tools like:
- Google PageSpeed Insights
- WebPageTest
- GTmetrix

## 🚀 Go Live Checklist

Before going live, ensure:

- [ ] All personal information is updated
- [ ] Images are optimized and uploaded
- [ ] Contact form is functional
- [ ] All links work correctly
- [ ] Site is responsive on all devices
- [ ] SEO meta tags are configured
- [ ] Analytics tracking is set up
- [ ] HTTPS is enabled
- [ ] Custom domain is configured (if applicable)
- [ ] Site speed is optimized (Lighthouse score 90+)
- [ ] Accessibility requirements are met

## 🎯 Post-Launch

### Marketing
- Update LinkedIn profile with new portfolio link
- Share on social media
- Update email signature
- Add to business cards

### Maintenance
- Regular content updates
- Monitor analytics
- Update dependencies
- Backup regularly

---

**Need Help?** 
Contact me at me@thienhang.com for any deployment assistance.

Good luck with your modern portfolio launch! 🚀
