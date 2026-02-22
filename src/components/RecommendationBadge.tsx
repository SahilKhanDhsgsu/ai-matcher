import { cn } from "@/lib/utils";

interface RecommendationBadgeProps {
  action: string;
}

const RecommendationBadge = ({ action }: RecommendationBadgeProps) => {
  const normalized = action.toLowerCase();

  const variant = normalized.includes("interview")
    ? "success"
    : normalized.includes("review")
    ? "warning"
    : "destructive";

  const styles = {
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    destructive: "bg-destructive/15 text-destructive border-destructive/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-wider",
        styles[variant]
      )}
    >
      {action}
    </span>
  );
};

export default RecommendationBadge;
