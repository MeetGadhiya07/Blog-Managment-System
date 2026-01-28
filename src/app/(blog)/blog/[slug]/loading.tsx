export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* BlogHeader Skeleton */}
      <section className="px-4 py-8 text-center sm:py-12 md:px-7.5 md:py-16">
        <div className="mb-2 flex justify-center">
          <div className="h-3 w-24 rounded bg-gray-200 sm:h-4 sm:w-32" />
        </div>
        <div className="mx-auto mt-3 h-8 w-11/12 rounded bg-gray-200 sm:mt-4 sm:h-10 sm:w-3/4 sm:max-w-2xl" />
      </section>

      {/* HeroBanner Skeleton */}
      <div className="px-4 sm:px-7.5 md:px-0">
        <div className="h-48 w-full rounded bg-gray-200 sm:h-64 md:h-80 lg:h-96 xl:h-112" />
      </div>

      {/* BlogContent Skeleton */}
      <main className="mx-auto mt-6 grid w-full max-w-307.5 grid-cols-1 gap-5 px-4 sm:mt-8 sm:grid-cols-[3fr_263px]! sm:px-7.5 lg:grid-cols-[3fr_341px]!">
        {/* BlogData Skeleton */}
        <article className="order-1 w-full md:order-0 md:row-span-2">
          {/* Author Header */}
          <header className="mb-6 flex flex-col gap-3 border-b border-b-[#E5E6EA] py-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:py-6">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
              <div className="h-3.5 w-20 rounded bg-gray-200 sm:h-4 sm:w-24" />
            </div>
            <div className="h-3.5 w-28 rounded bg-gray-200 sm:h-4 sm:w-32" />
          </header>

          {/* Content Lines */}
          <div className="space-y-3 sm:space-y-4">
            <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
            <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
            <div className="h-3.5 w-5/6 rounded bg-gray-200 sm:h-4" />
            <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
            <div className="h-3.5 w-4/5 rounded bg-gray-200 sm:h-4" />
            <div className="my-4 h-20 rounded border border-[#E5E6EA] bg-gray-100 sm:my-6 sm:h-24" />
            <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
            <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
            <div className="h-3.5 w-3/4 rounded bg-gray-200 sm:h-4" />
          </div>
        </article>

        {/* ExploreMore Sidebar Skeleton */}
        <section className="order-2 mb-16 w-full p-0 sm:mt-2.5 sm:mb-24 sm:p-3.75 md:order-0 md:row-span-3 md:mb-0 lg:mt-1 lg:p-5">
          <div className="mb-3 h-5 w-28 rounded bg-gray-200 sm:mb-4 sm:h-6 sm:w-32" />
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-2.5 sm:gap-3">
                <div className="h-14 w-14 shrink-0 rounded bg-gray-200 sm:h-16 sm:w-16" />
                <div className="flex-1 space-y-1.5 sm:space-y-2">
                  <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
                  <div className="h-3 w-3/4 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Skeleton */}
        <section className="order-4 col-span-full border-t border-t-[#E5E6EA] pt-6 md:order-0 md:col-span-1 md:row-start-3 md:border-t-0 md:pt-0">
          <div className="mb-3 h-5 w-32 rounded bg-gray-200 sm:mb-4 sm:h-6 sm:w-40" />
          <div className="h-28 rounded bg-gray-200 sm:h-32" />
        </section>

        {/* Comments List Skeleton */}
        <section className="order-3 mb-10 sm:col-span-2 sm:row-start-4 sm:mb-14 md:order-0 md:mb-0">
          <div className="mb-4 h-5 w-24 rounded bg-gray-200 sm:mb-6 sm:h-6 sm:w-32" />
          <div className="space-y-4 sm:space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200 sm:h-10 sm:w-10" />
                  <div className="h-3.5 w-24 rounded bg-gray-200 sm:h-4 sm:w-32" />
                </div>
                <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
                <div className="h-3.5 w-5/6 rounded bg-gray-200 sm:h-4" />
              </div>
            ))}
          </div>
        </section>

        {/* Comment Form Skeleton */}
        <section className="order-5 mb-6 space-y-4 sm:col-span-2 sm:row-start-5 sm:mb-7.5 sm:space-y-6 md:order-0">
          <div className="mb-3 h-5 w-40 rounded bg-gray-200 sm:mb-4 sm:h-6 sm:w-48" />
          <div className="space-y-3 sm:space-y-4">
            <div className="h-9 rounded bg-gray-200 sm:h-10" />
            <div className="h-9 rounded bg-gray-200 sm:h-10" />
            <div className="h-24 rounded bg-gray-200 sm:h-32" />
            <div className="h-9 w-28 rounded bg-gray-200 sm:h-10 sm:w-32" />
          </div>
        </section>
      </main>

      {/* BlogList Skeleton */}
      <section className="mx-auto mt-12 max-w-307.5 px-4 sm:mt-16 sm:px-7.5">
        <div className="mb-6 h-6 w-40 rounded bg-gray-200 sm:mb-8 sm:h-8 sm:w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-3 sm:space-y-4">
              <div className="h-40 w-full rounded-lg bg-gray-200 sm:h-48" />
              <div className="h-5 w-3/4 rounded bg-gray-200 sm:h-6" />
              <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
              <div className="h-3.5 w-5/6 rounded bg-gray-200 sm:h-4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
