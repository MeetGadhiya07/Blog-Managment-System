'use client';

import { Input } from '@/components/forms/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/lib/hooks/useToast';
import SVGIcon from '@/lib/SVGIcons/Icon';
import { iconSet } from '@/lib/SVGIcons/iconUtility';
import { CreateCommentInput } from '@/types/blog';
import { useState, useTransition } from 'react';
import { z } from 'zod';

interface BlogCommentFormProps {
  onSubmit?: (comment: CreateCommentInput) => void;
}

const commentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  rating: z.number().min(1, 'Please select a rating'),
});

const BlogCommentForm = ({ onSubmit }: BlogCommentFormProps) => {
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ name: '', email: '', comment: '', rating: 5 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const { addToast } = useToast();

  const validateField = (name: string, value: string | number) => {
    try {
      const fieldSchema = commentSchema.shape[name as keyof typeof commentSchema.shape];
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [name]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.issues[0]?.message || '' }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateForm = () => {
    try {
      commentSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
        setTouchedFields({ name: true, email: true, comment: true, rating: true });
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      startTransition(() => {
        console.log('Submitting comment with data:', formData);
        addToast('Comment submitted successfully!', 'success');
        onSubmit?.(formData);
        setFormData({ name: '', email: '', comment: '', rating: 5 });
        setSelectedRating(5);
        setErrors({});
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    setFormData((prev) => ({ ...prev, rating }));
    setTouchedFields((prev) => ({ ...prev, rating: true }));
    validateField('rating', rating);
  };

  const isFormValid = () => {
    try {
      commentSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  };

  const isFormDirty = Object.values(formData).some((value) => value !== '' && value !== 0);

  return (
    <>
      <h4 className="mb-7.5 flex items-center gap-2 pt-7.5 text-xl font-semibold text-black">
        <span className="h-2.5 w-1 rounded-full bg-black"></span>
        Add a comment
      </h4>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-3.5">
            <div>
              <Input
                label="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touchedFields.name && errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.email && errors.email ? 'border-red-500' : ''}
              />
              {touchedFields.email && errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-foreground mb-3 block text-base font-medium tracking-wide">
              Comment
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Write your comment..."
              rows={5}
              className={`focus:ring-grey bg-grey w-full resize-none rounded-lg border-none px-4 py-2.5 transition-all focus:border-transparent focus:ring-2 ${
                touchedFields.comment && errors.comment ? 'border-red-500' : ''
              }`}
            />
            {touchedFields.comment && errors.comment && (
              <p className="mt-1 text-sm text-red-500">{errors.comment}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row lg:items-center lg:gap-6">
          <div className="bg-grey flex flex-col items-center justify-between gap-y-3.5 rounded-lg sm:flex-row md:w-[calc(100%-138px)] lg:p-1">
            <p className="text-base font-medium tracking-wide text-black">
              Rate the usefulness of the article
            </p>
            <div className="flex flex-wrap gap-1">
              {[
                {
                  name: 'bedIcon',
                  rating: 1,
                  label: 'Bad',
                  bgColor: 'bg-[#FF0412]',
                  textColor: 'text-[#FF0412]',
                },
                {
                  name: 'averageIcon',
                  rating: 2,
                  label: 'Average',
                  bgColor: 'bg-[#FF6700]',
                  textColor: 'text-[#FF6700]',
                },
                {
                  name: 'normalIcon',
                  rating: 3,
                  label: 'Normal',
                  bgColor: 'bg-[#FFB416]',
                  textColor: 'text-[#FFB416]',
                },
                {
                  name: 'niceIcon',
                  rating: 4,
                  label: 'Nice',
                  bgColor: 'bg-[#1C9AF4]',
                  textColor: 'text-[#1C9AF4]',
                },
                {
                  name: 'goodIcon',
                  rating: 5,
                  label: 'Good',
                  bgColor: 'bg-[#00BA5C]',
                  textColor: 'text-[#00BA5C]',
                },
              ].map((item) => (
                <button
                  key={item.rating}
                  type="button"
                  onClick={() => handleRatingSelect(item.rating)}
                  className={`flex h-10 transform cursor-pointer items-center justify-center transition-all duration-300 ease-in-out ${
                    selectedRating === item.rating
                      ? `${item.bgColor} min-w-fit scale-105 gap-2 rounded-xl px-4 text-white shadow-lg hover:opacity-85`
                      : `w-10 rounded-full hover:bg-gray-100 hover:shadow-md active:scale-95 ${item.textColor}`
                  }`}
                >
                  <SVGIcon
                    name={item.name as keyof typeof iconSet}
                    className={` ${selectedRating === item.rating ? 'text-white' : item.textColor}`}
                  />
                  {selectedRating === item.rating && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="w-full self-end px-6 py-2.5 text-base md:w-auto lg:self-auto"
            disabled={!isFormValid() || !isFormDirty || isPending}
          >
            <SVGIcon name="messageIcon" />
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </div>

        {touchedFields.rating && errors.rating && (
          <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
        )}
      </form>
    </>
  );
};

export default BlogCommentForm;
