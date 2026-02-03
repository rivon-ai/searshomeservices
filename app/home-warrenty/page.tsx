import { StaticImageData } from 'next/image';
import React from 'react'

import heroImage from '@/public/home-warrenty/heroImage.webp'
import HeroBanner from './components/HeroBanner';

import trophy from "@/public/home-warrenty/trophyCup.svg"
import star from "@/public/home-warrenty/star.svg"
import hammerGroup from '@/public/home-warrenty/HammerGroup.svg'
import HVAC from '@/public/home-warrenty/HVAC.svg'
import gift from '@/public/home-warrenty/gift.svg'
import home from '@/public/home-warrenty/home-improvement.svg'
import PropositionGrid from './components/PropositionGrid';

import kenmore from '@/public/home-warrenty/kenmore.svg'
import whirpool from '@/public/home-warrenty/whirlpool.svg'
import GE from '@/public/home-warrenty/GE.svg'
import kitchenAid from '@/public/home-warrenty/kitchenaid.svg'
import bosch from '@/public/home-warrenty/bosch.svg'
import samsung from '@/public/home-warrenty/Samsung.svg'
import TrustAndLegacy from './components/TrustAndLegacy';

import appliancePlanSVG from '@/public/home-warrenty/Appliance-plan-svg.svg'
import systemPlanSVG from '@/public/home-warrenty/system-plan-svg.svg'
import wholeHomePlanSVG from '@/public/home-warrenty/home-plan-svg.svg'
import applianceHVACPlanSVG from '@/public/home-warrenty/applianceAndHvac-plan-svg.svg'
import PlanComparisonCards from './components/PlanComparisonCards';

import { CiCalendar } from "react-icons/ci";
import { FaUserNurse } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import HeritageServiceSections from './components/HeritageServiceSections';

import callUsImage from '@/public/home-warrenty/call-us-md.svg'
import FaqAndCallAction from './components/FaqAndCallAction';

import glossaryImgOne from '@/public/home-warrenty/glossaryImgOne.webp'
import glossaryImgTwo from '@/public/home-warrenty/glossaryImgTwo.webp'
import glossaryImgThree from '@/public/home-warrenty/glossaryImgThree.webp'
import glossaryImgFour from '@/public/home-warrenty/glossaryImgFour.webp'
import ResourcesSection from './components/ResourcesSection';
import RatingSection from '@/components/RatingSection';

