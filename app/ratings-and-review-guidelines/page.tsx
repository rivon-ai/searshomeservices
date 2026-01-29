import React from 'react'
import ReactMarkdown from 'react-markdown'

interface ReviewGuidelinesSection {
    key: string;
    title: string;
    content: Array<{
        type: 'paragraph' | 'bullet-list';
        text?: string;
        html?: string;
        items?: string[];
        itemsContainHtml?: boolean;
    }>;
}

const reviewGuidelinesData: ReviewGuidelinesSection = {
    key: "reviewGuidelines",
    title: "Customer Ratings and Review Guidelines:",
    content: [
        {
            type: "paragraph",
            text: "We will post your Display Name and location with your review. By submitting your review, you agree to the following Customer Ratings and Review Guidelines:"
        },
        {
            type: "paragraph",
            text: "Keep your review between 25 - 500 words."
        },
        {
            type: "bullet-list",
            items: [
                "Your full name or other personal information about yourself or others in the review, such as social security numbers, address, phone number, or credit or debit card numbers.",
                "Content that is obscene, unlawfully threatening, illegal, defamatory, an invasion of privacy, or infringement of intellectual property rights.",
                "Language not suitable for a public forum or that is otherwise injurious to an individual, or offensive.",
                "Advertisements, content considered as spam, commercial solicitation, or references to other products, offers, websites, or competitors.",
                "Opinions or beliefs about political issues or religious affiliations.",
                "Critical or spiteful comments about other reviews or reviewers.",
                "Sensitive information in your review. Sensitive information includes but is not limited to your social security number, financial account information, racial or ethnic origins, and personal health data."
            ]
        },
        {
            type: "paragraph",
            text: "New reviews will display on the website within 7 days."
        },
        {
            type: "paragraph",
            text: "By submitting a review with a product safety or quality concern, you give us permission to share your contact information with the product manufacturer upon request."
        },
        {
            type: "paragraph",
            text: "All submitted reviews are subject to the terms set forth in our [Terms of Use](https://www.searshomeservices.com/terms)."
        },
        {
            type: "paragraph",
            text: "Transformco has the right but not the obligation to monitor and edit, condense, remove, or refuse to post any review or content that we deem, in our sole discretion, to violate the Review Guidelines or the Terms of Use. If you post a review or submit photos or videos, you grant Transformco a nonexclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, perform, translate, create derivative works from, distribute, and display such content throughout the world in any form, media, or technology without compensation to you. You grant Transformco and sublicensees the right to use the name that you submit in connection with such content, if we choose. You represent and warrant that you own or otherwise control all of the rights to the content that you post; that the content is accurate; that you are at least 18 years old, that use of the content you supply does not violate the Review Guidelines or Terms of Use and will not cause injury to any person or entity; and that you will indemnify and hold Transformco (and its officers, directors, agents, employees, third-party vendors, and affiliates) harmless from all claims, demands, and damages of every kind and nature, known and unknown including reasonable attorneys’ fees, arising out of a breach of your representations and warranties set forth above, or your violation of any law or the rights of a third party."
        }
    ]
};

export default function page() {
    return (
        <section className='w-[75%] mx-auto text-gray-500'>
            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">{reviewGuidelinesData.title}</h2>

            {/* Content */}
            {reviewGuidelinesData.content.map((block, idx) => {
                if (block.type === 'paragraph') {
                    return (
                        <p key={idx} className="mb-4 leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    a: ({ node, ...props }) => (
                                        <a
                                            {...props}
                                            className="text-blue-600 underline font-medium hover:text-blue-800"
                                        />
                                    )
                                }}
                            >
                                {block.text}
                            </ReactMarkdown>
                        </p>
                    );
                }

                if (block.type === 'bullet-list') {
                    return (
                        <ul key={idx} className="list-disc pl-5 mb-4 space-y-1">
                            {block.items?.map((item, i) => {
                                if (block.itemsContainHtml) {
                                    return (
                                        <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                                    );
                                }
                                return <li key={i} className="leading-relaxed">{item}</li>;
                            })}
                        </ul>
                    );
                }

                return null;
            })}
        </section>
    )
}