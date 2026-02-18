// reviewUtils.ts

interface Review {
  id: string;
  date: string;
  customerName: string;
  rating: number;
  reviewBody: string;
  response?: string;
}

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


export function calculateRatingSummary(reviews: Review[]): RatingData {
  // Handle empty reviews array
  if (!reviews || reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      starDistribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
    };
  }

  const totalReviews = reviews.length;

  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / totalReviews;

  // Calculate star distribution counts
  const starCounts = {
    5: reviews.filter(review => review.rating === 5).length,
    4: reviews.filter(review => review.rating === 4).length,
    3: reviews.filter(review => review.rating === 3).length,
    2: reviews.filter(review => review.rating === 2).length,
    1: reviews.filter(review => review.rating === 1).length,
  };

  // Convert counts to percentages (rounded to nearest integer)
  const starDistribution = {
    5: Math.round((starCounts[5] / totalReviews) * 100),
    4: Math.round((starCounts[4] / totalReviews) * 100),
    3: Math.round((starCounts[3] / totalReviews) * 100),
    2: Math.round((starCounts[2] / totalReviews) * 100),
    1: Math.round((starCounts[1] / totalReviews) * 100),
  };

  return {
    averageRating: Number(averageRating.toFixed(2)), // Round to 2 decimal places
    totalReviews,
    starDistribution,
  };
}


export function getReviewCountByRating(reviews: Review[], rating: number): number {
  return reviews.filter(review => review.rating === rating).length;
}


export function getReviewPercentageByRating(reviews: Review[], rating: number): number {
  if (!reviews || reviews.length === 0) return 0;
  const count = getReviewCountByRating(reviews, rating);
  return Math.round((count / reviews.length) * 100);
}


export function sortReviewsByRating(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => {
    // First, sort by rating (highest first)
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    // If ratings are equal, sort by date (most recent first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}


export function sortReviewsByDate(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    // First, sort by date (most recent first)
    if (dateB !== dateA) {
      return dateB - dateA;
    }
    // If dates are equal, sort by rating (highest first)
    return b.rating - a.rating;
  });
}


export function filterReviewsByMinRating(reviews: Review[], minRating: number): Review[] {
  return reviews.filter(review => review.rating >= minRating);
}


export function getReviewsWithResponses(reviews: Review[]): Review[] {
  return reviews.filter(review => review.response);
}


export function getResponseRate(reviews: Review[]): number {
  if (!reviews || reviews.length === 0) return 0;
  const reviewsWithResponses = getReviewsWithResponses(reviews);
  return Math.round((reviewsWithResponses.length / reviews.length) * 100);
}

// Example usage:
/*
import { calculateRatingSummary } from './reviewUtils';
import RatingSummary from './RatingSummary';

const reviews: Review[] = [...]; // your reviews data

const ratingSummaryData = calculateRatingSummary(reviews);

<RatingSummary data={ratingSummaryData} />
*/