const pageSections = {
    // 1. Hero Banner
    heroBannerData: {
        sectionName: "Hero Banner",
        interfaceType: "HeroBanner",
        heading: "When your appliances stop, your life can't",
        subheading: "With one of our affordable home warranty plans, you'll worry less about the cost or stress of unexpected appliance or home-system repairs.",
        bodyText: "Plus, you'll get $250 in benefits every year, when you use them*",
        ctaText: "Get Free Quote",
        trustBadges: [
            "600k+ 5-Star Reviews",
            "3M+ homes repaired a year",
            "1,500 licensed, local experts"
        ],
        image: heroImage
    },

    // 2. Value Proposition Grid
    featureGridData: {
        sectionName: "Value Proposition Grid",
        interfaceType: "FeatureGrid",
        heading: "We cover any brand, any age – with a six-month guarantee",
        subheading: "2,500 licensed, local experts are in your neighborhood today",
        items: [
            {
                title: "Cover Everything",
                description: "Protect up to 12 appliances and 10 systems. Cover any brand, from any store, of any age.",
                icon: trophy
            },
            {
                title: "6-month Guarantee",
                description: "If you have the same issue within 180 days, we’ll repair it without a cost to you.",
                icon: star
            },
            {
                title: "Repaired or Replaced",
                description: "If we can't repair it, we'll replace it free of charge.1",
                icon: hammerGroup
            },
            {
                title: "Year Round Comfort, On Us",
                description: "2 annual HVAC tune-ups ($220+ value) included with every plan.",
                icon: HVAC
            },
            {
                title: "Bonus Benefits",
                description: "Get 15% off Sears PartsDirect and 25% off non-covered appliance and HVAC repairs.",
                icon: gift
            },
            {
                title: "Sears Home Advantage Membership",
                description: "Earn rewards to use towards your Sears Protect premiums and deductible payments plus expert tips and exclusive special offers.2",
                icon: home
            }
        ],
        ctaText: "Get Free Quote"
    },

    // 3. Brand Trust & Legacy
    brandTrustData: {
        sectionName: "Brand Trust & Legacy",
        interfaceType: "SplitLayoutWithVideo",
        left: {
            heading: "We're Who Everyone Calls",
            bodyText: "We service any appliance make or model, no matter who made it or where you bought it. In fact, brands call us to repair their appliances. No, for real, they call us to fix their own appliances. So, yeah, we're pretty good.",
            brands: [
                kenmore,
                whirpool,
                GE,
                kitchenAid,
                bosch,
                samsung
            ],
            videoEmbed: true,
            videoLabel: "Play"
        },
        right: {
            heading: "We've Seen it All",
            bodyText: "If we weren't good at what we do, we would have gone out of business 100 years ago. But for over a century, we've delivered trusted service to over 150 million homes. On top of that, we're the only nationwide provider that employs its own service experts. No big deal."
        }
    },

    // 4. Plan Comparison Carousel
    comparisonPlanData: {
        sectionName: "Plan Comparison Carousel",
        interfaceType: "PlanCardCarousel",
        heading: "Worry less about the cost of unexpected repairs",
        subheading: "We've got you covered with flexible pricing options and $250 in savings each year, when you use them.",
        plans: [
            {
                title: "System Plan",
                value: "10",
                subtitle: "Systems covered",
                features: [
                    "Air Conditioning",
                    "Heating",
                    "Electrical System",
                    "Plumbing",
                    "Garage Door Opener",
                    "Water Heater",
                    "And more..."
                ],
                ctaText: "Get started",
                icon: systemPlanSVG,
                isFeatured: false,

            },
            {
                title: "Appliance Plan",
                value: "12",
                subtitle: "Appliances covered",
                features: [
                    "Refrigerator(up to two)",
                    "Washer",
                    "Dryer",
                    "Range or Cooktop",
                    "Wall Oven",
                    "Dishwasher",
                    "And more..."
                ],
                ctaText: "Get started",
                icon: appliancePlanSVG,
                isFeatured: true,
                badge: "Most Popular"
            },
            {
                title: "Whole Home Plan",
                value: "22",
                subtitle: "All items covered!",
                features: [
                    "The Whole Home Plan combines the appliances and systems that the other two plans cover",
                    "Appliances",
                    "HVAC",
                    "Plumbing",
                    "Electrical"
                ],
                ctaText: "Get started",
                icon: wholeHomePlanSVG,
                isFeatured: false,

            },
            {
                title: "Appliance + HVAC Plan",
                value: "14",
                subtitle: "Appliances covered!",
                features: [
                    "Plus:",
                    "Air Conditioning",
                    "Heating",
                    "Including ductwork"
                ],
                ctaText: "Get started",
                icon: applianceHVACPlanSVG,
                isFeatured: false,

            }
        ],
        headingTwo: "It's Easy",
        steps: [
            {
                title: "Pick Your Plan",
                description: "Get only the coverage you need.",
                icon: "icon-pick-plan"
            },
            {
                title: "Schedule",
                description: "Book service in a few clickity clicks.",
                icon: "icon-schedule"
            },
            {
                title: "Repair",
                description: "A local expert tech will fix the problem fast.",
                icon: "icon-repair"
            }
        ]
    },

    // 5. review carousel
    reviewCarousel: {
        bottomRow: {
            heading: "Written in the stars",
            subheading: "With more than 1,000,000 5-Star Reviews, our repair service reputation speaks for itself.",
            testimonials: [
                {
                    title: "Excellent Service",
                    author: "Mae M, Hyattsville, MD",
                    rating: 5,
                    text: "The customer service rep was very polite and professional. He took his time to explain everything to me in detail regarding my washing machine repair. I will be using their service again for future needs.",
                },
                {
                    title: "Informative & Helpful",
                    author: "Debbie D, Mesa, AZ",
                    rating: 5,
                    text: "Very informative on the issues and concerns I had. Gave good suggestions on how to maintain the refrigerator and keep it running properly",
                },
                {
                    title: "Quick Diagnosis",
                    author: "Richard F, Dixon, IL",
                    rating: 5,
                    text: "Our Technician arrived early, and quickly diagnosed the problem, which was out of the ordinary. He didn't keep us waiting long for our explanation and estimate for the repairs.",
                },
                {
                    title: "Knowledgeable Tech",
                    author: "Janet S, Lubbock, TX",
                    rating: 5,
                    text: "Very pleased with Technician. Very knowledgable and polite and clean. Arrived on time as schedule and communicated. Could not be happier with the whole experience.",
                },
                {
                    title: "Fast Repair",
                    author: "Colleen C, Fort Myers, FL",
                    rating: 5,
                    text: "I was not home at the time of my appointment but my serviceman was cooperative and made it easy to get my dryer fixed. He listened to my notes to call my landlord upon arrival. My landlord said he was fast in diagnosing and repairing the issue",
                },
                {
                    title: "Friendly & Professional",
                    author: "Mslizb, Inglewood, CA",
                    rating: 5,
                    text: "The technician was on time and when he arrived he explained what the service consisted of and what it did not consist of. Very friendly and professional",
                },
                {
                    title: "Great Experience",
                    author: "Kimberly P, Edelstein, IL",
                    rating: 5,
                    text: "Repair man was here, diagnosed the problem, and ordered parts the same day. He came back after the parts arrived to fix it. It works great!",
                },
                {
                    title: "Highly Professional",
                    author: "JLFH, Traverse City, MI",
                    rating: 5,
                    text: "Mike has worked on my dryer a few times. Professional and very good at what he does. W/permission he added me to his schedule at the end of the day when o called and let him know the part had finally arrived.",
                },
                {
                    title: "Excellent Scheduling",
                    author: "Laura B, Beaufort, NC",
                    rating: 5,
                    text: "Michael provided excellent service on our Kitchen Aid dishwasher. He not only fixed the issue but he also gave us some pointers for getting even higher performance from the appliance. The appointment schedule was updated regularly, and he arrived in the estimated time frame. We're happy customers and we'll call on Sears again if needed.",
                }
            ],
            isCarousel: true
        }
    },

    // 6. Heritage + Human Proof
    heritageHumanProofData: {
        sectionName: "Heritage + Human Proof",
        interfaceType: "HeroBannerWithPhoto",
        heading: "Doing it right since 1892",
        subheading: "For over 125 years, we've focused on our customers. Offering them expert service and value.\nIf you don't believe us, just ask your great, great, great grandparents.",
        photoCaption: "Three smiling technicians in blue uniforms standing in front of a service van.",
        videoEmbed: true,
        videoLabel: "Play"
    },

    // 7. Service Process + Key Features
    serviceProcessKeyFeaturesData: {
        sectionName: "Service Process + Key Features",
        interfaceType: "TwoColumnFeatureList",
        leftColumn: {
            heading: "HOW IT WORKS",
            items: [
                {
                    number: 1,
                    title: "Let Us Know",
                    description: "If anything breaks just let us know.",
                    icon: <CiCalendar />
                },
                {
                    number: 2,
                    title: "We Book You In",
                    description: "We'll let you know when an expert technician will arrive.",
                    icon: <FaUserNurse />
                },
                {
                    number: 3,
                    title: "Put Your Wallet Away",
                    description: "We'll fix the problem quickly, you just relax.",
                    icon: <AiFillLike />
                }
            ]
        },
        rightColumn: {
            heading: "THINGS TO KNOW",
            items: [
                {
                    title: "Flexible scheduling",
                    description: "Available 6 days a week in most areas",
                    icon: "icon-schedule"
                },
                {
                    title: "Expert technicians",
                    description: "2,500+ manufacturer-trained technicians.",
                    icon: "icon-expert-tech"
                },
                {
                    title: "Quality Parts",
                    description: "Repairs no matter where you bought it.",
                    icon: "icon-quality-parts"
                }
            ]
        },
        ctaBlock: {
            heading: "Wherever you call home, you can call us.",
            subheading: "Available in most zip codes nationwide, we’re here to help with monthly plans starting at very low prices.",
            ctaText: "See Pricing Plans"
        }
    },

    // 8. Tech Credibility
    techCredibilityData: {
        sectionName: "Tech Credibility + FAQs",
        interfaceType: "SplitLayoutWithFAQ",
        top: {
            heading: "The Best Techs",
            subheading: "Saving You From The Search",
            bodyText: "Sears Protect is the only nationwide provider that employs its own service experts - technicians who undergo extensive training. That means you don't have to spend hours searching for the best, asking around or getting quotes.",
            bulletPoints: [
                "Over 2500 qualified and reputable technicians nationwide",
                "Plus, thousands of pre-screened local experts are ready to help",
                "Most repairs are done in 1-hour or less"
            ],
            videoEmbed: true,
            videoLabel: "Play"
        },
    },

    // 9. FAQ and Call to Action + Resource Hub
    FaqAndCallToActionbData: {
        sectionName: "Call to Action + Resource Hub",
        interfaceType: "CallToActionWithResourcePreview",
        heading: "FAQs",
        subheading: "Here's some of the common questions we get.",
        faqItems: [
            {
                question: "How do I use some of the extra benefits like ordering parts through Sears Parts Direct or a home improvement project at Sears Home Improvement?",
                answer: "Home Hub makes using your Sears Protect benefits a breeze! All benefits including your bonus benefits can be utilized via your customized Home Hub portal."
            },
            {
                question: "How do I schedule service under Sears Protect?",
                answer: "To schedule repairs (or use any of the other great benefits Sears Protect has to offer) just go to Home Hub, we'll take it from there."
            },
            {
                question: "Why does the Sears Protect plan have a 30 day waiting period?",
                answer: "It's common for Home Warranty plans to have an initial 30 day waiting period from your initial purchase date. One of the unique benefits of the Sears Protect plan is being entitled to a 25% discount on appliance and HVAC repairs (service performed by Sears) in the event something goes wrong."
            },
            {
                question: "What about the HVAC tune-ups? Can I schedule them at any time?",
                answer: "We schedule the HVAC tune-ups during specific timeframes throughout the year. This allows us to make sure we can be available for our customers during the busy season if they are without their primary heating or cooling unit.<br /> We schedule tune- ups during the following timeframes: <br/> Cooling: February 1st through May 31st <br /> Heating: August 1st through January 31st"
            }
        ],
        callToAction: {
            heading: "Call Us",
            subheading: "Call us, we're ready to help.",
            ctaText: "Call Now",
            img: callUsImage,
            imageAlt: "Woman on phone with chat bubble saying 'Project Completed'"
        },
    },

    // 10. Glossary Terms and Resource Hub
    glossaryTermsData: {
        sectionName: "Glossary Terms and Resource Hub",
        interfaceType: "GlossaryListAndResourceHub",
        resourceHub: {
            heading: "Protect Resources",
            articles: [
                {
                    title: "5 Savvy Steps to Choose the Ideal Home Warranty",
                    readTime: "5 min read",
                    date: "Dec. 12",
                    excerpt: "Choosing a home warranty can seem like a tough gig, but we’re here to make it a breeze.",
                    category: "Laundry Appliances",
                    img: glossaryImgOne,
                    imageAlt: "Homeowner researching home warranty companies on the web."
                },
                {
                    title: "What is a Home Warranty? Complete Guide for Homeowners",
                    readTime: "9 min read",
                    date: "Dec. 12",
                    excerpt: "This informative guide explains what a home warranty is, how it differs from homeowners insurance, what’s covered, typical costs, and who should consider one. Get the clarity you need to decide if it’s right for you.",
                    category: "Kitchen Appliances",
                    img: glossaryImgTwo,
                    imageAlt: "Image of a modern kitchen showing appliances that a home warranty covers."
                },
                {
                    title: "How to Find the Best Home Warranty for Appliances: 2025",
                    readTime: "6 min read",
                    date: "Nov. 13",
                    excerpt: "Discover how to find the best home warranty for appliances at Sears Home Services.",
                    category: "Laundry Appliances",
                    img: glossaryImgThree,
                    imageAlt: "Homeowners find the best home warranty available for appliances in their house."
                },
                {
                    title: "How to Extend Home Appliance Warranties: 2025 Tips",
                    readTime: "7 min read",
                    date: "Oct. 13",
                    excerpt: "Learn how to extend appliance warranties with Sears Home Services.",
                    category: "Kitchen Appliances",
                    img: glossaryImgFour,
                    imageAlt: "Appliance repair technician fixing a dishwasher that failed and could use an extended home warranty to cover the repair."
                }
            ],
            ctaText: "Get Free Quote"
        },
        heading: "Glossary Terms",
        terms: [
            {
                term: "What is the drum of the washing machine?",
                definition: "The drum is the core part of the washer that holds your laundry and enables the cleaning process through rotation, agitation, and rinsing."
            },
            {
                term: "What is a 608 Certification?",
                definition: "The 608 Certification, mandated by the Environmental Protection Agency (EPA), is required for HVAC technicians to legally handle refrigerants. It ensures technicians understand refrigerant types, environmental impact, and proper handling techniques."
            },
            {
                term: "What is a Compressor?",
                definition: "A compressor is a mechanical device that increases the pressure of a gas by reducing its volume, essential in various systems including refrigerators, air conditioners, and HVAC units for cooling and refrigeration processes."
            },
            {
                term: "What is a Condenser?",
                definition: "A condenser is a component of HVAC and refrigeration systems, responsible for releasing absorbed heat from the refrigerant into the outside air or a water line, thus facilitating the cooling process."
            }
        ]
    },

    // 11. Recent Appliance Symptoms
    recentApplianceSymptomsData: {
        sectionName: "Recent Appliance Symptoms",
        interfaceType: "SymptomList",
        heading: "Recent Appliance Symptoms",
        symptoms: [
            {
                brand: "Payne",
                issue: "central air not working",
                solution: "When your Payne central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair."
            },
            {
                brand: "ICP",
                issue: "central air not working",
                solution: "When your ICP central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair."
            },
            {
                brand: "Heil",
                issue: "central air not working",
                solution: "When your Heil central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair."
            },
            {
                brand: "Carrier",
                issue: "central air not working",
                solution: "When your Carrier central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair."
            },
            {
                brand: "Comfortmaker",
                issue: "central air not working",
                solution: "When your Comfortmaker central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair."
            },
            {
                brand: "Ruud",
                issue: "central air not working",
                solution: "When your Ruud central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair."
            }
        ]
    },

    // 12. Service Availability by City
    serviceAvailabilityByCityData: {
        sectionName: "Service Availability by City",
        interfaceType: "CityList",
        heading: "Sears Home Services Available In These Cities",
        cities: [
            "New York City",
            "Houston",
            "San Antonio",
            "San Jose",
            "Fort Worth",
            "Indianapolis",
            "Denver",
            "Los Angeles",
            "Phoenix",
            "San Diego",
            "Austin",
            "Columbus",
            "San Francisco",
            "Nashville",
            "Chicago",
            "Philadelphia",
            "Dallas",
            "Jacksonville",
            "Charlotte",
            "Seattle"
        ],
        viewAllLink: "See all states"
    }
} as const;

