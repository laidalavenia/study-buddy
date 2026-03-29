import { Bot, User } from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";

interface MessageBubbleProps {
  role: "user" | "assistant" | "system" | "data";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  if (role === "system") return null;

  return (
    <div
      className={`flex w-full group ${
        isUser ? "justify-end" : "justify-start"
      } mb-6`}
    >
      <div
        className={`flex max-w-[85%] sm:max-w-[75%] gap-4 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`flex shrink-0 h-8 w-8 items-center justify-center rounded-full border shadow-sm ${
            isUser
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border"
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        
        <div
          className={`px-5 py-3.5 rounded-2xl sm:text-sm ${
            isUser
              ? "bg-primary text-primary-foreground shadow-sm rounded-tr-none"
              : "bg-muted text-foreground border rounded-tl-none"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <MarkdownRenderer content={content} />
          )}
        </div>
      </div>
    </div>
  );
}
