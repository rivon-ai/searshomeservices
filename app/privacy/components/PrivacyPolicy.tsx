import React from 'react';

// Reusable Components
const SectionHeader = ({ id, children } : any) => (
    <h1
        id={id}
        className="text-4xl md:text-5xl leading-tight my-4 sm:scroll-mt-32 text-gray-700 font-bold"
    >
        {children}
    </h1>
);

const SubHeader = ({ children } : any ) => (
    <p className="text-sm leading-6 font-semibold text-gray-700 my-4">
        {children}
    </p>
);

const Paragraph = ({ children } : any) => (
    <p className="text-sm leading-6 font-normal text-gray-600 my-4">
        {children}
    </p>
);

const Link = ({ href, children, external = false } : any) => (
    <a
        href={href}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-blue-600 hover:underline hover:underline-offset-4 focus:outline-blue-600"
    >
        {children}
    </a>
);

const TopLink = () => (
    <Link href="#privacy-policy">Top</Link>
);

const Divider = () => (
    <hr className="m-0 border-t border-gray-200 my-6" />
);

const BulletList = ({ items } : any) => (
    <ul className="list-disc font-normal text-left text-gray-600 text-sm leading-6 pl-10 my-4">
        {items.map((item : any, idx : number) => (
            <li key={idx} className="text-sm leading-6 text-left text-gray-600 my-2 first:mt-0">
                {item}
            </li>
        ))}
    </ul>
);

const TableOfContents = () => {
    const links = [
        { text: "What Type of Personal Information Do We Collect and How Do We Use It?", href: "#what-type-of-personal-information" },
        { text: "What Information Do We Share and With Whom?", href: "#what-information-share" },
        { text: "Can I Disable Cookies?", href: "#disable-cookies" },
        { text: "Children's Privacy", href: "#children-privacy" },
        { text: "I Am a Minor, How Can I Remove My Posted Content?", href: "#minor-content-removal" },
        { text: "What About Links to Other Sites?", href: "#links-other-sites" },
        { text: "Interest-Based Ads - Online Advertisements", href: "#interest-based-ads" },
        { text: "Is My Information Secure?", href: "#information-secure" },
        { text: "How Can I Access My Personal Information?", href: "#access-information" },
        { text: "Can I \"Opt-Out\" of Receiving Promotional Emails?", href: "#opt-out-emails" },
        { text: "California Residents", href: "#california-residents" },
        { text: "Loyalty Program and Notice of Financial Incentive Disclosures", href: "#loyalty-program" },
        { text: "State Specific Disclosures", href: "#state-disclosures" },
        { text: "Nevada Residents", href: "#nevada-residents" },
        { text: "How May I Contact You?", href: "#contact" },
    ];

    return (
        <div className="my-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Get answers and information about:</p>
            {links.map((link, idx) => (
                <div key={idx}>
                    <Link href={link.href}>{link.text}</Link>
                    <br />
                </div>
            ))}
        </div>
    );
};

