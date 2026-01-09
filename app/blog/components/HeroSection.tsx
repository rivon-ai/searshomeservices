import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative mx-auto py-10 w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 left-0 top-0 z-0 w-full h-full">
        <Image
          src="https://images.ctfassets.net/e0821f6q5nel/1ismk2VeoZr0hHcZzP6QPB/c70a8bd53e6413eaaf2aa335feaa2bc7/family-in-kitchen.jpeg"
          alt="Resource Center Home Page Image"
          fill
          priority
          quality={75}
          className="object-cover w-full h-full"
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 left-0 top-0 z-0 h-full w-full bg-linear-to-r from-blue-700 via-blue-600/80 via-30% to-transparent"></div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-0 px-8 lg:flex-row lg:gap-5 lg:px-0 xl:gap-14">
        {/* Left Side: Text Content */}
        <div className="py-6 flex flex-col items-start w-full lg:w-1/2">
          <h1
            className="mb-4 text-4xl font-bold text-white lg:text-5xl"
            data-testid="bw_title"
          >
            Resource Center
          </h1>
          <p className="mb-4 w-full text-md font-medium leading-6 text-white lg:w-md">
            Discover expert tips and tricks for effortless appliance care and
            easy home ownership.
          </p>
          <p className="mb-4 text-xl font-semibold text-white">
            Need help with appliance repair?
          </p>
          <div className="w-full max-w-lg" data-testid="sw_schedule_now_link">
            <Link href="/scheduler/shs?serviceType=R" className="block w-full">
              <button
                type="button"
                className="w-full rounded-lg bg-yellow-400 px-6 py-3 text-xl font-semibold leading-8 text-blue-900 hover:bg-yellow-300 focus:outline-4 focus:outline-yellow-200 disabled:bg-gray-200 disabled:text-gray-500 cursor-pointer transition-colors"
                data-testid="blog_main_page_schedule_now_button"
              >
                Schedule Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Search Input */}
        <div className="my-auto z-1 w-full lg:w-1/2 flex justify-end">
          <div className="w-full lg:max-w-xl">
            <form
              data-testid="form"
              className="grid gap-0 mt-2 mb-1 overflow-hidden shrink form-container"
            >
              <div className="relative flex flex-col lg:flex-row gap-4 px-0">
                <div className="bg-white/30 backdrop-blur-sm rounded-lg w-full overflow-hidden relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                    <Search className="w-6 h-6" />
                  </div>
                  <input
                    id="blog-search"
                    data-testid="blog-search-input-content"
                    placeholder="Search"
                    className="w-full bg-transparent pl-12 py-3 h-12 text-white placeholder:text-white placeholder:opacity-100 outline-none"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
