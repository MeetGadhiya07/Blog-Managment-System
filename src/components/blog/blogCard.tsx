'use client';
import { Button } from '@/components/ui/button';
import { Blog } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface BlogCardProps {
  blog: Blog;
  onEdit?: (blog: Blog) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export function BlogCard({ blog, onEdit, onDelete, showActions = false }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <article
      className="overflow-hidden transition-all duration-300"
      aria-labelledby={`blog-title-${blog.id}`}
    >
      {/* Image */}
      <figure
        className="relative mb-2.5 aspect-4/3 min-h-56 overflow-hidden bg-gray-100"
        role="img"
        aria-label={`Banner image for ${blog.title}`}
      >
        {imageLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
            aria-label="Loading image"
          >
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
              role="status"
              aria-label="Loading"
            ></div>
          </div>
        )}
        <Image
          src={
            imageError
              ? '/images/Blog/article-meal.jpg'
              : blog.bannerImage || '/images/Blog/article-meal.jpg'
          }
          alt={`Banner image for blog post: ${blog.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </figure>

      {/* Content */}
      <header className="text-left">
        <Link
          href={`/blogs/${blog.id}`}
          className="block"
          prefetch={true}
          aria-label={`Read full blog post: ${blog.title}`}
        >
          <h3
            id={`blog-title-${blog.id}`}
            className="text-dark-blue mb-2 line-clamp-2 text-xl font-semibold transition-colors hover:opacity-80"
          >
            {blog.title}
          </h3>
        </Link>

        <p
          className="text-secondary mb-3 line-clamp-4 text-base leading-normal tracking-wider"
          aria-label="Blog description"
        >
          {blog.description}
        </p>

        <address
          className="line-clamp-1 text-sm font-medium text-black not-italic"
          aria-label="Blog author"
        >
          By {blog.author || 'Anonymous'}
        </address>
      </header>

      {showActions && onEdit && onDelete && (
        <footer className="border-t p-4" role="group" aria-label="Blog actions">
          <div className="flex gap-2">
            <Button
              onClick={() => onEdit(blog)}
              size="sm"
              aria-label={`Edit blog post: ${blog.title}`}
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(blog.id)}
              size="sm"
              aria-label={`Delete blog post: ${blog.title}`}
            >
              Delete
            </Button>
          </div>
        </footer>
      )}
    </article>
  );
}
