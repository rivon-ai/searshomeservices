"use client"


import React from 'react'

interface Resource {
  image: string;
  title: string;
  readTime: string;
  difficulty: string;
  description: string;
  category: string;
}

interface resourceProps{
    resources : Resource[]
}

export default function RepairResources({resources} : resourceProps ) {
    return (
        <>
            {/* Repair Resources */}
            <div className="w-[70%] mx-auto py-20">
                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Repair Resources</h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resources.map((resource : Resource, index : number) => (
                        <div
                            key={index}
                            className="border border-t-0 flex flex-col h-full shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden rounded-t-lg">
                                <img
                                    src={resource.image || "/placeholder.svg"}
                                    alt={resource.title}
                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="bg-white p-6 rounded-b-lg  border-gray-200">
                                <h3 className="text-xl font-semibold text-blue-900 mb-3 hover:text-blue-700 cursor-pointer">
                                    {resource.title}
                                </h3>

                                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                                    <span>{resource.readTime}</span>
                                    <span>•</span>
                                    <span>{resource.difficulty}</span>
                                </div>

                                <p className="text-gray-700 text-sm leading-relaxed mb-4">{resource.description}</p>

                                <div className="text-sm text-blue-600 font-medium">{resource.category}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Schedule All Other Repairs Link */}
                <div className="mt-8 text-center">
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                        Schedule all other repairs
                    </a>
                </div>
            </div>
        </>
    )
}