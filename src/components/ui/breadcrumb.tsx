import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav className="text-dark-blue flex items-center space-x-1 text-sm">
    {items.map((item, index) => {
      const isLast = index === items.length - 1;
      return (
        <div key={index} className="flex items-center tracking-wider uppercase">
          {item.href ? (
            <Link href={item.href} className="font-bold hover:text-gray-900">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
          {!isLast && <span className="ml-1">/</span>}
        </div>
      );
    })}
  </nav>
);
