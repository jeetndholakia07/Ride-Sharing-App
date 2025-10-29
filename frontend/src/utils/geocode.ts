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

