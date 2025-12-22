"use client"
import { useState } from "react"
import { CheckCircle, X } from 'lucide-react'
import brandWithAppliances from "@/brand_appliances.json"
import appliancesIssues from "@/appliance_issues_full.json"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { brandIcons } from "@/utils/IconImports"
import { useParams } from "next/navigation"

interface BrandWithAppliances {
    icon: string;
    slug: string;
    appliances: { name: string; slug: string }[];
}

interface SymptomIssue {
    title: string
    description: string
    url: string
}

interface ApplianceWithIssues {
    appliance: string
    issues: SymptomIssue[]
}

type SymptomLink = {
    label: string;
    href: string;
    testId: string;
};

const symptomLinks: SymptomLink[] = [
    { label: "Payne central air not working", href: "/symptom/payne-central-air-not-working", testId: "recent_symptoms_symptom_0" },
    { label: "ICP central air not working", href: "/symptom/icp-central-air-not-working", testId: "recent_symptoms_symptom_1" },
    { label: "Heil central air not working", href: "/symptom/heil-central-air-not-working", testId: "recent_symptoms_symptom_2" },
    { label: "Carrier central air not working", href: "/symptom/carrier-central-air-not-working", testId: "recent_symptoms_symptom_3" },
    { label: "Comfortmaker central air not working", href: "/symptom/comfortmaker-central-air-not-working", testId: "recent_symptoms_symptom_4" },
    { label: "Ruud central air not working", href: "/symptom/ruud-central-air-not-working", testId: "recent_symptoms_symptom_5" },
    { label: "York central air not working", href: "/symptom/york-central-air-not-working", testId: "recent_symptoms_symptom_6" },
    { label: "Goodman central air not working", href: "/symptom/goodman-central-air-not-working", testId: "recent_symptoms_symptom_7" },
    { label: "Kenmore central air not working", href: "/symptom/kenmore-central-air-not-working", testId: "recent_symptoms_symptom_8" },
    { label: "Rheem central air not working", href: "/symptom/rheem-central-air-not-working", testId: "recent_symptoms_symptom_9" },
];

const applianceIssues: ApplianceWithIssues[] = appliancesIssues
const brandAppliances: { [brand: string]: BrandWithAppliances } = brandWithAppliances

