'use client';

import { BlogForm, BlogList } from '@/components/blog';
import { Button } from '@/components/ui/button';
import { Blog, CreateBlogInput } from '@/types/blog';
import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createBlog, deleteBlog, getBlogs, updateBlog } from './actions';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      setError('Failed to load blogs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleCreate = async (data: CreateBlogInput) => {
    setError(null);
    const result = await createBlog(data);
    if (result.success) {
      setShowForm(false);
      await loadBlogs();
    } else {
      setError(result.error || 'Failed to create blog');
    }
  };

  const handleUpdate = async (data: CreateBlogInput) => {
    if (!editingBlog) return;
    setError(null);
    const result = await updateBlog({ ...data, id: editingBlog.id });
    if (result.success) {
      setEditingBlog(null);
      await loadBlogs();
    } else {
      setError(result.error || 'Failed to update blog');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    setError(null);
    const result = await deleteBlog(id);
    if (result.success) {
      await loadBlogs();
    } else {
      setError(result.error || 'Failed to delete blog');
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowForm(true);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-secondary text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="border-border mb-4 rounded-lg border bg-white p-4 shadow-sm sm:mb-6 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-foreground text-2xl font-bold sm:text-3xl">Blog Management</h1>
            <p className="text-secondary mt-1 text-sm sm:text-base">
              Create and manage your blog posts
            </p>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingBlog(null);
              setError(null);
            }}
            className="flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            {showForm ? (
              <>
                <X size={18} />
                Cancel
              </>
            ) : (
              <>
                <Plus size={18} />
                Add New Blog
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-error-light border-error text-error mb-4 rounded-lg border p-4 text-sm sm:mb-6 sm:text-base">
          {error}
        </div>
      )}

      {(showForm || editingBlog) && (
        <div className="border-border mb-4 rounded-lg border bg-white p-4 shadow-sm sm:mb-6 sm:p-6">
          <h2 className="text-foreground mb-4 text-lg font-semibold sm:text-xl">
            {editingBlog ? 'Edit Blog' : 'Create New Blog'}
          </h2>
          <BlogForm
            blog={editingBlog || undefined}
            onSubmit={editingBlog ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingBlog(null);
              setError(null);
            }}
          />
        </div>
      )}

      <div className="border-border rounded-lg border bg-white p-4 shadow-sm sm:p-6">
        <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} showActions />
      </div>
    </>
  );
}
