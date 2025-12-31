# Sears Home Services - Symptom Center

This is a **Next.js** application designed for Sears Home Services, featuring a dynamic **Symptom Center**, appointment scheduling flows, and a comprehensive appliance repair guide.

## Key Features

- **Dynamic Symptom Routing**: A flexible routing system (`/symptom-center/[brand-appliance-issue]`) that dynamically renders pages based on structured JSON data.
- **Structured Data Integration**: Centralized brand and appliance data management using `brands_appliances_symptoms_structured.json` ensures consistency across the app.
- **Smart Scheduling**: Integrated scheduling components (`ReasonStat&ScheduleCard`, `HeroSection`) that use shared data sources to prevent invalid selections.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience on mobile and desktop.

## Project Structure

### Data Layer (`/data`)

The application relies on a file-based data architecture:

- **`brands_appliances_symptoms_structured.json`**: The **Single Source of Truth** for all Brand -> Appliance -> Symptom relationships. This file drives the dropdowns and navigation.
- **`appliance_issues_full.json`**: Contains detailed metadata for specific symptoms (titles, descriptions, slugs).
- **`brandAppliances.ts`**: A robust TypeScript utility (`/utils/brandAppliances.ts`) that types and exports the data for safe consumption by components.
- **Individual Symptom Files** (`data/brands/...`): Specific JSON files for each symptom page, containing rich content like repair steps, images, and explanations.

### Key Components (`/app`)

- **`HeroSection.tsx`**: The main landing component. It features synchronized **Brand** and **Appliance** dropdowns that direct users to the correct scheduling flow.
- **`SymptomSection.tsx`**: Displays lists of common symptoms for a selected appliance. It dynamically filters issues based on the user's selection.
- **`ReasonStat&ScheduleCard.tsx`**: A high-conversion component shown on symptom pages. It offers a "Schedule Now" CTA and displays localized repair statistics.
- **`DynamicSymptomRenderer.tsx`**: The core engine for symptom pages. It parses the deep JSON structure of a symptom file and renders the appropriate UI sections (text, images, steps).

## Development Workflow

### Adding a New Brand or Appliance

1. **Update the Source**: Add the new entry to `data/brands_appliances_symptoms_structured.json`.
   - _Note_: Ensure the structure matches `BrandData` interface: `{ brand: string, appliances: [...] }`.
2. **Verify**: The `brandAppliances.ts` utility will automatically propagate this new data to all dropdowns in `HeroSection`, `SymptomSection`, and `ReasonStat&ScheduleCard`.

### content Management

- **Symptom Pages**: Content for individual symptom pages is managed via JSON files in the `data/brands` directory hierarchy.
  - To update a page, locate the corresponding JSON file (e.g., `data/brands/lg/washer/symptoms/leaking.json`) and edit the fields.
  - The `DynamicSymptomRenderer` handles layout automatically.

### Code Standards

- **Type Safety**: Always import types from `utils/brandAppliances` or shared interfaces. Avoid `any`.
- **Shared Utilities**: Use `brandAppliances` for any brand/appliance lists. Do not hardcode lists.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Utilities & Tools

- **`utils/brandAppliances.ts`**: Exports `brandAppliances` (data) and `BrandData` (type). Use this for all dropdowns.
- **`utils/renderInconsistentSection.tsx`**: A specialized helper for rendering legacy or inconsistent content structures within symptom data.

---

_Built for Sears Home Services_
