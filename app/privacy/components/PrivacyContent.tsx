import Link from "next/link";
import { title } from "process";
import React from "react";

type Section = {
    key: string
    title: string
    content?: string[]
    list?: string[]
    subsections?: Section[]
}

interface LoyaltyProgramSection {
    key: string;
    title: string;
    intro: string[];
    subsections: {
        key: string;
        title: string;
        table: {
            headers: string[];
            rows: {
                program: string;
                incentiveOffered: string;
                materialTerms: string[];
                howToOptIn: string[];
            }[];
        };
        additionalInfo: {
            valueStatement: string;
            thirdParties: string[];
        };
    }[];
}

type ContentType = 'text' | 'table' | 'list' | 'subsections' | 'contact';

interface BaseContent {
    type: ContentType;
    key: string;
}

interface TextContent extends BaseContent {
    type: 'text';
    content: string[];
}

interface TableContent extends BaseContent {
    type: 'table';
    headers: string[];
    rows: Record<string, string>[];
}

interface ListContent extends BaseContent {
    type: 'list';
    items: string[];
    ordered?: boolean;
}

interface SubsectionContent extends BaseContent {
    type: 'subsections';
    sections: SectionFragment[];
}

interface ContactContent extends BaseContent {
    type: 'contact';
    phone: string;
    email?: string;
    address: string[];
}

interface SectionFragment {
    id: string;
    title?: string;
    content: (TextContent | TableContent | ListContent | SubsectionContent | ContactContent)[];
    footerLink?: string; // e.g., "Top"
}

const privacyContent = {
    title: "Privacy Policy",
    effectiveDate: "Effective Date: November 3, 2025",
    mainText: [
        {
            id: 1,
            content: `This website or mobile application ("Site") is owned and operated by a Transform Holdco LLC ("Transformco", "we", "our", or "us") entity or licensee. Your privacy is important to us and we want you to understand what personal information we gather about you, how we use it, and the safeguards we have in place designed to protect it. This Privacy Policy applies to personal information collected through this Site, our services, products, call centers, and other offerings. We may update this Privacy Policy from time to time. If we make any changes, the updated Privacy Policy will be posted to this Site with a revised Effective Date. We encourage you to periodically review this page for the latest information on our privacy practices. Your use of this Site, and any disputes arising from it, are subject to this Privacy Policy as well as our`,
        },
        {
            id: 2,
            content: "Terms of Use",
            isLink: true,
            href: "#",
        },
        {
            id: 3,
            content: `and all of its dispute resolution provisions, including arbitration, class action waiver, limitation on damages and choice of law. By using the Site or otherwise providing personal information to us, you agree to our Terms of Use and consent to our personal information collection, use, and disclosure practices. If you do not agree, please discontinue use of the Site.`,
        },
    ],
    subtitle: "Get answers and information about:",
    questions: [
        "What Type of Personal Information Do We Collect and How Do We Use It?",
        "What Information Do We Share and With Whom?",
        "Can I Disable Cookies?",
        "Children’s Privacy",
        "I Am a Minor, How Can I Remove My Posted Content?",
        "What About Links to Other Sites?",
        "Interest-Based Ads - Online Advertisements",
        "Is My Information Secure?",
        "How Can I Access My Personal Information?",
        "Can I ‘Opt-Out’ of Receiving Promotional Emails?",
        "California Residents",
        "Loyalty Program and Notice of Financial Incentive Disclosures",
        "State Specific Disclosures",
        "Nevada Residents",
        "How May I Contact You?",
    ],
};

const personalInfoContent = {
    title: "What Type of Personal Information Do We Collect and How Do We Use It?",
    paragraphs: [
        `We may collect personal information (for example, your full name, email address, mailing address, telephone number, mobile phone number or payment information) from you when you voluntarily submit the information to us, such as when you purchase items from us, sign up for one of our services or programs, or register with our Site. We may also collect personal information from you—either directly or via one of our vendors—in other ways, including, without limitation, if you choose to subscribe to our emails; participate in sweepstakes, contests, surveys, and polls; post content or suggestions on this Site; or use any of the Site’s other features that otherwise permit you to provide information or other content.`,


        `We also may collect other information about you, including, without limitation, demographic information (such as number of household members, age, and gender) and information about your purchase preferences directly from you (whether online or offline) or from vendors such as public databases, social media platforms, data append services, and others. In addition, we may collect information (such as your interests, hobbies, and lifestyle choices; groups with which you are affiliated; and products you want, like, or own) from you as you use this Site and when you choose to provide this information to us through any interaction with this Site.`,
    ],


    usageIntro: "We may use the information we collect to:",


    usageList: [
        "process and fulfill your order,",
        "notify you of your order status, prevent fraud, and otherwise provide you with customer service;",
        "respond to your inquiries and requests; create an account and register you as a Site user (\"Registered User\") and/or Shop Your Way member (\"Member\");",
        "for marketing purposes and to send you information regarding this Site and other Transformco Sites, as well as about our products, programs or services;",
        "provide you with mobile alerts, if you have requested them;",
        "customize your experience on this Site and on other Transformco Sites;",
        "provide you with relevant offers, products and services;",
        "permit you to use this Site’s social networking features; or",
        "provide you with other services.",
    ],


    additionalParagraphs: [
        `We may also use the personal information we collect for our business purposes, such as data analysis, audits, developing new products and services, enhancing our Sites, improving our services, personalizing your experiences, identifying usage trends and determining the effectiveness of our promotional campaigns.`,


        `Some Site features may make use of your device attributes and settings that will allow our Site to determine your physical location. Such technologies may include IP address mapping, WiFi, GPS signals, cell tower positioning or other technologies. We use this information to enhance and personalize your experience and provide you with offers, products and services that may be of interest to you.`,


        `We use session replay technology to observe your mouse movements, scrolling, and clicks on our Sites. We use these tracking tools for support and analytics purposes, and to better understand how people engage with our Sites. This information is often collected and processed by our service providers who we have engaged to analyze this information on our behalf.`,


        `We may engage vendors to provide certain interactive features on our Site. Your use of these interactive features is voluntary, and we may retain the information that you submit through these features. For example, we may offer an interactive chat feature on the Site to assist you and for other customer service purposes.`,
    ],


    aiTitle: "Generative AI Services",


    aiParagraphs: [
        `We use generative AI services, including through our phone services and website chatbot functionality which collect certain information you provide when you use these services as well as information about your visit to our Site and use of our services.`,


        `All information you submit through our AI services may be used for a variety of purposes, including automated processing, improving our products or services, quality improvement, or training, including continuous training of generative AI services.`,
    ],
};

