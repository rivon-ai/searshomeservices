import Link from 'next/link';
import React from 'react';

interface repairsData {
    title: string
    description: string
    linkText: string
    linkUrl: string
}


const RepairCard = ({ title, description, linkText, linkUrl }: repairsData ) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 p-6">
                {title}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6 grow p-6">
                {description}
            </p>
            <div className='p-6 border-t'>
                <Link
                    href={linkUrl}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline inline-block"
                >
                    {linkText}
                </Link>
            </div>
        </div>
    );
};

interface gridData{
    mainTitle : string
    repairs : repairsData[]
}

const RepairCardsContainer = ({ mainTitle, repairs }: gridData) => {

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold text-blue-950 mb-8">
                {mainTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repairs.map(( repair : repairsData , index : number ) => (
                    <RepairCard
                        key={index}
                        title={repair ? repair.title : ''}
                        description={repair ? repair.description : ''}
                        linkText={repair ? repair.linkText : ''}
                        linkUrl={repair ? repair.linkUrl : ''}
                    />
                ))}
            </div>
        </div>
    );
};

export default RepairCardsContainer

