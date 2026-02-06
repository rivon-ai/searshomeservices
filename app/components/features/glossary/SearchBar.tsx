"use client";

import React from "react";
import { Loader2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { TermObject } from "@/app/utils/glossaryData";
import { cn } from "@/lib/utils";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxInput,
} from "@/components/ui/combobox";

interface SearchBarProps {
    query: string;
    onQueryChange: (query: string) => void;
    results: TermObject[];
    isSearching: boolean;
    onClear: () => void;
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    query,
    onQueryChange,
    results,
    isSearching,
    onClear,
    className,
}) => {
    const router = useRouter();
    const hasResults = results.length > 0;

    return (
        <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
            <Combobox
                open={query.length > 0}
                onValueChange={(val) => {
                    if (val) {
                        router.push(`/glossary/${val}`);
                        onClear();
                    }
                }}
            >
                <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none z-20">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>

                    <ComboboxInput
                        placeholder="Search for repair terms, parts, or concepts..."
                        value={query}
                        onInput={(e) => onQueryChange((e.target as HTMLInputElement).value)}
                        className="w-full bg-white text-gray-500 pl-4"
                        showTrigger={false}
                    >
                    </ComboboxInput>

                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2 z-20">
                        {isSearching && <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />}
                        {query && (
                            <button
                                onClick={onClear}
                                className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                type="button"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                <ComboboxContent
                    className="mt-2"
                    align="start"
                    sideOffset={4}
                >
                    <ComboboxList className="p-0 border-none shadow-none bg-transparent">
                        {results.map((result) => (
                            <ComboboxItem
                                key={result.slug}
                                value={result.slug}
                                className="flex flex-col items-start p-4 rounded-xl hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 data-highlighted:bg-blue-50"
                            >
                                <span className="font-extrabold text-[#002855] uppercase tracking-wider text-xs mb-1">
                                    {result.term}
                                </span>
                                <span className="text-sm text-gray-500 line-clamp-1">
                                    {result.definition}
                                </span>
                            </ComboboxItem>
                        ))}

                        <ComboboxEmpty className="py-8 text-center text-gray-500 font-medium flex flex-col items-center justify-center">
                            <span>No terms discovered for</span>
                            <span className="text-[#002855] font-bold mt-1">"{query}"</span>
                        </ComboboxEmpty>

                        {hasResults && (
                            <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                                    Press Enter to explore all results
                                </p>
                            </div>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    );
};
