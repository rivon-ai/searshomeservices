// Brand Appliance Parser - Specialized parser for brand-specific appliance repair pages
// Identifies sections based on heading patterns rather than exact matches

export interface ScrapedNode {
  tag: string;
  content: string;
  attributes: string | Record<string, any>;
  order: number;
}

export interface BrandApplianceData {
  heroData: {
    heading?: string;
    description?: string;
    imageUrl?: string;
  };
  randomContent: ScrapedNode[];
  faqData: Array<{ question: string; answer: string[] }>;
  howItWorksData?: {
    title?: string;
    content: ScrapedNode[];
  };
  repairResourcesData?: {
    title?: string;
    blogPosts?: any[];
  };
  glossaryTermsData?: {
    title?: string;
    content: ScrapedNode[];
  };
  commonApplianceSymptomsData: {
    title?: string;
    symptoms?: any[];
  };
}

function parseAttributes(
  attrString: string | Record<string, any>,
): Record<string, any> {
  if (typeof attrString !== "string") return attrString || {};
  try {
    let jsonStr = attrString
      .replace(/'/g, '"')
      .replace(/None/g, "null")
      .replace(/True/g, "true")
      .replace(/False/g, "false");
    return JSON.parse(jsonStr);
  } catch (e) {
    return {};
  }
}

export function parseBrandApplianceData(
  nodes: ScrapedNode[],
): BrandApplianceData {
  const processedNodes = nodes.map((node) => ({
    ...node,
    attributes: parseAttributes(node.attributes),
  }));

  const result: BrandApplianceData = {
    heroData: {},
    randomContent: [],
    faqData: [],
    howItWorksData: { content: [] },
    repairResourcesData: {},
    glossaryTermsData: { content: [] },
    commonApplianceSymptomsData: {},
  };

  // 2. Find H1 for hero heading
  const h1Index = processedNodes.findIndex((n) => n.tag === "h1");

  // 1. Extract image URL: Find first actual image above H1
  // User instruction: "the first image tag above from the first h1 tag is containing actual image tag"
  const searchLimit =
    h1Index > 0 ? h1Index : Math.min(100, processedNodes.length);

  for (let i = 0; i < searchLimit; i++) {
    const node = processedNodes[i];
    if (node.tag === "img") {
      const src = (node.attributes as any).src || "";
      const alt = (node.attributes as any).alt || "";
      const lowerSrc = src.toLowerCase();
      const lowerAlt = alt.toLowerCase();

      // Skip common UI icons and logos
      if (
        src &&
        !lowerSrc.includes("icon") &&
        !lowerSrc.includes("logo") &&
        !lowerSrc.includes("appointment") &&
        !lowerSrc.includes("phone") &&
        !lowerSrc.includes("menu") &&
        !lowerAlt.includes("logo") &&
        !src.endsWith(".svg")
      ) {
        result.heroData.imageUrl = src;
        break;
      }
    }
  }
  if (h1Index !== -1) {
    result.heroData.heading = processedNodes[h1Index].content;

    // Get description (first paragraph after H1)
    for (
      let i = h1Index + 1;
      i < Math.min(h1Index + 10, processedNodes.length);
      i++
    ) {
      const node = processedNodes[i];
      if (
        node.tag === "p" &&
        node.content.length > 20 &&
        node.content.length < 500
      ) {
        const content = node.content.toLowerCase();
        // Filter out UI noise
        if (!content.includes("schedule now") && !content.includes("call(")) {
          result.heroData.description = node.content;
          break;
        }
      }
    }
  }

  // 3. Identify sections based on heading patterns
  const sections: Record<string, number> = {};

  processedNodes.forEach((node, index) => {
    const text = node.content.toLowerCase();

    if (node.tag === "h2") {
      // FAQ: "frequently asked questions" or "faq"
      if (
        !sections["faq"] &&
        (text.includes("frequently asked questions") || text.includes("faq"))
      ) {
        sections["faq"] = index;
      }

      // HowItWorks: "how it works" OR "[brand] [appliance] repair is quick and easy"
      if (
        !sections["howItWorks"] &&
        (text.includes("how it works") ||
          text.includes("repair is quick and easy"))
      ) {
        sections["howItWorks"] = index;
      }

      // RepairResources: "Repair [appliance] Resources"
      if (
        !sections["repairResources"] &&
        text.includes("repair") &&
        text.includes("resources")
      ) {
        sections["repairResources"] = index;
      }

      // GlossaryTerms: "Glossary Terms" or "Glossary"
      if (!sections["glossaryTerms"] && text.includes("glossary")) {
        sections["glossaryTerms"] = index;
      }

      // CommonApplianceSymptoms: "Additional possible [brand] [appliance] symptoms"
      if (
        !sections["commonApplianceSymptoms"] &&
        text.includes("additional possible") &&
        text.includes("symptoms")
      ) {
        sections["commonApplianceSymptoms"] = index;
      }
    } else if (node.tag === "h3") {
      // Also check H3 for Glossary
      if (!sections["glossaryTerms"] && text.includes("glossary")) {
        sections["glossaryTerms"] = index;
      }
    }
  });

  // 4. Determine first styled component section
  const sectionIndices = Object.values(sections).sort((a, b) => a - b);
  const firstStyledSection =
    sectionIndices.length > 0 ? sectionIndices[0] : processedNodes.length;

  // 5. Random Content: Everything from first H2 until first styled component
  // If the first H2 IS a styled component, randomContent will be empty (correct behavior)
  let firstH2Index = -1;
  for (let i = 0; i < processedNodes.length; i++) {
    if (processedNodes[i].tag === "h2") {
      firstH2Index = i;
      break;
    }
  }

  // Only include content if there's a gap between first H2 and the NEXT styled section
  if (firstH2Index !== -1) {
    // Find the nearest section boundary that is at or after our start
    // This prevents earlier sections (e.g. H3 Glossary) from blocking later Random H2 content
    const boundaryIndex =
      sectionIndices.find((idx) => idx >= firstH2Index) ??
      processedNodes.length;

    if (boundaryIndex > firstH2Index) {
      result.randomContent = processedNodes.slice(firstH2Index, boundaryIndex);
    }
  }

  // 6. Extract FAQ
  if (sections["faq"]) {
    const start = sections["faq"];
    let end = processedNodes.length;
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }

    const sectionNodes = processedNodes.slice(start + 1, end);
    const faqItems: Array<{ question: string; answer: string[] }> = [];
    let currentQuestion = "";

    for (let i = 0; i < sectionNodes.length; i++) {
      const n = sectionNodes[i];

      if (
        n.tag === "button" &&
        n.content.length > 10 &&
        (n.content.includes("?") || n.content.includes("Freq"))
      ) {
        currentQuestion = n.content.replace("### ", "");
      } else if (n.tag === "h3" && n.content.includes("?")) {
        currentQuestion = n.content;
      }

      if (
        currentQuestion &&
        n.tag === "div" &&
        (n.attributes as any)["data-headlessui-state"] === "open"
      ) {
        if (
          n.content &&
          n.content.length > 20 &&
          n.content !== currentQuestion &&
          !n.content.includes("?")
        ) {
          const answers = n.content
            .split("\n")
            .filter((s) => s.trim().length > 0);

          const exists = faqItems.some((f) => f.question === currentQuestion);
          if (!exists) {
            faqItems.push({
              question: currentQuestion,
              answer: answers,
            });
            currentQuestion = "";
          }
        }
      }
    }
    result.faqData = faqItems;
  }

  // 7. Extract HowItWorks
  if (sections["howItWorks"]) {
    const start = sections["howItWorks"];
    let end = processedNodes.length;
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }
    result.howItWorksData = {
      title: processedNodes[start].content,
      content: processedNodes.slice(start + 1, end),
    };
  }

  // 8. Extract RepairResources
  if (sections["repairResources"]) {
    const start = sections["repairResources"];
    let end = processedNodes.length;
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }

    const sectionNodes = processedNodes.slice(start + 1, end);
    const posts = [];
    let currentPost: any = {};

    for (let i = 0; i < sectionNodes.length; i++) {
      const n = sectionNodes[i];
      const attrs = n.attributes as any;

      if (n.tag === "article") {
        if (currentPost.link && currentPost.title) {
          posts.push(currentPost);
        }
        currentPost = {};
      }

      if (n.tag === "a" && attrs.href && attrs.href.startsWith("/blog")) {
        if (!currentPost.link) currentPost.link = attrs.href;
        if (n.content && n.content.trim().length > 5 && !currentPost.title) {
          currentPost.title = n.content.trim();
        }
      }

      if (n.tag === "img" && attrs.src) {
        if (!currentPost.image) currentPost.image = attrs.src;
      }

      if (n.tag === "p" && !currentPost.title && currentPost.link) {
        if (
          n.content &&
          n.content.trim().length > 10 &&
          n.content.length < 100
        ) {
          currentPost.title = n.content.trim();
        }
      }
    }

    if (currentPost.link && (currentPost.title || currentPost.image)) {
      posts.push(currentPost);
    }

    result.repairResourcesData = {
      title: processedNodes[start].content,
      blogPosts: posts,
    };
  }

  // 9. Extract GlossaryTerms
  if (sections["glossaryTerms"]) {
    const start = sections["glossaryTerms"];
    let end = processedNodes.length;
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }
    result.glossaryTermsData = {
      title: processedNodes[start].content,
      content: processedNodes.slice(start + 1, end),
    };
  }

  // 10. Extract CommonApplianceSymptoms
  if (sections["commonApplianceSymptoms"]) {
    const start = sections["commonApplianceSymptoms"];
    let end = processedNodes.length;
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }

    result.commonApplianceSymptomsData.title = processedNodes[start].content;
    result.commonApplianceSymptomsData.symptoms = [];

    for (let i = start + 1; i < end; i++) {
      const node = processedNodes[i];
      if (node.tag === "a") {
        const text = node.content || "";
        const attrs = node.attributes as any;
        const link = attrs ? attrs.href : "";
        if (text && link) {
          result.commonApplianceSymptomsData.symptoms.push({ text, link });
        }
      }
    }
  }

  return result;
}
