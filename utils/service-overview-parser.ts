// =====================================================================
// Service Overview Mini-Parser
// Extracts hero image, hero description, article body, and how-it-works
// steps from the mixed `serviceOverview` array in the summarized JSON.
// =====================================================================

import { ServiceOverviewItem } from '@/types/repairTypes';

export interface ParsedServiceOverview {
  heroImage: string | null;
  heroDescription: string | null;
  articleNodes: ServiceOverviewItem[];
  howItWorksSteps: Array<{ iconSrc: string; text: string }>;
}

// Nav icons from the website shell — these are NOT content
const NAV_ICON_PATHS = [
  '/static/icons/',
  '/static/images/general/',
];

// The 3 "How It Works" icons that always appear in groups
const HOW_IT_WORKS_ICON_KEYS = ['ico-Calendar', 'ico-Chat', 'ico-home-warranty'];

// UI text artifacts from scraping — skip these paragraphs
const JUNK_STRINGS = [
  'Loading scheduler...',
  'Schedule service your way',
  'Sign up for deals and tips',
  "We're in your neighborhood, and we'll fix it",
  "We're in your neighborhood and we'll fix it",
  "Sign up for deals and tips about all that Sears Home Services offers",
  "You can move the toggle above to the left to opt out of Cookie-based",
  "This website recognizes the Global Privacy Control",
];

function isNavIcon(src: string): boolean {
  if (NAV_ICON_PATHS.some((p) => src.startsWith(p))) return true;
  // Filter out any standalone SVG icons that are likely UI elements (e.g. appliances)
  if (src.includes('.svg') && (src.includes('/ico-') || src.includes('/normal_u'))) return true;
  return false;
}

function isHowItWorksIcon(src: string): boolean {
  return HOW_IT_WORKS_ICON_KEYS.some((k) => src.includes(k));
}

function isJunkParagraph(content: string): boolean {
  return JUNK_STRINGS.some((j) => content.includes(j));
}

export function parseServiceOverview(items: ServiceOverviewItem[]): ParsedServiceOverview {
  const result: ParsedServiceOverview = {
    heroImage: null,
    heroDescription: null,
    articleNodes: [],
    howItWorksSteps: [],
  };

  // 1. Clean data and handle nulls
  const rawItems = (items || []).map(item => ({
    ...item,
    content: (item.content || "").replace(/[^\x20-\x7E\s]/g, "").trim()
  }));

  // 2. Extract How It Works steps
  for (let i = 0; i < rawItems.length - 1; i++) {
    const item = rawItems[i];
    if (item.type === 'img' && item.src && isHowItWorksIcon(item.src)) {
      const next = rawItems[i + 1];
      if (next?.type === 'p' && next.content.length > 0) {
        result.howItWorksSteps.push({ iconSrc: item.src, text: next.content });
      }
    }
  }
  const howItWorksTexts = new Set(result.howItWorksSteps.map((s) => s.text));

  // 3. Find hero image
  for (const item of rawItems) {
    if (item.type === 'img' && item.src) {
      if (
        item.src.startsWith('http') &&
        !isNavIcon(item.src) &&
        !isHowItWorksIcon(item.src)
      ) {
        result.heroImage = item.src;
        break;
      }
    }
  }

  // 4. Initial filtering and identification
  let filteredNodes: ServiceOverviewItem[] = rawItems.filter((item) => {
    if (item.type === 'img') {
      if (!item.src) return false;
      // Filter out tracking pixels / 1x1 images, bounceexchange, opt-out logos
      if (item.src.includes('optimizely') || item.src.includes('bounceexchange') || item.src.includes('cookielaw') || item.src.includes('bat.bing') || item.src.includes('roeye')) return false;
      return !isNavIcon(item.src) && !isHowItWorksIcon(item.src) && item.src !== result.heroImage;
    }
    if (item.type === 'iframe') {
      return false; // Filter out ad/tracking iframes
    }
    if (item.type === 'p') {
      if (item.content.length < 3) return false;
      if (isJunkParagraph(item.content)) return false;
      if (howItWorksTexts.has(item.content)) return false;
      
      // Filter out isolated appliance labels that accompanied the stripped icons
      const isApplianceLabel = ['Kenmore', 'LG', 'Samsung', 'Whirlpool', 'GE'].some(brand => item.content.startsWith(brand)) && item.content.split(' ').length <= 4;
      if (isApplianceLabel && !item.content.includes(',')) return false;
      
      return true;
    }
    return true;
  });

  // HEURISTIC: Reconstruct Hierarchy
  const finalNodes: ServiceOverviewItem[] = [];
  let i = 0;

  while (i < filteredNodes.length) {
    const node = filteredNodes[i];

    if (node.type === "p") {
      const content = node.content;
      const isShort = content.length < 80;
      const noTerminalPunct = !/[.!?]/.test(content.slice(-1));
      const endsWithColon = content.endsWith(":");
      const isTitleCase = content.split(" ").every(word => 
        word.length <= 2 || (word[0] && word[0] === word[0].toUpperCase())
      );

      // Identify Heading
      if (isShort && (noTerminalPunct || endsWithColon || isTitleCase)) {
        finalNodes.push({ ...node, type: "h3" });
        i++;
        continue;
      }

      // Identify List: If lookahead finds 3+ short items
      let j = i;
      const listItems: string[] = [];
      while (j < filteredNodes.length && j < i + 5) {
        const next = filteredNodes[j];
        if (next.type === "p" && next.content.length < 150) {
          listItems.push(next.content);
          j++;
        } else break;
      }

      if (listItems.length >= 3) {
        listItems.forEach(text => {
          finalNodes.push({ type: "li", content: text });
        });
        i = j;
        continue;
      }
    }

    finalNodes.push(node);
    i++;
  }

  // Inject missing structural headings based on content context
  const injectedNodes: ServiceOverviewItem[] = [];
  let foundProblemsHeading = false;
  let foundCostHeading = false;

  for (let k = 0; k < finalNodes.length; k++) {
    const node = finalNodes[k];
    
    // Inject "Common Problems" if we see list items starting
    if (!foundProblemsHeading && node.type === "li") {
      injectedNodes.push({ type: "h3", content: "Common Problems We Fix" });
      foundProblemsHeading = true;
    }

    // Inject "Cost of Repairs" if we see price ranges
    if (!foundCostHeading && node.content.includes("$") && node.content.includes("-")) {
      injectedNodes.push({ type: "h3", content: "Cost of Repairs" });
      foundCostHeading = true;
    }

    injectedNodes.push(node);
  }

  // Extract hero description
  const firstTextNode = injectedNodes.find(n => n.type === "p" || n.type === "h3");
  if (firstTextNode && firstTextNode.content.endsWith(".")) {
    result.heroDescription = firstTextNode.content;
    result.articleNodes = injectedNodes.filter(n => n !== firstTextNode);
  } else {
    result.articleNodes = injectedNodes;
  }

  return result;
}
