import React from 'react'
import ReactMarkdown from 'react-markdown'


interface TermsSection {
    key: string;
    title: string;
    subtitle?: string;
    content: Array<{
        type: 'paragraph' | 'bullet-list';
        text?: string;
        items?: string[];
    }>;
}

const termsOfUseData: TermsSection[] = [
    {
        key: "intro",
        title: "Terms of Use",
        subtitle: "Effective July 1, 2025.",
        content: [
            {
                type: "paragraph",
                text: "Please read carefully! These Terms of Use set forth important details about your relationship with Sears, including the rights you grant to Sears, restrictions on how you can use this web site, and our agreement to resolve disputes without resort to class action litigation."
            },
            {
                type: "paragraph",
                text: "This web site or mobile application (the \" Site\") is owned and operated by Transform SR Holding Management LLC, on behalf of itself and for its subsidiaries and affiliates (collectively, \"Transformco\", \"Sears\", \"We\", or \"Us\"). By accessing, using, registering for, or purchasing merchandise from the Site, you agree to be bound by these terms of use (the \"Terms\"). All visitors to and users of any aspects of the Site (collectively, \"Users\") are bound by these Terms. Sears reserves the right to modify the Terms at any time without prior notice to you, and therefore, Sears recommends that you read these Terms carefully each time you use the Site. By signing in or registering to use the Site, you accept all the provisions of these Terms. If you are unwilling to be bound by these Terms, you should not access, use, register for, or purchase merchandise from the Site."
            },
            {
                type: "paragraph",
                text: "Please note that the guidelines, policies and other terms and conditions of service and use of other web sites affiliated with Transformco may vary from these Terms. If a Transformco affiliate has separate terms of use for its website(s), or a separate agreement governing its use, the provisions of the affiliate site's terms shall control in the event of a conflict with these Terms. Except as supplemented or superseded as described herein, these Terms apply to the entire network of Transformco Sites, and control your use thereof. Except in the event of a conflict, as described in this paragraph, these Terms apply in addition to any other policies or agreements that may apply to you related to any contests, sweepstakes, rewards or loyalty programs, surveys, transactions or purchases of goods or services, or other engagements you have with the Site."
            }
        ]
    },
    {
        key: "eligibility",
        title: "Eligibility",
        content: [
            {
                type: "paragraph",
                text: "The Site is not targeted towards, nor intended for use by, anyone under the age of 18. By using the Site, you represent and warrant that you are 18 years of age or older. If you are not at least 18 years of age, do not access, use, register or purchase merchandise on the Site. In the event we become aware you are under 18, we will terminate your registration. Some merchandise offered for sale on the Site may be restricted for sale to persons of a certain age (depending on the state or jurisdiction of residence) and we will require you to submit or provide valid proof of your age before purchasing or receiving age-restricted merchandise."
            }
        ]
    },
    {
        key: "privacy",
        title: "Privacy",
        content: [
            {
                type: "paragraph",
                text: "Sears believes strongly in the protection of the privacy of Users and our customers. Our data collection and use practices are set forth in our <a href=\"https://www.sears.com/privacy-policy\">Privacy Policy</a>, which we encourage you to review."
            }
        ]
    },
    {
        key: "changesToSite",
        title: "Changes to the Site",
        content: [
            {
                type: "paragraph",
                text: "You agree and understand that the Site, including any and all features available via the Site and any User Content (as defined below), may be modified by us, in our sole discretion, at any time without prior notice. Unless expressly stated otherwise, any new features, new services, enhancements or modifications to the Site implemented after your initial access to the Site shall be subject to these Terms. We do not actively monitor, and undertake no obligation to monitor or modify, any reviews, information, content, data, text, links to third party websites, User profile information, sounds, photographs, graphics, video, messages or other materials uploaded or made available via the Site by or on behalf of any User (all such items provided by or on behalf of Users, collectively, \"User Content\"). Nonetheless, we reserve the right to investigate and take appropriate action, including legal action, in our sole discretion, against anyone who violates these Terms, including without limitation, by removing any User Content posted in violation of these Terms, terminating the registration of such violators or blocking such violators' use of the Site."
            }
        ]
    },
    {
        key: "registration",
        title: "Registration",
        content: [
            {
                type: "paragraph",
                text: "In order to access some features of the Site, you may be required to register and to select a password and user name, which shall consist of an email address you provide (\"User ID\"). To register, use the registration form available by clicking the \"register\" link near the top of any page on the Site. By registering, you will also be enrolled as a member in the Shop Your Way program and must agree to the Program Terms and Conditions for Membership in the Shop Your Way Program available <a href=\"https://www.sears.com/shop-your-way/terms\">here</a>. If you register, you agree to provide us with accurate and complete registration information, and to inform us immediately of any updates or other changes to such information. For example, you may not: (i) enter, select or use a false name or an email address owned or controlled by another person with the intent to impersonate that person, or (ii) use as a User ID a name subject to any rights of a person other than yourself without appropriate authorization. Failure to comply with the terms of this paragraph shall constitute a material breach of these Terms, which may result in immediate termination of your account. In addition, we reserve the right to refuse registration of, or cancel, a User ID in our discretion."
            }
        ]
    },
    {
        key: "security",
        title: "Security",
        content: [
            {
                type: "paragraph",
                text: "You are responsible for maintaining the confidentiality of your password and you are fully responsible for all activities that occur under your User ID and password, whether or not you authorize such activities. Any User ID and password for your access to the Site shall be for your personal, non-commercial use only. You agree to (a) immediately notify us of any unauthorized use of your User ID or password of which you become aware, and (b) ensure that you exit from your account at the end of each session."
            }
        ]
    },
    {
        key: "useOfSite",
        title: "Use of the Site/License/Services",
        content: [
            {
                type: "paragraph",
                text: "Sears grants you a limited license to make personal use of the Site. This license grant does not include: (a) any resale or commercial use of the Site or content therein; (b) the collection and use of any product listings or descriptions; (c) making derivative uses of the Site and its contents; or (d) use of any data mining, robots, or similar data gathering and extraction methods on the Site. Except as noted above, Users of the Site are not conveyed any right or license by implication, estoppel, or otherwise in or under any patent, trademark, copyright, or proprietary right of Sears or any third party."
            },
            {
                type: "paragraph",
                text: "You may not use, frame or utilize framing techniques to enclose any Sears trademark, logo, content or other proprietary information (including the images found at this Site, the content of any text or the layout/design of any page or form contained on a page) without Sears' express written consent. Further, you may not use any meta tags or any other \"hidden text\" utilizing a Sears name, trademark, or product name without Sears' express written consent."
            },
            {
                type: "paragraph",
                text: "Any unauthorized use of the Site will terminate the permission or license granted by these Terms and may violate copyright laws, trademark laws (including trade dress), and communications regulations and statutes. All violators will be prosecuted to the fullest extent of the law."
            },
            {
                type: "paragraph",
                text: "Permitted uses of the Site include soliciting opinions, ideas and other input from Users; sharing ideas and opinions with other Users, searching the Site for User Content (as defined herein) and business or product information, and purchasing goods or services from the Site for personal use, not for resale. You may also invite people you know to join the Site. You acknowledge and agree that we do not control the User Content posted to the Site, or any links to other websites, including the content of any messages posted by Users, and that we do not guarantee the accuracy, integrity or quality of any User Content. You further understand and agree that we do not necessarily endorse, support, sanction, encourage, verify, or agree with the comments, opinions, or statements or other User Content posted on or otherwise displayed on or transmitted via the Site. All User Content, including advice and opinions posted by Users, comprises the views and responsibility of those who post such User Content, and does not necessarily represent the views of Sears. You understand that, by using the Site, you may be exposed to User Content that is offensive, indecent or objectionable."
            }
        ]
    },
    {
        key: "restrictions",
        title: "Restrictions on Rights to Use",
        content: [
            {
                type: "bullet-list",
                items: [
                    "download, modify, reproduce, adapt, translate, reverse engineer, create derivative works based upon, publicly display, sell, rent, license, or in any way commercially exploit any portion of the Site, except and to the extent expressly permitted under these Terms;",
                    "remove any copyright, trademark or other proprietary rights notice contained in or on the Site;",
                    "use any robot, spider, site search/retrieval application, or other device to retrieve or index any portion of the Site;",
                    "collect any information about other Users (including usernames and/or email addresses) for any purpose other than to solicit and/or share reviews with other Users;",
                    "reformat or frame any portion of any Web pages that are part of the Site;",
                    "create user accounts by automated means or under false or fraudulent pretenses;",
                    "create or transmit to other Users unsolicited electronic communications, such as \"spam,\" or otherwise interfere with other Users' enjoyment of the Site;",
                    "submit to the Site any content that falsely states or implies that such content is sponsored or endorsed by us;",
                    "transmit or upload to the Site any item containing or embodying any virus, worm, defect, Trojan horse, software bomb or other feature designed to damage or degrade in any manner the performance of the Site, any other Web site, or any computer or other device or system, or the enjoyment of the Site by any User;",
                    "use the Site to violate the security of or gain unauthorized access to any computer or computer network or other device or system (including unauthorized attempts to discover passwords or security encryption codes);",
                    "submit to the Site any content that is unlawful or facilitates, constitutes, promotes or encourages illegal activity; or otherwise use the Site to transfer or store illegal material, including any material deemed threatening or obscene;",
                    "copy or store any User Content offered on the Site other than for your personal, non-commercial use;",
                    "take any action that imposes, or may impose, in our sole discretion, an unreasonable or disproportionately large data or traffic load on the Site or the IT infrastructure used to operate and make the Site available;",
                    "use the Site and/ or any User Content, intentionally or unintentionally, to violate any applicable local, state, federal or international law; or",
                    "collect or store personal data about other Users in connection with the prohibited activities described in this paragraph."
                ]
            }
        ]
    },
    {
        key: "userContent",
        title: "User Content Posted on the Site",
        content: [
            {
                type: "paragraph",
                text: "Subject to the following restrictions, registered Users may post, upload or transmit User Content on the Site. Without limiting the generality of any other provisions of these Terms, you agree:"
            },
            {
                type: "bullet-list",
                items: [
                    "You may not post, upload or transmit any User Content that (i) infringes or otherwise violates any copyright, patent, trademark, trade secret, publicity or privacy right or other proprietary right of any party, or (ii) is proprietary to a third party, without such third party's prior written consent.",
                    "You understand and agree that we do not monitor but reserve the right to review and delete any User Content, including User Content that, in our sole discretion, (i) violates these Terms, (ii) is offensive or illegal, or (iii) may harm, violate the rights of or threaten the safety of any User and/or any other individual or entity.",
                    "You are solely responsible for any User Content you post, publish or display on the Site or transmit to Users. We reserve the right, but undertake no obligation, to monitor disputes between you and any other User, or any other entity or individual, in connection with the Site. You are solely responsible for the resolution of any disputes that arise between you and any other User or any other entity or individual.",
                    "You will post only User Content you believe in good faith to be true and accurate, and you will not post to the Site any User Content that is false, inaccurate, misleading or fraudulent.",
                    "If you are employed by Transformco or if you have received or will receive any compensation or consideration from Transformco, including but not limited to product samples and Shop Your Way points, directly or indirectly in exchange for any opinion, endorsement, review or critique that you post, upload or transmit on the Site, you must clearly and conspicuously disclose the nature of your connection to Transformco.",
                    "By uploading User Content to the Site, you represent and warrant that you have all rights and authority necessary to grant, and do hereby grant: (i) Sears, its Affiliates, our respective contractors, and our business partners, an irrevocable, perpetual, non-exclusive, royalty-free, fully sublicensable, fully paid up, worldwide license and right to use, copy, publicly perform, digitally perform, publicly display, and distribute such User Content and to prepare derivative works based on, or incorporate into other works, such User Content, with or without attribution; and (ii) subject to the restrictions set forth in these Terms, all Users an irrevocable, perpetual, non-exclusive, royalty-free license and right to use such User Content for each such User's personal, non-commercial use. You further represent and warrant that you did not work with parties in conjunction with your User Content who are: a) represented under contract (e.g., by a talent agent or manager) that would limit or impair our ability to display your User Content in any media form; b) subject to an acting or modeling contract that would make your/their appearance in the User Content a violation of any third-party rights; or c) under any other contractual relationship, including but not limited to guild and/or union memberships, that may prevent us from being able to use the User Content worldwide in all media in perpetuity on a royalty-free basis, without any payment or fee obligations. You hereby irrevocably waive and assign to us any and all so-called moral rights or \"droit moral\" you may have in or with respect to any User Content you post to the Site.",
                    "You understand that Sears may be working on the same or a similar idea or concept to any ideas, expression of ideas or other materials you submit within your User Content, or that Sears may already know of such an idea or concept from other sources, or that Sears may simply wish to develop this (or a similar idea) on its own or it may have taken/will take some other action."
                ]
            },
            {
                type: "paragraph",
                text: "In return for your access to and use of the Site, you acknowledge that you have read, understand and agree to the terms enumerated below with respect to any User Content you submit on the Site:"
            },
            {
                type: "bullet-list",
                items: [
                    "To the best of your knowledge, the User Content represents your own original work, you have all necessary rights to disclose the User Content to Sears and in doing so Sears' use of the User Content will not infringe upon any other individual's or entity's rights.",
                    "You understand that disclosure of your User Content to Sears does not establish a confidential relationship or obligate Sears to treat the User Content (or any related materials) as secret or confidential.",
                    "You understand that Sears has no obligation, either express or implied, to develop or use your User Content and that no compensation is due to you or anyone else for any inadvertent or intentional use of User Content, or other content derived from your User Content. You understand that Sears assumes no obligation with respect to any User Content. For your own protection, we assume that you will rely on whatever patent protection you may want to secure, or have already secured, in your idea. In the absence of a separate formal contact, your rights shall be limited to those existing under the patent laws of the United States.",
                    "If your User Content is the subject of a pending or issued patent, you have disclosed or will disclose that fact to Sears."
                ]
            },
            {
                type: "paragraph",
                text: "The following is a partial list of the kind of User Content that is illegal and/or is prohibited on or through the Site. You may not post any User Content that:"
            },
            {
                type: "bullet-list",
                items: [
                    "is patently offensive to Users, such as content that promotes racism, bigotry, hatred or physical harm of any kind against any group or individual;",
                    "harasses or advocates harassment of another person or User;",
                    "promotes illegal activities or conduct that is abusive;",
                    "is threatening, obscene, defamatory or libelous;",
                    "is pornographic or sexually explicit in nature; or",
                    "seeks, or recommends providers of, material that exploits people under the age of 18 in a sexual or violent manner, or seeks or recommends providers that solicit personal information from anyone under 18."
                ]
            },
            {
                type: "paragraph",
                text: "Sears retains the right to remove any User Content from its websites that in Sears' sole discretion violates any of the restrictions or guidelines defined in these Terms."
            }
        ]
    },
    {
        key: "copyrights",
        title: "Copyrights",
        content: [
            {
                type: "paragraph",
                text: "If you believe any User Content or any other aspect of the Site infringes your copyright, you should send written notice of copyright infringement to our designated copyright agent at the address given below. Your notice must meet the requirements of the Digital Millennium Copyright Act (as required under 17 U.S.C. § 512) by providing the following information:"
            },
            {
                type: "bullet-list",
                items: [
                    "A description of the copyrighted work that you claim has been infringed;",
                    "description of where the material that you claim is infringing is located on the Site;",
                    "Your address, telephone number and email address;",
                    "A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent or the law;",
                    "A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the owner of the copyright at issue or are authorized to act on the copyright owner's behalf; and",
                    "An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright at issue."
                ]
            },
            {
                type: "paragraph",
                text: "Our designated copyright agent for notice of claims of copyright infringement on the Site may be reached at the following address:"
            },
            {
                type: "paragraph",
                text: "Copyright Agent\nTransform SR Holding Management LLC\n5407 Trillium Boulevard, Suite B120\nHoffman Estates, IL 60179"
            },
            {
                type: "paragraph",
                text: "Or by email: [shmcdmca@transformco.com](shmcdmca@transformco.com)"
            }
        ]
    },
    {
        key: "counterNotice",
        title: "Counter-Notice",
        content: [
            {
                type: "paragraph",
                text: "If you believe that your User Content that was removed (or to which access was disabled) pursuant to a Digital Millennium Copyright Act notice we received is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to law, to post and use the content in your User Content, you may send a counter-notice containing the following information to the Copyright Agent at the address listed above:"
            },
            {
                type: "bullet-list",
                items: [
                    "Your physical or electronic signature;",
                    "Identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled;",
                    "A statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content; and",
                    "Your name, address, telephone number, and e-mail address, a statement that you consent to the jurisdiction of the federal court in Cook County, Illinois, and a statement that you will accept service of process from the person who provided notification of the alleged infringement."
                ]
            },
            {
                type: "paragraph",
                text: "If a counter-notice is received by the Copyright Agent, Sears may send a copy of the counter-notice to the original complaining party informing that person that it may replace the removed content or cease disabling it in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider, member or user, the removed content may be replaced, or access to it restored, in 10 to 14 business days or more after receipt of the counter-notice, at Sears' sole discretion."
            }
        ]
    },
    {
        key: "ownership",
        title: "Ownership",
        content: [
            {
                type: "paragraph",
                text: "As between you and us, the Site, including all photographs, images, text, graphics, icons, audio clips, software and other aspects thereof (excluding User Content), all improvements or modifications thereof, all derivative works based thereon, and the collection, arrangement, and assembly of the Site, including all copyrights, trademarks, and other intellectual property or proprietary rights in the foregoing, are owned by us or our licensors. As between you and us, subject to any licenses and rights expressly granted herein, any User Content posted by you is owned by you. Nothing contained in these Terms shall be deemed to grant to you or any other User any rights, title or interest in or to any copyright, trademark or other proprietary right of ours or any of our licensors."
            },
            {
                type: "paragraph",
                text: "Any trademarks, service marks, and other marks and indicators of source or origin that are displayed on the Site are the proprietary property of Transformco or their respective owners, as applicable. None of such marks may be used in connection with any other product or service in a manner that is likely to cause confusion among consumers, or to disparage or discredit the owner of such mark or its affiliates. Any trademarks of third parties that appear on the Site are the property of their respective owners, who may or may not be affiliated with, connected to, or sponsored by us. You may not use, copy, modify or display any of the trademarks, service marks, names or logos appearing on the Site without the express written permission of the trademark owner."
            },
            {
                type: "paragraph",
                text: "Nothing in these Terms shall be deemed to grant to you or any other User any license or right in or to any patent, copyright, trademark, trade secret or other proprietary right of Transformco."
            }
        ]
    },
    {
        key: "thirdPartyAds",
        title: "Third Party Advertisements and Links to Third Party Sites",
        content: [
            {
                type: "paragraph",
                text: "We may display advertisements from third parties on the Site, such as banner advertisements, pop-up texts, and links to third party sites. We are not responsible for the content of such advertisements or links, or for any products, services or other materials relating to such advertisements, any linked site, or any link contained in a linked site. The display of any advertisement or link does not imply endorsement by us of the advertisement or linked site or any content therein."
            }
        ]
    },
    {
        key: "placingOrder",
        title: "Placing an Order",
        content: [
            {
                type: "paragraph",
                text: "For details on how to place orders on the Site, please [click here](https://www.sears.com/en_us/customer-service/policies/payment-methods.html#howtoorder). Sears currently ships to locations within the 50 United States via UPS, and APO/FPO addresses via USPS. Sears currently ships to some international locations via a third party partner. For details on international shipping, please see [Sears International Shipping policy](https://www.sears.com/en_us/customer-service/shipping-delivery-returns/international-shipping.html)."
            },
            {
                type: "paragraph",
                text: "To see Sears' shipping and delivery policies in more detail, including product specific guidelines, please see the [Sears Shipping & Delivery policy](https://www.sears.com/en_us/customer-service/shipping-delivery-returns/shipping-methods.html)."
            },
            {
                type: "paragraph",
                text: "Sears does not currently ship to Puerto Rico, Guam or the US Virgin Islands. Some oversized items requiring freight delivery cannot be shipped to Alaska or Hawaii. Sears gift cards are shipped via USPS within the continental United States, as well as Alaska, Hawaii and Puerto Rico. The risk of loss and title for all merchandise ordered on the Site passes to you when the merchandise is delivered to the shipping carrier. You may purchase merchandise from the Site by using any one of the options listed in “Payment Options” section of our [How to Order page](https://www.sears.com/en_us/customer-service/policies/payment-methods.html#howtoorder). Sears reserves the right to change its payment procedures at any time without prior notice to you."
            },
            {
                type: "paragraph",
                text: "Sears charges sales tax for merchandise ordered on the Site based on the applicable state sales tax rate of the location to which the order is being shipped."
            },
            {
                type: "paragraph",
                text: "Some products offered through the Site may be fulfilled by third-party sellers, such as Sears Marketplace items. Third-party/Marketplace sellers' shipping and delivery policies may differ from those offered by Sears. When ordering a product sold by a third-party or Marketplace seller, you should check their page for details on their shipping and delivery policies. Sears is an agent of third-party/Marketplace sellers for the sole and express purpose of receiving funds as payment for their merchandise sold on the Site, and transmitting those funds to the third party/Marketplace seller. You agree that Sears' receipt of funds on behalf of a Marketplace seller is tantamount to receipt of the funds directly by the Marketplace seller, even if such funds are not subsequently remitted to the Marketplace seller for any reason; when you tender payment to Sears for third-party/Marketplace merchandise, you have fulfilled your obligation to purchase such merchandise."
            },
            {
                type: "paragraph",
                text: "You should contact third-party/Marketplace sellers directly via the contact information provided for any inquiries or customer service issues related to their merchandise, such as returns, or warranty issues. As payment agent, Sears will refund any money to you for returns of third-party/Marketplace merchandise via the payment method used to purchase the merchandise, after we receive notice from the third-party/Marketplace seller that you have returned merchandise to them in accordance with their return policy."
            },
            {
                type: "paragraph",
                text: "Sears reserves the right to refuse or cancel any orders placed for products and/or services which the sale or use of such product and/or service in your state or jurisdiction is restricted or prohibited."
            },
            {
                type: "paragraph",
                text: "To properly serve all customers, Sears reserves the right to limit quantities of orders to only one (1) of any such item(s) purchased. Sears further reserves the right to cancel multiple orders of any limited quantity item purchased by the same User and/or shipped to the same delivery address. Commercial use of the Site is expressly prohibited. Sears reserves the right to cancel any orders that it determines in its sole discretion are made for commercial resale purposes."
            },
            {
                type: "paragraph",
                text: "Sears may display advertising prints for products sold through a Site. Sears attempts to display the colors of the products shown on the Site as accurately as possible. However, we cannot guarantee that the color you see matches the product color, as the display color depends, in part, upon the monitor used by you."
            },
            {
                type: "paragraph",
                text: "Pricing errors may occur on the Site from time to time, on items sold by Sears, or items sold by third party sellers on Sears Marketplace. Sears attempts to correct all pricing errors as soon as they are discovered, or as soon as Sears receives notice of an error. Sears reserves the right to cancel any orders containing pricing errors, with no further obligations to you, even after your receipt of an order confirmation or shipping notice from Sears. Any payments you make to Sears for orders that are cancelled due to pricing errors will be refunded."
            },
            {
                type: "paragraph",
                text: "From time to time, and in our sole discretion, we may change the goods and services which are eligible for purchase with gift cards.\nA valid payment method must be provided with your order if your Shopping Cart contains ineligible items."
            }
        ]
    },
    {
        key: "returns",
        title: "Returns and Cancellations",
        content: [
            {
                type: "paragraph",
                text: "Orders you submit online may be cancelled until they are processed. Orders with a status of \"Processing\" may not be cancelled, and you must wait until you receive the merchandise in order to return it. Order status can be checked online by logging into your user account. All returns of merchandise are subject to the <a href=\"https://www.sears.com/returns-cancellations\">Sears Returns & Cancellations policy</a>. Please click on the policy for more details. Products fulfilled by third party merchants, such as items sold by Sears Marketplace sellers, are subject to the third party merchant's individual returns and cancellations policies. If you are purchasing an item from a third party merchant, please see the third party merchant's page for details."
            }
        ]
    },
    {
        key: "changesToTerms",
        title: "Changes to Terms",
        content: [
            {
                type: "paragraph",
                text: "We reserve the right to make changes at any time to these Terms. Any modifications to these Terms will be effective upon posting. You agree to review the Terms periodically so that you are aware of any modifications. Your continued use of the Site after any modifications indicates your acceptance of the modified Terms."
            }
        ]
    },
    {
        key: "resolvingDisputes",
        title: "Resolving Disputes",
        content: [
            {
                type: "paragraph",
                text: "Dispute Resolution\nPrior to commencing, joining, or being joined (as either an individual litigant or the member of a class) to any judicial action that asserts a claim arising from, relating to, or in connection with these Terms or your access to and/or use of the Site, you agree to provide, in writing to the address listed below, notice of your claim. You further agree to include with your notice, your name, a way in which Sears can contact you (i.e., address, telephone number, email address, etc.), a description of your claim, and any documentation in your possession supporting your claim. You expressly acknowledge that compliance with this provision requires you to submit your claim and supporting documentation individually, and not as a group of individuals.\nYou also agree to provide Sears no fewer than sixty (60) days from the date you submit your claim to resolve it, whether by taking corrective action or compensating you for your alleged damages."
            },
            {
                type: "paragraph",
                text: "Address to Send Your Claim: via email at [legalint@transformco.com](legalint@transformco.com) or mail at:\nTransformco SR Holding Management LLC\n5407 Trillium Boulevard, Suite B120\nHoffman Estates, IL 60192\nAttention: Legal Intake"
            },
            {
                type: "paragraph",
                text: "YOU AGREE THAT PROVIDING NOTICE OF YOUR CLAIM TO TRANSFORMCO AND ALLOWING SEARS AT LEAST SIXTY (60) DAYS TO ATTEMPT TO RESOLVE YOUR CLAIM IS A CONDITION PRECEDENT TO YOUR COMMENCING, JOINING, OR BEING JOINED TO ANY JUDICIAL ACTION AGAINST SEARS, AS EXPLAINED ABOVE."
            },
            {
                type: "paragraph",
                text: "Class Action Waiver\nIF, AFTER HAVING PROVIDED SEARS NOTICE OF YOUR CLAIM AND AT LEAST SIXTY (60) DAYS TO RESOLVE IT, YOU AND SEARS HAVE STILL NOT REACHED A RESOLUTION AND IF YOUR CLAIM EXCEEDS $1,000, YOU AGREE TO WAIVE YOUR RIGHT TO BRING OR PARTICIPATE IN A CLASS ACTION OR OTHER REPRESENTATIVE PROCEEDING WITH RESPECT TO YOUR CLAIM."
            },
            {
                type: "paragraph",
                text: "Time Limit to Bring Your Claim\nEXCEPT WHERE PROHIBITED BY LAW, YOU ARE NOT ALLOWED TO BRING ANY CLAIM AGAINST SEARS (OR ANY OTHER THIRD-PARTY BENEFICIARY) MORE THAN ONE YEAR AFTER THE CLAIM ARISES. THIS DEADLINE WILL BE EXTENDED BY 30 DAYS IF YOU PROVIDE US WRITTEN NOTICE OF YOUR CLAIM, IN COMPLIANCE WITH THE “DISPUTE RESOLUTION” SECTION ABOVE, WITHIN ONE YEAR OF THE DATE YOUR CLAIM ARISES. IF, HOWEVER, YOU FAIL TO COMPLY WITH THE “DISPUTE RESOLUTION” SECTION WITHIN ONE YEAR AFTER YOUR CLAIM ARISES, YOU AGREE THAT YOUR CLAIM IS BARRED BY THIS PROVISION."
            }
        ]
    },
    {
        key: "applicableLaw",
        title: "Applicable law",
        content: [
            {
                type: "paragraph",
                text: "By visiting the Site, you agree that the laws of the State of Illinois, without regard to principles of conflict of laws, will govern these Terms and any dispute of any sort that might arise between you and Sears."
            }
        ]
    },
    {
        key: "miscellaneous",
        title: "Miscellaneous",
        content: [
            {
                type: "paragraph",
                text: "No agency, partnership, joint venture, or employment relationship is created as a result of these Terms, and you do not have any authority of any kind to bind Sears in any respect whatsoever. We may provide you with notices, including those regarding changes to these Terms, by email, regular mail, or postings on the Site. These Terms, which shall be deemed accepted by you upon your use of the Site, constitute the entire agreement among you and Sears regarding use of the Site. Sears' failure to exercise or enforce any right or provision of these Terms shall not constitute a waiver of the enforcement of such right or provision. If any provision of these Terms is deemed to be illegal or unenforceable, the remainder of the Terms shall be unaffected and shall continue to be fully valid, binding and enforceable. These Terms are not assignable, transferable or sublicensable by you, except with our prior written consent. The headings in these Terms are for convenience only and have no legal or contractual effect. These Terms include and incorporate by reference the [Privacy Policy](https://www.searshomeservices.com/privacy) for the Site and any notices regarding the Site."
            }
        ]
    },
    {
        key: "contactAndViolations",
        title: "Contact and Violations",
        content: [
            {
                type: "paragraph",
                text: "Please contact us with any questions regarding, or report any violations of, these Terms <a href=\"https://www.sears.com/customer-service\">here: Customer Service</a>."
            },
            {
                type: "paragraph",
                text: "For claims or requests for arbitration, see the Confidential Arbitration section of these Terms of Use."
            }
        ]
    },
    {
        key: "patents",
        title: "Patents",
        content: [
            {
                type: "paragraph",
                text: "One or more patents may apply to this Web site, including without limitation: U.S. Patent Nos. 5,761,649, 5,970,474, 6,330,592, 7,963,441, 8,015,068, 8,301,504, D619,603, D619,604, D619,605, D619,06, D620,021, and D644,649."
            }
        ]
    }
];

export default function page() {

    return (
        <>
            <section className='text-gray-500 w-[75%] mx-auto'>
                {termsOfUseData.map((section, idx) => (
                    <div key={section.key} className="mb-6">
                        {/* Title */}
                        <h2 className="text-xl font-bold mb-2">{section.title}</h2>

                        {/* Subtitle if exists */}
                        {section.subtitle && (
                            <p className="text-sm mb-4">{section.subtitle}</p>
                        )}

                        {/* Content */}
                        {section.content.map((block, blockIdx) => {
                            if (block.type === 'paragraph') {
                                return (
                                    <p key={blockIdx} className="mb-4 leading-relaxed">
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
                                    <ul key={blockIdx} className="list-disc pl-5 mb-4 space-y-1">
                                        {block.items?.map((item, i) => (
                                            <li key={i} className="leading-relaxed">
                                                {item.includes('<a ') ? (
                                                    <span dangerouslySetInnerHTML={{ __html: item }} />
                                                ) : (
                                                    item
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }

                            return null;
                        })}
                    </div>
                ))}
            </section>


        </>
    )
}