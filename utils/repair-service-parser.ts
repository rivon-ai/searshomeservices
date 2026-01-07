// ScrapedNode definition
export interface ScrapedNode {
  tag: string;
  content: string;
  attributes: string | Record<string, any>;
  order: number;
}

export interface RepairServiceData {
  heroData: {
    heading?: string;
    description?: string;
  };
  randomContent: ScrapedNode[];
  applianceBrandsData: {
    title?: string;
    brands?: any[];
  };
  brandSuggestionsData: {
    title?: string;
    brands?: any[];
  };
  commonBrandSymptomsData: {
    title?: string;
    symptoms?: any[];
  };
  commonApplianceSymptomsData: {
    title?: string;
    symptoms?: any[];
  };
  repairResourcesData: {
    title?: string;
    blogPosts?: any[];
  };
  faqData: Array<{ question: string; answer: string[] }>;
  brokenAppliancesData: {
    title?: string;
    appliances?: any[];
  };
  expertsData: {
    title?: string;
    experts?: any[];
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

export function parseRepairServiceData(
  nodes: ScrapedNode[],
): RepairServiceData {
  // 1. Process Attributes first
  const processedNodes = nodes.map((node) => ({
    ...node,
    attributes: parseAttributes(node.attributes),
  }));

  const result: RepairServiceData = {
    heroData: {},
    randomContent: [],
    applianceBrandsData: {},
    brandSuggestionsData: {},
    commonBrandSymptomsData: {},
    commonApplianceSymptomsData: {},
    repairResourcesData: {},
    faqData: [],
    brokenAppliancesData: {},
    expertsData: {},
  };

  // 1. Identify Sections
  const h1Index = processedNodes.findIndex((n) => n.tag === "h1");
  const sections: Record<string, number> = {};

  // Find First H2
  let firstH2Index = -1;
  for (let i = h1Index + 1; i < processedNodes.length; i++) {
    if (processedNodes[i].tag === "h2") {
      firstH2Index = i;
      break;
    }
  }

  processedNodes.forEach((node, index) => {
    if (node.tag === "h2") {
      const text = node.content.toLowerCase();
      if (!sections["howItWorks"] && text.includes("how it works"))
        sections["howItWorks"] = index;
      if (!sections["whyChoose"] && text.includes("why sears home services"))
        sections["whyChoose"] = index;
      if (
        !sections["brands we repair"] &&
        (text.includes("brands we repair") || text.includes("brands we repair"))
      )
        sections["brands we repair"] = index;

      // Refined Brand Suggestions detection
      if (
        !sections["brandSuggestions"] &&
        (text.includes("needs repair") || text.includes("brand suggestions"))
      )
        sections["brandSuggestions"] = index;

      if (
        !sections["brandSymptoms"] &&
        (text.includes("common brand symptoms") ||
          text.includes("common cooktop brand symptoms") ||
          (text.includes("symptoms") && text.includes("brand")))
      )
        sections["brandSymptoms"] = index;
      if (
        !sections["applianceSymptoms"] &&
        text.includes("common") &&
        text.includes("symptom") &&
        !text.includes("brand")
      )
        sections["applianceSymptoms"] = index;
      if (!sections["faq"] && text.includes("frequently asked questions"))
        sections["faq"] = index;
      if (
        !sections["resources"] &&
        text.includes("repair") &&
        text.includes("resources")
      )
        sections["resources"] = index;

      // New Sections
      if (
        !sections["brokenAppliances"] &&
        (text.includes("is broken") || text.includes("broken?"))
      )
        sections["brokenAppliances"] = index;
      if (
        !sections["experts"] &&
        (text.includes("repair experts") || text.includes("we are the"))
      )
        sections["experts"] = index;
    }
  });

  // Helper indices for section boundaries
  const sectionIndices = Object.values(sections).sort((a, b) => a - b);

  // 2. Hero Data
  if (h1Index !== -1) {
    result.heroData.heading = processedNodes[h1Index].content;

    // Content between H1 and First H2 is Hero Data
    const heroEnd = firstH2Index !== -1 ? firstH2Index : processedNodes.length;
    const heroNodes = processedNodes.slice(h1Index + 1, heroEnd);

    // Extract Description and Subheading
    // Filter out UI noise
    const cleanHeroNodes = heroNodes.filter((n) => {
      const c = n.content.toLowerCase();
      if (
        c.includes("select a brand") ||
        c.includes("schedule now") ||
        c === "cooktop"
      )
        return false;
      if (
        c.includes("call(") ||
        c.includes("chat") ||
        c.includes("warranty plan")
      )
        return false;
      if ((n.tag === "div" || n.tag === "span") && n.content.trim().length < 5)
        return false;
      // Filter out large "summary" blocks that duplicate subsequent sections (heuristic: very long texts)
      if (n.content.length > 300 && n.content.includes("Our Services Include"))
        return false;
      return true;
    });

    // Heuristic: First paragraph is subheading/description
    if (cleanHeroNodes.length > 0) {
      const pNodes = cleanHeroNodes.filter(
        (n) => n.tag === "p" || n.tag === "div",
      );
      if (pNodes.length > 0) {
        result.heroData.description = pNodes[0].content;
        // If there's a second one, maybe use it? Or just concat?
        // result.heroData.subHeading = pNodes.length > 1 ? pNodes[1].content : undefined;
      }
    }
  }

  // 3. Random Area
  // Must start at First H2
  if (firstH2Index !== -1) {
    let randomEnd = processedNodes.length;

    const sortedSpecialIndices = sectionIndices;

    // If firstH2Index IS in sections (e.g. it's "How It Works"), then random content is empty (0 length slice)
    // If firstH2Index is NOT in sections (it's a generic H2), then random content goes until the next special section.

    let nextSpecialSectionIndex = processedNodes.length;
    for (const idx of sortedSpecialIndices) {
      if (idx > firstH2Index) {
        nextSpecialSectionIndex = idx;
        break;
      } else if (idx === firstH2Index) {
        nextSpecialSectionIndex = idx; // Stops immediately
        break;
      }
    }

    // Explicitly filter out FAQ-like buttons/content from random area just in case
    const rawRandom = processedNodes.slice(
      firstH2Index,
      nextSpecialSectionIndex,
    );

    // Safety Cutoff: If an FAQ H2 OR a wrapper block (div/section) starting with "Frequently Asked Questions" made it into this slice, cut it off there.
    const faqCutoffIndex = rawRandom.findIndex((n) => {
      const content = n.content.toLowerCase().trim();
      // Check for H2
      if (n.tag === "h2" && content.includes("asked questions")) return true;
      // Check for wrapper divs/sections that contain the FAQ text (scraped data often has these duplicates before the H2)
      if (
        (n.tag === "div" || n.tag === "section") &&
        content.startsWith("frequently asked questions") &&
        content.length > 50
      )
        return true;
      return false;
    });

    if (faqCutoffIndex !== -1) {
      result.randomContent = rawRandom.slice(0, faqCutoffIndex);
    } else {
      result.randomContent = rawRandom;
    }
  } else {
    result.randomContent = [];
  }

  // 3. Brands We Repair
  if (sections["brands we repair"]) {
    const start = sections["brands we repair"];
    let end = processedNodes.length;

    // Stop at the NEXT H2 tag, regardless of what it is
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }

    const sectionNodes = processedNodes.slice(start + 1, end);
    const brands = [];

    for (const n of sectionNodes) {
      if (n.tag === "img" && (n.attributes as any).src) {
        const attrs = n.attributes as any;
        brands.push({
          name: attrs.alt || "Brand",
          logoUrl: attrs.src,
          link: "#",
          alt: attrs.alt || "",
        });
      }
    }
    result.applianceBrandsData.title = processedNodes[start].content;
    result.applianceBrandsData.brands = brands;
  }

  // 4. Broken Appliances (Which [Brand] appliance is broken?)
  if (sections["brokenAppliances"]) {
    const start = sections["brokenAppliances"];
    let end = processedNodes.length;
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }
    const sectionNodes = processedNodes.slice(start + 1, end);
    const appliances = [];
    for (const n of sectionNodes) {
      // Look for links that might represent appliances
      // Usually structured as Link > Img + H4/Text
      if (n.tag === "a" && n.attributes && (n.attributes as any).href) {
        const attrs = n.attributes as any;
        // Look for image inside or nearby (simplified: use self data if present)
        // In flat list, we might miss nested structure.
        // But usually scraping preserves text content of link.
        if (n.content && n.content.length > 2 && n.content.length < 50) {
          appliances.push({
            label: n.content.trim(),
            href: attrs.href,
            iconSrc: "", // Need to find associated image, difficult in flat list without parent map.
            // Heuristic: Check if previous node was IMG
          });
        }
      }
      // Better Heuristic: Check for images in this section and assume they map to appliances if close
      if (n.tag === "img" && (n.attributes as any).src) {
        const attrs = n.attributes as any;
        // Check if this image belongs to the *last* appliance or a new one
        // For now, let's just collect valid images and labels separately or simple pairs if possible.
        // Given difficulty of flat node list, let's try to find Button/Link wrappers in the raw content if possible, but we only have nodes.
        // We will push a "partial" item and try to fill it.
        appliances.push({
          label: attrs.alt || "Appliance",
          iconSrc: attrs.src,
          iconAlt: attrs.alt || "",
          href: "#", // Placeholder
        });
      }
    }
    // Deduplicate or clean up
    // Since we might get both Link and Img as separate nodes, this is imperfect.
    // PROVISIONAL: Just get the images, they usually have the label in Alt or sibling text.
    const cleanAppliances = appliances
      .filter((a) => a.iconSrc)
      .map((a) => ({
        ...a,
        href: "/scheduler/shs", // Default if not found
      }));

    result.brokenAppliancesData.title = processedNodes[start].content;
    result.brokenAppliancesData.appliances = cleanAppliances;
  }

