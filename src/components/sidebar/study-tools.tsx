import { BookA, GraduationCap, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudyToolsProps {
  onAction: (prompt: string) => void;
  onOpenQuizModal: () => void;
}

export function StudyTools({ onAction, onOpenQuizModal }: StudyToolsProps) {
  return (
    <div className="flex flex-col gap-4 p-5 py-6 border rounded-xl bg-card shadow-sm h-full lg:max-h-[calc(100vh-6rem)]">
      <div>
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Study Tools
        </h2>
        <p className="text-sm text-muted-foreground">
          Quick actions to help you study more effectively. Select a tool to begin.
        </p>
      </div>

      <div className="space-y-3 mt-4 flex-1">
        <Button
          variant="outline"
          className="w-full justify-start h-14 text-left transition-all hover:border-primary/50"
          onClick={() => onAction("Please summarize the following text: ")}
        >
          <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-950 flex items-center justify-center mr-3">
            <LayoutList className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Summarize Text</span>
            <span className="text-xs text-muted-foreground">
              Extract key points
            </span>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-14 text-left transition-all hover:border-primary/50"
          onClick={() => onAction("Explain this concept simply to a beginner: ")}
        >
          <div className="w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-950 flex items-center justify-center mr-3">
            <BookA className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Explain Simply</span>
            <span className="text-xs text-muted-foreground">
              Break down complex ideas
            </span>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-14 text-left transition-all hover:border-primary/50"
          onClick={onOpenQuizModal}
        >
          <div className="w-8 h-8 rounded-md bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mr-3">
            <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Generate Quiz</span>
            <span className="text-xs text-muted-foreground">
              Test your knowledge
            </span>
          </div>
        </Button>
      </div>
      
      <div className="mt-auto px-4 py-3 bg-muted/50 rounded-lg border border-border/50 text-xs text-muted-foreground text-center">
        Tip: Paste your lecture notes into the chat!
      </div>
    </div>
  );
}
