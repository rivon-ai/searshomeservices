import { getSymptomData } from '@/app/utils/symptom-data';
import React from 'react'
import DynamicSymptomRenderer from './components/DynamicSymptomRenderer';

export default async function Page({ params }: { params: Promise<{ 'brand-appliance-issue': string }> }) {
    const { 'brand-appliance-issue': slug } = await params;
    const data = await getSymptomData(slug);

    if (!data) {
        return <div className="p-8 text-center text-red-500">Symptom data not found for: {slug}</div>
    }

    return (
        <DynamicSymptomRenderer symptomData={data} />
    )
}
