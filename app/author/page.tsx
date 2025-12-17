import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import author1 from '@/public/authors/Kim-author-prof (3).webp'
import author2 from '@/public/authors/Lyle_author-prof.webp'

interface Author {
    id: string;
    name: string;
    bio: string[];
    imageUrl: StaticImageData;
}

interface Stats {
    label: string;
    value: string;
}

const authorsData: Author[] = [
    {
        id: "kim-hillegass",
        name: "Kimberly Hillegass",
        imageUrl: author1,
        bio: [
            "With a career in the home services industry dating back to 1994, Kim Hillegass brings decades of real-world experience to her writing on appliance repair, HVAC maintenance, and home improvement. Her in-depth knowledge of replacement parts, system components, and energy-efficient solutions makes her a trusted resource for homeowners seeking to keep their homes running reliably and efficiently.",
            "Kim's content is built on a foundation of hands-on service expertise, offering clear, actionable advice for tackling household challenges—whether it's troubleshooting an appliance, maintaining an HVAC system, or selecting the right repair parts.",
            "Homeowners rely on Kim for practical, proven guidance that saves time, prevents breakdowns, and promotes long-term home efficiency. Her insights help readers make informed decisions and manage their homes with confidence."
        ]
    },
    {
        id: "lyle-weischwill",
        name: "Lyle Weischwill",
        imageUrl: author2,
        bio: [
            "Lyle Weischwill is a seasoned home maintenance writer with over a decade of experience creating reliable, how-to content. Backed by more than 20 years of hands-on expertise in appliance repair, outdoor power equipment service, and home upkeep, Lyle delivers practical, step-by-step advice that homeowners can trust.",
            "From diagnosing appliance problems to seasonal maintenance tips, his articles are designed to help readers save time, avoid costly mistakes, and keep their homes running smoothly. Lyle's approach blends common-sense solutions with technical accuracy, making him a go-to resource for DIY enthusiasts and everyday homeowners alike.",
            "He holds a Bachelor's degree in Business from Texas A&M University–Corpus Christi, further enriching his insights with a strong foundation in customer service and home improvement business practices.",
            "Trust Lyle for expert appliance guidance, tool know-how, and home maintenance solutions you can count on."
        ]
    }
];

const statsData: Stats[] = [
    { label: "5-Star Reviews", value: "1.3M+", },
    { label: "homes repaired a year", value: "4M+" },
    { label: "licensed, local experts", value: "2,500" }
];


export default function page() {
    return (
        <section className="bg-white">

            {/* Header Section */}
            <div className="bg-linear-to-r from-[#0a1628] via-[#1a3a5c] to-[#2563a8] text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className='py-4'>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3">Meet the Sears Home Services Authors</h2>
                        <p className="text-base sm:text-lg mb-10 ">We're here to help you find a solution</p>
                    </div>

                    <div className="flex flex-wrap gap-6 sm:gap-8 justify-center items-center text-sm sm:text-base">
                        {statsData.map((stat, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <FaCheckCircle className="text-white text-lg" />
                                <span className="font-bold">{stat.value}</span>
                                <span className="font-normal">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Authors Section */}
            <div className="max-w-[60%] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                {authorsData.map((author, index) => (
                    <div
                        key={author.id}
                        className={`flex flex-col sm:flex-row gap-6 mb-12 pb-12 ${index < authorsData.length - 1 ? 'border-b border-gray-300' : ''
                            }`}
                    >
                        {/* Profile Picture */}
                        <div className="shrink-0">
                            <Image
                                src={author.imageUrl}
                                alt={author.name}
                                width={320}
                                height={320}
                                className="rounded-md object-cover"
                            />
                        </div>

                        {/* Bio */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-blue-900 mb-4">{author.name}</h2>
                            {author.bio.map((paragraph, i) => (
                                <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}