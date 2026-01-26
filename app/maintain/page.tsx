import React from "react";
import ImageSection from "./components/ImageSection";
import HeroSection from "./components/HeroSection";
import LinkCards from "./components/LinkCards";
import DiscountCards from "./components/DiscountCards";
import MaintenanceSteps from "./components/MaintenanceSteps";
import RatingSection from "@/components/RatingSection";
import { RepairResources } from "@/components/RepairResources";
import LatestResource from "../components/LatestResource";
import GlossaryTerms from "../components/GlossaryTerms";
import ContentGrid from "../components/ContentGrid";

const SERVICE_CARDS = [
  {
    heading: "Upholstery and Furniture Cleaning Services",
    imageUrl:
      "https://www.searshomeservices.com/cftassets/6nfBM5jrO7317gUH0TrSXP/a24b051fedd2194c82363084515e6a04/5f0b50a3305fd7b44e3797f1ea6c5a45?w=1200&q=90",
    linkUrl: "/maintain/upholstery-cleaning",
    description:
      "Let us do your dirty work. We’d like to be mess-free 100% of the time, but life gets in the way of that. Kids, pets and spilled food or drink can turn your beautiful furniture into a disaster. Trust Sears Home Services with all of your furniture cleaning needs. Clean upholstery brightens up the whole room. Sears offers upholstery cleaning services to get ground-in dirt, stubborn stains and unpleasant odors out of your upholstered furniture.",
  },
  {
    heading: "Indoor Air Quality Service",
    imageUrl:
      "https://www.searshomeservices.com/cftassets/2EGo7WA6aLvj0XtvrbtkLI/7e4c26f49c000776fbcdeb8176b7ea7f/ca6177fcb1fe3e5a02ecfda6a4de37d9?w=1200&q=90",
    linkUrl: "/maintain/indoor-air-quality",
    description:
      "Breathe easy while we take care of your air. Improve Indoor Air Quality. Many things can lower the quality of the air in your home—smoke, cleaning product fumes, volatile compounds in building materials and paint, pest control products, pollution from outdoors and more. Some of these air contaminates are minor annoyances that dissipate quickly, but other indoor pollutants present an ongoing health hazard—especially for the young, the elderly, allergy sufferers and people with compromised immune systems.",
  },
  {
    heading: "Air Duct Cleaning",
    imageUrl:
      "https://www.searshomeservices.com/cftassets/3bkW1kpS9BiVgh6ppV8wJ8/719ce51ae70750279a63901f83676468/4a45349eb61c1945e60b8452f78916e4?w=1200&q=90",
    linkUrl: "/maintain/air-duct-cleaning",
    description:
      "Breathe easy while we take care of your air. Sears Air Duct Cleaning can improve your home’s air quality and make your heating and cooling system more efficient, by cleaning your home’s air ducts.",
  },
  {
    heading: "Carpet Cleaning",
    imageUrl:
      "https://www.searshomeservices.com/cftassets/fH4Tl9q0YRVt5ixwRI3uv/57c88f37452dc6c5b5600d77666f52da/f06cf8ba0ec70d7c543f3fe830873aa7?w=1200&q=90",
    linkUrl: "/maintain/carpet-cleaning",
    description:
      "Revitalize your home with our professional carpet cleaning services. Your carpet tells a story about your home life–the muddy feet, the spilled cola, the dog that couldn’t wait. Regular vacuuming and stain-removal products can help, but they simply can’t match the cleaning power of professional carpet cleaning. Sears Carpet Cleaning can help remove the evidence of everyday living, as well as the dirt, allergens and odors buried deep in the carpet.",
  },
  {
    heading: "Tile & Grout Cleaning",
    imageUrl:
      "https://www.searshomeservices.com/cftassets/EytB6bgSJLCMGo0s36OzK/08e7dd215a9be762307327995632e48b/d27fd84e7811440bff91093be5f60249?w=1200&q=90",
    linkUrl: "/maintain/tile-grout-cleaning",
    description:
      "Let us do your dirty work. Whether you want to revive tile and grout that are dirty and discolored or want to protect new or newly cleaned tile and grout from that fate, Sears has the right tile and grout cleaning service for you.",
  },
  {
    heading: "Dryer Vent Cleaning",
    imageUrl:
      "https://www.searshomeservices.com/cftassets/3K6tTuSk42HqsJBj0qk9TH/48acd293a0996fef7a90dd0cc10f3665/9e54ece69b166182422be95fe7c10ab9?w=1200&q=90",
    linkUrl: "/maintain/dryer-vent-cleaning",
    description:
      "Keep your dryer efficient and safe. Professional dryer duct cleaning from Sears can help your dryer work at peak efficiency, which can save money on energy bills. A clean dryer duct also makes your home safer by helping prevent dryer fires—and, for gas dryers, by helping prevent carbon monoxide from escaping from the duct into the home.",
  },
];

