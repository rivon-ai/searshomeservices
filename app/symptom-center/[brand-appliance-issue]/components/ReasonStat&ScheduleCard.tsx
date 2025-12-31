"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
} from "recharts";
import { Phone, MessageSquare, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { brandAppliances, BrandData, Appliance } from "@/utils/brandAppliances";

// Radial Chart Component
const RadialChart = ({
  value,
  label,
  description,
}: {
  value: number;
  label: string;
  description: string;
}) => {
  const chartData = [{ value, fill: "#3b82f6" }];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-44 h-44">
        <RadialBarChart
          width={176}
          height={176}
          innerRadius="70%"
          outerRadius="90%"
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }: any) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-[#1e40af] text-3xl font-bold"
                      >
                        {value}%
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            fill="#3b82f6"
            className="stroke-transparent stroke-2"
            background={{ fill: "#e5e7eb" }}
          />
        </RadialBarChart>
      </div>

      <div className="text-center max-w-[200px]">
        <p className="text-sm text-gray-600 mb-1">{description}</p>
        <h3 className="text-base font-semibold text-[#1e40af]">{label}</h3>
      </div>
    </div>
  );
};

interface ScheduleCardProps {
  title?: string;
  description?: string;
  phoneNumber?: string;
  // productOptions and brandOptions are deprecated but kept for compatibility if passed
  productOptions?: { label: string; value: string }[];
  brandOptions?: { label: string; value: string }[];
  currentBrand?: string;
  currentAppliance?: string;
  onSchedule?: (data: { product: string; brand: string }) => void;
}

