import React from "react";
import Link from "next/link";

interface FaqItem {
  title: string;
  description: string;
  href: string;
  id: string;
}

const faqData: FaqItem[] = [
  {
    title: "How much does it cost to have someone come out?",
    description:
      "We charge a diagnostic trip fee (typically between $90 and $150) which is waived if you proceed with the repair.",
    href: "/help/repair-faq/how-much-does-it-cost-to-have-someone-come-out",
    id: "how-much-does-it-cost-to-have-someone-come-out",
  },
  {
    title:
      "The website claims the service I need is not available in my area. What can I do?",
    description:
      "Call our customer service agents at 1-802-552-4364 and we'll assist you with getting the service that you need.",
    href: "/help/repair-faq/the-website-claims-the-service-i-need-is-not-available-in-my-area-what-can-i-do",
    id: "the-website-claims-the-service-i-need-is-not-available-in-my-area-what-can-i-do",
  },
  {
    title:
      "Can you give me an estimate for the total cost of repair over the phone?",
    description:
      "Sears Home Services provides repair estimates after an in-home diagnosis. Each appliance repair varies based on type, issue, and location. Technicians give an upfront quote that includes the trip fee, parts, and labor.",
    href: "/help/repair-faq/can-you-give-me-an-estimate-for-the-total-cost-of-repair-over-the-phone",
    id: "can-you-give-me-an-estimate-for-the-total-cost-of-repair-over-the-phone",
  },
  {
    title:
      "Can you give the tech some information (such as gate code, doorbell broken or dog in the yard)?",
    description:
      "Add special instructions in the Service Scheduler when you set up your repair appointment. Call 1-802-552-4364 if you forget.",
    href: "/help/repair-faq/can-you-give-the-tech-some-information-such-as-gate-code-doorbell-broken-or-dog-in-the-yard",
    id: "can-you-give-the-tech-some-information-such-as-gate-code-doorbell-broken-or-dog-in-the-yard",
  },
  {
    title: "How do I cancel my repair service?",
    description:
      "Use our Order Lookup tool or call customer service at 1-802-552-4364 to cancel your service before the technician’s arrival.",
    href: "/help/repair-faq/how-do-i-cancel-my-repair-service",
    id: "how-do-i-cancel-my-repair-service",
  },
  {
    title: "How do I reschedule an appliance repair appointment?",
    description:
      "Easily reschedule your Sears appliance repair appointment online or by phone. Choose a new date that fits your schedule with our quick and flexible options.",
    href: "/help/repair-faq/how-do-i-reschedule-an-appliance-repair-appointment",
    id: "how-do-i-reschedule-an-appliance-repair-appointment",
  },
  {
    title: "How fast can I schedule my repair appointment?",
    description:
      "Same day and next day repair service appointments are often available in many areas.",
    href: "/help/repair-faq/how-fast-can-i-schedule-my-repair-appointment",
    id: "how-fast-can-i-schedule-my-repair-appointment",
  },
  {
    title:
      "What if you repair my appliance and the same problem occurs? Will you charge me to come out a second time?",
    description:
      "You typically won't be charged again for parts or labor to fix the same problem if caused by defective parts or workmanship by us.",
    href: "/help/repair-faq/what-if-you-repair-my-appliance-and-the-same-problem-occurs-will-you-charge-me-to-come-out-a-second-time",
    id: "what-if-you-repair-my-appliance-and-the-same-problem-occurs-will-you-charge-me-to-come-out-a-second-time",
  },
  {
    title: "What hours are your call center agents available?",
    description:
      "Our AI-powered call center agents are available 24/7, 365 days a year.",
    href: "/help/repair-faq/what-hours-are-your-call-center-agents-available",
    id: "what-hours-are-your-call-center-agents-available",
  },
];

const FaqCard = ({
  title,
  description,
  href,
  id,
  index,
}: FaqItem & { index: number }) => {
  return (
    <div>
      <Link
        href={href}
        className="hover:no-underline flex-1"
        data-testid={`help_center_home_page_section_faq_list_title_${index}_${id}`}
        data-metric-id={`help_center_home_page_section_faq_list_title_${index}_${id}`}
        data-metric-value=""
        target="_self"
      >
        <div className="flex flex-col h-full bg-white rounded-2xl p-6 border-2 border-transparent transition-all duration-300 ease-in-out hover:border-blue-900">
          <div className="text-xl font-semibold leading-8 lg:pb-4">
            <span className="text-blue-950 text-xl font-semibold leading-8 line-clamp-2">
              {title}
            </span>
          </div>
          <div className="leading-6 line-clamp-3 overflow-hidden wrap-words max-h-[6em] mb-8 lg:mb-0">
            <p className="text-md leading-6 font-normal">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function FaqCardSection() {
  return (
    <div className="">
      <div className="flex justify-center items-center max-w-[80%] lg:mx-auto">
        <div className="mx-4 lg:mx-0 py-12 lg:py-20">
          <h2 className="text-blue-950 mb-0 text-center text-3xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="pt-10">
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6"
              data-metric-id="faq_list_section"
              data-metric-value="help_center_home_page_section_faq_list"
            >
              {faqData.map((item, index) => (
                <FaqCard key={index} {...item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
