import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function BlogBreadcrumbs({ items, className = "" }: BlogBreadcrumbsProps) {
  return (
    <nav
      className={`flex items-center text-sm text-gray-500 mb-6 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="hover:text-blue-600 flex items-center transition-colors"
          >
            <Home size={16} />
          </Link>
        </li>
        <li>
          <ChevronRight size={14} className="text-gray-400" />
        </li>
        <li>
          <Link
            href="/blog"
            className="hover:text-blue-600 transition-colors"
          >
            Resource Center
          </Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <ChevronRight size={14} className="text-gray-400" />
            </li>
            <li className="flex items-center">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors capitalize"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium cursor-default capitalize">
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
