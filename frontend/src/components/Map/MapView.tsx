import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { reverseGeocode } from '../../utils/maps';

type MapViewProps = {
    center?: [number, number];
    zoom?: number;
    height?: string;
    markers?: Array<{ position: [number, number]; label?: string; id?: string | number }>; 
    onMapClick?: (payload: { lat: number; lng: number; address?: string }) => void;
    route?: Array<[number, number]>; // optional route polyline
};

const defaultCenter: [number, number] = [20.5937, 78.9629];

const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

function ClickHandler({ onClick }: { onClick?: (payload: { lat: number; lng: number; address?: string }) => void }) {
    const handleClick = useCallback(async (e: any) => {
        if (!onClick) return;
        const lat = e.latlng.lat as number;
        const lng = e.latlng.lng as number;
        const address = await reverseGeocode(lat, lng) ?? undefined;
        onClick({ lat, lng, address });
    }, [onClick]);

    useMapEvents({ click: handleClick });
    return null;
}

function FitBounds({ markers, route }: { markers: Array<{ position: [number, number] }>; route?: Array<[number, number]> }) {
    const map = useMap();
    useEffect(() => {
        const points: Array<[number, number]> = [];
        markers.forEach(m => points.push(m.position));
        if (route && route.length) points.push(...route);
        if (points.length >= 2) {
            const bounds = L.latLngBounds(points.map(p => L.latLng(p[0], p[1])));
            map.fitBounds(bounds, { padding: [24, 24] });
        }
    }, [markers, route, map]);
    return null;
}

export default function MapView({ center, zoom = 5, height = '400px', markers = [], onMapClick, route }: MapViewProps) {
    const [mapCenter, setMapCenter] = useState<[number, number]>(center ?? defaultCenter);

    useEffect(() => {
        if (center) setMapCenter(center);
    }, [center]);

    const style = useMemo(() => ({ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }), [height]);

    return (
        <div style={style}>
            <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((m, idx) => (
                    <Marker key={m.id ?? idx} position={m.position} icon={defaultIcon}>
                        {m.label && <Popup>{m.label}</Popup>}
                    </Marker>
                ))}
                {!markers.length && (
                    <Marker position={mapCenter} icon={defaultIcon}>
                        <Popup>Selected center</Popup>
                    </Marker>
                )}
                <ClickHandler onClick={onMapClick} />
                {route && route.length > 1 && (
                    <Polyline positions={route} pathOptions={{ color: 'indigo', weight: 4, opacity: 0.8 }} />
                )}
                <FitBounds markers={markers} route={route} />
            </MapContainer>
        </div>
    );
}


