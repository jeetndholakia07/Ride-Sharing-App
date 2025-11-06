import { type FC, useEffect, useRef, useState } from "react";

type FeatureCardProps = {
  imageSrc: string;
  heading: string;
  message: string;
  buttonText?: string;
  onClick?: () => void;
};

const FeatureCard: FC<FeatureCardProps> = ({
  imageSrc,
  heading,
  message,
  buttonText,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing after visible
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg overflow-hidden
        transform transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        w-full max-w-sm mx-auto sm:max-w-md lg:max-w-lg
        hover:-translate-y-2 hover:shadow-2xl
      `}
    >
      {/* Image */}
      <div className="w-full h-56 sm:h-64 lg:h-72 overflow-hidden">
        <img
          src={imageSrc}
          alt={heading}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div className="p-6 text-center flex flex-col items-center gap-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{heading}</h3>
        <p className="text-gray-600 text-sm sm:text-base">{message}</p>

        {buttonText && onClick && (
          <button
            onClick={onClick}
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-medium text-sm sm:text-base shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