const interestBasedAdsContent = {
    sectionTitle: "Interest-Based Ads - Online Advertisements",
    content: [
        {
            id: 1,
            type: "paragraph",
            text: `This Site may display ads from other companies. We also partner with vendors to serve ads on our behalf on other non-affiliated sites or apps. Some of the ads on this Site or on other websites or apps may be personalized, meaning that they are intended to be relevant to you based on what we or the online advertising network serving the ad know about you or your device’s browsing activity. For example, information collected by our ad networks or other vendors across multiple sites that you visit may enable the network to predict your preferences and show you ads that are most likely to be of interest to you. We may share your information with our vendors to permit them to recognize and serve targeted ads to you across the different devices you use.`,
        },
        {
            id: 2,
            type: "paragraph",
            text: `Our vendors, including Facebook and Google, may use Cookies, web beacons, and other storage technologies to collect or receive information about your internet usage, including your use of this Site, and use that information to provide measurement services and targeted ads. We and our vendors may use first-party Cookies or other first-party identifiers as well as Cookies or other identifiers operated by our vendors to deliver advertisements, create a profile of you, measure your interests, detect your demographics, detect your location, and personalize content.`,
        },
        {
            id: 3,
            type: "paragraph",
            text: `You may opt out of Facebook Custom Audiences by logging into your Facebook account and changing your privacy or advertising settings.`,
        },
        {
            id: 4,
            type: "paragraph",
            text: `We may use certain web analytics services, including Google Analytics, to help us understand and analyze how visitors use the Site and to serve ads on our behalf across the Internet. We’ve implemented Google Analytics Advertising Features such as remarketing with analytics, interest-based advertising, and demographics and interests reporting. For more information on how Google Analytics uses data collected through the Site, visit policies.google.com/technologies/partner-sites. You may also be able to opt out of Google Analytics by visiting tools.google.com/dlpage/gaoptout.`,
            links: [
                {
                    text: "policies.google.com/technologies/partner-sites",
                    href: "https://policies.google.com/technologies/partner-sites",
                },
                {
                    text: "tools.google.com/dlpage/gaoptout",
                    href: "https://tools.google.com/dlpage/gaoptout",
                },
            ],
        },
        {
            id: 5,
            type: "list",
            items: [
                "Remarketing with Google Analytics",
                "Google Analytics Demographics and Interest Reporting",
                "Google Display Network Impression Reporting",
            ],
        },
        {
            id: 6,
            type: "paragraph",
            text: `You may also download the AppChoices app at www.aboutads.info/appchoices to opt-out of personalized in-app advertising. The Network Advertising Initiative offers useful information about internet advertising companies, including information about how to opt-out of interest-based advertising by their members. You may also visit http://www.aboutads.info/consumers/ to learn about how to opt-out from online or in-app behavioral ads served by some or all participating companies. To opt-out of Google’s network of interest-based advertising, visit adssettings.google.com.`,
            links: [
                {
                    text: "www.aboutads.info/appchoices",
                    href: "https://www.aboutads.info/appchoices",
                },
                {
                    text: "www.aboutads.info/consumers",
                    href: "https://www.aboutads.info/consumers",
                },
                {
                    text: "adssettings.google.com",
                    href: "https://adssettings.google.com",
                },
            ],
        },
        {
            id: 7,
            type: "paragraph",
            text: `We utilize Criteo to help us serve personalized advertising. To learn more about Criteo’s privacy practices, including how to disable Criteo’s services, you may visit www.criteo.com/privacy.`,
            links: [
                {
                    text: "www.criteo.com/privacy",
                    href: "https://www.criteo.com/privacy",
                },
            ],
        },
        {
            id: 8,
            type: "paragraph",
            text: `These opt-out mechanisms rely on Cookies to remember your choices with respect to ad-serving on websites. If you delete your Cookies, use another computer or device, or change browsers, you will need to repeat this process. In addition, opting out of interest-based ads will not opt you out of all ads, but rather only those ads that are personalized to your interests based on activities observed on our Site and/or websites or mobile apps not owned and operated by Transformco. Some browsers may enable you to turn on or off a “Do Not Track” signal. We do not respond to “Do Not Track” signals.`,
        },
    ],
};

const securityAndAccessContent = [
    {
        sectionTitle: "Is My Information Secure?",
        content: `We protect your personal information using technical and administrative security measures to reduce the risks of loss, misuse, unauthorized access, disclosure, and alteration. Although we implement reasonable security measures on our Site, you should be aware that we cannot guarantee the security of your information submitted via the Internet. It is your responsibility to make sure that your passwords and account registration information are secure and not shared with third parties.`,
    },
    {
        sectionTitle: "How Can I Access My Personal Information?",
        content: `You can personalize your experience on this Site and other Transformco Sites by becoming a Registered User or Member. By registering, you will be able to tell us what products and services interest you, and whether you wish to receive information about special sales, promotions and other events. Once registered, you can submit, review and maintain your account profile information at any time by accessing your profile from within the particular Site.`,
    },
    {
        sectionTitle: `Can I "Opt-Out" of Receiving Promotional Emails?`,
        content: `From time to time, we may send you emails with promotional offers and messages. If you would no longer like to receive emails with promotional offers and messages from this Site, you can unsubscribe from these emails by following the unsubscribe link located at the bottom of each promotional email. Please note that you may still receive transactional notices in email (e.g., order confirmations, shipping notices, account statements, or important information regarding a product you have purchased) which will not have an unsubscribe link as they are not marketing emails.`,
    },
];

const sharingAndCookiesContent = [
    {
        id: "sharing",
        title: "What Information Do We Share and With Whom?",
        paragraphs: [
            "We may share your personal information with selected vendors with which Transformco or its affiliates have a relationship, and which have agreed to appropriate restrictions on the disclosure and use of your information.",
            "We may disclose your personal information to identify you to anyone to whom you send messages through this Site. You may disclose your own personal information through services to which you are able to post information and materials. Please note that any information you post or disclose through these services may be available to Site visitors and to the general public, depending on the particular service and any privacy settings in place (such as through your profile).",
            "We may share your personal information with our vendors that need access to your information to provide operational or other support services, such as payment processors, shipping agents, and product fulfillment vendors. These vendors must agree to appropriate restrictions on the disclosure and use of your information.",
            "We may provide information about you, which may include personal information, to regulatory authorities and law enforcement officials in accordance with applicable law, when we believe in good faith that the law requires it or to respond to requests from government authorities. There may be instances when we may use or disclose your personal information in order to protect or defend the legal rights, property or operations of Transformco or our employees or agents; to protect the rights, privacy, safety or security of Users, Members or others; to protect against fraud; and to allow us to pursue available remedies or limit the damages that we may sustain.",
            "Transformco may sell, transfer and/or share personal information in connection with a merger, reorganization, joint venture, assignment, spin-off, transfer or sale or disposition of all or any portion of our business, and in the event of a store closing or bankruptcy.",
        ],
    },
    {
        id: "cookies",
        title: "Can I Disable Cookies?",
        paragraphs: [
            "Most web browsers allow you to exercise control over Cookie files on your computer by erasing them, blocking them, or notifying you when a file is stored. Please take a look at your particular browser for instructions on this function.",
            "If you do elect to disable Cookies, please note that you may not be able to take full advantage of a personalized experience on this Site and on other Transformco Sites.",
        ],
    },
    {
        id: "children-privacy",
        title: "Children’s Privacy",
        paragraphs: [
            "This Site is intended for a general audience and not directed to children less than 13 years of age. We do not intend to collect personal information in a manner that is not permitted by the Children’s Online Privacy Protection Act (\"COPPA\").",
            "If you are under 13, do not provide any personal information to us. If we obtain actual knowledge that we have collected children’s personal information in a manner not permitted by COPPA, we will remove such data to the extent required by COPPA.",
            "If you believe your child may have provided us with their personal information, you can contact us at (888) 823-0650 and we will delete their personal information to the extent required by law.",
        ],
    },
    {
        id: "minor-removal",
        title: "I Am a Minor, How Can I Remove My Posted Content?",
        paragraphs: [
            "If you are under 18 and a Registered User or Member, you may ask us to remove content or information that you have posted to the Site.",
            "To remove posted content or information on shopyourway.com, please write to sywsolutions@syw.com.",
            "Please note that your request does not ensure complete or comprehensive removal of the content or information.",
        ],
    },
    , {
        id: "external-links",
        title: "What About Links to Other Sites?",
        paragraphs: [
            "This Site may contain links to content from other websites or applications that are not owned and operated by Transformco.",
            "Transformco is not responsible for the privacy practices of non-affiliated websites or applications, including, without limitation, those that are linked to or framed on this Site.",
            "You should read the privacy statements of each and every website and application that collects personal information.",
        ],
    },
];

