import React from 'react';

// Define TypeScript interfaces for strong typing
interface License {
    [state: string]: string[];
}

interface Section {
    company: string;
    licenses: License;
}

interface LicenseData {
    generalNotice: {
        title: string;
        notes: string[];
    };
    sections: Section[];
}

// The provided data object
const licenseData: LicenseData = {
    generalNotice: {
        title: "License Information",
        notes: [
            "Some services and installation performed or arranged by other Transform-Authorized licensed contractors. Additional license information available upon request. Electrical services not available in NJ."
        ]
    },
    sections: [
        {
            company: "Transform SR Home Improvement Products LLC dba Sears Home Improvement Products",
            licenses: {
                AL: ["Res. Bldr. #26586", "HVAC #8186"],
                AR: ["HVACR #1004181-B", "Gen. Bldg. Contr 46342"],
                AZ: ["Dual Res. & Small Comm ROC327429 KB-02"],
                CA: [
                    "Gen. Bldg. Contr. #1055034-B",
                    "Insulation & Acoustical #1055034-C2",
                    "Cabinet, Millwork & Finish Carpentry #1055034-C6",
                    "Electrical #1055034-C10",
                    "Flooring #1055034-C15",
                    "Glazing #1055034-C17",
                    "HVAC #1055034-C20",
                    "Painting & Decorating #1055034-C33",
                    "Roofing #1055034-C39",
                    "Ceramic & Mosaic Tile Cont. #1055034-C54",
                    "Weatherization & Energy Conservation #1055034-D65"
                ],
                CT: [
                    "HTG, Piping & Cooling Unlimited Cont. #HTG.0400133-S1",
                    "HIC #HIC.0656167"
                ],
                DE: ["Master HVACR #HM-0000804"],
                FL: [
                    "Certified Res. Cont. #CRC1332436",
                    "Certified AC Cont. #CAC1820060",
                    "Certified Roofing Cont. #CCC1332105"
                ],
                GA: ["Conditioned Air-Restricted #CR109873"],
                ID: ["HVAC #HVC-C-6134", "Contracting Bus. #RCE-51346"],
                IL: ["Chicago Gen. Cont. #GC112220-1"],
                IN: ["Evansville Res. Remodeling Cont. #30010", "HVAC Cont. #30035"],
                IA: ["Master HVAC #677"],
                KS: [
                    "Johnson Co. Mechanical Cont. #2019-0767",
                    "Gen. Cont.-A #2019-0767"
                ],
                KY: ["Master HVAC #HM04667"],
                LA: ["Res. Mechanical & Building Cont. #885914"],
                MD: ["HIC #87854", "HVACR #75581"],
                MA: [
                    "HIC #195903",
                    "Plumbing and electrical services performed by licensed subcontractors"
                ],
                MI: ["Res. Bldr. #261900020", "HVAC #7116648"],
                MN: ["Res. Remodeler #CR759375"],
                MS: ["Res. Bldr. #RO5222"],
                NY: [
                    "NYC #2102011-DCA",
                    "Nassau County #HIC-158541",
                    "Rockland County #HIC-9990-A6-00-00",
                    "Suffolk County #41506-H",
                    "Westchester County #WC-18371-H06",
                    "Putnam County Home Imp. Cont. #PC-3159-A",
                    "HVAC Cont. #3264",
                    "City of Yonkers #7201"
                ],
                NJ: [
                    "HIC #13VH10587500",
                    "HVAC #19HC00260000",
                    "Work may be performed by independent licensed plumbing contractors or subcontractors"
                ],
                NM: [
                    "Gen. Bldg. Contr. #GB98 399985",
                    "HVAC #MM98 399985",
                    "Elec. #EE98 399985",
                    "MHD HVAC #MM98 C58598",
                    "MHD Elec. #EE98 C58598"
                ],
                NC: ["Bldg. Limited #82129", "HVAC #33611 H-3-II"],
                ND: ["Residential Builder Class D #41964"],
                OH: ["HVAC #44752"],
                OK: ["HVAC #106841", "Roofing #80004389"],
                OR: ["Gen. Contr. #226704"],
                PA: ["HI Contractor #PA005499"],
                RI: ["Res. Contr. #27281", "HVAC #7935"],
                SC: [
                    "Commercial Cont. AC2 & RG2 #115369",
                    "HVAC Res. #RBH-919",
                    "Mechanical Contractor #110634",
                    "Res. Bldr. RBB 50055"
                ],
                TN: [
                    "HVAC-Unlimited Contr. #54995",
                    "Res. & Small Comm-Unlimited BC-A #54995"
                ],
                TX: [
                    "HVAC Dallas #TACLB00020401E",
                    "San Antonio #TACLB00028703E",
                    "Houston #TACLB00023920C"
                ],
                UT: [
                    "Gen. Bldg. Contr. #B-100 11378622-5501",
                    "HVAC #S-350 11378622-5501"
                ],
                VA: ["Class A Contr. #2705172944", "HVAC #2710046587"],
                WA: ["Gen. Contr. #SEARS HI815MU"],
                DC: [
                    "HVAC RM902378",
                    "Home Improvement Contractor #420220000082"
                ],
                WV: ["Res. Bldr. #WV58678", "HVAC #WV58678"],
                WI: [
                    "Dwelling Contr. Cert. #DC-129500079",
                    "Dwelling Contr. Qualifier Cert. #DCQ-100700066",
                    "HVAC Contractor #15151"
                ],
                WY: ["Cheyenne Res. Cont. #CT-21-40541"]
            }
        }
    ],
};

const LicenseInformationComponent: React.FC = () => {
    return (
        <div className="p-5 leading-relaxed">
            {/* General Notice Section */}
            <h2 className="font-bold text-3xl mb-3 text-gray-500">
                {licenseData.generalNotice.title}
            </h2>
            <h2 className='text-2xl text-gray-500'>
                Licenses
            </h2>
            {licenseData.generalNotice.notes.map((note, index) => (
                <p key={index} className="pb-5 mb-5 text-justify border-b">
                    *{note}
                </p>
            ))}

            {/* Dynamic Sections (Companies and Licenses) */}
            {licenseData.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-5">
                    <p className="font-bold mb-3 text-gray-500">
                        *{section.company}
                    </p>

                    {/* Loop over states (keys in the licenses object) */}
                    <div className="space-y-1">
                        {Object.keys(section.licenses).map((stateCode) => (
                            <div key={stateCode} className="flex flex-col">
                                {/* State abbreviation (bolded) */}
                                <p className="font-bold w-10 shrink-0 text-gray-500 pt-2">
                                    {stateCode}
                                </p>

                                {/* License list (comma separated) */}
                                <p className="flex-1 text-gray-500 pb-2 ">
                                    {section.licenses[stateCode].join(', ')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LicenseInformationComponent;