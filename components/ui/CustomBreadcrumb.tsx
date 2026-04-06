import React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export interface BreadcrumbItemProps {
    label: string;
    href?: string;
}

interface CustomBreadcrumbProps {
    readonly items: BreadcrumbItemProps[];
}

export default function CustomBreadcrumb({ items }: CustomBreadcrumbProps) {
    return (
        <nav
            className="flex items-center text-sm text-gray-500 mb-6"
            aria-label="Breadcrumb"
        >
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-blue-600 flex items-center">
                        <Home size={16} />
                    </Link>
                </li>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const key = item.href ? item.href : `breadcrumb-${index}`;

                    return (
                        <React.Fragment key={key}>
                            <li>
                                <ChevronRight size={16} className="text-gray-400" />
                            </li>

                            {isLast ? (
                                <li className="text-gray-900 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] sm:max-w-none">
                                    {item.label}
                                </li>
                            ) : (
                                <li>
                                    <Link href={item.href || "#"} className="hover:text-blue-600">
                                        {item.label}
                                    </Link>
                                </li>
                            )}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}
