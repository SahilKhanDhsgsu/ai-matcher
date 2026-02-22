import { Loader2 } from "lucide-react";

interface ScoreCircleProps {
  score: number;
  size?: number;
}

const ScoreCircle = ({ score, size = 160 }: ScoreCircleProps) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 75) return "hsl(var(--success))";
    if (score >= 50) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="transform -rotate-90" width={size} height={size}>
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="6"
        />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-score-fill transition-all duration-1000"
          style={{ "--score-offset": offset } as React.CSSProperties}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">{score}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Match</span>
      </div>
    </div>
  );
};

export const ScoreCircleSkeleton = ({ size = 160 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" className="transform -rotate-90 animate-pulse" width={size} height={size}>
      <circle cx="50" cy="50" r={45} fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
      <circle
        cx="50" cy="50" r={45} fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="283"
        strokeDashoffset="200"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  </div>
);

export default ScoreCircle;
