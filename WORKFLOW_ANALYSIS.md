# Workflow Analysis: `utils/`, `hooks/`, and `lib/` Folders

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Dependency Graph](#dependency-graph)
- [1. `lib/` - Service Layer](#1-lib---service-layer)
- [2. `hooks/` - State Management Layer](#2-hooks---state-management-layer)
- [3. `utils/` - Utility & Data Layer](#3-utils---utility--data-layer)
- [Inter-Folder Workflow Flows](#inter-folder-workflow-flows)
- [File-by-File Breakdown](#file-by-file-breakdown)

---

## Architecture Overview

The project follows a **three-layer architecture** where each folder has a clear responsibility:

```
 UI Components (app/, components/)
        |
        v
   hooks/          <-- State management, UI logic, form handling
        |
        v
   lib/            <-- Business logic, API calls, data persistence
        |
        v
   utils/          <-- Pure utilities, data constants, parsers, scrapers
```

| Layer | Folder | Role |
|-------|--------|------|
| **State Management** | `hooks/` | React hooks that manage component state, form validation, and user interactions |
| **Service Layer** | `lib/` | Server-side services and business logic (auth, appointments, glossary, validation) |
| **Utility Layer** | `utils/` | Pure functions, static data, data parsers, and build-time scripts |

---

## Dependency Graph

```
hooks/useAuth.ts ──────────────> lib/auth-service.ts
                                     └── (validations for auth embedded)

hooks/useGlossary.ts ──────────> utils/fetchers/glossary-data.ts
                                     └──> (API Backend)

hooks/useOrderDetails.ts ──────> lib/appointmentService.ts

hooks/useOrderLookup.ts ───────> lib/appointmentService.ts
                            └──> lib/validations.ts

hooks/useScheduleWizard.ts ────> lib/appointmentService.ts
                            └──> lib/validations.ts
                            └──> utils/data/brandAppliances.ts

utils/fetchers/maintain-data.ts ──> (external JSON data server)
utils/fetchers/repair-data.ts ────> (external JSON data server)
utils/fetchers/symptom-data.ts ───> (external JSON data server)

utils/cn.ts ───────────────────> clsx + tailwind-merge (external)
utils/IconImports.ts ──────────> public/symptom-center/*.svg
utils/data/brandAppliances.ts ─> data/brands_appliances_symptoms_structured.json
utils/data/glossaryData.ts ────> (interfaces/types)
utils/data/ReviewSummary.ts ───> (self-contained pure functions)

utils/brand-appliance-parser.ts ──> (standalone parser, no deps)
utils/repair-service-parser.ts ──> (standalone parser, no deps)
utils/extract-brand-appliance-urls.ts ──> (build-time script, fs/path)
utils/scrape-brand-appliance-pages.ts ──> (build-time script, puppeteer)
```

---

## 1. `lib/` - Service Layer

The `lib/` folder contains **server-side business logic** and acts as the bridge between hooks and data persistence.

### `lib/auth-service.ts`
- **Purpose**: Authentication service with sign-in, sign-up, and forgot-password flows
- **Directive**: `"use server"` is NOT present; runs client-side with mock delays
- **Exports**:
  - `authService` object with `signIn()`, `signUp()`, `forgotPassword()` methods
  - `validations` object with `validateEmail()`, `validatePassword()`, `validateUsername()`
  - `AuthResponse` interface
- **Current State**: Mock implementation using `setTimeout` delays (no real backend)
- **Consumed by**: `hooks/useAuth.ts`

### `lib/appointmentService.ts`
- **Purpose**: Full CRUD operations for appointment management
- **Directive**: `"use server"` - runs as Next.js Server Actions
- **Storage**: JSON file at `data/appointments.json` (file-based persistence)
- **Exports**:
  - `getAppointments()` - Read all appointments
  - `getAppointmentById(id)` - Find single appointment
  - `createAppointment(data)` - Create with UUID generation
  - `updateAppointment(id, updates)` - Partial update
  - `deleteAppointment(id)` - Remove by ID
  - `getAppointmentsByPhoneEmail(phone, email?)` - Search with normalized phone matching
  - `validateOrderId(id)` - Check if order exists
  - `Appointment` interface
- **Consumed by**: `hooks/useOrderDetails.ts`, `hooks/useOrderLookup.ts`, `hooks/useScheduleWizard.ts`

### `lib/validations.ts`
- **Purpose**: Centralized form validation rules for order/scheduling forms
- **Exports**: `validations` object with validators:
  - `validatePhone()` - 10-15 digit check
  - `validateEmail(email, required?)` - Regex + optional required flag
  - `validateOrderNumber()` - Min 5 chars
  - `validateName(name, fieldLabel)` - Min 2 chars with dynamic label
  - `validateZipCode()` - Exactly 5 digits
  - `validateAddress()` - Min 5 chars
  - `validateCity()` - Min 2 chars
  - `validateState()` - Non-empty check
- **Consumed by**: `hooks/useOrderLookup.ts`, `hooks/useScheduleWizard.ts`

> **Note**: There are **two separate validation files** - `lib/auth-service.ts` has its own `validations` export for auth-specific fields, while `lib/validations.ts` handles order/scheduling validations. These are independent and do not share logic.

---

## 2. `hooks/` - State Management Layer

All hooks are **client-side** (`"use client"`) React hooks that encapsulate stateful logic for UI components.

### `hooks/useAuth.ts`
- **Purpose**: Complete authentication flow management
- **Dependencies**: `lib/auth-service.ts` (authService, validations, AuthResponse)
- **Workflow**:
  1. Component calls `handleSignIn(email, password)`, `handleSignUp(data)`, or `handleForgotPassword(email)`
  2. Hook validates input using `validations` from auth-service
  3. If validation fails → sets `errors` state, returns `false`
  4. If validation passes → calls `authService.*` method
  5. On success → redirects via `router.push("/")`
  6. On failure → sets `serverError` state
- **State Managed**: `isLoading`, `serverError`, `successMessage`, `errors`
- **Returns**: State + handlers + `clearErrors()`, `updateFieldError()`

### `hooks/useGlossary.ts`
- **Purpose**: Glossary page state with API fetching and debounced search
- **Dependencies**: `utils/fetchers/glossary-data.ts`, `utils/data/glossaryData.ts`
- **Workflow**:
  1. On mount: fetch all glossary terms using `getAllGlossaryTerms()` from API
  2. Computes `groupedTerms` and `recentTerms` from fetched API data via `useMemo`
  3. User types in search → `setSearchQuery` triggers `useEffect`
  4. After 300ms debounce → filters loaded API terms locally
  5. Results stored in `searchResults` state
- **State Managed**: `searchQuery`, `searchResults`, `isSearching`, `allTerms`, `isLoading`
- **Returns**: State + `setSearchQuery`, `clearSearch()`, `isLoading`, `groupedTerms`, `recentTerms`

### `hooks/useOrderDetails.ts`
- **Purpose**: Edit flow for an existing appointment
- **Dependencies**: `lib/appointmentService.ts` (updateAppointment)
- **Workflow**:
  1. Initialized with `appointmentId`, `initialEmail`, `initialPhone`, `initialInstructions`
  2. `openEdit()` → populates edit fields from initial values, opens modal
  3. User modifies fields → local state updates
  4. `handleUpdate()` → calls `updateAppointment(id, data)` server action
  5. On success → sets `isEditSuccess`, calls `router.refresh()` to reload server data
  6. `handleCloseEdit()` → closes modal with 300ms delay for animation
- **State Managed**: `isEditOpen`, `isEditSuccess`, `isLoading`, edit field values, `errors`

### `hooks/useOrderLookup.ts`
- **Purpose**: Order search with dual lookup methods + pagination
- **Dependencies**: `lib/appointmentService.ts`, `lib/validations.ts`
- **Workflow** (two search paths):
  - **Phone/Email Search**:
    1. Validates phone + email using `validations`
    2. Calls `getAppointmentsByPhoneEmail(phone, email)`
    3. Stores results in `orders`, resets pagination to page 1
  - **Order Number Search**:
    1. Validates order number format
    2. Calls `validateOrderId(orderNumber)`
    3. If found → redirects to `/order/{id}` via `router.push`
- **Pagination**: Client-side with 5 orders per page using `useMemo`
- **State Managed**: `orders`, `isLoading`, `error`, `hasSearched`, form fields, `currentPage`, `totalPages`, `paginatedOrders`

### `hooks/useScheduleWizard.ts`
- **Purpose**: Multi-step appointment booking wizard (6 steps)
- **Dependencies**: `lib/appointmentService.ts`, `lib/validations.ts`, `utils/data/brandAppliances.ts`
- **Workflow**:
  1. **Step 1** (Appliance & Brand Selection): Selects appliance + brand. Pre-populates from URL search params (`?appliance=X&brand=Y`)
  2. **Step 2** (Zip Code): Validates zip code (5 digits)
  3. **Step 3** (Date Selection): Picks service date
  4. **Step 4** (Info/Review): Information display step (always valid)
  5. **Step 5** (Contact Details): Full form with name, email, phone, address fields. Uses `lib/validations.ts` for all field validations
  6. **Step 6** (Confirmation): Created after successful `createAppointment()` server action call
- **Step Navigation Logic**:
  - `handleNext()` → validates current step, advances or submits on step 5
  - `handleBack()` → goes to previous step
  - `handleStepClick(n)` → allows jumping to any completed step
  - `getMaxReachableStep()` → determines furthest accessible step based on validation
- **State Managed**: `currentStep`, `bookingData`, `createdAppointmentId`, `isLoading`, `error`, `fieldErrors`

---

## 3. `utils/` - Utility & Data Layer

### Static Data Files

#### `utils/data/glossaryData.ts`
- **Purpose**: Glossary dictionary interfaces and types. Static array generation removed after API integration.
- **Exports**:
  - `TermObject` interface
  - Empty `GLOSSARY_TERMS` array
- **Consumed by**: `hooks/useGlossary.ts`, `utils/fetchers/glossary-data.ts`

#### `utils/data/brandAppliances.ts`
- **Purpose**: Typed wrapper around brand-appliance-symptoms JSON data
- **Source**: `data/brands_appliances_symptoms_structured.json`
- **Exports**: `brandAppliances: BrandData[]`, `Appliance` interface, `BrandData` interface
- **Structure**: `[{ brand: "Kenmore", appliances: [{ appliance: "Dishwasher", symptoms: [...] }] }]`
- **Consumed by**: `hooks/useScheduleWizard.ts`

#### `utils/data/ReviewSummary.ts`
- **Purpose**: Pure utility functions for customer review calculations
- **Exports**:
  - `calculateRatingSummary(reviews)` - Computes average, total, star distribution percentages
  - `getReviewCountByRating(reviews, rating)` - Count by star rating
  - `getReviewPercentageByRating(reviews, rating)` - Percentage by star rating
  - `sortReviewsByRating(reviews)` - Sort highest-first, then by date
  - `sortReviewsByDate(reviews)` - Sort newest-first, then by rating
  - `filterReviewsByMinRating(reviews, minRating)` - Filter minimum stars
  - `getReviewsWithResponses(reviews)` - Filter reviewed with responses
  - `getResponseRate(reviews)` - Percentage with responses
- **Consumed by**: Review display components

### Pure Utility

#### `utils/cn.ts`
- **Purpose**: Tailwind CSS class name merger (standard pattern)
- **Implementation**: `twMerge(clsx(inputs))` - combines class names with conflict resolution
- **Consumed by**: All components using conditional CSS classes

#### `utils/IconImports.ts`
- **Purpose**: Centralized SVG brand logo imports (38 brands)
- **Exports**: `brandIcons: Record<string, any>` mapping brand name to SVG component
- **Brands**: Payne, Carrier, Kenmore, Rheem, Lennox, Trane, Whirlpool, LG, Samsung, GE, Maytag, etc.
- **Consumed by**: Symptom center brand display components

### Data Parsers (Runtime)

#### `utils/brand-appliance-parser.ts`
- **Purpose**: Parses scraped HTML nodes into structured brand-appliance repair page data
- **Input**: `ScrapedNode[]` (flat list of HTML elements with tag, content, attributes, order)
- **Output**: `BrandApplianceData` with sections:
  - `heroData` (heading, description, imageUrl)
  - `randomContent` (generic content between first H2 and first styled section)
  - `faqData` (question-answer pairs from headlessui accordions)
  - `howItWorksData` (title + content nodes)
  - `repairResourcesData` (blog post cards)
  - `glossaryTermsData` (term definitions)
  - `commonApplianceSymptomsData` (symptom links)
- **Parsing Strategy**: Section identification by H2 heading text patterns, boundary detection by next H2

#### `utils/repair-service-parser.ts`
- **Purpose**: Parses scraped HTML nodes into repair service page structure
- **Input**: `ScrapedNode[]`
- **Output**: `RepairServiceData` with sections:
  - `heroData`, `randomContent`
  - `applianceBrandsData` (brand logos with images)
  - `brandSuggestionsData` (brand selection cards)
  - `commonBrandSymptomsData` / `commonApplianceSymptomsData`
  - `repairResourcesData` (blog posts)
  - `faqData` (FAQ accordions)
  - `brokenAppliancesData` (appliance cards)
  - `expertsData` (expert profiles)
- **Parsing Strategy**: Same pattern-based H2 section detection, with more section types

### Data Fetchers (Runtime)

#### `utils/fetchers/glossary-data.ts`
- **Purpose**: Fetches glossary term data.
- **Data Source**: `NEXT_PUBLIC_API_URL` env var (default: `http://localhost:5000/api/v1`).
- **Endpoints**: `/glossary`, `/glossary/letter/:letter`, `/glossary/:slug`.
- **Exports**: `getAllGlossaryTerms()`, `getGlossaryTermsByLetter(letter)`, `getGlossaryTermBySlug(slug)`.
- **Consumed by**: `hooks/useGlossary.ts`

#### `utils/fetchers/maintain-data.ts`
- **Purpose**: Fetches maintenance page data from external JSON data server
- **Data Source**: `NEXT_PUBLIC_DATA_URL` env var (default: `http://localhost:3001`)
- **Fetch Strategy**: Tries 3 URL candidates in order:
  1. `/{slug}`
  2. `/maintain/{slug}`
  3. `/data/maintain/summarized/{slug}.json`
- **Mapper Functions** (14 total): Transforms raw JSON into component prop interfaces:
  - `mapHeroProps()` → `ImageSectionProps`
  - `mapServiceGridProps()` → `SlugServiceCardGridProps`
  - `mapBrandLogosProps()` → `SlugSupportedBrandCardsProps`
  - `mapBookingCardProps()` → `SlugBookingCardProps`
  - `mapRecentSymptomsProps()` → `SlugMaintainCardsGridProps`
  - `mapLatestResourcesProps()` → `SlugMaintainCardsGridProps`
  - `mapMaintenanceStepsProps()` → `ComponentMaintenanceStepsProps`
  - `mapDealCardsProps()` → `DiscountCardsProps`
  - `mapCleaningSectionProps()` → `CleaningBeforeAfterSectionProps`
  - `mapRatingSectionProps()` → Review props
  - `mapRecentSymptomsToContentGridProps()` → `ContentGridProps`
  - `mapLatestResourcesToRepairResourcesProps()` → `RepairResourcesProps`
- **Consumed by**: `app/maintain/` route pages

#### `utils/fetchers/repair-data.ts`
- **Purpose**: Fetches repair service and brand-appliance repair data
- **Data Source**: Same `NEXT_PUBLIC_DATA_URL`
- **Exports**:
  - `getRepairServiceData(slug)` - Tries 3 URL patterns with slug stylization (e.g., `cooktop-repair-service` → `Cooktop`)
  - `getBrandApplianceRepairData(brand, appliance)` - Tries 2 URL patterns for brand/appliance combinations
- **Consumed by**: `app/repair/` route pages

#### `utils/fetchers/symptom-data.ts`
- **Purpose**: Fetches and parses symptom page data (most complex fetcher)
- **Data Source**: Same `NEXT_PUBLIC_DATA_URL`
- **Slug Parsing**: `kenmore-dishwasher-not-starting` → brand=`kenmore`, appliance=`dishwasher`, issue=`not-starting`
- **Appliance Directory Mapping**: `furnace` → `gas`, `central-air` → `central`
- **Processing Pipeline**:
  1. Fetch JSON from 3 URL candidates
  2. Extract `full_content` array from response
  3. Sort nodes by `order`
  4. Trim: start at first H1, end at last span before second-to-last H2
  5. Parse attributes from Python-format strings to JSON objects
  6. Extract structured sections via helper functions:
     - `extractMeta()` - H1 title + first paragraph description
     - `extractStats()` - Percentage statistics from span patterns
     - `extractRepairs()` - H4 "Replacement" items with descriptions/links
     - `extractFaqs()` - FAQ accordion question/answer pairs
     - `extractTestimonials()` - Customer reviews from styled paragraphs
     - `extractGlossary()` - Term/definition pairs under glossary heading
     - `extractCrossLinks()` - Additional symptom links
     - `extractOtherBrandsLinks()` - Other brand symptom links
     - `extractBlogPosts()` - Blog post cards
     - `extractQuickRepairSteps()` - "Quick and Easy" step cards
- **Exports**: `getSymptomData(slug): SymptomPageData | null` + all related interfaces
- **Consumed by**: `app/symptom/` route pages

### Build-Time Scripts

#### `utils/extract-brand-appliance-urls.ts`
- **Purpose**: Node.js script that extracts brand-appliance URLs from scraped data files
- **Input**: `data/brand-names-repairs.json` (brand name list) + `data/scraped/{brand}/{brand}.json` (scraped pages)
- **Output**: `data/brand-appliance-urls.json` (brand → appliance URL mapping)
- **Workflow**:
  1. Read brand names list
  2. For each brand, open its scraped JSON file
  3. Find H2/H3 heading "Which [Brand] appliance needs repair?"
  4. Extract all `/repair/` and `/scheduler/` links from that section
  5. Construct clean URLs: `searshomeservices.com/repair/{brand}/{appliance}`
  6. Write grouped results to output JSON
- **Run**: Standalone `ts-node` script (not imported by app code)

#### `utils/scrape-brand-appliance-pages.ts`
- **Purpose**: Puppeteer-based web scraper for brand-appliance repair pages
- **Input**: `data/brand-appliance-urls.json` (output from extract script above)
- **Output**: `data/repairServiceForBrandsAppliances/{brand}/{appliance}.json`
- **Workflow**:
  1. Read URL list
  2. Launch headless Chromium
  3. For each brand/appliance URL (5 concurrent):
     - Navigate to page, wait for Cloudflare challenge
     - Extract all DOM elements (tag, content, attributes, order)
     - Save as JSON
  4. Skip already-scraped pages
  5. Log failures to `scrape_failures.txt`
- **Run**: Standalone `ts-node` script (not imported by app code)

---

## Inter-Folder Workflow Flows

### Flow 1: User Authentication
```
SignInPage / SignUpPage (UI)
    └─> hooks/useAuth.ts
            ├─> lib/auth-service.ts :: validations.validateEmail/Password/Username()
            └─> lib/auth-service.ts :: authService.signIn/signUp/forgotPassword()
                    └─> (mock delay, returns success/failure)
            └─> router.push("/") on success
```

### Flow 2: Schedule Appointment (Booking Wizard)
```
SchedulerPage (UI)
    └─> hooks/useScheduleWizard.ts
            ├─> URL searchParams (?appliance=X&brand=Y) → pre-populate step 1
            ├─> utils/data/brandAppliances.ts → appliance/brand dropdown options
            ├─> lib/validations.ts → validate all form fields (steps 2-5)
            └─> lib/appointmentService.ts :: createAppointment()
                    └─> Writes to data/appointments.json
                    └─> Returns appointment with generated UUID
            └─> Sets createdAppointmentId → shows confirmation (step 6)
```

### Flow 3: Order Lookup
```
OrderLookupPage (UI)
    └─> hooks/useOrderLookup.ts
            ├─> lib/validations.ts :: validatePhone/Email/OrderNumber()
            ├─> lib/appointmentService.ts :: getAppointmentsByPhoneEmail()
            │       └─> Reads from data/appointments.json
            │       └─> Returns matching Appointment[]
            └─> lib/appointmentService.ts :: validateOrderId()
                    └─> Redirects to /order/{id} if found
```

### Flow 4: Order Details Edit
```
OrderDetailPage (UI)
    └─> hooks/useOrderDetails.ts
            └─> lib/appointmentService.ts :: updateAppointment()
                    └─> Updates data/appointments.json
                    └─> router.refresh() to reload
```

### Flow 5: Glossary Page
```
GlossaryPage (UI)
    └─> hooks/useGlossary.ts
            └─> utils/fetchers/glossary-data.ts :: getAllGlossaryTerms()
                    └─> Fetches from backend API (/api/v1/glossary)
            └─> Filters terms locally for debounced search
```

### Flow 6: Repair Service Pages (Server-Side)
```
app/repair/[slug]/page.tsx (Server Component)
    └─> utils/fetchers/repair-data.ts :: getRepairServiceData(slug)
            └─> Fetches from JSON data server (NEXT_PUBLIC_DATA_URL)
    └─> utils/repair-service-parser.ts :: parseRepairServiceData(nodes)
            └─> Returns structured RepairServiceData
```

### Flow 7: Brand-Appliance Repair Pages (Server-Side)
```
app/repair/[brand]/[appliance]/page.tsx (Server Component)
    └─> utils/fetchers/repair-data.ts :: getBrandApplianceRepairData(brand, appliance)
            └─> Fetches from JSON data server
    └─> utils/brand-appliance-parser.ts :: parseBrandApplianceData(nodes)
            └─> Returns structured BrandApplianceData
```

### Flow 8: Symptom Pages (Server-Side)
```
app/symptom/[slug]/page.tsx (Server Component)
    └─> utils/fetchers/symptom-data.ts :: getSymptomData(slug)
            └─> Parses slug → brand + appliance + issue
            └─> Fetches from JSON data server
            └─> Extracts meta, stats, repairs, FAQs, testimonials, glossary, etc.
            └─> Returns SymptomPageData
```

### Flow 9: Maintenance Pages (Server-Side)
```
app/maintain/[slug]/page.tsx (Server Component)
    └─> utils/fetchers/maintain-data.ts :: getMaintainPageData(slug)
            └─> Fetches from JSON data server
    └─> mapHeroProps(), mapServiceGridProps(), etc. (12 mapper functions)
            └─> Transform raw JSON → component-specific prop interfaces
```

### Flow 10: Data Pipeline (Build-Time)
```
[Step 1] utils/extract-brand-appliance-urls.ts
    └─> Reads data/scraped/{brand}.json (previously scraped brand pages)
    └─> Extracts appliance repair URLs
    └─> Writes data/brand-appliance-urls.json

[Step 2] utils/scrape-brand-appliance-pages.ts
    └─> Reads data/brand-appliance-urls.json
    └─> Scrapes each URL with Puppeteer
    └─> Writes data/repairServiceForBrandsAppliances/{brand}/{appliance}.json

[Runtime] These scraped JSON files are served by the JSON data server
    └─> Consumed by utils/fetchers/*.ts at request time
```

---

## File-by-File Breakdown

| File | Type | Runtime | Dependencies | Dependents |
|------|------|---------|--------------|------------|
| `lib/auth-service.ts` | Service | Client | None | `hooks/useAuth.ts` |
| `lib/appointmentService.ts` | Server Action | Server | `fs`, `path`, `crypto` | `hooks/useOrderDetails.ts`, `hooks/useOrderLookup.ts`, `hooks/useScheduleWizard.ts` |
| `lib/validations.ts` | Utility | Client | None | `hooks/useOrderLookup.ts`, `hooks/useScheduleWizard.ts` |
| `hooks/useAuth.ts` | Hook | Client | `lib/auth-service.ts` | Auth pages |
| `hooks/useGlossary.ts` | Hook | Client | `utils/fetchers/glossary-data.ts`, `utils/data/glossaryData.ts` | Glossary pages |
| `hooks/useOrderDetails.ts` | Hook | Client | `lib/appointmentService.ts` | Order detail page |
| `hooks/useOrderLookup.ts` | Hook | Client | `lib/appointmentService.ts`, `lib/validations.ts` | Order lookup page |
| `hooks/useScheduleWizard.ts` | Hook | Client | `lib/appointmentService.ts`, `lib/validations.ts`, `utils/data/brandAppliances.ts` | Scheduler page |
| `utils/cn.ts` | Utility | Client/Server | `clsx`, `tailwind-merge` | All components |
| `utils/IconImports.ts` | Data | Client | SVG files | Symptom components |
| `utils/data/glossaryData.ts` | Type/Data | Client/Server | None | `hooks/useGlossary.ts` |
| `utils/data/brandAppliances.ts` | Data | Client/Server | JSON file | `hooks/useScheduleWizard.ts` |
| `utils/data/ReviewSummary.ts` | Utility | Client/Server | None | Review components |
| `utils/brand-appliance-parser.ts` | Parser | Server | None | Repair route pages |
| `utils/repair-service-parser.ts` | Parser | Server | None | Repair route pages |
| `utils/fetchers/glossary-data.ts` | Fetcher | Server/Client | None | `hooks/useGlossary.ts` |
| `utils/fetchers/maintain-data.ts` | Fetcher | Server | Component type imports | Maintain route pages |
| `utils/fetchers/repair-data.ts` | Fetcher | Server | None | Repair route pages |
| `utils/fetchers/symptom-data.ts` | Fetcher | Server | None | Symptom route pages |
| `utils/extract-brand-appliance-urls.ts` | Script | Build | `fs`, `path` | Produces URL data |
| `utils/scrape-brand-appliance-pages.ts` | Script | Build | `puppeteer`, `fs` | Produces scraped data |
