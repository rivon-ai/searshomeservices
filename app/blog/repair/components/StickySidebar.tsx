import React from "react";

export default function StickySidebar() {
  return (
    <aside className="hidden lg:block sticky top-[120px] w-full">
      {/* Schedule Repair CTA - Styled to match "Schedule a repair" reference image */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-[#0f2d52] mb-3">
          Schedule a repair
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          We're in your neighborhood and we'll fix it, no matter where you
          bought it.
        </p>

        <button className="w-full bg-[#ffb81c] hover:bg-[#e6a310] text-[#0f2d52] font-bold text-lg py-3 px-6 rounded-md transition-colors mb-4 shadow-sm">
          Schedule Now
        </button>

        <div className="text-center">
          <span className="text-gray-500 text-sm">Or call </span>
          <a
            href="tel:1-213-596-2538"
            className="text-[#386df2] text-sm hover:underline font-medium"
          >
            1-213-596-2538
          </a>
        </div>
      </div>
    </aside>
  );
}
