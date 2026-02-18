import React from 'react';
import { BsDot } from "react-icons/bs";

// Define a type for the list items for strong typing in TypeScript
type ServiceListItem = string;

// Define the overall data structure
interface ServicesContent {
    introParagraph: string;
    repairServices: {
        title: string;
        paragraph1: string;
        paragraph2: string;
        list: ServiceListItem[];
    };
    homeCleaning: {
        title: string;
        paragraph: string;
        list: ServiceListItem[];
    };
}

// The data object containing all text content
const contentData: ServicesContent = {
    introParagraph:
        "When it comes to your home, the house experts at Sears want you to know you don't have to do it alone. Sears Home Services delivers solutions for your entire home, from appliance care to interior and exterior upgrades for your home. You can trust our experts to help take care of your house so you can enjoy your home.",
    repairServices: {
        title: 'REPAIR SERVICES',
        paragraph1:
            'For generations, people have relied on Sears for their appliance purchases, service, protection and parts. With more than 4 million repairs performed annually and thousands of professional technicians employed nationwide, Sears is the #1 appliance repair service in the country, delivering guaranteed quality and workmanship.',
        paragraph2:
            'To ensure we have the right parts to fix your appliance, we use technology to diagnose problems before we arrive at your home. Whether you purchased your appliance at Sears or not, a Sears Appliance Expert can help. We provide repair and maintenance services for the following items, most major brands and models:',
        list: [
            'Refrigerator',
            'Freezer',
            'Oven and cooktop',
            'Dishwasher',
            'Washer',
            'Dryer',
            'Riding mower',
            'Snow blower',
            'Fitness equipment',
            'Heating and cooling systems',
        ],
    },
    homeCleaning: {
        title: 'HOME CLEANING AND REPAIRS',
        paragraph:
            'Sears Home Services has a variety of cleaning services to keep your house fresh, bright and healthy:',
        list: [
            'Carpet cleaning, stain removal and stain protection',
            'Upholstery cleaning, stain removal and stain protection',
            'Air duct cleaning',
            'Dryer vent cleaning',
            'Tile and grout cleaning',
            'Air filtration and cleaning systems',
        ],
    },
};

const SearsServicesTextComponent: React.FC = () => {
    const ListSection: React.FC<{ items: ServiceListItem[] }> = ({ items }) => (
        <ul typeof='' className="pl-0">
            {items.map((item, index) => (
                <li key={index} className="mb-2 text-gray-500 flex items-center gap-2">
                    <BsDot /> {item}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="p-5 font-sans text-sm leading-relaxed text-gray-800">
            <p className="mb-5 text-justify">
                {contentData.introParagraph}
            </p>

            {/* Repair Services Section */}
            <h3 className="mt-6 mb-3 font-bold text-gray-700">
                {contentData.repairServices.title}
            </h3>
            <p className="mb-3 text-justify text-gray-500">
                {contentData.repairServices.paragraph1}
            </p>
            <p className="mb-3 text-justify text-gray-500">
                {contentData.repairServices.paragraph2}
            </p>
            <ListSection items={contentData.repairServices.list} />

            {/* Home Cleaning Section */}
            <h3 className="mt-6 mb-3 text-sm font-bold text-gray-700">
                {contentData.homeCleaning.title}
            </h3>
            <p className="mb-3 text-justify text-gray-700">
                {contentData.homeCleaning.paragraph}
            </p>
            <ListSection items={contentData.homeCleaning.list} />
        </div>
    );
};

export default SearsServicesTextComponent;