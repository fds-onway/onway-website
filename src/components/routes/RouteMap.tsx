import {
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
  Popup,
  MapContainer,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface Point {
  latitude: string;
  longitude: string;
}

interface RouteMapProps {
  points: Point[];
  onAddPoint: (lat: string, lng: string) => void;
}

function MapClickHandler({
  onAddPoint,
}: {
  onAddPoint: (lat: string, lng: string) => void;
}) {
  useMapEvents({
    click(e: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      onAddPoint(e.latlng.lat.toString(), e.latlng.lng.toString());
    },
  });
  return null;
}

export function RouteMap({ points, onAddPoint }: RouteMapProps) {
  const [routePositions, setRoutePositions] = useState<Array<[number, number]>>(
    [],
  );

  useEffect(() => {
    async function fetchRoute() {
      if (points.length < 2) {
        setRoutePositions([]);
        return;
      }
      const coords = points
        .map((p) => `${p.longitude},${p.latitude}`)
        .join(';');
      const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
      try {
        const res = await fetch(url);
        const data: {
          routes?: Array<{
            geometry?: {
              coordinates: Array<[number, number]>;
            };
          }>;
        } = await res.json();
        if (data.routes && data.routes[0] && data.routes[0].geometry) {
          const positions = data.routes[0].geometry.coordinates
            .filter(
              (coord): coord is [number, number] =>
                Array.isArray(coord) && coord.length === 2,
            )
            .map(([lng, lat]: [number, number]) => [lat, lng])
            .filter(
              (coord): coord is [number, number] =>
                coord.length === 2 &&
                typeof coord[0] === 'number' &&
                typeof coord[1] === 'number',
            );
          setRoutePositions(positions);
        } else {
          setRoutePositions([]);
        }
      } catch {
        setRoutePositions([]);
      }
    }
    fetchRoute();
  }, [points]);

  return (
    <div className="my-4 h-full min-h-[300px] flex-1">
      <MapContainer
        style={{ height: '100%', width: '100%', zIndex: 10 }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        center={[-25.7346, -53.0585]}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler onAddPoint={onAddPoint} />
        {points.map((p, idx) => (
          <Marker
            key={idx}
            position={[parseFloat(p.latitude), parseFloat(p.longitude)]}
          >
            <Popup>
              <span className="font-bold text-lg">{idx + 1}</span>
            </Popup>
          </Marker>
        ))}
        {routePositions.length > 1 && (
          <Polyline
            positions={routePositions}
            pathOptions={{ color: 'blue' }}
          />
        )}
      </MapContainer>
    </div>
  );
}
