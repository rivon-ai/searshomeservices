
import React from 'react'

import HeaderSection from '@/app/symptom-center/components/HeaderSection'
import RepairResourcesAndGlossary from './components/RepairResourcesAndGlossaryTerms'
import SymptomSection from './components/SymptomSection'

export default function page() {
    return (
        <section>
            <HeaderSection />
            <SymptomSection />
            <RepairResourcesAndGlossary />
        </section>
    )
}