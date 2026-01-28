import { Blog } from '@/types';
import BlogCommentForm from './BlogCommentForm';
import BlogCommentList from './BlogCommentList';
import BlogData from './BlogData';
import BlogTestimonial from './BlogTestimonial';
import ExploreMore from './ExploreMore';

const BlogContent = ({ blog }: { blog: Blog }) => {
  return (
    <main className="mx-auto grid w-full max-w-307.5 grid-cols-1 gap-5 px-4 sm:grid-cols-[3fr_263px]! sm:px-7.5 lg:grid-cols-[3fr_341px]!">
      <article className="order-1 w-full md:order-0 md:row-span-2">
        <BlogData blog={blog} />
      </article>

      <section className="order-2 mb-24 w-full p-0 sm:mt-2.5 sm:mb-0 sm:p-3.75 md:order-0 md:row-span-3 lg:mt-1 lg:p-5">
        <ExploreMore />
      </section>

      <section className="order-4 col-span-full border-t border-t-[#E5E6EA] md:order-0 md:col-span-1 md:row-start-3 md:row-end-4 md:mb-16 md:border-t-0 [&_.swiper-slide]:w-full! overflow-hidden">
        <BlogTestimonial />
      </section>

      <section className="order-3 mb-14 sm:col-span-2 sm:row-start-4 sm:mb-0 md:order-0">
        <BlogCommentList />
      </section>

      <section className="order-5 mb-7.5 space-y-6 sm:col-span-2 sm:row-start-5 md:order-0">
        <BlogCommentForm />
      </section>
    </main>
  );
};

export default BlogContent;
