import React from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

// Define the structure for FAQ items
interface FAQItem {
  id: string;
  question: string;
  content: React.ReactNode;
}

// FAQ data - easily editable
const faqData: FAQItem[] = [
  {
    id: 'broken-appliance',
    question: 'Do you have a broken appliance?',
    content: (
      <>
        <p className="mb-2">
          To change or cancel an existing order,{' '}
          <Link href="/orders" className="text-blue-600 hover:underline">
            click here
          </Link>
        </p>
        <p className="mb-2">
          If your appliance has a warranty or protection agreement, please call us at{' '}
          <Link href="tel:1-800-469-4663" className="text-blue-600 hover:underline">
            1-800-469-4663
          </Link>
        </p>
        <p>
          If you do not have a warranty or protection agreement,{' '}
          <Link href="/repair#scheduler" className="text-blue-600 hover:underline">
            click here to book a repair
          </Link>
        </p>
      </>
    ),
  },
  {
    id: 'understanding-bill',
    question: 'Do you need help understanding your bill?',
    content: (
      <p>
        Read billing FAQs{' '}
        <Link href="/help" className="text-blue-600 hover:underline">
          here
        </Link>
      </p>
    ),
  },
  {
    id: 'home-cleaning-services',
    question: 'Do you need information about home cleaning services (carpet, air duct, etc.)?',
    content: (
      <p>
        Call us at{' '}
        <Link href="tel:1-866-527-5547" className="text-blue-600 hover:underline">
          1-866-527-5547
        </Link>{' '}
        or{' '}
        <Link href="/" className="text-blue-600 hover:underline">
          read about our services
        </Link>
      </p>
    ),
  },
  {
    id: 'replacement-parts',
    question: 'Do you need information about replacement parts (Sears PartsDirect)?',
    content: (
      <p>
        Call us at{' '}
        <Link href="tel:1-888-873-3829" className="text-blue-600 hover:underline">
          1-888-873-3829
        </Link>{' '}
        or check out{' '}
        <Link href="/" className="text-blue-600 hover:underline">
          searspartsdirect.com
        </Link>
      </p>
    ),
  },
  {
    id: 'installation-services',
    question: 'Do you need information about installation services?',
    content: (
      <p>
        Call us at{' '}
        <Link href="tel:1-800-447-4402" className="text-blue-600 hover:underline">
          1-800-447-4402
        </Link>
      </p>
    ),
  },
  {
    id: 'heating-cooling-repair',
    question: 'Do you need information about heating & cooling repair?',
    content: (
      <p>
        Call us at{' '}
        <Link href="tel:1-800-504-1897" className="text-blue-600 hover:underline">
          1-800-504-1897
        </Link>{' '}
        or{' '}
        <Link href="/services" className="text-blue-600 hover:underline">
          read about our services
        </Link>
      </p>
    ),
  },
  {
    id: 'warranty-customer-service',
    question: 'Do you need Sears Home Warranty customer service?',
    content: (
      <p>
        Call us at{' '}
        <Link href="tel:1-855-256-2467" className="text-blue-600 hover:underline">
          1-855-256-2467
        </Link>{' '}
        or{' '}
        <Link href="/file-claim" className="text-blue-600 hover:underline">
          place a claim here
        </Link>
      </p>
    ),
  },
  {
    id: 'partnering',
    question: 'Interested in partnering with our 1099 Sears Home Services or Sears Home Improvement team?',
    content: (
      <p>
        <Link href="/contact-form" className="text-blue-600 hover:underline">
          Click the link to submit a contact form
        </Link>
      </p>
    ),
  },
  {
    id: 'report-problem',
    question: 'Report a website problem?',
    content: (
      <>
        <p className="mb-2">
          If you're having a problem using the website Searshomeservices.com, send us feedback by clicking the following link -{' '}
          <Link href="/report-website-issue" className="text-blue-600 hover:underline">
            Report a website issue
          </Link>
        </p>
        <p className="mb-2">Please be as descriptive as possible with your feedback.</p>
        <p>While we won't always reply to the feedback you send, we do review your feedback to improve our website experience for everyone.</p>
      </>
    ),
  },
];

export default function FaqAccordion() {
  const defaultOpenItems = faqData.map(item => item.id);
  return (
    <div className="mt-32 p-6 flex flex-col justify-center">
      <Button className='bg-blue-600 text-white font-semibold p-2 px-4 w-fit cursor-pointer hover:bg-blue-700'>
       <Link href={'/orders'}>  Order Lookup </Link>
      </Button>
      <Accordion type="multiple" defaultValue={defaultOpenItems} className="w-full">
        {faqData.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200">
            <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-4 cursor-pointer">
              <h2 className='text-lg text-blue-900 '>{faq.question}</h2>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-700 pb-4">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

