import React from "react";
import Image from "next/image";

export interface SchedulerProps {
  defaultAppliance?: string;
  available_options?: string[];
}

export interface ImageSectionProps {
  heading?: string;
  description?: string;
  backgroundImage?: string;
  scheduler?: SchedulerProps;
}

export default function ImageSection({
  heading = "Maintenance & Tune Ups",
  description = "Extend the life of your appliances with routine maintenance",
  backgroundImage = "https://www.searshomeservices.com/cftassets/3dscgwsMI9BYBvp7ZDM7yn/d555c0caa87693c2dfaf7d426564f5ec/upscaled-2x-SHS-06052023-clean-and-maintain_Sears-J37223-Shot7-ENVR-V1-068-new.png?w=3840&q=90&fm=webp",
  scheduler,
}: ImageSectionProps) {
  return (
    <section className="min-h-96 md:min-h-128 flex items-center justify-center font-sans">
      <div className="relative w-full m-0">
        <div className="pb-22 bg-white">
          <section className="bg-blue-500 h-127 md:h-160">
            <div className="flex flex-col grow relative w-full h-127 md:h-166 m-0 md:mx-auto">
              <div className="relative w-full h-full">
                {/* Background Image */}
                <img
                  alt={heading}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 object-cover pointer-events-none"
                  sizes="(min-width: 1200px) 50vw, (min-width: 600px) 35vw, (min-width: 385px) 30vw, 100vw"
                  src={backgroundImage}
                />
                <div className="absolute w-full h-full bg-black/40 pointer-events-none"></div>

                {/* Search/Schedule Widget Container */}
                <div className="absolute w-full top-100 md:top-120 lg:top-128 z-10 pointer-events-none">
                  <div className="mx-auto max-w-300 pointer-events-auto">
                    <div className="grid grid-cols-1 w-full px-4 md:px-2 py-5 md:py-22">
                      <section className="min-w-full mx-auto z-100">
                        <div className="items-center flex flex-col lg:flex-row grow relative bg-white rounded-3xl px-6 py-4 lg:rounded-full lg:px-10 lg:py-4 lg:gap-4 lg:min-h-30 shadow-xl">
                          <div className="flex flex-col lg:flex-row grow w-full lg:w-2/3 relative mx-2 lg:mx-0 gap-4 lg:gap-2">
                            <div className="relative w-full lg:w-full">
                              <select
                                aria-label="Select Appliance"
                                className="relative text-left block w-full bg-white border text-gray-500 border-gray-200 overflow-hidden whitespace-nowrap pl-4 pr-10 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none text-md font-medium h-14 rounded-[40px] cursor-pointer"
                                defaultValue={scheduler?.defaultAppliance || ""}
                              >
                                <option value="" disabled>
                                  Select Appliance
                                </option>
                                {scheduler?.available_options?.map(
                                  (option, idx) => (
                                    <option key={idx} value={option}>
                                      {option}
                                    </option>
                                  ),
                                ) || (
                                  <>
                                    <option value="appliance-repair">
                                      Appliance Repair
                                    </option>
                                    <option value="maintenance">
                                      Maintenance
                                    </option>
                                  </>
                                )}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-gray-400"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 lg:mt-0 w-full lg:w-auto">
                            <button
                              type="button"
                              className="cursor-pointer text-white bg-teal-400 hover:bg-teal-500 transition-colors px-10 py-4 rounded-full w-full lg:w-auto font-bold text-lg"
                            >
                              Schedule Now
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center mx-auto max-w-300 px-4 lg:px-0 max-h-100 md:max-h-128 lg:max-h-152 pointer-events-none">
          {/* Star Rating Badge - Static for now or pass as prop if needed */}
          <div className="absolute top-4 left-5 z-10 cursor-pointer bg-white px-3 py-1.5 rounded-lg pointer-events-auto shadow-md">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-blue-900 font-semibold text-xs sm:text-sm">
                8399 Customer Reviews
              </p>
            </div>
          </div>

          <div className="shrink-0"></div>
          <h1 className="lg:hero text-white text-left w-full max-w-185 text-5xl lg:text-7xl font-bold mb-6 drop-shadow-md">
            {heading}
          </h1>
          <div className="text-gray-100 mt-2 text-left w-full max-w-196">
            <p className="font-medium text-2xl lg:text-4xl leading-snug text-white drop-shadow-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
