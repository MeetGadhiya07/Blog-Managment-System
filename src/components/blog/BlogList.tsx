import { Blog } from '@/types/blog';
import clsx from 'clsx';
import { BlogCard } from './blogCard';

interface BlogListProps {
  blogs: Blog[];
  onEdit?: (blog: Blog) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  showTitle?: boolean;
  className?: string;
}

export const BlogList = ({
  blogs,
  onEdit,
  onDelete,
  showActions,
  showTitle = false,
  className,
}: BlogListProps) => {
  if (blogs.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p className="text-lg">No blogs found</p>
      </div>
    );
  }

  return (
    <section className="bg-muted-dark px-4 py-8 sm:px-7.5 sm:py-12 lg:py-16">
      <div className={clsx('mx-auto max-w-278.5 text-center', className)}>
        {!showTitle && (
          <h2 className="text-dark-blue mb-8 text-[clamp(1.75rem,1.481rem+1.2658vw,3rem)] leading-normal font-semibold sm:mb-12 lg:mb-16">
            Related articles
          </h2>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={onEdit}
              onDelete={onDelete}
              showActions={showActions}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
