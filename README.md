# 🏛️ Monastery360 - Sikkim Buddhist Heritage Platform

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180.0-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

> **A digital platform for exploring Sikkim's Buddhist monasteries through immersive technology**

## 🎯 SIH 2025 Project Details

- **Problem Statement ID**: SIH25061
- **Team**: HORIZON
- **Theme**: Travel and Tourism

## 🌟 Core Features

- **12+ Monasteries**: Interactive database with district-wise exploration
- **Leaflet Maps**: Custom markers with district color coding and real-time geolocation
- **Three.js 360° Panoramas**: Immersive virtual monastery tours
- **Google Street View**: Surroundings exploration with touch controls
- **n8n AI Chatbot**: Intelligent monastery guidance with cultural context
- **Multilingual Audio**: 5-language support (English, Hindi, Nepali, Lepcha, Sikkimese)
- **Festival Calendar**: Buddhist celebrations and visiting guidelines
- **PWA Support**: Offline access and mobile optimization

## 🏗️ Tech Stack

```
Frontend: React 18.3.1 + TypeScript 5.8.3 + Vite 5.4.19
UI: Tailwind CSS 3.4.17 + Radix UI + shadcn/ui
Maps: Leaflet.js 1.9.4 + React Leaflet 4.2.1
3D: Three.js 0.180.0 (360° panorama viewer)
APIs: Google Maps JavaScript API, Street View Static API
Charts: Recharts 2.15.4 (data visualization)
Chatbot: @n8n/chat 0.50.0 (AI workflows)
State: TanStack Query 5.83.0
Forms: React Hook Form 7.61.1 + Zod 3.25.76
PWA: Vite PWA Plugin 1.0.3
```

## 📁 Project Structure

```
src/
├── components/
│   ├── RealSikkimMap.tsx         # Leaflet interactive maps
│   ├── ThreePanoramaViewer.tsx   # Three.js 360° panorama viewer
│   ├── StreetView360.tsx         # Google Street View integration
│   ├── ChatPopup.tsx             # n8n chatbot interface
│   └── ui/                       # shadcn/ui components
├── pages/
│   ├── Home.tsx                  # Landing page
│   ├── Map.tsx                   # Interactive map view
│   ├── Monasteries.tsx           # Monastery listing
│   ├── MonasteryDetail.tsx       # Individual monastery pages
│   └── Calendar.tsx              # Festival calendar
├── data/
│   └── monasteries.ts            # Monastery database
├── hooks/
│   ├── useWeather.ts             # Weather API integration
│   └── use-mobile.tsx            # Mobile detection
└── assets/
    ├── images/                   # Monastery photos
    ├── audio/                    # Multilingual guides
    └── panoramas/                # 360° panorama images
```

## 🔧 Environment Setup

Create `.env` file:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.cloud/webhook/your-id/chat
```

### Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable APIs: Maps JavaScript API, Street View Static API
3. Create API Key with domain restrictions
4. Add key to `.env` file

### n8n Chatbot Setup

1. Create account at [n8n.cloud](https://n8n.cloud)
2. Create workflow with monastery knowledge base
3. Configure webhook endpoint

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/Sanket-Bharadwaj/Monastery360.git
cd Monastery360

# Install dependencies
npm install

# Install specific packages for monastery features
npm install @n8n/chat
npm install react-leaflet@4.2.1
npm install three@0.180.0
npm install leaflet@1.9.4

# Start development server
npm run dev

# Open browser
http://localhost:8080
```

## 🗺️ Leaflet Maps

Interactive mapping system with:

- Custom monastery markers with district color coding
- Real-time geolocation and precise coordinates
- Enhanced popups with monastery information
- District-wise visualization (East, West, North, South)

## 🌐 Three.js Panorama Viewer

360° immersive monastery experience featuring:

- High-resolution panorama photography
- Interactive virtual tours with touch controls
- WebGL-powered smooth rendering
- Mobile-responsive navigation

## 🤖 n8n Chatbot Integration

AI-powered monastery guidance system:

- Cultural context and Buddhist knowledge
- Monastery recommendations and visiting information
- Multi-language support
- Real-time assistance via webhook integration

## 🌐 PWA Features

- **Offline Access**: Core functionality without internet
- **Service Worker**: Smart caching for maps and images
- **Mobile Optimization**: Touch-friendly interface

<div align="center">

**🏛️ Preserving Sikkim's Sacred Heritage Through Technology 🏛️**

_Built with ❤️ by Team HORIZON for SIH 2025_

</div>
