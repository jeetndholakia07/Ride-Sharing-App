export const isSameRoute = (pickup: any, dropoff: any, ride: any) => {
    if (!pickup || !dropoff || !ride?.from || !ride?.to) return false;

    const normalize = (str: string) => str.trim().toLowerCase();

    return (
        normalize(pickup.address) === normalize(ride.from) &&
        normalize(dropoff.address) === normalize(ride.to)
    );
};
