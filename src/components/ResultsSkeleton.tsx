import { ScoreCircleSkeleton } from "./ScoreCircle";
import { Skeleton } from "@/components/ui/skeleton";

const ResultsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex justify-center">
      <ScoreCircleSkeleton />
    </div>
    <div className="flex justify-center">
      <Skeleton className="h-8 w-32 rounded-full" />
    </div>
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/6" />
    </div>
  </div>
);

export default ResultsSkeleton;
