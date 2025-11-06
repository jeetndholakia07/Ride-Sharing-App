const cache = new Map<string, { lat: number; lng: number }>();

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    if (!address) return null;
    const key = address.toLowerCase().trim();
    if (cache.has(key)) return cache.get(key)!;
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) return null;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return null;
        const lat = Number(data[0].lat);
        const lng = Number(data[0].lon);
        const coords = { lat, lng };
        cache.set(key, coords);
        return coords;
    } catch {
        return null;
    }
}

export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) return null;
        const data = await res.json();
        return (data?.display_name as string) ?? null;
    } catch {
        return null;
    }
}

export type LatLng = { lat: number; lng: number };

// Fetch a simple route polyline from OSRM public demo server (driving)
export async function fetchRoute(from: LatLng, to: LatLng): Promise<Array<[number, number]> | null> {
    try {
        const coords = `${from.lng},${from.lat};${to.lng},${to.lat}`; // lon,lat per OSRM
        const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) return null;
        const data = await res.json();
        const geometry = data?.routes?.[0]?.geometry?.coordinates;
        if (!geometry) return null;
        // Convert [lon,lat] -> [lat,lon]
        const line: Array<[number, number]> = geometry.map((c: [number, number]) => [c[1], c[0]]);
        return line;
    } catch {
        return null;
    }
}