const californiaResidentsContent = {
    sectionTitle: "California Residents",
    content: [
        {
            id: 1,
            type: "paragraph",
            text: `This California Consumer Privacy Notice section ("California Notice") applies to Consumers as defined by the California Consumer Privacy Act (as amended the "CCPA") and should be read along with our other notices found on Transformco.com, and other websites in our family of brands (including but not limited to Sears, Kmart, and ShopYourWay). In the event of a conflict between any other Transformco policy, statement or notice and this California Notice, this California Notice will prevail as to California Consumers' rights under the CCPA.`,
        },
        {
            id: 2,
            type: "paragraph",
            text: `This California Notice applies to California Consumers that visit our Site. If you are a current employee of Transformco, you may view your California Notice by visiting MPI. If you are a job applicant, you may view your California Notice by visiting our Careers page. If you interact with us in other contexts and have questions about your privacy rights or our Information Practices you can contact us at (888) 823-0650.`,
        },
        {
            id: 3,
            type: "paragraph",
            text: `Capitalized terms that are used herein shall have the meaning given to them in the remainder of the Privacy Policy except capitalized terms defined in the CCPA that are used in this California Notice shall have the same meaning as in the CCPA. Unless otherwise noted, the disclosures contained within this California Notice cover our activities in the prior 12 months from the Effective Date noted atop this Privacy Policy, as well as our current practices.`,
        },
        {
            id: 4,
            type: "subheading",
            text: "How and Why We Collect Your Personal Information",
        },
        {
            id: 5,
            type: "paragraph",
            text: `We Collect, use, and disclose the categories of Personal Information about California Consumers that are indicated in the chart below. Note that the specific pieces of Personal Information we Collect, use, and disclose about you may vary depending on the nature of your interactions with us, and may not include all of the examples listed.`,
        },
        {
            id: 6,
            type: "table",
            rows: [
                {
                    title: 'Identifiers ',
                    category: `such as a real name, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, or other similar identifiers.`,
                    purposes: [
                        `• Providing the Site and our products and services, including maintaining and servicing your accounts, verifying your information, processing payments, advertising, marketing, or analytic services, and similar functions and services;`,
                        `• Detecting security incidents and protecting against malicious, deceptive, or illegal activity;`,
                        `• Debugging the Site to identify and repair errors;`,
                        `• Internal research and development;`,
                        `• Quality and safety assurance, and improving, upgrading, and enhancing the Site and our products and services; and`,
                        `• Processing and managing interactions and transactions on the Site and our products and services`,
                    ],
                },
                {
                    title: 'Personal Records ',
                    category: `Any Personal information described in subdivision (e) of Section 1798.80 of the California Civil Code) such as the Identifiers listed above, telephone number, or other financial information`,
                    purposes: [
                        `• Providing the Site and our products and services, including maintaining and servicing your accounts, verifying your information, processing payments, advertising, marketing, or analytic services, and similar functions and services;`,
                        `• Detecting security incidents and protecting against malicious, deceptive, or illegal activity`,
                    ],
                },
                {
                    title: 'Protected Classifications ',
                    category: `under California or federal law (e.g., age, gender, household information, marital status, veteran or military status).`,
                    purposes: [
                        `• Providing the Site and our products and services, including maintaining and servicing your accounts, verifying your information, processing payments, advertising, marketing, or analytic services, and similar functions and services`,
                    ],
                },
                {
                    title: 'Commercial information',
                    category: `including records of products or services purchased, obtained, or considered, or other purchasing or consuming histories or tendencies.`,
                    purposes: [
                        `• Providing the Site and our products and services, including maintaining and servicing your accounts, verifying your information, processing payments, advertising, marketing, or analytic services, and similar functions and services;`,
                        `• Internal research and development; and`,
                        `• Processing and managing interactions and transactions on the Site and our products and services`,
                    ],
                },
                {
                    title: 'Internet or other electronic network activity information :',
                    category: `including, but not limited to, browsing history, search history, and information regarding a Consumer's interaction with an internet website application, or advertisement.`,
                    purposes: [
                        `• Providing the Site and our products and services, including maintaining and servicing your accounts, verifying your information, processing payments, advertising, marketing, or analytic services, and similar functions and services;`,
                        `• Detecting security incidents and protecting against malicious, deceptive, or illegal activity;`,
                        `• Debugging the Site to identify and repair errors;`,
                        `• Internal research and development;`,
                        `• Quality and safety assurance, and improving, upgrading, and enhancing the Site and our products and services; and`,
                        `• Processing and managing interactions and transactions on the Site and our products and services`,
                    ],
                },
                {
                    title: 'Geolocation data',
                    category: ``,
                    purposes: [
                        `• Providing the Site and our products and services, including maintaining and servicing your accounts, verifying your information, processing payments, advertising, marketing, or analytic services, and similar functions and services;`,
                        `• Detecting security incidents and protecting against malicious, deceptive, or illegal activity; and`,
                        `• Processing and managing interactions and transactions on the Site and our products and services`,
                    ],
                },
                {
                    title: 'Sensor Information ',
                    category: `audio, electronic, visual, or similar information.`,
                    purposes: [
                        `• Providing the Site and our products and services, including maintaining and servicing your accounts, verifying your information, processing payments, advertising, marketing, or analytic services, and similar functions and services; and`,
                        `• CCTV recordings from inside our facilities for use in fraud investigations and security purposes and call center recordings from when you contact customer service`,
                    ],
                },
                {
                    title: 'Professional or empoyement-related information ',
                    category: `(e.g., education level, employment status)`,
                    purposes: [
                        `• Processing and managing interactions and transactions on the Site and our products and services`,
                    ],
                },
                {
                    title: 'Inferences ',
                    category: `drawn from any of the information identified in this subdivision to create a profile about a Consumer reflecting the Consumer's preferences, characteristics, or predispositions.`,
                    purposes: [
                        `• Providing the Site and our products and services, including maintaining and servicing your accounts, verifying your information, processing payments, advertising, marketing, or analytic services, and similar functions and services;`,
                        `• Internal research and development;`,
                        `• Quality and safety assurance, and improving, upgrading, and enhancing the Site and our products and services; and`,
                        `• Processing and managing interactions and transactions on the Site and our products and services`,
                    ],
                },
                {
                    title: 'Sensitive Personal Information',
                    category: `precise geolocation.`,
                    purposes: [
                        `• Providing the Site and our products and services, including maintaining and servicing your accounts, verifying your information, processing payments, advertising, marketing, or analytic services, and similar functions and services`,
                    ],
                },
            ],
        },
    ],
};

