'use client';

import { Input } from '@/components/forms/input';
import { Button } from '@/components/ui/button';
import { Blog, CreateBlogInput } from '@/types/blog';
import { useEffect, useState } from 'react';

interface BlogFormProps {
  blog?: Blog;
  onSubmit: (data: CreateBlogInput) => Promise<void>;
  onCancel?: () => void;
}

const initialFormData: CreateBlogInput = {
  title: '',
  description: '',
  published: false,
  author: '',
};

export function BlogForm({ blog, onSubmit, onCancel }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateBlogInput>(() =>
    blog
      ? {
          title: blog.title,
          description: blog.description,
          published: blog.published,
          author: blog.author || '',
        }
      : {
          title: '',
          description: '',
          published: false,
          author: '',
        }
  );

  useEffect(() => {
    setFormData(
      blog
        ? {
            title: blog.title,
            description: blog.description,
            published: blog.published,
            author: blog.author || '',
          }
        : {
            title: '',
            description: '',
            published: false,
            author: '',
          }
    );
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      if (!blog) {
        setFormData(initialFormData);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Title"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        required
        minLength={3}
        placeholder="Enter blog title"
      />

      <Input
        label="Author"
        value={formData.author || ''}
        onChange={e => setFormData({ ...formData, author: e.target.value })}
        placeholder="Author name"
      />

      <div>
        <label className="text-foreground mb-2 block text-sm font-medium">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          minLength={10}
          placeholder="Brief description of your blog"
          rows={4}
          className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={formData.published}
          onChange={e =>
            setFormData({ ...formData, published: e.target.checked })
          }
          className="text-primary border-border focus:ring-primary h-5 w-5 rounded focus:ring-2"
        />
        <span className="text-foreground text-sm font-medium">
          Publish immediately
        </span>
      </label>

      <div className="border-border flex gap-3 border-t pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : blog ? 'Update Blog' : 'Create Blog'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="primary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