function ScheduleCard({
  title,
  description,
  phoneNumber,
  currentBrand = "",
  currentAppliance = "",
  onSchedule,
}: ScheduleCardProps) {
  // Normalize inputs to match data keys/slugs
  const normalizedBrand =
    brandAppliances.find(
      (b) => b.brand.toLowerCase() === currentBrand.toLowerCase(),
    )?.brand ||
    (brandAppliances[0]?.brand ?? "");

  const [selectedBrand, setSelectedBrand] = useState(normalizedBrand);

  // Helper to get selected brand data
  const currentBrandData = brandAppliances.find(
    (b) => b.brand === selectedBrand,
  );
  const currentBrandApps: Appliance[] = currentBrandData?.appliances || [];

  // Derive initial product selection
  const initialApplianceSlug = currentAppliance
    .toLowerCase()
    .replace(/\s+/g, "-");

  const validInitialApp = currentBrandApps.find(
    (a) =>
      a.appliance.toLowerCase() === initialApplianceSlug ||
      a.appliance.toLowerCase() === currentAppliance.toLowerCase(),
  );

  const defaultApp = validInitialApp
    ? validInitialApp.appliance
    : currentBrandApps[0]?.appliance || "";

  const [selectedProduct, setSelectedProduct] = useState(defaultApp);

  // Update state when props change
  useEffect(() => {
    if (currentBrand) {
      const foundBrand = brandAppliances.find(
        (b) => b.brand.toLowerCase() === currentBrand.toLowerCase(),
      );
      if (foundBrand) setSelectedBrand(foundBrand.brand);
    }
    if (currentAppliance) {
      setSelectedProduct(currentAppliance.toLowerCase());
    }
  }, [currentBrand, currentAppliance]);

  const [productTriggerWidth, setProductTriggerWidth] = useState(0);
  const [brandTriggerWidth, setBrandTriggerWidth] = useState(0);
  const productTriggerRef = useRef<HTMLButtonElement>(null);
  const brandTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (productTriggerRef.current) {
      setProductTriggerWidth(productTriggerRef.current.offsetWidth);
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
            setProductTriggerWidth(entry.borderBoxSize[0].inlineSize);
          } else {
            setProductTriggerWidth(entry.target.clientWidth);
          }
        }
      });
      observer.observe(productTriggerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (brandTriggerRef.current) {
      setBrandTriggerWidth(brandTriggerRef.current.offsetWidth);
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
            setBrandTriggerWidth(entry.borderBoxSize[0].inlineSize);
          } else {
            setBrandTriggerWidth(entry.target.clientWidth);
          }
        }
      });
      observer.observe(brandTriggerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const handleSchedule = () => {
    if (onSchedule) {
      onSchedule({ product: selectedProduct, brand: selectedBrand });
    }
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.08)] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Section */}
          <div className="space-y-6">
            <h2 className="text-[#0f3b6d]  text-xl md:text-2xl font-bold leading-tight">
              {title}
            </h2>

            <p className="text-gray-600 text-base leading-relaxed">
              {description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-700" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-700">Call</span>
                  <a
                    href={`tel:${phoneNumber?.replace(/\D/g, "") ?? ""}`}
                    className="text-[#2563eb] font-semibold hover:underline"
                  >
                    {phoneNumber}
                  </a>
                  <span className="text-gray-700">or schedule online now.</span>
                </div>
              </div>

              <button className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="space-y-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  ref={productTriggerRef}
                  variant="outline"
                  className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 text-gray-700 flex justify-between items-center font-normal hover:bg-gray-50 bg-transparent"
                >
                  <span className="capitalize">
                    {selectedProduct || "Select Appliance"}
                  </span>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white"
                style={{
                  width: productTriggerWidth
                    ? `${productTriggerWidth}px`
                    : "auto",
                }}
              >
                {currentBrandApps.length > 0 ? (
                  currentBrandApps.map((option: Appliance, index: number) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setSelectedProduct(option.appliance)}
                      className="cursor-pointer capitalize"
                    >
                      {option.appliance}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className="cursor-pointer">
                    No appliances found
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  ref={brandTriggerRef}
                  variant="outline"
                  className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 text-gray-700 flex justify-between items-center font-normal hover:bg-gray-50 bg-transparent"
                >
                  <span className="capitalize">
                    {selectedBrand || "Select Brand"}
                  </span>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white"
                style={{
                  width: brandTriggerWidth ? `${brandTriggerWidth}px` : "auto",
                }}
              >
                {brandAppliances.map((brandData: BrandData) => (
                  <DropdownMenuItem
                    key={brandData.brand}
                    onClick={() => {
                      const brandName = brandData.brand;
                      setSelectedBrand(brandName);
                      // Reset product logic
                      const newBrandApps = brandData.appliances || [];
                      const currentProductStillValid = newBrandApps.some(
                        (a) => a.appliance === selectedProduct,
                      );

                      if (!currentProductStillValid) {
                        if (newBrandApps.length > 0) {
                          setSelectedProduct(newBrandApps[0].appliance);
                        } else {
                          setSelectedProduct("");
                        }
                      }
                    }}
                    className="cursor-pointer capitalize"
                  >
                    {brandData.brand}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={handleSchedule}
              className="w-full h-12 bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 font-semibold rounded-md transition-colors shadow-[0_0_12px_rgba(0,0,0,0.08)]"
            >
              Schedule Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Statistics Section Component
interface RadialStatsSectionProps {
  title?: string;
  stats: any[]; // Kept any for now as stat usage inside generic, but can strictly type if struct known
  scheduleTitle?: string;
  description?: string;
  phoneNumber?: string;
  // deprecated props optional
  productOptions?: { label: string; value: string }[];
  brandOptions?: { label: string; value: string }[];
  currentBrand?: string;
  currentAppliance?: string;
  onSchedule?: (data: { product: string; brand: string }) => void;
}

const RadialStatsSection = ({
  title,
  stats,
  scheduleTitle = "Schedule your repair now!",
  description = "We can help! Our service technicians are experts.",
  phoneNumber = "(646) 440-2692",
  // productOptions = [], // unused
  // brandOptions = [], // unused
  currentBrand,
  currentAppliance,
  onSchedule,
}: RadialStatsSectionProps) => {
  return (
    <div className="w-full pt-4 pb-12">
      <div className="">
        {title && (
          <>
            <h2 className="text-2xl font-bold text-blue-950">{title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              {description}
            </p>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat: any, index: number) => (
            <RadialChart
              key={index}
              value={stat.value}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
      <ScheduleCard
        title={scheduleTitle}
        description={description}
        phoneNumber={phoneNumber}
        currentBrand={currentBrand}
        currentAppliance={currentAppliance}
        onSchedule={onSchedule}
      />
    </div>
  );
};

export default RadialStatsSection;
