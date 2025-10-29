import { useState, type FC } from "react";

type ratingProps = {
    rating: number;
    handleClick?: (star: number) => void;
}

const RatingStar: FC<ratingProps> = ({ rating, handleClick }) => {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
                <i
                    key={star}
                    className={`bi ${(hovered || rating) >= star ? 'bi-star-fill text-yellow-400' : 'bi-star text-gray-300'
                        } text-2xl cursor-pointer transition-all duration-150`}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => { handleClick && handleClick(star) }}
                />
            ))}
        </div>
    )
}
export default RatingStar;