const DataTable = ({ headers, rows } : any) => (
    <div className="overflow-x-auto my-6">
        <table className="min-w-full border-separate border-spacing-0">
            <thead>
                <tr>
                    {headers.map((header : any, idx : number) => (
                        <th
                            key={idx}
                            className="px-4 py-3 text-left font-semibold text-sm text-gray-700 bg-gray-100 border border-white"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row : any, rowIdx : number) => (
                    <tr key={rowIdx} className="border-b border-gray-200">
                        {row.map(({cell, cellIdx} : any) => (
                            <td
                                key={cellIdx}
                                className="px-4 py-4 text-left text-sm text-gray-600 align-top"
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Main Component
const PrivacyPolicy = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 bg-white">
            {/* Header */}
            <SectionHeader id="privacy-policy">Privacy Policy</SectionHeader>

            <Paragraph>
                <em className="italic">
                    <strong className="font-semibold">Effective Date: November 3, 2025</strong>
                </em>
                <br /><br />
                This website or mobile application ("Site") is owned and operated by a Transform Holdco LLC ("Transformco", "we", "our", or "us") entity or licensee. Your privacy is important to us and we want you to understand what personal information we gather about you, how we use it, and the safeguards we have in place designed to protect it. This Privacy Policy applies to personal information collected through this Site, our services, products, call centers, and other offerings.
                <br /><br />
                By using the Site or otherwise providing personal information to us, you agree to our <Link href="/terms">Terms of Use</Link> and consent to our personal information collection, use, and disclosure practices.
            </Paragraph>

            <TableOfContents />

            <Divider />

            {/* Section 1 */}
            <SectionHeader id="what-type-of-personal-information">
                What Type of Personal Information Do We Collect and How Do We Use It?
            </SectionHeader>

            <Paragraph>
                We may collect personal information (for example, your full name, email address, mailing address, telephone number, mobile phone number or payment information) from you when you voluntarily submit the information to us, such as when you purchase items from us, sign up for one of our services or programs, or register with our Site.
            </Paragraph>

            <BulletList items={[
                "process and fulfill your order,",
                "notify you of your order status, prevent fraud, and otherwise provide you with customer service;",
                "respond to your inquiries and requests; create an account and register you as a Site user;",
                "for marketing purposes and to send you information regarding this Site and other Transformco Sites;",
                "provide you with relevant offers, products and services; permit you to use this Site's social networking features;"
            ]} />

            <Paragraph>
                Some Site features may make use of your device attributes and settings that will allow our Site to determine your physical location. We use this information to enhance and personalize your experience and provide you with offers, products and services that may be of interest to you.
            </Paragraph>

            <SubHeader>Generative AI Services</SubHeader>
            <Paragraph>
                We use generative AI services, including through our phone services and website chatbot functionality which collect certain information you provide when you use these services as well as information about your visit to our Site and use of our services.
            </Paragraph>

            <BulletList items={[
                "All information you submit through our AI services may be used for a variety of purposes, including automated processing, improving our products or services; quality improvement; or training, including continuous training of generative AI services."
            ]} />

            <TopLink />
            <Divider />

            {/* Section 2 */}
            <SectionHeader id="what-information-share">
                What Information Do We Share and With Whom?
            </SectionHeader>

            <Paragraph>
                We may share your personal information with selected vendors with which Transformco or its affiliates have a relationship, and which have agreed to appropriate restrictions on the disclosure and use of your information.
                <br /><br />
                We may provide information about you, which may include personal information, to regulatory authorities and law enforcement officials in accordance with applicable law, when we believe in good faith that the law requires it or to respond to requests from government authorities.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 3 */}
            <SectionHeader id="disable-cookies">
                Can I Disable Cookies?
            </SectionHeader>

            <Paragraph>
                Most web browsers allow you to exercise control over Cookie files on your computer by erasing them, blocking them, or notifying you when a file is stored. Please take a look at your particular browser for instructions on this function. If you do elect to disable Cookies, please note that you may not be able to take full advantage of a personalized experience on this Site.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 4 */}
            <SectionHeader id="children-privacy">
                Children's Privacy
            </SectionHeader>

            <Paragraph>
                This Site is intended for a general audience and not directed to children less than 13 years of age. We do not intend to collect personal information in a manner that is not permitted by Children's Online Privacy Protection Act ("COPPA"). If you are under 13, do not provide any personal information to us.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 5 */}
            <SectionHeader id="minor-content-removal">
                I Am a Minor, How Can I Remove My Posted Content?
            </SectionHeader>

            <Paragraph>
                If you are under 18 and a Registered User or Member, you may ask us to remove content or information that you have posted to the Site. To remove posted content, please write to <Link href="mailto:sywsolutions@syw.com">sywsolutions@syw.com</Link>.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 6 */}
            <SectionHeader id="links-other-sites">
                What About Links to Other Sites?
            </SectionHeader>

            <Paragraph>
                This Site may contain links to content from other websites or applications that are not owned and operated by Transformco. Transformco is not responsible for the privacy practices of non-affiliated websites or applications. You should read the privacy statements of each and every website and application that collects personal information.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 7 */}
            <SectionHeader id="interest-based-ads">
                Interest-Based Ads - Online Advertisements
            </SectionHeader>

            <Paragraph>
                This Site may display ads from other companies. Some of the ads on this Site or on other websites or apps may be personalized, meaning that they are intended to be relevant to you based on what we or the online advertising network serving the ad know about you or your device's browsing activity.
                <br /><br />
                You may opt out of Google's network of interest-based advertising by visiting <Link href="https://adssettings.google.com/" external>adssettings.google.com</Link>.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 8 */}
            <SectionHeader id="information-secure">
                Is My Information Secure?
            </SectionHeader>

            <Paragraph>
                We protect your personal information using technical and administrative security measures to reduce the risks of loss, misuse, unauthorized access, disclosure, and alteration. Although we implement reasonable security measures on our Site, you should be aware that we cannot guarantee the security of your information submitted via the Internet.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 9 */}
            <SectionHeader id="access-information">
                How Can I Access My Personal Information?
            </SectionHeader>

            <Paragraph>
                You can personalize your experience on this Site and other Transformco Sites by becoming a Registered User or Member. Once registered, you can submit, review and maintain your account profile information at any time by accessing your profile from within the particular Site.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 10 */}
            <SectionHeader id="opt-out-emails">
                Can I "Opt-Out" of Receiving Promotional Emails?
            </SectionHeader>

            <Paragraph>
                From time to time, we may send you emails with promotional offers and messages. If you would no longer like to receive these emails, you can unsubscribe by following the unsubscribe link located at the bottom of each promotional email. Please note that you may still receive transactional notices which will not have an unsubscribe link.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 11 - California Residents */}
            <SectionHeader id="california-residents">
                California Residents
            </SectionHeader>

            <Paragraph>
                This California Consumer Privacy Notice section applies to Consumers as defined by the California Consumer Privacy Act (as amended the "CCPA"). This California Notice applies to California Consumers that visit our Site.
            </Paragraph>

            <SubHeader>How and Why We Collect Your Personal Information</SubHeader>

            <DataTable
                headers={["Category of Personal Information", "Business Purposes for Collection, Use, and Disclosure"]}
                rows={[
                    [
                        <><strong>Identifiers</strong> such as a real name, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, or other similar identifiers.</>,
                        <>• Providing the Site and our products and services<br />• Detecting security incidents<br />• Debugging the Site<br />• Internal research and development<br />• Quality and safety assurance</>
                    ],
                    [
                        <><strong>Personal Records</strong>, including telephone number or financial information</>,
                        <>• Providing the Site and our products and services<br />• Detecting security incidents and protecting against malicious activity</>
                    ],
                    [
                        <><strong>Commercial information</strong>, including records of products or services purchased</>,
                        <>• Providing the Site and our products and services<br />• Internal research and development<br />• Processing and managing interactions and transactions</>
                    ],
                    [
                        <><strong>Internet or other electronic network activity information</strong></>,
                        <>• Providing the Site and our products and services<br />• Detecting security incidents<br />• Quality and safety assurance</>
                    ]
                ]}
            />

            <SubHeader>Your CCPA Rights</SubHeader>
            <Paragraph>
                <em>Right to Opt Out of Sales and Sharing</em><br />
                You can opt out of Sales and Sharing of your Personal Information by clicking on the "Do Not Sell or Share My Personal Information" link in the footer of the Site you are visiting.
                <br /><br />
                <em>Rights to Know, Delete, and Correct Personal Information</em><br />
                California Consumers have the right to exercise certain privacy rights under the CCPA. To exercise these rights, you may call us at (888) 527-6415 or submit a request online at <Link href="https://privacyportal.onetrust.com" external>our privacy portal</Link>.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 12 */}
            <SectionHeader id="loyalty-program">
                Loyalty Program and Notice of Financial Incentive Disclosures
            </SectionHeader>

            <Paragraph>
                This Loyalty Program and Financial Incentive disclosure applies to California and Colorado Consumers who are members of the Shop Your Way program.
            </Paragraph>

            <DataTable
                headers={["Program", "Incentive Offered", "Material Terms", "How to Opt-In"]}
                rows={[
                    [
                        <strong>Shop Your Way</strong>,
                        "Your Shop Your Way account earns points for purchases at eligible stores, special offers, and eligible credit card purchases.",
                        <>Categories of Personal Information Collected include Identifiers, Personal Records, Protected Characteristics, Commercial Information, and more.</>,
                        "Register for an account online or on the mobile app."
                    ]
                ]}
            />

            <TopLink />
            <Divider />

            {/* Section 13 */}
            <SectionHeader id="state-disclosures">
                State Specific Disclosures
            </SectionHeader>

            <Paragraph>
                This section applies to Colorado, Connecticut, Delaware, Iowa, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Texas, Tennessee, Utah, and Virginia residents. If you are a resident of a Regulated State, you have the following rights:
            </Paragraph>

            <BulletList items={[
                "Right to access. You have the right to request access to and obtain a copy of any Personal Data that we may hold about you.",
                "Right to confirm. You have the right to confirm that we are Processing your Personal Data.",
                "Right to correct. You have the right to request that we correct inaccuracies in your Personal Data.",
                "Right to delete. You have the right to request that we delete Personal Data.",
                "Right to opt out of Sales and Targeted Advertising."
            ]} />

            <TopLink />
            <Divider />

            {/* Section 14 */}
            <SectionHeader id="nevada-residents">
                Nevada Residents
            </SectionHeader>

            <Paragraph>
                Nevada consumers have the right to instruct website operators to not sell certain personal information to third parties. Transformco does not sell such information as defined under Nevada law.
            </Paragraph>

            <TopLink />
            <Divider />

            {/* Section 15 */}
            <SectionHeader id="contact">
                How May I Contact You?
            </SectionHeader>

            <Paragraph>
                If you have any questions about this Privacy Policy, please contact us at (888) 823-0650. If you prefer to contact us via US Mail, please address your inquiry to:
                <br /><br />
                <strong>Transform SR Holding Management LLC</strong><br />
                <strong>Legal Intake/Privacy Team</strong><br />
                <strong>5407 Trillium Blvd, #B120</strong><br />
                <strong>Hoffman Estates, Illinois 60192</strong>
            </Paragraph>

            <TopLink />
        </div>
    );
};

export default PrivacyPolicy;