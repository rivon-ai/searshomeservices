import React from "react";

interface QuickRepairItem {
  imgSrc: string;
  title: string;
  description: string;
}

interface QuickRepairStepsProps {
  title: string;
  items: QuickRepairItem[];
}

export default function QuickRepairSteps({
  title,
  items,
}: QuickRepairStepsProps) {
  return (
    <div className="w-full mb-16">
      {/* Trigger Heading */}
      <h2 className="text-left text-2xl font-semibold text-blue-950 uppercase my-10 tracking-tight">
        {title}
      </h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {items.map((item, index) => (
          <div
            key={`quick-repair-${index}`}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            {item.imgSrc && (
              <div className="mb-6 w-16 h-16 flex items-center justify-center">
                <img
                  src={
                    item.imgSrc.startsWith("//")
                      ? `https:${item.imgSrc}`
                      : item.imgSrc
                  }
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <h3 className="text-xl font-bold text-blue-900 uppercase mb-3 tracking-wide">
              {item.title}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
