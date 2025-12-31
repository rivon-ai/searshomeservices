import React from 'react'

interface symptomsData{
    title : string
    link : string
}

interface compProps{
    symptomsData: symptomsData[]
    brand: string
    appliance: string
}

export default function AdditionalSymptoms({symptomsData, brand, appliance} : compProps) {
    return (
        <div>
            <div className="mx-4 lg:max-w-149 lg:mx-auto my-12 lg:mt-0 lg:mb-10">
                <h2 className="font-semibold text-2xl text-start">
                    Additional possible {brand} {appliance} symptoms you may experience
                </h2>
                <div className="mt-4 lg:mt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1  lg:gap-y-0">
                        {symptomsData.map((symptom, index) => (
                            <div key={index} className="flex flex-col h-full">
                                <div className="font-medium leading-8">
                                    <a
                                        href={symptom.link}
                                        className="hover:text-inherit focus:text-inherit hover:no-underline focus:no-underline"
                                        target="_self"
                                    >
                                        <span className="text-gray-500 leading-6 line-clamp-2 mb-2 lg:mb-3">
                                            {symptom.title}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

