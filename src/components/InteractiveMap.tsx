import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds, LatLng, DivIcon } from 'leaflet';
import { Star, MapPin, Users, Waves, Camera, ArrowRight, ZoomIn } from 'lucide-react';
import { Beach } from '../types/Content';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  beaches: Beach[];
  onBeachSelect: (beach: Beach) => void;
  selectedBeach?: Beach | null;
}

interface BeachCluster {
  beaches: Beach[];
  center: [number, number];
  count: number;
  bounds: LatLngBounds;
}

// Custom map component to handle zoom and clustering
const MapController: React.FC<{
  clusters: BeachCluster[];
  individualBeaches: Beach[];
  onBeachSelect: (beach: Beach) => void;
  onClusterClick: (cluster: BeachCluster) => void;
  selectedBeach?: Beach | null;
}> = ({ clusters, individualBeaches, onBeachSelect, onClusterClick, selectedBeach }) => {
  const map = useMap();

  // Create custom cluster icon
  const createClusterIcon = (count: number) => {
    const size = Math.min(60, 30 + count * 2);
    return new DivIcon({
      html: `
        <div class="cluster-marker" style="
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(135deg, #003366, #FF6B6B);
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: ${count > 99 ? '12px' : '14px'};
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        ">
          ${count}
        </div>
      `,
      className: 'custom-cluster-icon',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  };

  // Create custom beach icon
  const createBeachIcon = (beach: Beach, isSelected: boolean = false) => {
    const size = isSelected ? 40 : 32;
    return new DivIcon({
      html: `
        <div class="beach-marker ${isSelected ? 'selected' : ''}" style="
          width: ${size}px;
          height: ${size}px;
          background: ${isSelected ? 'linear-gradient(135deg, #FF6B6B, #003366)' : 'linear-gradient(135deg, #003366, #FF6B6B)'};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `,
      className: 'custom-beach-icon',
      iconSize: [size, size],
      iconAnchor: [size / 2, size]
    });
  };

  return (
    <>
      {/* Render clusters */}
      {clusters.map((cluster, index) => (
        <Marker
          key={`cluster-${index}`}
          position={cluster.center}
          icon={createClusterIcon(cluster.count)}
          eventHandlers={{
            click: () => onClusterClick(cluster)
          }}
        >
          <Popup className="custom-popup">
            <div className="p-4 min-w-[200px]">
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-gradient-to-r from-ocean-blue to-coral p-2 rounded-full">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-slate">Beach Cluster</h3>
                  <p className="text-sm text-dark-slate/70">{cluster.count} beaches in this area</p>
                </div>
              </div>
              <button
                onClick={() => onClusterClick(cluster)}
                className="w-full bg-gradient-to-r from-ocean-blue to-coral text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Zoom In to Explore</span>
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Render individual beaches */}
      {individualBeaches.map((beach) => (
        <Marker
          key={beach.id}
          position={[beach.coordinates.lat, beach.coordinates.lng]}
          icon={createBeachIcon(beach, selectedBeach?.id === beach.id)}
          eventHandlers={{
            click: () => onBeachSelect(beach)
          }}
        >
          <Popup className="custom-popup">
            <div className="p-4 min-w-[280px] max-w-[320px]">
              <div className="relative mb-3">
                {beach.images && beach.images.length > 0 ? (
                  <img
                    src={beach.images[0].url}
                    alt={beach.images[0].caption || beach.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-32 bg-gradient-to-r from-ocean-blue to-coral rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-bold">{beach.rating}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <h3 className="font-playfair font-bold text-lg text-dark-slate">{beach.name}</h3>
                <div className="flex items-center space-x-1 text-coral">
                  <MapPin className="w-3 h-3" />
                  <span className="text-sm">{beach.location}</span>
                </div>
                <p className="text-sm text-dark-slate/70 line-clamp-2">
                  {beach.description.substring(0, 100)}...
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {beach.vibe.slice(0, 2).map((vibe, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-light-ocean text-ocean-blue text-xs rounded-full font-medium"
                  >
                    {vibe}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onBeachSelect(beach)}
                className="w-full bg-gradient-to-r from-ocean-blue to-coral text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Discover This Paradise</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ beaches, onBeachSelect, selectedBeach }) => {
  const [clusters, setClusters] = useState<BeachCluster[]>([]);
  const [individualBeaches, setIndividualBeaches] = useState<Beach[]>([]);
  const [currentZoom, setCurrentZoom] = useState(6);
  const [isMapFocused, setIsMapFocused] = useState(false);
  const mapRef = useRef<any>(null);

  // Precise Malaysia center and bounds to match the screenshot
  const malaysiaCenter: [number, number] = [4.2105, 108.9758]; // Center of Malaysia including both peninsular and Borneo
  const malaysiaBounds: [[number, number], [number, number]] = [
    [0.8, 99.0], // Southwest (covers Peninsular Malaysia)
    [7.5, 119.5]  // Northeast (covers East Malaysia/Borneo)
  ];

  // Clustering algorithm
  const clusterBeaches = (beaches: Beach[], zoomLevel: number) => {
    const clusters: BeachCluster[] = [];
    const processed = new Set<string>();
    const individual: Beach[] = [];
    
    // Clustering distance based on zoom level
    const clusterDistance = Math.max(0.5, 2 - (zoomLevel * 0.2));

    beaches.forEach(beach => {
      if (processed.has(beach.id)) return;

      const nearbyBeaches = beaches.filter(otherBeach => {
        if (processed.has(otherBeach.id) || beach.id === otherBeach.id) return false;
        
        const distance = Math.sqrt(
          Math.pow(beach.coordinates.lat - otherBeach.coordinates.lat, 2) +
          Math.pow(beach.coordinates.lng - otherBeach.coordinates.lng, 2)
        );
        
        return distance < clusterDistance;
      });

      if (nearbyBeaches.length > 0) {
        const clusterBeaches = [beach, ...nearbyBeaches];
        
        // Calculate cluster center
        const centerLat = clusterBeaches.reduce((sum, b) => sum + b.coordinates.lat, 0) / clusterBeaches.length;
        const centerLng = clusterBeaches.reduce((sum, b) => sum + b.coordinates.lng, 0) / clusterBeaches.length;
        
        // Calculate bounds
        const lats = clusterBeaches.map(b => b.coordinates.lat);
        const lngs = clusterBeaches.map(b => b.coordinates.lng);
        const bounds = new LatLngBounds(
          [Math.min(...lats), Math.min(...lngs)],
          [Math.max(...lats), Math.max(...lngs)]
        );

        clusters.push({
          beaches: clusterBeaches,
          center: [centerLat, centerLng],
          count: clusterBeaches.length,
          bounds
        });

        clusterBeaches.forEach(b => processed.add(b.id));
      } else {
        individual.push(beach);
        processed.add(beach.id);
      }
    });

    return { clusters, individual };
  };

  useEffect(() => {
    const { clusters: newClusters, individual } = clusterBeaches(beaches, currentZoom);
    setClusters(newClusters);
    setIndividualBeaches(individual);
  }, [beaches, currentZoom]);

  const handleClusterClick = (cluster: BeachCluster) => {
    if (mapRef.current) {
      mapRef.current.fitBounds(cluster.bounds, { padding: [20, 20] });
    }
  };

  const handleZoomEnd = () => {
    if (mapRef.current) {
      setCurrentZoom(mapRef.current.getZoom());
    }
  };

  // Handle scroll wheel behavior
  const handleMapMouseEnter = () => {
    setIsMapFocused(true);
  };

  const handleMapMouseLeave = () => {
    setIsMapFocused(false);
  };

  // Prevent page scroll when mouse is over map
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isMapFocused) {
        e.preventDefault();
      }
    };

    if (isMapFocused) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isMapFocused]);

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={handleMapMouseEnter}
      onMouseLeave={handleMapMouseLeave}
    >
      <MapContainer
        ref={mapRef}
        center={malaysiaCenter}
        zoom={6}
        maxBounds={malaysiaBounds}
        maxBoundsViscosity={1.0}
        className="w-full h-full rounded-2xl overflow-hidden"
        zoomControl={false}
        scrollWheelZoom={isMapFocused ? true : false}
        doubleClickZoom={true}
        touchZoom={true}
        dragging={true}
        onzoomend={handleZoomEnd}
        whenCreated={(mapInstance) => {
          // Fit bounds on initial load to show all of Malaysia
          mapInstance.fitBounds(malaysiaBounds, { padding: [20, 20] });
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <MapController
          clusters={clusters}
          individualBeaches={individualBeaches}
          onBeachSelect={onBeachSelect}
          onClusterClick={handleClusterClick}
          selectedBeach={selectedBeach}
        />
      </MapContainer>

      {/* Scroll Hint Overlay */}
      {!isMapFocused && (
        <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
          <div className="bg-dark-slate/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 hover:opacity-100 transition-opacity">
            Click map to enable zoom & pan
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
        <h4 className="font-semibold text-dark-slate mb-3">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-ocean-blue to-coral rounded-full border-2 border-white shadow-md"></div>
            <span className="text-sm text-dark-slate">Individual Beach</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-ocean-blue to-coral rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">
              5
            </div>
            <span className="text-sm text-dark-slate">Beach Cluster</span>
          </div>
        </div>
        <p className="text-xs text-dark-slate/60 mt-3">
          {isMapFocused ? 'Scroll to zoom • Click clusters to explore' : 'Hover map to enable scrolling'}
        </p>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20 hover:bg-white transition-colors"
        >
          <ZoomIn className="w-5 h-5 text-dark-slate" />
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20 hover:bg-white transition-colors"
        >
          <ZoomIn className="w-5 h-5 text-dark-slate transform rotate-180" />
        </button>
        <button
          onClick={() => mapRef.current?.fitBounds(malaysiaBounds, { padding: [20, 20] })}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20 hover:bg-white transition-colors"
          title="Reset to Malaysia view"
        >
          <MapPin className="w-5 h-5 text-dark-slate" />
        </button>
      </div>
    </div>
  );
};

export default InteractiveMap;