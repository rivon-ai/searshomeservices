import Image, { StaticImageData } from 'next/image';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { HeroBannerData } from '../page';

type HeroBannerSectionProps = {
    heroBannerData: HeroBannerData;
};

export default function HeroBanner({ heroBannerData }: HeroBannerSectionProps) {
    return (
        <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[500px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={heroBannerData.image}
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay */}
                {heroBannerData && (
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
                )}
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl">
                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {heroBannerData.heading}
                    </h1>

                    {/* Subheading */}
                    <p className="text-base sm:text-lg text-white mb-4 leading-relaxed">
                        {heroBannerData.subheading}
                    </p>

                    {/* Body Text */}
                    <p className="text-base sm:text-lg text-white mb-8 leading-relaxed">
                        {heroBannerData.bodyText}
                    </p>

                    {/* CTA Button */}
                    <button className="bg-linear-to-r from-[#76FFA3] to-[#48FFFF] hover:bg-teal-500 text-teal-800 font-bold text-base sm:text-lg px-8 py-3 rounded-full transition-colors duration-300 mb-8">
                        {heroBannerData.ctaText}
                    </button>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                        {heroBannerData.trustBadges.map((badge: any, index: number) => (
                            <div key={index} className="flex items-center gap-2 text-white">
                                <FaCheckCircle className="text-white text-sm shrink-0" />
                                <span className="text-sm font-medium">{badge}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        Not working
                        Not turning on
                        Won’t start / Won’t start cycle
                        Stopped working
                        No power
                        Not heating
                        Not cooling
                        Blowing cold air (furnace)
                        Blowing warm air (AC)
                        Leaking water
                        Leaking from bottom
                        Water at bottom
                        Dripping inside
                        Not draining / Won’t drain
                        Drain clogged
                        Not filling / No water
                        Water not cold
                        Noisy / Loud / Banging / Vibrates
                        Shaking / Excessive vibration
                        Takes too long to dry / Not drying
                        Clothes still wet after cycle
                        Buttons not working
                        Touchpad not responding
                        Display not working / Blank screen
                        Lights flashing / Blinking
                        Door not closing / Won’t shut
                        Lid won’t lock
                        Not washing / Dishes not clean
                        Top/bottom rack not cleaning
                        Detergent not dispensing
                        Rinse cycle not working
                        Not spinning / Drum not turning
                        Won’t agitate
                        Won’t rinse
                        Won’t finish cycle
                        Light not working
                        Fan not working
                        Ice maker not working / Not making ice
                        Ice not dispensing
                        Water dispenser not working
                        Water filter leaking / Not working
                        Auto-fill pitcher not working (Samsung)
                        Ice maker rest button not working (LG)
                        Broiler not working
                        Burner not working
                        Oven element not working
                        Igniter not working
                        Compressor not running
                        Freezer not freezing (but fridge works)
                        Fridge not cooling (but freezer works)
                        Too cold / Too warm
                        Temperature inaccurate
                        Burning smell
                        Keeps running / Won’t turn off
                        Stops early / Keeps restarting
                        Control lock won’t turn off
                        Clean Filter light stuck (LG)
                        Smart Diagnosis errors (LG)
                        Drum roller replacement needed
                        Drawer problem (freezer/refrigerator)
                        Broken shelf
                        Dispenser not working (soap/ice/water)
                        Chime not working
                        Cold water not working
                        Steam clean not working
                        Timer knob not working
                        Dial not working
                        Deep fill not working
                        Sensor dry not working
                        Auto-fill not working
                    </div>
                </div>
            </div>
        </section>
    )
}