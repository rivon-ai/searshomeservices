import React from "react";

interface PageHeadingProps {
  title: string;
}

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <h2
      className="text-3xl text-left text-blue-950 leading-10 mt-1 font-semibold"
      data-testid="repair_symptom_page_title"
      data-metric-id="repair_symptom_page_title"
    >
      {title}
    </h2>
  );
}
