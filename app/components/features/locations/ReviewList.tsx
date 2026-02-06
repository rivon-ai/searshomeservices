"use client"

import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import RatingSummary from './RatingSummary';
import { useParams } from 'next/navigation';
import { calculateRatingSummary, sortReviewsByDate, sortReviewsByRating } from '@/utils/ReviewSummary';

interface Review {
    id: string;
    date: string;
    customerName: string;
    rating: number;
    reviewBody: string;
    response?: string;
}

interface ReviewsListProps {
    reviews: Review[];
    itemsPerPage?: number;
}

export default function ReviewsList({ reviews, itemsPerPage = 10 }: ReviewsListProps) {
    const [sortBy, setSortBy] = useState<'rating' | 'recent'>('rating');
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();

    // Calculate rating summary from original reviews data
    const ratingData = calculateRatingSummary(reviews);

    // Apply sorting using utility functions with tiebreakers
    const sortedReviews = sortBy === 'rating'
        ? sortReviewsByRating(reviews)
        : sortReviewsByDate(reviews);

    // Pagination calculations
    const totalPages = Math.ceil(sortedReviews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReviews = sortedReviews.slice(startIndex, endIndex);

    // Reset to page 1 when sort changes
    const handleSortChange = () => {
        setSortBy(sortBy === 'rating' ? 'recent' : 'rating');
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => handlePageChange(i)}
                            isActive={currentPage === i}
                            className="cursor-pointer"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        onClick={() => handlePageChange(1)}
                        isActive={currentPage === 1}
                        className="cursor-pointer"
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (currentPage > 3) {
                pages.push(
                    <PaginationItem key="ellipsis1">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => handlePageChange(i)}
                            isActive={currentPage === i}
                            className="cursor-pointer"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (currentPage < totalPages - 2) {
                pages.push(
                    <PaginationItem key="ellipsis2">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                        isActive={currentPage === totalPages}
                        className="cursor-pointer"
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 fill-gray-300'
                    }`}
            />
        ));
    };

    return (
        <div className="w-full bg-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className='w-full py-6 text-center'>
                    <h1 className='text-2xl font-bold text-center text-gray-900'>
                        {params.location || 'Customer Reviews'}
                    </h1>
                    <span className='py-6 text-gray-500 text-sm'>Read reviews from customers who used our services at {params.location}</span>
                </div>

                {/* Sort Filter */}
                <div className="my-6 flex items-center justify-center">
                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                    <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5">
                        <span className="text-sm font-medium text-gray-900">
                            {sortBy === 'rating' ? 'Rating (Highest First)' : 'Most Recent'}
                        </span>
                        <button
                            onClick={handleSortChange}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Change sort order"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Reviews List - Takes 2/3 of the space */}
                    <div className="lg:col-span-2 space-y-6">
                        {currentReviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Date */}
                                <div className="text-sm text-gray-600 mb-3">
                                    {review.date}
                                </div>

                                {/* Rating and Customer Info */}
                                <div className="mb-3">
                                    <div className="flex gap-0.5 mb-2" aria-label={`${review.rating} out of 5 stars`}>
                                        {renderStars(review.rating)}
                                        <span className="text-sm text-gray-600 ml-2">Overall rating</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-semibold">
                                                {review.customerName.charAt(0)}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            {review.customerName}
                                        </h3>
                                    </div>
                                </div>

                                {/* Review Body */}
                                <p className="text-sm text-gray-700 leading-relaxed mb-4 italic">
                                    {review.reviewBody}
                                </p>

                                {/* Response Section (if exists) */}
                                {review.response && (
                                    <div className="bg-gray-50 rounded p-4 border-l-2 border-gray-300">
                                        <p className="text-xs text-gray-600 mb-2 italic">
                                            Customer service response - {review.response}
                                        </p>
                                        <p className="text-xs text-gray-500 italic">
                                            Sears Home Services on {review.id}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Review Summary - Takes 1/3 of the space, sticky on desktop */}
                    <div className='lg:col-span-1'>
                        <div className="sticky top-8">
                            <RatingSummary data={ratingData} />
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                        className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                                            }`}
                                    />
                                </PaginationItem>

                                {renderPageNumbers()}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                        className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                                            }`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}