export default function SymptomSection() {

    const [selectedBrand, setSelectedBrand] = useState<string>("")
    const [selectedAppliance, setSelectedAppliance] = useState<string>("")
    const [availableAppliances, setAvailableAppliances] = useState<string[]>([])
    const [displayedIssues, setDisplayedIssues] = useState<any[]>([])
    const [selectedIssues, setSelectedIssues] = useState<Set<number>>(new Set())
    const [applianceSlug, setApplianceSlug] = useState("")
    const [brandSlug, setBrandSlug] = useState("")
    const [availableAppliance, setavailableAppliance] = useState<{ name: string; slug: string }[]>([])

    const params = useParams()

    const handleBrandChange = (brand: string) => {
        if (brand === selectedBrand) {
            handleClearBrand()
        } else {
            setSelectedBrand(brand)
            setBrandSlug(brand)
            setSelectedAppliance("")
            setDisplayedIssues([])
            setSelectedIssues(new Set())

            if (brand && brandAppliances[brand]) {
                setAvailableAppliances(brandAppliances[brand].appliances.map(app => app.name))
                setavailableAppliance(brandAppliances[brand].appliances)
            } else {
                setAvailableAppliances([])
            }
        }
    }

    const handleClearBrand = () => {
        setSelectedBrand("")
        setSelectedAppliance("")
        setAvailableAppliances([])
        setDisplayedIssues([])
        setSelectedIssues(new Set())
    }

    const handleApplianceChange = (appliance: string) => {
        if (appliance === selectedAppliance) {
            handleClearAppliance()
        } else {
            setSelectedAppliance(appliance)
            setSelectedIssues(new Set())

            const app = availableAppliance.filter(app => app.name === appliance)
             setApplianceSlug(app[0].slug)

            if (appliance) {
                const applianceData = applianceIssues.find((item) => item.appliance === appliance)
                if (applianceData) {
                    setDisplayedIssues(applianceData.issues)
                } else {
                    setDisplayedIssues([])
                }
            } else {
                setDisplayedIssues([])
            }
        }
    }

    const handleClearAppliance = () => {
        setSelectedAppliance("")
        setDisplayedIssues([])
        setSelectedIssues(new Set())
    }

    const handleIssueClick = (index: number) => {
        setSelectedIssues((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(index)) {
                newSet.delete(index)
            } else {
                newSet.add(index)
            }
            return newSet
        })
    }

    console.log("brand val", selectedAppliance)

    return (
        <div className=" bg-gray-50">

            {/* Selection Section */}
            <section className="py-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="max-w-xl mx-auto space-y-6 mb-12">

                        {/* Select a brand name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Select a brand name</label>
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="cursor-pointer w-full h-12 justify-between bg-white border-gray-300 text-gray-700 hover:bg-white"
                                        >
                                            <span>{selectedBrand || "Select a brand name"}</span>
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) max-h-[300px] overflow-y-auto px-4">
                                        {Object.keys(brandAppliances).map((brand) => (
                                            <DropdownMenuItem
                                                key={brand}
                                                onClick={() => handleBrandChange(brand)}
                                                className={`cursor-pointer flex items-center gap-2  ${selectedBrand === brand ? "bg-blue-50" : ""}`}
                                            >
                                                <Image src={brandIcons[brand]} alt={brand} width={20} height={20} className="mr-2" />
                                                {brand}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {selectedBrand && (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="cursor-pointer h-12 w-12 shrink-0 bg-white hover:bg-gray-100 border-gray-300"
                                        onClick={handleClearBrand}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Select appliance</label>
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="cursor-pointer w-full h-12 justify-between bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={!selectedBrand}
                                        >
                                            <span>{selectedAppliance || (selectedBrand ? "Select appliance" : "Please select a brand first")}</span>
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) max-h-[300px] overflow-y-auto px-4">
                                        {availableAppliances.map((appliance) => (
                                            <DropdownMenuItem
                                                key={appliance}
                                                onClick={() => handleApplianceChange(appliance)}
                                                className={selectedAppliance === appliance ? "bg-blue-50 cursor-pointer" : "cursor-pointer"}
                                            >
                                                {appliance}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {selectedAppliance && (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="cursor-pointer h-12 w-12 shrink-0 bg-white hover:bg-gray-100 border-gray-300"
                                        onClick={handleClearAppliance}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {displayedIssues.length > 0 ?
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {displayedIssues.map((issue, index) => (
                                    <Link key={index} href={`/symtom/${brandSlug}-${applianceSlug}-${issue.slug}`}>
                                        <Card
                                            key={index}
                                            onClick={() => handleIssueClick(index)}
                                            className={`transition-all cursor-pointer group ${selectedIssues.has(index)
                                                ? "border-[#003d82] border-2 bg-blue-50 shadow-md"
                                                : "border-gray-200 bg-white hover:shadow-md hover:border-gray-300"
                                                }`}
                                        >
                                            <CardHeader className="pb-3">
                                                <CardTitle
                                                    className={`text-base font-semibold leading-tight transition-colors ${selectedIssues.has(index) ? "text-[#003d82]" : "text-[#003d82] group-hover:text-blue-600"
                                                        }`}
                                                >
                                                    {issue.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                                    {issue.description}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        :
                        <section className="mx-4 pb-6 lg:mx-auto lg:mt-6 lg:max-w-xl">
                            <h2 className="text-3xl mx-2 pb-4 text-blue-950 font-semibold lg:pb-6">
                                Most Common Brand Appliance Symptoms
                            </h2>

                            <div className="grid grid-cols-1 gap-2 pb-8 md:grid-cols-2">
                                {symptomLinks.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        data-testid={item.testId}
                                        data-metric-id={item.testId}
                                        data-metric-value={item.href}
                                        className="p-2 text-md leading-6 font-medium text-blue-900 hover:text-blue-800 hover:no-underline hover:underline-offset-4 focus:outline-blue-1000"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    }
                </div>
            </section>
        </div>
    )
}