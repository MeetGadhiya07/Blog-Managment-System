import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="text-dark-blue flex items-center space-x-1 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center tracking-wider uppercase">
          {item.href ? (
            <Link href={item.href} className="font-bold hover:text-gray-900">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="ml-1">/</span>}
        </div>
      ))}
    </nav>
  );
};
