"use client"


import React from 'react';
import { Star } from 'lucide-react';

interface RatingData {
  averageRating: number;
  totalReviews: number;
  starDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface RatingSummaryProps {
  data: RatingData;
}

export default function RatingSummary({ data }: RatingSummaryProps) {
  const { averageRating, totalReviews, starDistribution } = data;
  
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => {
      const isHalfStar = i === Math.floor(rating) && rating % 1 !== 0;
      const isFilled = i < Math.floor(rating);
      
      return (
        <Star
          key={i}
          className={`w-5 h-5 ${
            isFilled
              ? 'text-yellow-400 fill-yellow-400'
              : isHalfStar
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 fill-gray-300'
          }`}
        />
      );
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6">
      {/* Star Distribution Section - Top */}
      <div className="space-y-2 mb-8 pb-8 border-b border-gray-200">
        {[5, 4, 3, 2, 1].map((star) => {
          const percentage = starDistribution[star as keyof typeof starDistribution];
          return (
            <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-blue-900 font-medium">
                <Star className="w-4 h-4 text-blue-900 fill-blue-900" />
                <span>{star}</span>
              </div>
              
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden max-w-[200px]">
                <div
                  className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${star} star: ${percentage}%`}
                />
              </div>
              
              <div className="text-sm text-gray-700 font-medium ml-auto">
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Reviews Section */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          Total reviews
        </h3>
        <div className="text-5xl font-bold text-blue-900">
          {totalReviews}
        </div>
      </div>

      {/* Average Rating Section - Bottom */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          Average Rating
        </h3>
        <div className="flex items-center gap-3">
          <div className="text-5xl font-bold text-blue-900">
            {averageRating.toFixed(1)}<span className="text-3xl text-gray-600">/5</span>
          </div>
          <div className="flex gap-1" aria-label={`Average rating: ${averageRating} out of 5 stars`}>
            {renderStars(averageRating)}
          </div>
        </div>
      </div>
    </div>
  );
}
