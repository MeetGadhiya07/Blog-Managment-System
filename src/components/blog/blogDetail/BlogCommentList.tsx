'use client';

import StarRating from '@/components/ui/StarRating';
import { Comment } from '@/types/blog';
import Image from 'next/image';
import { useState } from 'react';

const mockComments: Comment[] = [
  {
    id: '1',
    name: 'Kang Haerin',
    email: 'kang@example.com',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum ...',
    rating: 5,
    createdAt: '2022-07-22',
  },
  {
    id: '2',
    name: 'Kang Haerin',
    email: 'kang@example.com',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum ...',
    rating: 5,
    createdAt: '2022-07-22',
  },
];

const BlogCommentList = () => {
  const [imageStates, setImageStates] = useState<
    Record<string, { loading: boolean; error: boolean }>
  >(
    mockComments.reduce(
      (acc, guide) => ({ ...acc, [guide.id]: { loading: true, error: false } }),
      {}
    )
  );

  return (
    <>
      <h4 className="mb-7.5 flex items-center gap-2 text-xl font-semibold text-black md:pt-7.5">
        <span className="h-2.5 w-1 rounded-full bg-black"></span>
        Comments
      </h4>

      <div className="space-y-6">
        {mockComments.map((comment, index) => (
          <div
            key={comment.id}
            className={`${index !== mockComments.length - 1 ? 'border-b border-b-[#DEDEDE] pb-5' : ''} flex items-center gap-5`}
          >
            <div className="relative h-15 w-15 shrink-0 overflow-hidden rounded-full">
              {imageStates[comment.id]?.loading && (
                <div className="absolute inset-0 animate-pulse bg-gray-200" />
              )}
              <Image
                src="/images/Blog/kang-haerin.png"
                alt="Kang Haerin"
                fill
                className="scale-150 object-cover object-top"
                sizes="120px"
                quality={95}
                priority={index === 0}
                onLoad={() =>
                  setImageStates(prev => ({
                    ...prev,
                    [comment.id]: { loading: false, error: false },
                  }))
                }
                onError={() =>
                  setImageStates(prev => ({
                    ...prev,
                    [comment.id]: { loading: false, error: true },
                  }))
                }
              />
            </div>

            <div className="flex-1 space-y-2">
              <h4 className="text-foreground mb-2.5 cursor-pointer text-base hover:opacity-80">
                {comment.name}
              </h4>
              <div className="mb-2.5 flex items-center gap-2.5">
                <StarRating rating={comment.rating} readonly size={16} />
                <span className="text-sm text-[#121212]">
                  ({comment.rating}.0)
                </span>
              </div>

              <p className="mb-2.5 text-sm text-[#757575]">
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>

              <p className="line-clamp-4 text-base tracking-wide text-gray-700 md:line-clamp-2">
                {comment.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogCommentList;
