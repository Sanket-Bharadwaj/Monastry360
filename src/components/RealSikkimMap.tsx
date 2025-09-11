import { useEffect, useRef } from 'react';
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
}

export function RealSikkimMap({ selectedDistrict, onMarkerClick, className = "" }: RealSikkimMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [27.3389, 88.6139], // Center of Sikkim
      zoom: 10,
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Sikkim boundary (approximate)
    const sikkimBounds: [number, number][] = [
      [28.0728, 88.0626], // Northwest
      [28.0728, 88.9063], // Northeast  
      [27.0449, 88.9063], // Southeast
      [27.0449, 88.0626], // Southwest
      [28.0728, 88.0626], // Close polygon
    ];

    // Add Sikkim boundary
    L.polygon(sikkimBounds, {
      color: 'hsl(var(--primary))',
      weight: 2,
      opacity: 0.8,
      fillColor: 'hsl(var(--primary))',
      fillOpacity: 0.1,
    }).addTo(map);

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

    // Create custom icon
    const monasteryIcon = L.divIcon({
      className: 'monastery-marker',
      html: `
        <div class="monastery-marker-inner">
          <div class="monastery-marker-icon">🏛️</div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add markers for filtered monasteries
    filteredMonasteries.forEach(monastery => {
      const marker = L.marker([monastery.latitude, monastery.longitude], {
        icon: monasteryIcon,
      });

      marker.on('click', () => {
        onMarkerClick(monastery);
      });

      // Add popup with monastery info
      marker.bindPopup(`
        <div class="monastery-popup">
          <h3 class="font-serif font-bold text-sm mb-1">${monastery.name}</h3>
          <p class="text-xs text-gray-600 mb-2">${monastery.district} District • ${monastery.sect}</p>
          <p class="text-xs mb-2">${monastery.summary}</p>
          <div class="text-xs text-gray-500">
            <div>📍 ${monastery.nearestTown}</div>
            <div>⛰️ ${monastery.elevation}m</div>
            <div>📅 Founded ${monastery.founded}</div>
          </div>
        </div>
      `, {
        maxWidth: 250,
        className: 'monastery-popup-container'
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

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-[500px] lg:h-[600px] rounded-lg border border-border"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}