  // 5. Brand Suggestions (Which [Brand] appliance needs repair?)
  if (sections["brandSuggestions"]) {
    const start = sections["brandSuggestions"];
    let end = processedNodes.length;
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }

    const sectionNodes = processedNodes.slice(start + 1, end);
    const brands = [];

    result.brandSuggestionsData.title = processedNodes[start].content;

    for (const n of sectionNodes) {
      if (n.tag === "img" && (n.attributes as any).src) {
        const attrs = n.attributes as any;
        brands.push({
          label: attrs.alt || "Brand", // Mapped to label for Suggestions component
          iconSrc: attrs.src,
          iconAlt: attrs.alt || "",
          href: (n.attributes as any).parentElementHref || "#", // If we had parent href... fallback
        });
      }
      // If we find links, we might want to attach them to the last image?
      if (n.tag === "a" && (n.attributes as any).href && brands.length > 0) {
        // Heuristic: Assign this link to the most recently added brand image if it doesn't have one
        if (brands[brands.length - 1].href === "#") {
          brands[brands.length - 1].href = (n.attributes as any).href;
        }
      }
    }
    result.brandSuggestionsData.brands = brands;
  }

  // 6. Experts Card
  if (sections["experts"]) {
    const start = sections["experts"];
    let end = processedNodes.length;
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }
    const sectionNodes = processedNodes.slice(start + 1, end);
    const experts = [];

    // Experts usually have Image, Title (H3), Description (P)
    // We can iterate and group them.
    let currentExpert: any = {};

    for (const n of sectionNodes) {
      if (n.tag === "img" && (n.attributes as any).src) {
        if (currentExpert.iconSrc) experts.push(currentExpert); // Push previous if new image starts
        currentExpert = {
          iconSrc: (n.attributes as any).src,
          iconAlt: (n.attributes as any).alt || "",
        };
      }
      if (n.tag === "h3") {
        currentExpert.name = n.content;
      }
      if (n.tag === "p" && !currentExpert.description) {
        currentExpert.description = n.content;
      }
    }
    if (currentExpert.iconSrc) experts.push(currentExpert);

    result.expertsData.title = processedNodes[start].content;
    result.expertsData.experts = experts;
  }

  // 7. Common Symptoms
  if (sections["brandSymptoms"]) {
    const start = sections["brandSymptoms"];
    let end = processedNodes.length;

    // Find the next H2 to define strict boundary
    for (let i = start + 1; i < processedNodes.length; i++) {
      if (processedNodes[i].tag === "h2") {
        end = i;
        break;
      }
    }

    result.commonBrandSymptomsData.title = processedNodes[start].content;
    result.commonBrandSymptomsData.symptoms = [];

    for (let i = start + 1; i < end; i++) {
      const node = processedNodes[i];
      if (node.tag === "a") {
        const text = node.content || "";
        const attrs = node.attributes as any;
        const link = attrs ? attrs.href : "";
        if (text && link) {
          result.commonBrandSymptomsData.symptoms.push({ text, link });
        }
      }
    }
  }

  if (sections["applianceSymptoms"]) {
    const start = sections["applianceSymptoms"];
    let end = processedNodes.length;

    // Find the next H2 to define strict boundary
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

  // 8. Repair Resources (Blog Posts)
  // ... existing logic ...
  if (sections["resources"]) {
    const start = sections["resources"];
    let end = processedNodes.length;
    for (const idx of sectionIndices) {
      if (idx > start) {
        if (end === processedNodes.length || idx < end) {
          end = idx;
        }
      }
    }
    const sectionNodes = processedNodes.slice(start + 1, end);
    const posts = [];

    // Grouping variables
    let currentPost: any = {};

    for (let i = 0; i < sectionNodes.length; i++) {
      const n = sectionNodes[i];
      const attrs = n.attributes as any;

      // New Article start
      if (n.tag === "article") {
        if (currentPost.link && currentPost.title) {
          posts.push(currentPost);
        }
        currentPost = {};
      }

      // Link
      if (n.tag === "a" && attrs.href && attrs.href.startsWith("/blog")) {
        if (!currentPost.link) currentPost.link = attrs.href;
        // If the link has text content, it might be the title
        if (n.content && n.content.trim().length > 5 && !currentPost.title) {
          currentPost.title = n.content.trim();
        }
      }

      // Image
      if (n.tag === "img" && attrs.src) {
        if (!currentPost.image) currentPost.image = attrs.src;
      }

      // Title (sometimes in a separate 'p' or 'a')
      // If we have a link but no title, maybe this P tag is the title?
      if (n.tag === "p" && !currentPost.title && currentPost.link) {
        if (n.content && n.content.trim().length > 10) {
          // Heuristic: Titles aren't super long paragraphs
          if (n.content.length < 100) currentPost.title = n.content.trim();
        }
      }

      // Read time / Date (optional, skipping for now to keep simple)
    }
    // Push last one
    if (currentPost.link && (currentPost.title || currentPost.image)) {
      posts.push(currentPost);
    }

    result.repairResourcesData.title = processedNodes[start].content;
    result.repairResourcesData.blogPosts = posts;
  }

  // 9. FAQ
  if (sections["faq"]) {
    const start = sections["faq"];
    let end = processedNodes.length;
    for (const idx of sectionIndices) {
      if (idx > start) {
        end = idx;
        break;
      }
    }
    const sectionNodes = processedNodes.slice(start + 1, end);

    // Pattern in scraped data:
    // button: Question
    // div (panel): Answer content

    // Iterating looking for button/h3 pairs or similar.
    // Based on `Cooktop` JSON:
    // button > "What types..."
    // div (panel) > "We repair..."

    const faqItems: Array<{ question: string; answer: string[] }> = [];
    let currentQuestion = "";

    for (let i = 0; i < sectionNodes.length; i++) {
      const n = sectionNodes[i];

      // Check for question (button or logic)
      if (
        n.tag === "button" &&
        n.content.length > 10 &&
        (n.content.includes("?") || n.content.includes("Freq"))
      ) {
        currentQuestion = n.content.replace("### ", ""); // Clean up if markdown exists
      } else if (n.tag === "h3" && n.content.includes("?")) {
        // Fallback if button content was weird, sometimes h3 has the question
        currentQuestion = n.content;
      }

      // Answer often follows in a div/panel
      // If we have a current question, look for answer text
      if (
        currentQuestion &&
        n.tag === "div" &&
        (n.attributes as any)["data-headlessui-state"] === "open"
      ) {
        // This div likely contains the answer text.
        // It might be the container. Content might be in this node or next.
        if (
          n.content &&
          n.content.length > 20 &&
          n.content !== currentQuestion &&
          !n.content.includes("?")
        ) {
          // Found answer candidate
          // Split by newline if multiple paragraphs
          const answers = n.content
            .split("\n")
            .filter((s) => s.trim().length > 0);

          // Check if duplicate?
          const exists = faqItems.some((f) => f.question === currentQuestion);
          if (!exists) {
            faqItems.push({
              question: currentQuestion,
              answer: answers,
            });
            currentQuestion = ""; // Reset
          }
        }
      }
      // Also check plain divs if they follow a question button immediately
      if (
        currentQuestion &&
        n.tag === "div" &&
        n.content.length > 20 &&
        !n.content.includes(currentQuestion)
      ) {
        // Fallback for answer
        const exists = faqItems.some((f) => f.question === currentQuestion);
        if (!exists) {
          // Only if it looks like a real answer (not UI junk)
          if (!n.content.includes("xmlns")) {
            const answers = n.content
              .split("\n")
              .filter((s) => s.trim().length > 0);
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

  return result;
}
