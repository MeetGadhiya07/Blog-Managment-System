'use client';

import { Button } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h2 className="mb-4 text-3xl font-bold">Something went wrong!</h2>
      <p className="mb-6 text-gray-600">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
