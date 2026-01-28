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

const FALLBACK_IMAGE = '/images/Blog/article-meal.jpg';
const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

export function BlogCard({
  blog,
  onEdit,
  onDelete,
  showActions = false,
}: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <article
      className="overflow-hidden transition-all duration-300"
      aria-labelledby={`blog-title-${blog.id}`}
    >
      <figure className="relative mb-2.5 aspect-4/3 min-h-56 overflow-hidden bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 animate-pulse bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
        )}
        <Image
          src={imageError ? FALLBACK_IMAGE : blog.bannerImage || FALLBACK_IMAGE}
          alt={`Banner image for blog post: ${blog.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </figure>

      <header className="text-left">
        <Link
          href={`/blog/${blog.id}`}
          className="block"
          aria-label={`Read full blog post: ${blog.title}`}
        >
          <h3
            id={`blog-title-${blog.id}`}
            className="text-dark-blue mb-2 line-clamp-2 text-xl font-semibold transition-colors hover:opacity-80"
          >
            {blog.title}
          </h3>
        </Link>

        <p className="text-secondary mb-3 line-clamp-4 text-base leading-normal tracking-wider">
          {blog.description}
        </p>

        <address className="line-clamp-1 text-sm font-medium text-black not-italic">
          By {blog.author || 'Anonymous'}
        </address>
      </header>

      {showActions && onEdit && onDelete && (
        <footer className="border-t p-4">
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