const privacyData: Section[] = [
    {
        key: "sources",
        title: "Sources of Personal Information",
        content: [
            "We Collect Personal Information directly from you, your devices or browser, vendors that assist us in providing our services and running our internal business operations, data analytics providers, advertising networks, suppliers, public databases, social media platforms, data enrichment services, other companies in the Transformco family of businesses, and other data providers."
        ]
    },
    {
        key: "recipients",
        title: "Recipients to Which Personal Information is Disclosed",
        content: [
            "We use Service Providers to help us operate our websites and provide other services on our behalf such as credit and collection agencies, marketing services companies, call center vendors, and field services technicians. Our Service Providers only use Personal Information they Collect or Process on our behalf to provide us services."
        ]
    },
    {
        key: "retention",
        title: "Retention of Personal Information",
        content: [
            "We keep the categories of Personal Information described above for the purposes described in this California Notice or otherwise authorized by law. This generally means holding the Personal Information for as long as one of the following criteria apply:"
        ],
        list: [
            "to manage our operations, to manage your relationship with us, to provide you with information regarding our products or services, or to satisfy another purpose for which we Collected the information;",
            "to carry out a disclosed purpose that is reasonably compatible with the context in which the Personal Information was Collected;",
            "to protect or defend our rights or property (which will generally relate to applicable laws that limit actions in a particular case); or",
            "we are otherwise required or permitted to keep your Personal Information by applicable laws or regulations."
        ]
    },
    {
        key: "retentionFooter",
        title: "",
        content: [
            "Where Personal Information is used for more than one purpose, we may retain it until the purpose with the latest period expires. For more information about our retention policies, please contact us using the contact details below."
        ]
    },
    {
        key: "selling",
        title: "Selling and Sharing of Personal Information",
        content: [
            "We may Sell or Share Identifiers, Internet or other electronic network activity information and/or geolocation data for advertising and marketing purposes with Third Parties including our advertising and analytics partners. We do not Sell or Share Personal Information obtained for text messaging purposes - including Personal Information obtained for opt-in consent purposes - with any Third Parties for those Third Parties' own marketing purposes."
        ]
    },
    {
        key: "ccpa",
        title: "Your CCPA Rights",
        subsections: [
            {
                key: "optOut",
                title: "Right to Opt Out of Sales and Sharing",
                content: [
                    "You can opt out of Sales and Sharing of your Personal Information in the context of Cookies by clicking on the “Do Not Sell or Share My Personal Information” link in the footer of the Site you are visiting. Opting-out will not affect our ability to personalize your experience on our Site. We may still present contextual advertisements or you may still receive non-personalized advertisements that do not rely on “Sales” or “Sharing” to our advertising partners. You will need to also opt-out on your other browsers and devices. Cookie-enabled opt-out signals may no longer be effective if you block or clear Cookies. For more information on how to exercise choices regarding Cookies and interest-based advertising, see the section above titled \"Interest-Based Ads - Online Advertisements.\"",
                    "We use Service Providers to help us operate our Sites and provide other services on our behalf. Our Service Providers only use Personal Information they Collect or Process on our behalf to provide us services. Opting out will not affect Cookies deployed by our Service Providers.",
                    "To opt out of non-Cookie based Sales and Sharing, please use our webform here"
                ]
            },
            {
                key: "signals",
                title: "Opt-Out Preference Signals",
                content: [
                    "You may also opt out of the Sale or Sharing of your Personal Information through an opt-out preference signal. In order to process your request through an opt-out preference signal, you must use a browser supporting the preference signal. If you choose to use an opt-out preference signal, you will need to turn it on for each browser and each device you use."
                ]
            },
            {
                key: "nonDiscrimination",
                title: "Non-Discrimination",
                content: [
                    "We will not discriminate against you in a manner prohibited by the CCPA because you exercised your CCPA rights"
                ]
            }
        ]
    },
    {
        key: "rightsOverview",
        title: "Rights to Know, Delete, and Correct Personal Information",
        content: [
            "California Consumers have the right to exercise certain privacy rights under the CCPA. Any request you submit to us is subject to an identification and residency verification process. We will not fulfill your CCPA request unless you have provided sufficient information for us to reasonably verify you are the Consumer about whom we Collected Personal Information.",
            "If you are unable to provide us with certain information about yourself or, in some cases, about your transaction history with us, we will be unable to verify your identity to fulfill a request to know or delete. As an initial matter, we require you to provide your name, address, email address, and phone number to be submitted via our online request form or toll-free telephone number. In some cases, we may verify identity by confirming that you are the owner of the email address we have on file. For specific pieces of Personal Information, we will apply heightened verification standards, and reserve the right to request further information from you.",
            "If we cannot comply with a request, we will explain the reasons in our response. We will make commercially reasonable efforts to identify Consumer Personal Information that we Collect, Process, store, disclose, and otherwise use to respond to your California Consumer privacy rights requests. We will typically not charge a fee to fully respond to your requests, but we may charge a reasonable fee, or refuse to act upon a request, if your request is excessive, repetitive, unfounded, or overly burdensome.",
            "You may use an authorized agent to submit a consumer rights request. If you use an authorized agent to submit a request, we may require proof that the agent has been authorized by you to do so, and take other steps permissible under the CCPA, to ensure it is a proper request by an authorized agent."
        ]
    },
    {
        key: "rightToKnow",
        title: "a. The Right to Know",
        content: [
            "You have the right to send us a request, no more than twice in a twelve-month period, for any of the following for the period that is twelve months prior to the request date:",
            "The categories of Personal Information we have Collected about you.",
            "The categories of sources from which we Collected your Personal Information.",
            "The Business or Commercial Purposes for our Collecting and/or Selling/Sharing your Personal Information.",
            "The categories of Third Parties to whom we have Sold/Shared your Personal Information.",
            "A list of the categories of Personal Information disclosed for a Business Purpose.",
            "A list of the categories of Personal Information Sold/Shared about you, or that no Sale/Share occurred. If we Sold/Shared your Personal Information, we will explain:",
            "The categories of your Personal Information we have Sold/Shared.",
            "The categories of Third Parties to which we Sold/Shared Personal Information, by categories of Personal Information Sold/Shared for each Third Party.",
            "You have the right to make or obtain a transportable copy, no more than twice in a twelve-month period, of your Personal Information that we have Collected in the period that is 12 months prior to the request date and are maintaining. Please note that Personal Information is retained by us for various time periods, so we may not be able to fully respond to what might be relevant going back 12 months prior to the request."
        ]
    },
    {
        key: "rightToDelete",
        title: "b. The Right to Deletion",
        content: [
            "You may request that we delete your Personal Information that we have Collected directly from you and are maintaining. Exceptions do apply, including, without limitation, where we need to retain your Personal Information for regulatory reasons, to complete a warranty or other contract with you, or other internal uses of the information that are compatible with the context in which you provided it."
        ]
    },
    {
        key: "rightToCorrect",
        title: "c. Right to Correct",
        content: [
            "You may request that we correct Personal Information that we maintain about you if you believe such Personal Information is inaccurate. We may request documentation from you in connection with your request where we have reliable documentation showing the accuracy of the information. As with a Right to Know or Right to Delete request, to protect you, we will require you (or your agent) to be verified before honoring your correction requests. Upon receipt of a verifiable request to correct inaccurate Personal Information, we will use commercially reasonable efforts to correct the information as you direct. You may be able to correct certain Personal Information that we maintain about you by visiting your “My Account.”"
        ]
    },
    {
        key: "exerciseRights",
        title: "d. Exercise Your Rights",
        content: [
            "To exercise the right to know, correct, or right to delete, you may submit a request by calling us at (888) 527-6415 or online by clicking here. In order to complete your request, you will be required to respond to any follow up inquires we may make, and we may deny your request if you do not do so.",
            "To opt out of non-Cookie based Sales and Targeted Advertising please use our web form here"
        ]
    },
    {
        key: "financialIncentive",
        title: "Notice of Financial Incentive and Non-Discrimination",
        content: [
            "This Financial Incentives disclosure applies to the Shop Your Way program (“Shop Your Way” or the “Program”). A separate notice for it follows below. We may add or change programs and/or their terms by posting a notice on the program descriptions, so check them regularly. We will not discriminate against you if you exercise any of the rights provided by the CCPA. You can opt-out of non-Program marketing emails or delete your Personal Information from our active marketing lists and retain your Program account and benefits."
        ]
    },
    {
        key: "shineTheLight",
        title: "California Shine the Light Law",
        content: [
            "California’s “Shine the Light” law permits California residents to request certain information regarding our disclosure of personal information to third parties for their own direct marketing purposes.",
            "We do not share personal information with third parties for their direct marketing purposes. If you are a California resident, you may request information about our compliance with Shine the Light by contacting us at ShineTheLightCA@transformco.com or by sending a letter to:",
            "Transform SR Holding Management LLC",
            "Legal Intake/Privacy Team",
            "5407 Trillium Blvd, #B120",
            "Hoffman Estates, Illinois 60192",
            "Any such request must include “California Shine the Light Privacy Rights Request” in the first line of the description and include your name, street address, city, state, and ZIP code. Please note that we are only required to respond to one request per customer each year, and we are not required to respond to requests made by means other than through this email address or mail address.",
            "As these rights and your CCPA rights are not the same and exist under different laws, you must exercise your rights under each law separately."
        ]
    }
];

