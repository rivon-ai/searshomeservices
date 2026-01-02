import React from "react";

export default function ExpertApplianceRepair() {
  return (
    <div className="w-full py-8">
      {/* Section 1 */}
      <h3 className="text-xl md:text-2xl font-medium text-blue-950 mb-6 uppercase">
        EXPERT APPLIANCE REPAIR FOR YOUR HOME
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Sears Home Services is the leading appliance repair service in the
        nation. We repair all major appliance brands, makes and models, no
        matter where you bought them. Our goal is to provide quality repairs to
        help you extend the useful life of your household appliances.
      </p>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Sears Home Services Technicians are factory trained to repair every
        major brand of appliance. Our technicians are appliance repair experts
        who you can trust for repairs on top appliance brands like Samsung,
        Maytag, Bosch and LG.
      </p>

      {/* Section 2 */} 
      <h3 className="text-xl font-medium text-blue-950 mb-4">
        Why Choose Sears Appliance Repair?
      </h3>
      <ul className="list-disc pl-5 mb-6 text-gray-600 space-y-2">
        <li>Certified, insured techs</li>
        <li>Satisfaction guarantee</li>
        <li>National reach, local techs</li>
      </ul>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Whether you need HVAC service or your dryer isn’t heating, we have
        appliance repair technicians ready to fix the problem.
      </p>

      {/* Section 3 */}
      <h3 className="text-xl font-medium text-blue-950 mb-4">
        Schedule Your Appliance Repair Now!
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        We have local appliance repair technicians in your neighborhood.
      </p>
      <p className="text-gray-600 leading-relaxed">
        Simply call or select your appliance in the above scheduler and click
        the <span className="font-medium text-gray-800">Schedule Now</span> button
        to set up your repair online.
      </p>
    </div>
  );
}
