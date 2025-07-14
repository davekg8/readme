import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto max-w-4xl py-8 md:py-12">
      <div className="mb-8 text-center">
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-12 w-96 mx-auto mt-2" />
        <Skeleton className="h-5 w-32 mx-auto mt-3" />
      </div>
      
      <div className="space-y-4 p-6 md:p-10">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <br />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-10/12" />
      </div>
    </main>
  );
}
