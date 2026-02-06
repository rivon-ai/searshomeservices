"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { glossaryService, GlossaryData } from "@/lib/glossaryService";
import { TermObject } from "@/app/utils/glossaryData";

export function useGlossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TermObject[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Grouped terms for the main list
  const groupedTerms = useMemo(() => glossaryService.getGroupedTerms(), []);
  
  // Recent terms for the hero
  const recentTerms = useMemo(() => glossaryService.getRecentTerms(), []);

  // Debounced search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const results = glossaryService.searchTerms(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    groupedTerms,
    recentTerms,
    clearSearch
  };
}
