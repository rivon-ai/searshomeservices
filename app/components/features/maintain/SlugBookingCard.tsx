import Link from "next/link";
import SlugRichTextRenderer from "./SlugRichTextRenderer";

export interface SlugBookingCardProps {
  sectionTitle?: string;
  sectionDescription?: string;
  cardTitle: string;
  cardDescription: string[] | React.ReactNode | any[]; // Flexible description covering RichTextNode[]
  cardDisclaimer?: string;
  featuresTitle?: string;
  features: string[];
  offerText: string;
  buttonText?: string;
  buttonLink: string;
}

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-blue-500 mr-2 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default function SlugBookingCard({
  sectionTitle,
  sectionDescription,
  cardTitle,
  cardDescription,
  cardDisclaimer,
  featuresTitle,
  features,
  offerText,
  buttonText = "Schedule Now",
  buttonLink,
}: SlugBookingCardProps) {
  // Helper to determine if we have a simple string array or complex rich text
  const isStringArray = (arr: any[]): arr is string[] => {
    return arr.length > 0 && typeof arr[0] === "string";
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          {sectionTitle && (
            <h2 className="text-3xl font-bold text-[#002B5C] mb-4">
              {sectionTitle}
            </h2>
          )}
          {sectionDescription && (
            <p className="text-gray-600 text-lg leading-relaxed max-w-5xl">
              {sectionDescription}
            </p>
          )}
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left Column: Description */}
              <div>
                <h3 className="text-2xl font-bold text-[#002B5C] mb-6">
                  {cardTitle}
                </h3>
                <div className="space-y-6 text-gray-500 leading-relaxed">
                  {Array.isArray(cardDescription) ? (
                    isStringArray(cardDescription) ? (
                      cardDescription.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))
                    ) : (
                      <SlugRichTextRenderer content={cardDescription} />
                    )
                  ) : (
                    <div className="rich-text-content">{cardDescription}</div>
                  )}
                </div>
                {cardDisclaimer && (
                  <p className="text-xs text-gray-400 mt-4">{cardDisclaimer}</p>
                )}
              </div>

              {/* Right Column: Features & CTA */}
              <div className="flex flex-col justify-center">
                <p className="text-gray-600 mb-6 text-lg">{featuresTitle}</p>

                <ul className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-500">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <p className="text-2xl md:text-3xl font-bold text-[#002B5C] mb-6">
                    {offerText}
                  </p>

                  <Link
                    href={buttonLink}
                    className="block w-full bg-[#50E3C2] hover:bg-[#3FD1B0] text-[#002B5C] font-bold text-center py-4 rounded-xl transition-colors duration-200 text-lg"
                  >
                    {buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
