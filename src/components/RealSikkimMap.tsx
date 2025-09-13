import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { monasteries } from '@/data/monasteries';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RealSikkimMapProps {
  selectedDistrict: string;
  onMarkerClick: (monastery: any) => void;
  className?: string;
  userLocation?: { latitude: number; longitude: number } | null;
}

export function RealSikkimMap({ selectedDistrict, onMarkerClick, className = "", userLocation }: RealSikkimMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  
  // State for legend visibility
  const [isLegendVisible, setIsLegendVisible] = useState(true);

  // Toggle legend visibility
  const toggleLegend = () => {
    setIsLegendVisible(prev => !prev);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map with Sikkim-focused view
    const map = L.map(mapRef.current, {
      center: [27.3389, 88.6139], // Center of Sikkim
      zoom: 11, // Increased zoom for better Sikkim focus
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      maxZoom: 15,
      minZoom: 9, // Prevent zooming out too far from Sikkim
    });

    // Add OpenStreetMap tiles with custom attribution
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap | Sikkim Buddhist Heritage',
      maxZoom: 18,
    }).addTo(map);

    // More detailed Sikkim boundary
    const sikkimBounds: [number, number][] = [
      [28.1276, 88.0626], // Nathu La Pass area
      [28.0900, 88.9200], // Northeast border
      [27.9500, 88.9100], // East Sikkim
      [27.8000, 88.8500], // Southeast
      [27.1600, 88.7500], // South border
      [27.0800, 88.3000], // Southwest
      [27.2000, 88.0500], // West border
      [27.4500, 88.0300], // Northwest
      [27.8000, 88.1000], // North
      [28.1276, 88.0626], // Close polygon back to start
    ];

    // Add prominent Sikkim boundary
    const sikkimPolygon = L.polygon(sikkimBounds, {
      color: '#8B4513', // Buddhist brown
      weight: 3,
      opacity: 0.9,
      fillColor: '#FFF8DC', // Warm monastery color
      fillOpacity: 0.15,
      dashArray: '5, 5', // Dashed border for sacred feel
    }).addTo(map);

    // Add a label for Sikkim
    const sikkimCenter = [27.5, 88.5];
    L.marker(sikkimCenter, {
      icon: L.divIcon({
        className: 'sikkim-label',
        html: `
          <div style="
            background: rgba(139, 69, 19, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-family: serif;
            font-weight: bold;
            font-size: 12px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            border: 1px solid #654321;
          ">
            སུ་ཁིམ་<br/>SIKKIM<br/>
            <span style="font-size: 10px;">Buddhist Heritage Land</span>
          </div>
        `,
        iconSize: [120, 50],
        iconAnchor: [60, 25],
      })
    }).addTo(map);

    // Set initial view to fit Sikkim perfectly
    map.fitBounds(sikkimPolygon.getBounds(), { padding: [20, 20] });

    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Filter monasteries by district
    const filteredMonasteries = selectedDistrict === 'All' 
      ? monasteries 
      : monasteries.filter(m => m.district === selectedDistrict);

    // Create enhanced monastery icon
    const monasteryIcon = L.divIcon({
      className: 'monastery-marker',
      html: `
        <div class="monastery-marker-inner" style="
          background: linear-gradient(135deg, #DAA520, #B8860B);
          border: 2px solid #8B4513;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
        ">
          <div class="monastery-marker-icon" style="
            font-size: 18px;
            line-height: 1;
            filter: drop-shadow(0 1px 1px rgba(0,0,0,0.5));
          ">🏛️</div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });

    // Add district color coding
    const districtColors = {
      'East': '#FF6B6B',
      'West': '#4ECDC4', 
      'North': '#45B7D1',
      'South': '#96CEB4'
    };

    // Add markers for filtered monasteries
    filteredMonasteries.forEach(monastery => {
      const districtColor = districtColors[monastery.district as keyof typeof districtColors] || '#DAA520';
      
      const enhancedIcon = L.divIcon({
        className: 'monastery-marker',
        html: `
          <div class="monastery-marker-inner" style="
            background: linear-gradient(135deg, ${districtColor}, ${districtColor}CC);
            border: 3px solid #8B4513;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            position: relative;
          ">
            <div class="monastery-marker-icon" style="
              font-size: 20px;
              line-height: 1;
              filter: drop-shadow(0 1px 2px rgba(0,0,0,0.7));
            ">🏛️</div>
            <div style="
              position: absolute;
              bottom: -25px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(139, 69, 19, 0.9);
              color: white;
              padding: 2px 6px;
              border-radius: 3px;
              font-size: 10px;
              font-weight: bold;
              white-space: nowrap;
              box-shadow: 0 1px 3px rgba(0,0,0,0.3);
              display: none;
            " class="monastery-label">${monastery.name}</div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([monastery.latitude, monastery.longitude], {
        icon: enhancedIcon,
      });

      marker.on('click', () => {
        onMarkerClick(monastery);
      });

      // Enhanced popup with monastery info
      marker.bindPopup(`
        <div class="monastery-popup" style="
          font-family: 'Crimson Text', serif;
          max-width: 280px;
        ">
          <div style="
            background: linear-gradient(135deg, #8B4513, #A0522D);
            color: white;
            padding: 8px 12px;
            margin: -8px -12px 8px -12px;
            font-weight: bold;
            font-size: 16px;
            border-radius: 4px 4px 0 0;
          ">
            🏛️ ${monastery.name}
          </div>
          
          <div style="padding: 4px 0;">
            <div style="
              display: flex;
              justify-content: space-between;
              margin-bottom: 6px;
              font-size: 12px;
              color: #666;
            ">
              <span style="
                background: ${districtColors[monastery.district as keyof typeof districtColors] || '#DAA520'};
                color: white;
                padding: 2px 6px;
                border-radius: 10px;
                font-weight: bold;
              ">${monastery.district} District</span>
              <span style="font-style: italic;">${monastery.sect}</span>
            </div>
            
            <p style="
              font-size: 13px;
              line-height: 1.4;
              margin: 8px 0;
              color: #333;
            ">${monastery.summary}</p>
            
            <div style="
              border-top: 1px solid #eee;
              padding-top: 6px;
              font-size: 11px;
              color: #666;
            ">
              <div style="margin: 2px 0;">📍 ${monastery.nearestTown}</div>
              <div style="margin: 2px 0;">⛰️ ${monastery.elevation}m elevation</div>
              <div style="margin: 2px 0;">📅 Founded ${monastery.founded}</div>
              <div style="margin: 4px 0; font-style: italic;">🕉️ ${monastery.bestTimeToVisit}</div>
            </div>
          </div>
        </div>
      `, {
        maxWidth: 300,
        className: 'monastery-popup-container',
        closeButton: true,
        autoClose: false,
      });

      marker.addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });

    // Fit map to show all markers if any
    if (filteredMonasteries.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [selectedDistrict, onMarkerClick]);

  // Handle user location marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove existing user marker
    if (userMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    // Add user location marker if location is available
    if (userLocation) {
      console.log('Adding user location marker:', userLocation); // Debug log
      
      const userLocationIcon = L.divIcon({
        className: 'user-location-marker',
        html: `
          <div style="
            position: relative;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <!-- Pulsing circle animation -->
            <div class="pulse-outer" style="
              position: absolute;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: rgba(59, 130, 246, 0.3);
              animation: pulse-animation 2s infinite;
            "></div>
            <div class="pulse-inner" style="
              position: absolute;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: rgba(59, 130, 246, 0.5);
              animation: pulse-animation 2s infinite 0.5s;
            "></div>
            <!-- Center dot -->
            <div style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #3B82F6;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              z-index: 1000;
              position: relative;
            "></div>
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -25],
      });

      // Add the CSS animation to the document head if not already added
      if (!document.getElementById('user-location-styles')) {
        const style = document.createElement('style');
        style.id = 'user-location-styles';
        style.textContent = `
          @keyframes pulse-animation {
            0% {
              transform: scale(0.5);
              opacity: 1;
            }
            100% {
              transform: scale(1.2);
              opacity: 0;
            }
          }
          .user-location-marker {
            z-index: 1000 !important;
          }
        `;
        document.head.appendChild(style);
      }

      const userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
        icon: userLocationIcon,
        zIndexOffset: 1000, // Ensure it appears above other markers
      });

      userMarker.bindPopup(`
        <div style="
          font-family: 'Crimson Text', serif;
          text-align: center;
          max-width: 200px;
        ">
          <div style="
            background: linear-gradient(135deg, #3B82F6, #1D4ED8);
            color: white;
            padding: 8px 12px;
            margin: -8px -12px 8px -12px;
            font-weight: bold;
            font-size: 16px;
            border-radius: 4px 4px 0 0;
          ">
            📍 Your Location
          </div>
          
          <div style="padding: 8px 4px;">
            <p style="
              font-size: 13px;
              margin: 4px 0;
              color: #333;
              font-weight: 600;
            ">You are currently here!</p>
            
            <div style="
              font-size: 11px;
              color: #666;
              border-top: 1px solid #eee;
              padding-top: 6px;
              margin-top: 8px;
            ">
              <div>Lat: ${userLocation.latitude.toFixed(6)}</div>
              <div>Lng: ${userLocation.longitude.toFixed(6)}</div>
            </div>
            
            <div style="
              margin-top: 8px;
              padding: 4px 8px;
              background: rgba(59, 130, 246, 0.1);
              border-radius: 4px;
              font-size: 10px;
              color: #3B82F6;
              font-weight: 600;
            ">
              🌟 Live Location Detected
            </div>
          </div>
        </div>
      `, {
        maxWidth: 250,
        className: 'user-location-popup',
        closeButton: true,
        autoClose: false,
      });

      userMarker.addTo(mapInstanceRef.current);
      userMarkerRef.current = userMarker;

      console.log('User location marker added successfully'); // Debug log
    }
  }, [userLocation]);

  return (
    <div className={`relative sikkim-map-container ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-[500px] lg:h-[600px] rounded-lg border border-border"
        style={{ minHeight: '400px' }}
      />
      
      {/* Toggle Button for District Legend */}
      <div className="district-legend-toggle">
        <button
          onClick={toggleLegend}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(139, 69, 19, 0.9)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            zIndex: 1001,
            transition: 'all 0.2s ease',
          }}
          className="legend-toggle-btn"
        >
          🏛️ Districts {isLegendVisible ? '▼' : '▶'}
        </button>
        
        {/* District Legend Box */}
        {isLegendVisible && (
          <div className="district-legend" style={{ top: '50px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '12px', textAlign: 'center' }}>
              🏛️ Monastery Districts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Object.entries({
                'East': '#FF6B6B',
                'West': '#4ECDC4', 
                'North': '#45B7D1',
                'South': '#96CEB4'
              }).map(([district, color]) => (
                <div 
                  key={district}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    padding: '3px 0',
                  }}
                >
                  <div style={{ 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: color,
                    boxShadow: `0 0 4px ${color}50`
                  }}></div>
                  <span style={{ 
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#2c3e50'
                  }}>
                    {district} Sikkim
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}