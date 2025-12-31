# Symptom Data Utility (`symptom-data.ts`)

## Overview

The `symptom-data.ts` file is a critical server-side utility responsible for fetching, parsing, and transforming raw JSON symptom data into structured objects suitable for rendering the dynamic symptom pages. It acts as the bridge between the filesystem-based data storage (`data/brands/...`) and the React UI components.

## Core Responsibilities

1.  **URL Parsing**: Deconstructs the page slug (e.g., `kenmore-washer-not-spinning`) into `brand`, `appliance`, and `issue` components.
2.  **File Resolution**: Locates the correct JSON file within the `data/brands` directory hierarchy, handling various naming conventions and aliasing (e.g., mapping `central-air` to `central`).
3.  **Data Extraction**: Parses the raw JSON content (HTML-like node structure) and extracts specific sections like statistics, FAQs, testimonials, and repair steps into typed interfaces.

## Key Interfaces

### `SymptomPageData`

The main return type representing all data needed to render a full symptom page.

```typescript
interface SymptomPageData {
  meta: { title: string; description: string };
  stats: StatsItem[];
  repairs: RepairItem[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  glossary: GlossaryItem[];
  additionalSymptomsLinks: CrossLinkItem[];
  otherBrandLinks: CrossLinkItem[];
  blogPosts: BlogPostItem[];
  quickRepair?: QuickRepairData;
  rawNodes: SymptomNode[];
}
```

### `SymptomNode`

Represents a single node in the raw JSON data, mirroring an HTML element.

```typescript
interface SymptomNode {
  tag: string; // e.g., 'h2', 'p', 'div'
  content: string; // Inner text content
  attributes: any; // HTML attributes (parsed from string or object)
  order: number;
  children?: SymptomNode[];
}
```

## Main Function: `getSymptomData(slug: string)`

This is the primary entry point.

1.  **Input**: Accepts a URL slug string.
2.  **Process**:
    - Splits the slug to determine directory paths.
    - Checks multiple filename strategies (`{issue}.json`, `{appliance}-{issue}.json`, etc.) to find the matching file.
    - Reads and parses the JSON file.
    - Sorts nodes by `order` and filters out unwanted top-level container nodes.
    - Applies a series of extraction functions to populate the `SymptomPageData` object.
3.  **Output**: Returns `Promise<SymptomPageData | null>`. Returns `null` if the file cannot be found or parsed.

## Data Extraction Strategies

The utility uses heuristic-based extraction to identify content sections within the flat list of nodes:

- **Meta Data**: Finds the `h1` for the title and the first substantial `p` tag (or specific sections) for the description.
- **Stats**: Looks for `span` tags containing specific text patterns (e.g., "% of the time it's the").
- **Repairs**: Scans for `h4` headers containing "Replacement" and captures the subsequent description and link.
- **FAQs**: Identifies the "Frequently Asked Questions" `h2` section and pairs questions (bold `div`s) with answers.
- **Testimonials**: Parsed from the "What our customers say" section, identifying user details, ratings, and review text based on CSS classes.
- **Quick Repair Steps**: Detects the "repair is quick and easy" heading and extracts the subsequent image-heading-paragraph triplets.

## Usage

Import this function in your Next.js Server Components (e.g., `page.tsx`) to fetch data during `generateMetadata` or the initial page render.

```typescript
import { getSymptomData } from '@/app/utils/symptom-data';

export default async function Page({ params }: Props) {
  const data = await getSymptomData(params.slug);
  if (!data) return <NotFound />;
  // ... render page
}
```
