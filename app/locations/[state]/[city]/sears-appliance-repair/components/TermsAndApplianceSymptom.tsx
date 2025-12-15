"use client"


import React from 'react'

interface dataType{
    title : string,
    description: string
}

interface termsProps{
symptoms: dataType[],
glossaryTerms : dataType[]
}

export default function TermsAndApplianceSymptom({symptoms, glossaryTerms} : termsProps) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 bg-white">
            {/* Glossary Terms Section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-blue-900 mb-8">Glossary Terms</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {glossaryTerms.map((term, index) => (
                        <div key={index}>
                            <h3 className="text-base font-semibold text-blue-900 mb-2 hover:text-blue-700 cursor-pointer">
                                {term.title}
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{term.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Common Appliance Symptoms Section */}
            <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-8">Common Appliance Symptoms</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {symptoms.map((symptom, index) => (
                        <div key={index}>
                            <h3 className="text-base font-semibold text-blue-900 mb-2 hover:text-blue-700 cursor-pointer">
                                {symptom.title}
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{symptom.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}