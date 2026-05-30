# ALTITUDE - Peak Performance Landing Page

A modern, high-performance landing page built with Next.js, React, Framer Motion, and Tailwind CSS.

## Features

✨ **Scroll-Triggered Animations** - Dynamic frame sequencing synchronized with scroll progress  
🎨 **Glassmorphism Design** - Modern UI with backdrop blur effects  
📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop  
⚡ **High Performance** - Image preloading and optimized animations  
🎯 **Smooth Navigation** - Anchor links with smooth scroll behavior  

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/aiuser8899o-art/altitude.git
cd altitude

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
altitude/
├── pages/
│   └── index.tsx          # Main landing page component
├── public/
│   └── images/
│       └── sequence/      # Frame images for scroll animation (frame_001.jpg, frame_002.jpg, etc.)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## Setting Up Frame Images

1. Create a `public/images/sequence/` directory
2. Add your 120 frame images as `frame_001.jpg`, `frame_002.jpg`, ... `frame_120.jpg`
3. Update the `TOTAL_FRAMES` variable in `pages/index.tsx` if using a different number of frames

## Customization

### Changing the Frame Count

Edit `pages/index.tsx`:
```typescript
const TOTAL_FRAMES = 120; // Change this to your actual frame count
```

### Modifying Colors & Styles

All styling uses Tailwind CSS. Edit the className attributes in `pages/index.tsx` or update `tailwind.config.js` for theme customization.

## Technologies Used

- **Next.js** - React framework for production
- **React** - UI library
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on GitHub.
