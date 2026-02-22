import { useState } from "react";
import { Loader2, Sparkles, FileText, User, BrainCircuit, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ScoreCircle from "@/components/ScoreCircle";
import RecommendationBadge from "@/components/RecommendationBadge";
import ResultsSkeleton from "@/components/ResultsSkeleton";

const WEBHOOK_URL = "[USER_INSERT_N8N_WEBHOOK_URL_HERE]";

interface ScreeningResult {
  score: number;
  summary: string;
  action: string;
}

const Index = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleScreen = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      toast({
        title: "Missing Input",
        description: "Please provide both a job description and a resume.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: jobDescription.trim(),
          resume: resume.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: ScreeningResult = await response.json();
      setResult(data);
    } catch (err) {
      toast({
        title: "Screening Failed",
        description: "Something went wrong. Please check your webhook URL and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <div className="gradient-primary rounded-lg p-2">
              <BrainCircuit className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Recruit<span className="text-primary">-AI</span>
            </h1>
          </div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            AI Candidate Screening
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Data Entry */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Screen Candidates</h2>
              <p className="text-sm text-muted-foreground">
                Paste a job description and resume to get an AI-powered match analysis.
              </p>
            </div>

            <Card className="gradient-card border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium text-foreground">
                  <FileText className="h-4 w-4 text-primary" />
                  Job Description (JD)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[180px] resize-none border-border/50 bg-background/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                />
              </CardContent>
            </Card>

            <Card className="gradient-card border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium text-foreground">
                  <User className="h-4 w-4 text-primary" />
                  Candidate Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the candidate's resume here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="min-h-[180px] resize-none border-border/50 bg-background/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleScreen}
              disabled={loading}
              className="w-full gradient-primary text-primary-foreground font-semibold h-12 text-base glow-primary hover:glow-strong transition-shadow duration-300 disabled:opacity-50"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Screen Candidate
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Analysis Results</h2>
              <p className="text-sm text-muted-foreground">
                AI-generated screening insights will appear here.
              </p>
            </div>

            <Card className="gradient-card border-border/50 min-h-[400px] flex items-center justify-center">
              <CardContent className="w-full p-6">
                {loading ? (
                  <ResultsSkeleton />
                ) : result ? (
                  <div className="space-y-8">
                    {/* Score */}
                    <div className="flex flex-col items-center gap-4">
                      <ScoreCircle score={result.score} />
                      <RecommendationBadge action={result.action} />
                    </div>

                    {/* Summary */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        AI Summary
                      </h3>
                      <p className="text-foreground/90 leading-relaxed text-sm">
                        {result.summary}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-center py-8">
                    <div className="rounded-full bg-muted p-4">
                      <BrainCircuit className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground/70">No results yet</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Enter a job description and resume, then click "Screen Candidate".
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
