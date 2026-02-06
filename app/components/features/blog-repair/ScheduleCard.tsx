"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const products = [
  { value: "refrigerator", label: "Refrigerator" },
  { value: "washer", label: "Washer" },
  { value: "dryer", label: "Dryer" },
  { value: "dishwasher", label: "Dishwasher" },
  { value: "oven", label: "Oven / Range" },
];

const brands = [
  { value: "kenmore", label: "Kenmore" },
  { value: "whirlpool", label: "Whirlpool" },
  { value: "ge", label: "GE" },
  { value: "lg", label: "LG" },
  { value: "samsung", label: "Samsung" },
];

export default function ScheduleCard() {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-xl border border-gray-100 p-8",
        "lg:sticky lg:top-[120px] lg:z-10",
        "flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
      )}
    >
      <div className="space-y-2 text-center lg:text-left">
        <h3 className="text-2xl font-extrabold text-[#002855] tracking-tight">
          Schedule your repair
        </h3>
        <p className="text-sm text-gray-500 font-medium">
          Same-day service available in most areas.
        </p>
      </div>

      <div className="space-y-6">
        {/* Product Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
            Product
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between h-14 px-4 bg-gray-50 border-gray-200 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-md transition-all",
                  !selectedProduct && "text-gray-400 font-normal"
                )}
              >
                {selectedProduct
                  ? products.find((p) => p.value === selectedProduct)?.label
                  : "Select a product"}
                <ChevronDown className="ml-2 h-5 w-5 shrink-0 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) p-1 rounded-xl shadow-2xl border-gray-100 z-100">
              <DropdownMenuRadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
                {products.map((product) => (
                  <DropdownMenuRadioItem
                    key={product.value}
                    value={product.value}
                    className="p-3 rounded-lg text-gray-700 font-medium focus:bg-blue-50 focus:text-blue-700 transition-colors"
                  >
                    {product.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Brand Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
            Brand
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between h-14 px-4 bg-gray-50 border-gray-200 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-md transition-all",
                  !selectedBrand && "text-gray-400 font-normal"
                )}
              >
                {selectedBrand
                  ? brands.find((b) => b.value === selectedBrand)?.label
                  : "Select a brand"}
                <ChevronDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) p-1 rounded-xl shadow-2xl border-gray-100 z-100">
              <DropdownMenuRadioGroup value={selectedBrand} onValueChange={setSelectedBrand}>
                {brands.map((brand) => (
                  <DropdownMenuRadioItem
                    key={brand.value}
                    value={brand.value}
                    className="p-3 rounded-lg text-gray-700 font-medium focus:bg-blue-50 focus:text-blue-700 transition-colors"
                  >
                    {brand.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Button className="w-full h-14 text-white bg-blue-600 hover:bg-blue-700 font-extrabold rounded-xl text-md transition-all shadow-lg hover:shadow-blue-200 mt-2 active:scale-[0.98]">
        Schedule Now
      </Button>

      <div className="text-center">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Trusted by over 1M customers annually
        </span>
      </div>
    </div>
  );
}
