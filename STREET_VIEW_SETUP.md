# 360° Street View Integration Guide

## Overview

This guide explains how to set up and use the 360° Street View integration for monastery locations in your React website.

## Features Implemented

### 1. Google Street View Integration

- **Component**: `StreetView360.tsx`
- **Features**:
  - Interactive Google Street View panoramas
  - Automatic fallback for locations without Street View coverage
  - Lazy loading (loads only when user clicks "Load Street View")
  - Full navigation controls (pan, tilt, zoom)
  - Reset view functionality

### 2. Three.js Panorama Viewer

- **Component**: `ThreePanoramaViewer.tsx`
- **Features**:
  - Custom 360° panorama viewer using Three.js
  - Mouse drag to look around
  - Scroll to zoom
  - Fullscreen mode
  - Works with any 360° image

## Setup Instructions

### 1. Install Dependencies

```bash
npm install three @types/three @googlemaps/js-api-loader @types/google.maps
```

### 2. Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Street View Static API
4. Create API key and restrict it to your domain
5. Copy the API key to your environment file

### 3. Environment Configuration

Create a `.env` file in your project root:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 4. Add 360° Images

For the Three.js panorama viewer, you can use:

- Equirectangular 360° photos (2:1 aspect ratio)
- Recommended resolution: 4096x2048 or higher
- Supported formats: JPG, PNG, WebP

Place your panorama images in `/public/images/panoramas/` and update the monastery data:

```typescript
images: {
  hero: monasteryImage,
  gallery: [monasteryImage],
  panorama: '/images/panoramas/monastery-name-360.jpg',
},
```

## How It Works

### Google Street View

1. When user clicks "Load Street View", the component:
   - Loads Google Maps JavaScript API
   - Creates a Street View panorama instance
   - Searches for Street View imagery within 1km radius
   - Displays the closest available Street View or shows "not available" message

### Three.js Panorama

1. Loads the 360° image as a texture
2. Maps it to the inside of a sphere geometry
3. Places camera at center of sphere
4. Handles mouse interactions for navigation

## Usage in Components

### In MonasteryDetail Page

```tsx
import StreetView360 from '@/components/StreetView360';
import ThreePanoramaViewer from '@/components/ThreePanoramaViewer';

// In your component:
<StreetView360
  latitude={monastery.latitude}
  longitude={monastery.longitude}
  name={monastery.name}
  className="w-full"
/>

<ThreePanoramaViewer
  imageUrl={monastery.images.panorama || monastery.images.hero}
  title={monastery.name}
  className="w-full"
/>
```

## API Rate Limits & Costs

### Google Street View

- **Free tier**: 25,000 requests per month
- **Pricing**: $7 per 1,000 requests after free tier
- **Optimization**: Lazy loading reduces unnecessary API calls

### Best Practices

1. Always use lazy loading for Street View
2. Implement error handling for unavailable locations
3. Cache API responses when possible
4. Monitor usage in Google Cloud Console

## Troubleshooting

### Common Issues

1. **"Google Maps API key not configured"**

   - Check if `.env` file exists and contains the API key
   - Verify the environment variable name: `VITE_GOOGLE_MAPS_API_KEY`

2. **"Street View not available"**

   - Some remote monasteries may not have Street View coverage
   - The component automatically handles this with a fallback message

3. **Three.js panorama not loading**

   - Check if the image URL is correct and accessible
   - Verify image format (should be equirectangular 360°)
   - Check browser console for CORS or loading errors

4. **TypeScript errors**
   - Ensure all type packages are installed: `@types/three`, `@types/google.maps`
   - Restart your development server after installing new packages

## File Structure

```
src/
├── components/
│   ├── StreetView360.tsx          # Google Street View component
│   ├── ThreePanoramaViewer.tsx    # Three.js panorama viewer
├── pages/
│   └── MonasteryDetail.tsx        # Uses both components
└── data/
    └── monasteries.ts             # Updated with panorama URLs
```

## Alternative Solutions

If Google Street View costs are a concern, consider:

1. **Mapbox Street View** - Alternative street view service
2. **Custom 360° Photography** - Commission or capture your own 360° photos
3. **Drone Photography** - Aerial 360° views of monastery locations
4. **Virtual Tours** - Full virtual tour platforms like Matterport

## Future Enhancements

1. **Audio Integration**: Add spatial audio to panorama viewers
2. **Hotspots**: Interactive points of interest in 360° views
3. **VR Support**: WebXR integration for VR headsets
4. **Offline Support**: Cache panorama images for PWA offline use
5. **Admin Panel**: Easy upload and management of 360° images
