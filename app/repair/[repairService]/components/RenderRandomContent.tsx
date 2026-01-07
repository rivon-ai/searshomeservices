import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrapedNode } from "@/utils/repair-service-parser";
import { cn } from "@/lib/utils";

// Helper to check if paragraph mentions video
const containsVideoPhrase = (content: string): boolean => {
  const videoKeywords = ["here's", "video", "show", "how"];
  const lowerContent = content.toLowerCase();
  return videoKeywords.every((keyword) => lowerContent.includes(keyword));
};

// Helper to extract YouTube video ID from common patterns
const extractYouTubeId = (text: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
};

// Transform attributes from JSON format to React props
const transformAttributes = (
  rawAttributes: string | Record<string, any>,
): Record<string, any> => {
  const reactProps: Record<string, any> = {};
  const attrs = typeof rawAttributes === "string" ? {} : rawAttributes;

  for (const key in attrs) {
    if (key === "class") {
      reactProps.className = Array.isArray(attrs[key])
        ? attrs[key].join(" ")
        : attrs[key];
    } else if (key === "srcset") {
      reactProps.srcSet = attrs[key];
    } else if (key === "style" && typeof attrs[key] === "string") {
      const styleObj: Record<string, string> = {};
      attrs[key].split(";").forEach((declaration: string) => {
        const [prop, value] = declaration.split(":").map((s) => s.trim());
        if (prop && value) {
          const camelCaseProp = prop.replace(/-([a-z])/g, (g) =>
            g[1].toUpperCase(),
          );
          styleObj[camelCaseProp] = value;
        }
      });
      reactProps.style = styleObj;
    } else {
      reactProps[key] = attrs[key];
    }
  }
  return reactProps;
};

// Helper to check if a tag is inline-level
const isInline = (tag: string) =>
  ["a", "strong", "span", "em", "b", "i", "u"].includes(tag);
const isBlock = (tag: string) =>
  ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "div"].includes(tag);

interface ProcessedNode extends Omit<ScrapedNode, "content"> {
  content: React.ReactNode;
}

// Logic to merge inline nodes into block parents
const preprocessNodes = (nodes: ScrapedNode[]): ProcessedNode[] => {
  const processed: ProcessedNode[] = [];
  const skipIndices = new Set<number>();

  for (let i = 0; i < nodes.length; i++) {
    if (skipIndices.has(i)) continue;

    const currentNode = nodes[i];

    // Check for Block + String Content
    if (isBlock(currentNode.tag) && typeof currentNode.content === "string") {
      let mergedContent: (string | ScrapedNode)[] = [currentNode.content];
      let j = i + 1;

      // Look ahead for subsequent inline nodes that belong inside this block
      while (j < nodes.length) {
        const nextNode = nodes[j];
        if (!isInline(nextNode.tag)) break;

        // Check if nextNode content exists in current mergedContent
        const canMerge = mergedContent.some(
          (part) => typeof part === "string" && part.includes(nextNode.content),
        );

        if (canMerge) {
          const newContent: (string | ScrapedNode)[] = [];
          let injected = false;

          for (const part of mergedContent) {
            if (
              !injected &&
              typeof part === "string" &&
              part.includes(nextNode.content)
            ) {
              const splitIdx = part.indexOf(nextNode.content);
              const before = part.slice(0, splitIdx);
              const after = part.slice(splitIdx + nextNode.content.length);

              if (before) newContent.push(before);
              newContent.push(nextNode);
              if (after) newContent.push(after);

              injected = true;
            } else {
              newContent.push(part);
            }
          }
          mergedContent = newContent;
          skipIndices.add(j);
        }
        j++;
      }

      // Convert merged content to ReactNode
      const finalContent = mergedContent.map((item, idx) => {
        if (typeof item === "string") return item;
        return (
          <React.Fragment key={`inline-${i}-${idx}`}>
            {renderInlineNode(item)}
          </React.Fragment>
        );
      });

      processed.push({ ...currentNode, content: finalContent });
    } else {
      // Non-block or mixed content already (unlikely from scraper)
      processed.push({ ...currentNode, content: currentNode.content });
    }
  }

  return processed;
};

// Helper: Render inline node
const renderInlineNode = (node: ScrapedNode) => {
  const { tag, attributes, content } = node;
  const safeAttributes = transformAttributes(attributes);
  // Ignore internal UI state
  if (safeAttributes["data-headlessui-state"]) return null;

  switch (tag) {
    case "a":
      return (
        <Link
          href={safeAttributes.href || "#"}
          {...safeAttributes}
          className={cn(
            safeAttributes.className,
            "text-blue-600 hover:underline",
          )}
        >
          {content}
        </Link>
      );
    case "strong":
    case "b":
      return (
        <strong
          {...safeAttributes}
          className={cn(safeAttributes.className, "font-bold")}
        >
          {content}
        </strong>
      );
    case "span":
      return <span {...safeAttributes}>{content}</span>;
    case "em":
    case "i":
      return <em {...safeAttributes}>{content}</em>;
    default:
      return <span>{content}</span>;
  }
};

