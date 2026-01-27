'use client';

import { BlogCard } from '@/components/blog/blogCard';
import { Blog } from '@/types/blog';
import { ArrowRight, CheckCircle, FileEdit, FileText } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBlogs } from '../blogs/actions';

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  const stats = [
    {
      label: 'Total Blogs',
      value: blogs.length,
      icon: FileText,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Published',
      value: blogs.filter((b) => b.published).length,
      icon: CheckCircle,
      color: 'text-success',
      bg: 'bg-success-light',
    },
    {
      label: 'Drafts',
      value: blogs.filter((b) => !b.published).length,
      icon: FileEdit,
      color: 'text-secondary',
      bg: 'bg-muted',
    },
  ];

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-foreground text-2xl font-bold sm:text-3xl">Dashboard Overview</h1>
        <p className="text-secondary mt-1 text-sm sm:text-base">
          {` Welcome back! Here's your blog statistics`}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="border-border rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary mb-1 text-xs font-medium sm:text-sm">{stat.label}</p>
                  <p className="text-foreground text-3xl font-bold sm:text-4xl">{stat.value}</p>
                </div>
                <div className={`${stat.bg} ${stat.color} rounded-lg p-3 sm:p-4`}>
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-border rounded-lg border bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <h2 className="text-foreground text-lg font-semibold sm:text-xl">Recent Blogs</h2>
          <Link
            href="/blogs"
            className="text-primary hover:text-primary-hover flex items-center gap-2 text-sm font-medium transition-colors sm:text-base"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogs.slice(0, 4).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center sm:py-12">
            <FileText className="text-muted-dark mx-auto mb-3 h-10 w-10 sm:h-12 sm:w-12" />
            <p className="text-secondary text-sm sm:text-base">
              No blogs yet. Create your first blog post!
            </p>
            <Link
              href="/blogs"
              className="bg-primary hover:bg-primary-hover mt-4 inline-block rounded-lg px-4 py-2 text-sm text-white transition-colors sm:text-base"
            >
              Create Blog
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
