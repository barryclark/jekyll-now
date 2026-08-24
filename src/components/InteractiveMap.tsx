import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Create custom heart-shaped marker
const createHeartIcon = () => {
  return L.divIcon({
    className: 'custom-heart-marker',
    html: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

interface PhotoLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  photos: string[];
}

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
}

export function InteractiveMap({ center = [37, -82], zoom = 5 }: InteractiveMapProps) {
  const [locations, setLocations] = useState<PhotoLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<PhotoLocation | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load photo locations
    fetch('/photos.json')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error('Error loading photo locations:', err));
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMarkerHover = useCallback((location: PhotoLocation, event: L.LeafletMouseEvent) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Get the marker position on screen
    const containerPoint = event.containerPoint;
    setPreviewPosition({ x: containerPoint.x, y: containerPoint.y });
    setSelectedLocation(location);
    setIsPreviewOpen(true);
  }, []);

  const handleMarkerLeave = useCallback(() => {
    // Delay closing to allow moving to the preview
    hoverTimeoutRef.current = setTimeout(() => {
      setIsPreviewOpen(false);
      setSelectedLocation(null);
    }, 150);
  }, []);

  const handlePreviewMouseEnter = useCallback(() => {
    // Cancel close timeout when hovering over preview
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  const handlePreviewMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsPreviewOpen(false);
      setSelectedLocation(null);
    }, 150);
  }, []);

  return (
    <div className="relative w-full h-[650px] rounded-2xl overflow-hidden shadow-xl">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createHeartIcon()}
            eventHandlers={{
              mouseover: (e) => handleMarkerHover(location, e),
              mouseout: handleMarkerLeave,
            }}
          />
        ))}
      </MapContainer>

      {/* Floating Preview Card */}
      <div
        ref={previewRef}
        className={`
          absolute pointer-events-auto
          transition-all duration-300 ease-out
          ${isPreviewOpen && selectedLocation ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        style={{
          left: Math.min(Math.max(previewPosition.x - 160, 16), window.innerWidth - 336),
          top: Math.max(previewPosition.y - 220, 16),
          zIndex: 1000,
        }}
        onMouseEnter={handlePreviewMouseEnter}
        onMouseLeave={handlePreviewMouseLeave}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden w-[320px] border border-white/20">
          {/* Header */}
          <div className="relative px-4 py-3 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100/50">
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedLocation?.name}
            </h3>
          </div>
          
          {/* Photo Content */}
          {selectedLocation && selectedLocation.photos.length > 0 && (
            <div className="p-3">
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {selectedLocation.photos.map((photo, index) => (
                    <CarouselItem key={index}>
                      <div className="relative overflow-hidden rounded-xl flex items-center justify-center bg-gray-50">
                        <img
                          src={photo}
                          alt={`${selectedLocation.name} - Photo ${index + 1}`}
                          className="max-w-full max-h-[200px] object-contain transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {selectedLocation.photos.length > 1 && (
                  <>
                    <CarouselPrevious className="left-1 w-8 h-8 bg-white/80 hover:bg-white shadow-lg border-0" />
                    <CarouselNext className="right-1 w-8 h-8 bg-white/80 hover:bg-white shadow-lg border-0" />
                  </>
                )}
              </Carousel>
              
              {selectedLocation.photos.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-3">
                  {selectedLocation.photos.map((_, index) => (
                    <div
                      key={index}
                      className="w-1.5 h-1.5 rounded-full bg-rose-300/50"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
