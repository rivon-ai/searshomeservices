"use client"


import { useParams } from 'next/navigation'
import React from 'react'
import RadialStatsSection from './components/RadialChartSection';
import ScheduleCard from './components/ScheduleCard';

const statsData = [
    {
        value: 35,
        label: "Dirty Air Filter",
        description: "35% of the time it's the"
    },
    {
        value: 26,
        label: "Failed Safety Interlock Switch",
        description: "26% of the time it's the"
    },
    {
        value: 22,
        label: "Ignition System Failure",
        description: "22% of the time it's the"
    },
    {
        value: 17,
        label: "Something else",
        description: "17% of the time it's the"
    }
] as const;


export default function page() {
    const params = useParams()
    const brandApplianceIssue = params["brand-appliance-issue"] as string
    const [brand, appliance, issue] = brandApplianceIssue.split("-")

    return (
        <div>
            <h2>
                {brand} {appliance} {issue}
            </h2>
            <p>
                <span className='text-lg font-semibold'>Common reasons for you {brand} {appliance} {issue}</span>
                The most common reasons for your {brand} {appliance} {issue} are a dirty air filter, faulty safety interlock switch or a bad burner igniter.
            </p>

            <RadialStatsSection
                title={`Common ${appliance} issues`}
                stats={statsData}
            />
            <ScheduleCard />
        </div>
    )
}