const REVIEWS = [
  {
    title: "Great service!",
    rating: 5,
    text: "The technician was very professional and friendly. He fixed my dryer in no time!",
    author: "John Doe",
  },
  {
    title: "Highly recommend!",
    rating: 5,
    text: "The technician was very professional and friendly. He fixed my dryer in no time!",
    author: "John Doe",
  },
  {
    title: "Excellent work!",
    rating: 5,
    text: "The technician was very professional and friendly. He fixed my dryer in no time!",
    author: "John Doe",
  },
  {
    title: "Highly recommend!",
    rating: 3,
    text: "The technician was very professional and friendly. He fixed my dryer in no time!",
    author: "John Doe",
  },
];

const symptomItems = [
  {
    title: "Payne central air not working",
    description:
      "When your Payne central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "ICP central air not working",
    description:
      "When your ICP central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Heil central air not working",
    description:
      "When your Heil central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Carrier central air not working",
    description:
      "When your Carrier central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Comfortmaker central air not working",
    description:
      "When your Comfortmaker central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Ruud central air not working",
    description:
      "When your Ruud central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
];

const MAINTENANCE_STEPS = [
  {
    icon: "https://www.searshomeservices.com/cftassets/5nUSIYvayFgLraaIwW3A2F/258f607fdfc6bf2c881eb8329aefa005/Calendar.svg?w=96&q=90",
    title: "Book",
    description: "Book your appointment now, for a time that works best for you.",
  },
  {
    icon: "https://www.searshomeservices.com/cftassets/5AJwh2PhlyR4LcHY4Gkg6N/b01fc2f68989552c2bd18657b2787ea9/Parts.svg?w=96&q=90",
    title: "Service",
    description: "Our licensed pros will complete the maintenance.",
  },
  {
    icon: "https://www.searshomeservices.com/cftassets/51uhz7Rpe3DkUdtip9OhCU/e1833cf67a8b50cadbdcaddf0bfcd320/Like.svg?w=96&q=90",
    title: "Relax",
    description: "Maintenance work is covered by a 30-day satisfaction guarantee.",
  },
];

export default function Page() {
  return (
    <div>
      <ImageSection />
      <HeroSection />
      <DiscountCards />

      {SERVICE_CARDS.map((card, index) => {
        const swap = index % 2 === 0;

        return (
          <LinkCards
            swap={swap}
            key={card.heading}
            imageSrc={card.imageUrl}
            imageAlt={card.heading}
            title={card.heading}
            description={card.description}
            linkHref={card.linkUrl}
          />
        );
      })}

      <MaintenanceSteps steps={MAINTENANCE_STEPS} />

      <div className="bg-green-50">
        <RatingSection reviews={REVIEWS} />
      </div>

      <div className="mx-auto lg:max-w-[50%] flex flex-col gap-20 py-10">
        <LatestResource />
        <GlossaryTerms />
        <ContentGrid
          sectionTitle="Recent Appliance Symptoms"
          items={symptomItems}
        />
      </div>
    </div>
  );
}
