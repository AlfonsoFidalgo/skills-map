"use client";

import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link
        href="/"
        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
      >
        <HomeIcon className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