export type HeroBannerData = typeof pageSections.heroBannerData;
export type FeatureGridData = typeof pageSections.featureGridData;
export type TrustAndLegacyDataType = typeof pageSections.brandTrustData;
export type ComparisonPlanData = typeof pageSections.comparisonPlanData;
export type ReviewCarousel = typeof pageSections.reviewCarousel
export type heritageHumanProofDataType = typeof pageSections.heritageHumanProofData;
export type serviceProcessKeyFeaturesDataType = typeof pageSections.serviceProcessKeyFeaturesData;
export type techCredibilityDataType = typeof pageSections.techCredibilityData;
export type FaqAndCallToActionbDataType = typeof pageSections.FaqAndCallToActionbData;
export type GlossaryTermsDataType = typeof pageSections.glossaryTermsData;
export type RecentApplianceSymptomsDataType = typeof pageSections.recentApplianceSymptomsData;
export type ServiceAvailabilityByCityDataType = typeof pageSections.serviceAvailabilityByCityData;

export default function page() {
    return (
        <div>
            <HeroBanner heroBannerData={pageSections.heroBannerData} />
            <PropositionGrid featureGridData={pageSections.featureGridData} />
            <TrustAndLegacy brandTrustData={pageSections.brandTrustData} />
            <PlanComparisonCards comparisonCardsData={pageSections.comparisonPlanData} />
            <RatingSection reviews={pageSections.reviewCarousel.bottomRow.testimonials} />
            <HeritageServiceSections heritageHumanProofData={pageSections.heritageHumanProofData} serviceProcessKeyFeaturesData={pageSections.serviceProcessKeyFeaturesData} techCredibilityData={pageSections.techCredibilityData} />
            <FaqAndCallAction FaqAndCallToActionbData={pageSections.FaqAndCallToActionbData} />
            <ResourcesSection
                glossaryTermsData={pageSections.glossaryTermsData}
                recentApplianceSymptomsData={pageSections.recentApplianceSymptomsData}
                serviceAvailabilityByCityData={pageSections.serviceAvailabilityByCityData}
            />
        </div>
    )
}