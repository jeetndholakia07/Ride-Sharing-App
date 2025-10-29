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

