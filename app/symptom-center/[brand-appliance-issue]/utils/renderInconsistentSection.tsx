import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SymptomNode } from "@/app/utils/symptom-data";
import { cn } from "@/lib/utils";

/**
 * Utility function to render inconsistent sections dynamically
 * Handles various transformations including:
 * - Strong tags merged with parent content
 * - List styling with proper bullets
 * - Iframe insertion for video paragraphs
 * - Image rendering with Next.js Image component
 * - Link conversion to Next.js Link components
 */

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

// Merge consecutive nodes when they form a single logical element
const mergeNodes = (nodes: SymptomNode[]): SymptomNode[] => {
  const merged: SymptomNode[] = [];
  let i = 0;

  while (i < nodes.length) {
    const current = nodes[i];

    // Check if this is a paragraph followed by strong tags
    if (current.tag === "p") {
      let content = current.content;
      const strongTags: string[] = [];
      let j = i + 1;

      // Collect consecutive strong tags
      while (j < nodes.length && nodes[j].tag === "strong") {
        strongTags.push(nodes[j].content);
        j++;
      }

      // Check if next is also a paragraph (continuation)
      if (j < nodes.length && nodes[j].tag === "p") {
        content += " " + nodes[j].content;
        j++;
      }

      // If we found strong tags, merge them
      if (strongTags.length > 0) {
        merged.push({
          ...current,
          content,
          children: strongTags.map((text, idx) => ({
            tag: "strong",
            content: text,
            attributes: {},
            order: idx,
          })),
        });
        i = j;
        continue;
      }
    }

    merged.push(current);
    i++;
  }

  return merged;
};

