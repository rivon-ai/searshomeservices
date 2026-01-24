import React from "react";
import Link from "next/link";
import Image from "next/image";

interface RichTextNode {
  type: string;
  value?: string;
  children?: RichTextNode[];
  src?: string;
  alt?: string;
  href?: string;
}

export interface SlugRichTextRendererProps {
  content: RichTextNode[];
}

const RichTextContent: React.FC<{ node: RichTextNode }> = ({ node }) => {
  switch (node.type) {
    case "text":
      return <>{node.value}</>;

    case "paragraph":
      return (
        <p className="mb-4 text-gray-600 leading-relaxed text-lg">
          {node.children?.map((child, i) => (
            <RichTextContent key={i} node={child} />
          ))}
        </p>
      );

    case "heading-3":
      return (
        <h3 className="text-2xl font-bold text-[#002B5C] mb-4 mt-8">
          {node.children?.map((child, i) => (
            <RichTextContent key={i} node={child} />
          ))}
        </h3>
      );

    case "heading-4":
      return (
        <h4 className="text-xl font-bold text-[#002B5C] mb-3 mt-6">
          {node.children?.map((child, i) => (
            <RichTextContent key={i} node={child} />
          ))}
        </h4>
      );

    case "image":
      if (!node.src) return null;
      return (
        <div className="relative w-full h-64 md:h-80 my-8 rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={node.src}
            alt={node.alt || "Content image"}
            fill
            className="object-cover"
          />
        </div>
      );

    case "list":
      return (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
          {node.children?.map((child, i) => (
            <RichTextContent key={i} node={child} />
          ))}
        </ul>
      );

    case "list-item":
      return (
        <li>
          {node.children?.map((child, i) => (
            <RichTextContent key={i} node={child} />
          ))}
        </li>
      );

    case "link":
      return (
        <Link
          href={node.href || "#"}
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          {node.children?.map((child, i) => (
            <RichTextContent key={i} node={child} />
          ))}
        </Link>
      );

    default:
      console.warn("Unknown Rich Text Node:", node.type);
      return null;
  }
};

export default function SlugRichTextRenderer({
  content,
}: SlugRichTextRendererProps) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="rich-text-container">
      {content.map((node, index) => (
        <RichTextContent key={index} node={node} />
      ))}
    </div>
  );
}
