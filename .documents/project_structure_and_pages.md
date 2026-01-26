# Project Structure & Page Guide

## Overview

This document provides a detailed breakdown of the application's page structure within the `app/` directory. It explains the purpose of each section, its dynamic nature, and connected components.

## Page Directory (`app/`)

### 1. Repair Services (`/repair`)

- **Type**: **Dynamic** (Critical)
- **Path**: `app/repair/[repairService]/page.tsx`
- **Description**: The core landing pages for all appliance and system repairs.
- **Functionality**:
  - Dynamically renders content based on the URL slug (e.g., `/repair/kenmore-dryer-repair`).
  - Fetches data from `data/scraped`.
  - Determines layout (Appliance-focused vs. Brand-focused) based on data attributes.
  - **Key Components**: `ApplianceRepairService`, `BrandRepairService`.

### 2. Maintenance (`/maintain`)

- **Type**: **Dynamic**
- **Path**: `app/maintain/[slug]/page.tsx`
- **Description**: Landing pages for preventative maintenance services.
- **Functionality**:
  - Similar to repair, uses `[slug]` to load JSON data.
  - Focuses on "Tune-ups" and "Checks".
- **Key Components**: `SlugHeroSection`, `SlugMaintainCardsGrid`.

### 3. Home Warranty (`/home-warrenty`)

- **Type**: **Static / Complex**
- **Path**: `app/home-warrenty/page.tsx`
- **Description**: Marketing landing page for home warranty plans.
- **Functionality**:
  - Highly styled, section-based layout.
  - Features: Hero Banner, Value Props, Plan Comparisons, Testimonials (Carousel).
- **Key Components**: `HeroBanner`, `PropositionGrid`, `PlanComparisonCards`, `ReviewsCarousel`.

### 4. Blog (`/blog`)

- **Type**: **Dynamic**
- **Path**: `app/blog/repair/[blogPage]/page.tsx`
- **Description**: Content hub for articles and tips.
- **Functionality**:
  - Renders article content from JSON.
  - Supports categories (though currently focused on `/repair` sub-route).

### 5. Symptom Center (`/symptom-center`)

- **Type**: **Static / Interactivity**
- **Path**: `app/symptom-center/page.tsx`
- **Description**: A diagnostic entry point for users to identify appliance issues.
- **Functionality**:
  - Lists common symptoms to guide users to the right repair service.
  - **Sub-pages**: `[brand-appliance-issue]` for deep linking specific problems.
- **Key Components**: `SymptomSection`, `RepairResourcesAndGlossaryTerms`.

### 6. Locations (`/locations`)

- **Type**: **Dynamic (State-based)**
- **Path**: `app/locations/[state]/page.tsx`
- **Description**: Directory of service areas.
- **Functionality**:
  - Routes users to services available in their specific state.

### 7. Core Static Pages

These pages provide standard site information and utilize reusable UI components.

- **About (`/about`)**:

  - `app/about/page.tsx`
  - Company history and "Why Choose Us" content.
  - Components: `Imagesection`, `CardSection`.
- **Contact (`/contact`)**:

  - `app/contact/page.tsx`
  - Customer service phone numbers, chat entry points, and support info.
- **Help (`/help`)**:

  - `app/help/page.tsx`
  - Help center landing page.
  - Components: `ImageSection`, `MainSection` (FAQ navigation).

### 8. Legal & Misc

- **Privacy Policy**: `app/privacy`
- **Terms of Service**: `app/terms`
- **Licenses**: `app/license`
- **Review Guidelines**: `app/ratings-and-review-guidlines`
- **Glossary**: `app/glossary` (Definitions of technical terms).

---

## Data Layer (`data/`)

The application is "Headless-like" but uses local JSON files as the CMS.

- **`scraped/`**: Primary source for Repair and Brand pages.
- **`maintain/`**: Source for Maintenance pages.

## Utility Layer (`utils/`)

- **`repair-service-parser.ts`**: The brain of the dynamic pages. It translates raw JSON text blocks into structured sections for React components.
  - **Parsing Logic**: It iterates through a flat list of `ScrapedNode` items.
  - **Section Detection**: Uses heuristics (checking `<h2>` tag content like "How it Works", "Brands", "FAQs") to slice the flat list into logical blocks.
  - **Data Mapping**:
    - **Hero**: Extracts content before the first `<h2>`.
    - **Brands**: Parsing images and links from the "Brands We Repair" section.
    - **FAQs**: specific logic to pair "Question" buttons with "Answer" panels.
    - **Resources**: Extracts blog posts from `<article>` tags.
  - **Output**: Returns a `RepairServiceData` object used directly by `ApplianceRepairService` and `BrandRepairService`.
