# 🚀 Dilusha Chamika - Personal Portfolio

**This is my personal portfolio website** - a cutting-edge, futuristic showcase of my web development skills featuring advanced UI/UX design, robotic-themed animations, and seamless user experience.

**Live Demo**: [dilusha.live](https://www.dilusha.live/)

---

> **Note**: This is my personal portfolio project. While you're welcome to explore the code and learn from it, this repository represents my individual work and achievements.

## ✨ Features

### 🎨 Design & UI/UX
- **Futuristic Robotic Theme**: Cyberpunk-inspired design with circuit board patterns and robotic animations
- **Dual Theme System**: Light and dark modes with smooth transitions
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Advanced Animations**: Framer Motion powered smooth transitions and micro-interactions
- **Hardware-inspired UI**: Circuit patterns, binary matrices, and robotic elements

### 🛠️ Technical Features
- **Performance Optimized**: WebP images, lazy loading, and code splitting
- **SEO Friendly**: Meta tags, structured data, and fast loading times
- **Contact Integration**: EmailJS powered contact form with validation
- **Image Management**: Cloudinary integration for optimized image delivery
- **Modern Build System**: Vite for lightning-fast development and builds

### 📱 Interactive Elements
- **Skills Modal**: Comprehensive technical skills showcase
- **Project Gallery**: Interactive project cards with image modals
- **Smooth Scrolling**: Custom navigation with section highlighting
- **Form Validation**: Real-time contact form validation and feedback
- **Mobile Menu**: Responsive navigation with smooth animations

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Next-generation frontend tooling for fast development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **Lucide React** - Beautiful & consistent icon toolkit

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic CSS vendor prefixing

### External Services
- **EmailJS** - Client-side email sending service
- **Vercel** - Deployment and hosting platform
- **Vercel Analytics** - Web analytics and insights

## ☁️ Cloudinary Upload Helper

Use the provided upload helper to upload images, PDFs, and documents to Cloudinary. The script automatically detects file types and handles them appropriately.

### Uploading Images (Profile Photos, Project Images)

1. Copy `.env.example` to `.env.local` and fill in `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
2. Upload your image:
   ```bash
   node scripts/uploadFile.js.js --profile-image-path="path/to/your/image.jpg" --public-id="unique_name"
   ```
3. Copy the printed `secure_url` into your code or `.env.local` (for profile photo, use `VITE_PROFILE_PHOTO_URL`).
4. Restart the dev server to see your updated image.

### Uploading PDFs and Documents

The script automatically detects PDFs and documents (`.pdf`, `.doc`, `.docx`, `.txt`, `.zip`) and uploads them with the correct resource type:

```bash
node scripts/uploadFile.js.js --profile-image-path="path/to/report.pdf" --public-id="project_report"
```

The script will output a URL like:
```
https://res.cloudinary.com/yourcloud/raw/upload/v123456/project_report.pdf
```

- Preview: `https://drive.google.com/file/d/FILE_ID/preview`

### Available Flags

- `--profile-image-path="path/to/file"` - Path to the file (required)
- `--public-id="custom_name"` - Custom identifier for the file
- `--folder="folder/path"` - Organize files in folders
- `--quality=80` - Image quality (images only, omit for auto)
- `--format=webp` - Output format (images only, omit for auto)

### Examples

**Upload profile photo:**
```bash
node scripts/uploadFile.js.js --profile-image-path="public/images/profile.jpg" --public-id="dilusha_profile"
```

**Upload project PDF:**
```bash
node scripts/uploadFile.js.js --profile-image-path="docs/report.pdf" --public-id="am_receiver_report" --folder="projects/reports"
```

**Upload project image with custom quality:**
```bash
node scripts/uploadFile.js.js --profile-image-path="images/project.png" --public-id="gymsync_screenshot" --quality=90
```

### Notes

- Rerunning with the same `--public-id` overwrites the existing file while keeping the URL stable
- PDFs and documents automatically use `resource_type: 'raw'` for proper handling
- Images use `resource_type: 'image'` with optional quality/format optimization
- All uploads require valid Cloudinary credentials in `.env.local`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Dilusha Chamika**
- **Email**: dilushachamika@gmail.com
- **LinkedIn**: [linkedin.com/in/dilusha-chamika](https://www.linkedin.com/in/dilusha-chamika/)
- **GitHub**: [github.com/it23782518](https://github.com/it23782518)
- **Portfolio**: [dilusha.live](https://www.dilusha.live/)

---

**Built by Dilusha Chamika**
*Showcasing my journey in web development and robotics*

node scripts/uploadFile.js.js --profile-image-path="public/images/profile (2).jpg"