# Banner Images Setup Guide

## 📁 Image Directory Structure
```
public/
  └── images/
      ├── student-1.jpg       # Woman with tablet/laptop
      ├── student-2.jpg       # Woman with books
      └── course-thumbnail.jpg # UI/UX course image
```

## 🖼️ How to Add Real Images

### Step 1: Prepare Your Images
1. **Student 1 (Woman with tablet)**: 
   - Size: 400x300px (or similar ratio)
   - Shows a professional woman using a tablet or laptop
   - Background: Professional/educational setting

2. **Student 2 (Woman with books)**:
   - Size: 400x300px (or similar ratio) 
   - Shows a woman holding books or studying
   - Background: Library or study environment

3. **Course Thumbnail**:
   - Size: 300x200px (or similar ratio)
   - UI/UX design related image
   - Could be: design mockups, colorful UI elements, etc.

### Step 2: Add Images to Project
1. Download/prepare your images
2. Rename them to match the required filenames:
   - `student-1.jpg`
   - `student-2.jpg` 
   - `course-thumbnail.jpg`
3. Place them in: `public/images/` folder

### Step 3: Image Sources (Recommended)
- **Unsplash**: https://unsplash.com/
- **Pexels**: https://www.pexels.com/
- **Freepik**: https://www.freepik.com/
- **StockVault**: https://www.stockvault.net/

### Step 4: Search Keywords for Images
- "woman using tablet professional"
- "student studying with books"
- "ui ux design colorful interface"
- "woman learning online education"
- "professional woman technology"

## 🎨 Alternative: Use URLs Instead of Local Files

If you want to use external URLs instead of local files, you can:

1. Update the `src` attribute in the Banner component:
```tsx
<Image
  src="https://your-image-url.com/image.jpg"
  alt="Description"
  fill
  className="object-cover rounded-2xl"
/>
```

2. Configure Next.js to allow external images in `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-domain.com', 'another-domain.com'],
  },
}

module.exports = nextConfig
```

## 🔧 Troubleshooting

### If images don't load:
1. Check file paths are correct
2. Ensure images are in `public/images/` folder
3. Restart the development server
4. Check browser console for errors

### Image optimization:
- Use WebP format for better performance
- Compress images before adding
- Recommended max size: 500KB per image

## 📱 Responsive Considerations
The images will automatically:
- Scale properly on mobile devices
- Maintain aspect ratio
- Load optimally with Next.js Image component
- Show fallback placeholders if images fail to load

## 🎯 Current Fallback System
If images don't load, the component will show:
- Gradient backgrounds with icons
- Professional looking placeholders
- No broken image icons
