import { Blog } from '@/types/blog';
import Image from 'next/image';

interface BlogDataProps {
  blog: Blog;
}

const BlogData = ({ blog }: BlogDataProps) => {
  if (!blog) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .toUpperCase();
  };

  return (
    <>
      {/* Author and Date Header */}
      <header className="mb-8 flex items-center justify-between gap-1 border-b border-b-[#E5E6EA] py-6">
        <div className="flex items-center gap-2.5 rounded-full">
          <Image
            src="/images/Blog/alex-carter.jpg"
            alt={blog.author || 'Author'}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-base font-semibold tracking-wide text-[#4E5265] uppercase">
            {blog.author || 'Anonymous'}
          </span>
        </div>

        <span className="text-base font-semibold text-[#4E5265]">{formatDate(blog.createdAt)}</span>
      </header>

      {/* Blog Content */}
      <div className="prose prose-gray max-w-none">
        <p className="text-navy mb-8 tracking-wide">{blog.description}</p>

        <p className="text-navy mb-8 tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus
        </p>

        <p className="text-navy mb-8 tracking-wide">
          mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat
          massa quis enim.
        </p>

        <p className="text-navy mb-6 tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus
        </p>

        <blockquote className="my-6 border-t border-b border-t-[#E5E6EA] border-b-[#E5E6EA] py-4 pr-4 pl-4 font-semibold tracking-wide text-black italic sm:pr-0">
          <p className="mb-0!">
            With over a decade of experience in the fitness industry, Alex specializes in strength
            training and functional fitness. Certified by NASM and known for his motivational style,
            Alex designs workout programs that are both challenging and achievable. His passion lies
            in helping clients build strength and confidence through personalized training routines.
            Outside the gym, Alex is an avid runner and enjoys outdoor adventures.
          </p>
        </blockquote>

        <p className="text-navy mb-8 tracking-wide">
          With over a decade of experience in the fitness industry, Alex specializes in strength
          training and functional fitness. Certified by NASM and known for his motivational style,
          Alex designs workout programs that are both challenging and achievable. His passion lies
          in helping clients build strength and confidence through personalized training routines.
          Outside the gym, Alex is an avid runner and enjoys outdoor adventures.
        </p>

        <p className="text-navy mb-8 tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus
        </p>

        <p className="text-navy mb-8 tracking-wide">
          mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat
          massa quis enim.
        </p>

        <p className="text-navy mb-8 tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus
        </p>

        <p className="text-navy mb-8 tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus
        </p>

        <p className="text-navy tracking-wide">
          mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat
          massa quis enim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean
        </p>
      </div>
    </>
  );
};

export default BlogData;