const loyaltyProgramData: LoyaltyProgramSection = {
    key: "loyaltyProgram",
    title: "Loyalty Program and Notice of Financial Incentive Disclosures",
    intro: [
        "This Loyalty Program and Financial Incentive disclosure applies to California and Colorado Consumers who are members of the Shop Your Way program (“Shop Your Way” or the “Program”). We may add or change programs and/or their terms by posting a notice on the Program descriptions, so check them regularly. We will not discriminate against you if you exercise any of the rights provided by the CCPA or the CPA. You can unsubscribe from marketing emails and retain your Program account and benefits. References to “personal information” in this section describe our practices with respect to “personal data,” as defined under the Colorado Privacy Act (CPA)."
    ],
    subsections: [
        {
            key: "shopYourWay",
            title: "a. Shop Your Way Loyalty Program and Financial Incentive Disclosure",
            table: {
                headers: ["Program", "Incentive Offered", "Material Terms", "How to Opt-In"],
                rows: [
                    {
                        program: "Shop Your Way",
                        incentiveOffered:
                            "Your Shop Your Way account earns points for purchases at eligible stores, special offers, and eligible credit card purchases. Points are accumulated to earn rewards that may be redeemed for discounts on future purchases or gift cards. You will also receive discounts, exclusive offers, and member only content through Sears Home Advantage, a special benefit offered to members of Shop Your Way.",
                        materialTerms: [
                            "See here for the Shop Your Way Membership Terms, Shop Your Way Site Terms of Use, and Shop Your Way Partner Terms.",
                            "",
                            "Categories of Personal Information Collected:",
                            "• Identifiers (e.g., name, email address, Internet Protocol address)",
                            "• Personal Records (e.g., signatures, financial account information)",
                            "• Protected Characteristics (e.g., age, gender, household information, marital status, veteran or military status)",
                            "• Commercial Information (e.g., purchase history, service history)",
                            "• Internet or Other Electronic Network Activity Information (e.g., browsing history, search history)",
                            "• Geolocation Data (e.g., your location we infer based on your IP address)",
                            "• Sensory Information (e.g., voice recordings from call centers, profile pictures on accounts)",
                            "• Professional or Employment Information (e.g., education level or employment status)",
                            "• Inferences from Personal Information Collected (e.g., customer profiles including shopping preferences, product preferences, customer characteristics and behaviors)"
                        ],
                        howToOptIn: [
                            "• Register for an account online or on the mobile app.",
                            "Participating in the Program is entirely optional but is subject to additional Shop Your Way Membership Terms, Shop Your Way Site Terms of Use, and Shop Your Way Partner Terms."
                        ]
                    }
                ]
            },
            additionalInfo: {
                valueStatement:
                    "We treat the value of Consumer Personal Information Collected through the Program as the equivalent of relevant expenses related to the Collection and retention of Consumers’ Personal Information as part of the Program. We value the benefits of the Program as the value of rewards given to Members, which are outlined in the Shop Your Way Program Terms and Conditions. We pay these expenses and provide the Program benefits, which vary depending upon Program participation, to foster a positive relationship with our Members that is invaluable.",
                thirdParties: [
                    "Advertising Partners;",
                    "Analytics Partners."
                ]
            }
        }
    ]
};