// Render individual node with proper transformations
export const renderNode = (
  node: SymptomNode,
  index: number,
): React.ReactNode => {
  if (!node) return null;

  const attributes = transformAttributes(node.attributes);
  const key = `node-${index}-${node.order}`;

  switch (node.tag) {
    case "h2":
      return (
        <h2
          key={key}
          {...attributes}
          className={cn(
            attributes.className,
            "text-2xl font-semibold text-blue-950 mb-5 leading-8",
          )}
        >
          {node.content}
        </h2>
      );

    case "h3":
      return (
        <h4
          key={key}
          {...attributes}
          className={cn(
            attributes.className,
            "text-xl font-semibold text-gray-500 leading-8 my-[1.375rem]",
          )}
        >
          {node.content}
        </h4>
      );

    case "h4":
      return (
        <h4
          key={key}
          {...attributes}
          className={cn(
            attributes.className,
            "text-xl text-blue-950 font-semibold my-2 leading-8",
          )}
        >
          {node.content}
        </h4>
      );

    case "p":
      const hasVideoPhrase = containsVideoPhrase(node.content);
      const videoId = hasVideoPhrase ? extractYouTubeId(node.content) : null;

      // Render paragraph with potential strong children
      const renderParagraphContent = () => {
        if (node.children && node.children.length > 0) {
          // Split content and interleave with strong tags
          const parts: React.ReactNode[] = [];
          const contentParts = node.content.split(/\s+/);
          let childIndex = 0;

          contentParts.forEach((part, idx) => {
            parts.push(part + " ");
            if (childIndex < node.children!.length) {
              parts.push(
                <strong key={`strong-${idx}`} className="font-bold text-xl">
                  {node.children![childIndex].content}
                </strong>,
              );
              parts.push(" ");
              childIndex++;
            }
          });
          return parts;
        }
        return node.content;
      };

      return (
        <React.Fragment key={key}>
          <p
            {...attributes}
            className={cn(
              attributes.className,
              "leading-7 text-gray-500 my-[1.125rem]",
            )}
          >
            {renderParagraphContent()}
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
      return (
        <ul
          key={key}
          {...attributes}
          className={cn(
            attributes.className,
            "list-disc list-inside my-4 space-y-2",
          )}
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </ul>
      );

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
          {node.content}
        </li>
      );

    case "strong":
      return (
        <strong
          key={key}
          {...attributes}
          className={attributes.className || "font-bold text-xl"}
        >
          {node.content}
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
            "hover:underline hover:underline-offset-4 text-blue-200 focus:outline-blue-200 text-xl leading-6 font-normal"
          }
        >
          {node.content}
        </Link>
      );

    case "img":
      // Extract src from content if it's in the format "[IMAGE] Alt: ... | Src: ..."
      const srcMatch = node.content.match(/Src:\s*(\S+)/);
      const altMatch = node.content.match(/Alt:\s*([^|]+)/);
      const imgSrc = srcMatch ? srcMatch[1] : attributes.src || "";
      const imgAlt = altMatch ? altMatch[1].trim() : attributes.alt || "Image";

      if (!imgSrc) return null;

      // Use standard img tag for external URLs to avoid Next.js image configuration issues
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
              width={attributes.width || 578}
              height={attributes.height || 450}
              className={attributes.className || "rounded-md w-full"}
            />
          )}
        </div>
      );

    case "button":
      const isScheduleNow = node.content.toLowerCase().includes("schedule now");
      if (isScheduleNow) {
        return (
          <div key={key} className="flex justify-center my-8">
            <button
              {...attributes}
              className={cn(
                "bg-yellow-600  hover:bg-yellow-700 text-blue-200 hover:bg-yellow-100 focus:outline-yellow-200 focus:outline-4 disabled:bg-gray-200 disabled:text-gray-500 px-6 rounded-lg w-full text-xl py-3.5 font-semibold mt-3 shadow-scheduler !hover:no-underline",
                attributes.className,
              )}
            >
              {node.content}
            </button>
          </div>
        );
      }
      return (
        <button
          key={key}
          {...attributes}
          className={cn(
            "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors",
            attributes.className,
          )}
        >
          {node.content}
        </button>
      );

    case "div":
    case "span":
      // Skip divs and spans that are just structural
      if (!node.content || node.content === "$" || node.content === "/$") {
        return null;
      }

      const isSpanScheduleNow = node.content
        .toLowerCase()
        .includes("schedule now");
      if (isSpanScheduleNow) {
        return (
          <div key={key} className="flex justify-center my-8 px-24">
            <button
              {...attributes}
              className={cn(
                "bg-[#FFCD00] hover:bg-[#FFCD00]/90 text-blue-800 disabled:bg-gray-200 disabled:text-gray-500 px-6 rounded-lg w-full text-xl py-3 font-semibold mt-3 shadow-[0_0_20px_-8px_rgba(0,0,0,0.18)] !hover:no-underline cursor-pointer",
                attributes.className,
              )}
            >
              {node.content}
            </button>
          </div>
        );
      }

      return (
        <span key={key} {...attributes}>
          {node.content}
        </span>
      );

    default:
      return null;
  }
};

/**
 * Main function to render an array of nodes representing an inconsistent section
 */
export const renderInconsistentSection = (
  nodes: SymptomNode[],
): React.ReactNode[] => {
  // Pre-process nodes to merge related elements
  const processedNodes = mergeNodes(nodes);

  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < processedNodes.length) {
    const current = processedNodes[i];

    // Standard list item grouping (existing logic)
    if (current.tag === "li") {
      const listItems: SymptomNode[] = [];
      const startIndex = i;
      while (i < processedNodes.length && processedNodes[i].tag === "li") {
        listItems.push(processedNodes[i]);
        i++;
      }

      result.push(
        <ul
          key={`ul-${startIndex}`}
          className="list-disc list-inside my-4 space-y-2"
        >
          {listItems.map((child, idx) => renderNode(child, idx + startIndex))}
        </ul>,
      );
      continue;
    }

    // Default rendering
    result.push(renderNode(current, i));
    i++;
  }

  return result;
};
