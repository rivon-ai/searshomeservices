# Project Overview

## 1. Project Identity

**Name**: Sears Home Services - Symptom Center & Repair Platform
**Goal**: A high-performance, SEO-optimized web application for home appliance repair services, maintenance, and diagnostics.
**Core Philosophy**: "Data-Driven Architecture." The site uses a file-based CMS approach where adding JSON files automatically generates high-quality landing pages.

## 2. Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (Strict typing for data layers)
- **Styling**: Tailwind CSS + Shadcn UI / Radix UI
- **Data Source**: Local JSON Files (`data/`) acted upon by Node.js filesystem modules.
- **Scraping**: Custom TypeScript scripts (`scripts/`) to populate the data layer.

## 3. Critical Architecture Points

### A. Dynamic "Slug" Routing

The application heavily relies on Next.js dynamic routes to handle thousands of potential pages without code duplication.

- **Repair**: `app/repair/[repairService]` handles distinct appliance and brand repair pages.
- **Maintain**: `app/maintain/[slug]` handles maintenance tune-up pages.
- **Symptom Center**: `app/symptom-center/[brand-appliance-issue]` diagnoses specific problems.

### B. The "JSON-as-Database" Pattern

Instead of a traditional SQL database, the app reads structured JSON files at runtime (or build time).

- **Benefit**: Extremely fast read times, version-controllable content, and easy integration with scraping scripts.
- **Key Files**: `data/brands_appliances_symptoms_structured.json` (The "Master Index" for dropdowns).

### C. Smart Parsers

The `utils/` directory contains sophisticated logic to transform raw JSON data into React components.

- **`repair-service-parser.ts`**: Dynamically builds the proper UI sections (Hero, Features, Reviews) based on the keys present in a JSON file.

## 4. Key Workflows

### Adding a New Page

1. **Scrape/Write**: Create a JSON file in `data/scraped/{Category}`.
2. **Deploy**: Push changes.
3. **Result**: New page covers SEO and user flows automatically.

### Symptom Diagnosis Flow

1. **Selection**: User picks Brand + Appliance on Home/Hero.
2. **Routing**: Directed to `/symptom-center` or specific issue page.
3. **Conversion**: `ReasonStat&ScheduleCard` pushes for an appointment.

## 5. Documentation Map (in `.documents/`)

For deep dives, refer to these specific guides:

- **`project_structure_and_pages.md`**: Guide to every file in `app/`.
