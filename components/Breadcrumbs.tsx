"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/dist/client/components/navigation";

interface DynamicBreadcrumbProps {
  params: Record<string, string | undefined>;
}

const Breadcrumbs= () => { 

  const params = useParams();

  console.log("Params in Breadcrumbs:", params);

  const breadcrumbItems: Array<{ label: string; href: string }> = [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
  ];
  
  if (params.state) {
    const state = Array.isArray(params.state) ? params.state[0] : params.state;
    breadcrumbItems.push({ label: state, href: `/locations/${state}` });
  }

  if (params.city) {

    const state = Array.isArray(params.state) ? params.state[0] : params.state;
    const city = Array.isArray(params.city) ? params.city[0] : params.city;

    breadcrumbItems.push({
      label: city,
      href: `/locations/${state}/${city}`,
    });
  }

  if (params["sears-appliance-repair"]) {
    const state = Array.isArray(params.state) ? params.state[0] : params.state;
    const city = Array.isArray(params.city) ? params.city[0] : params.city;
    breadcrumbItems.push({
        label: "Sears Appliance Repair",
        href: `/locations/${state}/${city}/sears-appliance-repair`,
      });
  }
  

  return (
    <Breadcrumb className="w-full max-w-[75%] mx-auto mt-4 mb-6">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
