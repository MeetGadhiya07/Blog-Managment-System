'use client';

import { Input } from '@/components/forms/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/lib/hooks/useToast';
import SVGIcon from '@/lib/SVGIcons/Icon';
import { iconSet } from '@/lib/SVGIcons/iconUtility';
import { CreateCommentInput } from '@/types/blog';
import { memo, useCallback, useMemo, useState, useTransition } from 'react';
import { z } from 'zod';

interface BlogCommentFormProps {
  onSubmit?: (comment: CreateCommentInput) => void;
}

const commentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  rating: z.number().min(1, 'Please select a rating').max(5),
});

const RATING_OPTIONS = [
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
] as const;

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  comment: '',
  rating: 5,
};

const BlogCommentForm = memo(({ onSubmit }: BlogCommentFormProps) => {
  const [formData, setFormData] = useState<CreateCommentInput>(INITIAL_FORM_DATA);
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();
  const { addToast } = useToast();

  const validateField = useCallback((name: string, value: string | number) => {
    try {
      const fieldSchema = commentSchema.shape[name as keyof typeof commentSchema.shape];
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [name]: '' }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.issues[0]?.message || '' }));
        return false;
      }
      return false;
    }
  }, []);

  const validateForm = useCallback(() => {
    try {
      commentSchema.parse(formData);
      setErrors({});
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
  }, [formData]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouchedFields((prev) => ({ ...prev, [name]: true }));
      validateField(name, value);
    },
    [validateField],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error on change if field was touched
      setErrors((prev) => ({ ...prev, [name]: '' }));
    },
    [],
  );

  const handleRatingSelect = useCallback(
    (rating: number) => {
      setSelectedRating(rating);
      setFormData((prev) => ({ ...prev, rating }));
      setTouchedFields((prev) => ({ ...prev, rating: true }));
      validateField('rating', rating);
    },
    [validateField],
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setSelectedRating(5);
    setErrors({});
    setTouchedFields({});
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      startTransition(() => {
        try {
          onSubmit?.(formData);
          addToast('Comment submitted successfully!', 'success');
          resetForm();
        } catch (error) {
          console.error('Error submitting comment:', error);
          addToast('Failed to submit comment. Please try again.', 'error');
        }
      });
    },
    [formData, validateForm, onSubmit, addToast, resetForm],
  );

  const isFormValid = useMemo(() => {
    try {
      commentSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  }, [formData]);

  const isFormDirty = useMemo(
    () =>
      formData.name !== '' ||
      formData.email !== '' ||
      formData.comment !== '' ||
      formData.rating !== 5,
    [formData],
  );

  return (
    <section aria-labelledby="comment-form-heading">
      <h4
        id="comment-form-heading"
        className="mb-7.5 flex items-center gap-2 pt-7.5 text-xl font-semibold text-black"
      >
        <span className="h-2.5 w-1 rounded-full bg-black" aria-hidden="true" />
        Add a comment
      </h4>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Left Column - Name & Email */}
          <div className="space-y-3.5">
            <div>
              <Input
                label="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touchedFields.name && !!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
              {touchedFields.name && errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.name}
                </p>
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
                aria-invalid={touchedFields.email && !!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {touchedFields.email && errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Comment */}
          <div>
            <label
              htmlFor="comment"
              className="text-foreground mb-3 block text-base font-medium tracking-wide"
            >
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Write your comment..."
              rows={5}
              className={`focus:ring-grey bg-grey w-full resize-none rounded-lg border-none px-4 py-2.5 transition-all focus:border-transparent focus:ring-2 ${
                touchedFields.comment && errors.comment ? 'ring-2 ring-red-500' : ''
              }`}
              aria-invalid={touchedFields.comment && !!errors.comment}
              aria-describedby={errors.comment ? 'comment-error' : undefined}
              required
            />
            {touchedFields.comment && errors.comment && (
              <p id="comment-error" className="mt-1 text-sm text-red-500" role="alert">
                {errors.comment}
              </p>
            )}
          </div>
        </div>

        {/* Rating & Submit Section */}
        <div className="flex flex-col gap-4 md:flex-row lg:items-center lg:gap-6">
          <div
            className="bg-grey flex flex-col items-center justify-between gap-y-3.5 rounded-lg p-4 sm:flex-row sm:p-1 md:w-[calc(100%-138px)]"
            role="group"
            aria-labelledby="rating-label"
          >
            <p id="rating-label" className="text-base font-medium tracking-wide text-black">
              Rate the usefulness of the article
            </p>
            <div className="flex flex-wrap gap-1" role="radiogroup" aria-labelledby="rating-label">
              {RATING_OPTIONS.map((item) => (
                <button
                  key={item.rating}
                  type="button"
                  onClick={() => handleRatingSelect(item.rating)}
                  role="radio"
                  aria-checked={selectedRating === item.rating}
                  aria-label={`Rate ${item.label} - ${item.rating} out of 5`}
                  className={`flex h-10 transform cursor-pointer items-center justify-center overflow-hidden transition-all duration-300 ease-in-out ${
                    selectedRating === item.rating
                      ? `${item.bgColor} min-w-fit gap-2 rounded-xl px-4 text-white shadow-lg hover:opacity-85`
                      : `w-10 rounded-full hover:bg-gray-100 hover:shadow-md ${item.textColor}`
                  }`}
                >
                  <SVGIcon
                    name={item.name as keyof typeof iconSet}
                    className={`transition-colors duration-300 ${selectedRating === item.rating ? 'text-white' : item.textColor}`}
                  />
                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      selectedRating === item.rating ? 'max-w-20 opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="w-full self-end px-6 py-2.5 text-base disabled:cursor-not-allowed disabled:opacity-50 md:w-auto lg:self-auto"
            disabled={!isFormValid || !isFormDirty || isPending}
            aria-label={isPending ? 'Sending comment' : 'Send comment'}
          >
            <SVGIcon name="messageIcon" />
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </div>

        {touchedFields.rating && errors.rating && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {errors.rating}
          </p>
        )}
      </form>
    </section>
  );
});

BlogCommentForm.displayName = 'BlogCommentForm';

export default BlogCommentForm;
