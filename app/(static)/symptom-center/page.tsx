
import React from 'react'

import HeaderSection from '@/components/features/symptom-center/HeaderSection'
import RepairResourcesAndGlossary from '@/components/features/symptom-center/RepairResourcesAndGlossaryTerms'
import SymptomSection from '@/components/features/symptom-center/SymptomSection'

export default function page() {
    return (
        <section>
            <HeaderSection />
            <SymptomSection />
            <RepairResourcesAndGlossary />
        </section>
    )
}