import React from "react";
import { Play } from "lucide-react";

export function VideoSection() {
    return (
        <div className="py-8 border-b border-gray-100">
            <h2 className="text-[#00245B] text-2xl font-bold mb-6">What to Expect from Your Repair</h2>

            <div className="relative w-full md:w-[600px] h-[340px] bg-black/10 rounded-xl overflow-hidden group cursor-pointer shadow-lg">
                {/* Placeholder background - simulates the video thumbnail */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop')"
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                {/* Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#333]/90 rounded-md flex items-center justify-center backdrop-blur-sm group-hover:bg-[#0046BE] transition-colors">
                    <Play className="text-white fill-white ml-1" size={32} />
                </div>
            </div>
        </div>
    );
}