const privacySections: SectionFragment[] = [
    // SECTION 1: Bona Fide Loyalty Program Partners
    {
        id: "bonaFidePartners",
        title: "Bona Fide Loyalty Program Partners",
        content: [
            {
                type: 'table',
                key: 'partners-table',
                headers: ["Bona Fide Loyalty Program Partners", "Loyalty Program Benefit"],
                rows: [
                    {
                        "Bona Fide Loyalty Program Partners": "First Bank and Trust (powers the Shop Your Way credit card rewards)",
                        "Loyalty Program Benefit": "Provides card points for purchases using the ShopYourWay 5321 Visa."
                    },
                    {
                        "Bona Fide Loyalty Program Partners": "Raise (allows Shop Your Way Members to exchange points for gift cards)",
                        "Loyalty Program Benefit": "Provides gift cards to Consumers to a variety of retailers."
                    },
                    {
                        "Bona Fide Loyalty Program Partners": "Wildfire (powers the Shop Your Way rewards available via the Shop Your Way browser extension and offer wall)",
                        "Loyalty Program Benefit": "Provides points redeemable through offers sourced by Wildfire and its partners."
                    },
                    {
                        "Bona Fide Loyalty Program Partners": "Button (powers the Shop Your Way rewards available via the Shop Your Way offer wall)",
                        "Loyalty Program Benefit": "Provides points redeemable through offers sourced by Button and its partners."
                    }
                ]
            },
            {
                type: 'text',
                key: 'footer-disclaimer',
                content: [
                    "Consumers may make a request under the CCPA or CPA by calling us at (888) 527-6415 or by submitting a request online here. If you submit a deletion request, it will terminate your Program membership because we must maintain your Personal Information to provide the Program. Upon a termination request, some Program data associated with the terminated account may be retained for record keeping, tax reporting, and other legally permissible purposes."
                ]
            }
        ],
        footerLink: "Top"
    },

    // SECTION 2: State Specific Disclosures
    {
        id: "stateDisclosures",
        title: "State Specific Disclosures",
        content: [
            {
                type: 'text',
                key: 'intro',
                content: [
                    "This section applies to Colorado, Connecticut, Delaware, Iowa, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Texas, Tennessee, Utah, and Virginia (“Regulated State[s]”) residents that visit our stores, access or use our Sites or services. You can learn more about: the categories of Personal Data we process here, disclose to Third Parties here, and the purpose for Processing your Personal Data here. References to “personal information” in our general privacy notice describe our practices with respect to “personal data,” as defined under the applicable privacy laws in Regulated States. Capitalized terms defined in Regulated State privacy laws that are used in this section shall have the same meaning as in the Regulated State privacy laws."
                ]
            },
            {
                type: 'list',
                key: 'rights-list',
                items: [
                    "Right to access. You have the right to request access to and obtain a copy of any Personal Data that we may hold about you.",
                    "Right to confirm. You have the right to confirm that we are Processing your Personal Data.",
                    "Right to correct. You have the right to request that we correct inaccuracies in your Personal Data.",
                    "Right to delete. You have the right to request that we delete Personal Data that we have Collected from or obtained about you.",
                    "Right to opt out of Sales. While we do not Sell your Personal Data for monetary consideration, we do disclose your Personal Data for Targeted Advertising. This disclosure of Personal Data for Targeted Advertising constitutes a Sale in certain Regulated States. Please see below for more information on how to opt out of Targeted Advertising and Sales via Cookies and how to submit a request to opt out of non-Cookie based Sales and Targeted Advertising..",
                    "Right to opt out of Targeted Advertising. You may request that we stop disclosures of your Personal Data for Targeted Advertising.",
                    "Right to appeal. If you are unsatisfied with our actions related to our resolution of your privacy request, you may appeal our decision.",
                    "Right to obtain a list of Third Parties. Oregon and Minnesota residents may also request a list of Third Parties to which we may have disclosed Personal Data.",
                    "Right to obtain categories of Third Parties. Delaware residents may request a list of the categories of Third Parties to which we have disclosed their Personal Data and Maryland residents may request a list of the categories of Third Parties to which we have disclosed Personal Data."
                ]
            },
            {
                type: 'text',
                key: 'profiling-note',
                content: [
                    "We do not engage in Profiling that results in any legal or similarly significant effects and as such do not offer this right."
                ]
            },
            {
                type: 'text',
                key: 'non-discrimination',
                content: [
                    "Non-discrimination. If you choose to exercise any of the privacy rights described above, we will not deny our products or services to you, charge you different prices or provide a different level or quality of products or services to you."
                ]
            },
            {
                type: 'text',
                key: 'targeted-advertising-disclosure',
                content: [
                    "We Process Personal Data, including personal identifiers, internet or other electronic network activity information, and geolocation data for Targeted Advertising purposes. You have the right to opt out of our use of your Personal Data for Targeted Advertising. Information on how to exercise your opt-out rights as well as other rights you may have are described below."
                ]
            },
            {
                type: 'text',
                key: 'sale-disclosure',
                content: [
                    "We may Sell the categories of Personal Data listed below to the following categories of Third Parties: advertising and analytics partners."
                ]
            },
            {
                type: 'list',
                key: 'sold-data-categories',
                items: [
                    "Personal identifiers;",
                    "Internet or other electronic network activity information; and",
                    "Geolocation data"
                ]
            },
            {
                type: 'text',
                key: 'opt-out-instructions',
                content: [
                    "You may opt out of Targeted Advertising and Sales via Cookies by clicking the “Do Not Sell or Share My Personal Information” link in the footer of the Site you are visiting. To opt out of non-Cookie based Sales and Targeted Advertising please submit the web form here. You may exercise your other privacy rights here. You may also call us at (888) 527-6415. When you submit an access, deletion, or correction request to us, we will validate your identity by matching information in our system to information you have provided and authenticate your request to protect your privacy and security. We will use the Personal Data provided in a privacy rights request only to verify your identity or authority to make the request and to track and document request responses unless you also gave it to us for another purpose. Residents of Regulated States may also contact us at dataprivacy@transformco.com."
                ]
            },
            {
                type: 'subsections',
                key: 'colorado-disclosure',
                sections: [
                    {
                        id: "colorado-disclosure",
                        title: "Additional Disclosures for Colorado Residents",
                        content: [
                            {
                                type: 'text',
                                key: 'colorado-intro',
                                content: [
                                    "Below is a description of our online and offline information practices and other disclosures required by the Colorado Privacy Act."
                                ]
                            },
                            {
                                type: 'text',
                                key: 'colorado-links',
                                content: [
                                    "You can learn more about the categories of Personal Data and Sensitive Data that we have Collected about Consumers and the purpose for Processing your Personal Data by visiting the What Type of Information Do We Collect and How Do We Use It?"
                                ]
                            },
                            {
                                type: 'text',
                                key: 'gpc-opt-out',
                                content: [
                                    "In addition to opting out of Sales/Sharing and Targeted Advertising as described above you may opt out via the Global Privacy Control (“GPC”) browser signal. Consumers that choose to use the GPC will be opted out of the Sales/Sharing and Targeted Advertising of Personal Data. Note that if you choose to activate the GPC you must turn it on for each browser you use."
                                ]
                            },
                            {
                                type: 'text',
                                key: 'bona-fide-link',
                                content: [
                                    "Information about our Bona Fide Loyalty Program\nPlease see our Shop Your Way Loyalty Program and Financial Incentive Disclosure, which describes our Personal Data collection practices for our Bona Fide Loyalty Program."
                                ]
                            }
                        ],
                    }
                ]
            }
        ],
        footerLink: "Top"
    },

    // === SECTION 3: Nevada Residents ===
    {
        id: "nevadaResidents",
        title: "Nevada Residents",
        content: [
            {
                type: 'text',
                key: 'nevada-text',
                content: [
                    "Nevada consumers have the right to instruct website operators to not sell certain personal information to third parties. Transformco does not sell such information as defined under Nevada law. If we consider selling this information in the future, we will update this Privacy Policy to give you notice of this change and provide a formal method for Nevada consumers to exercise their opt-out rights under that law."
                ]
            }
        ],
        footerLink: "Top"
    },

    // === SECTION 4: How May I Contact You? ===
    {
        id: "contactUs",
        title: "How May I Contact You?",
        content: [
            {
                type: 'text',
                key: 'contact-intro',
                content: [
                    "If you have any questions about this Privacy Policy, please contact us at (888) 823-0650. Because voicemail communications are not always secure, please do not include credit card or other financial information, health or prescription-related information, or other sensitive information in your voicemail to us. If you prefer to contact us via US Mail, please address your inquiry to:"
                ]
            },
            {
                type: 'contact',
                key: 'mailing-address',
                phone: "(888) 823-0650",
                email: "dataprivacy@transformco.com",
                address: [
                    "Transform SR Holding Management LLC",
                    "Legal Intake/Privacy Team",
                    "5407 Trillium Blvd, #B120",
                    "Hoffman Estates, Illinois 60192"
                ]
            }
        ],
        footerLink: "Top"
    }
];
export default function PrivacyPolicy() {
    return (
        <>
            <section className="bg-white py-10">
                <div className="">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-500">
                        {privacyContent.title}
                    </h2>

                    {/* Effective Date */}
                    <p className="mt-1 italic text-gray-500 font-semibold">
                        {privacyContent.effectiveDate}
                    </p>

                    {/* Main Text */}
                    <p className="mt-4 text-gray-500">
                        {privacyContent.mainText.map((item) =>
                            item.isLink ? (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    className="mx-1 text-blue-600 underline"
                                >
                                    {item.content}
                                </a>
                            ) : (
                                <span key={item.id}>{item.content} </span>
                            )
                        )}
                    </p>

                    {/* Subtitle */}
                    <p className="mt-6 font-semibold text-gray-600">
                        {privacyContent.subtitle}
                    </p>

                    {/* Questions List */}
                    <ul className="mt-2 space-y-1">
                        {privacyContent.questions.map((question, index) => (
                            <li key={index}>
                                <Link
                                    href="#"
                                    className="text-blue-600 hover:underline"
                                >
                                    {question}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="bg-white py-10">
                <div className="">
                    {/* Section Title */}
                    <h2 className="text-2xl font-bold text-gray-500">
                        {personalInfoContent.title}
                    </h2>


                    {/* Intro Paragraphs */}
                    {personalInfoContent.paragraphs.map((text, index) => (
                        <p key={index} className="mt-4 text-gray-500">
                            {text}
                        </p>
                    ))}


                    {/* Usage Intro */}
                    <p className="mt-4 font-semibold text-gray-600">
                        {personalInfoContent.usageIntro}
                    </p>


                    {/* Usage List */}
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-500">
                        {personalInfoContent.usageList.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>


                    {/* Additional Paragraphs */}
                    {personalInfoContent.additionalParagraphs.map((text, index) => (
                        <p key={index} className="mt-4 text-gray-500">
                            {text}
                        </p>
                    ))}


                    {/* AI Section */}
                    <h2 className="mt-8 text-lg font-light text-gray-600">
                        {personalInfoContent.aiTitle}
                    </h2>


                    {personalInfoContent.aiParagraphs.map((text, index) => (
                        <p key={index} className="mt-2 text-gray-500">
                            {text}
                        </p>
                    ))}


                    {/* Back to Top */}
                    <div className="mt-6">
                        <a href="#top" className="text-sm text-blue-600 hover:underline">
                            Top
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-white py-10">
                <div className="space-y-12">
                    {sharingAndCookiesContent.map((section) => (
                        <div key={section.id} id={section.id}>
                            <h2 className="text-2xl font-bold text-gray-500">
                                {section.title}
                            </h2>


                            {section.paragraphs.map((text, index) => (
                                <p key={index} className="mt-2 text-gray-600">
                                    {text}
                                </p>
                            ))}


                            <div className="mt-3">
                                <Link href="#top" className="text-blue-600 hover:underline">
                                    Top
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Interest-Based Ads Section */}
            <section className="mb-14">
                {/* Section Title */}
                <h2 className="mb-4 text-2xl font-bold text-gray-500">
                    {interestBasedAdsContent.sectionTitle}
                </h2>

                <div className="space-y-4 leading-relaxed text-gray-600">
                    {interestBasedAdsContent.content.map(item => {
                        if (item.type === "list") {
                            return (
                                <ul
                                    key={item.id}
                                    className="list-disc space-y-1 pl-6"
                                >
                                    {item.items.map((listItem, index) => (
                                        <li key={index}>{listItem}</li>
                                    ))}
                                </ul>
                            );
                        }

                        // Paragraph renderer with inline links
                        if (!item.links) {
                            return <p key={item.id}>{item.text}</p>;
                        }

                        return (
                            <p key={item.id}>
                                {item.text.split(/(policies\.google\.com\/technologies\/partner-sites|tools\.google\.com\/dlpage\/gaoptout|www\.aboutads\.info\/appchoices|www\.aboutads\.info\/consumers|adssettings\.google\.com|www\.criteo\.com\/privacy)/g).map((chunk, index) => {
                                    const link = item.links?.find(l => l.text === chunk);

                                    if (link) {
                                        return (
                                            <Link
                                                key={index}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {chunk}
                                            </Link>
                                        );
                                    }

                                    return <React.Fragment key={index}>{chunk}</React.Fragment>;
                                })}
                            </p>
                        );
                    })}
                </div>

                {/* Top link */}
                <div className="mt-4">
                    <a href="#top" className="text-sm text-blue-600 hover:underline">
                        Top
                    </a>
                </div>
            </section>

            {/* Security & Access Sections */}
            {securityAndAccessContent.map((section, index) => (
                <section key={index} className="mb-14">
                    <h2 className="mb-4 text-2xl font-bold text-gray-500">
                        {section.sectionTitle}
                    </h2>

                    <p className=" leading-relaxed text-gray-600">
                        {section.content}
                    </p>

                    <div className="mt-4">
                        <Link href="#top" className="text-blue-600 hover:underline">
                            Top
                        </Link>
                    </div>
                </section>
            ))}

            <section className="bg-white">
                <h2 className="mb-6 text-2xl font-bold text-gray-500">
                    {californiaResidentsContent.sectionTitle}
                </h2>

                <div className="space-y-4 leading-relaxed text-gray-600">
                    {californiaResidentsContent.content.map(item => {
                        switch (item.type) {
                            case "paragraph":
                                return <p key={item.id} className="mb-4">{item.text}</p>;

                            case "subheading":
                                return (
                                    <h2
                                        key={item.id}
                                        className="pt-6 pb-2 text-xl  font-bold text-gray-500"
                                    >
                                        {item.text}
                                    </h2>
                                );

                            case "table":
                                return (
                                    <div key={item.id} className="mt-6">
                                        {/* Table Header */}
                                        <div className="grid grid-cols-2 gap-8 mb-4 text-center font-semibold">
                                            <div className="text-gray-500 bg-gray-100 p-3">
                                                Category of Personal Information
                                            </div>
                                            <div className="text-gray-500 bg-gray-100 p-3">
                                                Business Purposes for Collection, Use, and Disclosure
                                            </div>
                                        </div>

                                        {/* Table Rows */}
                                        <div className="space-y-6">
                                            {item.rows.map((row, index) => (
                                                <div key={index} className="grid grid-cols-2 gap-8 pb-6 border-b border-gray-200 last:border-b-0">
                                                    {/* Left Column: Category */}
                                                    <div className="text-gray-500  flex items-center ">
                                                        <p className="leading-relaxed "> <span className="font-semibold">{row.title}</span> {row.category}</p>
                                                    </div>

                                                    {/* Right Column: Purposes */}
                                                    <div className="text-gray-500">
                                                        <div className="space-y-3">
                                                            {row.purposes.map((purpose, i) => (
                                                                <p key={i} className="leading-relaxed">{purpose}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                            default:
                                return null;
                        }
                    })}
                </div>

                <div className="mt-8">
                    <a href="#top" className="text-sm text-blue-600 hover:underline font-medium">
                        Top
                    </a>
                </div>
            </section>

            <section className="space-y-6 pt-4 text-gray-500">
                {privacyData.map(section => (
                    <div key={section.key} className="space-y-2">
                        {section.title && (
                            <h2 className="font-bold text-xl">{section.title}</h2>
                        )}

                        {section.content?.map((text, i) => (
                            <p key={i}>{text}</p>
                        ))}

                        {section.list && (
                            <ul className="list-disc pl-5 space-y-1">
                                {section.list.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        )}

                        {section.subsections?.map(sub => (
                            <div key={sub.key} className="space-y-2 pl-2">
                                <h2 className="font-semibold ">{sub.title}</h2>
                                {sub.content?.map((text, i) => (
                                    <p key={i}>{text}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </section>

            <section className="space-y-6 text-gray-500">
                <h2 className="font-bold text-xl">{title}</h2>

                {loyaltyProgramData.intro.map((para, i) => (
                    <p key={i} className="mb-4">{para}</p>
                ))}

                {loyaltyProgramData.subsections.map(sub => (
                    <div key={sub.key} className="space-y-4">
                        <h2 className="font-semibold text-lg">{sub.title}</h2>

                        {/* Table */}
                        <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {sub.table.headers.map((header, i) => (
                                            <th
                                                key={i}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sub.table.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {row.program}
                                            </td>
                                            <td className="px-6 py-4 whitespace-pre-line text-sm text-gray-500">
                                                {row.incentiveOffered}
                                            </td>
                                            <td className="px-6 py-4 whitespace-pre-line text-sm text-gray-500">
                                                {row.materialTerms.map((line, i) => (
                                                    <React.Fragment key={i}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-pre-line text-sm text-gray-500">
                                                {row.howToOptIn.map((line, i) => (
                                                    <React.Fragment key={i}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-4 space-y-2">
                            <p>{sub.additionalInfo.valueStatement}</p>
                            <h4 className="font-medium mt-3">b. Categories of Third Parties that Receive Consumer Personal Information/Data:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {sub.additionalInfo.thirdParties.map((tp, i) => (
                                    <li key={i}>{tp}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>

            <section className="space-y-8 text-gray-500">
                {privacySections.map((section, idx) => (
                    <div key={section.id} className={`border-t pt-6 ${idx === 0 ? 'border-t-0 pt-0' : ''}`}>
                        {section.title && (
                            <h2 className="font-bold text-xl mb-4">{section.title}</h2>
                        )}

                        {section.content.map((block, blockIdx) => {
                            switch (block.type) {
                                case 'text':
                                    return (
                                        <div key={block.key} className="mb-4 space-y-2">
                                            {block.content.map((line, i) => (
                                                <p key={i} className="leading-relaxed">
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    );

                                case 'table':
                                    return (
                                        <div key={block.key} className="overflow-x-auto bg-white border rounded-lg shadow-sm mb-4">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        {block.headers.map((header, i) => (
                                                            <th
                                                                key={i}
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                {header}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {block.rows.map((row, rowIndex) => (
                                                        <tr key={rowIndex}>
                                                            {block.headers.map((header, colIndex) => (
                                                                <td
                                                                    key={colIndex}
                                                                    className="px-6 py-4 whitespace-pre-line text-sm text-gray-500"
                                                                >
                                                                    {row[header]}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    );

                                case 'list':
                                    return (
                                        <ul
                                            key={block.key}
                                            className={`list-disc pl-5 mb-4 space-y-1 ${block.ordered ? 'list-decimal' : 'list-disc'
                                                }`}
                                        >
                                            {block.items.map((item, i) => (
                                                <li key={i} className="text-sm">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    );

                                case 'subsections':
                                    return (
                                        <div key={block.key} className="ml-4 mt-4 space-y-6">
                                            {block.sections.map((sub) => (
                                                <div key={sub.id} className="border-l-4 border-blue-200 pl-4">
                                                    {sub.title && <h2 className="font-semibold text-md mb-2">{sub.title}</h2>}
                                                    {sub.content.map((subBlock, subIdx) => {
                                                        if (subBlock.type === 'text') {
                                                            return (
                                                                <div key={subBlock.key} className="mb-3">
                                                                    {subBlock.content.map((line, i) => (
                                                                        <p key={i} className="leading-relaxed">
                                                                            {line}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                    {sub.footerLink && (
                                                        <div className="mt-2">
                                                            <Link href="#" className="text-blue-600 hover:underline text-xs">
                                                                {sub.footerLink}
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    );

                                case 'contact':
                                    return (
                                        <div key={block.key} className="mb-4 p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm mb-2">
                                                Call us at: <strong>{block.phone}</strong>
                                            </p>
                                            {block.email && (
                                                <p className="text-sm mb-2">
                                                    Email: <a href={`mailto:${block.email}`} className="text-blue-600 hover:underline">{block.email}</a>
                                                </p>
                                            )}
                                            <div className="text-sm space-y-1">
                                                {block.address.map((line, i) => (
                                                    <div key={i}>{line}</div>
                                                ))}
                                            </div>
                                        </div>
                                    );

                                default:
                                    return null;
                            }
                        })}

                        {section.footerLink && (
                            <div className="mt-2">
                                <a href="#" className="text-blue-600 hover:underline text-xs">
                                    {section.footerLink}
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </>
    );
}
