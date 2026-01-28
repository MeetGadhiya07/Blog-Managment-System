import { Breadcrumb } from '../ui/breadcrumb';

interface BlogHeaderProps {
  title: string;
  breadcrumbItems?: { label: string; href?: string }[];
}

const DEFAULT_BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Articles' },
];

export const BlogHeader = ({
  title,
  breadcrumbItems = DEFAULT_BREADCRUMBS,
}: BlogHeaderProps) => (
  <section className="px-4 py-12 text-center md:px-7.5 md:py-16">
    <div className="mb-1 flex justify-center">
      <Breadcrumb items={breadcrumbItems} />
    </div>
    <h1 className="text-dark-blue text-[clamp(1.75rem,1.481rem+1.2658vw,3rem)] leading-normal font-semibold">
      {title}
    </h1>
  </section>
);
