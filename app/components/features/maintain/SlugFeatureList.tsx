"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";

// Reusable Before/After Slider Component
interface BeforeAfterSliderProps {
  beforeImage?: string | StaticImageData;
  afterImage?: string | StaticImageData;
  altText?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  altText = "Comparison",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isResizing || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let clientX;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = (e as MouseEvent).clientX;
      }

      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;

      setSliderPosition(percentage);
    },
    [isResizing],
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing, handleMouseMove]);

  // Fallback if images are missing
  if (!beforeImage || !afterImage) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500">
        Image not available
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none group h-[300px] md:h-[400px] rounded-3xl"
    >
      {/* After Image (Background) */}
      <Image
        src={afterImage}
        alt={`After ${altText}`}
        fill
        className="object-cover absolute top-0 left-0 w-full h-full"
        draggable={false}
      />

      {/* After Label */}
      <span className="absolute bottom-4 right-4 bg-[#1E40AF] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
        After
      </span>

      {/* Before Image (Foreground - Clipped) */}
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`Before ${altText}`}
          fill
          className="object-cover absolute top-0 left-0 w-full h-full"
          draggable={false}
        />
        {/* Before Label */}
        <span className="absolute bottom-4 left-4 bg-[#1E40AF] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          Before
        </span>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full border-2 border-white flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export interface FeatureItem {
  title: string;
  description: string;
  points: string[];
  beforeImage?: string | StaticImageData;
  afterImage?: string | StaticImageData;
}

export interface SlugFeatureListProps {
  title?: string;
  features: FeatureItem[];
}

export default function SlugFeatureList({
  title = "We clean where you can't",
  features,
}: SlugFeatureListProps) {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#002B5C] mb-12 text-center md:text-left">
          {title}
        </h2>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              {/* Text Content */}
              <div>
                <h3 className="text-3xl font-bold text-[#002B5C] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-500 mb-6 text-lg leading-relaxed">
                  {feature.description}
                </p>

                {feature.title.toLowerCase().includes("refrigerator") && (
                  <p className="text-[#002B5C] font-medium mb-4">
                    Your refrigerator maintenance includes a detailed 9-point
                    inspection featuring:
                  </p>
                )}
                {feature.title.toLowerCase().includes("washer") && (
                  <p className="text-[#002B5C] font-medium mb-4">
                    Your washer cleaning service and maintenance includes a
                    detailed 18-point inspection featuring:
                  </p>
                )}

                <ul className="space-y-3">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-[#002B5C] rounded-full shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Before/After Slider */}
              <div className="w-full">
                <BeforeAfterSlider
                  beforeImage={feature.beforeImage}
                  afterImage={feature.afterImage}
                  altText={feature.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