// Render individual node with proper transformations
export const renderNode = (
  node: ProcessedNode,
  index: number,
): React.ReactNode => {
  if (!node) return null;

  const attributes = transformAttributes(node.attributes);
  const key = `node-${index}-${node.order}`;
  const content = node.content; // Can be string or React array

  switch (node.tag) {
    case "h2":
      return (
        <h3
          key={key}
          {...attributes}
          className={cn(
            attributes.className,
            "text-2xl text-blue-950 mb-5 leading-8",
          )}
        >
          {content}
        </h3>
      );

    case "h3":
      return (
        <h2
          key={key}
          {...attributes}
          className={cn(
            attributes.className,
            "text-xl text-gray-500 leading-8 my-5.5",
          )}
        >
          {content}
        </h2>
      );

    case "h4":
      return (
        <h4
          key={key}
          {...attributes}
          className={cn(
            attributes.className,
            "text-xl text-blue-950 my-2 leading-8",
          )}
        >
          {content}
        </h4>
      );

    case "p":
      const contentStr = Array.isArray(content)
        ? content.join("")
        : String(content);
      const hasVideoPhrase = containsVideoPhrase(contentStr);
      const videoId = hasVideoPhrase ? extractYouTubeId(contentStr) : null;

      return (
        <React.Fragment key={key}>
          <p
            {...attributes}
            className={cn(
              attributes.className,
              "leading-7 text-gray-500 my-4.5",
            )}
          >
            {content}
          </p>
          {hasVideoPhrase && videoId && (
            <div className="my-6">
              <iframe
                className="w-full aspect-video rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="DIY Repair Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </React.Fragment>
      );

    case "ul":
      return null; // Handled by LI grouping in parent

    case "li":
      return (
        <li
          key={key}
          {...attributes}
          className={cn(
            attributes.className,
            "text-left text-md font-normal leading-6 text-gray-500 ml-4",
          )}
        >
          {content}
        </li>
      );

    case "strong":
      return (
        <strong
          key={key}
          {...attributes}
          className={attributes.className || "font-bold text-xl"}
        >
          {content}
        </strong>
      );

    case "a":
      const href = attributes.href || "#";
      return (
        <Link
          key={key}
          href={href}
          {...attributes}
          className={
            attributes.className ||
            "hover:underline hover:underline-offset-4 text-blue-500 focus:outline-blue-500 leading-6 font-normal"
          }
        >
          {content}
        </Link>
      );

    case "img":
      // Extract src from content if likely
      const imgSrc = attributes.src || "";
      const imgAlt = attributes.alt || "Image";

      if (!imgSrc) return null;

      const isExternal = imgSrc.startsWith("http") || imgSrc.startsWith("//");

      return (
        <div key={key} className="my-6">
          {isExternal ? (
            <img
              src={imgSrc.startsWith("//") ? `https:${imgSrc}` : imgSrc}
              alt={imgAlt}
              className={attributes.className || "rounded-md w-full"}
              loading="lazy"
            />
          ) : (
            <Image
              src={imgSrc}
              alt={imgAlt}
              width={578}
              height={450}
              className={attributes.className || "rounded-md w-full"}
            />
          )}
        </div>
      );

    case "button":
      return null;

    case "section":
      // Skip section tags that contain FAQ content (these are rendered by FAQ component)
      const sectionContentStr = Array.isArray(content)
        ? content.join("")
        : String(content || "");
      const lowerSectionContent = sectionContentStr.toLowerCase();

      if (
        lowerSectionContent.includes("frequently asked questions") ||
        lowerSectionContent.includes("what types of") ||
        lowerSectionContent.includes("how fast can") ||
        lowerSectionContent.includes("do i need to worry")
      ) {
        return null;
      }
      // Otherwise render as div
      return (
        <div key={key} {...attributes}>
          {content}
        </div>
      );

    case "div":
    case "span":
      if (
        !content ||
        (typeof content === "string" && (content === "$" || content === "/$"))
      ) {
        return null;
      }

      // Skip divs that contain FAQ content (these are rendered by FAQ component)
      const divContentStr = Array.isArray(content)
        ? content.join("")
        : String(content);
      const lowerDivContent = divContentStr.toLowerCase();

      if (
        lowerDivContent.includes("frequently asked questions") ||
        (lowerDivContent.includes("what types of") &&
          lowerDivContent.length > 100) ||
        (lowerDivContent.includes("how fast can") &&
          lowerDivContent.length > 100) ||
        (lowerDivContent.includes("do i need to worry") &&
          lowerDivContent.length > 100)
      ) {
        return null;
      }

      return (
        <span key={key} {...attributes}>
          {content}
        </span>
      );

    default:
      return null;
  }
};

interface RenderRandomContentProps {
  nodes: ScrapedNode[];
}

export default function RenderRandomContent({
  nodes,
}: RenderRandomContentProps) {
  const processed = preprocessNodes(nodes || []);
  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < processed.length) {
    const current = processed[i];

    // Standard list item grouping
    if (current.tag === "li") {
      const listItems: ProcessedNode[] = [];
      while (i < processed.length && processed[i].tag === "li") {
        listItems.push(processed[i]);
        i++;
      }

      result.push(
        <ul key={`ul-${i}`} className="list-disc list-inside my-4 space-y-2">
          {listItems.map((child, idx) => renderNode(child, idx))}
        </ul>,
      );
      continue;
    }

    // Skip UL if found alone
    if (current.tag === "ul") {
      i++;
      continue;
    }

    // Default rendering
    result.push(renderNode(current, i));
    i++;
  }

  return <>{result}</>;
}
